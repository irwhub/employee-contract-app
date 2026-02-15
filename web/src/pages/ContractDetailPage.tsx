import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { GhostButton, Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import { SignaturePad } from '../components/SignaturePad';
import { supabase, type Contract, type EmployeeProfile } from '../lib/supabase';

const workerBase = '/api';
const CONTRACT_TYPE_OPTIONS = ['손해사정사', '행정사', '손해사정사+행정사'] as const;
const RELATION_OPTIONS = ['본인', '배우자', '부모', '자녀', '기타'] as const;
const DELEGATION_OPTIONS = [
  { key: 'delegation_auto_insurance', label: '자동차보험' },
  { key: 'delegation_personal_insurance', label: '개인보험(생명 상해 등)' },
  { key: 'delegation_workers_comp', label: '산재보험' },
  { key: 'delegation_disability_pension', label: '국가장애/국민연금장해' },
  { key: 'delegation_employer_liability', label: '근재보험' },
  { key: 'delegation_school_safety', label: '학교안전공제회' },
  { key: 'delegation_other', label: '기타' }
] as const;

export function ContractDetailPage({ profile }: { profile: EmployeeProfile }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originalContract, setOriginalContract] = useState<Contract | null>(null);

  const formatYmd = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  };

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const { data, error: dbError } = await supabase.from('contracts').select('*').eq('id', id).single();
      if (dbError) {
        setError(dbError.message);
      } else {
        setContract(data as Contract);
        setOriginalContract(data as Contract);
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
        victim_or_insured: contract.victim_or_insured,
        beneficiary_name: contract.beneficiary_name,
        customer_gender: contract.customer_gender,
        customer_phone: contract.customer_phone,
        customer_dob: contract.customer_dob,
        customer_address: contract.customer_address,
        relation_to_party: contract.relation_to_party,
        accident_date: contract.accident_date,
        accident_location: contract.accident_location,
        accident_summary: contract.accident_summary,
        delegation_auto_insurance: contract.delegation_auto_insurance,
        delegation_personal_insurance: contract.delegation_personal_insurance,
        delegation_workers_comp: contract.delegation_workers_comp,
        delegation_disability_pension: contract.delegation_disability_pension,
        delegation_employer_liability: contract.delegation_employer_liability,
        delegation_school_safety: contract.delegation_school_safety,
        delegation_other: contract.delegation_other,
        delegation_other_text: contract.delegation_other_text,
        upfront_fee_ten_thousand: contract.upfront_fee_ten_thousand,
        admin_fee_percent: contract.admin_fee_percent,
        adjuster_fee_percent: contract.adjuster_fee_percent,
        fee_notes: contract.fee_notes,
        content: contract.content,
        consent_personal_info: contract.consent_personal_info,
        consent_required_terms: contract.consent_required_terms,
        signature_data_url: contract.signature_data_url
      })
      .eq('id', contract.id);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    await onSync(contract.id);
    setSaving(false);
    setIsEditing(false);
    setOriginalContract(contract);
    setMessage('저장이 완료되었습니다.');
  };

  const onSync = async (contractId?: string) => {
    const targetId = contractId || contract?.id;
    if (!targetId || !workerBase) return;

    setSyncing(true);
    setError(null);

    const getAccessToken = async () => {
      const current = (await supabase.auth.getSession()).data.session;
      if (current?.access_token) return current.access_token;

      const refreshed = await supabase.auth.refreshSession();
      if (refreshed.error) {
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      const token = refreshed.data.session?.access_token;
      if (!token) {
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      return token;
    };

    let accessToken = '';
    try {
      accessToken = await getAccessToken();
    } catch (err) {
      setError(err instanceof Error ? err.message : '세션이 만료되었습니다. 다시 로그인 해주세요.');
      setSyncing(false);
      return;
    }

    const res = await fetch(`${workerBase}/integrations/google/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
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
      setOriginalContract(data as Contract);
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

  const onDownloadPdf = async () => {
    if (!contract?.id) return;
    setError(null);
    const getAccessToken = async () => {
      const current = (await supabase.auth.getSession()).data.session;
      if (current?.access_token) return current.access_token;

      const refreshed = await supabase.auth.refreshSession();
      if (refreshed.error) {
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      const token = refreshed.data.session?.access_token;
      if (!token) {
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      return token;
    };

    let accessToken = '';
    try {
      accessToken = await getAccessToken();
    } catch (err) {
      setError(err instanceof Error ? err.message : '세션이 만료되었습니다. 다시 로그인 해주세요.');
      return;
    }

    const res = await fetch(`${workerBase}/contracts/${contract.id}/pdf`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      setError(payload.error || 'PDF 다운로드에 실패했습니다.');
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract_${contract.customer_name || contract.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-sm text-slate-500">불러오는 중...</p>;
  if (!contract) return <p className="text-sm text-red-600">계약서를 찾을 수 없습니다.</p>;

  const canEdit = profile.role === 'admin' || contract.created_by === profile.auth_user_id;
  const canEditNow = canEdit && isEditing;

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
            <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
              {CONTRACT_TYPE_OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="contractType"
                    value={option}
                    checked={(contract.contract_type || '') === option}
                    onChange={(e) => setContract({ ...contract, contract_type: e.target.value })}
                    disabled={!canEditNow}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label text="고객명" />
            <TextInput
              value={contract.customer_name}
              onChange={(e) => setContract({ ...contract, customer_name: e.target.value })}
              disabled={!canEditNow}
            />
          </div>
          <div>
            <Label text="피해자/피보험자" />
            <TextInput
              value={contract.victim_or_insured || ''}
              onChange={(e) => setContract({ ...contract, victim_or_insured: e.target.value })}
              disabled={!canEditNow}
            />
          </div>
          <div>
            <Label text="수익자 이름" />
            <TextInput
              value={contract.beneficiary_name || ''}
              onChange={(e) => setContract({ ...contract, beneficiary_name: e.target.value })}
              disabled={!canEditNow}
            />
          </div>
          <div>
            <Label text="성별" />
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              {['남성', '여성'].map((gender) => (
                <label key={gender} className="flex items-center gap-2 text-slate-700">
                  <input
                    type="radio"
                    name="customerGender"
                    value={gender}
                    checked={(contract.customer_gender || '') === gender}
                    onChange={(e) => setContract({ ...contract, customer_gender: e.target.value })}
                    disabled={!canEditNow}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label text="연락처" />
            <TextInput
              value={contract.customer_phone || ''}
              onChange={(e) => setContract({ ...contract, customer_phone: e.target.value })}
              disabled={!canEditNow}
            />
          </div>
          <div>
            <Label text="생년월일" />
            <TextInput
              type="text"
              inputMode="numeric"
              pattern="\d{4}-\d{2}-\d{2}"
              maxLength={10}
              value={contract.customer_dob || ''}
              onChange={(e) =>
                setContract({ ...contract, customer_dob: formatYmd(e.target.value) })
              }
              disabled={!canEditNow}
            />
          </div>
          <div className="sm:col-span-2">
            <Label text="주소" />
            <TextInput
              value={contract.customer_address || ''}
              onChange={(e) => setContract({ ...contract, customer_address: e.target.value })}
              disabled={!canEditNow}
            />
          </div>
          <div className="sm:col-span-2">
            <Label text="사고 당사자와의 관계" />
            <select
              value={contract.relation_to_party || ''}
              onChange={(e) => setContract({ ...contract, relation_to_party: e.target.value })}
              disabled={!canEditNow}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <option value="">선택하세요</option>
              {RELATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card title="사고 기본정보">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="사고발생일" />
            <TextInput
              type="text"
              inputMode="numeric"
              pattern="\d{4}-\d{2}-\d{2}"
              maxLength={10}
              value={contract.accident_date || ''}
              placeholder="예: 1992-08-12"
              onChange={(e) =>
                setContract({ ...contract, accident_date: formatYmd(e.target.value) })
              }
              disabled={!canEditNow}
            />
          </div>
          <div>
            <Label text="사고발생장소" />
            <TextInput
              value={contract.accident_location || ''}
              onChange={(e) => setContract({ ...contract, accident_location: e.target.value })}
              disabled={!canEditNow}
            />
          </div>
          <div className="sm:col-span-2">
            <Label text="사고의 간단한 개요" />
            <TextArea
              value={contract.accident_summary || ''}
              onChange={(e) => setContract({ ...contract, accident_summary: e.target.value })}
              disabled={!canEditNow}
            />
          </div>
        </div>
      </Card>

      <Card title="관련 위임 체크리스트">
        <div className="grid gap-3 sm:grid-cols-2">
          {DELEGATION_OPTIONS.map((option) => (
            <label key={option.key} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={contract[option.key]}
                onChange={(e) => setContract({ ...contract, [option.key]: e.target.checked })}
                disabled={!canEditNow}
                className="h-4 w-4 rounded border-slate-300"
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="mt-3">
          <Label text="기타 내용" />
          <TextInput
            value={contract.delegation_other_text || ''}
            onChange={(e) => setContract({ ...contract, delegation_other_text: e.target.value })}
            disabled={!canEditNow}
          />
        </div>
      </Card>

      <Card title="보수 관련 항목 (부가세 별도)">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label text="착수금 (만원)" />
            <TextInput
              type="number"
              min={0}
              step={1}
              value={contract.upfront_fee_ten_thousand ?? ''}
              onChange={(e) =>
                setContract({
                  ...contract,
                  upfront_fee_ten_thousand: e.target.value === '' ? null : Number(e.target.value)
                })
              }
              disabled={!canEditNow}
            />
          </div>
          <div>
            <Label text="행정사 (%)" />
            <TextInput
              type="number"
              min={0}
              max={100}
              step={0.01}
              value={contract.admin_fee_percent ?? ''}
              onChange={(e) =>
                setContract({
                  ...contract,
                  admin_fee_percent: e.target.value === '' ? null : Number(e.target.value)
                })
              }
              disabled={!canEditNow}
            />
          </div>
          <div>
            <Label text="손해사정사 (%)" />
            <TextInput
              type="number"
              min={0}
              max={100}
              step={0.01}
              value={contract.adjuster_fee_percent ?? ''}
              onChange={(e) =>
                setContract({
                  ...contract,
                  adjuster_fee_percent: e.target.value === '' ? null : Number(e.target.value)
                })
              }
              disabled={!canEditNow}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label text="기타사항" />
          <TextArea
            value={contract.fee_notes || ''}
            onChange={(e) => setContract({ ...contract, fee_notes: e.target.value })}
            disabled={!canEditNow}
          />
        </div>
      </Card>

      <Card title="특약사항">
        <Label text="특약사항" />
        <TextArea
          value={contract.content || ''}
          onChange={(e) => setContract({ ...contract, content: e.target.value })}
          disabled={!canEditNow}
        />
      </Card>

      <Card title="필수 동의 체크">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={contract.consent_personal_info}
            onChange={(e) => setContract({ ...contract, consent_personal_info: e.target.checked })}
            disabled={!canEditNow}
          />
          개인정보 이용에 동의합니다.
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={contract.consent_required_terms}
            onChange={(e) => setContract({ ...contract, consent_required_terms: e.target.checked })}
            disabled={!canEditNow}
          />
          계약과 관련된 필수사항에 동의합니다.
        </label>
      </Card>

      <Card title="서명">
        <SignaturePad
          value={contract.signature_data_url}
          onChange={(value) => setContract({ ...contract, signature_data_url: value })}
          disabled={!canEditNow}
        />
      </Card>

      {profile.role === 'admin' && (
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
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}

      <div className="no-print flex flex-wrap gap-2">
        {canEditNow && (
          <PrimaryButton type="submit" loading={saving}>
            저장
          </PrimaryButton>
        )}
        {canEdit && !canEditNow && (
          <GhostButton type="button" onClick={() => setIsEditing(true)}>
            수정
          </GhostButton>
        )}
        {canEditNow && (
          <GhostButton
            type="button"
            onClick={() => {
              if (originalContract) setContract(originalContract);
              setIsEditing(false);
            }}
          >
            취소
          </GhostButton>
        )}
        <GhostButton type="button" onClick={onDownloadPdf}>
          계약서 PDF 다운로드
        </GhostButton>
        {profile.role === 'admin' && (
          <GhostButton type="button" onClick={() => onSync()} disabled={syncing}>
            {syncing ? '동기화 중...' : 'Google 재동기화'}
          </GhostButton>
        )}
        {canEdit && (
          <GhostButton type="button" onClick={onDelete}>
            삭제
          </GhostButton>
        )}
      </div>
    </form>
  );
}
