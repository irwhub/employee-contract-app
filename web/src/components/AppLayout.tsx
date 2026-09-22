import { useCallback, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { clearAuthState, isSessionIdleExpired, touchSessionActivity } from '../lib/session';
import type { EmployeeProfile } from '../lib/supabase';

interface AppLayoutProps {
  profile: EmployeeProfile;
}

const AUTO_LOGOUT_MS = 60 * 60 * 1000;

export function AppLayout({ profile }: AppLayoutProps) {
  const location = useLocation();
  const isGaCrm = location.pathname.startsWith('/ga-crm');
  const performLogout = useCallback(async () => {
    sessionStorage.setItem('__force_logout__', '1');
    clearAuthState();
    const signOutWithTimeout = Promise.race([
      supabase.auth.signOut({ scope: 'global' }),
      new Promise((resolve) => setTimeout(resolve, 2000))
    ]);

    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore storage clear errors
    }
    try {
      await signOutWithTimeout;
    } catch {
      // ignore signOut errors and continue hard-logout
    }
    window.location.replace(`/?logout=1&t=${Date.now()}`);
  }, []);

  const onLogout = async () => {
    await performLogout();
  };

  useEffect(() => {
    touchSessionActivity();

    const interval = window.setInterval(() => {
      if (isSessionIdleExpired()) {
        void performLogout();
      }
    }, 5 * 60 * 1000);

    let timer = window.setTimeout(() => {
      void performLogout();
    }, AUTO_LOGOUT_MS);

    const resetTimer = () => {
      touchSessionActivity();
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        void performLogout();
      }, AUTO_LOGOUT_MS);
    };

    const events: Array<keyof WindowEventMap | 'visibilitychange' | 'focus'> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'scroll',
      'mousemove',
      'focus',
      'visibilitychange'
    ];
    for (const eventName of events) {
      window.addEventListener(eventName, resetTimer, { passive: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
      for (const eventName of events) {
        window.removeEventListener(eventName, resetTimer);
      }
    };
  }, [performLogout]);

  const menu = [
    { to: '/', label: '대시보드' },
    { to: '/contracts', label: '사건관리' },
    { to: '/customers', label: '고객관리' },
    { to: '/disability-rate', label: '장해율' },
    { to: '/calculation-rules', label: '계산기' },
    { to: '/policies', label: '약관검색' },
    { to: '/ga-crm', label: 'GA 영업관리' },
    ...(profile.role === 'admin' ? [{ to: '/admin', label: '관리자 대시보드' }] : [])
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg">
        <div className={`mx-auto flex w-full ${isGaCrm ? 'max-w-7xl' : 'max-w-4xl'} flex-wrap items-center justify-between gap-3 px-4 py-4`}>
          <Link to="/" className="min-w-0 break-keep text-base font-bold sm:text-lg">
            이로운 손해사정 행정사 계약서 작성
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 text-sm">
            <span className="rounded-full bg-white/20 px-3 py-1">{profile.name} ({profile.role})</span>
            <button
              type="button"
              className="rounded-lg bg-white/15 px-3 py-1.5 hover:bg-white/25"
              onClick={onLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <nav className={`mx-auto flex w-full ${isGaCrm ? 'max-w-7xl' : 'max-w-4xl'} flex-wrap gap-2 px-4 py-4`}>
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium ${
                isActive ? 'bg-brand-100 text-brand-700' : 'bg-white text-slate-600 ring-1 ring-slate-200'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className={`mx-auto w-full ${isGaCrm ? 'max-w-7xl' : 'max-w-4xl'} px-4 pb-10`}>
        <Outlet />
      </main>
    </div>
  );
}
