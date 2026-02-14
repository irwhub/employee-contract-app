-- Run this after creating auth users manually and replacing UUIDs.
-- PIN for all seed users below: 0000

insert into public.employees (auth_user_id, name, dob, pin_hash, role, is_active)
values
  ('11111111-1111-1111-1111-111111111111', '사장님', '1980-01-01', crypt('0000', gen_salt('bf')), 'admin', true),
  ('22222222-2222-2222-2222-222222222222', '김직원', '1995-05-10', crypt('0000', gen_salt('bf')), 'staff', true),
  ('33333333-3333-3333-3333-333333333333', '이직원', '1998-09-20', crypt('0000', gen_salt('bf')), 'staff', true)
on conflict (auth_user_id) do update
set
  name = excluded.name,
  dob = excluded.dob,
  pin_hash = excluded.pin_hash,
  role = excluded.role,
  is_active = excluded.is_active;
