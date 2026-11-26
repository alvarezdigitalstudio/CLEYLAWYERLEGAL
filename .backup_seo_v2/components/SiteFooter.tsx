import Link from 'next/link';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { BRAND_INFO, LEGAL_PAGES_LINKS } from '@/lib/legal-data';
import { BrandMark } from './BrandMark';
import { SocialIconsPending } from './SocialIconsPending';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const footerNav = [
    { label: 'Inicio', href: '/' },
    { label: 'Sobre el abogado', href: '/#nosotros' },
    { label: 'Áreas de práctica', href: '/areas-de-practica' },
    { label: 'Derecho Penal', href: '/derecho-penal' },
    { label: 'Fase de Cumplimiento', href: '/derecho-penal#preguntas-frecuentes' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <footer className="bg-[#080808] text-[#FFFFFF] border-t border-[#D99A19]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#171717]">
          {/* Brand & Professional Identity */}
          <div className="lg:col-span-4 space-y-4">
            <BrandMark variant="dark" showSlogan />
            <div className="pt-2 space-y-1 text-sm text-[#EEEEEE]/90">
              <p className="font-semibold text-[#FFFFFF]">
                {BRAND_INFO.lawyerName}
              </p>
              <p className="text-[#EEEEEE]/80">
                {BRAND_INFO.profession} · Idoneidad profesional{' '}
                {BRAND_INFO.licenseId}
              </p>
              <p className="text-xs text-[#EEEEEE]/70 pt-1 leading-relaxed">
                {BRAND_INFO.primaryMessage}. {BRAND_INFO.secondaryMessage}.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#F2C45D]">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#EEEEEE]/85 hover:text-[#F2C45D] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Compliance Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#F2C45D]">
              Cumplimiento
            </h3>
            <ul className="space-y-2 text-sm">
              {LEGAL_PAGES_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#EEEEEE]/85 hover:text-[#F2C45D] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#F2C45D]">
              Contacto
            </h3>
            <ul className="space-y-2.5 text-sm text-[#EEEEEE]/90">
              <li>
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#F2C45D] transition-colors"
                >
                  <MessageCircle
                    className="w-4 h-4 text-[#D99A19] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="tabular-nums">
                    WhatsApp {BRAND_INFO.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND_INFO.emailHref}
                  className="inline-flex items-center gap-2.5 hover:text-[#F2C45D] transition-colors break-all"
                >
                  <Mail
                    className="w-4 h-4 text-[#D99A19] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{BRAND_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND_INFO.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 hover:text-[#F2C45D] transition-colors"
                >
                  <MapPin
                    className="w-4 h-4 text-[#D99A19] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    {BRAND_INFO.address}, {BRAND_INFO.cityRegionCountry}
                  </span>
                </a>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3">
              <SocialIconsPending size="md" />
              <span className="text-xs text-[#EEEEEE]/60">
                Enlaces pendientes
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEEEEE]/70">
          <p>
            © {currentYear} {BRAND_INFO.name}. Todos los derechos reservados.
          </p>
          <p>{BRAND_INFO.cityRegionCountry}</p>
        </div>
      </div>
    </footer>
  );
}
