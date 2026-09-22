import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import { SignaturePad } from '../components/SignaturePad';
import { type EmployeeProfile } from '../lib/supabase';
import { ensureValidAccessToken } from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');
const SYNC_TIMEOUT_MS = 30000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return Promise.race([
    promise.finally(() => {
      if (timer) {
        clearTimeout(timer);
      }
    }),
    new Promise<T>((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error(label));
      }, ms);
    })
  ]);
}
const CONTRACT_TYPE_OPTIONS = ['손해사정사', '행정사', '손해사정사+행정사'] as const;
const RELATION_OPTIONS = ['본인', '배우자', '부모', '자녀', '기타'] as const;
const CUSTOMER_CATEGORY_OPTIONS = ['GA', '소개건', '환자', '기타'] as const;
const DELEGATION_OPTIONS = [
  { key: 'autoInsurance', label: '자동차보험' },
  { key: 'personalInsurance', label: '개인보험(생명 상해 등)' },
  { key: 'workersComp', label: '산재보험' },
  { key: 'disabilityPension', label: '국가장애/국민연금장해' },
  { key: 'employerLiability', label: '근재보험' },
  { key: 'schoolSafety', label: '학교안전공제회' },
  { key: 'other', label: '기타' }
] as const;
type ContractTypeOption = (typeof CONTRACT_TYPE_OPTIONS)[number];
type SubmitAction = 'save' | 'copy_link';

