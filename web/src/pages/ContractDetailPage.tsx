import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { GhostButton, Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import { supabase, type Contract, type EmployeeProfile } from '../lib/supabase';

const workerBase = '/api';

export function ContractDetailPage({ profile }: { profile: EmployeeProfile }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const { data, error: dbError } = await supabase.from('contracts').select('*').eq('id', id).single();
      if (dbError) {
        setError(dbError.message);
      } else {
        setContract(data as Contract);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract) return;
    setSaving(true);
    setError(null);
    setMessage(null);

    const { error: dbError } = await supabase
      .from('contracts')
      .update({
        contract_type: contract.contract_type,
        customer_name: contract.customer_name,
        customer_phone: contract.customer_phone,
        content: contract.content,
        confirmed: contract.confirmed
      })
      .eq('id', contract.id);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    await onSync(contract.id);
    setSaving(false);
    setMessage('저장이 완료되었습니다.');
  };

  const onSync = async (contractId?: string) => {
    const targetId = contractId || contract?.id;
    if (!targetId || !workerBase) return;

    setSyncing(true);
    setError(null);

    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.access_token) {
      setError('세션이 만료되었습니다. 다시 로그인 해주세요.');
      setSyncing(false);
      return;
    }

    const res = await fetch(`${workerBase}/integrations/google/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ contract_id: targetId })
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(payload.error || '동기화 실패');
    } else {
      setMessage(`동기화 완료: ${payload.drive_link || 'Drive 파일 생성됨'}`);
      const { data } = await supabase.from('contracts').select('*').eq('id', targetId).single();
      setContract(data as Contract);
    }

    setSyncing(false);
  };

  const onDelete = async () => {
    if (!contract) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const { error: dbError } = await supabase.from('contracts').delete().eq('id', contract.id);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    navigate('/contracts');
  };

  if (loading) return <p className="text-sm text-slate-500">불러오는 중...</p>;
  if (!contract) return <p className="text-sm text-red-600">계약서를 찾을 수 없습니다.</p>;

  const canEdit = profile.role === 'admin' || contract.created_by === profile.auth_user_id;

  return (
    <form className="space-y-4" onSubmit={onSave}>
      <Card title="계약 상세">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="직원명" />
            <TextInput value={contract.employee_name} readOnly />
          </div>
          <div>
            <Label text="계약 유형" />
            <TextInput
              value={contract.contract_type || ''}
              onChange={(e) => setContract({ ...contract, contract_type: e.target.value })}
              disabled={!canEdit}
            />
          </div>
          <div>
            <Label text="고객명" />
            <TextInput
              value={contract.customer_name}
              onChange={(e) => setContract({ ...contract, customer_name: e.target.value })}
              disabled={!canEdit}
            />
          </div>
          <div>
            <Label text="연락처" />
            <TextInput
              value={contract.customer_phone || ''}
              onChange={(e) => setContract({ ...contract, customer_phone: e.target.value })}
              disabled={!canEdit}
            />
          </div>
        </div>
      </Card>

      <Card title="메모 및 확인">
        <Label text="메모" />
        <TextArea
          value={contract.content || ''}
          onChange={(e) => setContract({ ...contract, content: e.target.value })}
          disabled={!canEdit}
        />
        <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={contract.confirmed}
            onChange={(e) => setContract({ ...contract, confirmed: e.target.checked })}
            disabled={!canEdit}
          />
          확인 완료
        </label>
      </Card>

      <Card title="Google 동기화 결과">
        <p className="text-sm text-slate-600">Drive 파일 ID: {contract.drive_file_id || '없음'}</p>
        <p className="text-sm text-slate-600">Sheet Row: {contract.sheet_row_id || '없음'}</p>
        {contract.drive_file_id && (
          <a
            className="mt-2 inline-block text-sm text-brand-700 underline"
            href={`https://drive.google.com/file/d/${contract.drive_file_id}/view`}
            target="_blank"
            rel="noreferrer"
          >
            Drive 파일 열기
          </a>
        )}
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}

      <div className="flex flex-wrap gap-2">
        {canEdit && (
          <PrimaryButton type="submit" loading={saving}>
            저장
          </PrimaryButton>
        )}
        <GhostButton type="button" onClick={() => onSync()} disabled={syncing}>
          {syncing ? '동기화 중...' : 'Google 재동기화'}
        </GhostButton>
        {canEdit && (
          <GhostButton type="button" onClick={onDelete}>
            삭제
          </GhostButton>
        )}
      </div>
    </form>
  );
}


