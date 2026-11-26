import { z } from 'zod';
import type {
  BlogArticle,
  BlogCategory,
  PracticeAreaDetail,
  PracticeFamily,
} from './legal-data';

export type ContactPreference =
  | 'WhatsApp'
  | 'Correo electrónico'
  | 'Llamada telefónica';

export interface WhatsAppConsultationInput {
  fullName: string;
  phone: string;
  province: string;
  serviceName: string;
  message: string;
  contactPreference: ContactPreference;
  privacyAccepted: boolean;
  honeypot?: string;
}

export type WhatsAppFieldErrors = Partial<
  Record<keyof WhatsAppConsultationInput, string>
>;

export interface WhatsAppValidationResult {
  valid: boolean;
  errors: WhatsAppFieldErrors;
}

export interface GeneralContactInput {
  fullName: string;
  email: string;
  phone: string;
  province: string;
  serviceArea: string;
  modality: 'Presencial en David, Chiriquí' | 'Videollamada' | 'Llamada telefónica';
  message: string;
  privacyAccepted: boolean;
  honeypot?: string;
}

export type GeneralContactFieldErrors = Partial<
  Record<keyof GeneralContactInput, string>
>;

export interface GeneralValidationResult {
  valid: boolean;
  errors: GeneralContactFieldErrors;
}

export type FieldVisualState = 'neutral' | 'valid' | 'invalid';

export function getFieldVisualState(options: {
  hasInteracted: boolean;
  error?: string;
  value?: string;
  allowEmptyNeutral?: boolean;
}): FieldVisualState {
  if (options.error) {
    return 'invalid';
  }
  if (!options.hasInteracted) {
    return 'neutral';
  }
  if (
    options.allowEmptyNeutral &&
    (!options.value || options.value.trim().length === 0)
  ) {
    return 'neutral';
  }
  return 'valid';
}

const EMAIL_TLD_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_CHARS_PATTERN = /^[+\d\s().-]+$/;
export const OFFICIAL_WHATSAPP_BASE = 'https://wa.me/50764971468';

export const INPUT_LIMITS = {
  fullName: 120,
  phone: 30,
  email: 160,
  message: 1500,
} as const;

export function sanitizeUserText(value: string, maxLength: number): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

const fullNameSchema = z
  .string()
  .transform((val) => sanitizeUserText(val, INPUT_LIMITS.fullName + 1))
  .refine((val) => val.length >= 3, {
    message: 'Ingrese su nombre completo (mínimo 3 caracteres).',
  })
  .refine((val) => val.length <= INPUT_LIMITS.fullName, {
    message: `El nombre no debe exceder ${INPUT_LIMITS.fullName} caracteres.`,
  });

export const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Ingrese un número telefónico válido (ej. +507 6000-0000).')
  .max(INPUT_LIMITS.phone, `El teléfono no debe exceder ${INPUT_LIMITS.phone} caracteres.`)
  .refine((val) => PHONE_ALLOWED_CHARS_PATTERN.test(val), {
    message: 'El teléfono solo puede contener dígitos, espacios, +, () o guiones.',
  })
  .refine((val) => {
    const digitsCount = val.replace(/\D/g, '').length;
    return digitsCount >= 7 && digitsCount <= 15;
  }, {
    message: 'Ingrese un número telefónico válido (entre 7 y 15 dígitos).',
  });

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Ingrese su correo electrónico.')
  .max(INPUT_LIMITS.email, `El correo no debe exceder ${INPUT_LIMITS.email} caracteres.`)
  .email('Ingrese un correo electrónico válido (ej. nombre@correo.com).')
  .refine((val) => EMAIL_TLD_PATTERN.test(val), {
    message: 'Ingrese un correo electrónico válido (ej. nombre@correo.com).',
  });

export const whatsAppConsultationSchema = z.object({
  fullName: fullNameSchema,
  phone: phoneSchema,
  province: z.string().trim().min(1, 'Seleccione su provincia.'),
  serviceName: z.string().trim().min(1, 'El servicio jurídico es obligatorio.'),
  message: z
    .string()
    .trim()
    .max(INPUT_LIMITS.message, `La descripción no debe exceder ${INPUT_LIMITS.message} caracteres.`),
  contactPreference: z.enum(['WhatsApp', 'Correo electrónico', 'Llamada telefónica']),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: 'Debe aceptar la Política de Privacidad para continuar.',
  }),
  honeypot: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length === 0, {
      message: 'Verificación automática no superada.',
    }),
});

export const generalContactSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  province: z.string().trim().min(1, 'Seleccione su provincia.'),
  serviceArea: z.string().trim().min(1, 'Seleccione el área jurídica de interés.'),
  modality: z.enum([
    'Presencial en David, Chiriquí',
    'Videollamada',
    'Llamada telefónica',
  ]),
  message: z
    .string()
    .transform((val) => sanitizeUserText(val, INPUT_LIMITS.message + 1))
    .refine((val) => val.length >= 10, {
      message:
        'Describa brevemente su consulta sin incluir datos confidenciales sensibles (mínimo 10 caracteres).',
    })
    .refine((val) => val.length <= INPUT_LIMITS.message, {
      message: `La consulta no debe exceder ${INPUT_LIMITS.message} caracteres.`,
    }),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: 'Debe aceptar la Política de Privacidad para continuar.',
  }),
  honeypot: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length === 0, {
      message: 'Verificación automática no superada.',
    }),
});

