alter table public.employees enable row level security;
alter table public.contracts enable row level security;

-- Employees policies

drop policy if exists employees_self_select on public.employees;
create policy employees_self_select
on public.employees
for select
using (auth_user_id = auth.uid());

drop policy if exists employees_admin_select on public.employees;
create policy employees_admin_select
on public.employees
for select
using (
  exists (
    select 1
    from public.employees e
    where e.auth_user_id = auth.uid()
      and e.role = 'admin'
      and e.is_active = true
  )
);

-- Contracts policies

drop policy if exists contracts_staff_select_own on public.contracts;
create policy contracts_staff_select_own
on public.contracts
for select
using (created_by = auth.uid());

drop policy if exists contracts_staff_insert_own on public.contracts;
create policy contracts_staff_insert_own
on public.contracts
for insert
with check (created_by = auth.uid());

drop policy if exists contracts_staff_update_own on public.contracts;
create policy contracts_staff_update_own
on public.contracts
for update
using (created_by = auth.uid())
with check (created_by = auth.uid());

drop policy if exists contracts_staff_delete_own on public.contracts;
create policy contracts_staff_delete_own
on public.contracts
for delete
using (created_by = auth.uid());

drop policy if exists contracts_admin_select_all on public.contracts;
create policy contracts_admin_select_all
on public.contracts
for select
using (
  exists (
    select 1
    from public.employees e
    where e.auth_user_id = auth.uid()
      and e.role = 'admin'
      and e.is_active = true
  )
);

drop policy if exists contracts_admin_update_all on public.contracts;
create policy contracts_admin_update_all
on public.contracts
for update
using (
  exists (
    select 1
    from public.employees e
    where e.auth_user_id = auth.uid()
      and e.role = 'admin'
      and e.is_active = true
  )
)
with check (
  exists (
    select 1
    from public.employees e
    where e.auth_user_id = auth.uid()
      and e.role = 'admin'
      and e.is_active = true
  )
);

drop policy if exists contracts_admin_delete_all on public.contracts;
create policy contracts_admin_delete_all
on public.contracts
for delete
using (
  exists (
    select 1
    from public.employees e
    where e.auth_user_id = auth.uid()
      and e.role = 'admin'
      and e.is_active = true
  )
);
