import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ReadingProgressBar } from './ReadingProgressBar';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { BRAND_INFO, LEGAL_PAGES_LINKS } from '@/lib/legal-data';
import {
  buildLegalPageJsonLdGraph,
  getSiteUrl,
  serializeJsonLd,
} from '@/lib/seo-config';
import { BrandLogo } from './BrandLogo';

interface LegalSectionBlock {
  heading: string;
  paragraphs: string[];
}

interface LegalDocumentLayoutProps {
  title: string;
  subtitle: string;
  currentPath: string;
  sections: LegalSectionBlock[];
}

export function LegalDocumentLayout({
  title,
  subtitle,
  currentPath,
  sections,
}: LegalDocumentLayoutProps) {
  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = buildLegalPageJsonLdGraph(
    title,
    subtitle,
    currentPath,
    siteUrl,
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <ReadingProgressBar />
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <main className="flex-1">
        <section className="bg-[#080808] text-[#FFFFFF] py-12 md:py-14 border-b border-[#D99A19]/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
            <nav
              aria-label="Migas de pan"
              className="flex items-center gap-2 text-xs text-[#EEEEEE]/80"
            >
              <Link href="/" className="hover:text-[#F2C45D] transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span className="text-[#F2C45D] font-medium">{title}</span>
            </nav>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
              {title}
            </h1>
            <div className="w-16 h-[2px] bg-[#D99A19]" aria-hidden="true" />
            <p className="text-sm sm:text-base text-[#EEEEEE]/85 max-w-2xl">
              {subtitle}
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 space-y-8">
            <div className="bg-[#EEEEEE]/70 border-l-2 border-[#D99A19] p-4 text-xs sm:text-sm text-[#171717] leading-relaxed">
              Documento informativo elaborado conforme al marco jurídico de la
              República de Panamá para revisión y validación profesional de{' '}
              <strong>{BRAND_INFO.name}</strong> ({BRAND_INFO.lawyerName},
              Idoneidad {BRAND_INFO.licenseId}).
            </div>

            {sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#080808]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-[#555555] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </article>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="border border-[#EEEEEE] bg-[#FFFFFF] p-6 space-y-3">
              <h2 className="font-serif text-lg font-semibold text-[#080808]">
                Documentos legales
              </h2>
              <ul className="space-y-2 text-sm">
                {LEGAL_PAGES_LINKS.map((item) => {
                  const isActive = item.href === currentPath;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 border transition-colors ${
                          isActive
                            ? 'border-[#D99A19] bg-[#080808] text-[#FFFFFF] font-semibold'
                            : 'border-[#EEEEEE] text-[#171717] hover:border-[#D99A19]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-[#080808] text-[#FFFFFF] p-6 space-y-3 text-xs sm:text-sm">
              <BrandLogo variant="dark" size="sm" />
              <p className="font-serif text-base font-semibold text-[#F2C45D] pt-1">
                Datos del titular
              </p>
              <p className="text-[#EEEEEE]/90">{BRAND_INFO.lawyerName}</p>
              <p className="text-[#EEEEEE]/80">
                Idoneidad profesional {BRAND_INFO.licenseId}
              </p>
              <p className="text-[#EEEEEE]/80">{BRAND_INFO.fullAddress}</p>
              <p className="text-[#EEEEEE]/90 break-all">{BRAND_INFO.email}</p>
              <p className="text-[#EEEEEE]/90 tabular-nums">
                {BRAND_INFO.phoneDisplay}
              </p>
            </div>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
