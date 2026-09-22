import { useMemo, useState } from 'react';
import { Label, TextInput } from './FormControls';

const CONSTRUCTION_DAILY_WAGE = 172_068;
const MANUFACTURING_DAILY_WAGE = 90_694;
const TRAFFIC_DAILY_WAGE = Math.round((CONSTRUCTION_DAILY_WAGE + MANUFACTURING_DAILY_WAGE) / 2);
const TRAFFIC_WORKING_DAYS_PER_MONTH = 25;
const LIABILITY_WORKING_DAYS_PER_MONTH = 20;
const HOFFMANN_TABLE_MAX_MONTHS = 1000;
const HOFFMANN_COEFFICIENT_CAP = 240;
const HOFFMANN_MONTHLY_RATE = 0.05 / 12;
const TEMPORARY_CONSOLATION_BASE_MONTHS = 120;
const numberFormat = new Intl.NumberFormat('ko-KR');
const today = new Date().toISOString().slice(0, 10);

const injuryConsolationByGrade: Record<number, number> = {
  1: 2_000_000, 2: 1_760_000, 3: 1_520_000, 4: 1_280_000,
  5: 750_000, 6: 500_000, 7: 400_000, 8: 300_000,
  9: 250_000, 10: 200_000, 11: 200_000, 12: 150_000,
  13: 150_000, 14: 150_000, 15: 150_000,
};

