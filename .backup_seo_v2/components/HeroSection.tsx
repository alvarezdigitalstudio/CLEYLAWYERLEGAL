'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Scale } from 'lucide-react';
import heroLadyJustice from '@/src/assets/images/hero_lady_justice_1795570972279.jpg';
import { BRAND_INFO } from '@/lib/legal-data';

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="inicio"
      className="relative bg-[#080808] text-[#FFFFFF] overflow-hidden"
    >
      {/* Subtle atmospheric gold radial accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(217,154,25,0.14),transparent_58%)] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-28 md:pt-16 md:pb-32 lg:pt-20 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: editorial copy */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5 z-10"
          >
            <h1 className="font-serif text-[clamp(2.25rem,4.5vw,4.15rem)] font-bold leading-[1.08] tracking-tight text-[#FFFFFF] text-balance">
              {BRAND_INFO.name}
            </h1>

            <div className="w-20 h-[2px] bg-[#D99A19]" aria-hidden="true" />

            <p className="font-serif text-xl sm:text-2xl text-[#F2C45D] tracking-wide">
              {BRAND_INFO.slogan}
            </p>

            <p className="text-base sm:text-lg text-[#EEEEEE]/90 max-w-xl leading-relaxed">
              {BRAND_INFO.primaryMessage}. {BRAND_INFO.secondaryMessage}.{' '}
              {BRAND_INFO.lawyerName} · Idoneidad {BRAND_INFO.licenseId}.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#D99A19] text-[#FFFFFF] font-semibold text-sm tracking-wide hover:bg-[#F2C45D] hover:text-[#080808] transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Contáctanos</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <Link
                href="/derecho-penal?from=servicios"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-[#555555] text-[#EEEEEE] text-sm font-medium hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors duration-200 whitespace-nowrap"
              >
                Defensa Penal y Cumplimiento
              </Link>
            </div>
          </motion.div>

          {/* Right column: Lady Justice sculpture */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] w-full max-w-xl mx-auto overflow-hidden">
              {!imgError ? (
                <Image
                  src={heroLadyJustice}
                  alt="Estatua dorada y bronce de la Dama de la Justicia sosteniendo una balanza sobre fondo oscuro"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="object-cover object-center mix-blend-lighten [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_96%)]"
                />
              ) : (
                <div className="w-full h-full bg-[#171717] border border-[#D99A19]/40 flex flex-col items-center justify-center p-8 text-center">
                  <Scale className="w-14 h-14 text-[#D99A19] mb-4" aria-hidden="true" />
                  <p className="font-serif text-xl text-[#F2C45D]">
                    {BRAND_INFO.name}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Curved gold and white lower architectural border */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 w-full leading-none pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="w-full h-14 sm:h-20 md:h-24 block"
        >
          <path
            d="M0,44 C380,108 1060,-8 1440,56 L1440,110 L0,110 Z"
            fill="#D99A19"
            opacity="0.35"
          />
          <path
            d="M0,62 C400,116 1050,6 1440,68 L1440,110 L0,110 Z"
            fill="#F2C45D"
            opacity="0.6"
          />
          <path
            d="M0,74 C410,120 1050,18 1440,78 L1440,110 L0,110 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
