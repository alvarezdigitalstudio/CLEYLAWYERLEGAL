export const PRIVACY_CONSENT_STORAGE_KEY = 'cleylawyerlegal_privacy_consent_v1';
export const LEGACY_CONSENT_STORAGE_KEY = 'cleylawyerlegal_ga_consent_v1';
export const PRIVACY_CONSENT_POLICY_VERSION = '2026-11-v1';
export const PRIVACY_CONSENT_CHANGE_EVENT = 'cleylawyerlegal:consent-change';
export const OPEN_PRIVACY_PREFERENCES_EVENT =
  'cleylawyerlegal:open-cookie-preferences';

export type ConsentDecisionType = 'accepted_all' | 'rejected_all' | 'custom';
export type OptionalConsentCategory = 'functional' | 'analytics';

export interface ConsentCategories {
  necessary: true;
  functional: boolean;
  analytics: boolean;
}

export interface PrivacyConsentRecord {
  version: string;
  timestamp: string;
  decision: ConsentDecisionType;
  categories: ConsentCategories;
}

export function createDefaultCategories(): ConsentCategories {
  return {
    necessary: true,
    functional: false,
    analytics: false,
  };
}

export function buildConsentRecord(options: {
  decision: ConsentDecisionType;
  functional?: boolean;
  analytics?: boolean;
  now?: Date;
}): PrivacyConsentRecord {
  const timestamp = (options.now ?? new Date()).toISOString();

  if (options.decision === 'accepted_all') {
    return {
      version: PRIVACY_CONSENT_POLICY_VERSION,
      timestamp,
      decision: 'accepted_all',
      categories: {
        necessary: true,
        functional: true,
        analytics: true,
      },
    };
  }

  if (options.decision === 'rejected_all') {
    return {
      version: PRIVACY_CONSENT_POLICY_VERSION,
      timestamp,
      decision: 'rejected_all',
      categories: {
        necessary: true,
        functional: false,
        analytics: false,
      },
    };
  }

  const functional = Boolean(options.functional);
  const analytics = Boolean(options.analytics);

  return {
    version: PRIVACY_CONSENT_POLICY_VERSION,
    timestamp,
    decision: 'custom',
    categories: {
      necessary: true,
      functional,
      analytics,
    },
  };
}

export function parseStoredConsent(
  raw: string | null | undefined,
  expectedVersion: string = PRIVACY_CONSENT_POLICY_VERSION,
): PrivacyConsentRecord | null {
  if (!raw || typeof raw !== 'string') return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;

    const candidate = parsed as Record<string, unknown>;
    if (candidate.version !== expectedVersion) return null;
    if (
      typeof candidate.timestamp !== 'string' ||
      Number.isNaN(Date.parse(candidate.timestamp))
    ) {
      return null;
    }
    if (
      candidate.decision !== 'accepted_all' &&
      candidate.decision !== 'rejected_all' &&
      candidate.decision !== 'custom'
    ) {
      return null;
    }

    const categories = candidate.categories as Record<string, unknown> | undefined;
    if (!categories || typeof categories !== 'object') return null;
    if (categories.necessary !== true) return null;
    if (
      typeof categories.functional !== 'boolean' ||
      typeof categories.analytics !== 'boolean'
    ) {
      return null;
    }

    return {
      version: candidate.version,
      timestamp: candidate.timestamp,
      decision: candidate.decision,
      categories: {
        necessary: true,
        functional: categories.functional,
        analytics: categories.analytics,
      },
    };
  } catch {
    return null;
  }
}

export function isOptionalCategoryEnabled(
  record: PrivacyConsentRecord | null | undefined,
  category: OptionalConsentCategory,
): boolean {
  if (!record) return false;
  return Boolean(record.categories[category]);
}

export function formatConsentTimestamp(isoTimestamp: string): string {
  const parsed = new Date(isoTimestamp);
  if (Number.isNaN(parsed.getTime())) {
    return isoTimestamp;
  }

  try {
    return new Intl.DateTimeFormat('es-PA', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(parsed);
  } catch {
    return parsed.toISOString().slice(0, 16).replace('T', ' ');
  }
}

export function readBrowserConsentRaw(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(PRIVACY_CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function readBrowserConsentRecord(): PrivacyConsentRecord | null {
  return parseStoredConsent(readBrowserConsentRaw());
}

export function hasAnalyticsConsentClient(): boolean {
  return isOptionalCategoryEnabled(readBrowserConsentRecord(), 'analytics');
}

export function writeBrowserConsentRecord(record: PrivacyConsentRecord): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      PRIVACY_CONSENT_STORAGE_KEY,
      JSON.stringify(record),
    );
    window.localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
  } catch {
    // Ignore storage access restrictions
  }
  window.dispatchEvent(new CustomEvent(PRIVACY_CONSENT_CHANGE_EVENT));
}

const KNOWN_ANALYTICS_COOKIE_PREFIXES = [
  '_ga',
  '_gid',
  '_gat',
  '_gcl_au',
  '_clck',
  '_clsk',
  'CLID',
];

export function clearOptionalAnalyticsCookies(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const existingCookies = document.cookie
    ? document.cookie.split(';').map((part) => part.trim().split('=')[0])
    : [];

  const targets = existingCookies.filter((cookieName) =>
    KNOWN_ANALYTICS_COOKIE_PREFIXES.some(
      (prefix) => cookieName === prefix || cookieName.startsWith(prefix),
    ),
  );

  if (targets.length === 0) return;

  const hostname = window.location.hostname;
  const domainVariants = new Set<string>(['', hostname]);
  if (hostname.includes('.')) {
    domainVariants.add(`.${hostname}`);
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      domainVariants.add(`.${parts.slice(-2).join('.')}`);
    }
  }

  for (const name of targets) {
    for (const domain of domainVariants) {
      const domainAttr = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}; SameSite=Lax`;
    }
  }
}
