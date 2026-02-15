import { supabase } from './supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const FALLBACK_SESSION_KEY = 'employee_session_fallback';

export interface StoredSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

function decodeJwtExp(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4 || 4)) % 4);
    const json = JSON.parse(atob(padded));
    if (typeof json.exp !== 'number') return null;
    return json.exp;
  } catch {
    return null;
  }
}

function isExpiredOrInvalidToken(token: string): boolean {
  const exp = decodeJwtExp(token);
  if (!exp) return true;
  return exp <= Math.floor(Date.now() / 1000) + 30;
}

function buildProjectStorageKey() {
  if (!supabaseUrl) return null;
  const host = new URL(supabaseUrl).hostname;
  const projectRef = host.split('.')[0];
  return `sb-${projectRef}-auth-token`;
}

function extractTokens(candidate: unknown): StoredSession | null {
  if (!candidate || typeof candidate !== 'object') return null;

  const record = candidate as Record<string, unknown>;
  const access = record.access_token;
  const refresh = record.refresh_token;

  if (typeof access === 'string' && typeof refresh === 'string') {
    const expiresAt = record.expires_at;
    return {
      access_token: access,
      refresh_token: refresh,
      expires_at: typeof expiresAt === 'number' ? expiresAt : undefined
    };
  }

  for (const value of Object.values(record)) {
    const nested = extractTokens(value);
    if (nested) return nested;
  }

  return null;
}

export function readFallbackSession(): StoredSession | null {
  const raw = localStorage.getItem(FALLBACK_SESSION_KEY);
  if (!raw) return null;
  try {
    return extractTokens(JSON.parse(raw));
  } catch {
    return null;
  }
}

export async function persistFallbackSession(session: StoredSession) {
  localStorage.setItem(FALLBACK_SESSION_KEY, JSON.stringify(session));
}

export function clearAuthState() {
  localStorage.removeItem(FALLBACK_SESSION_KEY);
  const projectStorageKey = buildProjectStorageKey();
  if (projectStorageKey) {
    localStorage.removeItem(projectStorageKey);
  }
}

export async function setFallbackFromSessionResult(session: StoredSession) {
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token
  });
  await persistFallbackSession(session);
}

export async function refreshWithRefreshToken(refreshToken: string): Promise<StoredSession | null> {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const form = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });

  const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: supabaseAnonKey
    },
    body: form.toString()
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in?: number;
  };

  if (!data.access_token || !data.refresh_token) return null;

  const expiresAt = data.expires_in ? Math.floor(Date.now() / 1000) + Number(data.expires_in) : undefined;

  const refreshed: StoredSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: expiresAt
  };

  await setFallbackFromSessionResult(refreshed);
  return refreshed;
}

async function ensureSupabaseSession(session: StoredSession): Promise<string | null> {
  const { data, error } = await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token
  });
  if (error) return null;

  const usableToken = data.session?.access_token ?? session.access_token;
  if (!usableToken) return null;

  const userResp = await supabase.auth.getUser(usableToken);
  if (userResp.error) return null;
  return usableToken;
}

export async function ensureValidAccessToken(): Promise<string> {
  const direct = (await supabase.auth.getSession()).data.session;
  if (direct?.access_token && !isExpiredOrInvalidToken(direct.access_token)) {
    const userResp = await supabase.auth.getUser(direct.access_token);
    if (!userResp.error && userResp.data.user?.id) {
      return direct.access_token;
    }
  }

  const fallback = readFallbackSession();
  if (fallback?.access_token && !isExpiredOrInvalidToken(fallback.access_token)) {
    const verified = await ensureSupabaseSession(fallback);
    if (verified) return verified;
  }

  if (fallback?.refresh_token) {
    const refreshed = await refreshWithRefreshToken(fallback.refresh_token);
    if (refreshed?.access_token) {
      return refreshed.access_token;
    }
  }

  const projectStorageKey = buildProjectStorageKey();
  if (projectStorageKey) {
    const raw = localStorage.getItem(projectStorageKey);
    if (raw) {
      const parsed = extractTokens(JSON.parse(raw));
      if (parsed?.access_token && !isExpiredOrInvalidToken(parsed.access_token)) {
        const verified = await ensureSupabaseSession({
          access_token: parsed.access_token,
          refresh_token: parsed.refresh_token || fallback?.refresh_token || ''
        });
        if (verified) {
          return verified;
        }
      }
    }
  }

  const refreshedSession = await supabase.auth.refreshSession();
  if (refreshedSession.data.session?.access_token) {
    return refreshedSession.data.session.access_token;
  }

  clearAuthState();
  throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
}
