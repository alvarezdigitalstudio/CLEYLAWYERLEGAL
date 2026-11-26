'use client';

import { useState } from 'react';
import {
  PRACTICE_AREAS_17,
  PRACTICE_FAMILIES,
  type PracticeFamily,
} from '@/lib/legal-data';
import { PRACTICE_AREA_IMAGES } from '@/lib/practice-images';
import { filterPracticeAreasByFamily } from '@/lib/legal-logic';
import { PracticeAreaCard } from './PracticeAreaCard';

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
            className="flex flex-wrap items-center gap-2 bg-[#EEEEEE] p-1.5 rounded-[4px]"
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
                  className={`px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-[4px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
          {filteredAreas.map((area) => (
            <PracticeAreaCard
              key={area.slug}
              area={area}
              image={PRACTICE_AREA_IMAGES[area.slug]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
