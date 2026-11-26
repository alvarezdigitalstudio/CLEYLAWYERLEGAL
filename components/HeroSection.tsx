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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);
    return () => mediaQuery.removeEventListener('change', syncMotionPreference);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || prefersReducedMotion || videoError) return;

    videoEl.muted = true;
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        setAutoplayBlocked(true);
      });
    }
  }, [prefersReducedMotion, videoError]);

  const showStaticPoster = videoError || prefersReducedMotion || autoplayBlocked;

  return (
    <section
      id="inicio"
      className="relative bg-[#000000] text-[#FFFFFF] overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-[1440px] lg:aspect-video flex flex-col">
        {/* Editorial copy: stacked cleanly on mobile/tablet; left overlay on desktop 16:9 stage */}
        <div className="relative z-20 px-4 sm:px-6 pt-8 pb-6 md:pt-12 md:pb-8 lg:py-0 lg:inset-0 lg:absolute lg:flex lg:items-center pointer-events-none">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-[52%] xl:w-[50%] space-y-5 pointer-events-auto"
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
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#D99A19] text-[#FFFFFF] rounded-[4px] font-semibold text-sm tracking-wide hover:bg-[#F2C45D] hover:text-[#080808] transition-colors duration-200 whitespace-nowrap cursor-pointer"
                >
                  <span>Contáctanos</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <Link
                  href="/derecho-penal?from=servicios"
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-6 py-3.5 border border-[#555555] text-[#EEEEEE] rounded-[4px] text-sm font-medium hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors duration-200 whitespace-nowrap"
                >
                  Soluciones Jurídicas Integrales
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Single uncropped 16:9 Hero Video / Poster Fallback */}
        <div
          aria-hidden="true"
          className="relative z-0 w-full aspect-video lg:h-full bg-[#000000] overflow-hidden"
        >
          {!showStaticPoster ? (
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-[#000000]"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={HERO_POSTER_SRC}
              onPlaying={() => setAutoplayBlocked(false)}
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
              sizes="(max-width: 1440px) 100vw, 1440px"
              referrerPolicy="no-referrer"
              className="object-contain bg-[#000000]"
            />
          )}

          {/* Readability scrim on desktop left side only */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/45 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Curved gold and white lower architectural border cleanly below the 16:9 video */}
      <div
        aria-hidden="true"
        className="relative z-20 w-full bg-[#000000] leading-none pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="w-full h-6 sm:h-8 md:h-10 lg:h-12 block"
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
