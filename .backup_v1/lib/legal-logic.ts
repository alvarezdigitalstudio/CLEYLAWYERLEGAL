import type {
  BlogArticle,
  BlogCategory,
  PracticeArea,
  PracticeCategory,
} from './legal-data';

export interface ConsultationFormInput {
  fullName: string;
  email: string;
  phone: string;
  serviceArea: string;
  modality: 'Presencial en Panamá' | 'Videollamada' | 'Llamada telefónica';
  message: string;
}

export type ConsultationFieldErrors = Partial<
  Record<keyof ConsultationFormInput, string>
>;

export interface ValidationResult {
  valid: boolean;
  errors: ConsultationFieldErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function filterPracticeAreas(
  areas: PracticeArea[],
  category: PracticeCategory,
): PracticeArea[] {
  if (category === 'Todas') {
    return areas;
  }
  return areas.filter((area) => area.category === category);
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

export function validateConsultationForm(
  input: ConsultationFormInput,
): ValidationResult {
  const errors: ConsultationFieldErrors = {};

  const trimmedName = input.fullName.trim();
  if (trimmedName.length < 3) {
    errors.fullName = 'Ingrese su nombre completo (mínimo 3 caracteres).';
  }

  const trimmedEmail = input.email.trim();
  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Ingrese un correo electrónico válido.';
  }

  const digitsOnly = input.phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    errors.phone = 'Ingrese un número telefónico válido (mínimo 7 dígitos).';
  }

  if (!input.serviceArea.trim()) {
    errors.serviceArea = 'Seleccione el área o servicio de su interés.';
  }

  const trimmedMessage = input.message.trim();
  if (trimmedMessage.length < 10) {
    errors.message =
      'Describa brevemente su consulta (mínimo 10 caracteres).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createConsultationReference(timestampMs: number): string {
  const suffix = Math.abs(Math.floor(timestampMs)).toString().slice(-6).padStart(6, '0');
  return `CLL-${suffix}`;
}