export function ContractsNewPage({ profile }: { profile: EmployeeProfile }) {
  const navigate = useNavigate();
  const [contractType, setContractType] = useState<ContractTypeOption>(CONTRACT_TYPE_OPTIONS[2]);
  const [customerName, setCustomerName] = useState('');
  const [victimOrInsured, setVictimOrInsured] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [customerGender, setCustomerGender] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCategory, setCustomerCategory] = useState<(typeof CUSTOMER_CATEGORY_OPTIONS)[number]>('소개건');
  const [customerDob, setCustomerDob] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [relationToParty, setRelationToParty] = useState('');
  const [accidentDate, setAccidentDate] = useState('');
  const [accidentLocation, setAccidentLocation] = useState('');
  const [accidentSummary, setAccidentSummary] = useState('');
  const [delegation, setDelegation] = useState({
    autoInsurance: false,
    personalInsurance: false,
    workersComp: false,
    disabilityPension: false,
    employerLiability: false,
    schoolSafety: false,
    other: false
  });
  const [delegationOtherText, setDelegationOtherText] = useState('');
  const [upfrontFeeTenThousand, setUpfrontFeeTenThousand] = useState('');
  const [adminFeePercent, setAdminFeePercent] = useState('');
  const [adjusterFeePercent, setAdjusterFeePercent] = useState('');
  const [feeNotes, setFeeNotes] = useState('');
  const [content, setContent] = useState('');
  const [consentPersonalInfo, setConsentPersonalInfo] = useState(true);
  const [consentRequiredTerms, setConsentRequiredTerms] = useState(true);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'draft' | 'active'>('draft');
  const [feeReceivedAt, setFeeReceivedAt] = useState('');
  const [nextActionAt, setNextActionAt] = useState('');
  const [internalMemo, setInternalMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitAction, setSubmitAction] = useState<SubmitAction>('save');

  const formatYmd = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  };

  const isValidDateInput = (value: string) => {
    const raw = value.trim();
    if (!raw) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;
    const parts = raw.split('-').map((v) => Number(v));
    if (parts.some(Number.isNaN)) return false;
    const [year, month, day] = parts;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  };

  const normalizeDateInput = (value: string) => {
    const next = formatYmd(value);
    if (!next) return next;
    if (/^\d{8}$/.test(value.replace(/\D/g, '')) || /^\d{4}-\d{2}-\d{2}$/.test(next)) {
      return next;
    }
    return next;
  };

  const createRecipientRequestLink = async (contractId: string, accessToken: string) => {
    const res = await withTimeout(
      fetch(`${workerBase}/contracts/${contractId}/recipient-request`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }),
      SYNC_TIMEOUT_MS,
      '고객 링크 생성이 지연되고 있습니다.'
    );

    const payload = (await res.json().catch(() => ({}))) as {
      request?: { public_token?: string | null } | null;
      error?: string;
    };

    if (!res.ok || !payload.request?.public_token) {
      throw new Error(payload.error || `고객 링크 생성 실패 (status=${res.status})`);
    }

    return `${window.location.origin}/recipient-requests/${payload.request.public_token}`;
  };

  const setPostCreateNotice = (message: string) => {
    try {
      sessionStorage.setItem('post_contract_notice', message);
    } catch {
      // ignore storage errors
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!contractType) {
      setError('계약유형은 3가지 중 하나를 반드시 선택해 주세요.');
      return;
    }

    if (customerDob && !isValidDateInput(customerDob)) {
      setError('생년월일은 YYYY-MM-DD 형식만 입력 가능합니다.');
      return;
    }

    if (accidentDate && !isValidDateInput(accidentDate)) {
      setError('사고발생일은 YYYY-MM-DD 형식만 입력 가능합니다.');
      return;
    }

    setLoading(true);

    try {
      const accessToken = await withTimeout(
        ensureValidAccessToken(),
        10000,
        '세션 획득이 지연되어 저장을 계속 진행할 수 없습니다.'
      );

      const createPayload = {
        employee_name: profile.name,
        contract_type: contractType || null,
        customer_name: customerName,
        victim_or_insured: victimOrInsured || null,
        beneficiary_name: beneficiaryName || null,
        legal_representative_name: null,
        customer_gender: customerGender || null,
        customer_phone: customerPhone || null,
        customer_category: customerCategory || null,
        customer_dob: customerDob || null,
        customer_address: customerAddress || null,
        relation_to_party: relationToParty || null,
        accident_date: accidentDate || null,
        accident_location: accidentLocation || null,
        accident_summary: accidentSummary || null,
        delegation_auto_insurance: delegation.autoInsurance,
        delegation_personal_insurance: delegation.personalInsurance,
        delegation_workers_comp: delegation.workersComp,
        delegation_disability_pension: delegation.disabilityPension,
        delegation_employer_liability: delegation.employerLiability,
        delegation_school_safety: delegation.schoolSafety,
        delegation_other: delegation.other,
        delegation_other_text: delegationOtherText || null,
        upfront_fee_ten_thousand: upfrontFeeTenThousand ? Number(upfrontFeeTenThousand) : null,
        admin_fee_percent: adminFeePercent ? Number(adminFeePercent) : null,
        adjuster_fee_percent: adjusterFeePercent ? Number(adjusterFeePercent) : null,
        fee_notes: feeNotes || null,
        content: content || null,
        consent_personal_info: consentPersonalInfo,
        consent_required_terms: consentRequiredTerms,
        signature_data_url: signatureDataUrl
        , status
        , fee_received_at: feeReceivedAt || null
        , next_action_at: nextActionAt || null
        , internal_memo: internalMemo || null
      };

      const createRes = await withTimeout(
        fetch(`${workerBase}/contracts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(createPayload)
        }),
        SYNC_TIMEOUT_MS,
        '계약 저장 요청이 지연되고 있습니다. worker/Supabase 상태를 확인 후 다시 시도해주세요.'
      );

      const createRaw = await createRes.text();
      let createPayloadJson: { ok?: boolean; contract_id?: string; error?: string; warning?: string } = {};
      try {
        createPayloadJson = JSON.parse(createRaw);
      } catch {
        createPayloadJson = { error: createRaw };
      }

      if (!createRes.ok || !createPayloadJson.contract_id) {
        throw new Error(createPayloadJson.error || `계약 저장 실패 (status=${createRes.status})`);
      }

      const contractId = createPayloadJson.contract_id;
      const shouldAutoSync = Boolean(customerName.trim() && signatureDataUrl && consentPersonalInfo && consentRequiredTerms);

      let syncError: string | null = null;
      if (workerBase && shouldAutoSync) {
        try {
          const accessToken = await withTimeout(
            ensureValidAccessToken(),
            10000,
            '세션 획득이 지연되어 동기화를 건너뜁니다.'
          );

          const syncRes = await withTimeout(
            fetch(`${workerBase}/integrations/google/sync`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify({ contract_id: contractId })
            }),
            SYNC_TIMEOUT_MS,
            'Google 동기화가 지연되어 건너뜁니다.'
          );
          if (!syncRes.ok) {
            const payload = await syncRes.json().catch(() => ({}));
            syncError = payload.error || 'Google 동기화 실패';
          }
        } catch (err) {
          syncError = err instanceof Error ? err.message : 'Google 동기화 중 오류가 발생했습니다.';
        }
      }

      if (syncError) {
        setError(`저장은 완료되었습니다. ${syncError}`);
      }

      if (submitAction !== 'save') {
        try {
          const recipientLink = await createRecipientRequestLink(contractId, accessToken);
          const shareMessage = `계약서 정보 확인과 서명을 위해 아래 링크를 열어 주세요.\n${recipientLink}`;

          if (submitAction === 'copy_link') {
            await navigator.clipboard.writeText(shareMessage);
            setPostCreateNotice('계약 저장 후 고객 링크를 복사했습니다.');
          }
        } catch (linkErr) {
          const linkMessage = linkErr instanceof Error ? linkErr.message : '고객 링크 처리 중 오류가 발생했습니다.';
          setPostCreateNotice(`계약은 저장되었습니다. ${linkMessage}`);
        }
      }

      navigate(`/contracts/${contractId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" noValidate onSubmit={onSubmit}>
      <Card title="(1) 계약 기본정보">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="직원명" />
            <TextInput value={profile.name} readOnly />
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
                    checked={(contractType || CONTRACT_TYPE_OPTIONS[2]) === option}
                    onChange={(e) => setContractType(e.target.value as ContractTypeOption)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card title="(2) 고객정보">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="고객명" />
            <TextInput
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="비워두면 고객 링크 수집용 초안으로 저장됩니다"
            />
          </div>
          <div>
            <Label text="피해자/피보험자" />
            <TextInput
              value={victimOrInsured}
              onChange={(e) => setVictimOrInsured(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <Label text="수익자 이름" />
            <TextInput
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              placeholder="이름을 입력하세요"
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
                    checked={customerGender === gender}
                    onChange={(e) => setCustomerGender(e.target.value)}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label text="연락처" />
            <TextInput value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="010-0000-0000" />
          </div>
          <div>
            <Label text="고객 구분" />
            <select
              value={customerCategory}
              onChange={(e) => setCustomerCategory(e.target.value as (typeof CUSTOMER_CATEGORY_OPTIONS)[number])}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              {CUSTOMER_CATEGORY_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <Label text="생년월일" />
            <TextInput
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={customerDob}
              placeholder="예: 1992-08-12"
              onChange={(e) => setCustomerDob(normalizeDateInput(e.target.value))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label text="주소" />
            <TextInput value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="주소를 입력하세요" />
          </div>
          <div className="sm:col-span-2">
            <Label text="사고 당사자와의 관계" />
            <select
              value={relationToParty}
              onChange={(e) => setRelationToParty(e.target.value)}
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

      <Card title="(3) 사고 기본정보">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="사고발생일" />
            <TextInput
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={accidentDate}
              placeholder="예: 1992-08-12"
              onChange={(e) => setAccidentDate(normalizeDateInput(e.target.value))}
            />
          </div>
          <div>
            <Label text="사고발생장소" />
            <TextInput value={accidentLocation} onChange={(e) => setAccidentLocation(e.target.value)} placeholder="사고 장소를 입력하세요" />
          </div>
          <div className="sm:col-span-2">
            <Label text="사고의 간단한 개요" />
            <TextArea
              value={accidentSummary}
              onChange={(e) => setAccidentSummary(e.target.value)}
              placeholder="사고 개요를 입력하세요."
            />
          </div>
        </div>
      </Card>

      <Card title="(4) 관련 위임 체크리스트">
        <div className="grid gap-3 sm:grid-cols-2">
          {DELEGATION_OPTIONS.map((option) => (
            <label key={option.key} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={delegation[option.key]}
                onChange={(e) => setDelegation((prev) => ({ ...prev, [option.key]: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300"
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="mt-3">
          <Label text="기타 내용" />
          <TextInput
            value={delegationOtherText}
            onChange={(e) => setDelegationOtherText(e.target.value)}
            placeholder="기타 위임 내용을 입력하세요"
          />
        </div>
      </Card>

      <Card title="(5) 보수 관련 항목 (부가세 별도)">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label text="착수금 (만원)" />
            <TextInput
              type="number"
              min={0}
              step={1}
              value={upfrontFeeTenThousand}
              onChange={(e) => setUpfrontFeeTenThousand(e.target.value)}
              placeholder="예: 30"
            />
          </div>
          <div>
            <Label text="행정사 (%)" />
            <TextInput
              type="number"
              min={0}
              max={100}
              step={0.01}
              value={adminFeePercent}
              onChange={(e) => setAdminFeePercent(e.target.value)}
              placeholder="예: 40"
            />
          </div>
          <div>
            <Label text="손해사정사 (%)" />
            <TextInput
              type="number"
              min={0}
              max={100}
              step={0.01}
              value={adjusterFeePercent}
              onChange={(e) => setAdjusterFeePercent(e.target.value)}
              placeholder="예: 60"
            />
          </div>
        </div>
        <div className="mt-3">
          <Label text="기타사항" />
          <TextArea
            value={feeNotes}
            onChange={(e) => setFeeNotes(e.target.value)}
            placeholder="정액계약 등 보수 관련 기타사항을 입력하세요."
          />
        </div>
      </Card>

      <Card title="(6) 계약 관련 특약사항">
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="계약과 관련된 특약사항을 입력하세요."
        />
      </Card>

      <Card title="(7) 필수 동의 체크">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consentPersonalInfo !== false}
              onChange={(e) => setConsentPersonalInfo(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            개인정보 이용에 동의합니다.
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consentRequiredTerms !== false}
              onChange={(e) => setConsentRequiredTerms(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            계약과 관련된 필수사항에 동의합니다.
          </label>
        </div>
      </Card>

      <Card title="(8) 서명">
        <SignaturePad value={signatureDataUrl} onChange={setSignatureDataUrl} />
      </Card>

      <Card
        title="(9) 고객 링크 수집"
        subtitle="새 계약서를 저장한 뒤 고객이 직접 성명, 생년월일, 동의, 서명을 입력할 수 있는 링크를 바로 복사할 수 있습니다."
      >
        <div className="space-y-3 text-sm text-slate-600">
          <p>지금은 아직 초안 단계라 링크가 없습니다.</p>
          <p>아래 `저장 후 링크 복사`를 누르면 계약 저장과 동시에 고객용 링크를 만들어 복사합니다.</p>
        </div>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <PrimaryButton type="submit" loading={loading} onClick={() => setSubmitAction('save')}>
          저장
        </PrimaryButton>
        <PrimaryButton type="submit" loading={loading} onClick={() => setSubmitAction('copy_link')}>
          저장 후 링크 복사
        </PrimaryButton>
      </div>
    </form>
  );
}
