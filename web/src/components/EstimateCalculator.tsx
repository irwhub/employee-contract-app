import { useMemo, useState } from 'react';
import { Label, TextInput } from './FormControls';

const DAILY_WAGE = 172_068;
const WORKING_DAYS_PER_MONTH = 20;
const WAGE_PERIOD = '2026년 상반기 적용 (2026. 1. 1. ~ 2026. 8. 31.)';
const WAGE_SOURCE_URL = 'https://info.cak.or.kr/lay1/bbs/S1T41C42/A/14/view.do?article_seq=153402';

const accidentTypes = ['교통사고', '배상책임'] as const;
type AccidentType = (typeof accidentTypes)[number];

const numberFormat = new Intl.NumberFormat('ko-KR');

function parseAmount(value: string) {
  const amount = Number(value.replace(/,/g, ''));
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}

function formatWon(value: number) {
  return `${numberFormat.format(Math.round(Math.max(value, 0)))}원`;
}

export function EstimateCalculator() {
  const [accidentType, setAccidentType] = useState<AccidentType>('교통사고');
  const [workMonths, setWorkMonths] = useState('0');
  const [disabilityRate, setDisabilityRate] = useState('0');
  const [disabilityYears, setDisabilityYears] = useState('0');
  const [medicalCosts, setMedicalCosts] = useState('0');
  const [consolation, setConsolation] = useState('0');
  const [otherDamage, setOtherDamage] = useState('0');
  const [negligenceRate, setNegligenceRate] = useState('0');
  const [paidAmount, setPaidAmount] = useState('0');

  const monthlyIncome = DAILY_WAGE * WORKING_DAYS_PER_MONTH;
  const result = useMemo(() => {
    const workLoss = monthlyIncome * parseAmount(workMonths);
    const disabilityLoss =
      monthlyIncome * 12 * parseAmount(disabilityYears) * Math.min(parseAmount(disabilityRate), 100) / 100;
    const medical = parseAmount(medicalCosts);
    const consolationAmount = parseAmount(consolation);
    const other = parseAmount(otherDamage);
    const gross = workLoss + disabilityLoss + medical + consolationAmount + other;
    const negligence = gross * Math.min(parseAmount(negligenceRate), 100) / 100;
    const afterNegligence = Math.max(gross - negligence, 0);
    const estimated = Math.max(afterNegligence - parseAmount(paidAmount), 0);

    return {
      workLoss,
      disabilityLoss,
      medical,
      consolation: consolationAmount,
      other,
      gross,
      negligence,
      afterNegligence,
      paid: parseAmount(paidAmount),
      estimated
    };
  }, [consolation, disabilityRate, disabilityYears, medicalCosts, negligenceRate, otherDamage, paidAmount, workMonths, monthlyIncome]);

  return (
    <section className="mb-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">예상 배상액 계산기</h2>
          <p className="mt-1 text-sm text-slate-600">교통사고·배상책임 사건의 주요 숫자를 넣으면 입력 즉시 예상액이 다시 계산됩니다.</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100">내부 검토용</span>
      </div>

      <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-brand-100">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs text-slate-500">임금 기준</p>
            <p className="mt-1 font-semibold text-slate-900">보통인부 {formatWon(DAILY_WAGE)} / 일</p>
          </div>
          <a href={WAGE_SOURCE_URL} target="_blank" rel="noreferrer" className="text-xs font-medium text-brand-700 underline underline-offset-2">
            대한건설협회 원문
          </a>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">{WAGE_PERIOD} · 월 20일 기준 월소득 {formatWon(monthlyIncome)}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label text="사고 유형" />
          <select value={accidentType} onChange={(event) => setAccidentType(event.target.value as AccidentType)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
            {accidentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <NumberField label="휴업·입원 기간" value={workMonths} onChange={setWorkMonths} suffix="개월" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <NumberField label="장해율" value={disabilityRate} onChange={setDisabilityRate} suffix="%" />
        <NumberField label="장해 적용 기간" value={disabilityYears} onChange={setDisabilityYears} suffix="년" />
        <NumberField label="치료비" value={medicalCosts} onChange={setMedicalCosts} suffix="원" />
        <NumberField label="위자료" value={consolation} onChange={setConsolation} suffix="원" />
        <NumberField label="기타 손해" value={otherDamage} onChange={setOtherDamage} suffix="원" />
        <NumberField label="과실율" value={negligenceRate} onChange={setNegligenceRate} suffix="%" />
        <NumberField label="기지급액" value={paidAmount} onChange={setPaidAmount} suffix="원" />
      </div>

      <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-brand-100">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">{accidentType} 예상 배상액</p>
            <p className="mt-1 text-2xl font-bold text-brand-700">{formatWon(result.estimated)}</p>
          </div>
          <p className="text-xs text-slate-500">과실 공제 후 · 기지급액 차감</p>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="휴업손해" value={result.workLoss} />
          <Metric label="장해손해" value={result.disabilityLoss} />
          <Metric label="치료비·위자료·기타" value={result.medical + result.consolation + result.other} />
          <Metric label="과실 공제액" value={result.negligence} />
        </div>
        <p className="mt-3 text-right text-xs text-slate-500">과실 공제 전 {formatWon(result.gross)} · 공제 후 {formatWon(result.afterNegligence)} · 기지급 {formatWon(result.paid)}</p>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">이 계산기는 법률상 손해액이나 보험금 확정 계산이 아닌 내부 검토용 예상치입니다. 실제 금액은 사고일, 적용 약관, 소득자료, 장해 인정기간, 과실·기왕증, 손해 항목과 심사 결과에 따라 달라집니다.</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg bg-slate-50 px-3 py-2"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-slate-800">{formatWon(value)}</p></div>;
}

function NumberField({ label, value, onChange, suffix }: { label: string; value: string; onChange: (value: string) => void; suffix: string }) {
  return <div><Label text={label} /><div className="relative"><TextInput inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} className="pr-12" /><span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">{suffix}</span></div></div>;
}
