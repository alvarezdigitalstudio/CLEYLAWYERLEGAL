'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  PRACTICE_AREAS_17,
  PRACTICE_FAMILIES,
  type PracticeFamily,
} from '@/lib/legal-data';
import { PRACTICE_AREA_IMAGES } from '@/lib/practice-images';
import { filterPracticeAreasByFamily } from '@/lib/legal-logic';

export function PracticeAreasSection() {
  const [activeFamily, setActiveFamily] = useState<PracticeFamily>('Todas');

  const filteredAreas = filterPracticeAreasByFamily(
    PRACTICE_AREAS_17,
    activeFamily,
  );

  return (
    <section
      id="areas-de-practica"
      className="bg-[#FFFFFF] py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
              17 Áreas Jurídicas de Práctica
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#555555]">
              Seleccione cualquier área para abrir su guía completa, preguntas
              frecuentes y consulta directa por WhatsApp.
            </p>
            <div
              className="w-16 h-[2px] bg-[#D99A19] mt-5"
              aria-hidden="true"
            />
          </div>

          <div
            role="tablist"
            aria-label="Filtrar áreas de práctica por familia jurídica"
            className="flex flex-wrap items-center gap-2 bg-[#EEEEEE] p-1.5"
          >
            {PRACTICE_FAMILIES.map((family) => {
              const isSelected = activeFamily === family;
              return (
                <button
                  key={family}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFamily(family)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#080808] text-[#FFFFFF]'
                      : 'text-[#171717] hover:text-[#080808] hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-testid="practice-areas-grid"
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAreas.map((area) => {
            const areaImg = PRACTICE_AREA_IMAGES[area.slug];
            return (
              <Link
                key={area.slug}
                href={`/${area.slug}?from=areas`}
                className="group border border-[#EEEEEE] bg-[#FFFFFF] flex flex-col justify-between transition-colors duration-200 hover:border-[#D99A19]"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#171717]">
                    {areaImg && (
                      <Image
                        src={areaImg}
                        alt={area.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#080808]/65 via-transparent to-transparent"
                    />
                    <span className="absolute bottom-3 left-4 text-xs font-semibold tracking-widest text-[#F2C45D] tabular-nums">
                      {area.number} · {area.family}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-[#080808] group-hover:text-[#171717]">
                      {area.name}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#555555] leading-relaxed line-clamp-3">
                      {area.introDescription}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-[#EEEEEE] pt-4 text-sm text-[#171717]">
                      {area.services.slice(0, 3).map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-1.5 bg-[#D99A19] shrink-0"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[#EEEEEE] flex items-center justify-between text-sm font-semibold text-[#080808] group-hover:text-[#D99A19] transition-colors">
                  <span>Ver área completa</span>
                  <ArrowRight
                    className="w-4 h-4 text-[#D99A19]"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
