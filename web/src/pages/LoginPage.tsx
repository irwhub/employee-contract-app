import { useState } from 'react';
import { Card } from '../components/Card';
import { Label, PrimaryButton, TextInput } from '../components/FormControls';
import { supabase } from '../lib/supabase';

const workerBase = import.meta.env.VITE_WORKER_URL;

interface LoginPageProps {
  onLoginDone: () => void;
}

export function LoginPage({ onLoginDone }: LoginPageProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!workerBase) {
        throw new Error('VITE_WORKER_URL이 설정되지 않았습니다.');
      }
      const response = await fetch(`${workerBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob, pin })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || '로그인에 실패했습니다.');
      }

      const { access_token, refresh_token } = payload.session;
      const { error: sessionError } = await supabase.auth.setSession({ access_token, refresh_token });
      if (sessionError) {
        throw sessionError;
      }

      onLoginDone();
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
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
          <h1 className="text-2xl font-bold text-slate-900">이로운 손해사정 행정사 계약서 작성</h1>
          <p className="mt-2 text-sm text-slate-500">이름, 생년월일, PIN으로 로그인하세요.</p>
        </div>
        <Card>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <Label text="직원 이름" />
              <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required />
            </div>
            <div>
              <Label text="생년월일 (6자리)" />
              <TextInput
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                value={dob}
                maxLength={6}
                placeholder="예: 920812"
                onChange={(e) => setDob(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <div>
              <Label text="PIN (4자리)" />
              <TextInput
                type="password"
                pattern="[0-9]{4}"
                value={pin}
                maxLength={4}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <PrimaryButton type="submit" loading={loading}>
              로그인
            </PrimaryButton>
          </form>
        </Card>
      </div>
    </div>
  );
}

