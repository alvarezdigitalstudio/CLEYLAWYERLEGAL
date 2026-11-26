'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Scale } from 'lucide-react';
import aboutLegalOffice from '@/src/assets/images/about_legal_office_1795570974092.jpg';
import { FIRM_PILLARS } from '@/lib/legal-data';

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
            <div className="relative h-full min-h-[320px] sm:min-h-[400px] border border-[#D99A19]/40 p-2 bg-[#FFFFFF]">
              <div className="relative w-full h-full min-h-[304px] sm:min-h-[384px] overflow-hidden bg-[#171717]">
                {!imgError ? (
                  <Image
                    src={aboutLegalOffice}
                    alt="Despacho jurídico con libros de derecho, balanza dorada y mazo judicial"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#FFFFFF]">
                    <Scale className="w-12 h-12 text-[#D99A19] mb-3" aria-hidden="true" />
                    <span className="font-serif text-lg">Sobre CleyLawyerlegal</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Text right */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
              Sobre CleyLawyerlegal
            </h2>

            <div className="w-16 h-[2px] bg-[#D99A19] my-5" aria-hidden="true" />

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              Somos un equipo legal comprometido con la defensa de sus derechos y
              la búsqueda de soluciones efectivas. Nuestro objetivo es brindarle
              un servicio jurídico de excelencia, con ética, profesionalismo y
              atención personalizada.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                aria-controls="firm-methodology-panel"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#080808] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#D99A19] transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>{expanded ? 'Ocultar detalles' : 'Conoce más'}</span>
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
