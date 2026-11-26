import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Scale,
} from 'lucide-react';
import {
  BRAND_INFO,
  getRelatedPracticeAreas,
  type PracticeAreaDetail,
} from '@/lib/legal-data';
import { PRACTICE_AREA_IMAGES } from '@/lib/practice-images';
import { buildPracticeAreaJsonLdGraph } from '@/lib/seo-config';
import { BrandLogo } from './BrandLogo';
import { DynamicBackButton } from './DynamicBackButton';
import { PracticeAreaViewTracker } from './PracticeAreaViewTracker';
import { ReadingProgressBar } from './ReadingProgressBar';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { TrackedActionLink } from './TrackedActionLink';
import { WhatsAppConsultationForm } from './WhatsAppConsultationForm';

interface PracticeAreaTemplateProps {
  area: PracticeAreaDetail;
  siteUrl: string;
}

export function PracticeAreaTemplate({
  area,
  siteUrl,
}: PracticeAreaTemplateProps) {
  const areaImage = PRACTICE_AREA_IMAGES[area.slug];
  const relatedAreas = getRelatedPracticeAreas(area);
  const jsonLd = buildPracticeAreaJsonLdGraph(area, siteUrl, areaImage?.src);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <PracticeAreaViewTracker slug={area.slug} serviceArea={area.name} />
      <ReadingProgressBar />
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pb-24">
        {/* Visual Hero Header */}
        <section className="bg-[#080808] text-[#FFFFFF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-12 md:pb-20">
            {/* Breadcrumbs */}
            <nav
              aria-label="Migas de pan"
              className="flex flex-wrap items-center gap-2 text-xs text-[#EEEEEE]/80 mb-8"
            >
              <Link href="/" className="hover:text-[#F2C45D] transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <Link
                href="/areas-de-practica"
                className="hover:text-[#F2C45D] transition-colors"
              >
                Áreas de práctica
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span className="text-[#F2C45D] font-medium">{area.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#F2C45D] tabular-nums">
                  {area.number} · {area.family}
                </p>

                <h1 className="font-serif text-[clamp(2rem,3.8vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-[#FFFFFF] text-balance">
                  {area.heroTitle}
                </h1>

                <div className="w-20 h-[2px] bg-[#D99A19]" aria-hidden="true" />

                <p className="font-serif text-lg sm:text-xl text-[#F2C45D]">
                  {area.name} — {BRAND_INFO.lawyerName}
                </p>

                <p className="text-base sm:text-lg text-[#EEEEEE]/90 leading-relaxed max-w-2xl">
                  {area.introDescription}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#whatsapp-consulta"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#F2C45D] hover:text-[#080808] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                  <Link
                    href="/areas-de-practica"
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#555555] text-[#EEEEEE] text-sm font-medium hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors whitespace-nowrap"
                  >
                    <span>Todas las áreas</span>
                  </Link>
                </div>
              </div>

              {/* Vertical 3:4 Image */}
              <div className="lg:col-span-5">
                <div className="max-w-sm mx-auto border border-[#D99A19]/40 p-2 bg-[#171717]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#080808]">
                    {areaImage ? (
                      <Image
                        src={areaImage}
                        alt={area.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 380px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <BrandLogo variant="dark" iconOnly size="md" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Quick Timeline Navigation */}
        <nav
          aria-label="Secciones de esta área jurídica"
          className="bg-[#EEEEEE] border-b border-[#555555]/15"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-[#171717]">
            <a href="#detalle-servicio" className="hover:text-[#D99A19] transition-colors">
              Alcance jurídico
            </a>
            <a href="#situaciones" className="hover:text-[#D99A19] transition-colors">
              Cuándo consultar
            </a>
            <a href="#servicios-ofrecidos" className="hover:text-[#D99A19] transition-colors">
              Servicios concretos
            </a>
            <a href="#preguntas-frecuentes" className="hover:text-[#D99A19] transition-colors">
              Preguntas frecuentes
            </a>
            <a href="#whatsapp-consulta" className="hover:text-[#D99A19] transition-colors font-semibold text-[#080808]">
              Formulario WhatsApp
            </a>
          </div>
        </nav>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 columns: Editorial Legal Guide */}
          <div className="lg:col-span-7 space-y-14">
            {/* Detailed explanation */}
            <section id="detalle-servicio" className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#080808]">
                Enfoque jurídico en {area.name}
              </h2>
              <div className="w-16 h-[2px] bg-[#D99A19]" aria-hidden="true" />
              <p className="text-base text-[#171717] leading-relaxed">
                {area.detailedExplanation}
              </p>
            </section>

            {/* Situations */}
            <section id="situaciones" className="space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#080808]">
                Situaciones en las que puede requerir asistencia
              </h2>
              <div className="w-16 h-[2px] bg-[#D99A19]" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-3">
                {area.situations.map((situation) => (
                  <div
                    key={situation}
                    className="border border-[#EEEEEE] bg-[#EEEEEE]/35 p-4 flex items-start gap-3 text-sm sm:text-base text-[#171717]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 w-2 h-2 bg-[#D99A19] shrink-0"
                    />
                    <span>{situation}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Concrete Services Offered */}
            <section id="servicios-ofrecidos" className="space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#080808]">
                Servicios que atendemos en esta área
              </h2>
              <div className="w-16 h-[2px] bg-[#D99A19]" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {area.services.map((srv, idx) => (
                  <div
                    key={srv}
                    className="border border-[#EEEEEE] bg-[#FFFFFF] p-5 space-y-1.5 hover:border-[#D99A19] transition-colors"
                  >
                    <span className="text-xs font-semibold text-[#555555] tabular-nums">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-[#080808]">
                      {srv}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Importance of legal counsel */}
            <section className="bg-[#080808] text-[#FFFFFF] p-7 sm:p-9 space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-[#F2C45D]">
                Importancia de contar con asesoría jurídica oportuna
              </h2>
              <p className="text-sm sm:text-base text-[#EEEEEE]/90 leading-relaxed">
                {area.importance}
              </p>
              <p className="text-xs text-[#EEEEEE]/70">
                Cada caso requiere evaluación individual conforme a los hechos,
                pruebas y normativa vigente en la República de Panamá.
              </p>
            </section>

            {/* FAQs */}
            <section id="preguntas-frecuentes" className="space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#080808]">
                Preguntas frecuentes
              </h2>
              <div className="w-16 h-[2px] bg-[#D99A19]" aria-hidden="true" />
              <div className="space-y-4">
                {area.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border border-[#EEEEEE] bg-[#FFFFFF] p-5 open:border-[#D99A19]"
                  >
                    <summary className="font-serif text-lg font-semibold text-[#080808] cursor-pointer list-none flex items-center justify-between gap-4">
                      <span>{faq.question}</span>
                      <span
                        aria-hidden="true"
                        className="text-[#D99A19] font-sans text-xl leading-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#EEEEEE] text-sm sm:text-base text-[#555555] leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Right 5 columns: WhatsApp Consultation Form & Office Info */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <section id="whatsapp-consulta">
              <WhatsAppConsultationForm serviceName={area.name} />
            </section>

            {/* Direct Contact & Location Card */}
            <div className="bg-[#080808] text-[#FFFFFF] p-6 sm:p-8 space-y-5">
              <div className="space-y-3">
                <BrandLogo variant="dark" size="sm" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#F2C45D]">
                    Atención directa
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-semibold text-[#FFFFFF]">
                    {BRAND_INFO.lawyerName}
                  </h2>
                  <p className="text-xs text-[#EEEEEE]/80 mt-0.5">
                    {BRAND_INFO.profession} · Idoneidad {BRAND_INFO.licenseId}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-[#EEEEEE]/90 border-t border-[#171717] pt-4">
                <TrackedActionLink
                  href={BRAND_INFO.phoneHref}
                  eventName="phone_click"
                  eventParams={{
                    channel: 'phone',
                    location: 'practice_area_sidebar',
                    service_area: area.name,
                  }}
                  className="flex items-center gap-2.5 hover:text-[#F2C45D] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D99A19] shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{BRAND_INFO.phoneDisplay}</span>
                </TrackedActionLink>
                <TrackedActionLink
                  href={BRAND_INFO.emailHref}
                  eventName="email_click"
                  eventParams={{
                    channel: 'email',
                    location: 'practice_area_sidebar',
                    service_area: area.name,
                  }}
                  className="flex items-center gap-2.5 hover:text-[#F2C45D] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#D99A19] shrink-0" aria-hidden="true" />
                  <span>{BRAND_INFO.email}</span>
                </TrackedActionLink>
                <p className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-[#D99A19] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{BRAND_INFO.fullAddress}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <TrackedActionLink
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventParams={{
                    channel: 'whatsapp',
                    location: 'practice_area_sidebar',
                    service_area: area.name,
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D99A19] text-[#FFFFFF] text-xs font-semibold hover:bg-[#F2C45D] hover:text-[#080808] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp directo</span>
                </TrackedActionLink>
                <a
                  href={BRAND_INFO.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#555555] text-[#EEEEEE] text-xs font-semibold hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Cómo llegar</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Practice Areas */}
        <section className="bg-[#EEEEEE]/50 border-t border-[#EEEEEE] py-14 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#080808]">
                  Áreas jurídicas relacionadas
                </h2>
                <div
                  className="w-16 h-[2px] bg-[#D99A19] mt-3"
                  aria-hidden="true"
                />
              </div>
              <Link
                href="/areas-de-practica"
                className="text-sm font-semibold text-[#080808] hover:text-[#D99A19] inline-flex items-center gap-1.5"
              >
                <span>Ver las 17 áreas</span>
                <ArrowRight className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedAreas.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}?from=areas`}
                  className="bg-[#FFFFFF] border border-[#EEEEEE] p-6 flex flex-col justify-between hover:border-[#D99A19] transition-colors"
                >
                  <div>
                    <span className="text-xs font-semibold text-[#555555] tabular-nums">
                      {rel.number} · {rel.family}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-semibold text-[#080808]">
                      {rel.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#555555] line-clamp-3">
                      {rel.introDescription}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#EEEEEE] inline-flex items-center gap-2 text-sm font-semibold text-[#080808]">
                    <span>Explorar área</span>
                    <ArrowRight className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <Suspense fallback={null}>
        <DynamicBackButton />
      </Suspense>
    </div>
  );
}
