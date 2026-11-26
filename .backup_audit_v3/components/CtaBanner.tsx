'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import ctaLegalLibrary from '@/src/assets/images/cta_legal_library_1795570974803.jpg';

interface CtaBannerProps {
  onScheduleClick: () => void;
}

export function CtaBanner({ onScheduleClick }: CtaBannerProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative bg-[#080808] text-[#FFFFFF] overflow-hidden py-20 md:py-28">
      {/* Legal library atmospheric background */}
      {!imgError && (
        <Image
          src={ctaLegalLibrary}
          alt="Biblioteca jurídica de madera oscura con iluminación cálida"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="object-cover opacity-40"
        />
      )}

      {/* Measured contrast scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#080808]/85 via-[#080808]/75 to-[#080808]/90 pointer-events-none"
      />

      {/* Gold decorative curves (top and bottom) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 block"
        >
          <path
            d="M0,18 Q720,70 1440,14"
            fill="none"
            stroke="#D99A19"
            strokeWidth="2"
            opacity="0.7"
          />
          <path
            d="M0,32 Q720,6 1440,42"
            fill="none"
            stroke="#F2C45D"
            strokeWidth="1"
            opacity="0.45"
          />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 block"
        >
          <path
            d="M0,52 Q720,0 1440,56"
            fill="none"
            stroke="#D99A19"
            strokeWidth="2"
            opacity="0.7"
          />
          <path
            d="M0,36 Q720,64 1440,28"
            fill="none"
            stroke="#F2C45D"
            strokeWidth="1"
            opacity="0.45"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-16 h-[2px] bg-[#D99A19] mx-auto mb-6" aria-hidden="true" />
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FFFFFF] leading-tight text-balance">
          Su tranquilidad legal, nuestra prioridad
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#EEEEEE]/90 max-w-2xl mx-auto">
          Reciba orientación jurídica directa, confidencial y estructurada para
          su caso en Panamá.
        </p>

        <div className="mt-8">
          <button
            type="button"
            onClick={onScheduleClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D99A19] text-[#FFFFFF] text-sm sm:text-base font-semibold tracking-wide hover:bg-[#F2C45D] hover:text-[#080808] transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Agenda tu Consulta</span>
          </button>
        </div>
      </div>
    </section>
  );
}
