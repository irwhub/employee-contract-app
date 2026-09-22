import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabaseConfigError = isSupabaseConfigured
  ? null
  : '환경변수 누락: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY를 web/.env에 설정하세요.';

const DEFAULT_API_TIMEOUT_MS = 25000;

function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), DEFAULT_API_TIMEOUT_MS);

  if (init?.signal) {
    if (init.signal.aborted) {
      controller.abort();
    } else {
      init.signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
  }

  const nextInit: RequestInit = {
    ...init,
    signal: controller.signal
  };

  return fetch(input, nextInit).then(
    (res) => {
      globalThis.clearTimeout(timeout);
      return res;
    },
    (err) => {
      globalThis.clearTimeout(timeout);
      throw err;
    }
  );
}

// Keep app bootable even when env is missing. App.tsx shows an explicit setup message.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, { global: { fetch: fetchWithTimeout } })
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
  victim_or_insured: string | null;
  beneficiary_name: string | null;
  legal_representative_name: string | null;
  customer_gender: string | null;
  customer_phone: string | null;
  customer_category: 'GA' | '소개건' | '환자' | '기타' | null;
  customer_dob: string | null;
  customer_address: string | null;
  relation_to_party: string | null;
  accident_date: string | null;
  accident_location: string | null;
  accident_summary: string | null;
  delegation_auto_insurance: boolean;
  delegation_personal_insurance: boolean;
  delegation_workers_comp: boolean;
  delegation_disability_pension: boolean;
  delegation_employer_liability: boolean;
  delegation_school_safety: boolean;
  delegation_other: boolean;
  delegation_other_text: string | null;
  upfront_fee_ten_thousand: number | null;
  admin_fee_percent: number | null;
  adjuster_fee_percent: number | null;
  fee_notes: string | null;
  content: string | null;
  consent_personal_info: boolean;
  consent_required_terms: boolean;
  signature_data_url: string | null;
  status: 'draft' | 'active' | 'on_hold' | 'closed';
  fee_received_at: string | null;
  next_action_at: string | null;
  closed_at: string | null;
  internal_memo: string | null;
  confirmed: boolean;
  drive_file_id: string | null;
  sheet_row_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerRecord {
  id: string;
  created_by: string;
  name: string;
  phone: string | null;
  category: 'GA' | '소개건' | '환자' | '기타' | null;
  memo: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContractMaterial {
  id: string;
  contract_id: string;
  created_by: string;
  file_name: string;
  storage_path: string;
  content_type: string | null;
  size_bytes: number | null;
  category: 'medical' | 'insurance';
  created_at: string;
}

export type WorkTaskStatus = 'pending' | 'in_progress' | 'on_hold' | 'completed';

export interface WorkTask {
  id: string;
  contract_id: string;
  assigned_to: string | null;
  title: string;
  due_at: string | null;
  status: WorkTaskStatus;
  memo: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: string;
  title: string;
  category: string;
  policy_year: number | null;
  source_url: string | null;
  content: string;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalculationRule {
  id: string;
  basis: 'policy' | 'court' | 'internal_review';
  accident_type: 'traffic' | 'industrial' | 'liability' | 'disease' | 'fire' | 'other';
  damage_category: 'bodily' | 'vehicle' | 'property';
  rule_name: string;
  version: number;
  effective_from: string;
  effective_to: string | null;
  lost_work_multiplier: number | null;
  disability_years: number | null;
  future_care_multiplier: number | null;
  consolation_multiplier: number | null;
  property_multiplier: number | null;
  applies_pre_existing_after_negligence: boolean;
  notes: string;
  source_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContractRecipientRequest {
  id: string;
  contract_id: string;
  public_token: string;
  status: 'pending' | 'completed';
  recipient_name: string | null;
  recipient_dob: string | null;
  recipient_phone: string | null;
  recipient_consent_personal_info: boolean;
  recipient_consent_required_terms: boolean;
  recipient_signature_data_url: string | null;
  last_opened_at: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}
