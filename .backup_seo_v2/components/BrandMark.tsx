'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Scale } from 'lucide-react';
import logoCrestLight from '@/src/assets/images/logo_crest_light_1795570972545.jpg';
import logoCrestDark from '@/src/assets/images/logo_crest_dark_1795570973648.jpg';
import { BRAND_INFO } from '@/lib/legal-data';

interface BrandMarkProps {
  variant: 'light' | 'dark';
  showSlogan?: boolean;
}

export function BrandMark({ variant, showSlogan = false }: BrandMarkProps) {
  const [imgError, setImgError] = useState(false);
  const isDark = variant === 'dark';
  const crestSrc = isDark ? logoCrestDark : logoCrestLight;

  return (
    <div className="inline-flex items-center gap-3 shrink-0">
      <div
        className={`relative w-11 h-11 md:w-12 md:h-12 shrink-0 flex items-center justify-center overflow-hidden ${
          isDark ? 'bg-[#080808]' : 'bg-[#FFFFFF]'
        }`}
      >
        {!imgError ? (
          <Image
            src={crestSrc}
            alt="Emblema dorado con media luna y Dama de la Justicia de CleyLawyerlegal"
            fill
            sizes="48px"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`object-contain scale-125 ${
              isDark ? 'mix-blend-lighten' : 'mix-blend-multiply'
            }`}
          />
        ) : (
          <div className="w-full h-full border border-[#D99A19] flex items-center justify-center">
            <Scale className="w-6 h-6 text-[#D99A19]" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span
          className={`font-serif text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap ${
            isDark ? 'text-[#FFFFFF]' : 'text-[#080808]'
          }`}
        >
          {BRAND_INFO.name}
        </span>
        {showSlogan && (
          <span className="text-xs md:text-sm text-[#F2C45D] tracking-wide mt-0.5 whitespace-nowrap">
            {BRAND_INFO.slogan}
          </span>
        )}
      </div>
    </div>
  );
}
