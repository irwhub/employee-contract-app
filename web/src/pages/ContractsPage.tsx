import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import type { Contract, EmployeeProfile } from '../lib/supabase';
import { supabase } from '../lib/supabase';

export function ContractsPage({ profile }: { profile: EmployeeProfile }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false });

      if (profile.role === 'staff') {
        query = query.eq('created_by', profile.auth_user_id);
      }

      const { data, error: dbError } = await query;
      if (dbError) {
        setError(dbError.message);
      } else {
        setContracts((data || []) as Contract[]);
      }
      setLoading(false);
    };

    load();
  }, [profile.auth_user_id, profile.role]);

  return (
    <Card title="계약서 목록" subtitle="본인이 작성한 계약서를 확인하고 수정할 수 있습니다.">
      <div className="mb-4 flex justify-end">
        <Link to="/contracts/new" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
          새 계약서
        </Link>
      </div>
      {loading && <p className="text-sm text-slate-500">불러오는 중...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-3">
        {contracts.map((contract) => (
          <Link
            key={contract.id}
            to={`/contracts/${contract.id}`}
            className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
          >
            <p className="font-medium text-slate-800">{contract.customer_name}</p>
            <p className="mt-1 text-xs text-slate-500">
              {contract.contract_type || '계약유형 미입력'} | {new Date(contract.created_at).toLocaleString()}
            </p>
          </Link>
        ))}
        {!loading && contracts.length === 0 && <p className="text-sm text-slate-500">아직 계약서가 없습니다.</p>}
      </div>
    </Card>
  );
}
