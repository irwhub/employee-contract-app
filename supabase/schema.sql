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
  customer_phone text,
  content text,
  confirmed boolean not null default false,
  drive_file_id text,
  sheet_row_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contracts_created_by_idx on public.contracts (created_by);
create index if not exists contracts_created_at_idx on public.contracts (created_at desc);

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
