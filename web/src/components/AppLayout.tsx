import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { EmployeeProfile } from '../lib/supabase';

interface AppLayoutProps {
  profile: EmployeeProfile;
}

export function AppLayout({ profile }: AppLayoutProps) {
  const navigate = useNavigate();

  const onLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const menu = [
    { to: '/contracts', label: '내 계약서' },
    { to: '/contracts/new', label: '새 계약서' },
    ...(profile.role === 'admin' ? [{ to: '/admin', label: '관리자' }] : [])
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/contracts" className="text-base font-bold sm:text-lg">
            이로운 손해사정 행정사 계약서 작성
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-white/20 px-3 py-1">{profile.name} ({profile.role})</span>
            <button className="rounded-lg bg-white/15 px-3 py-1.5 hover:bg-white/25" onClick={onLogout}>
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <nav className="mx-auto flex w-full max-w-4xl gap-2 px-4 py-4">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium ${isActive ? 'bg-brand-100 text-brand-700' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="mx-auto w-full max-w-4xl px-4 pb-10">
        <Outlet />
      </main>
    </div>
  );
}

