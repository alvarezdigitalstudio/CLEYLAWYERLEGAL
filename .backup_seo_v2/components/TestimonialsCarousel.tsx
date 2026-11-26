'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Scale } from 'lucide-react';
import { COMMITMENT_CARDS } from '@/lib/legal-data';
import {
  getNextCarouselIndex,
  getPrevCarouselIndex,
} from '@/lib/legal-logic';

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = COMMITMENT_CARDS[activeIndex];
  const total = COMMITMENT_CARDS.length;

  const handlePrev = () => {
    setActiveIndex((prev) => getPrevCarouselIndex(prev, total));
  };

  const handleNext = () => {
    setActiveIndex((prev) => getNextCarouselIndex(prev, total));
  };

  return (
    <section
      id="compromiso-profesional"
      aria-label="Principios de atención jurídica"
      className="bg-[#FFFFFF] py-16 md:py-24 border-t border-[#EEEEEE]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
          Compromiso de Atención Jurídica
        </h2>
        <div
          className="w-16 h-[2px] bg-[#D99A19] mx-auto mt-5"
          aria-hidden="true"
        />

        <div className="mt-10 bg-[#EEEEEE]/50 border border-[#EEEEEE] px-6 py-10 sm:px-12 sm:py-12 relative">
          <div className="flex items-center justify-center">
            <Scale className="w-5 h-5 text-[#D99A19]" aria-hidden="true" />
          </div>

          <div className="mt-6 min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <p className="font-serif text-xl sm:text-2xl text-[#080808] leading-relaxed text-balance">
                  “{current.quote}”
                </p>
                <footer className="text-sm text-[#555555]">
                  <span className="font-semibold text-[#080808]">
                    {current.attribution}
                  </span>
                  <span className="mx-2 text-[#D99A19]" aria-hidden="true">
                    ·
                  </span>
                  <span>{current.context}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Principio anterior"
              className="w-11 h-11 border border-[#555555]/30 bg-[#FFFFFF] text-[#080808] inline-flex items-center justify-center hover:border-[#D99A19] hover:text-[#D99A19] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div
              className="flex items-center gap-2.5"
              role="tablist"
              aria-label="Seleccionar principio de atención"
            >
              {COMMITMENT_CARDS.map((item, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Ver principio ${idx + 1} de ${total}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 transition-all cursor-pointer ${
                      isCurrent
                        ? 'w-8 bg-[#D99A19]'
                        : 'w-2.5 bg-[#555555]/30 hover:bg-[#555555]'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente principio"
              className="w-11 h-11 border border-[#555555]/30 bg-[#FFFFFF] text-[#080808] inline-flex items-center justify-center hover:border-[#D99A19] hover:text-[#D99A19] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
