import type { Metadata } from 'next';
import { LawFirmPageClient } from '@/components/LawFirmPageClient';
import {
  buildHomeJsonLdGraph,
  buildSocialMetadata,
  getSiteUrl,
  HOME_OG_DESCRIPTION,
  HOME_OG_TITLE,
} from '@/lib/seo-config';

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return buildSocialMetadata({
    siteUrl,
    path: '/',
    title: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
    ogTitle: HOME_OG_TITLE,
    description: HOME_OG_DESCRIPTION,
  });
}

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const jsonLd = buildHomeJsonLdGraph(siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LawFirmPageClient />
    </>
  );
}
