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

export const metadata: Metadata = {
  title: 'CleyLawyerlegal | Criterio jurídico, respaldo firme',
  description:
    'Asesoría legal con compromiso, experiencia y soluciones efectivas en Panamá. Consultoría jurídica, representación legal y resolución de conflictos.',
  openGraph: {
    title: 'CleyLawyerlegal | Criterio jurídico, respaldo firme',
    description:
      'Asesoría legal con compromiso, experiencia y soluciones efectivas en Panamá.',
    type: 'website',
    locale: 'es_PA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CleyLawyerlegal | Criterio jurídico, respaldo firme',
    description:
      'Asesoría legal con compromiso, experiencia y soluciones efectivas en Panamá.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-[#FFFFFF] text-[#080808] font-sans selection:bg-[#D99A19] selection:text-[#FFFFFF]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
