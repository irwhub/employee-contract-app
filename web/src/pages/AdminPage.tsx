import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Label } from '../components/FormControls';
import { supabase, type Contract, type EmployeeProfile } from '../lib/supabase';

export function AdminPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const [{ data: contractData, error: contractError }, { data: employeeData, error: employeeError }] =
        await Promise.all([
          supabase.from('contracts').select('*').order('created_at', { ascending: false }),
          supabase.from('employees').select('auth_user_id,name,role,dob').order('name', { ascending: true })
        ]);

      if (contractError || employeeError) {
        setError(contractError?.message || employeeError?.message || '조회 실패');
        return;
      }
      setContracts((contractData || []) as Contract[]);
      setEmployees((employeeData || []) as EmployeeProfile[]);
    };

    load();
  }, []);

  const filtered =
    employeeFilter === 'all' ? contracts : contracts.filter((c) => c.created_by === employeeFilter);

  return (
    <Card title="관리자 대시보드" subtitle="전체 계약 조회 및 직원별 필터">
      <div className="mb-4 max-w-sm">
        <Label text="직원 필터" />
        <select
          value={employeeFilter}
          onChange={(e) => setEmployeeFilter(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
        >
          <option value="all">전체</option>
          {employees
            .filter((e) => e.role === 'staff' || e.role === 'admin')
            .map((employee) => (
              <option key={employee.auth_user_id} value={employee.auth_user_id}>
                {employee.name} ({employee.role})
              </option>
            ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-3">
        {filtered.map((contract) => (
          <Link
            key={contract.id}
            to={`/contracts/${contract.id}`}
            className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <p className="font-medium text-slate-800">{contract.customer_name}</p>
            <p className="text-xs text-slate-500">
              작성자: {contract.employee_name} | {new Date(contract.created_at).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </Card>
  );
}
