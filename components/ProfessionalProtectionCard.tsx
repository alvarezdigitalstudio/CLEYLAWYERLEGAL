'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

export function ProfessionalProtectionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <aside
        aria-labelledby="marco-proteccion-card-title"
        className="bg-[#080808] border border-[#D99A19]/60 rounded-md shadow-[0_12px_32px_rgba(8,8,8,0.12)] p-6 sm:p-8 lg:p-10"
      >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4 max-w-3xl">
          <div
            className="w-10 h-10 rounded-md bg-[#171717] border border-[#D99A19]/40 flex items-center justify-center shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <Scale className="w-5 h-5 text-[#D99A19]" />
          </div>

          <div className="space-y-2.5">
            <h2
              id="marco-proteccion-card-title"
              className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-[#F2C45D]"
            >
              MARCO DE PROTECCIÓN Y RELACIÓN PROFESIONAL
            </h2>
            <p className="text-sm sm:text-base text-[#FFFFFF]/90 leading-relaxed">
              Conoce los principios de confidencialidad, protección de
              información, alcance de la responsabilidad profesional y
              condiciones que regulan el establecimiento formal de la relación
              abogado-cliente con CleyLawyerLegal.
            </p>
          </div>
        </div>

        <div className="shrink-0 pl-14 md:pl-0">
          <Link
            href="/marco-de-proteccion-profesional"
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#F2C45D] hover:text-[#FFFFFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D99A19] transition-colors py-1"
          >
            <span>Leer más</span>
            <span
              aria-hidden="true"
              className="inline-block text-[#D99A19] group-hover:text-[#F2C45D] group-hover:translate-x-1 transition-all duration-200"
            >
              →
            </span>
          </Link>
        </div>
      </div>
      </aside>
    </motion.div>
  );
}
