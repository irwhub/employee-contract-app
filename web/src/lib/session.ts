import { supabase } from './supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const FALLBACK_SESSION_KEY = 'employee_session_fallback';
const FALLBACK_PROFILE_KEY = 'employee_profile_fallback';
const SESSION_ACTIVITY_KEY = 'employee_last_activity_at';
const SESSION_EXPIRED_MESSAGE = '세션이 만료되었습니다. 다시 로그인 해주세요.';
const SESSION_CHECK_FAIL_KEYWORDS = ['세션 확인', '일시 오류', '확인 중'];
const SESSION_MAX_INACTIVE_MS = 60 * 60 * 1000;

export function normalizeSessionMessage(message: string | undefined | null): string {
  if (!message) return '';
  const normalized = String(message);
  if (SESSION_CHECK_FAIL_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return SESSION_EXPIRED_MESSAGE;
  }
  return normalized;
}

export interface StoredSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function nowMilliseconds() {
  return Date.now();
}

function isSessionIdleExpiredInternal(): boolean {
  const raw = localStorage.getItem(SESSION_ACTIVITY_KEY);
  if (!raw) return false;
  const last = Number(raw);
  if (!Number.isFinite(last) || last <= 0) return false;
  return nowMilliseconds() - last >= SESSION_MAX_INACTIVE_MS;
}

export function isSessionIdleExpired(): boolean {
  return isSessionIdleExpiredInternal();
}

export function touchSessionActivity() {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(SESSION_ACTIVITY_KEY, String(nowMilliseconds()));
  } catch {
    // ignore
  }
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = globalThis.setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    globalThis.clearTimeout(timer);
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = globalThis.setTimeout(() => {
      reject(new Error(label));
    }, ms);

    Promise.resolve(promise).then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

async function withSupabaseTimeout<T>(promise: Promise<T>, label: string, ms = 8000): Promise<T> {
  return withTimeout(promise, ms, label);
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
  return exp <= nowSeconds() + 30;
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
  touchSessionActivity();
}

function forceNavigateLogin() {
  if (typeof window === 'undefined') return;
  window.location.replace(`/?logout=1&t=${Date.now()}`);
}

export function clearAuthState() {
  const projectStorageKey = buildProjectStorageKey();
  const authKeyPattern = /^sb-.*-auth-token/;
  const legacyPattern = /supabase\.auth\.token/i;

  const localKeysToRemove: string[] = [FALLBACK_SESSION_KEY, FALLBACK_PROFILE_KEY, SESSION_ACTIVITY_KEY];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (
      key === projectStorageKey ||
      authKeyPattern.test(key) ||
      legacyPattern.test(key)
    ) {
      localKeysToRemove.push(key);
    }
  }
  Array.from(new Set(localKeysToRemove)).forEach((key) => localStorage.removeItem(key));

  const sessionKeysToRemove: string[] = [];
  for (let i = 0; i < sessionStorage.length; i += 1) {
    const key = sessionStorage.key(i);
    if (!key) continue;
    if (
      key === projectStorageKey ||
      authKeyPattern.test(key) ||
      legacyPattern.test(key) ||
      key === FALLBACK_SESSION_KEY ||
      key === FALLBACK_PROFILE_KEY
    ) {
      sessionKeysToRemove.push(key);
    }
  }
  Array.from(new Set(sessionKeysToRemove)).forEach((key) => sessionStorage.removeItem(key));
}

export async function setFallbackFromSessionResult(
  session: StoredSession
): Promise<{ sessionSaved: boolean; message?: string }> {
  try {
    await withTimeout(
      supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      }) as Promise<unknown>,
      5000,
      '세션 저장이 지연되었습니다. 잠시 후 다시 시도해주세요.'
    );
  } catch (err) {
    console.warn('setSession timeout or error:', err);
    await persistFallbackSession(session);
    const msg = err instanceof Error ? err.message : '세션 저장이 지연되었습니다. 잠시 후 다시 시도해주세요.';
    return {
      sessionSaved: false,
      message: msg
    };
  }

  await persistFallbackSession(session);
  return { sessionSaved: true };
}

