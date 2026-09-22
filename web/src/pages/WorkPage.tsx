import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import type { Contract, EmployeeProfile, WorkTask, WorkTaskStatus } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { ensureValidAccessToken } from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');
const statusLabels: Record<WorkTaskStatus, string> = { pending: '대기', in_progress: '진행 중', on_hold: '보류', completed: '완료' };

export function WorkPage({ profile }: { profile: EmployeeProfile }) {
  const [tasks, setTasks] = useState<WorkTask[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [title, setTitle] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [memo, setMemo] = useState('');
  const [contractId, setContractId] = useState('');
  const [memoDrafts, setMemoDrafts] = useState<Record<string, string>>({});
  const [savingMemoId, setSavingMemoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const token = await ensureValidAccessToken();
      const scope = profile.role === 'admin' ? '?scope=all' : '';
      const [contractResponse, taskResult] = await Promise.all([
        fetch(`${workerBase}/contracts${scope}`, { headers: { Authorization: `Bearer ${token}` } }),
        supabase.from('work_tasks').select('*').order('due_at', { ascending: true })
      ]);
      const payload = (await contractResponse.json()) as { contracts?: Contract[]; error?: string };
      if (!contractResponse.ok) throw new Error(payload.error || '계약 목록을 불러오지 못했습니다.');
      setContracts(Array.isArray(payload.contracts) ? payload.contracts : []);
      setTasks((taskResult.data || []) as WorkTask[]);
      setMemoDrafts(Object.fromEntries((payload.contracts || []).map((contract) => [contract.id, contract.internal_memo || ''])));
    } catch (err) {
      setError(err instanceof Error ? err.message : '업무 정보를 불러오지 못했습니다.');
    }
  };

  useEffect(() => { void load(); }, [profile.role]);

  const contractMap = useMemo(() => new Map(contracts.map((item) => [item.id, item])), [contracts]);
  const unfinishedContracts = contracts.filter((contract) => contract.status !== 'closed');

  const addTask = async () => {
    if (!contractId || !title.trim()) return;
    const result = await supabase.from('work_tasks').insert({ contract_id: contractId, title: title.trim(), due_at: dueAt || null, memo: memo.trim() || null, assigned_to: profile.auth_user_id });
    if (result.error) { setError(result.error.message); return; }
    setTitle(''); setDueAt(''); setMemo('');
    await load();
  };

  const saveMemo = async (contract: Contract) => {
    setSavingMemoId(contract.id);
    setError(null);
    const result = await supabase.from('contracts').update({ internal_memo: memoDrafts[contract.id]?.trim() || null }).eq('id', contract.id);
    if (result.error) setError(result.error.message);
    else setContracts((current) => current.map((item) => item.id === contract.id ? { ...item, internal_memo: memoDrafts[contract.id]?.trim() || null } : item));
    setSavingMemoId(null);
  };

  const updateStatus = async (id: string, status: WorkTaskStatus) => {
    const result = await supabase.from('work_tasks').update({ status }).eq('id', id);
    if (result.error) setError(result.error.message);
    else await load();
  };

  return (
    <div className="space-y-4">
      <Card title="미완료 계약 메모" subtitle="아직 마감하지 않은 계약의 다음 할 일과 메모를 업무관리에서 바로 기록합니다.">
        <div className="space-y-3">
          {unfinishedContracts.map((contract) => (
            <div key={contract.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><Link to={`/contracts/${contract.id}`} className="font-semibold text-brand-700">{contract.customer_name}</Link><p className="mt-1 text-xs text-slate-500">{contract.contract_type || '계약'} · {contract.next_action_at ? `예정일 ${contract.next_action_at}` : '예정일 미정'}</p></div>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">{contract.status === 'draft' ? '초안' : contract.status === 'on_hold' ? '보류' : '진행 중'}</span>
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <TextArea value={memoDrafts[contract.id] || ''} onChange={(event) => setMemoDrafts((current) => ({ ...current, [contract.id]: event.target.value }))} placeholder="다음 연락, 준비서류, 예정된 업무를 적어두세요." />
                <button type="button" onClick={() => void saveMemo(contract)} disabled={savingMemoId === contract.id} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">{savingMemoId === contract.id ? '저장 중' : '메모 저장'}</button>
              </div>
            </div>
          ))}
          {unfinishedContracts.length === 0 && <p className="text-sm text-slate-500">미완료 계약이 없습니다.</p>}
        </div>
      </Card>

      <Card title="업무 등록" subtitle="계약별 예정일과 담당 업무를 추가합니다.">
        <div className="grid gap-3 sm:grid-cols-4">
          <div><Label text="계약" /><select value={contractId} onChange={(event) => setContractId(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="">계약 선택</option>{contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.customer_name}</option>)}</select></div>
          <div><Label text="업무명" /><TextInput value={title} onChange={(event) => setTitle(event.target.value)} placeholder="예: 진단서 검토" /></div>
          <div><Label text="예정일" /><TextInput type="date" value={dueAt} onChange={(event) => setDueAt(event.target.value)} /></div>
          <div><Label text="메모" /><TextArea value={memo} onChange={(event) => setMemo(event.target.value)} /></div>
        </div>
        <div className="mt-3"><PrimaryButton type="button" onClick={() => void addTask()}>업무 등록</PrimaryButton></div>
      </Card>

      <Card title="업무 목록">
        <div className="space-y-2">{tasks.map((task) => <div key={task.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"><div><Link to={`/contracts/${task.contract_id}`} className="font-semibold text-brand-700">{contractMap.get(task.contract_id)?.customer_name || '계약'}</Link><p className="mt-1 text-sm text-slate-800">{task.title}</p><p className="mt-1 text-xs text-slate-500">{task.due_at || '예정일 없음'} · {task.memo || '메모 없음'}</p></div><select value={task.status} onChange={(event) => void updateStatus(task.id, event.target.value as WorkTaskStatus)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>)}</div>
        {tasks.length === 0 && <p className="text-sm text-slate-500">등록된 업무가 없습니다.</p>}
      </Card>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
