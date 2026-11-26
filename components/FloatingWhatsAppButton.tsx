'use client';

import { motion, useReducedMotion } from 'motion/react';
import { trackSxoEvent } from '@/lib/analytics';
import { BRAND_INFO } from '@/lib/legal-data';
import { buildFloatingWhatsAppHref } from '@/lib/whatsapp';

function WhatsAppOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3.5 20.5L5.99 16.96A8.5 8.5 0 1 1 9.32 19.38Z" />
      <path d="M9.6 8.3C9.3 8.3 8.9 8.6 8.8 9C8.6 9.9 9 11.4 10.6 13C12.2 14.6 13.7 15 14.6 14.8C15 14.7 15.3 14.3 15.3 14V13C15.3 12.7 15.1 12.4 14.8 12.3L13.6 11.9C13.3 11.8 13 11.9 12.8 12.2L12.5 12.6C11.7 12.2 11.4 11.9 11 11.1L11.4 10.8C11.7 10.6 11.8 10.3 11.7 10L11.3 8.8C11.2 8.5 10.9 8.3 10.6 8.3Z" />
    </svg>
  );
}

export function FloatingWhatsAppButton() {
  const prefersReducedMotion = useReducedMotion();
  const whatsappHref = buildFloatingWhatsAppHref(BRAND_INFO.whatsappUrl);

  if (!whatsappHref) {
    return null;
  }

  return (
    <div
      data-testid="floating-whatsapp-wrapper"
      style={{
        transform:
          'translate3d(0, calc(-1 * var(--cley-cookie-mobile-offset, 0px)), 0)',
      }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 sm:!transform-none z-30 transition-transform duration-200 ease-out"
    >
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contáctanos por WhatsApp"
        onClick={() =>
          trackSxoEvent('whatsapp_click', {
            channel: 'whatsapp',
            location: 'floating_button',
          })
        }
        initial={
          prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.94 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-[#080808] text-[#FFFFFF] border border-[#D99A19]/45 shadow-[0_10px_28px_rgba(8,8,8,0.34)] hover:bg-[#171717] hover:border-[#F2C45D] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99A19]"
      >
        <WhatsAppOutlineIcon className="w-6 h-6 text-[#FFFFFF] shrink-0" />

        {/* Desktop-only tooltip */}
        <span
          role="tooltip"
          className="hidden md:block pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#080808] text-[#FFFFFF] text-xs font-medium tracking-wide px-3.5 py-2 border border-[#D99A19]/40 shadow-[0_8px_24px_rgba(8,8,8,0.3)] opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-200"
        >
          Contáctanos por WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
