'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

interface ConsultationModalProps {
  isOpen: boolean;
  preselectedService?: string;
  onClose: () => void;
}

export function ConsultationModal({
  isOpen,
  preselectedService,
  onClose,
}: ConsultationModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 bg-[#080808]/75 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#FFFFFF] border border-[#D99A19]/40 max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar formulario de consulta"
          className="absolute top-5 right-5 w-10 h-10 border border-[#EEEEEE] text-[#080808] flex items-center justify-center hover:border-[#D99A19] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="pr-10">
          <h2
            id="consultation-modal-title"
            className="font-serif text-2xl sm:text-3xl font-semibold text-[#080808]"
          >
            Agenda tu Consulta
          </h2>
          <p className="mt-2 text-sm text-[#555555]">
            Complete el formulario y coordinaremos su atención jurídica con
            estricta confidencialidad.
          </p>
          <div className="w-16 h-[2px] bg-[#D99A19] my-5" aria-hidden="true" />
        </div>

        <ConsultationForm
          key={preselectedService || 'default'}
          initialServiceArea={preselectedService}
        />
      </div>
    </div>
  );
}
