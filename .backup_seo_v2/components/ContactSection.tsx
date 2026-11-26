'use client';

import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { BRAND_INFO } from '@/lib/legal-data';
import { ConsultationForm } from './ConsultationForm';
import { SocialIconsPending } from './SocialIconsPending';

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="bg-[#FFFFFF] py-16 md:py-24 border-t border-[#EEEEEE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Contact info panel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
                ESTAMOS PARA ESCUCHAR SU CONSULTA.
              </h2>
              <div
                className="w-16 h-[2px] bg-[#D99A19] mt-5"
                aria-hidden="true"
              />
              <p className="mt-4 text-base text-[#555555] leading-relaxed">
                Cada situación jurídica merece atención y análisis profesional.
              </p>
            </div>

            <div className="bg-[#EEEEEE]/50 border border-[#EEEEEE] p-6 sm:p-8 space-y-5">
              <div className="border-b border-[#555555]/15 pb-4">
                <p className="font-serif text-lg font-semibold text-[#080808]">
                  {BRAND_INFO.lawyerName}
                </p>
                <p className="text-sm text-[#555555]">
                  {BRAND_INFO.profession} · Idoneidad {BRAND_INFO.licenseId}
                </p>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone
                  className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                    WhatsApp y Teléfono
                  </p>
                  <a
                    href={BRAND_INFO.phoneHref}
                    className="text-base font-medium text-[#080808] hover:text-[#D99A19] transition-colors tabular-nums"
                  >
                    {BRAND_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail
                  className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                    Correo profesional
                  </p>
                  <a
                    href={BRAND_INFO.emailHref}
                    className="text-base font-medium text-[#080808] hover:text-[#D99A19] transition-colors break-all"
                  >
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin
                  className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                    Dirección profesional
                  </p>
                  <p className="text-sm font-medium text-[#080808] leading-relaxed">
                    <span>{BRAND_INFO.address}, </span>
                    <span className="block">{BRAND_INFO.cityRegionCountry}</span>
                  </p>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-3 border-t border-[#555555]/15 grid grid-cols-2 gap-2.5">
                <a
                  href={BRAND_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#080808] text-[#FFFFFF] text-xs font-semibold hover:bg-[#D99A19] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Llamar</span>
                </a>
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#D99A19] text-[#FFFFFF] text-xs font-semibold hover:bg-[#080808] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={BRAND_INFO.emailHref}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 border border-[#080808] bg-[#FFFFFF] text-[#080808] text-xs font-semibold hover:bg-[#080808] hover:text-[#FFFFFF] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Enviar correo</span>
                </a>
                <a
                  href={BRAND_INFO.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 border border-[#080808] bg-[#FFFFFF] text-[#080808] text-xs font-semibold hover:bg-[#080808] hover:text-[#FFFFFF] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Cómo llegar</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>

              <div className="pt-3 border-t border-[#555555]/15 flex items-center justify-between gap-4">
                <span className="text-xs text-[#555555]">
                  Redes sociales (enlaces pendientes):
                </span>
                <SocialIconsPending size="md" />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <ShieldCheck
                  className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs text-[#555555] leading-relaxed">
                  Tratamiento de datos conforme a la Ley 81 de 2019 y el Decreto
                  Ejecutivo 285 de 2021 de la República de Panamá.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive form */}
          <div className="lg:col-span-7 border border-[#EEEEEE] bg-[#FFFFFF] p-6 sm:p-10">
            <h3 className="font-serif text-2xl font-semibold text-[#080808]">
              Envíenos su consulta
            </h3>
            <p className="mt-2 text-sm text-[#555555] mb-6">
              Complete los datos para preparar su atención por WhatsApp o correo
              profesional.
            </p>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