export async function refreshWithRefreshToken(refreshToken: string): Promise<StoredSession | null> {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const form = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });

  const res = await fetchWithTimeout(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: supabaseAnonKey
    },
    body: form.toString()
  }, 8000);

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
  touchSessionActivity();
  return refreshed;
}

async function ensureSupabaseSession(session: StoredSession): Promise<string | null> {
  try {
    const { data, error } = await withSupabaseTimeout(
      supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      }),
      '세션 유효성 확인이 지연되었습니다.'
    );
    if (error) return null;

    const usableToken = data.session?.access_token ?? session.access_token;
    if (!usableToken) return null;

    const userResp = await withSupabaseTimeout(supabase.auth.getUser(usableToken), '사용자 조회가 지연되었습니다.');
    if (userResp.error) return null;
    return usableToken;
  } catch {
    // If Supabase client is slow/unresponsive, fall back to locally stored tokens.
    return null;
  }
}

export async function ensureValidAccessToken(): Promise<string> {
  if (isSessionIdleExpired()) {
    clearAuthState();
    forceNavigateLogin();
    throw new Error(SESSION_EXPIRED_MESSAGE);
  }

  let hadSessionLikeData = false;

  // Fast path: cached access token을 우선 사용해 목록 조회 지연을 줄인다.
  const fallback = readFallbackSession();
  if (fallback?.access_token || fallback?.refresh_token) {
    hadSessionLikeData = true;
  }
  if (fallback?.access_token && !isExpiredOrInvalidToken(fallback.access_token)) {
    touchSessionActivity();
    return fallback.access_token;
  }

  let storageSession: StoredSession | null = null;
  const projectStorageKey = buildProjectStorageKey();
    if (projectStorageKey) {
      const raw = localStorage.getItem(projectStorageKey);
      if (raw) {
        try {
          const parsed = extractTokens(JSON.parse(raw));
          storageSession = parsed;
        if (parsed?.access_token || parsed?.refresh_token) {
          hadSessionLikeData = true;
        }
        if (parsed?.access_token && !isExpiredOrInvalidToken(parsed.access_token)) {
          touchSessionActivity();
          return parsed.access_token;
        }
      } catch {
        // ignore malformed localStorage value
        }
      }
    }

  // Refresh token first (fast + deterministic) to avoid long Supabase SDK timeout chains.
  const refreshCandidates = Array.from(
    new Set(
      [fallback?.refresh_token, storageSession?.refresh_token]
        .filter((v): v is string => typeof v === 'string' && v.length > 0)
    )
  );

  for (const refreshToken of refreshCandidates) {
    try {
      const refreshed = await refreshWithRefreshToken(refreshToken);
      if (refreshed?.access_token) return refreshed.access_token;
    } catch {
      // ignore and continue to next candidate
    }
  }

  // Best-effort Supabase session read with a shorter timeout.
  try {
    const direct = (await withSupabaseTimeout(
      supabase.auth.getSession(),
      '세션 조회가 지연되었습니다.',
      4000
    )).data.session;
    if (direct?.access_token || direct?.refresh_token) {
      hadSessionLikeData = true;
    }
    if (direct?.access_token && !isExpiredOrInvalidToken(direct.access_token)) {
      touchSessionActivity();
      if (direct.refresh_token) {
        await setFallbackFromSessionResult({
          access_token: direct.access_token,
          refresh_token: direct.refresh_token,
          expires_at: direct.expires_at ?? undefined
        });
      }
      return direct.access_token;
    }
  } catch {
    // ignore
  }

  if (hadSessionLikeData) {
    clearAuthState();
    forceNavigateLogin();
    throw new Error(SESSION_EXPIRED_MESSAGE);
  }

  clearAuthState();
  forceNavigateLogin();
  throw new Error(SESSION_EXPIRED_MESSAGE);
}
