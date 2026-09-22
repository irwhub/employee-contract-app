import { useState } from 'react';
import type { EmployeeProfile } from '../lib/supabase';
import { EMPTY_GA_FORM, GA_GRADES, GA_ORGANIZATION_TYPES, GA_PHONE_STATUSES, GA_REGIONS, GA_SALES_STAGES, type GaFormValues, type GaOrganization } from '../lib/ga-crm';

interface GaCrmFormProps {
  readonly initial?: GaFormValues;
  readonly employees: readonly EmployeeProfile[];
  readonly mode: 'create' | 'edit';
  readonly onCancel: () => void;
  readonly onSubmit: (values: GaFormValues) => Promise<void>;
}

const inputClass = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100';

export function organizationToForm(organization: GaOrganization): GaFormValues {
  return {
    ga_company_name: organization.ga_company_name, organization_name: organization.organization_name,
    organization_type: organization.organization_type, region: organization.region, district: organization.district,
    address: organization.address ?? '', representative_phone: organization.representative_phone ?? '',
    additional_phone: organization.additional_phone ?? '', agent_count: organization.agent_count === null ? '' : String(organization.agent_count),
    reliability_grade: organization.reliability_grade, phone_verification_status: organization.phone_verification_status,
    sales_stage: organization.sales_stage, assigned_to: organization.assigned_to ?? '',
    last_verified_at: organization.last_verified_at ?? '', ga_homepage: organization.ga_homepage ?? '',
    verification_notes: organization.verification_notes ?? ''
  };
}

export function GaCrmForm({ initial = EMPTY_GA_FORM, employees, mode, onCancel, onSubmit }: GaCrmFormProps) {
  const [values, setValues] = useState<GaFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof GaFormValues>(key: K, value: GaFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.ga_company_name.trim() || !values.organization_name.trim() || !values.district.trim()) {
      setError('GA 법인명, 조직명, 시군구는 필수입니다.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장하지 못했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(event) => void submit(event)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">GA 법인명<input className={inputClass} value={values.ga_company_name} onChange={(event) => update('ga_company_name', event.target.value)} placeholder="예: 메가주식회사" /></label>
        <label className="text-sm font-medium text-slate-700">조직명<input className={inputClass} value={values.organization_name} onChange={(event) => update('organization_name', event.target.value)} placeholder="예: 강남사업단" /></label>
        <label className="text-sm font-medium text-slate-700">조직구분<select className={inputClass} value={values.organization_type} onChange={(event) => update('organization_type', event.target.value as GaFormValues['organization_type'])}>{GA_ORGANIZATION_TYPES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">지역<select className={inputClass} value={values.region} onChange={(event) => update('region', event.target.value as GaFormValues['region'])}>{GA_REGIONS.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">시군구<input className={inputClass} value={values.district} onChange={(event) => update('district', event.target.value)} placeholder="예: 강남구" /></label>
        <label className="text-sm font-medium text-slate-700">설계사 수<input className={inputClass} type="number" min="0" value={values.agent_count} onChange={(event) => update('agent_count', event.target.value)} placeholder="미확인 시 비워두기" /></label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">상세주소<input className={inputClass} value={values.address} onChange={(event) => update('address', event.target.value)} placeholder="공개 출처에서 확인한 주소만 입력" /></label>
        <label className="text-sm font-medium text-slate-700">대표전화<input className={inputClass} type="tel" value={values.representative_phone} onChange={(event) => update('representative_phone', event.target.value)} placeholder="확인 전에는 비워두기" /></label>
        <label className="text-sm font-medium text-slate-700">추가 전화번호<input className={inputClass} type="tel" value={values.additional_phone} onChange={(event) => update('additional_phone', event.target.value)} /></label>
        <label className="text-sm font-medium text-slate-700">전화번호 검증상태<select className={inputClass} value={values.phone_verification_status} onChange={(event) => update('phone_verification_status', event.target.value as GaFormValues['phone_verification_status'])}>{GA_PHONE_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">신뢰도<select className={inputClass} value={values.reliability_grade} onChange={(event) => update('reliability_grade', event.target.value as GaFormValues['reliability_grade'])}>{GA_GRADES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">영업단계<select className={inputClass} value={values.sales_stage} onChange={(event) => update('sales_stage', event.target.value as GaFormValues['sales_stage'])}>{GA_SALES_STAGES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">담당 직원<select className={inputClass} value={values.assigned_to} onChange={(event) => update('assigned_to', event.target.value)}><option value="">미배정</option>{employees.map((employee) => <option key={employee.auth_user_id} value={employee.auth_user_id}>{employee.name}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">최종 확인일<input className={inputClass} type="date" value={values.last_verified_at} onChange={(event) => update('last_verified_at', event.target.value)} /></label>
        <label className="text-sm font-medium text-slate-700">GA 공식 홈페이지<input className={inputClass} type="url" value={values.ga_homepage} onChange={(event) => update('ga_homepage', event.target.value)} placeholder="https://" /></label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">검증 메모<textarea className={`${inputClass} min-h-24 resize-y`} value={values.verification_notes} onChange={(event) => update('verification_notes', event.target.value)} placeholder="출처와 검증 범위를 기록하세요." /></label>
      </div>
      {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">취소</button><button type="submit" disabled={saving} className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? '저장 중...' : mode === 'create' ? '후보 등록' : '변경 저장'}</button></div>
    </form>
  );
}
