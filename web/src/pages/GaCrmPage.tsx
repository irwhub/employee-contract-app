import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { GaCrmDataView, GaCrmEducationView, GaCrmPipelineView, GaCrmResearchView, GaCrmStatsView } from '../components/GaCrmOperationsViews';
import { GaCrmDetailPanel } from '../components/GaCrmDetailPanel';
import { GaCrmForm, organizationToForm } from '../components/GaCrmForm';
import { GaCrmListView, type GaListFilters } from '../components/GaCrmListView';
import type { EmployeeProfile } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { EMPTY_GA_FORM, GA_REGIONS, exportGaCsv, parseGaCsv, type GaContactHistory, type GaContactMethod, type GaFormValues, type GaImportRow, type GaOrganization, type GaResearchProgress, type GaSource } from '../lib/ga-crm';

type GaCrmSection = 'db' | 'pipeline' | 'follow-ups' | 'education' | 'stats' | 'research' | 'data';
interface GaCrmPageProps { readonly profile: EmployeeProfile; readonly section?: GaCrmSection; }
interface Summary { readonly total: number; readonly phone: number; readonly uncontacted: number; readonly recentVerified: number; readonly regions: Readonly<Record<string, number>>; readonly grades: Readonly<Record<string, number>>; }

const PAGE_SIZE = 20;
const initialFilters: GaListFilters = { search: '', region: '전체', grade: '전체', stage: '전체', assignedTo: '', page: 0 };
const links: ReadonlyArray<{ readonly key: GaCrmSection; readonly label: string; readonly to: string }> = [
  { key: 'db', label: 'GA DB', to: '/ga-crm' }, { key: 'pipeline', label: '영업 진행현황', to: '/ga-crm/pipeline' },
  { key: 'follow-ups', label: '연락 예정', to: '/ga-crm/follow-ups' }, { key: 'education', label: '교육 일정', to: '/ga-crm/education' },
  { key: 'stats', label: '영업 통계', to: '/ga-crm/stats' }, { key: 'research', label: '데이터 조사현황', to: '/ga-crm/research' },
  { key: 'data', label: '데이터 관리', to: '/ga-crm/data' }
];

function errorMessage(value: unknown): string { return value instanceof Error ? value.message : 'GA 영업 DB를 불러오지 못했습니다.'; }

