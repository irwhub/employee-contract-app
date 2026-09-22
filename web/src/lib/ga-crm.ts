import type { EmployeeProfile } from './supabase';

export const GA_REGIONS = ['서울', '경기', '인천'] as const;
export type GaRegion = (typeof GA_REGIONS)[number];

export const GA_ORGANIZATION_TYPES = ['지점', '지사', '사업단', '본부', '센터', '지역본부', '사업부', '기타'] as const;
export type GaOrganizationType = (typeof GA_ORGANIZATION_TYPES)[number];

export const GA_GRADES = ['A+', 'A', 'B', 'C', 'D'] as const;
export type GaGrade = (typeof GA_GRADES)[number];

export const GA_SALES_STAGES = ['미연락', '연락 예정', '전화 연결', '담당자 연결', '교육 제안', '관심 있음', '자료 발송', '일정 협의', '교육 확정', '교육 완료', '후속 관리', '제휴 가능성 있음', '사건 의뢰 발생', '거절', '재연락 필요', '연락 불가', '연락 금지'] as const;
export type GaSalesStage = (typeof GA_SALES_STAGES)[number];

export const GA_PHONE_STATUSES = ['미확인', '공개정보 확인', '공식출처 확인', '복수출처 일치', '직원 실제통화 확인', '번호 불일치', '결번', '다른 업체 번호', '사용중지', '재검증 필요'] as const;
export type GaPhoneStatus = (typeof GA_PHONE_STATUSES)[number];

export const GA_CONTACT_METHODS = ['전화', '문자', '카카오톡', '이메일', '방문', '온라인미팅', '기타'] as const;
export type GaContactMethod = (typeof GA_CONTACT_METHODS)[number];

export const GA_RESEARCH_STATUSES = ['미조사', '조사중', '1차 조사완료', '교차검증중', '교차검증 완료', '추가조사 필요', '재검증 필요'] as const;
export type GaResearchStatus = (typeof GA_RESEARCH_STATUSES)[number];

export interface GaOrganization {
  readonly id: string;
  readonly ga_company_name: string;
  readonly organization_name: string;
  readonly organization_type: GaOrganizationType;
  readonly region: GaRegion;
  readonly district: string;
  readonly address: string | null;
  readonly postal_code: string | null;
  readonly representative_phone: string | null;
  readonly additional_phone: string | null;
  readonly homepage: string | null;
  readonly ga_homepage: string | null;
  readonly agent_count: number | null;
  readonly organization_size: string;
  readonly operating_status: string;
  readonly last_verified_at: string | null;
  readonly phone_verification_status: GaPhoneStatus;
  readonly address_verification_status: string;
  readonly organization_verification_status: string;
  readonly reliability_grade: GaGrade;
  readonly verification_notes: string | null;
  readonly needs_reverification: boolean;
  readonly reverify_due_at: string | null;
  readonly record_status: 'candidate' | 'approved' | 'rejected' | 'archived';
  readonly assigned_to: string | null;
  readonly sales_stage: GaSalesStage;
  readonly interest_level: string;
  readonly first_contacted_at: string | null;
  readonly last_contacted_at: string | null;
  readonly contact_count: number;
  readonly contact_person_name: string | null;
  readonly contact_person_title: string | null;
  readonly contact_person_phone: string | null;
  readonly last_contact_result: string | null;
  readonly next_contact_at: string | null;
  readonly sales_memo: string | null;
  readonly education_interest: boolean;
  readonly education_topic: string | null;
  readonly expected_attendees: number | null;
  readonly education_format: string | null;
  readonly education_scheduled_at: string | null;
  readonly education_completed_at: string | null;
  readonly referral_occurred: boolean;
  readonly referral_count: number;
  readonly created_at: string;
}

export interface GaSource {
  readonly id: string;
  readonly organization_id: string;
  readonly source_name: string;
  readonly source_url: string | null;
  readonly source_type: string;
  readonly searched_keyword: string | null;
  readonly checked_at: string;
  readonly note: string | null;
}

export interface GaContactHistory {
  readonly id: string;
  readonly organization_id: string;
  readonly contacted_at: string;
  readonly employee_id: string;
  readonly method: GaContactMethod;
  readonly contact_person_name: string | null;
  readonly contact_person_title: string | null;
  readonly result: string;
  readonly memo: string | null;
  readonly next_action: string | null;
  readonly next_contact_at: string | null;
}

