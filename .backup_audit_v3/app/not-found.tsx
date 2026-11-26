import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Página no encontrada | CleyLawyerLegal',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 bg-[#080808] text-[#FFFFFF]">
        <div className="max-w-xl w-full border border-[#D99A19]/40 bg-[#171717] p-8 sm:p-12 space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F2C45D]">
            Error 404
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
            Página no encontrada
          </h1>
          <div className="w-16 h-[2px] bg-[#D99A19] mx-auto" aria-hidden="true" />
          <p className="text-sm sm:text-base text-[#EEEEEE]/85 leading-relaxed">
            La dirección solicitada no está disponible o ha cambiado. Puede
            regresar al inicio, explorar nuestras 17 áreas de práctica o
            contactar directamente con el despacho.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold hover:bg-[#F2C45D] hover:text-[#080808] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Ir al inicio</span>
            </Link>
            <Link
              href="/areas-de-practica"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#555555] text-[#EEEEEE] text-sm font-semibold hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors"
            >
              <span>Ver 17 áreas</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
