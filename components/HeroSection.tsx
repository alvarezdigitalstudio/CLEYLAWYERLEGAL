'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '@/lib/legal-data';

const HERO_VIDEO_SRC = '/assets/herocley.mp4';
const HERO_POSTER_SRC = '/assets/herocley-poster.jpg';

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = true;
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Fallback visual uses poster frame when mobile browser restricts autoplay
      });
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative bg-[#080808] text-[#FFFFFF] overflow-hidden"
    >
      {/* Background 16:9 Hero Video */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden bg-[#080808]"
      >
        {!videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-[center_20%] lg:object-[center_18%]"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={HERO_POSTER_SRC}
            onError={() => setVideoError(true)}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HERO_POSTER_SRC}
            alt="Estatua dorada de la Dama de la Justicia sosteniendo una balanza sobre fondo oscuro"
            fill
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-[center_20%] lg:object-[center_18%]"
          />
        )}

        {/* Readability scrim preserving text contrast without obscuring the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/45 to-[#080808]/20 lg:bg-gradient-to-r lg:from-[#080808]/85 lg:via-[#080808]/35 lg:to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-28 md:pt-16 md:pb-32 lg:pt-20 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: editorial copy */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5 z-10"
          >
            <h1 className="font-serif text-[clamp(2.25rem,4.5vw,4.15rem)] font-bold leading-[1.08] tracking-tight text-[#FFFFFF] text-balance">
              {BRAND_INFO.slogan}
            </h1>

            <div className="w-20 h-[2px] bg-[#D99A19]" aria-hidden="true" />

            <p className="text-base sm:text-lg text-[#EEEEEE]/90 max-w-xl leading-relaxed">
              Asesoría y representación legal con rigor, ética y discreción.{' '}
              {BRAND_INFO.secondaryMessage}. {BRAND_INFO.lawyerName} · Idoneidad{' '}
              {BRAND_INFO.licenseId}.
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
                Soluciones Jurídicas Integrales
              </Link>
            </div>
          </motion.div>

          {/* Right column: preserved visual framing space over background video */}
          <div
            aria-hidden="true"
            className="lg:col-span-6 relative pointer-events-none"
          >
            <div className="aspect-video lg:aspect-[4/3] w-full max-w-xl mx-auto" />
          </div>
        </div>
      </div>

      {/* Curved gold and white lower architectural border */}
      <div
        aria-hidden="true"
        className="relative z-10 -mt-14 sm:-mt-20 md:-mt-24 w-full leading-none pointer-events-none"
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
