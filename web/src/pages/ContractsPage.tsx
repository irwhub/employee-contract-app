import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { recoverContractTextMap } from '../lib/encoding';
import { type Contract, type EmployeeProfile } from '../lib/supabase';
import {
  clearAuthState,
  ensureValidAccessToken,
  normalizeSessionMessage
} from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');

type SortOption = 'date_desc' | 'date_asc' | 'name_asc' | 'name_desc';
type ContractsListResponse = { ok: true; contracts: Contract[] } | { error: string };
const LIST_TIMEOUT_MS = 15000;
const COMPLETE_TIMEOUT_MS = 10000;

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function formatMemo(value: string | null) {
  return value?.replace(/\s+/g, ' ').trim().slice(0, 90) || '';
}

export function ContractsPage({ profile }: { profile: EmployeeProfile }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const accessToken = await ensureValidAccessToken();
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), LIST_TIMEOUT_MS);

        const res = await fetch(`${workerBase}/contracts`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          signal: controller.signal
        }).finally(() => window.clearTimeout(timer));

        const payload = (await res.json().catch(() => ({}))) as ContractsListResponse;
        const rawMsg =
          'error' in payload && payload.error
            ? payload.error
            : `계약 목록 조회 중 오류가 발생했습니다. (status=${res.status})`;
        const msg = normalizeSessionMessage(rawMsg);

        if (res.status === 401 || msg.startsWith('Invalid access token.')) {
          clearAuthState();
          window.location.replace(`/?logout=1&t=${Date.now()}`);
          return;
        }
        if (!res.ok) throw new Error(msg);

        const items = Array.isArray((payload as any).contracts)
          ? ((payload as any).contracts as Contract[])
          : [];
        setContracts(items.map((item) => recoverContractTextMap(item)));
      } catch (err) {
        const message = normalizeSessionMessage(
          err instanceof Error ? err.message : '계약 목록 조회 중 오류가 발생했습니다.'
        );
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [profile.auth_user_id, profile.role]);

  const visibleContracts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const filtered = contracts.filter((contract) => {
      if (!keyword) return true;

      const haystack = [
        contract.customer_name,
        contract.contract_type || '',
        contract.employee_name || '',
        contract.customer_phone || '',
        contract.accident_location || ''
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(keyword);
    });

    return [...filtered].sort((a, b) => {
      const aClosed = a.status === 'closed';
      const bClosed = b.status === 'closed';
      if (aClosed !== bClosed) return aClosed ? 1 : -1;
      if (sortBy === 'date_desc') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'date_asc') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'name_asc') return a.customer_name.localeCompare(b.customer_name, 'ko');
      return b.customer_name.localeCompare(a.customer_name, 'ko');
    });
  }, [contracts, search, sortBy]);

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
    <Card title="사건관리" subtitle="고객별 사건의 계약서, 자료, 메모를 한 곳에서 관리합니다.">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="고객명 / 문서종류 / 직원명 / 연락처 검색"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2 sm:w-72"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
          >
            <option value="date_desc">날짜: 최신순</option>
            <option value="date_asc">날짜: 오래된순</option>
            <option value="name_asc">이름: 가나다순</option>
            <option value="name_desc">이름: 역순</option>
          </select>
        </div>

          <Link to="/contracts/new" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            새 계약서
        </Link>
      </div>

      {loading && <p className="text-sm text-slate-500">불러오는 중...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="mb-3 text-xs text-slate-500">총 {visibleContracts.length}건</div>

      <div className="space-y-3">
        {visibleContracts.map((contract) => (
          <div key={contract.id} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Link to={`/contracts/${contract.id}`} className="block transition hover:bg-slate-100">
              <p className="font-medium text-slate-800">{contract.customer_name}</p>
              <p className="mt-1 text-xs text-slate-500">
                {contract.contract_type || '문서종류 미입력'} | {contract.customer_category || '고객 구분 미입력'} | {formatDate(contract.created_at)}
              </p>
              {formatMemo(contract.internal_memo) && (
                <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                  메모: {formatMemo(contract.internal_memo)}{(contract.internal_memo || '').replace(/\s+/g, ' ').trim().length > 90 ? '…' : ''}
                </p>
              )}
            </Link>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                {contract.status === 'closed' ? '정산완료' : '진행 중'}
              </span>
              <div className="flex flex-wrap gap-2">
                <Link to={`/contracts/${contract.id}`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">계약서</Link>
                <Link to={`/contracts/${contract.id}/materials`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">자료</Link>
                <Link to={`/contracts/${contract.id}/memo`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">메모</Link>
              </div>
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
        ))}

        {!loading && visibleContracts.length === 0 && (
          <p className="text-sm text-slate-500">조건에 맞는 계약서가 없습니다.</p>
        )}
      </div>
    </Card>
  );
}