export function GaCrmPage({ profile, section = 'db' }: GaCrmPageProps) {
  const [rows, setRows] = useState<GaOrganization[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<GaListFilters>(initialFilters);
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [researchRows, setResearchRows] = useState<GaResearchProgress[]>([]);
  const [summary, setSummary] = useState<Summary>({ total: 0, phone: 0, uncontacted: 0, recentVerified: 0, regions: {}, grades: {} });
  const [selected, setSelected] = useState<GaOrganization | null>(null);
  const [sources, setSources] = useState<GaSource[]>([]);
  const [history, setHistory] = useState<GaContactHistory[]>([]);
  const [formMode, setFormMode] = useState<'create' | 'edit' | null>(null);
  const [importRows, setImportRows] = useState<GaImportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRows = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      let query = supabase.from('ga_organizations').select('*', { count: 'exact' }).order('reliability_grade', { ascending: true }).order('last_verified_at', { ascending: false, nullsFirst: false });
      const search = filters.search.trim().replace(/[,%]/g, '');
      if (search) query = query.or(`ga_company_name.ilike.%${search}%,organization_name.ilike.%${search}%,district.ilike.%${search}%,representative_phone.ilike.%${search}%`);
      if (filters.region !== '전체') query = query.eq('region', filters.region);
      if (filters.grade !== '전체') query = query.eq('reliability_grade', filters.grade);
      if (filters.stage !== '전체') query = query.eq('sales_stage', filters.stage);
      if (filters.assignedTo) query = query.eq('assigned_to', filters.assignedTo);
      const today = new Date();
      const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
      if (section === 'follow-ups') query = query.not('next_contact_at', 'is', null).lte('next_contact_at', nextWeek.toISOString());
      if (section === 'education') query = query.or('education_interest.eq.true,education_scheduled_at.not.is.null');
      const result = await query.range(filters.page * PAGE_SIZE, filters.page * PAGE_SIZE + PAGE_SIZE - 1);
      if (result.error) throw result.error;
      setRows(result.data ?? []); setTotalCount(result.count ?? 0);
    } catch (err) {
      setError(`${errorMessage(err)} migration 20260922_ga_crm.sql 적용 후 다시 시도하세요.`);
      setRows([]); setTotalCount(0);
    } finally { setLoading(false); }
  }, [filters, section]);

  useEffect(() => { void loadRows(); }, [loadRows]);
  useEffect(() => {
    const loadSupportingData = async () => {
      const [employeeResult, researchResult] = await Promise.all([supabase.from('employees').select('auth_user_id,name,role,dob').eq('is_active', true).order('name'), supabase.from('ga_research_progress').select('*').order('region').order('district')]);
      if (!employeeResult.error) setEmployees(employeeResult.data ?? []);
      if (!researchResult.error) setResearchRows(researchResult.data ?? []);
    };
    void loadSupportingData();
  }, []);
  useEffect(() => {
    const loadSummary = async () => {
      const regions = await Promise.all(GA_REGIONS.map(async (region) => [region, await supabase.from('ga_organizations').select('id', { count: 'exact', head: true }).eq('region', region)] as const));
      const [all, phone, uncontacted, recent, grades] = await Promise.all([
        supabase.from('ga_organizations').select('id', { count: 'exact', head: true }),
        supabase.from('ga_organizations').select('id', { count: 'exact', head: true }).not('representative_phone', 'is', null),
        supabase.from('ga_organizations').select('id', { count: 'exact', head: true }).eq('sales_stage', '미연락'),
        supabase.from('ga_organizations').select('id', { count: 'exact', head: true }).gte('last_verified_at', new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10)),
        Promise.all(['A+', 'A', 'B', 'C', 'D'].map(async (grade) => [grade, await supabase.from('ga_organizations').select('id', { count: 'exact', head: true }).eq('reliability_grade', grade)] as const))
      ]);
      const regionCounts = Object.fromEntries(regions.map(([region, result]) => [region, result.count ?? 0]));
      const gradeCounts = Object.fromEntries(grades.map(([grade, result]) => [grade, result.count ?? 0]));
      setSummary({ total: all.count ?? 0, phone: phone.count ?? 0, uncontacted: uncontacted.count ?? 0, recentVerified: recent.count ?? 0, regions: regionCounts, grades: gradeCounts });
    };
    void loadSummary();
  }, [rows.length]);

  const selectOrganization = async (organization: GaOrganization) => {
    setSelected(organization);
    const [sourceResult, historyResult] = await Promise.all([supabase.from('ga_sources').select('*').eq('organization_id', organization.id).order('checked_at', { ascending: false }), supabase.from('ga_contact_history').select('*').eq('organization_id', organization.id).order('contacted_at', { ascending: false })]);
    setSources(sourceResult.data ?? []); setHistory(historyResult.data ?? []);
  };

  const saveOrganization = async (values: GaFormValues) => {
    const payload = { ...values, agent_count: values.agent_count ? Number(values.agent_count) : null, assigned_to: values.assigned_to || null, last_verified_at: values.last_verified_at || null, ga_homepage: values.ga_homepage || null, verification_notes: values.verification_notes || null, address: values.address || null, representative_phone: values.representative_phone || null, additional_phone: values.additional_phone || null };
    if (formMode === 'create') { const result = await supabase.from('ga_organizations').insert({ ...payload, created_by: profile.auth_user_id, record_status: 'candidate' }); if (result.error) throw result.error; }
    else if (selected) { const result = await supabase.from('ga_organizations').update(payload).eq('id', selected.id); if (result.error) throw result.error; }
    setFormMode(null); await loadRows();
  };

  const verifyCall = async () => { if (!selected) return; const result = await supabase.from('ga_organizations').update({ phone_verification_status: '직원 실제통화 확인', last_verified_at: new Date().toISOString().slice(0, 10), needs_reverification: false }).eq('id', selected.id); if (result.error) throw result.error; const updated = { ...selected, phone_verification_status: '직원 실제통화 확인' as const, last_verified_at: new Date().toISOString().slice(0, 10), needs_reverification: false }; setSelected(updated); setRows((current) => current.map((row) => row.id === updated.id ? updated : row)); };

  const approveOrganization = async () => { if (!selected) return; const result = await supabase.from('ga_organizations').update({ record_status: 'approved', approved_by: profile.auth_user_id, approved_at: new Date().toISOString() }).eq('id', selected.id); if (result.error) throw result.error; const updated = { ...selected, record_status: 'approved' as const }; setSelected(updated); setRows((current) => current.map((row) => row.id === updated.id ? updated : row)); };

  const addHistory = async (values: { readonly method: GaContactMethod; readonly result: string; readonly memo: string; readonly next_contact_at: string }) => { if (!selected) return; const now = new Date().toISOString(); const result = await supabase.from('ga_contact_history').insert({ organization_id: selected.id, employee_id: profile.auth_user_id, contacted_at: now, method: values.method, result: values.result, memo: values.memo || null, next_contact_at: values.next_contact_at ? new Date(values.next_contact_at).toISOString() : null }); if (result.error) throw result.error; const updateResult = await supabase.from('ga_organizations').update({ contact_count: selected.contact_count + 1, first_contacted_at: selected.first_contacted_at ?? now, last_contacted_at: now, last_contact_result: values.result, next_contact_at: values.next_contact_at ? new Date(values.next_contact_at).toISOString() : null, sales_stage: selected.sales_stage === '미연락' ? '전화 연결' : selected.sales_stage }).eq('id', selected.id); if (updateResult.error) throw updateResult.error; await selectOrganization({ ...selected, contact_count: selected.contact_count + 1, first_contacted_at: selected.first_contacted_at ?? now, last_contacted_at: now, last_contact_result: values.result, next_contact_at: values.next_contact_at ? new Date(values.next_contact_at).toISOString() : null, sales_stage: selected.sales_stage === '미연락' ? '전화 연결' : selected.sales_stage }); await loadRows(); };

  const importCsv = async (file: File) => { const parsed = parseGaCsv(await file.text()); setImportRows(parsed); const valid = parsed.filter((row) => row.errors.length === 0); if (valid.length === 0) return; const failures: GaImportRow[] = []; for (const row of valid) { const values = row.values; const result = await supabase.from('ga_organizations').insert({ ga_company_name: values['GA법인명'], organization_name: values['조직명'], organization_type: values['조직구분'] || '기타', region: values['지역'], district: values['시군구'], address: values['주소'] || null, representative_phone: values['대표전화'] || null, additional_phone: values['추가전화'] || null, agent_count: values['설계사수'] ? Number(values['설계사수']) : null, reliability_grade: values['신뢰도'] || 'C', phone_verification_status: values['대표전화'] ? '공개정보 확인' : '미확인', last_verified_at: values['최종확인일'] || null, created_by: profile.auth_user_id, record_status: 'candidate' }); if (result.error) failures.push({ ...row, errors: [result.error.message] }); } if (failures.length > 0) setImportRows([...parsed.filter((row) => row.errors.length > 0), ...failures]); await loadRows(); };

  const heading = section === 'db' ? 'GA DB' : links.find((link) => link.key === section)?.label ?? 'GA 영업관리';
  const detailForm = selected && formMode === 'edit' ? <GaCrmForm mode="edit" initial={organizationToForm(selected)} employees={employees} onCancel={() => setFormMode(null)} onSubmit={saveOrganization} /> : null;
  const listRows = useMemo(() => rows, [rows]);

  return <div className="space-y-4 pb-8"><div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Sales operations</p><h1 className="mt-1 text-2xl font-bold text-slate-900">GA 영업관리</h1><p className="mt-1 text-sm text-slate-500">수도권 공개자료 기반 영업 DB와 연락·교육 이력을 한 곳에서 관리합니다.</p></div><div className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">공개 업무정보만 저장 · {profile.role === 'admin' ? '관리자' : '직원'} 권한</div></div><nav className="flex gap-2 overflow-x-auto pb-1" aria-label="GA 영업관리 메뉴">{links.map((link) => <Link key={link.key} to={link.to} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition ${section === link.key ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{link.label}</Link>)}</nav>{error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}{loading && <Card><p className="text-sm text-slate-500">GA 영업 DB를 불러오는 중...</p></Card>}{!loading && section === 'db' && <GaCrmListView rows={listRows} totalCount={totalCount} filters={filters} employees={employees} onFiltersChange={setFilters} onSelect={(row) => void selectOrganization(row)} onCreate={() => { setSelected(null); setFormMode('create'); }} isAdmin={profile.role === 'admin'} />}{!loading && section === 'pipeline' && <GaCrmPipelineView rows={listRows} onSelect={(row) => void selectOrganization(row)} />}{!loading && section === 'follow-ups' && <GaCrmPipelineView rows={listRows} onSelect={(row) => void selectOrganization(row)} />}{!loading && section === 'education' && <GaCrmEducationView rows={listRows} onSelect={(row) => void selectOrganization(row)} />}{section === 'stats' && <GaCrmStatsView summary={summary} />}{section === 'research' && <GaCrmResearchView rows={researchRows} />}{section === 'data' && <GaCrmDataView isAdmin={profile.role === 'admin'} rows={rows} importRows={importRows} onImport={importCsv} onExport={() => exportGaCsv(rows)} employees={employees} />}{formMode === 'create' && <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100"><div className="mb-4 flex items-start justify-between"><div><h2 className="text-lg font-bold text-slate-900">GA 후보 등록</h2><p className="mt-1 text-sm text-slate-500">확인된 공개정보만 입력하고 출처를 상세 메모에 남겨주세요.</p></div><button type="button" onClick={() => setFormMode(null)} className="text-sm text-slate-500">닫기</button></div><GaCrmForm mode="create" initial={EMPTY_GA_FORM} employees={employees} onCancel={() => setFormMode(null)} onSubmit={saveOrganization} /></div>}{detailForm}{selected && !formMode && <GaCrmDetailPanel organization={selected} sources={sources} history={history} employees={employees} isAdmin={profile.role === 'admin'} onClose={() => setSelected(null)} onEdit={() => setFormMode('edit')} onApprove={approveOrganization} onVerifyCall={verifyCall} onAddHistory={addHistory} />}</div>;
}
