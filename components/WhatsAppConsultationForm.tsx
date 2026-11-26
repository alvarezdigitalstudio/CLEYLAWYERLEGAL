'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Mail,
  MessageCircle,
  ShieldAlert,
} from 'lucide-react';
import { trackSxoEvent } from '@/lib/analytics';
import { BRAND_INFO, PANAMA_PROVINCES } from '@/lib/legal-data';
import {
  buildMailtoUrl,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  getFieldVisualState,
  INPUT_LIMITS,
  validateWhatsAppConsultation,
  validateWhatsAppField,
  type ContactPreference,
  type FieldVisualState,
  type WhatsAppConsultationInput,
  type WhatsAppFieldErrors,
} from '@/lib/legal-logic';

interface WhatsAppConsultationFormProps {
  serviceName: string;
}

export function WhatsAppConsultationForm({
  serviceName,
}: WhatsAppConsultationFormProps) {
  const formId = useId();
  const [formData, setFormData] = useState<WhatsAppConsultationInput>({
    fullName: '',
    phone: '',
    province: 'Chiriquí',
    serviceName,
    message: '',
    contactPreference: 'WhatsApp',
    privacyAccepted: false,
    honeypot: '',
  });
  const [errors, setErrors] = useState<WhatsAppFieldErrors>({});
  const [interactedFields, setInteractedFields] = useState<
    Partial<Record<keyof WhatsAppConsultationInput, boolean>>
  >({});
  const [preparedLink, setPreparedLink] = useState<{
    whatsappUrl: string;
    mailtoUrl: string;
    previewMessage: string;
  } | null>(null);

  const formStartedRef = useRef(false);

  const validateSingleField = <K extends keyof WhatsAppConsultationInput>(
    field: K,
    value: WhatsAppConsultationInput[K],
  ) => {
    const fieldError = validateWhatsAppField(field, value);
    setErrors((prev) => {
      if (!fieldError && !prev[field]) return prev;
      const next = { ...prev };
      if (fieldError) {
        next[field] = fieldError;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleFieldChange = <K extends keyof WhatsAppConsultationInput>(
    field: K,
    value: WhatsAppConsultationInput[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setInteractedFields((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
    validateSingleField(field, value);
  };

  const handleFieldBlur = <K extends keyof WhatsAppConsultationInput>(
    field: K,
    value: WhatsAppConsultationInput[K],
  ) => {
    setInteractedFields((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
    validateSingleField(field, value);
  };

  const getInputBorderClasses = (state: FieldVisualState) => {
    if (state === 'invalid') {
      return 'border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/15';
    }
    if (state === 'valid') {
      return 'border-emerald-600 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/15';
    }
    return 'border-[#555555]/30 focus:border-[#D99A19] focus:outline-none';
  };

  const fullNameState = getFieldVisualState({
    hasInteracted: Boolean(interactedFields.fullName),
    error: errors.fullName,
    value: formData.fullName,
  });
  const phoneState = getFieldVisualState({
    hasInteracted: Boolean(interactedFields.phone),
    error: errors.phone,
    value: formData.phone,
  });
  const messageState = getFieldVisualState({
    hasInteracted: Boolean(interactedFields.message),
    error: errors.message,
    value: formData.message,
    allowEmptyNeutral: true,
  });

  const handleFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackSxoEvent('contact_form_start', {
      channel: 'whatsapp_area_form',
      location: 'practice_area_form',
      service_area: serviceName,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateWhatsAppConsultation({
      ...formData,
      serviceName,
    });
    if (!validation.valid) {
      setInteractedFields({
        fullName: true,
        phone: true,
        message: true,
        privacyAccepted: true,
      });
      setErrors(validation.errors);
      setPreparedLink(null);
      return;
    }

    setErrors({});
    trackSxoEvent('contact_form_submit', {
      channel: 'whatsapp_area_form',
      location: 'practice_area_form',
      service_area: serviceName,
      province: formData.province,
      contact_preference: formData.contactPreference,
    });

    const payload = {
      serviceName,
      fullName: formData.fullName,
      phone: formData.phone,
      province: formData.province,
      message: formData.message,
    };
    setPreparedLink({
      whatsappUrl: buildWhatsAppUrl(payload),
      mailtoUrl: buildMailtoUrl({
        ...payload,
        email: BRAND_INFO.email,
      }),
      previewMessage: buildWhatsAppMessage(payload),
    });
  };

  return (
    <div className="border border-[#EEEEEE] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-[#080808]">
          Solicitar orientación sobre {serviceName}
        </h2>
        <p className="mt-2 text-sm text-[#555555] leading-relaxed">
          Complete los datos para preparar su consulta directa dirigida al{' '}
          <span className="font-medium text-[#080808]">
            {BRAND_INFO.lawyerName}
          </span>
          .
        </p>
      </div>

      {/* Privacy notice before sending */}
      <div className="bg-[#EEEEEE]/70 border border-[#555555]/20 p-4 flex items-start gap-3 text-xs text-[#171717] leading-relaxed">
        <ShieldAlert
          className="w-4 h-4 text-[#D99A19] shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <p>
          <strong>Aviso de confidencialidad:</strong> No incluya datos judiciales
          sensibles, documentos adjuntos, información de terceros ni detalles
          confidenciales en el mensaje automático.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onFocus={handleFormStart}
        noValidate
        data-clarity-mask="true"
        className="space-y-4"
      >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`${formId}-name`}
              className="block text-sm font-medium text-[#080808] mb-1.5"
            >
              Nombre completo
            </label>
            <div className="relative">
              <input
                id={`${formId}-name`}
                name="fullName"
                type="text"
                maxLength={INPUT_LIMITS.fullName}
                value={formData.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                onBlur={(e) => handleFieldBlur('fullName', e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
                className={`w-full px-4 py-3 pr-10 bg-[#FFFFFF] border text-sm text-[#080808] placeholder:text-[#555555]/70 transition-colors ${getInputBorderClasses(
                  fullNameState,
                )}`}
              />
              {fullNameState === 'valid' && (
                <CheckCircle2
                  className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              )}
              {fullNameState === 'invalid' && (
                <AlertCircle
                  className="w-4 h-4 text-red-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </div>
            {errors.fullName && (
              <p
                id={`${formId}-name-error`}
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
              >
                <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" aria-hidden="true" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${formId}-phone`}
              className="block text-sm font-medium text-[#080808] mb-1.5"
            >
              Número de teléfono
            </label>
            <div className="relative">
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={INPUT_LIMITS.phone}
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                placeholder="+507 6000-0000"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                className={`w-full px-4 py-3 pr-10 bg-[#FFFFFF] border text-sm text-[#080808] placeholder:text-[#555555]/70 transition-colors ${getInputBorderClasses(
                  phoneState,
                )}`}
              />
              {phoneState === 'valid' && (
                <CheckCircle2
                  className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              )}
              {phoneState === 'invalid' && (
                <AlertCircle
                  className="w-4 h-4 text-red-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </div>
            {errors.phone && (
              <p
                id={`${formId}-phone-error`}
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
              >
                <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" aria-hidden="true" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div>
            <label
              htmlFor={`${formId}-preference`}
              className="block text-sm font-medium text-[#080808] mb-1.5"
            >
              Preferencia de contacto
            </label>
            <select
              id={`${formId}-preference`}
              name="contactPreference"
              value={formData.contactPreference}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactPreference: e.target.value as ContactPreference,
                }))
              }
              className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] focus:border-[#D99A19]"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Llamada telefónica">Llamada telefónica</option>
              <option value="Correo electrónico">Correo electrónico</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor={`${formId}-service`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Servicio jurídico seleccionado
          </label>
          <input
            id={`${formId}-service`}
            name="serviceName"
            type="text"
            readOnly
            value={serviceName}
            className="w-full px-4 py-3 bg-[#EEEEEE]/70 border border-[#555555]/20 text-sm font-medium text-[#080808]"
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-message`}
            className="block text-sm font-medium text-[#080808] mb-1.5"
          >
            Breve descripción (opcional)
          </label>
          <div className="relative">
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={3}
              maxLength={INPUT_LIMITS.message}
              value={formData.message}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              onBlur={(e) => handleFieldBlur('message', e.target.value)}
              placeholder="Indique brevemente el motivo general de su consulta sin datos confidenciales..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? `${formId}-message-error` : undefined}
              className={`w-full px-4 py-3 pr-10 bg-[#FFFFFF] border text-sm text-[#080808] placeholder:text-[#555555]/70 transition-colors ${getInputBorderClasses(
                messageState,
              )}`}
            />
            {messageState === 'valid' && (
              <CheckCircle2
                className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3.5 pointer-events-none"
                aria-hidden="true"
              />
            )}
            {messageState === 'invalid' && (
              <AlertCircle
                className="w-4 h-4 text-red-600 absolute right-3.5 top-3.5 pointer-events-none"
                aria-hidden="true"
              />
            )}
          </div>
          {errors.message && (
            <p
              id={`${formId}-message-error`}
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" aria-hidden="true" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3 text-xs sm:text-sm text-[#171717] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyAccepted}
              onChange={(e) => handleFieldChange('privacyAccepted', e.target.checked)}
              aria-invalid={Boolean(errors.privacyAccepted)}
              aria-describedby={
                errors.privacyAccepted ? `${formId}-privacy-error` : undefined
              }
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
              y el tratamiento de mis datos conforme a la Ley 81 de 2019.
            </span>
          </label>
          {errors.privacyAccepted && (
            <p
              id={`${formId}-privacy-error`}
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" aria-hidden="true" />
              <span>{errors.privacyAccepted}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#080808] transition-colors duration-200 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span>ENVIAR CONSULTA POR WHATSAPP</span>
        </button>
      </form>

      {/* Honest WhatsApp handoff panel */}
      {preparedLink && (
        <div
          role="region"
          aria-live="polite"
          aria-label="Enlace preparado para envío en WhatsApp"
          data-clarity-mask="true"
          className="border border-[#D99A19] bg-[#EEEEEE]/40 p-5 space-y-4"
        >
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-[#080808]">
              Mensaje preparado para envío
            </h3>
            <p className="text-xs sm:text-sm text-[#555555]">
              La consulta no se habrá enviado hasta que usted confirme el envío
              directamente dentro de WhatsApp o utilice el correo profesional
              como alternativa.
            </p>
          </div>

          <pre className="whitespace-pre-wrap font-sans text-xs bg-[#FFFFFF] border border-[#EEEEEE] p-3.5 text-[#171717] leading-relaxed">
            {preparedLink.previewMessage}
          </pre>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={preparedLink.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackSxoEvent('whatsapp_click', {
                  channel: 'whatsapp',
                  location: 'practice_area_form_handoff',
                  service_area: serviceName,
                  province: formData.province,
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold hover:bg-[#080808] transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Abrir WhatsApp ahora</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <a
              href={preparedLink.mailtoUrl}
              onClick={() =>
                trackSxoEvent('email_click', {
                  channel: 'email',
                  location: 'practice_area_form_handoff',
                  service_area: serviceName,
                  province: formData.province,
                })
              }
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#080808] bg-[#FFFFFF] text-[#080808] text-sm font-semibold hover:bg-[#080808] hover:text-[#FFFFFF] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
              <span>Enviar por correo ({BRAND_INFO.email})</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
