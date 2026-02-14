import bcrypt from 'bcryptjs';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GOOGLE_SERVICE_ACCOUNT_JSON: string;
  GOOGLE_DRIVE_FOLDER_ID: string;
  GOOGLE_SHEET_ID: string;
  GOOGLE_SHEET_TAB_NAME?: string;
  AUTH_PASSWORD_PEPPER: string;
}

interface Employee {
  auth_user_id: string;
  name: string;
  role: 'admin' | 'staff';
  pin_hash: string;
  dob: string;
  is_active: boolean;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization'
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });

function normalizeDob(input: string): string | null {
  const raw = input.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  if (!/^\d{6}$/.test(raw)) {
    return null;
  }

  const yy = Number(raw.slice(0, 2));
  const mm = Number(raw.slice(2, 4));
  const dd = Number(raw.slice(4, 6));
  const year = yy >= 30 ? 1900 + yy : 2000 + yy;

  const date = new Date(Date.UTC(year, mm - 1, dd));
  const valid =
    date.getUTCFullYear() === year && date.getUTCMonth() === mm - 1 && date.getUTCDate() === dd;
  if (!valid) {
    return null;
  }

  return `${year}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
}

const b64url = (input: ArrayBuffer | string) => {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input);
  let str = '';
  bytes.forEach((b) => {
    str += String.fromCharCode(b);
  });
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

async function signJwtRS256(payload: Record<string, unknown>, privateKeyPem: string) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;

  const clean = privateKeyPem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s+/g, '');
  const pkcs8 = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pkcs8.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned));
  return `${unsigned}.${b64url(sig)}`;
}

async function getGoogleAccessToken(env: Env) {
  const sa = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const now = Math.floor(Date.now() / 1000);
  const assertion = await signJwtRS256(
    {
      iss: sa.client_email,
      sub: sa.client_email,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
      scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'
    },
    sa.private_key
  );

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });

  if (!tokenRes.ok) {
    const msg = await tokenRes.text();
    throw new Error(`Google token issue failed: ${msg}`);
  }

  const tokenJson = (await tokenRes.json()) as { access_token: string };
  return tokenJson.access_token;
}

async function getUserFromAccessToken(env: Env, accessToken: string) {
  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    throw new Error('Invalid access token.');
  }

  return (await res.json()) as { id: string; email?: string };
}

async function getEmployeeByAuthUserId(env: Env, authUserId: string) {
  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/employees?auth_user_id=eq.${encodeURIComponent(authUserId)}&select=auth_user_id,name,role,is_active`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  );

  const rows = (await res.json()) as Array<{
    auth_user_id: string;
    name: string;
    role: 'admin' | 'staff';
    is_active: boolean;
  }>;

  return rows[0];
}