export interface GaResearchProgress {
  readonly id: string;
  readonly region: GaRegion;
  readonly district: string;
  readonly status: GaResearchStatus;
  readonly query_count: number;
  readonly organization_count: number;
  readonly last_searched_at: string | null;
  readonly needs_more_research: boolean;
  readonly notes: string | null;
}

export interface GaFormValues {
  readonly ga_company_name: string;
  readonly organization_name: string;
  readonly organization_type: GaOrganizationType;
  readonly region: GaRegion;
  readonly district: string;
  readonly address: string;
  readonly representative_phone: string;
  readonly additional_phone: string;
  readonly agent_count: string;
  readonly reliability_grade: GaGrade;
  readonly phone_verification_status: GaPhoneStatus;
  readonly sales_stage: GaSalesStage;
  readonly assigned_to: string;
  readonly last_verified_at: string;
  readonly ga_homepage: string;
  readonly verification_notes: string;
}

export const EMPTY_GA_FORM: GaFormValues = {
  ga_company_name: '', organization_name: '', organization_type: '지점', region: '서울', district: '',
  address: '', representative_phone: '', additional_phone: '', agent_count: '', reliability_grade: 'C',
  phone_verification_status: '미확인', sales_stage: '미연락', assigned_to: '', last_verified_at: '',
  ga_homepage: '', verification_notes: ''
};

export function getPriorityScore(organization: GaOrganization): number {
  let score = 0;
  if (organization.representative_phone) score += 25;
  if (organization.phone_verification_status === '복수출처 일치' || organization.phone_verification_status === '직원 실제통화 확인') score += 20;
  if (organization.organization_type === '지점' || organization.organization_type === '지사' || organization.organization_type === '사업단') score += 15;
  if (organization.agent_count !== null && organization.agent_count >= 20 && organization.agent_count <= 200) score += 15;
  if (organization.reliability_grade === 'A+' || organization.reliability_grade === 'A') score += 15;
  if (organization.sales_stage === '미연락') score += 10;
  if (organization.education_interest) score += 5;
  return score;
}

export function formatDate(value: string | null): string {
  if (!value) return '미확인';
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(value));
}

export function formatDateTime(value: string | null): string {
  if (!value) return '미정';
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value));
}

export function toCsvValue(value: string | number | null | undefined): string {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export function exportGaCsv(rows: readonly GaOrganization[]): void {
  const header = ['GA법인명', '조직명', '조직구분', '지역', '시군구', '주소', '대표전화', '설계사수', '신뢰도', '영업단계', '최종확인일'];
  const body = rows.map((row) => [row.ga_company_name, row.organization_name, row.organization_type, row.region, row.district, row.address, row.representative_phone, row.agent_count, row.reliability_grade, row.sales_stage, row.last_verified_at].map(toCsvValue).join(','));
  const blob = new Blob([`\uFEFF${[header.map(toCsvValue).join(','), ...body].join('\n')}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ga-crm-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export interface GaImportRow {
  readonly rowNumber: number;
  readonly values: Record<string, string>;
  readonly errors: readonly string[];
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') { current += '"'; index += 1; } else { quoted = !quoted; }
    } else if (character === ',' && !quoted) { values.push(current.trim()); current = ''; } else { current += character; }
  }
  values.push(current.trim());
  return values;
}

export function parseGaCsv(text: string): GaImportRow[] {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter((line) => line.trim().length > 0);
  const headers = lines[0] ? parseCsvLine(lines[0]) : [];
  return lines.slice(1).map((line, index) => {
    const cells = parseCsvLine(line);
    const values: Record<string, string> = {};
    headers.forEach((header, cellIndex) => { values[header] = cells[cellIndex] ?? ''; });
    const errors: string[] = [];
    if (!values['GA법인명']) errors.push('GA법인명 누락');
    if (!values['조직명']) errors.push('조직명 누락');
    if (!values['지역'] || !GA_REGIONS.includes(values['지역'] as GaRegion)) errors.push('지역 오류');
    if (!values['시군구']) errors.push('시군구 누락');
    if (values['대표전화'] && !/^(0\d{1,2})[-\s]?\d{3,4}[-\s]?\d{4}$/.test(values['대표전화'])) errors.push('전화번호 형식 오류');
    return { rowNumber: index + 2, values, errors };
  });
}

export function employeeName(employees: readonly EmployeeProfile[], id: string | null): string {
  return employees.find((employee) => employee.auth_user_id === id)?.name ?? '미배정';
}
