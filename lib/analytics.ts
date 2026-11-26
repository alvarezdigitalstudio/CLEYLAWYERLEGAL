import { cleanEnvValue, type EnvLike } from './seo-config';

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]{5,12}$/i;
const CLARITY_ID_PATTERN = /^[a-z0-9]{6,20}$/i;

export type SxoEventName =
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'practice_area_view';

export interface SxoEventContext {
  channel?: string;
  location?: string;
  service_area?: string;
  province?: string;
  modality?: string;
  contact_preference?: string;
  slug?: string;
  page_path?: string;
}

const ALLOWED_SXO_KEYS: ReadonlyArray<keyof SxoEventContext> = [
  'channel',
  'location',
  'service_area',
  'province',
  'modality',
  'contact_preference',
  'slug',
  'page_path',
];

export function getGtmId(env: EnvLike = process.env): string | null {
  const cleaned = cleanEnvValue(env.NEXT_PUBLIC_GTM_ID);
  if (!cleaned || !GTM_ID_PATTERN.test(cleaned)) {
    return null;
  }
  return cleaned.toUpperCase();
}

export function getClarityId(env: EnvLike = process.env): string | null {
  const cleaned = cleanEnvValue(env.NEXT_PUBLIC_CLARITY_ID);
  if (!cleaned || !CLARITY_ID_PATTERN.test(cleaned)) {
    return null;
  }
  return cleaned;
}

function sanitizeEventString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return null;
  return cleaned.slice(0, 120);
}

/**
 * Strictly whitelists non-PII SXO context attributes so client names,
 * phones, emails, or legal descriptions never enter telemetry payloads.
 */
export function buildSxoEventPayload(
  params: Record<string, unknown> = {},
): SxoEventContext {
  const sanitized: SxoEventContext = {};
  for (const key of ALLOWED_SXO_KEYS) {
    const cleanVal = sanitizeEventString(params[key]);
    if (cleanVal) {
      sanitized[key] = cleanVal;
    }
  }
  return sanitized;
}

export function trackSxoEvent(
  eventName: SxoEventName,
  params: SxoEventContext | Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;

  const pagePath =
    typeof params.page_path === 'string' && params.page_path.trim().length > 0
      ? params.page_path
      : typeof window.location?.pathname === 'string'
        ? window.location.pathname
        : undefined;

  const payload = buildSxoEventPayload({
    ...params,
    page_path: pagePath,
  });

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: eventName,
    ...payload,
  });

  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, payload);
  }

  if (typeof w.clarity === 'function') {
    w.clarity('event', eventName);
  }
}
