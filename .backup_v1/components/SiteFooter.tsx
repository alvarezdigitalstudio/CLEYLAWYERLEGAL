import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import { BRAND_INFO, NAV_ITEMS } from '@/lib/legal-data';
import { BrandMark } from './BrandMark';

export function SiteFooter() {
  const socialLinks = [
    { label: 'Facebook de CleyLawyerlegal', icon: Facebook, href: '#contacto' },
    { label: 'LinkedIn de CleyLawyerlegal', icon: Linkedin, href: '#contacto' },
    { label: 'Instagram de CleyLawyerlegal', icon: Instagram, href: '#contacto' },
    { label: 'YouTube de CleyLawyerlegal', icon: Youtube, href: '#contacto' },
  ];

  return (
    <footer className="bg-[#080808] text-[#FFFFFF] border-t border-[#D99A19]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#171717]">
          {/* Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <BrandMark variant="dark" showSlogan />
            <p className="text-sm text-[#EEEEEE]/80 max-w-sm leading-relaxed pt-2">
              Asesoría legal, consultoría jurídica, representación legal y
              resolución de conflictos con ética y rigor profesional en Panamá.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-serif text-base font-semibold text-[#F2C45D]">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#EEEEEE]/85 hover:text-[#F2C45D] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#F2C45D]">
              Contacto
            </h3>
            <ul className="space-y-2.5 text-sm text-[#EEEEEE]/90">
              <li>
                <a
                  href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2.5 hover:text-[#F2C45D] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                  <span className="tabular-nums">{BRAND_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-[#F2C45D] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                  <span>{BRAND_INFO.email}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                <span>{BRAND_INFO.location}</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    className="w-9 h-9 border border-[#171717] bg-[#171717] text-[#EEEEEE] flex items-center justify-center hover:border-[#D99A19] hover:text-[#F2C45D] transition-colors"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEEEEE]/70">
          <p>{BRAND_INFO.copyright}</p>
          <p>{BRAND_INFO.location}</p>
        </div>
      </div>
    </footer>
  );
}
