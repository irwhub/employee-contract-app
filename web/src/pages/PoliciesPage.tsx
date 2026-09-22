import { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import type { Policy } from '../lib/supabase';

const quickSearches = ['하지단축', '장해지급률', '대인배상', '산재 장해등급'];

const fallbackPolicies: Policy[] = [
  { id: 'fallback-auto-current', title: '자동차보험 표준약관 관련 규정', category: '자동차보험', policy_year: null, source_url: 'https://carinfo.knia.or.kr/lmxsrv/law/lawDetail.do?LAWGROUP=1&SEQ=3', content: '현행 자동차보험 표준약관 관련 규정 색인입니다. 대인배상, 대물배상, 자기신체사고, 무보험자동차에 의한 상해, 자기차량손해와 후유장해를 확인합니다. 검색어: 하지단축, 하지 단축, 다리 길이 차이, 대퇴, 하퇴, 절단, 관절운동, 장해율, 대인배상, 교통사고 후유장해.', is_published: true, created_by: null, created_at: '2026-01-01T00:00:00.000Z', updated_at: '2026-01-01T00:00:00.000Z' },
  { id: 'fallback-insurance-current', title: '손해보험 장해 통합약관', category: '손보·장해', policy_year: null, source_url: 'https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B별표+15%5D+표준약관%28제5-13조제1항관련%29&flSeq=153808295', content: '현행 손해보험 장해분류표 색인입니다. 보험업감독업무시행세칙 별표15 표준약관 부표3의 장해 정의, 13개 신체부위, 장해지급률과 평가 원칙을 확인합니다. 검색어: 하지단축, 하지 단축, 다리 길이 차이, 대퇴골, 하퇴골, 절단, 관절 기능, 장해지급률, 후유장해, 손해보험 장해분류표.', is_published: true, created_by: null, created_at: '2026-01-01T00:00:00.000Z', updated_at: '2026-01-01T00:00:00.000Z' },
  { id: 'fallback-industrial-current', title: '산재·장해 기준', category: '산재·장해', policy_year: null, source_url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=272427', content: '현행 산업재해보상보험법 시행규칙 장해등급 기준 색인입니다. 시행규칙 제46조부터 제48조와 별표 3부터 별표 5의 장해등급, 장해계열, 신체부위별 세부기준과 조정 기준을 확인합니다. 검색어: 하지단축, 하지 단축, 다리 길이 차이, 다리 길이 단축, 대퇴, 하퇴, 절단, 관절운동, 산재 장해등급, 산업재해 장해.', is_published: true, created_by: null, created_at: '2026-01-01T00:00:00.000Z', updated_at: '2026-01-01T00:00:00.000Z' },
  { id: 'fallback-insurance-2018', title: '손해보험 장해분류표 (2018년 개정)', category: '손보·장해', policy_year: 2018, source_url: 'https://www.kiri.or.kr/report/downloadFile.do?docId=319', content: '2018년 4월 1일부터 적용된 손해보험 장해분류표 개정 기준 색인입니다. 2005년 통합 장해분류표를 개정한 당시 자료로, 눈의 조절기능 연령기준 45세에서 50세로 변경, 평형기능 장해 신설, 코의 후각 장해지급률 조정, 말하는 기능 기준 조정, 척추·추간판·사지 관절운동·인공관절 및 가관절 기준 보완 내용을 포함합니다. 검색어: 2018년, 2018년 4월 1일, 2018년 개정, 통합약관, 장해분류표, 하지단축, 하지 단축, 다리 길이 단축, 대퇴골, 하퇴골, 인공관절 20%, 인공관절 30%, 관절 운동각도, AMA, 평형기능, 후각, 추간판, 맥브라이드.', is_published: true, created_by: null, created_at: '2026-01-01T00:00:00.000Z', updated_at: '2026-01-01T00:00:00.000Z' },
  { id: 'fallback-insurance-2005', title: '손해보험 장해분류표 (2005년 통합약관)', category: '손보·장해', policy_year: 2005, source_url: 'https://www.klia.or.kr/klia/archive/insurMonth/webzine.do?month=3&webzineSe=main&year=2005', content: '2005년 4월 1일부터 적용된 생명·손해보험 통합 장해분류표 기준 색인입니다. 2018년 개정 전 실제 구약관 기준을 비교하기 위한 자료로, 신체부위별 장해 정의와 지급률, 눈·코·귀·척추·사지·인공관절·추간판 관련 기준을 확인할 수 있습니다. 검색어: 2005년, 2005년 4월 1일, 2005년 통합약관, 구약관, 통합 장해분류표, 하지단축, 하지 단축, 다리 길이 단축, 대퇴골, 하퇴골, 절단, 관절 운동각도, AMA, 인공관절 30%, 추간판, 후유장해.', is_published: true, created_by: null, created_at: '2026-01-01T00:00:00.000Z', updated_at: '2026-01-01T00:00:00.000Z' },
];

const searchAliases: Record<string, string[]> = {
  하지단축: ['하지단축', '다리길이단축', '다리길이차이', '대퇴골', '하퇴골'],
  장해지급률: ['장해지급률', '장해율', '후유장해', '장해분류표'],
  산재장해등급: ['산재장해등급', '산재장해', '산업재해', '장해등급']
};

const searchSummaries: Record<string, string> = {
  'fallback-auto-current': '자동차보험 대인배상에서 하지단축 후유장해와 장해율 기준을 확인하는 자료입니다.',
  'fallback-insurance-current': '손해보험 장해분류표에서 하지단축, 대퇴골·하퇴골 등 신체부위별 장해 기준을 확인하는 자료입니다.',
  'fallback-industrial-current': '산재 장해등급에서 하지 장해와 신체부위별 세부기준을 확인하는 자료입니다.',
  'fallback-insurance-2018': '2018년 개정 장해분류표와 하지단축 등 사지 관련 기준의 변경 여부를 비교하는 자료입니다.',
  'fallback-insurance-2005': '2005년 통합약관의 하지단축 등 구약관 기준을 현행·2018년 기준과 비교하는 자료입니다.'
};

function indexedText(policy: Policy) {
  const year = policy.policy_year ? String(policy.policy_year) : '현행';
  return normalizeSearchText(`${policy.title} ${policy.category} ${year} ${policy.content}`);
}

function normalizeSearchText(value: string) {
  return value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}%]+/gu, '');
}

