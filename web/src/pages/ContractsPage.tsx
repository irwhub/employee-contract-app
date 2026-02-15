import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import type { Contract, EmployeeProfile } from '../lib/supabase';
import { supabase } from '../lib/supabase';

type SortOption = 'date_desc' | 'date_asc' | 'name_asc' | 'name_desc';

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function ContractsPage({ profile }: { profile: EmployeeProfile }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      let query = supabase.from('contracts').select('*');

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

  const visibleContracts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const filtered = contracts.filter((contract) => {
      if (!keyword) return true;

      const haystack = [
        contract.customer_name,
        contract.contract_type || '',
        contract.employee_name || '',
        contract.customer_phone || '',
        contract.accident_location || ''
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(keyword);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'date_asc') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'name_asc') {
        return a.customer_name.localeCompare(b.customer_name, 'ko');
      }
      return b.customer_name.localeCompare(a.customer_name, 'ko');
    });

    return sorted;
  }, [contracts, search, sortBy]);

  return (
    <Card
      title={'\uACC4\uC57D\uC11C \uBAA9\uB85D'}
      subtitle={'\uBCF8\uC778\uC774 \uC791\uC131\uD55C \uACC4\uC57D\uC11C\uB97C \uD655\uC778\uD558\uACE0 \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.'}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={'\uACE0\uAC1D\uBA85/\uC720\uD615/\uC5F0\uB77D\uCC98 \uAC80\uC0C9'}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2 sm:w-64"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
          >
            <option value="date_desc">{'\uB0A0\uC9DC \uCD5C\uC2E0\uC21C'}</option>
            <option value="date_asc">{'\uB0A0\uC9DC \uC624\uB798\uB41C\uC21C'}</option>
            <option value="name_asc">{'\uC774\uB984 \uAC00\uB098\uB2E4\uC21C'}</option>
            <option value="name_desc">{'\uC774\uB984 \uC5ED\uC21C'}</option>
          </select>
        </div>

        <Link to="/contracts/new" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
          {'\uC0C8 \uACC4\uC57D\uC11C'}
        </Link>
      </div>

      {loading && <p className="text-sm text-slate-500">{'\uBD88\uB7EC\uC624\uB294 \uC911...'}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mb-3 text-xs text-slate-500">{'\uCD1D '}{visibleContracts.length}{'\uAC74'}</div>

      <div className="space-y-3">
        {visibleContracts.map((contract) => (
          <Link
            key={contract.id}
            to={`/contracts/${contract.id}`}
            className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
          >
            <p className="font-medium text-slate-800">{contract.customer_name}</p>
            <p className="mt-1 text-xs text-slate-500">
              {contract.contract_type || '\uACC4\uC57D\uC720\uD615 \uBBF8\uC785\uB825'} | {formatDate(contract.created_at)}
            </p>
          </Link>
        ))}

        {!loading && visibleContracts.length === 0 && (
          <p className="text-sm text-slate-500">{'\uC870\uAC74\uC5D0 \uB9DE\uB294 \uACC4\uC57D\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.'}</p>
        )}
      </div>
    </Card>
  );
}
