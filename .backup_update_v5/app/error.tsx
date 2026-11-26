'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 bg-[#080808] text-[#FFFFFF]">
        <div className="max-w-xl w-full border border-[#D99A19]/40 bg-[#171717] p-8 sm:p-12 space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F2C45D]">
            Atención técnica
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
            Ha ocurrido un inconveniente inesperado
          </h1>
          <div className="w-16 h-[2px] bg-[#D99A19] mx-auto" aria-hidden="true" />
          <p className="text-sm sm:text-base text-[#EEEEEE]/85 leading-relaxed">
            No pudimos completar la carga de esta vista en este momento. Puede
            intentar recargar la página o volver al inicio para continuar con su
            consulta jurídica.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold hover:bg-[#F2C45D] hover:text-[#080808] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Reintentar</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#555555] text-[#EEEEEE] text-sm font-semibold hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Ir al inicio</span>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
