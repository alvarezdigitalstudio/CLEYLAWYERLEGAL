import { Facebook, Instagram } from 'lucide-react';

interface SocialIconsPendingProps {
  size?: 'sm' | 'md';
}

export function SocialIconsPending({ size = 'sm' }: SocialIconsPendingProps) {
  const boxClass =
    size === 'sm'
      ? 'w-7 h-7 border border-[#EEEEEE]'
      : 'w-9 h-9 border border-[#555555]/25';
  const iconClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div
      className="inline-flex items-center gap-2.5"
      aria-label="Redes sociales oficiales pendientes de configuración"
    >
      <span
        role="img"
        aria-label="Instagram de CleyLawyerLegal (enlace pendiente)"
        title="Instagram — Enlace oficial pendiente de configuración"
        className={`${boxClass} bg-[#FFFFFF] text-[#080808] inline-flex items-center justify-center shrink-0`}
      >
        <Instagram className={iconClass} aria-hidden="true" />
      </span>
      <span
        role="img"
        aria-label="Facebook de CleyLawyerLegal (enlace pendiente)"
        title="Facebook — Enlace oficial pendiente de configuración"
        className={`${boxClass} bg-[#FFFFFF] text-[#080808] inline-flex items-center justify-center shrink-0`}
      >
        <Facebook className={iconClass} aria-hidden="true" />
      </span>
    </div>
  );
}
