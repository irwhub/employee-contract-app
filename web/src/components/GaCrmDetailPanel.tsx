import { useState } from 'react';
import type { EmployeeProfile } from '../lib/supabase';
import { formatDate, formatDateTime, type GaContactHistory, type GaContactMethod, type GaOrganization, type GaSource } from '../lib/ga-crm';
import { ConfidenceBadge, GradeBadge, StageBadge } from './GaCrmBadges';

interface GaCrmDetailPanelProps {
  readonly organization: GaOrganization;
  readonly sources: readonly GaSource[];
  readonly history: readonly GaContactHistory[];
  readonly employees: readonly EmployeeProfile[];
  readonly isAdmin: boolean;
  readonly onClose: () => void;
  readonly onEdit: () => void;
  readonly onApprove: () => Promise<void>;
  readonly onVerifyCall: () => Promise<void>;
  readonly onAddHistory: (values: { readonly method: GaContactMethod; readonly result: string; readonly memo: string; readonly next_contact_at: string }) => Promise<void>;
}

const inputClass = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100';

export function GaCrmDetailPanel({ organization, sources, history, employees, isAdmin, onClose, onEdit, onApprove, onVerifyCall, onAddHistory }: GaCrmDetailPanelProps) {
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  const [savingHistory, setSavingHistory] = useState(false);
  const [method, setMethod] = useState<GaContactMethod>('전화');
  const [result, setResult] = useState('');
  const [memo, setMemo] = useState('');
  const [nextContactAt, setNextContactAt] = useState('');
  const assigned = employees.find((employee) => employee.auth_user_id === organization.assigned_to)?.name ?? '미배정';

  const submitHistory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!result.trim()) return;
    setSavingHistory(true);
    try {
      await onAddHistory({ method, result: result.trim(), memo: memo.trim(), next_contact_at: nextContactAt });
      setResult(''); setMemo(''); setNextContactAt(''); setShowHistoryForm(false);
    } finally {
      setSavingHistory(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/30" role="dialog" aria-modal="true" aria-label={`${organization.organization_name} 상세 정보`}>
      <div className="flex h-full w-full max-w-2xl flex-col bg-slate-50 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 bg-white px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">GA 영업 DB</p><h2 className="mt-1 text-xl font-bold text-slate-900">{organization.organization_name}</h2><p className="mt-1 text-sm text-slate-500">{organization.ga_company_name} · {organization.region} {organization.district}</p></div><div className="flex items-center gap-2">{isAdmin && <button type="button" onClick={onEdit} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">수정</button>}<button type="button" onClick={onClose} className="rounded-lg p-2 text-xl text-slate-500 hover:bg-slate-100" aria-label="상세 닫기">×</button></div></div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200"><p className="text-xs text-slate-500">전화영업</p><div className="mt-2 flex items-center gap-2">{organization.representative_phone ? <a className="text-lg font-bold text-brand-700 hover:underline" href={`tel:${organization.representative_phone}`}>{organization.representative_phone}</a> : <strong className="text-slate-500">전화번호 미확인</strong>}<GradeBadge grade={organization.reliability_grade} /></div><p className="mt-2 text-xs text-slate-500">{organization.phone_verification_status}</p></div><div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200"><p className="text-xs text-slate-500">영업 우선순위</p><p className="mt-2 text-2xl font-bold text-slate-900">{organization.reliability_grade} <span className="text-sm font-medium text-slate-500">우선 연락 대상</span></p><StageBadge stage={organization.sales_stage} /></div></div>
          <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => { if (organization.representative_phone) void navigator.clipboard?.writeText(organization.representative_phone); }} disabled={!organization.representative_phone} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40">번호 복사</button><button type="button" onClick={() => void onVerifyCall()} className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">실제통화 확인 처리</button>{isAdmin && organization.record_status === 'candidate' && <button type="button" onClick={() => void onApprove()} className="rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">운영 DB 승인</button>}</div>
          <section className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-slate-200"><h3 className="font-semibold text-slate-900">기본정보</h3><dl className="mt-3 grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2"><div><dt className="text-xs text-slate-500">조직구분</dt><dd className="mt-1 font-medium text-slate-800">{organization.organization_type}</dd></div><div><dt className="text-xs text-slate-500">담당 직원</dt><dd className="mt-1 font-medium text-slate-800">{assigned}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-500">주소</dt><dd className="mt-1 text-slate-800">{organization.address ?? '미확인'}</dd></div><div><dt className="text-xs text-slate-500">설계사 수</dt><dd className="mt-1 text-slate-800">{organization.agent_count === null ? '미확인' : `${organization.agent_count}명`}</dd></div><div><dt className="text-xs text-slate-500">최종 확인일</dt><dd className="mt-1 text-slate-800">{formatDate(organization.last_verified_at)}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-500">검증 상태</dt><dd className="mt-2 flex flex-wrap gap-2"><ConfidenceBadge label={organization.address_verification_status} /><ConfidenceBadge label={organization.organization_verification_status} />{organization.needs_reverification && <ConfidenceBadge label="재검증 필요" />}</dd></div></dl></section>
          <section className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200"><div className="flex items-center justify-between"><h3 className="font-semibold text-slate-900">연락 History</h3><button type="button" onClick={() => setShowHistoryForm((visible) => !visible)} className="rounded-lg border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700">기록 추가</button></div>{showHistoryForm && <form onSubmit={(event) => void submitHistory(event)} className="mt-4 rounded-xl bg-slate-50 p-3"><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-600">연락수단<select className={inputClass} value={method} onChange={(event) => setMethod(event.target.value as GaContactMethod)}>{['전화', '문자', '카카오톡', '이메일', '방문', '온라인미팅', '기타'].map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-xs font-semibold text-slate-600">다음 연락일<input className={inputClass} type="datetime-local" value={nextContactAt} onChange={(event) => setNextContactAt(event.target.value)} /></label><label className="text-xs font-semibold text-slate-600 sm:col-span-2">통화 결과<input className={inputClass} value={result} onChange={(event) => setResult(event.target.value)} placeholder="예: 총무 연결, 교육자료 전달 요청" /></label><label className="text-xs font-semibold text-slate-600 sm:col-span-2">메모<textarea className={`${inputClass} min-h-20`} value={memo} onChange={(event) => setMemo(event.target.value)} /></label></div><button type="submit" disabled={savingHistory || !result.trim()} className="mt-3 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">{savingHistory ? '저장 중...' : 'History 저장'}</button></form>}
            <div className="mt-3 space-y-3">{history.length === 0 ? <p className="text-sm text-slate-500">아직 연락 기록이 없습니다.</p> : history.map((item) => <article key={item.id} className="border-l-2 border-brand-200 pl-3"><div className="flex flex-wrap items-center gap-2 text-xs text-slate-500"><span>{formatDateTime(item.contacted_at)}</span><span>·</span><span>{item.method}</span><span>·</span><span>{employees.find((employee) => employee.auth_user_id === item.employee_id)?.name ?? '직원'}</span></div><p className="mt-1 text-sm font-semibold text-slate-800">{item.result}</p>{item.memo && <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{item.memo}</p>}</article>)}</div></section>
          <section className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200"><h3 className="font-semibold text-slate-900">출처</h3><div className="mt-3 space-y-2">{sources.length === 0 ? <p className="text-sm text-slate-500">등록된 출처가 없습니다.</p> : sources.map((source) => <div key={source.id} className="rounded-xl bg-slate-50 p-3 text-sm"><p className="font-medium text-slate-800">{source.source_name}</p><p className="mt-1 text-xs text-slate-500">{source.source_type} · 확인일 {formatDate(source.checked_at)}</p>{source.source_url && <a href={source.source_url} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-brand-700 hover:underline">{source.source_url}</a>}</div>)}</div></section>
        </div>
      </div>
    </div>
  );
}
