import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import { supabase, type EmployeeProfile } from '../lib/supabase';

const workerBase = import.meta.env.VITE_WORKER_URL;

export function ContractsNewPage({ profile }: { profile: EmployeeProfile }) {
  const navigate = useNavigate();
  const [contractType, setContractType] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [content, setContent] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from('contracts')
        .insert({
          created_by: profile.auth_user_id,
          employee_name: profile.name,
          contract_type: contractType || null,
          customer_name: customerName,
          customer_phone: customerPhone || null,
          content: content || null,
          confirmed
        })
        .select('*')
        .single();

      if (dbError || !data) {
        throw new Error(dbError?.message || '계약 저장 실패');
      }

      const session = (await supabase.auth.getSession()).data.session;
      if (session?.access_token && workerBase) {
        const syncRes = await fetch(`${workerBase}/integrations/google/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ contract_id: data.id })
        });
        if (!syncRes.ok) {
          const payload = await syncRes.json().catch(() => ({}));
          throw new Error(payload.error || 'Google 동기화 실패');
        }
      }

      navigate(`/contracts/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Card title="(1) 계약 기본정보">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="직원명" />
            <TextInput value={profile.name} readOnly />
          </div>
          <div>
            <Label text="계약 유형" />
            <TextInput value={contractType} onChange={(e) => setContractType(e.target.value)} placeholder="예: 방문 관리" />
          </div>
        </div>
      </Card>

      <Card title="(2) 고객정보">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="고객명" />
            <TextInput value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          </div>
          <div>
            <Label text="연락처" />
            <TextInput value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="010-0000-0000" />
          </div>
        </div>
      </Card>

      <Card title="(3) 계약 내용 (메모)">
        <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="특이사항을 입력하세요." />
      </Card>

      <Card title="(4) 서명/확인 체크">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          계약 내용을 확인했습니다.
        </label>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <PrimaryButton type="submit" loading={loading}>
        저장하고 구글 동기화
      </PrimaryButton>
    </form>
  );
}
