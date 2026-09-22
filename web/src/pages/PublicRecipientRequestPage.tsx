import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Label, PrimaryButton, TextInput } from '../components/FormControls';
import { SignaturePad } from '../components/SignaturePad';

const workerBase = (import.meta.env.VITE_WORKER_URL || '/api').replace(/\/$/, '');

type PublicRequestPayload = {
  request?: {
    status: 'pending' | 'completed';
    recipient_name: string | null;
    recipient_dob: string | null;
    recipient_consent_personal_info: boolean;
    recipient_consent_required_terms: boolean;
    submitted_at: string | null;
  } | null;
  contract_preview?: {
    employee_name?: string | null;
    contract_type?: string | null;
    customer_name?: string | null;
  } | null;
  error?: string;
};

function formatYmd(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

function isValidDateInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function PublicRecipientRequestPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<'pending' | 'completed'>('pending');
  const [employeeName, setEmployeeName] = useState('');
  const [contractType, setContractType] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerDob, setCustomerDob] = useState('');
  const [consentPersonalInfo, setConsentPersonalInfo] = useState(false);
  const [consentRequiredTerms, setConsentRequiredTerms] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setError('유효하지 않은 요청 링크입니다.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setMessage(null);

      try {
        const res = await fetch(`${workerBase}/recipient-requests/${token}`);
        const payload = (await res.json().catch(() => ({}))) as PublicRequestPayload;
        if (!res.ok) {
          throw new Error(payload.error || '요청 정보를 불러오지 못했습니다.');
        }

        setRequestStatus(payload.request?.status || 'pending');
        setEmployeeName(payload.contract_preview?.employee_name || '');
        setContractType(payload.contract_preview?.contract_type || '');
        setCustomerName(payload.request?.recipient_name || payload.contract_preview?.customer_name || '');
        setCustomerDob(payload.request?.recipient_dob || '');
        setConsentPersonalInfo(!!payload.request?.recipient_consent_personal_info);
        setConsentRequiredTerms(!!payload.request?.recipient_consent_required_terms);
        setSubmittedAt(payload.request?.submitted_at || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '요청 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [token]);

  const disabled = saving || requestStatus === 'completed';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('유효하지 않은 요청 링크입니다.');
      return;
    }

    setError(null);
    setMessage(null);

    if (!customerName.trim()) {
      setError('성명을 입력해 주세요.');
      return;
    }

    if (!isValidDateInput(customerDob)) {
      setError('생년월일은 YYYY-MM-DD 형식으로 입력해 주세요.');
      return;
    }

    if (!consentPersonalInfo || !consentRequiredTerms) {
      setError('필수 동의 항목을 모두 체크해 주세요.');
      return;
    }

    if (!signatureDataUrl) {
      setError('서명을 입력해 주세요.');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`${workerBase}/recipient-requests/${token}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_name: customerName,
          customer_dob: customerDob,
          consent_personal_info: consentPersonalInfo,
          consent_required_terms: consentRequiredTerms,
          signature_data_url: signatureDataUrl
        })
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string; submitted_at?: string };
      if (!res.ok) {
        throw new Error(payload.error || '제출에 실패했습니다.');
      }

      setRequestStatus('completed');
      setSubmittedAt(payload.submitted_at || new Date().toISOString());
      setMessage('제출이 완료되었습니다. 담당 직원이 계약서에 바로 반영할 수 있습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">불러오는 중...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <form className="space-y-4" noValidate onSubmit={onSubmit}>
          <Card
            title="계약 정보 입력 및 서명"
            subtitle={
              requestStatus === 'completed'
                ? '제출이 완료되었습니다.'
                : `${employeeName || '담당 직원'} 계약서 확인을 위해 아래 정보만 입력해 주세요.`
            }
          >
            <div className="grid gap-4">
              <div>
                <Label text="성명" />
                <TextInput value={customerName} onChange={(e) => setCustomerName(e.target.value)} disabled={disabled} />
              </div>
              <div>
                <Label text="생년월일" />
                <TextInput
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={customerDob}
                  placeholder="예: 1992-08-12"
                  onChange={(e) => setCustomerDob(formatYmd(e.target.value))}
                  disabled={disabled}
                />
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={consentPersonalInfo}
                  onChange={(e) => setConsentPersonalInfo(e.target.checked)}
                  disabled={disabled}
                  className="h-4 w-4 rounded border-slate-300"
                />
                개인정보 이용에 동의합니다.
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={consentRequiredTerms}
                  onChange={(e) => setConsentRequiredTerms(e.target.checked)}
                  disabled={disabled}
                  className="h-4 w-4 rounded border-slate-300"
                />
                계약 관련 필수 사항에 동의합니다.
              </label>
            </div>
            <div className="mt-6">
              <Label text="서명" />
              <SignaturePad value={signatureDataUrl} onChange={setSignatureDataUrl} disabled={disabled} />
            </div>

            {submittedAt && (
              <p className="mt-4 text-xs text-slate-500">제출 시각: {new Date(submittedAt).toLocaleString()}</p>
            )}

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            {message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}

            <div className="mt-6">
              <PrimaryButton type="submit" loading={saving} disabled={requestStatus === 'completed'}>
                {requestStatus === 'completed' ? '전송 완료' : '전송'}
              </PrimaryButton>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
