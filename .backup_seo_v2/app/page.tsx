import type { Metadata } from 'next';
import { LawFirmPageClient } from '@/components/LawFirmPageClient';
import { BRAND_INFO, PRACTICE_AREAS_17 } from '@/lib/legal-data';

const siteUrl = process.env.APP_URL || 'https://cleylawyerlegal.com';

export const metadata: Metadata = {
  title: 'CleyLawyerlegal | Abogado Penalista en Chiriquí y Panamá',
  description:
    'Licdo. Cley González Caballero, abogado litigante (Idoneidad 5551) en David, Chiriquí. Defensa penal, fase de cumplimiento de la pena y 17 áreas jurídicas en Panamá.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: BRAND_INFO.lawyerName,
        jobTitle: BRAND_INFO.profession,
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universidad Autónoma de Chiriquí (UNACHI)',
        },
        url: siteUrl,
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
        name: BRAND_INFO.name,
        description:
          'Defensa penal con rigor y discreción desde Chiriquí para todo Panamá. Más de 26 años en servicios profesionales.',
        url: siteUrl,
        telephone: BRAND_INFO.phoneDisplay,
        email: BRAND_INFO.email,
        areaServed: 'Panamá',
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRAND_INFO.address,
          addressLocality: 'David',
          addressRegion: 'Chiriquí',
          addressCountry: 'PA',
        },
        knowsAbout: PRACTICE_AREAS_17.map((area) => area.name),
      },
      {
        '@type': 'WebSite',
        name: BRAND_INFO.name,
        url: siteUrl,
        inLanguage: 'es-PA',
      },
    ],
  };

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
