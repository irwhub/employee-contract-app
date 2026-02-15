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
   - `GOOGLE_TEMPLATE_ADJUSTER_DOC_ID`
   - `GOOGLE_TEMPLATE_ADMIN_DOC_ID`
   - `GOOGLE_TEMPLATE_COMBINED_DOC_ID` (optional)

## Google OAuth (Personal Account Friendly)
- 목적: 서비스계정 쿼터 이슈 없이 본인 Google 계정으로 Drive/Docs 접근
- Worker auth 우선순위:
  1. `GOOGLE_OAUTH_CLIENT_ID` + `GOOGLE_OAUTH_CLIENT_SECRET` + `GOOGLE_OAUTH_REFRESH_TOKEN`
  2. 없으면 `GOOGLE_SERVICE_ACCOUNT_JSON`
- 필요한 값:
  - `GOOGLE_OAUTH_CLIENT_ID`
  - `GOOGLE_OAUTH_CLIENT_SECRET`
  - `GOOGLE_OAUTH_REFRESH_TOKEN`
- 위 3개를 설정하면 Worker는 refresh token으로 access token을 발급받아 템플릿 복사/PDF 저장을 수행

## Contract Template PDF Flow
- 목적: 웹 화면 PDF가 아니라 "계약서 템플릿"에 데이터를 채워 PDF 생성
- 권장 방식:
  1. 기존 `*.hwpx` 문서를 Google Docs로 1회 변환/작성
  2. 문서 안에 플레이스홀더 삽입 (예: `{{customer_name}}`, `{{accident_date}}`)
  3. 문서 ID를 Worker 환경변수에 설정
- 저장 시 동작:
  1. Worker가 템플릿을 복사
  2. 플레이스홀더를 계약 데이터로 치환
  3. PDF로 내보내기
  4. Drive `계약서` 루트 폴더 하위에 직원별 폴더 자동 생성 후 PDF 저장
  5. 직원은 상세화면 `계약서 PDF 다운로드` 버튼으로 직접 다운로드
- 플레이스홀더 전체 목록: `worker/TEMPLATE_PLACEHOLDERS.md`

### HWPX -> Google Docs 권장 절차(실무)
1. 한글(HWP)에서 `다른 이름으로 저장` -> `DOCX`로 저장
2. Google Drive에 DOCX 업로드 -> `Google Docs로 열기`
3. 템플릿 문구를 유지한 채 필요한 위치를 `{{...}}` 키로 교체
4. 문서 URL에서 문서 ID 복사
5. Worker env에 설정:
   - `GOOGLE_TEMPLATE_ADJUSTER_DOC_ID` (손해사정사)
   - `GOOGLE_TEMPLATE_ADMIN_DOC_ID` (행정사)
   - `GOOGLE_TEMPLATE_COMBINED_DOC_ID` (손해사정사+행정사, 선택)

주의:
- `drive.google.com/file/d/...` 형태의 일반 파일 링크는 템플릿 치환이 안 될 수 있습니다.
- 템플릿은 가급적 `docs.google.com/document/d/...` 형태의 Google Docs 문서로 사용하세요.

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
