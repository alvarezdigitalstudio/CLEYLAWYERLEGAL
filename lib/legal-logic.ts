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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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

export function validateWhatsAppConsultation(
  input: WhatsAppConsultationInput,
): WhatsAppValidationResult {
  const errors: WhatsAppFieldErrors = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.honeypot = 'Verificación automática no superada.';
  }

  const cleanName = sanitizeUserText(input.fullName, INPUT_LIMITS.fullName + 1);
  if (cleanName.length < 3) {
    errors.fullName = 'Ingrese su nombre completo (mínimo 3 caracteres).';
  } else if (input.fullName.trim().length > INPUT_LIMITS.fullName) {
    errors.fullName = `El nombre no debe exceder ${INPUT_LIMITS.fullName} caracteres.`;
  }

  const digitsOnly = input.phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    errors.phone = 'Ingrese un número telefónico válido (mínimo 7 dígitos).';
  } else if (input.phone.trim().length > INPUT_LIMITS.phone) {
    errors.phone = `El teléfono no debe exceder ${INPUT_LIMITS.phone} caracteres.`;
  }

  if (!input.province.trim()) {
    errors.province = 'Seleccione su provincia.';
  }

  if (!input.serviceName.trim()) {
    errors.serviceName = 'El servicio jurídico es obligatorio.';
  }

  if (input.message.trim().length > INPUT_LIMITS.message) {
    errors.message = `La descripción no debe exceder ${INPUT_LIMITS.message} caracteres.`;
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted =
      'Debe aceptar la Política de Privacidad para continuar.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
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

export function validateGeneralContactForm(
  input: GeneralContactInput,
): GeneralValidationResult {
  const errors: GeneralContactFieldErrors = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.honeypot = 'Verificación automática no superada.';
  }

  const cleanName = sanitizeUserText(input.fullName, INPUT_LIMITS.fullName + 1);
  if (cleanName.length < 3) {
    errors.fullName = 'Ingrese su nombre completo (mínimo 3 caracteres).';
  } else if (input.fullName.trim().length > INPUT_LIMITS.fullName) {
    errors.fullName = `El nombre no debe exceder ${INPUT_LIMITS.fullName} caracteres.`;
  }

  const cleanEmail = input.email.trim();
  if (
    cleanEmail.length > INPUT_LIMITS.email ||
    !EMAIL_PATTERN.test(cleanEmail)
  ) {
    errors.email = 'Ingrese un correo electrónico válido.';
  }

  const digitsOnly = input.phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    errors.phone = 'Ingrese un número telefónico válido (mínimo 7 dígitos).';
  } else if (input.phone.trim().length > INPUT_LIMITS.phone) {
    errors.phone = `El teléfono no debe exceder ${INPUT_LIMITS.phone} caracteres.`;
  }

  if (!input.province.trim()) {
    errors.province = 'Seleccione su provincia.';
  }

  if (!input.serviceArea.trim()) {
    errors.serviceArea = 'Seleccione el área jurídica de interés.';
  }

  const cleanMessage = sanitizeUserText(input.message, INPUT_LIMITS.message + 1);
  if (cleanMessage.length < 10) {
    errors.message =
      'Describa brevemente su consulta sin incluir datos confidenciales sensibles (mínimo 10 caracteres).';
  } else if (input.message.trim().length > INPUT_LIMITS.message) {
    errors.message = `La consulta no debe exceder ${INPUT_LIMITS.message} caracteres.`;
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted =
      'Debe aceptar la Política de Privacidad para continuar.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
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
