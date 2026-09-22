import { useMemo, useState } from 'react';
import { Label, TextInput } from './FormControls';
import { filterDisabilityDetails, searchDisabilityCatalog, type DisabilityCatalogEntry, type DisabilityStandard, type McbrideEstimateScenario } from '../data/disabilityCatalog';

const ORDINARY_DAILY_WAGE = 172_068;
const numberFormat = new Intl.NumberFormat('ko-KR');
const industrialDisabilityDays: readonly number[] = [1474, 1309, 1155, 1012, 869, 737, 616, 495, 385, 297, 220, 154, 99, 55];
function periodFactor(value: string) {
  const digits = value.replace(/[^0-9]/g, '');
  if (!digits || digits === '00') return 1;
  const months = Number(digits);
  return Number.isFinite(months) && months > 0 ? Math.min(months, 120) / 120 : 0;
}

export function DisabilityEstimator() {
  const [diagnosis, setDiagnosis] = useState('');
  const [period, setPeriod] = useState('');
  const [functionalLoss, setFunctionalLoss] = useState('');
  const [nerveDamage, setNerveDamage] = useState(false);
  const [surgeryDone, setSurgeryDone] = useState(true);
  const query = diagnosis.trim();
  const results = useMemo(() => (query ? searchDisabilityCatalog(query) : []), [query]);
  const factor = periodFactor(period);
  const wage = ORDINARY_DAILY_WAGE;
  const periodDigits = period.replace(/[^0-9]/g, '');
  const periodLabel = !periodDigits || periodDigits === '00' ? '영구' : `${periodDigits}개월`;

  return (
    <section className="mt-5 w-full max-w-4xl min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 ring-1 ring-slate-100">
      <div>
        <h3 className="text-base font-semibold text-slate-900">장해예상도우미</h3>
        <p className="mt-1 max-w-3xl text-pretty text-sm leading-6 text-slate-600">진단명, KCD 코드 또는 신체 부위로 검색하면 해당 진단에 연결된 산재·제3보험·맥브라이드 기준을 순서대로 보여줍니다.</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2"><Label text="진단명·상해명·KCD 코드" /><TextInput value={diagnosis} onChange={(event) => setDiagnosis(event.target.value)} placeholder="예: 요골골절, S52.5, 허리디스크" /></div>
        <div><Label text="장해기간 (개월, 공란시 영구)" /><TextInput inputMode="numeric" value={period} onChange={(event) => setPeriod(event.target.value.replace(/[^0-9]/g, '').slice(0, 3))} placeholder="예: 36" /></div>
        <div><Label text="기능제한율 (%, 선택)" /><TextInput inputMode="decimal" value={functionalLoss} onChange={(event) => setFunctionalLoss(event.target.value.replace(/[^0-9.]/g, ''))} placeholder="예: 10" /></div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700"><label className="flex items-center gap-2"><input type="checkbox" checked={nerveDamage} onChange={(event) => setNerveDamage(event.target.checked)} /> 신경손상 소견 있음</label><label className="flex items-center gap-2"><input type="checkbox" checked={surgeryDone} onChange={(event) => setSurgeryDone(event.target.checked)} /> 수술함</label></div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span aria-live="polite">{query ? `${results.length}개 진단명 후보` : '진단명을 입력하면 관련 카탈로그만 표시됩니다'}</span>
        <span className="tabular-nums">장해기간 {periodLabel} · 계산기 반영률 {Math.round(factor * 100)}%</span>
      </div>
      <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50/50 p-3"><p className="text-sm font-medium text-brand-800">산재 장해급여 예상금액 기준</p><p className="mt-1 text-pretty text-sm leading-6 text-slate-600">보통인부 1일 임금 {numberFormat.format(wage)}원을 고정 기준으로 각 산재 등급 조건 옆에 예상금액을 표시합니다.</p></div>
      <div className="mt-3 space-y-3">
        {results.map((item) => <CatalogResult key={item.id} item={item} query={query} functionalLoss={functionalLoss} nerveDamage={nerveDamage} surgeryDone={surgeryDone} periodLabel={periodLabel} dailyWage={wage} />)}
      </div>
      {query && results.length === 0 && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">일치하는 진단명·KCD 후보가 없습니다. 진단명 일부, 한글 별칭 또는 KCD 코드로 다시 검색해 보세요.</p>}
      {!query && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-pretty text-sm leading-6 text-slate-600">진단명, 상해명, 신체 부위 또는 KCD 코드를 입력하면 관련된 결과만 표시됩니다. 검색 전에는 전체 카탈로그를 불러오지 않습니다.</p>}
      <p className="mt-4 text-pretty text-sm leading-6 text-amber-700">표시된 행은 원문 기준을 진단명별로 연결한 참고값이며 자동 확정값이 아닙니다. 실제 등급·장해율은 장해진단서, 관절 운동범위, 영상·기능검사, 장해 고정 시점과 적용 약관에 따라 달라집니다.</p>
    </section>
  );
}

function CatalogResult({ item, query, functionalLoss, nerveDamage, surgeryDone, periodLabel, dailyWage }: { item: DisabilityCatalogEntry; query: string; functionalLoss: string; nerveDamage: boolean; surgeryDone: boolean; periodLabel: string; dailyWage: number }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
        <div className="min-w-0"><h4 className="break-keep font-semibold text-slate-900">{item.diagnosis}</h4><p className="mt-1 break-keep text-sm text-slate-500">{item.bodyPart} · KCD {item.kcd.join(', ')}</p></div>
        <span className="max-w-full whitespace-normal break-keep rounded-full bg-white px-2 py-1 text-sm text-slate-500">별칭 {item.aliases.slice(0, 2).join(', ')}</span>
      </div>
      <div className="mt-3 grid gap-2">{item.standards.map((standard) => <StandardCard key={standard.title} item={item} query={query} standard={standard} dailyWage={dailyWage} nerveDamage={nerveDamage} surgeryDone={surgeryDone} />)}</div>
      <p className="mt-3 text-pretty text-sm leading-6 text-slate-500">평가 입력: {periodLabel} · {functionalLoss ? `기능제한 ${functionalLoss}%` : '기능제한 미입력'} · {nerveDamage ? '신경손상 소견 있음' : '신경손상 소견 없음'} · {surgeryDone ? '수술함' : '수술 안 함'}</p>
    </article>
  );
}

function StandardCard({ item, query, standard, dailyWage, nerveDamage, surgeryDone }: { item: DisabilityCatalogEntry; query: string; standard: DisabilityStandard; dailyWage: number; nerveDamage: boolean; surgeryDone: boolean }) {
  const scenario = standard.mcbrideEstimate ? (nerveDamage ? standard.mcbrideEstimate.nerveScenario : surgeryDone ? standard.mcbrideEstimate.surgeryScenario : standard.mcbrideEstimate.defaultScenario) : undefined;
  const visibleDetails = filterDisabilityDetails(item, standard, query);
  const hasDirectMcbrideRow = standard.title !== '맥브라이드 예상' || visibleDetails.some((detail) => detail.level !== '원문 직접 행 없음');
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-white bg-white p-3">
      <p className="break-keep text-sm font-medium text-brand-700">{standard.title}</p>
      {!visibleDetails.length && <p className="mt-1 text-sm font-semibold text-slate-900">{standard.result}</p>}
      {standard.title === '맥브라이드 예상' && (
        <>
          <p className="mt-2 rounded-lg bg-slate-50 px-2 py-1 text-sm text-slate-600">직업계수 5 · 일반 직업 기준</p>
        </>
      )}
      {standard.title === '제3보험 ADLS' && (
        <p className="mt-2 rounded-lg bg-blue-50 px-2 py-1 text-pretty text-sm leading-6 text-blue-900">
          <strong>ADLS 기준</strong> · 이동·음식물 섭취·배변·배뇨·개인위생·목욕·의복 착탈 등 일상생활 기본동작별 제한과 도움 필요 정도를 확인합니다.
        </p>
      )}
      {standard.criteria && !standard.details && (
        <div className="mt-3 rounded-lg bg-amber-50 p-2">
          <p className="text-sm font-medium text-amber-800">핵심 측정 기준</p>
            <ul className="mt-1 space-y-1 text-pretty text-sm leading-6 text-amber-900">
            {standard.criteria.map((criterion) => <li key={criterion}>· {criterion}</li>)}
          </ul>
        </div>
      )}
      {visibleDetails.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-slate-100 pt-2">
          <p className="text-sm font-medium text-slate-500">등급·지급률별 기준</p>
          {visibleDetails.map((detail, detailIndex) => {
            const amount = standard.title === '산재 후유장해' ? formatIndustrialAmount(detail.level, dailyWage) : '';
            const category = practicalCategory(standard.title, detail);
            return (
              standard.title === '맥브라이드 예상' ? (
                <div key={`${detail.level}-${detailIndex}`} className="min-w-0">
                  <span className="block whitespace-normal break-keep text-pretty text-sm font-medium leading-6 text-slate-700">{shortCondition(detail)}</span>
                  <div className="mt-1 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                    <strong className="whitespace-normal break-keep tabular-nums text-sm text-slate-800">{detailBadgeLabel(standard.title, detail)}</strong>
                    {category && <span className="whitespace-normal break-keep text-sm font-medium text-brand-700">{category}</span>}
                  </div>
                  <span className="block whitespace-normal break-keep text-pretty text-sm leading-6 text-slate-700">기준: {shortCriterion(detail)}</span>
                  {amount && <span className="mt-1 block tabular-nums text-sm font-semibold text-brand-700">{amount}</span>}
                </div>
              ) : (
                <div key={`${detail.level}-${detailIndex}`} className="grid min-w-0 grid-cols-1 gap-y-1 sm:grid-cols-[minmax(52px,max-content)_minmax(0,1fr)] sm:gap-x-2">
                  <strong className="whitespace-normal break-keep tabular-nums text-sm text-slate-800">{detailBadgeLabel(standard.title, detail)}{category && <span className="ml-1 font-medium text-brand-700">· {category}</span>}</strong>
                  <div className="min-w-0">
                    <span className="block whitespace-normal break-keep text-pretty text-sm font-medium leading-6 text-slate-700">{shortCondition(detail)}</span>
                    <span className="block whitespace-normal break-keep text-pretty text-sm leading-6 text-slate-700">기준: {shortCriterion(detail)}</span>
                    {amount && <span className="mt-1 block tabular-nums text-sm font-semibold text-brand-700">{amount}</span>}
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
      {standard.title === '맥브라이드 예상' && scenario && hasDirectMcbrideRow && <McbrideEstimateBox scenario={scenario} note={standard.mcbrideEstimate?.note ?? ''} />}
      <p className="mt-2 text-pretty text-sm leading-5 text-slate-400">자료 기준: {standard.source}</p>
    </div>
  );
}

function practicalCategory(title: string, detail: { level: string; condition: string }) {
  const condition = detail.condition;
  if (title === '제3보험 ADLS') return 'ADLS';
  if (title === '제3보험 약관상 장해') {
    if (/기능을 완전히 잃|청력을 완전히 잃|완전.*상실|기능을 잃었을 때/.test(condition)) return '기능 완전상실';
    if (/심한 장해/.test(condition)) return '심한 장해';
    if (/뚜렷한 장해/.test(condition)) return '뚜렷한 장해';
    if (/약간의 장해/.test(condition)) return '약간의 장해';
    const rate = Number(detail.level.replace(/[^0-9]/g, ''));
    if (/관절.*기능|기능에.*장해|기능이.*남은/.test(condition)) {
      if (rate === 30) return '기능 완전상실';
      if (rate === 20) return '심한 장해';
      if (rate === 10) return '뚜렷한 장해';
      if (rate === 5) return '약간의 장해';
    }
    return '';
  }
  if (title === '산재 후유장해') {
    if (/제대로 못 쓰게/.test(condition)) return '제대로 못 쓰게 됨';
    if (/모두 잃은|기능이 완전히 없|실명|완전히 상실/.test(condition)) return '기능 완전상실';
    if (/고도의|극도의|쉬운 일 외에는|특별히 쉬운 노무 외|항상 간병|수시로 간병/.test(condition)) return '심한 장해';
    if (/중등도의|뚜렷한|상당한 정도|직업.*상당|큰 제한/.test(condition)) return '뚜렷한 장해';
    if (/경도의|경미한|국부|약간|일부 제한/.test(condition)) return '약간의 장해';
  }
  return '';
}

function detailBadgeLabel(title: string, detail: { level: string; reference?: string }) {
  if (title === '맥브라이드 예상' && detail.reference) return `${detail.reference} ${detail.level}`;
  return detail.level;
}

function shortCondition(detail: { condition: string }) {
  return detail.condition.replace(/\s+/g, ' ').trim();
}

function shortCriterion(detail: { condition: string; measurement?: string }) {
  const value = detail.measurement || detail.condition;
  return value
    .replace(/^\d+%\s*(기능 완전상실|심한 장해|뚜렷한 장해|약간의 장해)\s*:\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function McbrideEstimateBox({ scenario, note }: { scenario: McbrideEstimateScenario; note: string }) {
  return <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2"><p className="text-sm font-semibold text-brand-800">진단명 기반 보조 추정 · {scenario.label}</p><div className="mt-1 grid grid-cols-2 gap-1 text-sm text-slate-700"><span>가능성: <strong>{scenario.probability}%</strong></span><span>예상 기간: <strong>{scenario.duration}</strong></span></div><p className="mt-1 text-sm leading-6 text-slate-700">적용 조건: {scenario.condition}</p><p className="mt-1 text-sm leading-5 text-slate-500">{note} 구체적인 장해율은 위의 조건별 맥브라이드 행에서 확인하며, 이 보조 추정의 확률·기간은 장해율을 확정하지 않습니다.</p></div>;
}

function formatIndustrialAmount(level: string, dailyWage: number) {
  const match = /^(\d+)급/.exec(level);
  if (!match) return '';
  const grade = Number(match[1]);
  const days = industrialDisabilityDays[grade - 1];
  return days ? `예상 ${numberFormat.format(dailyWage * days)}원` : '';
}
