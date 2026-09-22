import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
  type EmployeeProfile
} from './lib/supabase';
import { AdminPage } from './pages/AdminPage';
import { ContractDetailPage } from './pages/ContractDetailPage';
import { ContractSectionPage } from './pages/ContractSectionPage';
import { ContractsNewPage } from './pages/ContractsNewPage';
import { ContractsPage } from './pages/ContractsPage';
import { LoginPage } from './pages/LoginPage';
import { PublicRecipientRequestPage } from './pages/PublicRecipientRequestPage';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { CalculationRulesPage } from './pages/CalculationRulesPage';
import { DisabilityRatePage } from './pages/DisabilityRatePage';
import { GaCrmPage } from './pages/GaCrmPage';
import { clearAuthState, isSessionIdleExpired, readFallbackSession, touchSessionActivity } from './lib/session';

function ProtectedRoutes({ profile }: { profile: EmployeeProfile }) {
  return (
    <Routes>
      <Route element={<AppLayout profile={profile} />}>
        <Route path="/" element={<DashboardPage profile={profile} />} />
        <Route path="/dashboard" element={<DashboardPage profile={profile} />} />
        <Route path="/contracts" element={<ContractsPage profile={profile} />} />
        <Route path="/customers" element={<CustomersPage profile={profile} />} />
        <Route path="/policies" element={<PoliciesPage isAdmin={profile.role === 'admin'} />} />
        <Route path="/calculation-rules" element={<CalculationRulesPage />} />
        <Route path="/disability-rate" element={<DisabilityRatePage />} />
        <Route path="/ga-crm" element={<GaCrmPage profile={profile} section="db" />} />
        <Route path="/ga-crm/pipeline" element={<GaCrmPage profile={profile} section="pipeline" />} />
        <Route path="/ga-crm/follow-ups" element={<GaCrmPage profile={profile} section="follow-ups" />} />
        <Route path="/ga-crm/education" element={<GaCrmPage profile={profile} section="education" />} />
        <Route path="/ga-crm/stats" element={<GaCrmPage profile={profile} section="stats" />} />
        <Route path="/ga-crm/research" element={<GaCrmPage profile={profile} section="research" />} />
        <Route path="/ga-crm/data" element={<GaCrmPage profile={profile} section="data" />} />
        <Route path="/contracts/new" element={<ContractsNewPage profile={profile} />} />
        <Route path="/contracts/:id/materials" element={<ContractSectionPage profile={profile} section="materials" />} />
        <Route path="/contracts/:id/memo" element={<ContractSectionPage profile={profile} section="memo" />} />
        <Route path="/contracts/:id" element={<ContractDetailPage profile={profile} />} />
        <Route
          path="/admin"
          element={profile.role === 'admin' ? <AdminPage /> : <Navigate to="/contracts/new" replace />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);

  useEffect(() => {
    const watchdog = window.setTimeout(() => {
      setLoading(false);
    }, 4000);

    const currentUrl = new URL(window.location.href);
    const forcedLogout = sessionStorage.getItem('__force_logout__') === '1';
    if (isSessionIdleExpired()) {
      clearAuthState();
      setProfile(null);
      setLoading(false);
      window.clearTimeout(watchdog);
      return;
    }
    if (currentUrl.searchParams.get('logout') === '1' || forcedLogout) {
      clearAuthState();
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {
        // ignore storage clear errors
      }
      sessionStorage.removeItem('__force_logout__');
      setProfile(null);
      setLoading(false);
      window.clearTimeout(watchdog);
      currentUrl.searchParams.delete('logout');
      currentUrl.searchParams.delete('t');
      const cleaned = currentUrl.pathname + currentUrl.search + currentUrl.hash;
      window.history.replaceState(null, '', cleaned || '/');
      return;
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      window.clearTimeout(watchdog);
      return;
    }

    const hydrateFromFallbackProfile = (userId?: string): EmployeeProfile | null => {
      try {
        const fallbackSession = readFallbackSession();
        if (!fallbackSession?.access_token || !fallbackSession?.refresh_token) return null;

        const raw = localStorage.getItem('employee_profile_fallback');
        if (!raw) return null;

        const parsed = JSON.parse(raw) as {
          auth_user_id?: string;
          name?: string;
          role?: string;
          dob?: string;
        };

        if (!parsed.auth_user_id) return null;
        if (userId && parsed.auth_user_id !== userId) return null;
        if (!parsed.name || !parsed.role || !parsed.dob) return null;

        return {
          auth_user_id: parsed.auth_user_id,
          name: parsed.name,
          dob: parsed.dob,
          role: parsed.role === 'admin' ? 'admin' : 'staff'
        };
      } catch {
        return null;
      }
    };

    const immediateFallback = hydrateFromFallbackProfile();
      if (immediateFallback) {
        touchSessionActivity();
        setProfile(immediateFallback);
        setLoading(false);
        window.clearTimeout(watchdog);
      }

    const bootstrap = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('getSession error:', sessionError.message);
          const fallback = hydrateFromFallbackProfile();
          if (fallback) {
            setProfile(fallback);
          } else {
            clearAuthState();
            setProfile(null);
          }
          return;
        }

        const userId = data.session?.user.id ?? '';
        if (!userId) {
          touchSessionActivity();
          const fallback = hydrateFromFallbackProfile();
          if (fallback) {
            setProfile(fallback);
          } else {
            clearAuthState();
            setProfile(null);
          }
          return;
        }

        const { data: employee, error: employeeError } = await supabase
          .from('employees')
          .select('auth_user_id,name,role,dob')
          .eq('auth_user_id', userId)
          .single();

        if (employeeError) {
          console.error('employee fetch error:', employeeError.message);
          const fallback = hydrateFromFallbackProfile(userId);
          if (fallback) {
            setProfile(fallback);
          } else {
            clearAuthState();
            setProfile(null);
          }
          return;
        }

        setProfile(employee as EmployeeProfile | null);
        touchSessionActivity();
      } catch (err) {
        console.error('bootstrap error:', err);
        const fallback = hydrateFromFallbackProfile();
        if (fallback) {
          setProfile(fallback);
        } else {
          clearAuthState();
          setProfile(null);
        }
      } finally {
        setLoading(false);
        window.clearTimeout(watchdog);
      }
    };

    void bootstrap();

    const { data: authSub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const userId = session?.user.id ?? '';
        if (!userId) {
          touchSessionActivity();
          const fallback = hydrateFromFallbackProfile();
          if (fallback) {
            setProfile(fallback);
          } else {
            clearAuthState();
            setProfile(null);
          }
          return;
        }

        const { data: employee, error: employeeError } = await supabase
          .from('employees')
          .select('auth_user_id,name,role,dob')
          .eq('auth_user_id', userId)
          .single();

        if (employeeError) {
          console.error('auth change employee fetch error:', employeeError.message);
          const fallback = hydrateFromFallbackProfile(userId);
          if (fallback) {
            setProfile(fallback);
          } else {
            clearAuthState();
            setProfile(null);
          }
          return;
        }

        setProfile(employee as EmployeeProfile | null);
        touchSessionActivity();
      } catch (err) {
        console.error('auth change error:', err);
        clearAuthState();
        setProfile(null);
      }
    });

    return () => {
      window.clearTimeout(watchdog);
      authSub.subscription.unsubscribe();
    };
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200">
          <h1 className="text-lg font-semibold text-slate-900">설정이 필요합니다</h1>
          <p className="mt-2 text-sm text-slate-700">{supabaseConfigError}</p>
          <pre className="mt-4 rounded-lg bg-slate-100 p-3 text-xs text-slate-700">VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_WORKER_URL=http://127.0.0.1:8787</pre>
        </div>
      </div>
    );
  }

  if (location.pathname.startsWith('/recipient-requests/')) {
    return (
      <Routes>
        <Route path="/recipient-requests/:token" element={<PublicRecipientRequestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (loading) {
    return <div className="p-6 text-center text-slate-500">로딩 중...</div>;
  }

  if (!profile) {
    return <LoginPage onLoginDone={() => window.location.assign('/')} />;
  }

  return <ProtectedRoutes profile={profile} />;
}
