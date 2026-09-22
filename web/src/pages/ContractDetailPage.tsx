import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { GhostButton, Label, PrimaryButton, TextArea, TextInput } from '../components/FormControls';
import { SignaturePad } from '../components/SignaturePad';
import { recoverContractTextMap } from '../lib/encoding';
import type { Contract, ContractRecipientRequest, EmployeeProfile } from '../lib/supabase';
import { clearAuthState, ensureValidAccessToken, normalizeSessionMessage } from '../lib/session';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');
const REQUEST_TIMEOUT_MS = 120000;
const PDF_SYNC_TIMEOUT_MS = 120000;

const CONTRACT_TYPE_OPTIONS = ['손해사정사', '행정사', '손해사정사+행정사'] as const;
const DEFAULT_CONTRACT_TYPE = '손해사정사+행정사';
const RELATION_OPTIONS = ['본인', '배우자', '부모', '자녀', '기타'] as const;
const DELEGATION_OPTIONS = [
  { key: 'autoInsurance', label: '자동차보험' },
  { key: 'personalInsurance', label: '개인보험(생명 상해 등)' },
  { key: 'workersComp', label: '산재보험' },
  { key: 'disabilityPension', label: '국가장애/국민연금장해' },
  { key: 'employerLiability', label: '근재보험' },
  { key: 'schoolSafety', label: '학교안전공제회' },
  { key: 'other', label: '기타' }
] as const;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(label)), ms);
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

function toValidYmd(year: number, month: number, day: number): string | null {
  const date = new Date(Date.UTC(year, month - 1, day));
  const valid =
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  if (!valid) return null;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function normalizeDateForApi(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split('-').map(Number);
    return toValidYmd(y, m, d);
  }

  const digits = raw.replace(/\D/g, '');
  if (/^\d{8}$/.test(digits)) {
    const y = Number(digits.slice(0, 4));
    const m = Number(digits.slice(4, 6));
    const d = Number(digits.slice(6, 8));
    return toValidYmd(y, m, d);
  }

  if (/^\d{6}$/.test(digits)) {
    const yy = Number(digits.slice(0, 2));
    const y = yy >= 30 ? 1900 + yy : 2000 + yy;
    const m = Number(digits.slice(2, 4));
    const d = Number(digits.slice(4, 6));
    return toValidYmd(y, m, d);
  }

  return null;
}

