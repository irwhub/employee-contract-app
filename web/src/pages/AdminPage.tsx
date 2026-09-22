import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Label } from '../components/FormControls';
import { recoverContractTextMap } from '../lib/encoding';
import {
  clearAuthState,
  ensureValidAccessToken,
  normalizeSessionMessage
} from '../lib/session';
import { supabase, type Contract, type EmployeeProfile } from '../lib/supabase';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');

type ContractsListResponse = { ok: true; contracts: Contract[] } | { error: string };
const LIST_TIMEOUT_MS = 15000;
const EMPLOYEE_QUERY_TIMEOUT_MS = 6000;
const COMPLETE_TIMEOUT_MS = 10000;

export function AdminPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const accessToken = await ensureValidAccessToken();
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), LIST_TIMEOUT_MS);

        const res = await fetch(`${workerBase}/contracts?scope=all`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal: controller.signal
        }).finally(() => window.clearTimeout(timer));

        const payload = (await res.json().catch(() => ({}))) as ContractsListResponse;
        const rawMsg =
          'error' in payload && payload.error
            ? payload.error
            : `관리자 대시보드 조회 중 오류가 발생했습니다. (status=${res.status})`;
        const msg = normalizeSessionMessage(rawMsg);

        if (res.status === 401 || msg.startsWith('Invalid access token.')) {
          clearAuthState();
          window.location.replace(`/?logout=1&t=${Date.now()}`);
          return;
        }
        if (!res.ok) throw new Error(msg);

        const items = Array.isArray((payload as { contracts?: Contract[] }).contracts)
          ? ((payload as { contracts: Contract[] }).contracts || [])
          : [];
        setContracts(items.map((item) => recoverContractTextMap(item)));

        try {
          const employeeQuery = supabase
            .from('employees')
            .select('auth_user_id,name,role,dob')
            .eq('is_active', true)
            .order('name', { ascending: true });

          const employeeResult = await Promise.race([
            employeeQuery,
            new Promise<never>((_, reject) =>
              window.setTimeout(
                () => reject(new Error('직원 목록 조회가 지연되었습니다.')),
                EMPLOYEE_QUERY_TIMEOUT_MS
              )
            )
          ]);

          const employeeData = (employeeResult as { data: EmployeeProfile[] | null }).data;
          if (Array.isArray(employeeData)) {
            setEmployees(employeeData as EmployeeProfile[]);
          } else {
            setEmployees([]);
          }
        } catch {
          setEmployees([]);
        }
      } catch (err) {
        setError(
          normalizeSessionMessage(err instanceof Error ? err.message : '관리자 대시보드 조회 중 오류가 발생했습니다.')
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const employeeOptions = useMemo(() => {
    if (employees.length > 0) {
      return employees.map((e) => ({
        id: String(e.auth_user_id),
        name: String(e.name || '직원')
      }));
    }

    const seen = new Set<string>();
    const out: Array<{ id: string; name: string }> = [];

    for (const c of contracts) {
      const id = String(c.created_by || '').trim();
      if (!id || seen.has(id)) continue;
      seen.add(id);
      out.push({
        id,
        name: String(c.employee_name || '직원')
      });
    }

    return out.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }, [employees, contracts]);

  const filtered = contracts.filter((c) => {
    if (employeeFilter !== 'all' && c.created_by !== employeeFilter) return false;

    const keyword = search.trim().toLowerCase();
    if (!keyword) return true;

    const haystack = [
      c.customer_name || '',
      c.employee_name || '',
      c.contract_type || '',
      c.customer_phone || ''
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(keyword);
  });

  const stats = {
    total: contracts.length,
    active: contracts.filter((contract) => contract.status !== 'closed').length,
    closed: contracts.filter((contract) => contract.status === 'closed').length,
    yearClosed: contracts.filter((contract) => contract.status === 'closed' && contract.closed_at?.startsWith(String(new Date().getFullYear()))).length,
    employees: employees.length > 0 ? employees.length : employeeOptions.length
  };

  const staffSummary = useMemo(() => {
    const rows = new Map<string, { id: string; name: string; total: number; active: number; closed: number }>();
    employees.forEach((employee) => rows.set(employee.auth_user_id, { id: employee.auth_user_id, name: employee.name, total: 0, active: 0, closed: 0 }));
    contracts.forEach((contract) => {
      const id = contract.created_by || contract.employee_name;
      const row = rows.get(id) || { id, name: contract.employee_name || '직원', total: 0, active: 0, closed: 0 };
      row.total += 1;
      if (contract.status === 'closed') row.closed += 1;
      else row.active += 1;
      rows.set(id, row);
    });
    return [...rows.values()].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, 'ko'));
  }, [contracts, employees]);

  const markComplete = async (contract: Contract) => {
    if (contract.status === 'closed') return;

    const closedAt = new Date().toISOString().slice(0, 10);
    setCompletingId(contract.id);
    setError(null);

    try {
      const accessToken = await ensureValidAccessToken();
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), COMPLETE_TIMEOUT_MS);
      const response = await fetch(`${workerBase}/contracts/${contract.id}/status`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'closed', closed_at: closedAt }),
        signal: controller.signal
      }).finally(() => window.clearTimeout(timer));
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error || `정산완료 저장 중 오류가 발생했습니다. (status=${response.status})`);
      setContracts((current) => current.map((item) => item.id === contract.id ? { ...item, status: 'closed', closed_at: closedAt } : item));
    } catch (err) {
      const message = err instanceof DOMException && err.name === 'AbortError'
        ? '정산완료 저장이 지연되고 있습니다. 잠시 후 다시 시도해주세요.'
        : err instanceof Error ? err.message : '정산완료 저장 중 오류가 발생했습니다.';
      setError(normalizeSessionMessage(message));
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card title="관리자 대시보드" subtitle="전체 계약, 올해 완료 현황과 직원별 보유 사건을 확인합니다.">
        <div className="grid gap-3 sm:grid-cols-5">
          {[['전체 계약', stats.total], ['진행 중', stats.active], ['정산완료', stats.closed], ['올해 정산완료', stats.yearClosed], ['직원 수', stats.employees]].map(([label, value]) => <div key={String(label)} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><strong className="mt-2 block text-2xl text-slate-900">{value}</strong></div>)}
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500"><span>직원</span><span>전체</span><span>진행 중</span><span>정산완료</span></div>
            {staffSummary.map((staff) => <div key={staff.id} className="grid grid-cols-[1.5fr_repeat(3,1fr)] gap-3 border-b border-slate-100 px-4 py-3 text-sm last:border-b-0"><span className="font-medium text-slate-800">{staff.name}</span><span>{staff.total}건</span><span>{staff.active}건</span><span>{staff.closed}건</span></div>)}
            {staffSummary.length === 0 && <p className="px-4 py-4 text-sm text-slate-500">등록된 직원 또는 계약이 없습니다.</p>}
          </div>
        </div>
      </Card>
    <Card title="전체 사건 관리" subtitle="직원별 계약 내역을 조회하고 정산완료 처리할 수 있습니다.">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="w-full sm:max-w-sm">
          <Label text="직원 선택" />
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          >
            <option value="all">전체</option>
            {employeeOptions.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:max-w-sm">
          <Label text="검색" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="고객명/직원명/문서종류/연락처 검색"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">불러오는 중...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && <p className="mb-3 text-xs text-slate-500">총 {filtered.length}건</p>}

      <div className="space-y-3">
        {!loading &&
          !error &&
          filtered.map((contract) => (
            <div key={contract.id} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Link to={`/contracts/${contract.id}`} className="block min-w-0 transition hover:bg-slate-100">
                <p className="break-keep font-medium text-slate-800">{contract.customer_name}</p>
                <p className="break-keep text-xs text-slate-500">
                  담당자 {contract.employee_name} | {new Date(contract.created_at).toLocaleString()}
                </p>
              </Link>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="shrink-0 rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {contract.status === 'closed' ? '정산완료' : '진행 중'}
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link to={`/contracts/${contract.id}`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">계약서</Link>
                  <Link to={`/contracts/${contract.id}/materials`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">자료</Link>
                  <Link to={`/contracts/${contract.id}/memo`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">메모</Link>
                  {contract.status !== 'closed' && (
                    <button
                      type="button"
                      onClick={() => void markComplete(contract)}
                      disabled={completingId === contract.id}
                      aria-label={`${contract.customer_name} 정산완료 처리`}
                      className="rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {completingId === contract.id ? '처리 중...' : '정산완료 처리'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-sm text-slate-500">계약서가 없습니다.</p>
        )}
      </div>
    </Card>
    </div>
  );
}
