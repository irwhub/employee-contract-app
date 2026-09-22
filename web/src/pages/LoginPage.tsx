import { useState } from 'react';
import { Card } from '../components/Card';
import { Label, PrimaryButton, TextInput } from '../components/FormControls';
import {
  clearAuthState,
  setFallbackFromSessionResult,
  touchSessionActivity
} from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');

interface LoginPageProps {
  onLoginDone: () => void;
}

export function LoginPage({ onLoginDone }: LoginPageProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const normalizeDobInput = (input: string) => input.replace(/[^\d-]/g, '').slice(0, 10);

  const isDobFormat = (value: string) => /^(?:\d{6}|\d{8}|\d{4}-\d{2}-\d{2})$/.test(value);
  const isPinValid = (value: string) => /^\d{4}$/.test(value);

  const onSubmit = async () => {
    clearAuthState();
    const cleanName = name.trim();
    const cleanDob = dob.trim();
    const cleanPin = pin.trim();
    setLoading(true);
    setError(null);
    if (!cleanName) {
      setLoading(false);
      setError('이름을 입력해주세요.');
      return;
    }
    if (!isDobFormat(cleanDob)) {
      setLoading(false);
      setError('생년월일은 YYMMDD, YYYYMMDD, YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }
    if (!isPinValid(cleanPin)) {
      setLoading(false);
      setError('PIN은 4자리 숫자만 입력해주세요.');
      return;
    }

    try {
      const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs: number) => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
        try {
          return await fetch(url, { ...init, signal: controller.signal });
        } finally {
          window.clearTimeout(timeoutId);
        }
      };

      const response = await fetchWithTimeout(
        `${workerBase}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: cleanName, dob: cleanDob, pin: cleanPin })
        },
        8000
      );

      const raw = await response.text();
      let payload: any = {};
      try {
        payload = raw ? JSON.parse(raw) : {};
      } catch {
        payload = {};
      }
      if (!response.ok) {
        throw new Error(
          typeof payload.error === 'string'
            ? payload.error
            : typeof payload.message === 'string'
              ? payload.message
              : raw || '로그인에 실패했습니다.'
        );
      }

      if (!payload.session?.access_token || !payload.session?.refresh_token) {
        throw new Error('로그인 응답이 올바르지 않습니다. worker 응답을 확인해주세요.');
      }

      const session = {
        access_token: payload.session.access_token,
        refresh_token: payload.session.refresh_token,
        expires_at: payload.session.expires_at
      };

      const { sessionSaved, message } = await setFallbackFromSessionResult(session);
      touchSessionActivity();
      if (!sessionSaved) {
        setNotice(message || '세션 저장이 지연되었습니다. 로컬 동기 모드로 로그인됩니다.');
      }

      if (payload.profile) {
        localStorage.setItem('employee_profile_fallback', JSON.stringify(payload.profile));
      } else {
        const fallbackProfile = {
          auth_user_id: payload.user?.id || '',
          name: cleanName || '직원',
          role: 'staff',
          dob: cleanDob
        };
        localStorage.setItem('employee_profile_fallback', JSON.stringify(fallbackProfile));
      }

      setLoading(false);
      onLoginDone();
      return;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('로그인 요청이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
      } else if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('서버 연결 실패: worker가 실행 중인지 확인해주세요. (http://127.0.0.1:8787)');
      } else {
        setError(err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="break-keep text-xl font-bold leading-8 text-slate-900 sm:text-2xl">이로운 손해사정 행정사 계약서 작성</h1>
          <p className="mt-2 text-sm text-slate-500">이름, 생년월일, PIN으로 로그인하세요.</p>
        </div>
        <Card>
          <div className="space-y-4">
            <div>
              <Label text="직원 이름" />
              <TextInput
                lang="ko-KR"
                autoFocus
                style={{ imeMode: 'active' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                required={false}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void onSubmit();
                  }
                }}
              />
            </div>
            <div>
              <Label text="생년월일 (YYMMDD)" />
              <TextInput
                type="text"
                inputMode="numeric"
                value={dob}
                maxLength={10}
                placeholder="예: 920812"
                onChange={(e) => setDob(normalizeDobInput(e.target.value))}
                required={false}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void onSubmit();
                  }
                }}
              />
            </div>
            <div>
              <Label text="PIN (4자리)" />
              <TextInput
                type="password"
                value={pin}
                maxLength={4}
                inputMode="numeric"
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                required={false}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void onSubmit();
                  }
                }}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {notice && <p className="text-sm text-amber-700">{notice}</p>}
            <PrimaryButton
              type="button"
              loading={loading}
              onClick={() => {
                void onSubmit();
              }}
            >
              로그인
            </PrimaryButton>
          </div>
        </Card>
      </div>
    </div>
  );
}
