import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { type Contract, type EmployeeProfile } from '../lib/supabase';
import { ensureValidAccessToken } from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');
const statusLabel: Record<Contract['status'], string> = { draft: '초안', active: '진행 중', on_hold: '보류', closed: '정산완료' };

export function DashboardPage({ profile }: { profile: EmployeeProfile }) {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const load = async () => {
      const token = await ensureValidAccessToken();
      const contractRes = await fetch(`${workerBase}/contracts`, { headers: { Authorization: `Bearer ${token}` } });
      const contractPayload = (await contractRes.json()) as { contracts?: Contract[] };
      setContracts(Array.isArray(contractPayload.contracts) ? contractPayload.contracts : []);
    };
    void load();
  }, [profile.role]);

  const stats = {
    total: contracts.length,
    active: contracts.filter((item) => item.status !== 'closed').length,
    closed: contracts.filter((item) => item.status === 'closed').length
  };

  return (
    <div className="space-y-4">
      <Card title={`${profile.name}님의 업무 대시보드`} subtitle="계약과 마감 현황을 한 곳에서 확인하세요.">
        <div className="grid gap-3 sm:grid-cols-3">
          {[['전체 계약', stats.total], ['진행 중', stats.active], ['정산완료', stats.closed]].map(([label, value]) => (
            <div key={String(label)} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{label}</p>
              <strong className="mt-2 block text-2xl text-slate-900">{value}</strong>
            </div>
          ))}
        </div>
        <Link to="/contracts/new" className="mt-4 inline-flex rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
          새 계약서 바로 작성
        </Link>
      </Card>

      <div>
        <Card title="최근 계약" subtitle="최근 계약의 상태를 빠르게 확인하세요.">
          {contracts.length === 0 ? <p className="text-sm text-slate-500">계약이 없습니다.</p> : <div className="space-y-2">
            {contracts.slice(0, 6).map((contract) => <Link key={contract.id} to={`/contracts/${contract.id}`} className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
              <div className="min-w-0"><strong className="break-keep text-sm text-slate-800">{contract.customer_name}</strong><p className="mt-1 break-keep text-xs text-slate-500">{contract.employee_name}</p></div>
              <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{statusLabel[contract.status]}</span>
            </Link>)}
          </div>}
        </Card>
      </div>
    </div>
  );
}
