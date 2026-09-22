export function recoverMalformedUtf8Text(input: unknown): string {
  if (typeof input !== 'string') return '';
  if (!input) return '';

  const candidate = decodeByLatin1AsUtf8(input);
  if (looksLikeRecoveredText(candidate) || looksLikeLikelyUtf8Mojibake(input)) {
    return candidate;
  }

  return input;
}

export function recoverContractTextMap<T extends object>(record: T): T {
  const out: Record<string, unknown> = { ...(record as Record<string, unknown>) };
  Object.keys(out).forEach((key) => {
    const value = out[key];
    if (typeof value === 'string') {
      out[key] = recoverMalformedUtf8Text(value);
    }
  });
  return out as T;
}

function decodeByLatin1AsUtf8(input: string): string {
  try {
    return decodeURIComponent(escape(input));
  } catch {
    return input;
  }
}

function looksLikeRecoveredText(value: string) {
  if (!value) return false;
  if (value.includes('�')) return false;
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value) || /[\u3131-\u3163\uac00-\ud7a3]/.test(value);
}

function looksLikeLikelyUtf8Mojibake(value: string) {
  if (!value) return false;
  if (value.includes('�')) return false;
  return /[À-ÿ].*[À-ÿ]/.test(value);
}
