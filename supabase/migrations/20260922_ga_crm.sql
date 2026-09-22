create table if not exists public.ga_organizations (
  id uuid primary key default gen_random_uuid(),
  ga_company_name text not null,
  organization_name text not null,
  organization_type text not null check (organization_type in ('지점', '지사', '사업단', '본부', '센터', '지역본부', '사업부', '기타')),
  region text not null check (region in ('서울', '경기', '인천')),
  district text not null,
  address text,
  postal_code text,
  representative_phone text,
  additional_phone text,
  fax text,
  business_mobile text,
  homepage text,
  ga_homepage text,
  agent_count integer check (agent_count is null or agent_count >= 0),
  agent_count_as_of date,
  organization_size text not null default '미확인' check (organization_size in ('소형', '중형', '대형', '미확인')),
  operating_status text not null default '미확인' check (operating_status in ('영업중 확인', '영업중 추정', '이전 가능성', '폐쇄 가능성', '폐업 확인', '미확인')),
  first_discovered_at date not null default current_date,
  last_verified_at date,
  collection_method text not null default '수동 조사',
  search_keywords text,
  phone_verification_status text not null default '미확인' check (phone_verification_status in ('미확인', '공개정보 확인', '공식출처 확인', '복수출처 일치', '직원 실제통화 확인', '번호 불일치', '결번', '다른 업체 번호', '사용중지', '재검증 필요')),
  address_verification_status text not null default '미확인' check (address_verification_status in ('미확인', '공개정보 확인', '공식출처 확인', '복수출처 일치', '직원 실제통화 확인', '불일치', '재검증 필요')),
  organization_verification_status text not null default '미확인' check (organization_verification_status in ('미확인', '공개정보 확인', '공식출처 확인', '복수출처 일치', '직원 실제통화 확인', '존재 불명확', '재검증 필요')),
  reliability_grade text not null default 'C' check (reliability_grade in ('A+', 'A', 'B', 'C', 'D')),
  verification_notes text,
  needs_reverification boolean not null default false,
  reverify_due_at date,
  record_status text not null default 'candidate' check (record_status in ('candidate', 'approved', 'rejected', 'archived')),
  assigned_to uuid references public.employees(auth_user_id) on delete set null,
  sales_stage text not null default '미연락' check (sales_stage in ('미연락', '연락 예정', '전화 연결', '담당자 연결', '교육 제안', '관심 있음', '자료 발송', '일정 협의', '교육 확정', '교육 완료', '후속 관리', '제휴 가능성 있음', '사건 의뢰 발생', '거절', '재연락 필요', '연락 불가', '연락 금지')),
  interest_level text not null default '미확인' check (interest_level in ('미확인', '낮음', '보통', '높음')),
  first_contacted_at timestamptz,
  last_contacted_at timestamptz,
  contact_count integer not null default 0 check (contact_count >= 0),
  contact_person_name text,
  contact_person_title text,
  contact_person_phone text,
  last_contact_result text,
  next_contact_at timestamptz,
  sales_memo text,
  internal_memo text,
  education_interest boolean not null default false,
  education_topic text,
  expected_attendees integer check (expected_attendees is null or expected_attendees >= 0),
  education_format text,
  education_scheduled_at timestamptz,
  education_completed_at timestamptz,
  referral_occurred boolean not null default false,
  referral_count integer not null default 0 check (referral_count >= 0),
  created_by uuid references public.employees(auth_user_id) on delete set null,
  approved_by uuid references public.employees(auth_user_id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ga_organizations_region_district_idx on public.ga_organizations (region, district);
create index if not exists ga_organizations_grade_stage_idx on public.ga_organizations (reliability_grade, sales_stage);
create index if not exists ga_organizations_next_contact_idx on public.ga_organizations (next_contact_at);
create index if not exists ga_organizations_verified_idx on public.ga_organizations (last_verified_at desc);
create index if not exists ga_organizations_search_idx on public.ga_organizations using gin (to_tsvector('simple', coalesce(ga_company_name, '') || ' ' || coalesce(organization_name, '') || ' ' || coalesce(address, '') || ' ' || coalesce(representative_phone, '')));

create table if not exists public.ga_sources (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.ga_organizations(id) on delete cascade,
  source_name text not null,
  source_url text,
  source_type text not null check (source_type in ('공식 보험공시', '정부/공공기관', 'GA 공식 홈페이지', 'GA 공식 채용정보', '지도/사업장 정보', '보험관련 DB', '검색엔진', '기타 공개정보')),
  searched_keyword text,
  checked_at date not null default current_date,
  note text,
  created_by uuid references public.employees(auth_user_id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists ga_sources_organization_idx on public.ga_sources (organization_id, checked_at desc);

create table if not exists public.ga_contact_history (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.ga_organizations(id) on delete cascade,
  contacted_at timestamptz not null default now(),
  employee_id uuid not null references public.employees(auth_user_id) on delete restrict,
  method text not null check (method in ('전화', '문자', '카카오톡', '이메일', '방문', '온라인미팅', '기타')),
  contact_person_name text,
  contact_person_title text,
  result text not null,
  memo text,
  next_action text,
  next_contact_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists ga_contact_history_org_date_idx on public.ga_contact_history (organization_id, contacted_at desc);
create index if not exists ga_contact_history_next_contact_idx on public.ga_contact_history (next_contact_at);

create table if not exists public.ga_education_sessions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.ga_organizations(id) on delete cascade,
  topic text not null,
  scheduled_at timestamptz,
  completed_at timestamptz,
  format text,
  expected_attendees integer check (expected_attendees is null or expected_attendees >= 0),
  status text not null default '협의중' check (status in ('제안 전', '협의중', '확정', '완료', '취소')),
  notes text,
  created_by uuid not null references public.employees(auth_user_id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ga_education_sessions_schedule_idx on public.ga_education_sessions (scheduled_at);

create table if not exists public.ga_duplicate_candidates (
  id uuid primary key default gen_random_uuid(),
  organization_id_a uuid not null references public.ga_organizations(id) on delete cascade,
  organization_id_b uuid not null references public.ga_organizations(id) on delete cascade,
  match_reason text not null,
  status text not null default '검토중' check (status in ('검토중', '병합완료', '동일 아님', '보류')),
  reviewed_by uuid references public.employees(auth_user_id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  check (organization_id_a <> organization_id_b)
);

create unique index if not exists ga_duplicate_pair_unique
on public.ga_duplicate_candidates (least(organization_id_a, organization_id_b), greatest(organization_id_a, organization_id_b));

create table if not exists public.ga_research_progress (
  id uuid primary key default gen_random_uuid(),
  region text not null check (region in ('서울', '경기', '인천')),
  district text not null,
  status text not null default '미조사' check (status in ('미조사', '조사중', '1차 조사완료', '교차검증중', '교차검증 완료', '추가조사 필요', '재검증 필요')),
  query_count integer not null default 0 check (query_count >= 0),
  organization_count integer not null default 0 check (organization_count >= 0),
  last_searched_at timestamptz,
  needs_more_research boolean not null default false,
  notes text,
  updated_by uuid references public.employees(auth_user_id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (region, district)
);

create or replace function private.ga_protect_staff_update()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if private.is_active_admin() then
    return new;
  end if;

  if (to_jsonb(old) - array[
    'representative_phone', 'additional_phone', 'business_mobile', 'address', 'phone_verification_status',
    'address_verification_status', 'organization_verification_status', 'last_verified_at', 'verification_notes',
    'needs_reverification', 'reverify_due_at', 'sales_stage', 'interest_level', 'first_contacted_at',
    'last_contacted_at', 'contact_count', 'contact_person_name', 'contact_person_title', 'contact_person_phone',
    'last_contact_result', 'next_contact_at', 'sales_memo', 'internal_memo', 'education_interest',
    'education_topic', 'expected_attendees', 'education_format', 'education_scheduled_at', 'education_completed_at',
    'referral_occurred', 'referral_count', 'updated_at'
  ]) is distinct from (to_jsonb(new) - array[
    'representative_phone', 'additional_phone', 'business_mobile', 'address', 'phone_verification_status',
    'address_verification_status', 'organization_verification_status', 'last_verified_at', 'verification_notes',
    'needs_reverification', 'reverify_due_at', 'sales_stage', 'interest_level', 'first_contacted_at',
    'last_contacted_at', 'contact_count', 'contact_person_name', 'contact_person_title', 'contact_person_phone',
    'last_contact_result', 'next_contact_at', 'sales_memo', 'internal_memo', 'education_interest',
    'education_topic', 'expected_attendees', 'education_format', 'education_scheduled_at', 'education_completed_at',
    'referral_occurred', 'referral_count', 'updated_at'
  ]) then
    raise exception '직원 권한으로 변경할 수 없는 GA 기본정보가 포함되어 있습니다.';
  end if;
  return new;
end;
$$;

create or replace function public.ga_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists ga_organizations_staff_guard on public.ga_organizations;
create trigger ga_organizations_staff_guard before update on public.ga_organizations
for each row execute procedure private.ga_protect_staff_update();

drop trigger if exists ga_organizations_set_updated_at on public.ga_organizations;
create trigger ga_organizations_set_updated_at before update on public.ga_organizations
for each row execute procedure public.ga_set_updated_at();

drop trigger if exists ga_education_sessions_set_updated_at on public.ga_education_sessions;
create trigger ga_education_sessions_set_updated_at before update on public.ga_education_sessions
for each row execute procedure public.ga_set_updated_at();

grant select, insert, update, delete on table public.ga_organizations to authenticated, service_role;
grant select, insert, update, delete on table public.ga_sources to authenticated, service_role;
grant select, insert, update, delete on table public.ga_contact_history to authenticated, service_role;
grant select, insert, update, delete on table public.ga_education_sessions to authenticated, service_role;
grant select, insert, update, delete on table public.ga_duplicate_candidates to authenticated, service_role;
grant select, insert, update, delete on table public.ga_research_progress to authenticated, service_role;

alter table public.ga_organizations enable row level security;
alter table public.ga_sources enable row level security;
alter table public.ga_contact_history enable row level security;
alter table public.ga_education_sessions enable row level security;
alter table public.ga_duplicate_candidates enable row level security;
alter table public.ga_research_progress enable row level security;

drop policy if exists ga_organizations_authenticated_select on public.ga_organizations;
create policy ga_organizations_authenticated_select on public.ga_organizations for select to authenticated using (true);
drop policy if exists ga_organizations_authenticated_insert on public.ga_organizations;
create policy ga_organizations_authenticated_insert on public.ga_organizations for insert to authenticated with check (private.is_active_admin());
drop policy if exists ga_organizations_authenticated_update on public.ga_organizations;
create policy ga_organizations_authenticated_update on public.ga_organizations for update to authenticated using (true) with check (true);
drop policy if exists ga_organizations_admin_delete on public.ga_organizations;
create policy ga_organizations_admin_delete on public.ga_organizations for delete to authenticated using (private.is_active_admin());

drop policy if exists ga_sources_authenticated_select on public.ga_sources;
create policy ga_sources_authenticated_select on public.ga_sources for select to authenticated using (true);
drop policy if exists ga_sources_admin_insert on public.ga_sources;
create policy ga_sources_admin_insert on public.ga_sources for insert to authenticated with check (private.is_active_admin());
drop policy if exists ga_sources_admin_update on public.ga_sources;
create policy ga_sources_admin_update on public.ga_sources for update to authenticated using (private.is_active_admin()) with check (private.is_active_admin());
drop policy if exists ga_sources_admin_delete on public.ga_sources;
create policy ga_sources_admin_delete on public.ga_sources for delete to authenticated using (private.is_active_admin());

drop policy if exists ga_history_authenticated_select on public.ga_contact_history;
create policy ga_history_authenticated_select on public.ga_contact_history for select to authenticated using (true);
drop policy if exists ga_history_authenticated_insert on public.ga_contact_history;
create policy ga_history_authenticated_insert on public.ga_contact_history for insert to authenticated with check (employee_id = auth.uid());
drop policy if exists ga_history_admin_update on public.ga_contact_history;
create policy ga_history_admin_update on public.ga_contact_history for update to authenticated using (private.is_active_admin()) with check (private.is_active_admin());
drop policy if exists ga_history_admin_delete on public.ga_contact_history;
create policy ga_history_admin_delete on public.ga_contact_history for delete to authenticated using (private.is_active_admin());

drop policy if exists ga_education_authenticated_select on public.ga_education_sessions;
create policy ga_education_authenticated_select on public.ga_education_sessions for select to authenticated using (true);
drop policy if exists ga_education_authenticated_insert on public.ga_education_sessions;
create policy ga_education_authenticated_insert on public.ga_education_sessions for insert to authenticated with check (created_by = auth.uid());
drop policy if exists ga_education_authenticated_update on public.ga_education_sessions;
create policy ga_education_authenticated_update on public.ga_education_sessions for update to authenticated using (created_by = auth.uid() or private.is_active_admin()) with check (created_by = auth.uid() or private.is_active_admin());
drop policy if exists ga_education_admin_delete on public.ga_education_sessions;
create policy ga_education_admin_delete on public.ga_education_sessions for delete to authenticated using (private.is_active_admin());

drop policy if exists ga_duplicates_admin_all on public.ga_duplicate_candidates;
create policy ga_duplicates_admin_all on public.ga_duplicate_candidates for all to authenticated using (private.is_active_admin()) with check (private.is_active_admin());

drop policy if exists ga_research_authenticated_select on public.ga_research_progress;
create policy ga_research_authenticated_select on public.ga_research_progress for select to authenticated using (true);
drop policy if exists ga_research_admin_all on public.ga_research_progress;
create policy ga_research_admin_all on public.ga_research_progress for all to authenticated using (private.is_active_admin()) with check (private.is_active_admin());
