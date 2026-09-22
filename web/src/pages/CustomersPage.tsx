import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { GhostButton, Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import type { Contract, CustomerRecord, EmployeeProfile } from '../lib/supabase';
import { ensureValidAccessToken } from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');

const categoryStyles: Record<string, string> = {
  GA: 'bg-blue-50 text-blue-700',
  소개건: 'bg-amber-50 text-amber-700',
  환자: 'bg-emerald-50 text-emerald-700',
  기타: 'bg-slate-100 text-slate-700'
};

const categoryOptions = ['GA', '소개건', '환자', '기타'] as const;
type CustomerCategory = (typeof categoryOptions)[number];
type CustomerListResponse = { customers?: CustomerRecord[]; error?: string };
type EmployeeListResponse = { employees?: Array<Pick<EmployeeProfile, 'auth_user_id' | 'name'>>; error?: string };

function withTimeout<T>(promise: PromiseLike<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(message)), ms);
    Promise.resolve(promise).then(
      (value) => { window.clearTimeout(timer); resolve(value); },
      (error) => { window.clearTimeout(timer); reject(error); }
    );
  });
}

function formatPhone(phone: string | null) {
  return phone?.trim() || '';
}

async function fetchWorkerJson<T extends { error?: string }>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${workerBase}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init?.headers || {}) }
  });
  const payload = (await response.json().catch(() => ({}))) as T;
  if (!response.ok) throw new Error(payload.error || `요청에 실패했습니다. (status=${response.status})`);
  return payload;
}