function resultPriority(policy: Policy) {
  if (policy.category === '자동차보험') return 0;
  if (policy.category === '손보·장해' && policy.policy_year === null) return 1;
  if (policy.category === '산재·장해') return 2;
  if (policy.policy_year === 2018) return 3;
  if (policy.policy_year === 2005) return 4;
  return 5;
}

function searchGroups(value: string) {
  return value.split(/\s+/).map(normalizeSearchText).filter(Boolean).map((term) => searchAliases[term] || [term]);
}

function searchScore(policy: Policy, groups: string[][]) {
  if (!groups.length) return 0;
  const title = normalizeSearchText(`${policy.title} ${policy.category} ${policy.policy_year || '현행'}`);
  const document = indexedText(policy);
  let score = 0;
  for (const group of groups) {
    const matched = group.find((term) => document.includes(term));
    if (!matched) return -1;
    score += matched === group[0] ? 30 : 15;
    if (title.includes(matched)) score += 50;
  }
  return score;
}

export function PoliciesPage({ isAdmin: _isAdmin }: { isAdmin: boolean }) {
  const policies = fallbackPolicies;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');

  const categories = useMemo(() => ['전체', ...new Set(policies.map((policy) => policy.category))], [policies]);
  const filtered = useMemo(() => {
    const keyword = search.trim();
    const groups = searchGroups(keyword);
    return policies.map((policy) => ({
      policy,
      score: searchScore(policy, groups)
    })).filter(({ score, policy }) => {
      const matchesCategory = category === '전체' || policy.category === category;
      return matchesCategory && score >= 0;
    }).sort((a, b) => b.score - a.score || resultPriority(a.policy) - resultPriority(b.policy)).map(({ policy }) => policy);
  }, [policies, search, category]);

  return (
    <Card title="약관·자료 검색" subtitle="공식 기관 원문 링크와 검색용 요약 색인을 함께 제공합니다. 적용 전에는 반드시 원문과 시행일을 확인하세요.">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="약관명, 연도, 키워드 검색" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="전체">전체 분야</option>{categories.slice(1).map((item) => <option key={item} value={item}>{item}</option>)}</select>
        <a href="https://www.fss.or.kr/" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">약관공시실</a>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">입력 즉시 검색 · 빠른 검색</span>
        {quickSearches.map((term) => <button key={term} type="button" onClick={() => setSearch(term)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700">{term}</button>)}
      </div>
      <div className="mt-4 space-y-3">
        <p className="text-xs text-slate-500">{search.trim() ? `검색 결과 ${filtered.length}건` : `전체 ${filtered.length}건`} · 내장 색인에서 관련도가 높은 자료부터 표시합니다.</p>
        {filtered.map((policy) => <article key={policy.id} className="rounded-xl border border-slate-200 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><h3 className="font-semibold text-slate-900">{policy.title} · {policy.policy_year || '현행'}</h3><p className="mt-1 text-xs text-slate-500">{policy.category}</p></div>{policy.source_url && <a href={policy.source_url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-brand-700">공식 원문</a>}</div><p className="mt-3 text-sm font-medium leading-6 text-slate-700">{searchSummaries[policy.id] || policy.content}</p><details className="mt-2"><summary className="cursor-pointer text-xs font-semibold text-brand-700">색인 상세 보기</summary><p className="mt-2 text-sm leading-6 text-slate-600">{policy.content}</p></details></article>)}
        {filtered.length === 0 && <p className="text-sm text-slate-500">검색 결과가 없습니다.</p>}
      </div>
    </Card>
  );
}
