import type { Metadata } from 'next';
import { LawFirmPageClient } from '@/components/LawFirmPageClient';
import { buildHomeJsonLdGraph, getSiteUrl } from '@/lib/seo-config';

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    title: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
    description:
      'Licdo. Cley González Caballero, abogado litigante (Idoneidad 5551) en David, Chiriquí. Defensa penal, fase de cumplimiento de la pena y 17 áreas jurídicas en Panamá.',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
      description:
        'Defensa penal con rigor y discreción. Más de 26 años en servicios profesionales desde David, Chiriquí para todo Panamá.',
      type: 'website',
      locale: 'es_PA',
      siteName: 'CleyLawyerLegal',
      url: siteUrl,
      images: [
        {
          url: '/og-cleylawyerlegal.jpg',
          width: 1200,
          height: 630,
          alt: 'CleyLawyerLegal — Licdo. Cley González Caballero, abogado litigante en David, Chiriquí',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CleyLawyerLegal | Criterio jurídico, respaldo firme',
      description:
        'Licdo. Cley González Caballero (Idoneidad 5551) — Defensa penal y 17 áreas jurídicas desde David, Chiriquí, Panamá.',
      images: ['/og-cleylawyerlegal.jpg'],
    },
  };
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
