'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import aboutLegalOffice from '@/src/assets/images/about_legal_office_1795570974092.jpg';
import { BRAND_INFO, FIRM_PILLARS } from '@/lib/legal-data';
import { BrandLogo } from './BrandLogo';

interface AboutSectionProps {
  onScheduleClick: () => void;
}

export function AboutSection({ onScheduleClick }: AboutSectionProps) {
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="nosotros"
      className="bg-[#FFFFFF] py-16 md:py-24 border-t border-[#EEEEEE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Image left */}
          <div className="lg:col-span-6">
            <div className="relative h-full border border-[#D99A19]/40 p-2 bg-[#FFFFFF]">
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[400px] overflow-hidden bg-[#171717]">
                {!imgError ? (
                  <Image
                    src={aboutLegalOffice}
                    alt="Despacho jurídico de CleyLawyerLegal con libros de derecho, balanza dorada y mazo judicial"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#FFFFFF]">
                    <BrandLogo variant="dark" size="md" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Text right */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
              Sobre {BRAND_INFO.name}
            </h2>

            <div className="w-16 h-[2px] bg-[#D99A19] my-5" aria-hidden="true" />

            <p className="text-base sm:text-lg text-[#171717] font-medium leading-relaxed">
              {BRAND_INFO.lawyerName} · {BRAND_INFO.profession} · Idoneidad{' '}
              {BRAND_INFO.licenseId}
            </p>

            <p className="mt-3 text-base text-[#555555] leading-relaxed">
              Egresado de la {BRAND_INFO.education}, con{' '}
              {BRAND_INFO.experience.toLowerCase()}. Nuestra práctica principal
              se orienta al {BRAND_INFO.primaryFocus.toLowerCase()}, brindando
              acompañamiento jurídico ético, discreto y personalizado desde
              David, Chiriquí para todo Panamá.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                aria-controls="firm-methodology-panel"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#080808] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#D99A19] transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>{expanded ? 'Ocultar trayectoria' : 'Conoce más'}</span>
                {expanded ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={onScheduleClick}
                className="inline-flex items-center px-6 py-3 border border-[#080808] text-[#080808] text-sm font-semibold hover:border-[#D99A19] hover:text-[#171717] transition-colors whitespace-nowrap cursor-pointer"
              >
                Agenda tu Consulta
              </button>
            </div>

            {expanded && (
              <div
                id="firm-methodology-panel"
                className="mt-8 pt-6 border-t border-[#EEEEEE] space-y-5"
              >
                {FIRM_PILLARS.map((pillar) => (
                  <div key={pillar.title} className="space-y-1">
                    <h3 className="font-serif text-lg font-semibold text-[#080808]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
