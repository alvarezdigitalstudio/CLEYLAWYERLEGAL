'use client';

import { useId, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { PRACTICE_AREAS, SERVICES } from '@/lib/legal-data';
import {
  createConsultationReference,
  validateConsultationForm,
  type ConsultationFieldErrors,
  type ConsultationFormInput,
} from '@/lib/legal-logic';

interface ConsultationFormProps {
  initialServiceArea?: string;
  onSuccess?: () => void;
}

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  ...PRACTICE_AREAS.map((a) => a.title),
];

export function ConsultationForm({
  initialServiceArea = 'Asesoría Legal',
  onSuccess,
}: ConsultationFormProps) {
  const formId = useId();
  const isTopicNote = initialServiceArea.startsWith('Consulta sobre:');
  const resolvedService = SERVICE_OPTIONS.includes(initialServiceArea)
    ? initialServiceArea
    : 'Asesoría Legal';

  const [formData, setFormData] = useState<ConsultationFormInput>({
    fullName: '',
    email: '',
    phone: '',
    serviceArea: resolvedService,
    modality: 'Presencial en Panamá',
    message: isTopicNote ? initialServiceArea : '',
  });
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateConsultationForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const reference = createConsultationReference(Date.now());
    setSubmittedRef(reference);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceArea: 'Asesoría Legal',
      modality: 'Presencial en Panamá',
      message: '',
    });
  };

  if (submittedRef) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[#D99A19] bg-[#FFFFFF] p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="w-6 h-6 text-[#D99A19] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#080808]">
              Solicitud de consulta registrada
            </h3>
            <p className="mt-1 text-sm text-[#555555]">
              Referencia de atención:{' '}
              <span className="font-semibold text-[#080808] tabular-nums">
                {submittedRef}
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-b border-[#EEEEEE] py-4 space-y-2 text-sm text-[#171717]">
          <p>
            <span className="text-[#555555]">Solicitante:</span>{' '}
            <span className="font-medium">{formData.fullName}</span>
          </p>
          <p>
            <span className="text-[#555555]">Área solicitada:</span>{' '}
            <span className="font-medium">{formData.serviceArea}</span>
          </p>
          <p>
            <span className="text-[#555555]">Modalidad:</span>{' '}
            <span className="font-medium">{formData.modality}</span>
          </p>
        </div>

        <p className="text-sm text-[#555555] leading-relaxed">
          Nuestro equipo en Panamá revisará su solicitud y se pondrá en contacto
          a través de <span className="font-medium text-[#080808]">{formData.email}</span>{' '}
          para confirmar horario.
        </p>

        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-2.5 border border-[#080808] text-sm font-semibold text-[#080808] hover:bg-[#080808] hover:text-[#FFFFFF] transition-colors cursor-pointer"
        >
          Realizar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="+507 6000 0000"
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
                modality: e.target.value as ConsultationFormInput['modality'],
              }))
            }
            className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#555555]/30 text-sm text-[#080808] focus:border-[#D99A19]"
          >
            <option value="Presencial en Panamá">Presencial en Panamá</option>
            <option value="Videollamada">Videollamada</option>
            <option value="Llamada telefónica">Llamada telefónica</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-service`}
          className="block text-sm font-medium text-[#080808] mb-1.5"
        >
          Servicio o área de interés
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
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.serviceArea && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#080808]">
            <AlertCircle className="w-3.5 h-3.5 text-[#D99A19] shrink-0" aria-hidden="true" />
            <span>{errors.serviceArea}</span>
          </p>
        )}
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
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Describa brevemente su situación o requerimiento legal..."
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

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3.5 bg-[#D99A19] text-[#FFFFFF] text-sm font-semibold tracking-wide hover:bg-[#080808] transition-colors duration-200 cursor-pointer"
      >
        Enviar solicitud de consulta
      </button>
    </form>
  );
}
