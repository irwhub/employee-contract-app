# Employee Contract App (MVP)

Stack: Cloudflare Pages (web) + Cloudflare Workers (API) + Supabase (DB/Auth)

## Login MVP (4-digit PIN)
- User inputs: name + date of birth + PIN(4 digits)
- `POST /auth/login` in Worker:
  - find employee by `name + dob`
  - verify PIN with bcrypt hash
  - issue Supabase session (access/refresh token)
- Web stores session with `supabase.auth.setSession()`

This keeps `auth.uid()`-based RLS while hiding email input from staff users.

## Project Structure
- `web/`: Vite + React + TypeScript + Tailwind
- `worker/`: Cloudflare Worker (TypeScript)
- `supabase/`: SQL files (`schema.sql`, `rls.sql`, `seed.sql`)

## Supabase Setup
1. Create a Supabase project.
2. Run SQL in this order:
   1. `supabase/schema.sql`
   2. `supabase/rls.sql`
   3. `supabase/seed.sql` (optional)
3. In Supabase Auth, create users (admin/staff).
4. Put each `auth.users.id` into `employees.auth_user_id`.

## Local Run
### web
1. `cd web`
2. `npm install`
3. Create `.env` from `.env.example`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WORKER_URL=http://127.0.0.1:8787`
4. `npm run dev`

### worker
1. `cd worker`
2. `npm install`
3. Fill `worker/wrangler.toml` vars.
4. Set secrets:
   - `wrangler secret put SUPABASE_SERVICE_ROLE_KEY`
   - `wrangler secret put GOOGLE_SERVICE_ACCOUNT_JSON`
5. `npm run dev`

## Google Service Account
1. Enable Drive API and Sheets API.
2. Create service account and JSON key.
3. Share target Drive folder and Sheet with service account email.
4. Configure Worker env:
   - `GOOGLE_DRIVE_FOLDER_ID`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_TAB_NAME` (optional)

## Deploy Overview
### Worker
- `cd worker && wrangler deploy`

### Pages
1. Push repo to GitHub.
2. Connect repo in Cloudflare Pages.
3. Build settings:
   - Root: `web`
   - Build command: `npm run build`
   - Output: `dist`
4. Set env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WORKER_URL`

## APIs
- `POST /auth/login`
  - body: `{ name, dob, pin }`
- `POST /integrations/google/sync`
  - header: `Authorization: Bearer <access_token>`
  - body: `{ contract_id }`

## Notes
- `seed.sql` default PIN is `0000` for sample users.
- Worker uses service role key internally. Keep secrets in Worker only.
