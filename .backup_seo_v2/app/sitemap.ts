import type { MetadataRoute } from 'next';
import { LEGAL_PAGES_LINKS, PRACTICE_AREAS_17 } from '@/lib/legal-data';

const siteUrl = process.env.APP_URL || 'https://cleylawyerlegal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/areas-de-practica`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contacto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  const practiceAreaRoutes: MetadataRoute.Sitemap = PRACTICE_AREAS_17.map(
    (area) => ({
      url: `${siteUrl}/${area.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: area.slug === 'derecho-penal' ? 0.95 : 0.8,
    }),
  );

  const legalRoutes: MetadataRoute.Sitemap = LEGAL_PAGES_LINKS.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  return [...coreRoutes, ...practiceAreaRoutes, ...legalRoutes];
}
