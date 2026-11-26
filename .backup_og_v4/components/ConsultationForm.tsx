'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ExternalLink,
  Mail,
  MessageCircle,
  ShieldAlert,
} from 'lucide-react';
import { trackSxoEvent } from '@/lib/analytics';
import {
  BRAND_INFO,
  PANAMA_PROVINCES,
  PRACTICE_AREAS_17,
} from '@/lib/legal-data';
import {
  buildMailtoUrl,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  INPUT_LIMITS,
  validateGeneralContactForm,
  type GeneralContactFieldErrors,
  type GeneralContactInput,
} from '@/lib/legal-logic';

interface ConsultationFormProps {
  initialServiceArea?: string;
}

const ALL_SERVICE_OPTIONS = PRACTICE_AREAS_17.map((area) => area.name);

export function ConsultationForm({
  initialServiceArea = 'Derecho Penal y Administrativo',
}: ConsultationFormProps) {
  const formId = useId();
  const isTopicNote = initialServiceArea.startsWith('Consulta sobre:');
  const resolvedService = ALL_SERVICE_OPTIONS.includes(initialServiceArea)
    ? initialServiceArea
    : 'Derecho Penal y Administrativo';

  const [formData, setFormData] = useState<GeneralContactInput>({
    fullName: '',
    email: '',
    phone: '',
    province: 'Chiriquí',
    serviceArea: resolvedService,
    modality: 'Presencial en David, Chiriquí',
    message: isTopicNote ? initialServiceArea : '',
    privacyAccepted: false,
    honeypot: '',
  });
  const [errors, setErrors] = useState<GeneralContactFieldErrors>({});
  const [preparedDispatch, setPreparedDispatch] = useState<{
    whatsappUrl: string;
    mailtoUrl: string;
    preview: string;
  } | null>(null);

  const formStartedRef = useRef(false);

  const handleFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackSxoEvent('contact_form_start', {
      channel: 'general_form',
      location: 'consultation_form',
      service_area: formData.serviceArea,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateGeneralContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedDispatch(null);
      return;
    }

    setErrors({});
    trackSxoEvent('contact_form_submit', {
      channel: 'general_form',
      location: 'consultation_form',
      service_area: formData.serviceArea,
      province: formData.province,
      modality: formData.modality,
    });

    const payload = {
      serviceName: `${formData.serviceArea} (${formData.modality})`,
      fullName: formData.fullName,
      phone: formData.phone,
      province: formData.province,
      message: formData.message,
    };
    setPreparedDispatch({
      whatsappUrl: buildWhatsAppUrl(payload),
      mailtoUrl: buildMailtoUrl({
        ...payload,
        email: BRAND_INFO.email,
      }),
      preview: buildWhatsAppMessage(payload),
    });
  };

  const handleReset = () => {
    setPreparedDispatch(null);
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      province: 'Chiriquí',
      serviceArea: 'Derecho Penal y Administrativo',
      modality: 'Presencial en David, Chiriquí',
      message: '',
      privacyAccepted: false,
      honeypot: '',
    });
  };

  if (preparedDispatch) {
    return (
      <div
        role="region"
        aria-live="polite"
        data-clarity-mask="true"
        className="border border-[#D99A19] bg-[#FFFFFF] p-6 sm:p-8 space-y-5"
      >
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#080808]">
            Consulta validada y lista para enviar
          </h3>
          <p className="mt-2 text-sm text-[#555555] leading-relaxed">
            Por su privacidad, el envío se completa directamente a través de
            nuestro canal oficial de WhatsApp o correo profesional. Su mensaje
            no se considerará recibido hasta que complete el envío.
          </p>
        </div>

        <pre className="whitespace-pre-wrap font-sans text-xs bg-[#EEEEEE]/60 border border-[#EEEEEE] p-4 text-[#171717] leading-relaxed">
          {preparedDispatch.preview}
        </pre>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={preparedDispatch.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackSxoEvent('whatsapp_click', {
                channel: 'whatsapp',
                location: 'consultation_form_handoff',
                service_area: formData.serviceArea,
                province: formData.province,
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold hover:bg-[#080808] transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Enviar por WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <a
            href={preparedDispatch.mailtoUrl}
            onClick={() =>
              trackSxoEvent('email_click', {
                channel: 'email',
                location: 'consultation_form_handoff',
                service_area: formData.serviceArea,
                province: formData.province,
              })
            }
            className="inline-flex items-center gap-2 px-5 py-3 border border-[#080808] text-sm font-semibold text-[#080808] hover:bg-[#080808] hover:text-[#FFFFFF] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
            <span>Enviar por correo</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-3 border border-[#EEEEEE] text-sm font-medium text-[#555555] hover:text-[#080808] hover:border-[#080808] transition-colors cursor-pointer"
          >
            Editar datos
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={handleFormStart}
      noValidate
      data-clarity-mask="true"
      className="space-y-5"
    >
      <div className="bg-[#EEEEEE]/60 border border-[#555555]/20 p-3.5 flex items-start gap-2.5 text-xs text-[#171717] leading-relaxed">
        <ShieldAlert
          className="w-4 h-4 text-[#D99A19] shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <p>
          Por seguridad jurídica, no incluya datos confidenciales, números de
          expediente ni documentos sensibles en este formulario inicial.
        </p>
      </div>

      {/* Anti-spam honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-hp`}>Sitio web</label>
        <input
          id={`${formId}-hp`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Nombre completo
          </label>
          <input
            id={`${formId}-name`}
            name="fullName"
            type="text"
            maxLength={INPUT_LIMITS.fullName}
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            placeholder="Ej. Carlos Mendoza"
            aria-invalid={Boolean(errors.fullName)}
            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] placeholder:text-[#555555]/70 focus:border-[#D99A19]"
          />
          {errors.fullName && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#080808]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D99A19] shrink-0" aria-hidden="true" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Teléfono
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            maxLength={INPUT_LIMITS.phone}
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="+507 6000-0000"
            aria-invalid={Boolean(errors.phone)}
            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] placeholder:text-[#555555]/70 focus:border-[#D99A19]"
          />
          {errors.phone && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#080808]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D99A19] shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Correo electrónico
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            maxLength={INPUT_LIMITS.email}
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="nombre@correo.com"
            aria-invalid={Boolean(errors.email)}
            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] placeholder:text-[#555555]/70 focus:border-[#D99A19]"
          />
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#080808]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D99A19] shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-province`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Provincia
          </label>
          <select
            id={`${formId}-province`}
            name="province"
            value={formData.province}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, province: e.target.value }))
            }
            aria-invalid={Boolean(errors.province)}
            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] focus:border-[#D99A19]"
          >
            {PANAMA_PROVINCES.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#080808]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D99A19] shrink-0" aria-hidden="true" />
              <span>{errors.province}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${formId}-service`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Área jurídica de interés
          </label>
          <select
            id={`${formId}-service`}
            name="serviceArea"
            value={formData.serviceArea}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, serviceArea: e.target.value }))
            }
            aria-invalid={Boolean(errors.serviceArea)}
            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] focus:border-[#D99A19]"
          >
            {ALL_SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${formId}-modality`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Modalidad de atención
          </label>
          <select
            id={`${formId}-modality`}
            name="modality"
            value={formData.modality}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                modality: e.target.value as GeneralContactInput['modality'],
              }))
            }
            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] focus:border-[#D99A19]"
          >
            <option value="Presencial en David, Chiriquí">
              Presencial en David, Chiriquí
            </option>
            <option value="Videollamada">Videollamada</option>
            <option value="Llamada telefónica">Llamada telefónica</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="block text-sm font-medium text-[#080808] mb-1.5"
        >
          Detalle de su consulta
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          maxLength={INPUT_LIMITS.message}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Describa brevemente su consulta jurídica general..."
          aria-invalid={Boolean(errors.message)}
          className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] placeholder:text-[#555555]/70 focus:border-[#D99A19]"
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#080808]">
            <AlertCircle className="w-3.5 h-3.5 text-[#D99A19] shrink-0" aria-hidden="true" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-xs sm:text-sm text-[#171717] cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                privacyAccepted: e.target.checked,
              }))
            }
            aria-invalid={Boolean(errors.privacyAccepted)}
            className="mt-1 w-4 h-4 accent-[#D99A19] shrink-0"
          />
          <span>
            He leído y acepto la{' '}
            <Link
              href="/politica-de-privacidad"
              className="font-semibold text-[#080808] underline underline-offset-4 hover:text-[#D99A19]"
            >
              Política de Privacidad
            </Link>{' '}
            conforme a la Ley 81 de 2019 y el Decreto Ejecutivo 285 de 2021.
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#080808]">
            <AlertCircle className="w-3.5 h-3.5 text-[#D99A19] shrink-0" aria-hidden="true" />
            <span>{errors.privacyAccepted}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3.5 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#080808] transition-colors duration-200 cursor-pointer"
      >
        Preparar consulta para WhatsApp o correo
      </button>
    </form>
  );
}
