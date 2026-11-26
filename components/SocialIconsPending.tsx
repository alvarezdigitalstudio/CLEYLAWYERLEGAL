import { Facebook, Instagram } from 'lucide-react';
import { BRAND_INFO, SOCIAL_LINKS } from '@/lib/legal-data';

interface SocialIconsPendingProps {
  size?: 'sm' | 'md';
  includeWhatsApp?: boolean;
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.76 14.08c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.14.11-1.84-.11-.43-.14-.98-.32-1.69-.63-2.98-1.29-4.92-4.29-5.07-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.83 2.04.9 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.16 1.4Z" />
    </svg>
  );
}

export function SocialIconsPending({
  size = 'sm',
  includeWhatsApp = false,
}: SocialIconsPendingProps) {
  const boxClass =
    size === 'sm'
      ? 'w-7 h-7 border border-[#EEEEEE]'
      : 'w-9 h-9 border border-[#555555]/25';
  const iconClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const linkClass = `${boxClass} bg-[#FFFFFF] text-[#080808] hover:border-[#D99A19] hover:text-[#D99A19] transition-colors inline-flex items-center justify-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99A19]`;

  return (
    <div
      className="inline-flex items-center gap-2.5 shrink-0"
      aria-label={
        includeWhatsApp
          ? 'Redes sociales y contacto directo por WhatsApp de CleyLawyerLegal'
          : 'Redes sociales oficiales de CleyLawyerLegal'
      }
    >
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          title={`${social.name} — ${social.handle}`}
          className={linkClass}
        >
          {social.id === 'instagram' && (
            <Instagram className={iconClass} aria-hidden="true" />
          )}
          {social.id === 'facebook' && (
            <Facebook className={iconClass} aria-hidden="true" />
          )}
          {social.id === 'tiktok' && <TikTokIcon className={iconClass} />}
        </a>
      ))}

      {includeWhatsApp && (
        <a
          href={BRAND_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp oficial de ${BRAND_INFO.name} (${BRAND_INFO.phoneDisplay})`}
          title={`WhatsApp — ${BRAND_INFO.phoneDisplay}`}
          className={linkClass}
        >
          <WhatsAppIcon className={iconClass} />
        </a>
      )}
    </div>
  );
}

export function HeaderSocialStrip() {
  const stripLinkClass =
    'w-9 sm:w-10 h-full inline-flex items-center justify-center text-[#FFFFFF] hover:text-[#F2C45D] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D99A19]';
  const iconClass = 'w-3.5 h-3.5 sm:w-4 sm:h-4';

  return (
    <div
      data-testid="header-social-strip"
      className="w-full bg-[#000000] border-b border-[#D99A19]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 sm:h-9 flex items-center justify-end">
        <div
          className="inline-flex items-center h-full shrink-0"
          role="group"
          aria-label="Accesos directos a redes sociales y WhatsApp de CleyLawyerLegal"
        >
          {SOCIAL_LINKS.map((social) => (
            <div key={social.id} className="inline-flex items-center h-full">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                title={`${social.name} — ${social.handle}`}
                className={stripLinkClass}
              >
                {social.id === 'instagram' && (
                  <Instagram className={iconClass} aria-hidden="true" />
                )}
                {social.id === 'facebook' && (
                  <Facebook className={iconClass} aria-hidden="true" />
                )}
                {social.id === 'tiktok' && <TikTokIcon className={iconClass} />}
              </a>
              <span
                aria-hidden="true"
                className="h-3.5 sm:h-4 w-px bg-[#D99A19] shrink-0"
              />
            </div>
          ))}

          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp oficial de ${BRAND_INFO.name} (${BRAND_INFO.phoneDisplay})`}
            title={`WhatsApp — ${BRAND_INFO.phoneDisplay}`}
            className={stripLinkClass}
          >
            <WhatsAppIcon className={iconClass} />
          </a>
        </div>
      </div>
    </div>
  );
}