async function handleLogin(req: Request, env: Env) {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: 'worker config missing: SUPABASE_SERVICE_ROLE_KEY' }, 500);
  }
  if (!env.AUTH_PASSWORD_PEPPER) {
    return json({ error: 'worker config missing: AUTH_PASSWORD_PEPPER' }, 500);
  }

  const body = (await req.json()) as { name?: string; dob?: string; pin?: string };
  const normalizedDob = body.dob ? normalizeDob(body.dob) : null;

  if (!body.name || !body.dob || !body.pin) {
    return json({ error: 'name, dob, pin is required.' }, 400);
  }
  if (!normalizedDob) {
    return json({ error: 'dob must be YYMMDD format.' }, 400);
  }
  if (!/^\d{4}$/.test(body.pin)) {
    return json({ error: 'PIN must be 4 digits.' }, 400);
  }

  const employeeRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/employees?name=eq.${encodeURIComponent(body.name)}&dob=eq.${normalizedDob}&is_active=eq.true&select=auth_user_id,name,role,pin_hash,dob,is_active`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  );

  if (!employeeRes.ok) {
    const detail = await employeeRes.text();
    if (detail.includes('PGRST205')) {
      return json(
        {
          error:
            "employee lookup failed: table public.employees not found. Run supabase/schema.sql on the same project URL configured in worker."
        },
        500
      );
    }
    return json(
      {
        error: `employee lookup failed: status=${employeeRes.status}, detail=${detail}`
      },
      500
    );
  }

  const list = (await employeeRes.json()) as Employee[];
  const employee = list[0];
  if (!employee) {
    return json(
      {
        error: `employee not found. input(name=${body.name}, dob=${normalizedDob})`
      },
      400
    );
  }

  const pinOk = await bcrypt.compare(body.pin, employee.pin_hash);
  if (!pinOk) {
    return json({ error: 'invalid PIN.' }, 400);
  }

  const internalEmail = `${employee.auth_user_id}@internal.local`;
  const internalPassword = `PW-${employee.auth_user_id}-${env.AUTH_PASSWORD_PEPPER}`;

  const updateUserRes = await fetch(`${env.SUPABASE_URL}/auth/v1/admin/users/${employee.auth_user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({
      email: internalEmail,
      password: internalPassword,
      email_confirm: true
    })
  });

  if (!updateUserRes.ok) {
    const msg = await updateUserRes.text();
    return json({ error: `auth user update failed: ${msg}` }, 500);
  }

  const tokenRes = await fetch(`${env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: env.SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ email: internalEmail, password: internalPassword })
  });

  if (!tokenRes.ok) {
    const msg = await tokenRes.text();
    return json({ error: `session issue failed: ${msg}` }, 500);
  }

  const session = await tokenRes.json();
  return json({
    session,
    profile: {
      auth_user_id: employee.auth_user_id,
      name: employee.name,
      role: employee.role
    }
  });
}

async function appendToSheet(env: Env, googleToken: string, row: string[]) {
  const tab = env.GOOGLE_SHEET_TAB_NAME || 'Sheet1';
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}/values/${encodeURIComponent(tab)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${googleToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: [row] })
    }
  );

  if (!res.ok) {
    throw new Error(`Sheet append failed: ${await res.text()}`);
  }

  const payload = (await res.json()) as {
    updates?: { updatedRange?: string };
  };

  return payload.updates?.updatedRange || null;
}

async function createDriveFile(env: Env, googleToken: string, filename: string, dataText: string) {
  const boundary = `boundary_${crypto.randomUUID()}`;
  const metadata = {
    name: filename,
    parents: [env.GOOGLE_DRIVE_FOLDER_ID],
    mimeType: 'application/json'
  };

  const multipartBody =
    `--${boundary}\r\n` +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    'Content-Type: application/json\r\n\r\n' +
    `${dataText}\r\n` +
    `--${boundary}--`;

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${googleToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body: multipartBody
    }
  );

  if (!res.ok) {
    throw new Error(`Drive file create failed: ${await res.text()}`);
  }

  const payload = (await res.json()) as { id: string; webViewLink?: string };
  return payload;
}

async function handleGoogleSync(req: Request, env: Env) {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: 'worker config missing: SUPABASE_SERVICE_ROLE_KEY' }, 500);
  }
  if (!env.GOOGLE_SERVICE_ACCOUNT_JSON || !env.GOOGLE_DRIVE_FOLDER_ID || !env.GOOGLE_SHEET_ID) {
    return json(
      {
        error:
          'worker config missing: GOOGLE_SERVICE_ACCOUNT_JSON / GOOGLE_DRIVE_FOLDER_ID / GOOGLE_SHEET_ID'
      },
      500
    );
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return json({ error: 'Authorization Bearer token is required.' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');
  const user = await getUserFromAccessToken(env, token);
  const employee = await getEmployeeByAuthUserId(env, user.id);
  if (!employee || !employee.is_active) {
    return json({ error: 'inactive employee or no permission.' }, 403);
  }

  const body = (await req.json()) as { contract_id?: string };
  if (!body.contract_id) {
    return json({ error: 'contract_id is required.' }, 400);
  }

  const contractRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/contracts?id=eq.${body.contract_id}&select=*`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  );

  const contracts = (await contractRes.json()) as Array<Record<string, unknown>>;
  const contract = contracts[0];
  if (!contract) {
    return json({ error: 'contract not found.' }, 404);
  }

  const isOwner = contract.created_by === user.id;
  const isAdmin = employee.role === 'admin';
  if (!isOwner && !isAdmin) {
    return json({ error: 'only owner or admin can sync this contract.' }, 403);
  }

  const googleToken = await getGoogleAccessToken(env);

  const row = [
    String(contract.id),
    String(contract.employee_name || ''),
    String(contract.customer_name || ''),
    String(contract.customer_phone || ''),
    String(contract.contract_type || ''),
    String(contract.confirmed || false),
    String(contract.created_at || ''),
    new Date().toISOString()
  ];
  const updatedRange = await appendToSheet(env, googleToken, row);

  const driveFile = await createDriveFile(
    env,
    googleToken,
    `contract_${contract.id}.json`,
    JSON.stringify(contract, null, 2)
  );

  const rowMatch = updatedRange?.match(/!(?:[A-Z]+)(\d+):/);
  const rowId = rowMatch?.[1] || null;

  await fetch(`${env.SUPABASE_URL}/rest/v1/contracts?id=eq.${body.contract_id}`, {
    method: 'PATCH',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      drive_file_id: driveFile.id,
      sheet_row_id: rowId
    })
  });

  return json({
    ok: true,
    drive_file_id: driveFile.id,
    drive_link: driveFile.webViewLink || `https://drive.google.com/file/d/${driveFile.id}/view`,
    sheet_row: rowId,
    updated_range: updatedRange
  });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(req.url);

      if (!env.SUPABASE_URL?.startsWith('http')) {
        return json({ error: 'worker config missing: SUPABASE_URL' }, 500);
      }
      if (!env.SUPABASE_ANON_KEY) {
        return json({ error: 'worker config missing: SUPABASE_ANON_KEY' }, 500);
      }

      if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      if (url.pathname === '/health') {
        return json({ ok: true, now: new Date().toISOString() });
      }

      if (url.pathname === '/auth/login' && req.method === 'POST') {
        return await handleLogin(req, env);
      }

      if (url.pathname === '/integrations/google/sync' && req.method === 'POST') {
        return await handleGoogleSync(req, env);
      }

      return json({ error: 'Not Found' }, 404);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      return json({ error: message }, 500);
    }
  }
};
