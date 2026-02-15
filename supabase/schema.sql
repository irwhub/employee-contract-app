create extension if not exists pgcrypto;

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null,
  name text not null,
  dob date not null,
  pin_hash text not null,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists employees_name_dob_unique on public.employees (name, dob);
create index if not exists employees_auth_user_id_idx on public.employees (auth_user_id);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid(),
  employee_name text not null,
  contract_type text,
  customer_name text not null,
  victim_or_insured text,
  beneficiary_name text,
  customer_gender text,
  customer_phone text,
  customer_dob date,
  customer_address text,
  relation_to_party text,
  accident_date date,
  accident_location text,
  accident_summary text,
  delegation_auto_insurance boolean not null default false,
  delegation_personal_insurance boolean not null default false,
  delegation_workers_comp boolean not null default false,
  delegation_disability_pension boolean not null default false,
  delegation_employer_liability boolean not null default false,
  delegation_school_safety boolean not null default false,
  delegation_other boolean not null default false,
  delegation_other_text text,
  upfront_fee_ten_thousand integer,
  admin_fee_percent numeric(5,2),
  adjuster_fee_percent numeric(5,2),
  fee_notes text,
  content text,
  consent_personal_info boolean not null default false,
  consent_required_terms boolean not null default false,
  signature_data_url text,
  confirmed boolean not null default false,
  drive_file_id text,
  sheet_row_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contracts_created_by_idx on public.contracts (created_by);
create index if not exists contracts_created_at_idx on public.contracts (created_at desc);

alter table public.contracts add column if not exists customer_gender text;
alter table public.contracts add column if not exists victim_or_insured text;
alter table public.contracts add column if not exists beneficiary_name text;
alter table public.contracts add column if not exists customer_dob date;
alter table public.contracts add column if not exists customer_address text;
alter table public.contracts add column if not exists relation_to_party text;
alter table public.contracts add column if not exists accident_date date;
alter table public.contracts add column if not exists accident_location text;
alter table public.contracts add column if not exists accident_summary text;
alter table public.contracts add column if not exists delegation_auto_insurance boolean not null default false;
alter table public.contracts add column if not exists delegation_personal_insurance boolean not null default false;
alter table public.contracts add column if not exists delegation_workers_comp boolean not null default false;
alter table public.contracts add column if not exists delegation_disability_pension boolean not null default false;
alter table public.contracts add column if not exists delegation_employer_liability boolean not null default false;
alter table public.contracts add column if not exists delegation_school_safety boolean not null default false;
alter table public.contracts add column if not exists delegation_other boolean not null default false;
alter table public.contracts add column if not exists delegation_other_text text;
alter table public.contracts add column if not exists upfront_fee_ten_thousand integer;
alter table public.contracts add column if not exists admin_fee_percent numeric(5,2);
alter table public.contracts add column if not exists adjuster_fee_percent numeric(5,2);
alter table public.contracts add column if not exists fee_notes text;
alter table public.contracts add column if not exists consent_personal_info boolean not null default false;
alter table public.contracts add column if not exists consent_required_terms boolean not null default false;
alter table public.contracts add column if not exists signature_data_url text;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contracts_set_updated_at on public.contracts;
create trigger contracts_set_updated_at
before update on public.contracts
for each row
execute procedure public.set_updated_at();
