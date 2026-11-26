import type { Metadata } from 'next';
import {
  BLOG_ARTICLES,
  BRAND_INFO,
  LEGAL_PAGES_LINKS,
  PRACTICE_AREAS_17,
  SERVICES,
  type PracticeAreaDetail,
} from './legal-data';

const DEFAULT_CANONICAL_URL = 'https://cleylawyerlegal.com';
const GA4_ID_PATTERN = /^G-[A-Z0-9]{6,20}$/i;
const INDEXNOW_KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

export const OG_IMAGE_PATH = '/og-cleylawyerlegal.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  'CleyLawyerLegal. Isotipo oficial y nombre de la firma jurídica.';
export const TWITTER_IMAGE_ALT =
  'Identidad visual oficial de CleyLawyerLegal.';
export const HOME_OG_TITLE =
  'CleyLawyerLegal | Criterio jurídico, respaldo firme';
export const HOME_OG_DESCRIPTION =
  'Licdo. Cley González Caballero, abogado litigante (Idoneidad 5551) en David, Chiriquí. Defensa penal con rigor y discreción, fase de cumplimiento de la pena y 17 áreas jurídicas en todo Panamá.';

export function cleanEnvValue(value: string | undefined): string | null {
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
  const webpageId = `${normalizedBase}/#webpage`;

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
        image: `${normalizedBase}${OG_IMAGE_PATH}`,
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
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: normalizedBase,
        name: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
        inLanguage: 'es-PA',
        isPartOf: { '@id': websiteId },
        about: { '@id': serviceId },
        mainEntity: { '@id': personId },
      },
      ...BLOG_ARTICLES.map((article) => ({
        '@type': 'Article',
        '@id': `${normalizedBase}/#article-${article.id}`,
        headline: article.title,
        description: article.excerpt,
        articleSection: article.category,
        inLanguage: 'es-PA',
        author: { '@id': personId },
        publisher: { '@id': serviceId },
        isPartOf: { '@id': websiteId },
        mainEntityOfPage: `${normalizedBase}/#blog`,
        about: `${normalizedBase}/${article.relatedSlug}`,
      })),
    ],
  };
}

export function buildPracticeAreaJsonLdGraph(
  area: PracticeAreaDetail,
  siteUrl: string,
  imageSrc?: string,
) {
  const normalizedBase = siteUrl.replace(/\/+$/, '');
  const personId = `${normalizedBase}/#person`;
  const serviceId = `${normalizedBase}/#legalservice`;
  const websiteId = `${normalizedBase}/#website`;
  const canonicalUrl = `${normalizedBase}/${area.slug}`;
  const areaServiceId = `${canonicalUrl}#service`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: BRAND_INFO.lawyerName,
        jobTitle: BRAND_INFO.profession,
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
        url: normalizedBase,
        telephone: BRAND_INFO.phoneDisplay,
        email: BRAND_INFO.email,
        founder: { '@id': personId },
        areaServed: [
          { '@type': 'City', name: 'David' },
          { '@type': 'AdministrativeArea', name: 'Chiriquí' },
          { '@type': 'Country', name: 'Panamá' },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRAND_INFO.address,
          addressLocality: 'David',
          addressRegion: 'Chiriquí',
          addressCountry: 'PA',
        },
      },
      {
        '@type': 'Service',
        '@id': areaServiceId,
        name: area.name,
        serviceType: area.family,
        description: area.introDescription,
        url: canonicalUrl,
        image: imageSrc
          ? `${normalizedBase}${imageSrc}`
          : `${normalizedBase}${OG_IMAGE_PATH}`,
        provider: { '@id': serviceId },
        broker: { '@id': personId },
        areaServed: [
          { '@type': 'City', name: 'David' },
          { '@type': 'AdministrativeArea', name: 'Chiriquí' },
          { '@type': 'Country', name: 'Panamá' },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: area.seoTitle,
        description: area.seoDescription,
        inLanguage: 'es-PA',
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': areaServiceId },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: normalizedBase,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Áreas de práctica',
            item: `${normalizedBase}/areas-de-practica`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: area.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: area.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function buildLegalPageJsonLdGraph(
  title: string,
  description: string,
  currentPath: string,
  siteUrl: string,
) {
  const normalizedBase = siteUrl.replace(/\/+$/, '');
  const normalizedPath = currentPath.startsWith('/')
    ? currentPath
    : `/${currentPath}`;
  const canonicalUrl = `${normalizedBase}${normalizedPath}`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${title} | ${BRAND_INFO.name}`,
        description,
        inLanguage: 'es-PA',
        isPartOf: { '@id': `${normalizedBase}/#website` },
        about: { '@id': `${normalizedBase}/#legalservice` },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: normalizedBase,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}

export interface SocialMetadataOptions {
  siteUrl: string;
  path: string;
  title: string;
  ogTitle?: string;
  description: string;
  ogDescription?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  imageAlt?: string;
  twitterAlt?: string;
}

export function buildSocialMetadata({
  siteUrl,
  path,
  title,
  ogTitle,
  description,
  ogDescription,
  type = 'website',
  keywords,
  imageAlt = OG_IMAGE_ALT,
  twitterAlt = TWITTER_IMAGE_ALT,
}: SocialMetadataOptions): Pick<
  Metadata,
  'title' | 'description' | 'keywords' | 'alternates' | 'openGraph' | 'twitter'
> {
  const normalizedBase = siteUrl.replace(/\/+$/, '');
  const normalizedPath =
    path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl =
    normalizedPath === '/'
      ? normalizedBase
      : `${normalizedBase}${normalizedPath}`;
  const ogImageUrl = `${normalizedBase}${OG_IMAGE_PATH}`;
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      siteName: BRAND_INFO.name,
      locale: 'es_PA',
      url: canonicalUrl,
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [
        {
          url: ogImageUrl,
          ...(ogImageUrl.startsWith('https://') ? { secureUrl: ogImageUrl } : {}),
          type: 'image/png',
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [
        {
          url: ogImageUrl,
          alt: twitterAlt,
        },
      ],
    },
  };
}