function parseNumber(value: string) {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatWon(value: number) {
  return `${numberFormat.format(Math.round(Math.max(value, 0)))}원`;
}

function formatInput(value: string) {
  const digits = value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
  return digits ? numberFormat.format(Number(digits)) : '';
}

function formatBirthDateInput(value: string) {
  const digits = value.replace(/[^0-9]/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6)}`;
}

function toIsoDate(value: string) {
  const match = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(value);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : value;
}

function ageAtDate(birthDate: string, referenceDate: string) {
  if (!birthDate || !referenceDate) return 0;
  const birth = new Date(`${toIsoDate(birthDate)}T00:00:00`);
  const reference = new Date(`${referenceDate}T00:00:00`);
  let age = reference.getFullYear() - birth.getFullYear();
  const birthdayPassed = reference.getMonth() > birth.getMonth()
    || (reference.getMonth() === birth.getMonth() && reference.getDate() >= birth.getDate());
  if (!birthdayPassed) age -= 1;
  return Number.isFinite(age) && age >= 0 ? age : 0;
}

function disabilityPeriodMonths(value: string) {
  const normalized = value.replace(/[^0-9]/g, '');
  if (!normalized || normalized === '00') return HOFFMANN_TABLE_MAX_MONTHS;
  return parseNumber(normalized);
}

const HOFFMANN_TABLE = Array.from({ length: HOFFMANN_TABLE_MAX_MONTHS + 1 }, (_, month) => {
    if (month === 0) return 0;
    const coefficient = Array.from({ length: month }, (_, index) => 1 / (1 + HOFFMANN_MONTHLY_RATE * (index + 1)))
      .reduce((total, value) => total + value, 0);
    return Math.floor(coefficient * 10_000) / 10_000;
});

function hoffmannCoefficient(months: number) {
  const lookupMonths = Math.min(Math.max(Math.floor(months), 0), HOFFMANN_TABLE_MAX_MONTHS);
  return Math.min(HOFFMANN_TABLE[lookupMonths] ?? HOFFMANN_COEFFICIENT_CAP, HOFFMANN_COEFFICIENT_CAP);
}

function consolationDurationFactor(months: number) {
  if (months >= HOFFMANN_TABLE_MAX_MONTHS) return 1;
  return Math.min(Math.max(months, 0), TEMPORARY_CONSOLATION_BASE_MONTHS) / TEMPORARY_CONSOLATION_BASE_MONTHS;
}

function disabilityConsolation(rate: number, age: number, months: number) {
  if (rate <= 0) return 0;
  const baseAmount = rate >= 50
    ? (age >= 65 ? 40_000_000 : 45_000_000) * (rate / 100) * 0.85
    : rate >= 45 ? 4_000_000
      : rate >= 35 ? 2_400_000
        : rate >= 27 ? 2_000_000
          : rate >= 20 ? 1_600_000
            : rate >= 14 ? 1_200_000
              : rate >= 9 ? 1_000_000
                : rate >= 5 ? 800_000
                  : 500_000;
  return baseAmount * consolationDurationFactor(months);
}

export function EstimateCalculatorV2() {
  const [calculationType, setCalculationType] = useState<'traffic' | 'liability'>('traffic');
  const [workDaysInput, setWorkDaysInput] = useState('0');
  const [disabilityRate, setDisabilityRate] = useState('0');
  const [disabilityMonths, setDisabilityMonths] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [judgmentDate, setJudgmentDate] = useState(today);
  const [injuryGrade, setInjuryGrade] = useState('0');
  const [negligenceRate, setNegligenceRate] = useState('0');
  const [futureMedical, setFutureMedical] = useState('');
  const [otherBenefits, setOtherBenefits] = useState('');
  const [preExistingRate, setPreExistingRate] = useState('0');

  const workingDaysPerMonth = calculationType === 'traffic' ? TRAFFIC_WORKING_DAYS_PER_MONTH : LIABILITY_WORKING_DAYS_PER_MONTH;
  const dailyWage = calculationType === 'traffic' ? TRAFFIC_DAILY_WAGE : CONSTRUCTION_DAILY_WAGE;
  const monthlyIncome = dailyWage * workingDaysPerMonth;
  const result = useMemo(() => {
    const workDays = parseNumber(workDaysInput);
    const rate = Math.min(parseNumber(disabilityRate), 100);
    const months = disabilityPeriodMonths(disabilityMonths);
    const ageValue = ageAtDate(birthDate, judgmentDate);
    const injuryGradeValue = Math.floor(parseNumber(injuryGrade));
    const negligence = Math.min(parseNumber(negligenceRate), 100) / 100;
    const otherBenefitsValue = parseNumber(otherBenefits);
    const preExisting = Math.min(parseNumber(preExistingRate), 100) / 100;
    const workLoss = dailyWage * workDays * 0.85;
    const coefficient = hoffmannCoefficient(months);
    const disabilityLoss = monthlyIncome * (rate / 100) * coefficient;
    const injuryConsolation = injuryConsolationByGrade[injuryGradeValue] ?? 0;
    const disability慰謝料 = disabilityConsolation(rate, ageValue, months);
    const disabilityConsolationFactor = consolationDurationFactor(months);
    const consolation = Math.max(injuryConsolation, disability慰謝料);
    const futureMedicalValue = parseNumber(futureMedical);
    const gross = workLoss + disabilityLoss + consolation + futureMedicalValue;
    const offsetGross = Math.max(gross - otherBenefitsValue, 0);
    const preExistingAmount = offsetGross * preExisting;
    const afterOtherReductions = Math.max(offsetGross - preExistingAmount, 0);
    const negligenceAmount = afterOtherReductions * negligence;

    return {
      workDays,
      workLoss,
      coefficient,
      disabilityLoss,
      injuryConsolation,
      disabilityConsolation: disability慰謝料,
      disabilityConsolationFactor,
      consolation,
      futureMedical: futureMedicalValue,
      gross,
      otherBenefits: otherBenefitsValue,
      preExistingAmount,
      afterOtherReductions,
      negligenceAmount,
      estimated: Math.max(afterOtherReductions - negligenceAmount, 0),
    };
  }, [birthDate, dailyWage, disabilityMonths, disabilityRate, futureMedical, injuryGrade, judgmentDate, negligenceRate, otherBenefits, preExistingRate, workDaysInput, monthlyIncome]);

  return (
    <section className="mb-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">계산기</h2>
          <p className="mt-1 text-sm text-slate-600">교통사고·배상책임 사건에 공통으로 사용할 수 있는 간이 계산기입니다.</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100">내부 검토용</span>
      </div>

      <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-brand-100">
        <Label text="계산 기준" />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => setCalculationType('traffic')} className={`rounded-lg border px-3 py-2 text-left text-sm ${calculationType === 'traffic' ? 'border-brand-500 bg-brand-50 font-semibold text-brand-800' : 'border-slate-200 bg-white text-slate-600'}`}>교통사고 · 월 25일</button>
          <button type="button" onClick={() => setCalculationType('liability')} className={`rounded-lg border px-3 py-2 text-left text-sm ${calculationType === 'liability' ? 'border-brand-500 bg-brand-50 font-semibold text-brand-800' : 'border-slate-200 bg-white text-slate-600'}`}>배상책임 · 월 20일</button>
        </div>
        <p className="text-xs text-slate-500">임금 기준</p>
        <p className="mt-1 font-semibold text-slate-900">{calculationType === 'traffic' ? '자동차보험 약관상 일용근로자 평균 일급' : '배상책임 보통인부 일급'} {formatWon(dailyWage)}</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">{calculationType === 'traffic' ? `2026년 상반기 건설부문 보통인부 ${formatWon(CONSTRUCTION_DAILY_WAGE)}과 제조부문 단순노무종사원 ${formatWon(MANUFACTURING_DAILY_WAGE)}의 평균` : `2026년 상반기 건설부문 보통인부 ${formatWon(CONSTRUCTION_DAILY_WAGE)} 단일 기준 · 제조부문 임금과 평균하지 않음`} · 월 환산액 {formatWon(monthlyIncome)} · 선택한 기준 월 {workingDaysPerMonth}일 적용</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">휴업손해는 실제 일급 수입감소액 × 휴업일수 × 85%로 계산합니다.</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <NumberField label="휴업·입원기간" value={workDaysInput} onChange={setWorkDaysInput} suffix="일" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <NumberField label="장해율" value={disabilityRate} onChange={setDisabilityRate} suffix="%" />
        <NumberField label="장해 적용 기간 (공란시 영구)" value={disabilityMonths} onChange={setDisabilityMonths} suffix="개월" />
        <BirthDateField value={birthDate} onChange={setBirthDate} />
        <DateField label="장해 판정일" value={judgmentDate} onChange={setJudgmentDate} />
        <NumberField label="부상 위자료 급수" value={injuryGrade} onChange={setInjuryGrade} suffix="급" />
        <NumberField label="과실률 (입력값만큼 공제)" value={negligenceRate} onChange={setNegligenceRate} suffix="%" />
        <MoneyField label="향후치료비" value={futureMedical} onChange={setFutureMedical} />
        <MoneyField label="손익상계 금액" value={otherBenefits} onChange={setOtherBenefits} />
        <NumberField label="기왕증 관여도" value={preExistingRate} onChange={setPreExistingRate} suffix="%" />
      </div>

      <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-brand-100">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">과실상계 후 예상 배상액</p>
            <p className="mt-1 text-2xl font-bold text-brand-700">{formatWon(result.estimated)}</p>
          </div>
          <p className="text-xs text-slate-500">휴업손해 + 장해손해 + 위자료 + 향후치료비</p>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label={`휴업손해 (${result.workDays}일)`} value={result.workLoss} />
          <Metric label={`장해손해 (판정 나이 ${ageAtDate(birthDate, judgmentDate)}세 · 월 호프만계수 ${result.coefficient.toFixed(4)})`} value={result.disabilityLoss} />
          <Metric label={`위자료 (장해기간 ${Math.round(result.disabilityConsolationFactor * 10) / 10}배)`} value={result.consolation} />
          <Metric label="향후치료비" value={result.futureMedical} />
        </div>
        <p className="mt-3 text-right text-xs text-slate-500">손익상계 {formatWon(result.otherBenefits)} · 기왕증 공제 {formatWon(result.preExistingAmount)} · 과실 공제 {formatWon(result.negligenceAmount)}</p>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">상실수익액은 첨부 월간 호프만계수표(월 5/12%, 소수점 4자리 버림)를 조회하여 월평균 현실소득 × 노동능력상실률 × 호프만계수로 계산합니다. 호프만계수는 240을 상한으로 적용하며, 월수 자체를 240개월로 잘라내지 않습니다. 위자료는 입력한 부상 급수와 후유장해 기준 중 큰 금액을 적용하고, 한시장해는 입력기간을 반영한 내부 참고치입니다. 손익상계 → 기왕증 관여도 공제 → 입력한 과실률 공제 순으로 단순 반영합니다. 치료관계비·간병비 하한, 대인배상Ⅰ 한도, 소득세·경비·투자비율 등은 별도 심사가 필요하므로 이 간이 계산기에는 포함하지 않았습니다.</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg bg-slate-50 px-3 py-2"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-slate-800">{formatWon(value)}</p></div>;
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <div><Label text={label} /><TextInput type="date" value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}

function BirthDateField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div><Label text="생년월일" /><TextInput type="text" inputMode="numeric" value={value} onChange={(event) => onChange(formatBirthDateInput(event.target.value))} placeholder="1992/08/12" maxLength={10} /></div>;
}

function NumberField({ label, value, onChange, suffix }: { label: string; value: string; onChange: (value: string) => void; suffix: string }) {
  return <div><Label text={label} /><div className="relative"><TextInput inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value.replace(/[^0-9.]/g, ''))} className="pr-12" /><span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">{suffix}</span></div></div>;
}

function MoneyField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <div><Label text={label} /><div className="relative"><TextInput inputMode="numeric" type="text" value={value} onChange={(event) => onChange(formatInput(event.target.value))} className="pr-12" placeholder="0" /><span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-400">원</span></div></div>;
}
