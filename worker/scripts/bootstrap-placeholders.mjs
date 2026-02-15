import fs from 'node:fs';
import path from 'node:path';

const envPath = path.join(process.cwd(), '.dev.vars');
if (!fs.existsSync(envPath)) {
  throw new Error('.dev.vars not found in worker directory');
}

const env = {};
for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx < 0) continue;
  const key = trimmed.slice(0, idx).trim();
  let value = trimmed.slice(idx + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  env[key] = value;
}

const placeholders = [
  'employee_name','contract_type','customer_name','victim_or_insured','beneficiary_name','customer_gender','customer_phone','customer_dob','customer_address','relation_to_party','accident_date','accident_location','accident_summary','upfront_fee_ten_thousand','admin_fee_percent','adjuster_fee_percent','fee_notes','content','consent_personal_info','consent_required_terms','delegation_auto_insurance','delegation_personal_insurance','delegation_workers_comp','delegation_disability_pension','delegation_employer_liability','delegation_school_safety','delegation_other','delegation_other_text','now_date'
];

async function getGoogleAccessToken() {
  if (env.GOOGLE_OAUTH_ACCESS_TOKEN) return env.GOOGLE_OAUTH_ACCESS_TOKEN;

  if (env.GOOGLE_OAUTH_CLIENT_ID && env.GOOGLE_OAUTH_CLIENT_SECRET && env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
        refresh_token: env.GOOGLE_OAUTH_REFRESH_TOKEN
      })
    });
    if (!res.ok) throw new Error(`OAuth refresh failed: ${await res.text()}`);
    const json = await res.json();
    return json.access_token;
  }

  throw new Error('No OAuth token config found in .dev.vars');
}

function parseDocText(docJson) {
  const chunks = [];
  const body = docJson?.body?.content || [];
  for (const block of body) {
    const elements = block?.paragraph?.elements || [];
    for (const el of elements) {
      const t = el?.textRun?.content;
      if (t) chunks.push(t);
    }
  }
  return chunks.join('');
}

async function appendMissingPlaceholders(token, docId, label) {
  const getRes = await fetch(`https://docs.googleapis.com/v1/documents/${docId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!getRes.ok) throw new Error(`${label} doc read failed: ${await getRes.text()}`);
  const doc = await getRes.json();

  const allText = parseDocText(doc);
  const missing = placeholders.filter((k) => !allText.includes(`{{${k}}}`));
  if (missing.length === 0) {
    console.log(`[${label}] placeholders already complete`);
    return;
  }

  const endIndex = (doc.body?.content?.[doc.body.content.length - 1]?.endIndex || 2) - 1;
  const block =
    '\n\n[자동치환 플레이스홀더]\n' +
    missing.map((k) => `{{${k}}}`).join('\n') +
    '\n';

  const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: { index: endIndex },
            text: block
          }
        }
      ]
    })
  });
  if (!updateRes.ok) throw new Error(`${label} append failed: ${await updateRes.text()}`);
  console.log(`[${label}] appended ${missing.length} placeholders`);
}

async function main() {
  const token = await getGoogleAccessToken();

  const docs = [
    ['adjuster', env.GOOGLE_TEMPLATE_ADJUSTER_DOC_ID],
    ['admin', env.GOOGLE_TEMPLATE_ADMIN_DOC_ID],
    ['combined', env.GOOGLE_TEMPLATE_COMBINED_DOC_ID]
  ].filter(([, id]) => Boolean(id));

  if (docs.length === 0) {
    throw new Error('No template doc IDs set in .dev.vars');
  }

  for (const [label, docId] of docs) {
    await appendMissingPlaceholders(token, docId, label);
  }

  console.log('done');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});