function formatYmd(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

function sanitizeFileName(input: string) {
  return input.replace(/[\\/:*?"<>|#\u0000-\u001F]/g, '_').trim() || 'document';
}

export function ContractDetailPage({ profile }: { profile: EmployeeProfile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [employeeName, setEmployeeName] = useState(profile.name);
  const [createdAt, setCreatedAt] = useState('');
  const [contractType, setContractType] = useState(DEFAULT_CONTRACT_TYPE);
  const [customerName, setCustomerName] = useState('');
  const [victimOrInsured, setVictimOrInsured] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [legalRepresentativeName, setLegalRepresentativeName] = useState('');
  const [customerGender, setCustomerGender] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCategory, setCustomerCategory] = useState<'GA' | '소개건' | '환자' | '기타'>('소개건');
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
  const [status, setStatus] = useState<'draft' | 'active' | 'on_hold' | 'closed'>('draft');
  const [feeReceivedAt, setFeeReceivedAt] = useState('');
  const [nextActionAt, setNextActionAt] = useState('');
  const [closedAt, setClosedAt] = useState('');
  const [recipientRequest, setRecipientRequest] = useState<ContractRecipientRequest | null>(null);
  const [recipientRequestLoading, setRecipientRequestLoading] = useState(false);
  const [recipientRequestWorking, setRecipientRequestWorking] = useState(false);

  useEffect(() => {
    if (!id) return;
    if (location.hash === '#materials') {
      navigate(`/contracts/${id}/materials`, { replace: true });
    } else if (location.hash === '#memo') {
      navigate(`/contracts/${id}/memo`, { replace: true });
    }
  }, [id, location.hash, navigate]);

  useEffect(() => {
    try {
      const notice = sessionStorage.getItem('post_contract_notice');
      if (notice) {
        setMessage(notice);
        sessionStorage.removeItem('post_contract_notice');
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const loadContract = async (preserveMessage = false) => {
    if (!id) {
      setError('유효하지 않은 계약서 ID입니다.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    if (!preserveMessage) {
      setMessage(null);
    }
    setIsEditing(false);

    try {
      const accessToken = await ensureValidAccessToken();
      const res = await withTimeout(
        fetch(`${workerBase}/contracts/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        }),
        REQUEST_TIMEOUT_MS,
        '계약서 조회가 지연되고 있습니다.'
      );

      const payload = (await res.json().catch(() => ({}))) as { contract?: Contract; error?: string };
      const rawMsg = payload.error || `계약서 조회 실패 (status=${res.status})`;
      const msg = normalizeSessionMessage(rawMsg);

      if (res.status === 401 || msg.startsWith('Invalid access token.')) {
        clearAuthState();
        window.location.replace(`/?logout=1&t=${Date.now()}`);
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      if (!res.ok || !payload.contract) throw new Error(msg);

      const item = recoverContractTextMap(payload.contract) as Contract;
      setContract(item);
      setEmployeeName(item.employee_name || profile.name);
      setCreatedAt(item.created_at || '');
      setContractType(item.contract_type || DEFAULT_CONTRACT_TYPE);
      setCustomerName(item.customer_name || '');
      setVictimOrInsured(item.victim_or_insured || '');
      setBeneficiaryName(item.beneficiary_name || '');
      setLegalRepresentativeName(item.legal_representative_name || '');
      setCustomerGender(item.customer_gender || '');
      setCustomerPhone(item.customer_phone || '');
      setCustomerCategory(item.customer_category || '소개건');
      setCustomerDob(item.customer_dob || '');
      setCustomerAddress(item.customer_address || '');
      setRelationToParty(item.relation_to_party || '');
      setAccidentDate(item.accident_date || '');
      setAccidentLocation(item.accident_location || '');
      setAccidentSummary(item.accident_summary || '');
      setDelegation({
        autoInsurance: !!item.delegation_auto_insurance,
        personalInsurance: !!item.delegation_personal_insurance,
        workersComp: !!item.delegation_workers_comp,
        disabilityPension: !!item.delegation_disability_pension,
        employerLiability: !!item.delegation_employer_liability,
        schoolSafety: !!item.delegation_school_safety,
        other: !!item.delegation_other
      });
      setDelegationOtherText(item.delegation_other_text || '');
      setUpfrontFeeTenThousand(item.upfront_fee_ten_thousand == null ? '' : String(item.upfront_fee_ten_thousand));
      setAdminFeePercent(item.admin_fee_percent == null ? '' : String(item.admin_fee_percent));
      setAdjusterFeePercent(item.adjuster_fee_percent == null ? '' : String(item.adjuster_fee_percent));
      setFeeNotes(item.fee_notes || '');
      setContent(item.content || '');
      setConsentPersonalInfo(item.consent_personal_info == null ? true : !!item.consent_personal_info);
      setConsentRequiredTerms(item.consent_required_terms == null ? true : !!item.consent_required_terms);
      setSignatureDataUrl(item.signature_data_url || null);
      setStatus(item.status || 'draft');
      setFeeReceivedAt(item.fee_received_at || '');
      setNextActionAt(item.next_action_at || '');
      setClosedAt(item.closed_at || '');
    } catch (err) {
      setError(
        normalizeSessionMessage(
          err instanceof Error ? err.message : '계약서를 불러오는 중 오류가 발생했습니다.'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadContract();
  }, [id, profile.name]);

  useEffect(() => {
    if (loading || !window.location.hash) return;
    const targetId = window.location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [loading, id]);

  const canEdit = profile.role === 'admin' || contract?.created_by === profile.auth_user_id;
  const disabled = !isEditing || !canEdit;
  const recipientLink = recipientRequest
    ? `${window.location.origin}/recipient-requests/${recipientRequest.public_token}`
    : '';

  const loadRecipientRequest = async (silent = false) => {
    if (!id || !canEdit) {
      setRecipientRequest(null);
      return;
    }

    if (!silent) {
      setRecipientRequestLoading(true);
    }

    try {
      const accessToken = await ensureValidAccessToken();
      const res = await withTimeout(
        fetch(`${workerBase}/contracts/${id}/recipient-request`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        }),
        REQUEST_TIMEOUT_MS,
        '고객 요청 정보를 불러오는 중입니다.'
      );

      const payload = (await res.json().catch(() => ({}))) as {
        request?: ContractRecipientRequest | null;
        error?: string;
      };
      const rawMsg = payload.error || `고객 요청 조회 실패 (status=${res.status})`;
      const msg = normalizeSessionMessage(rawMsg);

      if (res.status === 401 || msg.startsWith('Invalid access token.')) {
        clearAuthState();
        window.location.replace(`/?logout=1&t=${Date.now()}`);
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      if (!res.ok) throw new Error(msg);

      setRecipientRequest(payload.request || null);
    } catch (err) {
      if (!silent) {
        setError(
          normalizeSessionMessage(
            err instanceof Error ? err.message : '고객 요청 정보를 불러오는 중 오류가 발생했습니다.'
          )
        );
      }
    } finally {
      if (!silent) {
        setRecipientRequestLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!canEdit) {
      setRecipientRequest(null);
      return;
    }

    void loadRecipientRequest();
  }, [id, canEdit]);

  const onCreateRecipientRequest = async () => {
    if (!id || !canEdit) return;

    setRecipientRequestWorking(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = await ensureValidAccessToken();
      const res = await withTimeout(
        fetch(`${workerBase}/contracts/${id}/recipient-request`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }),
        REQUEST_TIMEOUT_MS,
        '고객 링크 생성이 지연되고 있습니다.'
      );

      const payload = (await res.json().catch(() => ({}))) as {
        request?: ContractRecipientRequest | null;
        error?: string;
      };
      const rawMsg = payload.error || `고객 링크 생성 실패 (status=${res.status})`;
      const msg = normalizeSessionMessage(rawMsg);

      if (res.status === 401 || msg.startsWith('Invalid access token.')) {
        clearAuthState();
        window.location.replace(`/?logout=1&t=${Date.now()}`);
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      if (!res.ok || !payload.request) throw new Error(msg);

      setRecipientRequest(payload.request);
      setMessage('고객이 작성할 링크를 준비했습니다.');
    } catch (err) {
      setError(
        normalizeSessionMessage(err instanceof Error ? err.message : '고객 링크 생성 중 오류가 발생했습니다.')
      );
    } finally {
      setRecipientRequestWorking(false);
    }
  };

  const onCopyRecipientLink = async () => {
    if (!recipientLink) return;

    const shareMessage = `계약서 정보 확인과 서명을 위해 아래 링크를 열어 주세요.\n${recipientLink}`;
    try {
      await navigator.clipboard.writeText(shareMessage);
      setMessage('고객에게 보낼 안내 문구와 링크를 복사했습니다.');
    } catch {
      setError('클립보드 복사에 실패했습니다. 브라우저 권한을 확인해 주세요.');
    }
  };

  const onRefreshRecipientRequest = async () => {
    setRecipientRequestLoading(true);
    try {
      await loadRecipientRequest(true);
      await loadContract(true);
      setMessage('고객 응답 상태를 새로 불러왔습니다.');
    } finally {
      setRecipientRequestLoading(false);
    }
  };

  const onSave = async () => {
    if (!id || !canEdit) return;

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const normalizedCustomerDob = normalizeDateForApi(customerDob);
      if (customerDob.trim() && !normalizedCustomerDob) {
        throw new Error('생년월일 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.');
      }

      const normalizedAccidentDate = normalizeDateForApi(accidentDate);
      if (accidentDate.trim() && !normalizedAccidentDate) {
        throw new Error('사고발생일 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.');
      }

      const accessToken = await ensureValidAccessToken();
      const res = await withTimeout(
        fetch(`${workerBase}/contracts/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            contract_type: contractType || null,
            customer_name: customerName,
            victim_or_insured: victimOrInsured || null,
            beneficiary_name: beneficiaryName || null,
            legal_representative_name: legalRepresentativeName || null,
            customer_gender: customerGender || null,
            customer_phone: customerPhone || null,
            customer_category: customerCategory || null,
            customer_dob: normalizedCustomerDob,
            customer_address: customerAddress || null,
            relation_to_party: relationToParty || null,
            accident_date: normalizedAccidentDate,
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
            signature_data_url: signatureDataUrl,
            status,
            fee_received_at: feeReceivedAt || null,
            next_action_at: nextActionAt || null,
            closed_at: closedAt || null,
          })
        }),
        REQUEST_TIMEOUT_MS,
        '계약서 저장이 지연되고 있습니다.'
      );

      const payload = (await res.json().catch(() => ({}))) as { contract?: Contract; error?: string };
      const rawMsg = payload.error || `계약서 저장 실패 (status=${res.status})`;
      const msg = normalizeSessionMessage(rawMsg);

      if (res.status === 401 || msg.startsWith('Invalid access token.')) {
        clearAuthState();
        window.location.replace(`/?logout=1&t=${Date.now()}`);
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      if (!res.ok) throw new Error(msg);

      if (payload.contract) {
        const updated = recoverContractTextMap(payload.contract) as Contract;
        setContract(updated);
        setEmployeeName(updated.employee_name || profile.name);
        setCreatedAt(updated.created_at || createdAt);
      }

      setIsEditing(false);
      setMessage('수정 내용이 저장되었습니다.');
    } catch (err) {
      setError(
        normalizeSessionMessage(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.')
      );
    } finally {
      setSaving(false);
    }
  };

  const onDownloadPdf = async () => {
    if (!id) return;

    setDownloading(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = await ensureValidAccessToken();

      const downloadOnce = async () =>
        withTimeout(
          fetch(`${workerBase}/contracts/${id}/pdf`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          }),
          PDF_SYNC_TIMEOUT_MS,
          'PDF 다운로드 요청이 지연되고 있습니다.'
        );

      let res = await downloadOnce();
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(normalizeSessionMessage(payload.error || `PDF 다운로드 실패 (status=${res.status})`));
      }

      const blob = await res.blob();
      const dateText = (createdAt || new Date().toISOString()).slice(0, 10);
      const filename = `${sanitizeFileName(customerName || '고객명')}_${dateText}.pdf`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMessage(`PDF 다운로드가 완료되었습니다.`);
    } catch (err) {
      setError(
        normalizeSessionMessage(
          err instanceof Error ? err.message : 'PDF 다운로드 중 오류가 발생했습니다.'
        )
      );
    } finally {
      setDownloading(false);
    }
  };

  const onDelete = async () => {
    if (!id || !canEdit) return;
    if (!window.confirm('이 계약서를 삭제할까요?')) return;

    setDeleting(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = await ensureValidAccessToken();
      const res = await withTimeout(
        fetch(`${workerBase}/contracts/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` }
        }),
        REQUEST_TIMEOUT_MS,
        '삭제 요청이 지연되고 있습니다.'
      );

      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      const rawMsg = payload.error || `삭제 실패 (status=${res.status})`;
      const msg = normalizeSessionMessage(rawMsg);

      if (res.status === 401 || msg.startsWith('Invalid access token.')) {
        clearAuthState();
        window.location.replace(`/?logout=1&t=${Date.now()}`);
        throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.');
      }
      if (!res.ok) throw new Error(msg);

      navigate('/contracts');
    } catch (err) {
      setError(
        normalizeSessionMessage(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.')
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-sm text-slate-500">불러오는 중...</p>;
  if (!contract) return <p className="text-sm text-red-600">{error || '계약서를 불러오지 못했습니다.'}</p>;

  return (
    <div className="space-y-4">
      <Card title="(1) 계약 기본정보">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label text="직원명" />
            <TextInput value={employeeName} readOnly />
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
                    checked={contractType === option}
                    onChange={(e) => setContractType(e.target.value)}
                    disabled={disabled}
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
            <TextInput value={customerName} onChange={(e) => setCustomerName(e.target.value)} disabled={disabled} required />
          </div>
          <div>
            <Label text="피해자/피보험자" />
            <TextInput
              value={victimOrInsured}
              onChange={(e) => setVictimOrInsured(e.target.value)}
              disabled={disabled}
              placeholder="없을 시 빈칸으로 두세요"
            />
            <p className="mt-1 text-xs text-slate-400">없을 시 빈칸으로 두세요</p>
          </div>
          <div>
            <Label text="수익자 이름" />
            <TextInput
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              disabled={disabled}
              placeholder="없을 시 빈칸으로 두세요"
            />
            <p className="mt-1 text-xs text-slate-400">없을 시 빈칸으로 두세요</p>
          </div>
          <div>
            <Label text="법정대리인" />
            <TextInput
              value={legalRepresentativeName}
              onChange={(e) => setLegalRepresentativeName(e.target.value)}
              disabled={disabled}
              placeholder="없을 시 빈칸으로 두세요"
            />
            <p className="mt-1 text-xs text-slate-400">없을 시 빈칸으로 두세요</p>
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
                    disabled={disabled}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label text="연락처" />
            <TextInput value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} disabled={disabled} />
          </div>
          <div>
            <Label text="고객 구분" />
            <select value={customerCategory} onChange={(e) => setCustomerCategory(e.target.value as 'GA' | '소개건' | '환자' | '기타')} disabled={disabled} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <option value="GA">GA</option><option value="소개건">소개건</option><option value="환자">환자</option><option value="기타">기타</option>
            </select>
          </div>
          <div>
            <Label text="생년월일" />
            <TextInput
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={customerDob}
              onChange={(e) => setCustomerDob(formatYmd(e.target.value))}
              disabled={disabled}
              placeholder="예: 1992-08-12"
            />
          </div>
          <div className="sm:col-span-2">
            <Label text="주소" />
            <TextInput value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} disabled={disabled} />
          </div>
          <div className="sm:col-span-2">
            <Label text="사고 당사자와의 관계" />
            <select
              value={relationToParty}
              onChange={(e) => setRelationToParty(e.target.value)}
              disabled={disabled}
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
              onChange={(e) => setAccidentDate(formatYmd(e.target.value))}
              disabled={disabled}
              placeholder="예: 1992-08-12"
            />
          </div>
          <div>
            <Label text="사고발생장소" />
            <TextInput value={accidentLocation} onChange={(e) => setAccidentLocation(e.target.value)} disabled={disabled} />
          </div>
          <div className="sm:col-span-2">
            <Label text="사고의 간단한 개요" />
            <TextArea value={accidentSummary} onChange={(e) => setAccidentSummary(e.target.value)} disabled={disabled} />
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
                disabled={disabled}
                className="h-4 w-4 rounded border-slate-300"
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="mt-3">
          <Label text="기타 내용" />
          <TextInput value={delegationOtherText} onChange={(e) => setDelegationOtherText(e.target.value)} disabled={disabled} />
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
              disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label text="기타사항" />
          <TextArea value={feeNotes} onChange={(e) => setFeeNotes(e.target.value)} disabled={disabled} />
        </div>
      </Card>

      <Card title="(6) 계약 관련 특약사항">
        <TextArea value={content} onChange={(e) => setContent(e.target.value)} disabled={disabled} />
      </Card>

      <Card title="(7) 필수 동의 체크">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consentPersonalInfo}
              onChange={(e) => setConsentPersonalInfo(e.target.checked)}
              disabled={disabled}
              className="h-4 w-4 rounded border-slate-300"
            />
            개인정보 이용에 동의합니다.
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consentRequiredTerms}
              onChange={(e) => setConsentRequiredTerms(e.target.checked)}
              disabled={disabled}
              className="h-4 w-4 rounded border-slate-300"
            />
            계약과 관련된 필수사항에 동의합니다.
          </label>
        </div>
      </Card>

      <Card title="(8) 서명">
        <SignaturePad value={signatureDataUrl} onChange={setSignatureDataUrl} disabled={disabled} />
      </Card>

      {canEdit && (
        <Card
          title="(9) 고객 링크 수집"
          subtitle="계약자에게 링크를 보내 성명, 생년월일, 동의 여부, 서명을 직접 받으면 현재 계약서에 병합됩니다."
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span
                className={`rounded-full px-3 py-1 font-medium ${
                  recipientRequest?.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : recipientRequest
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                }`}
              >
                {recipientRequest?.status === 'completed'
                  ? '고객 제출 완료'
                  : recipientRequest
                    ? '링크 생성됨'
                    : '링크 미생성'}
              </span>
              {recipientRequest?.submitted_at && (
                <span className="text-slate-500">
                  제출 시각: {new Date(recipientRequest.submitted_at).toLocaleString()}
                </span>
              )}
            </div>

            {recipientLink ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                <p className="font-medium text-slate-800">고객 입력 링크</p>
                <p className="mt-1 break-all">{recipientLink}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">아직 생성된 고객 입력 링크가 없습니다.</p>
            )}

            {recipientRequest?.status === 'completed' && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                고객이 직접 입력한 정보가 계약서에 반영되었습니다. 필요하면 아래 새로고침으로 최신 상태를 다시 불러오세요.
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <PrimaryButton
                type="button"
                onClick={onCreateRecipientRequest}
                loading={recipientRequestWorking}
                disabled={saving || downloading || deleting}
              >
                {recipientRequest ? '링크 재발급' : '링크 생성'}
              </PrimaryButton>
              <GhostButton
                type="button"
                onClick={onCopyRecipientLink}
                disabled={!recipientLink || recipientRequestWorking}
              >
                링크 복사
              </GhostButton>
              <GhostButton
                type="button"
                onClick={onRefreshRecipientRequest}
                disabled={recipientRequestLoading || recipientRequestWorking}
              >
                {recipientRequestLoading ? '새로고침 중...' : '응답 새로고침'}
              </GhostButton>
            </div>
          </div>
        </Card>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-emerald-700">{message}</p>}

      <div className="flex flex-wrap gap-2">
        {canEdit && (
          <PrimaryButton type="button" onClick={isEditing ? onSave : () => setIsEditing(true)} loading={saving}>
            {isEditing ? '수정 저장' : '수정'}
          </PrimaryButton>
        )}
        <GhostButton type="button" onClick={onDownloadPdf} disabled={downloading || saving || deleting}>
          {downloading ? 'PDF 다운로드 중...' : 'PDF 다운로드'}
        </GhostButton>
        {canEdit && (
          <GhostButton type="button" onClick={onDelete} disabled={deleting || saving || downloading} className="border-red-200 text-red-700 hover:bg-red-50">
            {deleting ? '삭제 중...' : '삭제'}
          </GhostButton>
        )}
      </div>
    </div>
  );
}
