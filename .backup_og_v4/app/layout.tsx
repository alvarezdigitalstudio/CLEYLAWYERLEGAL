import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { AnalyticsConsentManager } from '@/components/AnalyticsConsentManager';
import { getClarityId, getGtmId } from '@/lib/analytics';
import {
  getBingVerificationCode,
  getGaMeasurementId,
  getGoogleVerificationCode,
  getSiteUrl,
} from '@/lib/seo-config';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const googleVerification = getGoogleVerificationCode();
  const bingVerification = getBingVerificationCode();

  const verification: Metadata['verification'] =
    googleVerification || bingVerification
      ? {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? { other: { 'msvalidate.01': bingVerification } }
            : {}),
        }
      : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
      template: '%s',
    },
    description:
      'Licdo. Cley González Caballero, abogado litigante (Idoneidad 5551) en David, Chiriquí. Defensa penal con rigor y discreción, cumplimiento de la pena y 17 áreas jurídicas.',
    keywords: [
      'CleyLawyerLegal',
      'Licdo. Cley González Caballero',
      'Abogado penalista en Panamá',
      'Abogado penalista en David',
      'Abogado en Chiriquí',
      'Fase de cumplimiento de la pena Panamá',
      'Abogado litigante Panamá',
    ],
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
          alt: 'CleyLawyerLegal — Criterio jurídico, respaldo firme',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CleyLawyerLegal | Criterio jurídico, respaldo firme',
      description:
        'Licdo. Cley González Caballero — Abogado litigante en David, Chiriquí, Panamá.',
      images: ['/og-cleylawyerlegal.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    ...(verification ? { verification } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: '#080808',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaMeasurementId = getGaMeasurementId();
  const gtmId = getGtmId();
  const clarityId = getClarityId();

  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${jakarta.variable}`}
    >
      <body
        className="min-h-screen bg-[#FFFFFF] text-[#080808] font-sans selection:bg-[#D99A19] selection:text-[#FFFFFF]"
        suppressHydrationWarning
      >
        {children}
        <AnalyticsConsentManager
          measurementId={gaMeasurementId}
          gtmId={gtmId}
          clarityId={clarityId}
        />
      </body>
    </html>
  );
}