export function CustomersPage({ profile }: { profile: EmployeeProfile }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [registeredCustomers, setRegisteredCustomers] = useState<CustomerRecord[]>([]);
  const [employeeNames, setEmployeeNames] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingCategoryKey, setSavingCategoryKey] = useState<string | null>(null);
  const [memoDrafts, setMemoDrafts] = useState<Record<string, string>>({});
  const [savingMemoKey, setSavingMemoKey] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [savingCustomer, setSavingCustomer] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState<CustomerCategory | ''>('');
  const [newMemo, setNewMemo] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const token = await withTimeout(ensureValidAccessToken(), 8_000, '로그인 확인이 지연되고 있습니다.');
        const requests = await Promise.allSettled([
          withTimeout(
            fetch(`${workerBase}/contracts?scope=all`, { headers: { Authorization: `Bearer ${token}` } }).then(async (response) => {
              const payload = (await response.json()) as { contracts?: Contract[]; error?: string };
              if (!response.ok) throw new Error(payload.error || '계약 목록을 불러오지 못했습니다.');
              return Array.isArray(payload.contracts) ? payload.contracts : [];
            }),
            8_000,
            '계약 목록 조회가 지연되고 있습니다.'
          ),
          withTimeout(
            fetchWorkerJson<CustomerListResponse>('/customers', token),
            8_000,
            '등록 고객 조회가 지연되고 있습니다.'
          ),
          withTimeout(
            fetchWorkerJson<EmployeeListResponse>('/employees', token),
            8_000,
            '담당자 조회가 지연되고 있습니다.'
          )
        ]);
        const [contractResult, customerResult, employeeResult] = requests;
        const failures: string[] = [];
        if (contractResult.status === 'fulfilled') setContracts(contractResult.value);
        else failures.push(contractResult.reason instanceof Error ? contractResult.reason.message : '계약 목록을 불러오지 못했습니다.');
        if (customerResult.status === 'fulfilled') {
          setRegisteredCustomers(customerResult.value.customers || []);
        } else failures.push(customerResult.reason instanceof Error ? customerResult.reason.message : '등록 고객을 불러오지 못했습니다.');
        if (employeeResult.status === 'fulfilled') {
          setEmployeeNames(Object.fromEntries((employeeResult.value.employees || []).map((employee) => [employee.auth_user_id, employee.name])));
        } else failures.push(employeeResult.reason instanceof Error ? employeeResult.reason.message : '담당자를 불러오지 못했습니다.');
        if (failures.length > 0) setError(`${failures.join(' ')} 고객 목록은 확인 가능한 범위에서 표시합니다.`);
      } catch (err) {
        setError(err instanceof Error ? err.message : '고객 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [profile.role]);

  const customers = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const registeredByContact = new Map<string, CustomerRecord>();
    const grouped = new Map<string, { latest: Contract | null; contracts: Contract[]; record: CustomerRecord | null }>();

    for (const customer of registeredCustomers) {
      const key = `contact:${customer.created_by}:${customer.name}:${customer.phone || ''}`;
      registeredByContact.set(key, customer);
      grouped.set(`record:${customer.id}`, { latest: null, contracts: [], record: customer });
    }

    for (const contract of contracts) {
      const haystack = [contract.customer_name, contract.customer_phone || '', contract.employee_name, contract.customer_category || '']
        .join(' ')
        .toLowerCase();
      if (keyword && !haystack.includes(keyword)) continue;

      const contactKey = `contact:${contract.created_by}:${contract.customer_name}:${contract.customer_phone || ''}`;
      const registered = registeredByContact.get(contactKey);
      const key = registered ? `record:${registered.id}` : `contract:${contactKey}`;
      const current = grouped.get(key) || { latest: null, contracts: [], record: registered || null };
      current.latest = current.latest || contract;
      current.contracts.push(contract);
      grouped.set(key, current);
    }

    return [...grouped.values()]
      .filter(({ latest, record }) => {
        if (!keyword || record) return true;
        return Boolean(latest);
      })
      .map(({ latest, contracts: customerContracts, record }) => ({
        latest,
        contracts: customerContracts,
        record,
        name: record?.name || latest?.customer_name || '',
        phone: record?.phone || latest?.customer_phone || '',
        category: record?.category || latest?.customer_category || null,
        memo: record?.memo || latest?.internal_memo || '',
        employeeName: record ? (employeeNames[record.created_by] || (record.created_by === profile.auth_user_id ? profile.name : '담당자')) : latest?.employee_name || '담당자',
        createdBy: record?.created_by || latest?.created_by || ''
      }))
      .filter((customer) => {
        if (!keyword) return true;
        return [customer.name, customer.phone, customer.employeeName, customer.category || '', customer.memo]
          .join(' ')
          .toLowerCase()
          .includes(keyword);
      });
  }, [contracts, employeeNames, profile.auth_user_id, profile.name, registeredCustomers, search]);

  const updateCustomerCategory = async (
    customerKey: string,
    customerRecord: CustomerRecord | null,
    customerContracts: Contract[],
    category: CustomerCategory | null
  ) => {
    const contractIds = customerContracts.map((contract) => contract.id);
    setSavingCategoryKey(customerKey);
    setError(null);

    try {
      if (customerRecord) {
        const result = await withTimeout(fetchWorkerJson<{ customer?: CustomerRecord; error?: string }>(`/customers/${customerRecord.id}`, await ensureValidAccessToken(), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category })
        }), 8_000, '고객 분류 저장이 지연되고 있습니다.');
        if (!result.customer) throw new Error('분류를 저장한 고객을 확인하지 못했습니다.');
        setRegisteredCustomers((current) => current.map((customer) => customer.id === customerRecord.id ? result.customer || customer : customer));
      } else {
        const response = await withTimeout(fetch(`${workerBase}/customers/bulk-update`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${await ensureValidAccessToken()}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ contract_ids: contractIds, category })
        }), 10_000, '고객 분류 저장이 지연되고 있습니다.');
        const payload = (await response.json()) as { contracts?: Contract[]; error?: string };
        if (!response.ok) throw new Error(payload.error || '고객 분류 저장에 실패했습니다.');
        const contractIdSet = new Set(contractIds);
        setContracts((current) => current.map((contract) => contractIdSet.has(contract.id) ? { ...contract, customer_category: category } : contract));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '분류 저장 중 문제가 발생했습니다. 다시 시도하세요.');
    } finally {
      setSavingCategoryKey(null);
    }
  };

  const saveCustomerMemo = async (customerKey: string, customerRecord: CustomerRecord | null, customerContracts: Contract[]) => {
    const memo = memoDrafts[customerKey]?.trim() || null;
    setSavingMemoKey(customerKey);
    setError(null);
    try {
      if (customerRecord) {
        const result = await withTimeout(fetchWorkerJson<{ customer?: CustomerRecord; error?: string }>(`/customers/${customerRecord.id}`, await ensureValidAccessToken(), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memo })
        }), 8_000, '고객 메모 저장이 지연되고 있습니다.');
        if (!result.customer) throw new Error('고객 메모를 저장한 고객을 확인하지 못했습니다.');
        setRegisteredCustomers((current) => current.map((customer) => customer.id === customerRecord.id ? result.customer || customer : customer));
      } else {
        const response = await withTimeout(fetch(`${workerBase}/customers/bulk-update`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${await ensureValidAccessToken()}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ contract_ids: customerContracts.map((contract) => contract.id), memo })
        }), 10_000, '고객 메모 저장이 지연되고 있습니다.');
        const payload = (await response.json()) as { contracts?: Contract[]; error?: string };
        if (!response.ok) throw new Error(payload.error || '고객 메모를 저장하지 못했습니다.');
        const updated = new Map((payload.contracts || []).map((contract) => [contract.id, contract]));
        setContracts((current) => current.map((contract) => updated.get(contract.id) || contract));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '고객 메모 저장 중 문제가 발생했습니다.');
    } finally {
      setSavingMemoKey(null);
    }
  };

  const registerCustomer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newName.trim();
    if (!name) {
      setError('고객 이름을 입력하세요.');
      return;
    }

    setSavingCustomer(true);
    setError(null);
    try {
      const token = await ensureValidAccessToken();
      const result = await fetchWorkerJson<{ customer?: CustomerRecord; error?: string }>('/customers', token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: newPhone.trim() || null, category: newCategory || null, memo: newMemo.trim() || null })
      });
      if (!result.customer) throw new Error('등록한 고객을 확인하지 못했습니다.');
      const customer = result.customer;
      setRegisteredCustomers((current) => [customer, ...current]);
      setNewName('');
      setNewPhone('');
      setNewCategory('');
      setNewMemo('');
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '고객 등록 중 오류가 발생했습니다.');
    } finally {
      setSavingCustomer(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card
        title={profile.role === 'admin' ? '전체 고객관리' : '내 고객관리'}
        subtitle="담당자별 고객과 계약을 한 곳에서 확인하고 바로 연락할 수 있습니다."
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="이름, 전화번호, 담당자, 고객 구분 검색"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm sm:max-w-md"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">고객 {customers.length}명</span>
            <PrimaryButton type="button" onClick={() => setShowForm((current) => !current)}>{showForm ? '등록 닫기' : '고객 등록'}</PrimaryButton>
          </div>
        </div>
        {showForm && (
          <form onSubmit={(event) => void registerCustomer(event)} className="mb-5 rounded-xl border border-brand-100 bg-brand-50/40 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label text="이름" /><TextInput value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="고객 이름" required /></div>
              <div><Label text="전화번호" /><TextInput value={newPhone} onChange={(event) => setNewPhone(event.target.value)} placeholder="010-0000-0000" type="tel" /></div>
              <div><Label text="분류" /><select value={newCategory} onChange={(event) => setNewCategory(event.target.value as CustomerCategory | '')} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="">미분류</option>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
              <div className="sm:col-span-2"><Label text="메모" /><TextArea value={newMemo} onChange={(event) => setNewMemo(event.target.value)} placeholder="상담 내용이나 참고사항을 입력하세요." /></div>
            </div>
            <div className="mt-3 flex justify-end gap-2"><GhostButton type="button" onClick={() => setShowForm(false)}>취소</GhostButton><PrimaryButton type="submit" loading={savingCustomer}>고객 저장</PrimaryButton></div>
          </form>
        )}
        {loading && <p className="text-sm text-slate-500">고객 정보를 불러오는 중입니다.</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="space-y-3">
          {customers.map(({ contracts: customerContracts, record, name, phone: rawPhone, category: rawCategory, memo, employeeName, createdBy }) => {
            const phone = formatPhone(rawPhone || null);
            const category = rawCategory || '미분류';
            const customerKey = record ? `record:${record.id}` : `${createdBy}-${name}-${phone}`;
            return (
              <div key={customerKey} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{name}</h3>
                      <select
                        value={rawCategory || ''}
                        onChange={(event) => {
                          const value = event.target.value;
                          void updateCustomerCategory(customerKey, record, customerContracts, value === '' ? null : (value as CustomerCategory));
                        }}
                        disabled={savingCategoryKey === customerKey}
                        aria-label={`${name} 고객 분류`}
                        className={`rounded-lg border bg-white px-2.5 py-1 text-xs font-medium outline-none ring-brand-500 focus:ring-2 ${categoryStyles[category] || categoryStyles.기타}`}
                      >
                        <option value="">미분류</option>
                        {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      {phone ? <a href={`tel:${phone}`} className="font-semibold text-brand-700 underline-offset-2 hover:underline">{phone}</a> : <span>연락처 없음</span>}
                      <span>담당자 {employeeName}</span>
                    </div>
                    <div className="mt-2 flex w-full max-w-2xl gap-2">
                      <input
                        value={memoDrafts[customerKey] ?? memo}
                        onChange={(event) => setMemoDrafts((current) => ({ ...current, [customerKey]: event.target.value }))}
                        placeholder="한 줄 메모"
                        aria-label={`${name} 고객 메모`}
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      />
                      <button type="button" onClick={() => void saveCustomerMemo(customerKey, record, customerContracts)} disabled={savingMemoKey === customerKey} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-60">
                        {savingMemoKey === customerKey ? '저장 중' : '메모 저장'}
                      </button>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">계약 {customerContracts.length}건</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {customerContracts.map((contract) => (
                    <Link key={contract.id} to={`/contracts/${contract.id}`} className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-brand-700 hover:bg-brand-50">
                      {contract.contract_type || '계약'} · {contract.status === 'closed' ? '정산완료' : '진행'}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {!loading && customers.length === 0 && <p className="text-sm text-slate-500">조건에 맞는 고객이 없습니다.</p>}
      </Card>
    </div>
  );
}
