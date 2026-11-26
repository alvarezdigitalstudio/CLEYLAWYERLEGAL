import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ContactSection } from '@/components/ContactSection';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { BRAND_INFO } from '@/lib/legal-data';
import { getSiteUrl } from '@/lib/seo-config';

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    title: 'Contacto y Consulta Legal en David, Chiriquí | CleyLawyerLegal',
    description:
      'Agende su consulta con el Licdo. Cley González Caballero en Avenida Segunda, Edificio Don José, primer alto, oficina 2, David, Chiriquí, Panamá. WhatsApp +507 6497-1468.',
    alternates: {
      canonical: '/contacto',
    },
    openGraph: {
      title: 'Contacto y Consulta Legal | CleyLawyerLegal',
      description:
        'Estamos para escuchar su consulta. Atención jurídica presencial en David, Chiriquí y remota en todo Panamá.',
      type: 'website',
      locale: 'es_PA',
      url: `${siteUrl}/contacto`,
      siteName: 'CleyLawyerLegal',
      images: [
        {
          url: '/og-cleylawyerlegal.jpg',
          width: 1200,
          height: 630,
          alt: 'Contacto CleyLawyerLegal — David, Chiriquí, Panamá',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contacto y Consulta Legal | CleyLawyerLegal',
      description:
        'Atención jurídica en David, Chiriquí, Panamá. WhatsApp +507 6497-1468.',
      images: ['/og-cleylawyerlegal.jpg'],
    },
  };
}

export default function ContactoPage() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: 'Contacto — CleyLawyerLegal',
        url: `${siteUrl}/contacto`,
        inLanguage: 'es-PA',
      },
      {
        '@type': 'LegalService',
        name: BRAND_INFO.name,
        slogan: BRAND_INFO.slogan,
        telephone: BRAND_INFO.phoneDisplay,
        email: BRAND_INFO.email,
        url: `${siteUrl}/contacto`,
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
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contacto',
            item: `${siteUrl}/contacto`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <ReadingProgressBar />
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        <section className="bg-[#080808] text-[#FFFFFF] py-12 md:py-16 border-b border-[#D99A19]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
            <nav
              aria-label="Migas de pan"
              className="flex items-center gap-2 text-xs text-[#EEEEEE]/80"
            >
              <Link href="/" className="hover:text-[#F2C45D] transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span className="text-[#F2C45D] font-medium">Contacto</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F2C45D]">
                {BRAND_INFO.lawyerName} · Idoneidad {BRAND_INFO.licenseId}
              </p>
              <h1 className="font-serif text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.1] text-[#FFFFFF] text-balance">
                ESTAMOS PARA ESCUCHAR SU CONSULTA.
              </h1>
              <div className="w-20 h-[2px] bg-[#D99A19]" aria-hidden="true" />
              <p className="text-base sm:text-lg text-[#EEEEEE]/85 leading-relaxed">
                Cada situación jurídica merece atención y análisis profesional.
                Escríbanos por WhatsApp, correo electrónico o coordine su visita
                en David, provincia de Chiriquí.
              </p>
            </div>
          </div>
        </section>

        <ContactSection headingText="Canales de atención directa" />
      </main>

      <SiteFooter />
    </div>
  );
}
