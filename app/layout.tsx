import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { AnalyticsConsentManager } from '@/components/AnalyticsConsentManager';
import { getClarityId, getGtmId } from '@/lib/analytics';
import {
  buildSocialMetadata,
  getBingVerificationCode,
  getGaMeasurementId,
  getGoogleVerificationCode,
  getSiteUrl,
  HOME_OG_DESCRIPTION,
  HOME_OG_TITLE,
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

  const baseSocial = buildSocialMetadata({
    siteUrl,
    path: '/',
    title: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
    ogTitle: HOME_OG_TITLE,
    description: HOME_OG_DESCRIPTION,
    keywords: [
      'CleyLawyerLegal',
      'Licdo. Cley González Caballero',
      'Abogado penalista en Panamá',
      'Abogado penalista en David',
      'Abogado en Chiriquí',
      'Fase de cumplimiento de la pena Panamá',
      'Abogado litigante Panamá',
    ],
  });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
      template: '%s',
    },
    description: baseSocial.description,
    keywords: baseSocial.keywords,
    openGraph: baseSocial.openGraph,
    twitter: baseSocial.twitter,
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
