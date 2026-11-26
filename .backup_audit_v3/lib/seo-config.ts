import {
  BRAND_INFO,
  LEGAL_PAGES_LINKS,
  PRACTICE_AREAS_17,
  SERVICES,
} from './legal-data';

const DEFAULT_CANONICAL_URL = 'https://cleylawyerlegal.com';
const GA4_ID_PATTERN = /^G-[A-Z0-9]{6,20}$/i;
const INDEXNOW_KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

function cleanEnvValue(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^MY_/i.test(trimmed) || trimmed.includes('XXXXXXXX')) return null;
  return trimmed;
}

export type EnvLike = Record<string, string | undefined>;

export function getSiteUrl(env: EnvLike = process.env): string {
  const candidate =
    cleanEnvValue(env.NEXT_PUBLIC_SITE_URL) ||
    cleanEnvValue(env.APP_URL) ||
    DEFAULT_CANONICAL_URL;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return DEFAULT_CANONICAL_URL;
    }
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return DEFAULT_CANONICAL_URL;
  }
}

export function getGoogleVerificationCode(
  env: EnvLike = process.env,
): string | null {
  return cleanEnvValue(env.GOOGLE_SITE_VERIFICATION);
}

export function getBingVerificationCode(
  env: EnvLike = process.env,
): string | null {
  return cleanEnvValue(env.BING_SITE_VERIFICATION);
}

export function getGaMeasurementId(
  env: EnvLike = process.env,
): string | null {
  const cleaned = cleanEnvValue(env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  if (!cleaned || !GA4_ID_PATTERN.test(cleaned)) {
    return null;
  }
  return cleaned.toUpperCase();
}

export function getIndexNowKey(
  env: EnvLike = process.env,
): string | null {
  const cleaned = cleanEnvValue(env.INDEXNOW_KEY);
  if (!cleaned || !INDEXNOW_KEY_PATTERN.test(cleaned)) {
    return null;
  }
  return cleaned;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildBingSiteAuthXml(verificationCode: string): string {
  const safeCode = escapeXml(verificationCode.trim());
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<users>',
    `\t<user>${safeCode}</user>`,
    '</users>',
    '',
  ].join('\n');
}

export function getAllPublicPaths(): string[] {
  const core = ['/', '/areas-de-practica', '/contacto'];
  const areas = PRACTICE_AREAS_17.map((area) => `/${area.slug}`);
  const legal = LEGAL_PAGES_LINKS.map((item) => item.href);
  return [...core, ...areas, ...legal];
}

export function getAllPublicUrls(siteUrl: string): string[] {
  const normalizedBase = siteUrl.replace(/\/+$/, '');
  return getAllPublicPaths().map((path) =>
    path === '/' ? normalizedBase : `${normalizedBase}${path}`,
  );
}

export function validateIndexNowUrls(
  urls: unknown,
  siteUrl: string,
): { valid: boolean; urls: string[]; error?: string } {
  if (!Array.isArray(urls) || urls.length === 0) {
    return {
      valid: false,
      urls: [],
      error: 'Debe proporcionar al menos una URL pública válida.',
    };
  }

  if (urls.length > 100) {
    return {
      valid: false,
      urls: [],
      error: 'Máximo 100 URLs por solicitud de IndexNow.',
    };
  }

  let expectedHost: string;
  try {
    expectedHost = new URL(siteUrl).host;
  } catch {
    return {
      valid: false,
      urls: [],
      error: 'URL base del sitio no válida.',
    };
  }

  const verifiedUrls: string[] = [];
  for (const item of urls) {
    if (typeof item !== 'string') {
      return {
        valid: false,
        urls: [],
        error: 'Todas las URLs deben ser cadenas de texto válidas.',
      };
    }
    try {
      const parsed = new URL(item.trim());
      if (
        (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') ||
        parsed.host !== expectedHost
      ) {
        return {
          valid: false,
          urls: [],
          error: `URL fuera del dominio autorizado (${expectedHost}): ${item}`,
        };
      }
      verifiedUrls.push(parsed.toString());
    } catch {
      return {
        valid: false,
        urls: [],
        error: `URL con formato inválido: ${item}`,
      };
    }
  }

  return { valid: true, urls: Array.from(new Set(verifiedUrls)) };
}

export function buildHomeJsonLdGraph(siteUrl: string) {
  const normalizedBase = siteUrl.replace(/\/+$/, '');
  const personId = `${normalizedBase}/#person`;
  const serviceId = `${normalizedBase}/#legalservice`;
  const websiteId = `${normalizedBase}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: BRAND_INFO.lawyerName,
        jobTitle: BRAND_INFO.profession,
        description: `${BRAND_INFO.profession} en David, provincia de Chiriquí, Panamá. Idoneidad ${BRAND_INFO.licenseId}. ${BRAND_INFO.experience}.`,
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Idoneidad profesional',
          identifier: BRAND_INFO.licenseId,
          recognizedBy: {
            '@type': 'Organization',
            name: 'Corte Suprema de Justicia de Panamá',
          },
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universidad Autónoma de Chiriquí (UNACHI)',
        },
        worksFor: { '@id': serviceId },
        url: normalizedBase,
        telephone: BRAND_INFO.phoneDisplay,
        email: BRAND_INFO.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRAND_INFO.address,
          addressLocality: 'David',
          addressRegion: 'Chiriquí',
          addressCountry: 'PA',
        },
      },
      {
        '@type': 'LegalService',
        '@id': serviceId,
        name: BRAND_INFO.name,
        slogan: BRAND_INFO.slogan,
        description:
          'Defensa penal con rigor y discreción desde Chiriquí para todo Panamá. Más de 26 años en servicios profesionales.',
        url: normalizedBase,
        image: `${normalizedBase}/og-cleylawyerlegal.jpg`,
        telephone: BRAND_INFO.phoneDisplay,
        email: BRAND_INFO.email,
        founder: { '@id': personId },
        areaServed: [
          {
            '@type': 'City',
            name: 'David',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Chiriquí',
          },
          {
            '@type': 'Country',
            name: 'Panamá',
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRAND_INFO.address,
          addressLocality: 'David',
          addressRegion: 'Chiriquí',
          addressCountry: 'PA',
        },
        knowsAbout: PRACTICE_AREAS_17.map((area) => area.name),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios Jurídicos Principales',
          itemListElement: SERVICES.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.detail,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: BRAND_INFO.name,
        url: normalizedBase,
        inLanguage: 'es-PA',
        publisher: { '@id': serviceId },
      },
    ],
  };
}
