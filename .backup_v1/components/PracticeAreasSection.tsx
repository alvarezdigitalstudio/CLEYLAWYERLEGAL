'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  PRACTICE_AREAS,
  PRACTICE_CATEGORIES,
  type PracticeCategory,
} from '@/lib/legal-data';
import { filterPracticeAreas } from '@/lib/legal-logic';

interface PracticeAreasSectionProps {
  onSelectArea: (areaTitle: string) => void;
}

export function PracticeAreasSection({
  onSelectArea,
}: PracticeAreasSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<PracticeCategory>('Todas');

  const filteredAreas = filterPracticeAreas(PRACTICE_AREAS, activeCategory);

  return (
    <section
      id="areas-de-practica"
      className="bg-[#FFFFFF] py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
              Áreas de Práctica
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#555555]">
              Cobertura especializada para personas y empresas en Panamá.
            </p>
            <div
              className="w-16 h-[2px] bg-[#D99A19] mt-5"
              aria-hidden="true"
            />
          </div>

          <div
            role="tablist"
            aria-label="Filtrar áreas de práctica"
            className="flex flex-wrap items-center gap-2 bg-[#EEEEEE] p-1.5"
          >
            {PRACTICE_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#080808] text-[#FFFFFF]'
                      : 'text-[#171717] hover:text-[#080808] hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-testid="practice-areas-grid"
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAreas.map((area) => (
            <article
              key={area.id}
              className="border border-[#EEEEEE] bg-[#FFFFFF] p-7 flex flex-col justify-between transition-colors duration-200 hover:border-[#D99A19]"
            >
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-[#555555]">
                  {area.category}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[#080808]">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                  {area.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-[#EEEEEE] pt-4 text-sm text-[#171717]">
                  {area.scope.map((point) => (
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

              <div className="mt-6 pt-4 border-t border-[#EEEEEE]">
                <button
                  type="button"
                  onClick={() => onSelectArea(area.title)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#080808] hover:text-[#D99A19] transition-colors cursor-pointer"
                >
                  <span>Consultar sobre esta área</span>
                  <ArrowRight className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
