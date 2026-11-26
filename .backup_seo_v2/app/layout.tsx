import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
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

const siteUrl = process.env.APP_URL || 'https://cleylawyerlegal.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CleyLawyerlegal | Abogado Penalista en Chiriquí y Panamá',
    template: '%s',
  },
  description:
    'Licdo. Cley González Caballero, abogado litigante (Idoneidad 5551) en David, Chiriquí. Defensa penal con rigor y discreción, cumplimiento de la pena y 17 áreas jurídicas.',
  keywords: [
    'CleyLawyerlegal',
    'Licdo. Cley González Caballero',
    'Abogado penalista en Panamá',
    'Abogado penalista en David',
    'Abogado en Chiriquí',
    'Fase de cumplimiento de la pena Panamá',
    'Abogado litigante Panamá',
  ],
  openGraph: {
    title: 'CleyLawyerlegal | Abogado Penalista en Chiriquí y Panamá',
    description:
      'Defensa penal con rigor y discreción. Más de 26 años en servicios profesionales desde David, Chiriquí para todo Panamá.',
    type: 'website',
    locale: 'es_PA',
    siteName: 'CleyLawyerlegal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CleyLawyerlegal | Criterio jurídico, respaldo firme',
    description:
      'Licdo. Cley González Caballero — Abogado litigante en David, Chiriquí, Panamá.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen bg-[#FFFFFF] text-[#080808] font-sans selection:bg-[#D99A19] selection:text-[#FFFFFF]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
