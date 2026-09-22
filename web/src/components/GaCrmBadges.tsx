import type { ReactNode } from 'react';
import type { GaGrade, GaResearchStatus, GaSalesStage } from '../lib/ga-crm';

const gradeStyles: Record<GaGrade, string> = {
  'A+': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  A: 'bg-blue-50 text-blue-700 ring-blue-200',
  B: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  C: 'bg-amber-50 text-amber-700 ring-amber-200',
  D: 'bg-red-50 text-red-700 ring-red-200'
};

const stageStyles: Record<GaSalesStage, string> = {
  미연락: 'bg-slate-100 text-slate-700 ring-slate-200', '연락 예정': 'bg-blue-50 text-blue-700 ring-blue-200',
  '전화 연결': 'bg-cyan-50 text-cyan-700 ring-cyan-200', '담당자 연결': 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  '교육 제안': 'bg-violet-50 text-violet-700 ring-violet-200', '관심 있음': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  '자료 발송': 'bg-indigo-50 text-indigo-700 ring-indigo-200', '일정 협의': 'bg-amber-50 text-amber-700 ring-amber-200',
  '교육 확정': 'bg-green-50 text-green-700 ring-green-200', '교육 완료': 'bg-green-100 text-green-800 ring-green-300',
  '후속 관리': 'bg-slate-100 text-slate-700 ring-slate-200', '제휴 가능성 있음': 'bg-purple-50 text-purple-700 ring-purple-200',
  '사건 의뢰 발생': 'bg-rose-50 text-rose-700 ring-rose-200', 거절: 'bg-red-50 text-red-700 ring-red-200',
  '재연락 필요': 'bg-orange-50 text-orange-700 ring-orange-200', '연락 불가': 'bg-red-50 text-red-700 ring-red-200', '연락 금지': 'bg-red-100 text-red-800 ring-red-300'
};

function Badge({ children, className = '' }: { readonly children: ReactNode; readonly className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}>{children}</span>;
}

export function GradeBadge({ grade }: { readonly grade: GaGrade }) {
  return <Badge className={gradeStyles[grade]}>{grade}</Badge>;
}

export function StageBadge({ stage }: { readonly stage: GaSalesStage }) {
  return <Badge className={stageStyles[stage]}>{stage}</Badge>;
}

export function ResearchBadge({ status }: { readonly status: GaResearchStatus }) {
  const className = status === '교차검증 완료' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : status === '추가조사 필요' || status === '재검증 필요' ? 'bg-amber-50 text-amber-700 ring-amber-200' : 'bg-slate-100 text-slate-700 ring-slate-200';
  return <Badge className={className}>{status}</Badge>;
}

export function ConfidenceBadge({ label }: { readonly label: string }) {
  const className = label.includes('확인') || label === '복수출처 일치' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : label === '미확인' ? 'bg-slate-100 text-slate-600 ring-slate-200' : 'bg-amber-50 text-amber-700 ring-amber-200';
  return <Badge className={className}>{label}</Badge>;
}
