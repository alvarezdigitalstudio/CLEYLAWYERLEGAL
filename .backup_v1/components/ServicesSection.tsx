'use client';

import { ArrowRight, FileText, Handshake, Scale, Users } from 'lucide-react';
import { SERVICES, type ServiceItem } from '@/lib/legal-data';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

const SERVICE_ICONS: Record<ServiceItem['iconName'], typeof Scale> = {
  Scales: Scale,
  Document: FileText,
  People: Users,
  Handshake: Handshake,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="servicios" className="bg-[#FFFFFF] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#080808] text-balance">
            Nuestros Servicios
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#555555]">
            Soluciones jurídicas a su medida
          </p>
          <div
            className="w-16 h-[2px] bg-[#D99A19] mx-auto mt-5"
            aria-hidden="true"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.iconName];
            return (
              <article
                key={service.id}
                className="bg-[#FFFFFF] border border-[#EEEEEE] p-7 flex flex-col justify-between transition-colors duration-200 hover:border-[#D99A19]"
              >
                <div>
                  <div className="w-12 h-12 border border-[#D99A19]/40 bg-[#EEEEEE]/50 flex items-center justify-center text-[#D99A19]">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-[#080808]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium text-[#171717] leading-relaxed">
                    {service.description}
                  </p>
                  <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                    {service.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EEEEEE]">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#080808] hover:text-[#D99A19] transition-colors cursor-pointer"
                  >
                    <span>Solicitar orientación</span>
                    <ArrowRight className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
