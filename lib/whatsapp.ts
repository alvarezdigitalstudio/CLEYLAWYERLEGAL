export const FLOATING_WHATSAPP_DEFAULT_MESSAGE =
  'Hola, quisiera obtener información sobre sus servicios legales';

export function extractWhatsAppDigits(
  source: string | undefined | null,
): string | null {
  if (!source || typeof source !== 'string') return null;

  const trimmed = source.trim();
  if (!trimmed) return null;

  const waMeMatch = /^https:\/\/wa\.me\/(\d{7,15})(?:[/?#].*)?$/i.exec(trimmed);
  if (waMeMatch) {
    return waMeMatch[1];
  }

  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return null;
  }

  return digits;
}

export function buildFloatingWhatsAppHref(
  source: string | undefined | null,
  message: string = FLOATING_WHATSAPP_DEFAULT_MESSAGE,
): string | null {
  const digits = extractWhatsAppDigits(source);
  if (!digits) return null;

  const cleanMessage = message.trim();
  if (!cleanMessage) {
    return `https://wa.me/${digits}`;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(cleanMessage)}`;
}
