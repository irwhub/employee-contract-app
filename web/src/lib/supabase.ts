import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabaseConfigError = isSupabaseConfigured
  ? null
  : '환경변수 누락: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY를 web/.env에 설정하세요.';

// Keep app bootable even when env is missing. App.tsx shows an explicit setup message.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({} as ReturnType<typeof createClient>);

export type EmployeeRole = 'admin' | 'staff';

export interface EmployeeProfile {
  auth_user_id: string;
  name: string;
  role: EmployeeRole;
  dob: string;
}

export interface Contract {
  id: string;
  created_by: string;
  employee_name: string;
  contract_type: string | null;
  customer_name: string;
  customer_phone: string | null;
  content: string | null;
  confirmed: boolean;
  drive_file_id: string | null;
  sheet_row_id: string | null;
  created_at: string;
  updated_at: string;
}
