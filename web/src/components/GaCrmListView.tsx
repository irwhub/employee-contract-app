import type { EmployeeProfile } from '../lib/supabase';
import { formatDate, getPriorityScore, employeeName, exportGaCsv, type GaOrganization, type GaRegion, type GaGrade, type GaSalesStage } from '../lib/ga-crm';
import { GradeBadge, StageBadge } from './GaCrmBadges';

export interface GaListFilters {
  readonly search: string;
  readonly region: GaRegion | '전체';
  readonly grade: GaGrade | '전체';
  readonly stage: GaSalesStage | '전체';
  readonly assignedTo: string;
  readonly page: number;
}

interface GaCrmListViewProps {
  readonly rows: readonly GaOrganization[];
  readonly totalCount: number;
  readonly filters: GaListFilters;
  readonly employees: readonly EmployeeProfile[];
  readonly onFiltersChange: (filters: GaListFilters) => void;
  readonly onSelect: (organization: GaOrganization) => void;
  readonly onCreate: () => void;
  readonly isAdmin: boolean;
}

const selectClass = 'rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100';
const PAGE_SIZE = 20;

export function GaCrmListView({ rows, totalCount, filters, employees, onFiltersChange, onSelect, onCreate, isAdmin }: GaCrmListViewProps) {
  const pages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const set = <K extends keyof GaListFilters>(key: K, value: GaListFilters[K]) => onFiltersChange({ ...filters, [key]: value, page: key === 'page' ? (value as number) : 0 });
  return (
    <section className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"><div className="grid flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.8fr)_repeat(4,minmax(120px,1fr))]"><label className="text-xs font-semibold text-slate-500 sm:col-span-2 lg:col-span-1">검색<input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" value={filters.search} onChange={(event) => set('search', event.target.value)} placeholder="법인명, 조직명, 주소, 전화" /></label><label className="text-xs font-semibold text-slate-500">지역<select className={`${selectClass} mt-1 w-full`} value={filters.region} onChange={(event) => set('region', event.target.value as GaListFilters['region'])}><option>전체</option><option>서울</option><option>경기</option><option>인천</option></select></label><label className="text-xs font-semibold text-slate-500">신뢰도<select className={`${selectClass} mt-1 w-full`} value={filters.grade} onChange={(event) => set('grade', event.target.value as GaListFilters['grade'])}><option>전체</option><option>A+</option><option>A</option><option>B</option><option>C</option><option>D</option></select></label><label className="text-xs font-semibold text-slate-500">영업단계<select className={`${selectClass} mt-1 w-full`} value={filters.stage} onChange={(event) => set('stage', event.target.value as GaListFilters['stage'])}><option>전체</option>{['미연락', '연락 예정', '관심 있음', '교육 확정', '재연락 필요', '연락 금지'].map((stage) => <option key={stage}>{stage}</option>)}</select></label><label className="text-xs font-semibold text-slate-500">담당 직원<select className={`${selectClass} mt-1 w-full`} value={filters.assignedTo} onChange={(event) => set('assignedTo', event.target.value)}><option value="">전체</option>{employees.map((employee) => <option key={employee.auth_user_id} value={employee.auth_user_id}>{employee.name}</option>)}</select></label></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => exportGaCsv(rows)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">CSV 내보내기</button>{isAdmin && <button type="button" onClick={onCreate} className="rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700">+ GA 후보 등록</button>}</div></div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200"><table className="min-w-[1080px] w-full text-left text-sm"><thead className="bg-slate-50 text-xs font-semibold text-slate-500"><tr><th className="px-3 py-3">우선순위</th><th className="px-3 py-3">신뢰도</th><th className="px-3 py-3">GA / 조직</th><th className="px-3 py-3">지역</th><th className="px-3 py-3">대표전화</th><th className="px-3 py-3">설계사</th><th className="px-3 py-3">담당</th><th className="px-3 py-3">영업단계</th><th className="px-3 py-3">최근 검증</th><th className="px-3 py-3">다음 연락</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row.id} className="cursor-pointer transition hover:bg-brand-50/50" onClick={() => onSelect(row)}><td className="px-3 py-3 font-bold text-slate-800">{getPriorityScore(row)}</td><td className="px-3 py-3"><GradeBadge grade={row.reliability_grade} /></td><td className="px-3 py-3"><p className="font-semibold text-slate-800">{row.organization_name}</p><p className="mt-0.5 text-xs text-slate-500">{row.ga_company_name} · {row.organization_type}</p></td><td className="px-3 py-3 text-slate-600">{row.region}<br /><span className="text-xs text-slate-500">{row.district}</span></td><td className="px-3 py-3">{row.representative_phone ? <div className="flex items-center gap-2"><a href={`tel:${row.representative_phone}`} onClick={(event) => event.stopPropagation()} className="font-semibold text-brand-700 hover:underline">{row.representative_phone}</a><button type="button" onClick={(event) => { event.stopPropagation(); void navigator.clipboard?.writeText(row.representative_phone ?? ''); }} className="rounded-md border border-slate-200 px-1.5 py-1 text-[11px] text-slate-500">복사</button></div> : <span className="text-slate-400">미확인</span>}</td><td className="px-3 py-3 text-slate-600">{row.agent_count === null ? '미확인' : `${row.agent_count}명`}</td><td className="px-3 py-3 text-slate-600">{employeeName(employees, row.assigned_to)}</td><td className="px-3 py-3"><StageBadge stage={row.sales_stage} /></td><td className="px-3 py-3 text-xs text-slate-500">{formatDate(row.last_verified_at)}</td><td className="px-3 py-3 text-xs text-slate-500">{formatDate(row.next_contact_at)}</td></tr>)}</tbody></table>{rows.length === 0 && <div className="px-4 py-12 text-center"><p className="font-semibold text-slate-700">조건에 맞는 GA 조직이 없습니다.</p><p className="mt-1 text-sm text-slate-500">검색 조건을 바꾸거나 관리자에게 공개자료 조사 후보 등록을 요청하세요.</p></div>}</div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500"><span>{totalCount.toLocaleString('ko-KR')}건 · {filters.page + 1}/{pages} 페이지</span><div className="flex gap-2"><button type="button" disabled={filters.page === 0} onClick={() => set('page', filters.page - 1)} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-40">이전</button><button type="button" disabled={filters.page >= pages - 1} onClick={() => set('page', filters.page + 1)} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-40">다음</button></div></div>
    </section>
  );
}
