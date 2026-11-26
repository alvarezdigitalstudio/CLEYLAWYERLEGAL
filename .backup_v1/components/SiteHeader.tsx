'use client';

import { useState } from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  Youtube,
} from 'lucide-react';
import { BRAND_INFO, NAV_ITEMS } from '@/lib/legal-data';
import { BrandMark } from './BrandMark';

interface SiteHeaderProps {
  onOpenConsultation: () => void;
}

export function SiteHeader({ onOpenConsultation }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const socialLinks = [
    { label: 'Facebook de CleyLawyerlegal', icon: Facebook, href: '#contacto' },
    { label: 'LinkedIn de CleyLawyerlegal', icon: Linkedin, href: '#contacto' },
    { label: 'Instagram de CleyLawyerlegal', icon: Instagram, href: '#contacto' },
    { label: 'YouTube de CleyLawyerlegal', icon: Youtube, href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#EEEEEE]">
      {/* Top utility bar (desktop & tablet) */}
      <div className="hidden md:block bg-[#080808] text-[#FFFFFF] border-b border-[#171717]">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-[#EEEEEE] hover:text-[#F2C45D] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span className="tabular-nums">{BRAND_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="inline-flex items-center gap-2 text-[#EEEEEE] hover:text-[#F2C45D] transition-colors whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span>{BRAND_INFO.email}</span>
            </a>
            <span className="inline-flex items-center gap-2 text-[#EEEEEE] whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span>{BRAND_INFO.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className="p-1.5 text-[#EEEEEE] hover:text-[#F2C45D] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-4 lg:gap-8">
        <a
          href="#inicio"
          aria-label={`${BRAND_INFO.name} — Ir al inicio`}
          className="shrink-0"
        >
          <BrandMark variant="light" />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-6 xl:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#171717] hover:text-[#080808] relative py-1 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#D99A19] hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#171717] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Agenda tu Consulta
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 border border-[#EEEEEE] text-[#080808] hover:border-[#D99A19] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#FFFFFF] border-t border-[#EEEEEE] px-4 py-6 space-y-5"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-base font-medium text-[#080808] hover:bg-[#EEEEEE] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full py-3 px-5 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#171717] transition-colors cursor-pointer"
          >
            Agenda tu Consulta
          </button>

          <div className="pt-4 border-t border-[#EEEEEE] space-y-2 text-xs text-[#555555]">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span className="tabular-nums">{BRAND_INFO.phone}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span>{BRAND_INFO.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span>{BRAND_INFO.location}</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
