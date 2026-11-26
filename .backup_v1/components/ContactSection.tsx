'use client';

import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '@/lib/legal-data';
import { ConsultationForm } from './ConsultationForm';

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
                Contacto y Atención Jurídica
              </h2>
              <div
                className="w-16 h-[2px] bg-[#D99A19] mt-5"
                aria-hidden="true"
              />
              <p className="mt-4 text-base text-[#555555] leading-relaxed">
                Comuníquese directamente con nuestro despacho en Panamá para
                coordinar una consulta legal personalizada.
              </p>
            </div>

            <div className="bg-[#EEEEEE]/50 border border-[#EEEEEE] p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-3.5">
                <Phone
                  className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                    Teléfono
                  </p>
                  <a
                    href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-base font-medium text-[#080808] hover:text-[#D99A19] transition-colors tabular-nums"
                  >
                    {BRAND_INFO.phone}
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
                    Correo electrónico
                  </p>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="text-base font-medium text-[#080808] hover:text-[#D99A19] transition-colors"
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
                    Ubicación
                  </p>
                  <p className="text-base font-medium text-[#080808]">
                    {BRAND_INFO.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-[#555555]/15">
                <Clock
                  className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                    Horario de atención
                  </p>
                  <p className="text-sm text-[#171717]">
                    Lunes a Viernes · 8:30 a. m. – 5:30 p. m.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <ShieldCheck
                  className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs text-[#555555] leading-relaxed">
                  Toda información compartida mediante este formulario es tratada
                  bajo estricta reserva profesional.
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
              Complete los datos para recibir confirmación y coordinación de cita.
            </p>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
