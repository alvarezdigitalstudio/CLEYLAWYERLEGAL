'use client';

import Image from 'next/image';
import { BRAND_INFO } from '@/lib/legal-data';

export const OFFICIAL_ISOTIPO_SRC =
  '/assets/aistudio/cleylawyerlegal-isotipo-transparente_1__fa77ffc5.png';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md';
  showSlogan?: boolean;
  priority?: boolean;
  iconOnly?: boolean;
}

export function BrandLogo({
  variant = 'light',
  size = 'md',
  showSlogan = false,
  priority = false,
  iconOnly = false,
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const heightClass = isDark
    ? size === 'sm'
      ? 'h-10 sm:h-11'
      : 'h-11 sm:h-12'
    : size === 'sm'
      ? 'h-8 sm:h-9'
      : 'h-9 sm:h-10 md:h-11';
  const containerClass = isDark
    ? `${heightClass} aspect-square shrink-0 flex items-center justify-center bg-[#FFFFFF] rounded-full p-1.5`
    : `${heightClass} w-auto shrink-0 flex items-center bg-transparent`;
  const imageClass = isDark
    ? 'h-full w-full object-contain'
    : 'h-full w-auto object-contain';
  const textClass =
    size === 'sm'
      ? 'font-serif text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap'
      : 'font-serif text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap';

  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0">
      <div className={containerClass}>
        <Image
          src={OFFICIAL_ISOTIPO_SRC}
          alt="Isotipo oficial de CleyLawyerLegal"
          width={470}
          height={430}
          priority={priority}
          sizes="192px"
          referrerPolicy="no-referrer"
          className={imageClass}
        />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`${textClass} ${isDark ? 'text-[#FFFFFF]' : 'text-[#080808]'}`}>
            {BRAND_INFO.name}
          </span>
          {showSlogan && (
            <span className="text-xs md:text-sm text-[#F2C45D] tracking-wide mt-0.5 whitespace-nowrap">
              {BRAND_INFO.slogan}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
