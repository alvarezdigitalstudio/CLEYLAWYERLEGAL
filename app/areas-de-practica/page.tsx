import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { PracticeAreaCard } from '@/components/PracticeAreaCard';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { TrackedActionLink } from '@/components/TrackedActionLink';
import {
  BRAND_INFO,
  PRACTICE_AREAS_17,
  PRACTICE_FAMILIES,
} from '@/lib/legal-data';
import { PRACTICE_AREA_IMAGES } from '@/lib/practice-images';
import { buildSocialMetadata, getSiteUrl, serializeJsonLd } from '@/lib/seo-config';

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return buildSocialMetadata({
    siteUrl,
    path: '/areas-de-practica',
    title: '17 Áreas de Práctica Jurídica en Panamá | CleyLawyerLegal',
    description:
      'Explore las 17 áreas jurídicas atendidas por el Licdo. Cley González Caballero en David, Chiriquí y todo Panamá: Derecho Penal, Constitucional, Civil, Familia, Corporativo, Laboral y más.',
  });
}

const FAMILIES_ONLY = PRACTICE_FAMILIES.filter((f) => f !== 'Todas');

export default function PracticeAreasCatalogPage() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/areas-de-practica#webpage`,
        name: '17 Áreas Jurídicas de Práctica — CleyLawyerLegal',
        url: `${siteUrl}/areas-de-practica`,
        inLanguage: 'es-PA',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#legalservice` },
        description:
          'Catálogo completo de las 17 áreas de práctica jurídica de CleyLawyerLegal en David, Chiriquí y todo Panamá.',
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
            name: 'Áreas de práctica',
            item: `${siteUrl}/areas-de-practica`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: PRACTICE_AREAS_17.map((area, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: area.name,
          url: `${siteUrl}/${area.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <ReadingProgressBar />
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#080808] text-[#FFFFFF] py-12 md:py-16 border-b border-[#D99A19]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            <nav
              aria-label="Migas de pan"
              className="flex items-center gap-2 text-xs text-[#EEEEEE]/80"
            >
              <Link href="/" className="hover:text-[#F2C45D] transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span className="text-[#F2C45D] font-medium">
                Áreas de práctica
              </span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F2C45D]">
                {BRAND_INFO.lawyerName} · Idoneidad {BRAND_INFO.licenseId}
              </p>
              <h1 className="font-serif text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.1] text-[#FFFFFF] text-balance">
                17 ÁREAS JURÍDICAS CON CRITERIO Y RESPALDO FIRME.
              </h1>
              <div className="w-20 h-[2px] bg-[#D99A19]" aria-hidden="true" />
              <p className="text-base sm:text-lg text-[#EEEEEE]/85 leading-relaxed">
                Desde nuestra área principal en Derecho Penal y fase de
                cumplimiento de la pena hasta la atención integral de asuntos
                civiles, familiares, corporativos, laborales y territoriales en
                todo Panamá.
              </p>
            </div>
          </div>
        </section>

        {/* Quick family anchor navigation */}
        <nav
          aria-label="Familias jurídicas"
          className="bg-[#EEEEEE] border-b border-[#555555]/15"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {FAMILIES_ONLY.map((family, index) => (
              <a
                key={family}
                href={`#familia-${index + 1}`}
                className="px-3 py-1.5 bg-[#FFFFFF] border border-[#555555]/20 font-medium text-[#080808] hover:border-[#D99A19] hover:text-[#D99A19] transition-colors"
              >
                {family}
              </a>
            ))}
          </div>
        </nav>

        {/* Grouped Catalog by the 5 Official Families */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 space-y-20">
          {FAMILIES_ONLY.map((family, familyIdx) => {
            const areasInFamily = PRACTICE_AREAS_17.filter(
              (area) => area.family === family,
            );
            return (
              <section
                key={family}
                id={`familia-${familyIdx + 1}`}
                className="space-y-8 scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EEEEEE] pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#D99A19] tabular-nums">
                      Familia 0{familyIdx + 1}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#080808]">
                      {family}
                    </h2>
                  </div>
                  <p className="text-xs font-medium text-[#555555] tabular-nums">
                    {areasInFamily.length}{' '}
                    {areasInFamily.length === 1
                      ? 'área especializada'
                      : 'áreas especializadas'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {areasInFamily.map((area) => (
                    <PracticeAreaCard
                      key={area.slug}
                      area={area}
                      image={PRACTICE_AREA_IMAGES[area.slug]}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section className="bg-[#080808] text-[#FFFFFF] py-14 border-t border-[#D99A19]/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FFFFFF]">
              ¿Necesita orientación jurídica sobre su caso?
            </h2>
            <p className="text-sm sm:text-base text-[#EEEEEE]/85 max-w-2xl mx-auto">
              Coordine su atención presencial en {BRAND_INFO.cityRegionCountry} o
              por consulta remota desde cualquier provincia de Panamá.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <TrackedActionLink
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_click"
                eventParams={{ channel: 'whatsapp', location: 'areas_catalog_cta' }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold hover:bg-[#F2C45D] hover:text-[#080808] transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Escribir por WhatsApp</span>
              </TrackedActionLink>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#555555] text-[#FFFFFF] text-sm font-semibold hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors"
              >
                <span>Ir a Contacto</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
