import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
  type EmployeeProfile
} from './lib/supabase';
import { AdminPage } from './pages/AdminPage';
import { ContractDetailPage } from './pages/ContractDetailPage';
import { ContractsNewPage } from './pages/ContractsNewPage';
import { ContractsPage } from './pages/ContractsPage';
import { LoginPage } from './pages/LoginPage';
import { clearAuthState } from './lib/session';

function ProtectedRoutes({ profile }: { profile: EmployeeProfile }) {
  return (
    <Routes>
      <Route element={<AppLayout profile={profile} />}>
        <Route path="/contracts" element={<ContractsPage profile={profile} />} />
        <Route path="/contracts/new" element={<ContractsNewPage profile={profile} />} />
        <Route path="/contracts/:id" element={<ContractDetailPage profile={profile} />} />
        <Route
          path="/admin"
          element={profile.role === 'admin' ? <AdminPage /> : <Navigate to="/contracts/new" replace />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/contracts/new" replace />} />
    </Routes>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);

  useEffect(() => {
    const watchdog = window.setTimeout(() => {
      setLoading(false);
    }, 4000);

    if (!isSupabaseConfigured) {
      setLoading(false);
      window.clearTimeout(watchdog);
      return;
    }

    const bootstrap = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('getSession error:', sessionError.message);
          clearAuthState();
          setProfile(null);
          return;
        }

        const userId = data.session?.user.id;
        if (!userId) {
          clearAuthState();
          setProfile(null);
          return;
        }

        const { data: employee, error: employeeError } = await supabase
          .from('employees')
          .select('auth_user_id,name,role,dob')
          .eq('auth_user_id', userId)
          .single();

        if (employeeError) {
          console.error('employee fetch error:', employeeError.message);
          clearAuthState();
          setProfile(null);
          return;
        }

        setProfile(employee as EmployeeProfile | null);
      } catch (err) {
        console.error('bootstrap error:', err);
        clearAuthState();
        setProfile(null);
      } finally {
        setLoading(false);
        window.clearTimeout(watchdog);
      }
    };

    bootstrap();

    const { data: authSub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const userId = session?.user.id;
        if (!userId) {
          clearAuthState();
          setProfile(null);
          return;
        }

        const { data: employee, error: employeeError } = await supabase
          .from('employees')
          .select('auth_user_id,name,role,dob')
          .eq('auth_user_id', userId)
          .single();

        if (employeeError) {
          console.error('auth change employee fetch error:', employeeError.message);
          clearAuthState();
          setProfile(null);
          return;
        }

        setProfile(employee as EmployeeProfile | null);
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

  if (loading) {
    return <div className="p-6 text-center text-slate-500">로딩 중...</div>;
  }

  if (!profile) {
    return <LoginPage onLoginDone={() => window.location.assign('/contracts/new')} />;
  }

  return <ProtectedRoutes profile={profile} />;
}
