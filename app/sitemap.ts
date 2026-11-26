import type { MetadataRoute } from 'next';
import { LEGAL_PAGES_LINKS, PRACTICE_AREAS_17 } from '@/lib/legal-data';
import { getSiteUrl } from '@/lib/seo-config';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/areas-de-practica`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contacto`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/marco-de-proteccion-profesional`,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  const practiceAreaRoutes: MetadataRoute.Sitemap = PRACTICE_AREAS_17.map(
    (area) => ({
      url: `${siteUrl}/${area.slug}`,
      changeFrequency: 'monthly',
      priority: area.slug === 'derecho-penal' ? 0.95 : 0.8,
    }),
  );

  const legalRoutes: MetadataRoute.Sitemap = LEGAL_PAGES_LINKS.map((item) => ({
    url: `${siteUrl}${item.href}`,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  return [...coreRoutes, ...practiceAreaRoutes, ...legalRoutes];
}