function mapZodIssuesToErrors<T extends string>(
  issues: z.ZodIssue[],
): Partial<Record<T, string>> {
  const errors: Partial<Record<T, string>> = {};
  for (const issue of issues) {
    const field = issue.path[0] as T | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

export function filterPracticeAreasByFamily(
  areas: PracticeAreaDetail[],
  family: PracticeFamily,
): PracticeAreaDetail[] {
  if (family === 'Todas') {
    return areas;
  }
  return areas.filter((area) => area.family === family);
}

export function filterBlogArticles(
  articles: BlogArticle[],
  category: BlogCategory,
): BlogArticle[] {
  if (category === 'Todos') {
    return articles;
  }
  return articles.filter((article) => article.category === category);
}

export function getNextCarouselIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

export function getPrevCarouselIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
}

export function validateWhatsAppField<K extends keyof WhatsAppConsultationInput>(
  field: K,
  value: WhatsAppConsultationInput[K],
): string | undefined {
  const fieldSchema = whatsAppConsultationSchema.shape[field];
  if (!fieldSchema) return undefined;
  const result = fieldSchema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function validateWhatsAppConsultation(
  input: WhatsAppConsultationInput,
): WhatsAppValidationResult {
  const result = whatsAppConsultationSchema.safeParse(input);
  if (result.success) {
    return { valid: true, errors: {} };
  }
  return {
    valid: false,
    errors: mapZodIssuesToErrors<keyof WhatsAppConsultationInput>(
      result.error.issues,
    ),
  };
}

export function buildWhatsAppMessage(input: {
  serviceName: string;
  fullName: string;
  phone: string;
  province: string;
  message?: string;
}): string {
  const cleanService = sanitizeUserText(input.serviceName, 160);
  const cleanName = sanitizeUserText(input.fullName, INPUT_LIMITS.fullName);
  const cleanPhone = sanitizeUserText(input.phone, INPUT_LIMITS.phone);
  const cleanProvince = sanitizeUserText(input.province, 80);
  const cleanMessage = input.message
    ? sanitizeUserText(input.message, INPUT_LIMITS.message)
    : '';

  const consultationNote =
    cleanMessage.length > 0
      ? cleanMessage
      : 'Solicito orientación jurídica inicial sobre este servicio.';

  return [
    'Hola, Licdo. Cley González Caballero.',
    '',
    `Deseo solicitar información sobre el servicio de ${cleanService}.`,
    '',
    `Nombre: ${cleanName}.`,
    `Teléfono: ${cleanPhone}.`,
    `Provincia: ${cleanProvince}.`,
    `Consulta: ${consultationNote}`,
    '',
    'Agradezco su atención.',
  ].join('\n');
}

export function buildWhatsAppUrl(input: {
  serviceName: string;
  fullName: string;
  phone: string;
  province: string;
  message?: string;
}): string {
  const text = buildWhatsAppMessage(input);
  return `${OFFICIAL_WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export function validateGeneralContactField<K extends keyof GeneralContactInput>(
  field: K,
  value: GeneralContactInput[K],
): string | undefined {
  const fieldSchema = generalContactSchema.shape[field];
  if (!fieldSchema) return undefined;
  const result = fieldSchema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function validateGeneralContactForm(
  input: GeneralContactInput,
): GeneralValidationResult {
  const result = generalContactSchema.safeParse(input);
  if (result.success) {
    return { valid: true, errors: {} };
  }
  return {
    valid: false,
    errors: mapZodIssuesToErrors<keyof GeneralContactInput>(
      result.error.issues,
    ),
  };
}

export function buildMailtoUrl(input: {
  email: string;
  serviceName: string;
  fullName: string;
  phone: string;
  province: string;
  message?: string;
}): string {
  const cleanService = sanitizeUserText(input.serviceName, 160);
  const cleanName = sanitizeUserText(input.fullName, INPUT_LIMITS.fullName);
  const subject = encodeURIComponent(
    `Consulta jurídica: ${cleanService} — ${cleanName}`,
  );
  const body = encodeURIComponent(buildWhatsAppMessage(input));
  return `mailto:${input.email}?subject=${subject}&body=${body}`;
}

export function resolveBackDestination(options: {
  fromParam?: string | null;
  referrer?: string;
  origin?: string;
}): { href: string; label: string; useHistoryBack: boolean } {
  if (options.fromParam === 'servicios') {
    return {
      href: '/#servicios',
      label: 'VOLVER A SERVICIOS',
      useHistoryBack: false,
    };
  }
  if (options.fromParam === 'areas') {
    return {
      href: '/areas-de-practica',
      label: 'VOLVER A SERVICIOS',
      useHistoryBack: false,
    };
  }
  if (
    options.referrer &&
    options.origin &&
    options.referrer.startsWith(options.origin)
  ) {
    return {
      href: '/areas-de-practica',
      label: 'VOLVER A SERVICIOS',
      useHistoryBack: true,
    };
  }
  return {
    href: '/areas-de-practica',
    label: 'VOLVER A SERVICIOS',
    useHistoryBack: false,
  };
}

export function calculateReadingProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  const scrollable = scrollHeight - viewportHeight;
  if (scrollable <= 0) return 100;
  const ratio = (scrollY / scrollable) * 100;
  return Math.max(0, Math.min(100, Math.round(ratio)));
}
