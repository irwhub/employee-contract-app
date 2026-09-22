import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import { MaterialsPanel, type MaterialCategory } from '../components/MaterialsPanel';
import { recoverContractTextMap } from '../lib/encoding';
import type { Contract, EmployeeProfile } from '../lib/supabase';
import { clearAuthState, ensureValidAccessToken, normalizeSessionMessage } from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');
const supabaseBase = String(import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const supabaseAnonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '');

type Section = 'materials' | 'memo';

function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('요청이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.')), ms);
    promise.then(
      (value) => { window.clearTimeout(timer); resolve(value); },
      (error) => { window.clearTimeout(timer); reject(error); }
    );
  });
}

function SectionNav({ id, section }: { id: string; section: Section }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link to={`/contracts/${id}`} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${section === 'memo' || section === 'materials' ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50' : 'border-brand-200 bg-brand-50 text-brand-700'}`}>계약서</Link>
      <Link to={`/contracts/${id}/materials`} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${section === 'materials' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}>자료</Link>
      <Link to={`/contracts/${id}/memo`} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${section === 'memo' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}>메모</Link>
    </div>
  );
}

function MemoPanel({ contract, canEdit }: { contract: Contract; canEdit: boolean }) {
  const [memo, setMemo] = useState(contract.internal_memo || '');
  const [nextActionAt, setNextActionAt] = useState(contract.next_action_at || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!canEdit) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const accessToken = await ensureValidAccessToken();
      const response = await withTimeout(fetch(`${supabaseBase}/rest/v1/contracts?id=eq.${encodeURIComponent(contract.id)}`, {
        method: 'PATCH',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ internal_memo: memo.trim() || null, next_action_at: nextActionAt || null })
      }), 30000);
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      const responseMessage = normalizeSessionMessage(payload.error || `메모 저장 실패 (status=${response.status})`);
      if (response.status === 401 || responseMessage.startsWith('Invalid access token.')) {
        clearAuthState();
        window.location.replace(`/?logout=1&t=${Date.now()}`);
        return;
      }
      if (!response.ok) throw new Error(responseMessage);
      setMessage('메모가 저장되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '메모 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="사건 메모" subtitle="진행 상황과 다음 연락 내용을 계약서와 분리해서 기록합니다.">
      <div className="space-y-4">
        <div><Label text="다음 진행 예정일" /><TextInput type="date" value={nextActionAt} onChange={(event) => setNextActionAt(event.target.value)} disabled={!canEdit || saving} /></div>
        <div><Label text="담당자 메모" /><TextArea value={memo} onChange={(event) => setMemo(event.target.value)} disabled={!canEdit || saving} placeholder="진행 상황, 다음 연락 내용, 확인할 서류 등을 기록하세요." /></div>
        {!canEdit && <p className="text-sm text-slate-500">이 사건은 조회만 가능합니다.</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}
        {canEdit && <PrimaryButton type="button" onClick={() => void save()} disabled={saving}>{saving ? '저장 중...' : '메모 저장'}</PrimaryButton>}
      </div>
    </Card>
  );
}

export function ContractSectionPage({ profile, section }: { profile: EmployeeProfile; section: Section }) {
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) { setError('유효하지 않은 사건 ID입니다.'); setLoading(false); return; }
      try {
        const accessToken = await ensureValidAccessToken();
        const response = await withTimeout(fetch(`${workerBase}/contracts/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } }), 30000);
        const payload = (await response.json().catch(() => ({}))) as { contract?: Contract; error?: string };
        const message = normalizeSessionMessage(payload.error || `사건 조회 실패 (status=${response.status})`);
        if (response.status === 401 || message.startsWith('Invalid access token.')) {
          clearAuthState();
          window.location.replace(`/?logout=1&t=${Date.now()}`);
          return;
        }
        if (!response.ok || !payload.contract) throw new Error(message);
        setContract(recoverContractTextMap(payload.contract) as Contract);
      } catch (err) {
        setError(normalizeSessionMessage(err instanceof Error ? err.message : '사건을 불러오지 못했습니다.'));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  if (loading) return <div className="mx-auto max-w-5xl p-6 text-sm text-slate-500">사건을 불러오는 중입니다.</div>;
  if (error || !contract || !id) return <div className="mx-auto max-w-5xl p-6"><Card title="사건을 열 수 없습니다."><p className="text-sm text-red-600">{error || '사건 정보가 없습니다.'}</p></Card></div>;

  const canEdit = profile.role === 'admin' || contract.created_by === profile.auth_user_id;
  const categories: Array<{ category: MaterialCategory; title: string }> = [
    { category: 'medical', title: '의료 자료' },
    { category: 'insurance', title: '보험 자료' }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
      <Card title={`${contract.customer_name} 사건관리`} subtitle={`${contract.contract_type || '계약서'} · ${contract.status === 'closed' ? '정산완료' : '진행 중'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="text-sm text-slate-600">{contract.customer_phone || '전화번호 미입력'}</div><SectionNav id={id} section={section} /></div>
      </Card>
      {section === 'materials' ? <div className="space-y-5">{categories.map((item) => <MaterialsPanel key={item.category} contractId={id} canEdit={canEdit} category={item.category} title={item.title} />)}</div> : <MemoPanel contract={contract} canEdit={canEdit} />}
    </div>
  );
}
