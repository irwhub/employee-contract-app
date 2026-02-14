import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      {title && <h2 className="text-lg font-semibold text-slate-800">{title}</h2>}
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      <div className={title ? 'mt-5' : ''}>{children}</div>
    </section>
  );
}
