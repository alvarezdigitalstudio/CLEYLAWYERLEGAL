import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PracticeAreaDetail } from '@/lib/legal-data';

interface PracticeAreaCardProps {
  area: PracticeAreaDetail;
  image?: StaticImageData;
  ctaLabel?: string;
}

const IMAGE_POSITION_OVERRIDES: Partial<Record<string, string>> = {
  'derecho-penal': 'object-[50%_22%]',
  'derecho-constitucional': 'object-[50%_20%]',
  'derecho-familia': 'object-[50%_20%]',
  'derecho-laboral': 'object-[50%_22%]',
  'derecho-migratorio': 'object-[50%_20%]',
  'formacion-profesional': 'object-[50%_20%]',
};

export function PracticeAreaCard({
  area,
  image,
  ctaLabel = 'Conocer más',
}: PracticeAreaCardProps) {
  const href = `/${area.slug}?from=areas`;
  const objectPosClass = IMAGE_POSITION_OVERRIDES[area.slug] ?? 'object-center';

  return (
    <article className="group border border-[#EEEEEE] bg-[#FFFFFF] rounded-[4px] overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D99A19] hover:shadow-[0_16px_36px_-14px_rgba(8,8,8,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div>
        <Link
          href={href}
          aria-label={`${area.name} — Ver guía completa`}
          className="block relative aspect-[3/4] w-full overflow-hidden bg-[#080808]"
        >
          {image && (
            <Image
              src={image}
              alt={area.imageAlt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              referrerPolicy="no-referrer"
              className={`object-cover ${objectPosClass} transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
            />
          )}

          {/* Subtle dark bottom gradient scrim for guaranteed white-text contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/45 to-transparent pointer-events-none"
          />

          {/* Superimposed large white title at bottom-left */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col items-start gap-2 pointer-events-none">
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#F2C45D] tabular-nums">
              {area.number} · {area.family}
            </span>
            <h3 className="font-serif text-[1.5rem] sm:text-[1.65rem] font-bold leading-[1.15] text-[#FFFFFF] text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {area.name}
            </h3>
            <span
              aria-hidden="true"
              className="w-12 h-[2px] bg-[#D99A19] transition-all duration-300 group-hover:w-20 motion-reduce:transition-none"
            />
          </div>
        </Link>

        <div className="p-6 space-y-4">
          <p className="text-sm text-[#555555] leading-relaxed line-clamp-3">
            {area.introDescription}
          </p>

          <ul className="space-y-1.5 border-t border-[#EEEEEE] pt-4 text-sm text-[#171717]">
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

      <div className="px-6 pb-6 pt-2">
        <Link
          href={href}
          className="inline-flex items-center justify-between gap-3 w-full min-h-[44px] px-5 py-3 bg-[#080808] text-[#FFFFFF] border border-[#D99A19]/80 rounded-[4px] text-sm font-semibold tracking-wide transition-colors duration-200 hover:bg-[#171717] hover:border-[#F2C45D] hover:text-[#F2C45D]"
        >
          <span>{ctaLabel}</span>
          <ArrowRight
            className="w-4 h-4 text-[#D99A19] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
