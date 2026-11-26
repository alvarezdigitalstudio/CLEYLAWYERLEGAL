import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BLOG_ARTICLES,
  PRACTICE_AREAS_17,
} from './legal-data';
import {
  buildMailtoUrl,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  calculateReadingProgress,
  filterBlogArticles,
  filterPracticeAreasByFamily,
  getNextCarouselIndex,
  getPrevCarouselIndex,
  INPUT_LIMITS,
  resolveBackDestination,
  sanitizeUserText,
  validateGeneralContactForm,
  validateWhatsAppConsultation,
} from './legal-logic';

test('PRACTICE_AREAS_17 contains all 17 unique numbered areas with unique slugs', () => {
  assert.equal(PRACTICE_AREAS_17.length, 17);
  const slugs = new Set(PRACTICE_AREAS_17.map((a) => a.slug));
  assert.equal(slugs.size, 17);
  assert.equal(PRACTICE_AREAS_17[0]?.slug, 'derecho-penal');
  assert.equal(PRACTICE_AREAS_17[16]?.slug, 'formacion-profesional');
});

test('filterPracticeAreasByFamily returns all 17 areas for Todas and filters strictly by family', () => {
  assert.equal(filterPracticeAreasByFamily(PRACTICE_AREAS_17, 'Todas').length, 17);
  const penalFamily = filterPracticeAreasByFamily(
    PRACTICE_AREAS_17,
    'Defensa Penal y Garantías',
  );
  assert.equal(penalFamily.length, 3);
  assert.ok(penalFamily.every((a) => a.family === 'Defensa Penal y Garantías'));
});

test('filterBlogArticles filters articles by category', () => {
  assert.equal(filterBlogArticles(BLOG_ARTICLES, 'Todos').length, BLOG_ARTICLES.length);
  const penal = filterBlogArticles(BLOG_ARTICLES, 'Penal y Garantías');
  assert.equal(penal.length, 1);
});

test('carousel navigation wraps cleanly', () => {
  assert.equal(getNextCarouselIndex(0, 3), 1);
  assert.equal(getNextCarouselIndex(2, 3), 0);
  assert.equal(getPrevCarouselIndex(0, 3), 2);
});

test('validateWhatsAppConsultation requires name, valid phone, province, and privacy acceptance', () => {
  const invalid = validateWhatsAppConsultation({
    fullName: 'A',
    phone: '123',
    province: '',
    serviceName: 'Derecho Penal y Administrativo',
    message: '',
    contactPreference: 'WhatsApp',
    privacyAccepted: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.province);
  assert.ok(invalid.errors.privacyAccepted);

  const spamBot = validateWhatsAppConsultation({
    fullName: 'Carlos Pérez',
    phone: '+507 6497-1468',
    province: 'Chiriquí',
    serviceName: 'Derecho Penal y Administrativo',
    message: 'Consulta de prueba',
    contactPreference: 'WhatsApp',
    privacyAccepted: true,
    honeypot: 'http://spam.example',
  });
  assert.equal(spamBot.valid, false);
  assert.ok(spamBot.errors.honeypot);
});

test('buildWhatsAppMessage and buildWhatsAppUrl format and encode the required template', () => {
  const msg = buildWhatsAppMessage({
    serviceName: 'Derecho Penal y Administrativo',
    fullName: 'Laura Gómez',
    phone: '+507 6111-2222',
    province: 'Chiriquí',
    message: 'Solicito orientación sobre una audiencia.',
  });
  assert.ok(msg.includes('Hola, Licdo. Cley González Caballero.'));
  assert.ok(msg.includes('servicio de Derecho Penal y Administrativo.'));
  assert.ok(msg.includes('Nombre: Laura Gómez.'));
  assert.ok(msg.includes('Provincia: Chiriquí.'));

  const url = buildWhatsAppUrl({
    serviceName: 'Derecho Penal y Administrativo',
    fullName: 'Laura Gómez',
    phone: '+507 6111-2222',
    province: 'Chiriquí',
  });
  assert.ok(url.startsWith('https://wa.me/50764971468?text='));
  assert.ok(decodeURIComponent(url).includes('Agradezco su atención.'));
});

test('validateGeneralContactForm validates email, phone, province, message, and privacy checkbox', () => {
  const invalid = validateGeneralContactForm({
    fullName: 'Lu',
    email: 'no-valido',
    phone: '1234',
    province: '',
    serviceArea: '',
    modality: 'Presencial en David, Chiriquí',
    message: 'Corto',
    privacyAccepted: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);
  assert.ok(invalid.errors.privacyAccepted);

  const valid = validateGeneralContactForm({
    fullName: 'Pedro Castillo',
    email: 'pedro@panama.pa',
    phone: '+507 6555-7777',
    province: 'Chiriquí',
    serviceArea: 'Derecho Penal y Administrativo',
    modality: 'Presencial en David, Chiriquí',
    message: 'Requiero orientación sobre un procedimiento en David.',
    privacyAccepted: true,
  });
  assert.equal(valid.valid, true);
});

test('resolveBackDestination routes external visitors to /areas-de-practica and from=servicios to /#servicios', () => {
  assert.equal(
    resolveBackDestination({ fromParam: 'servicios' }).href,
    '/#servicios',
  );
  assert.equal(
    resolveBackDestination({ referrer: 'https://google.com', origin: 'https://cleylawyerlegal.com' }).href,
    '/areas-de-practica',
  );
  assert.equal(
    resolveBackDestination({
      referrer: 'https://cleylawyerlegal.com/areas-de-practica',
      origin: 'https://cleylawyerlegal.com',
    }).useHistoryBack,
    true,
  );
});

test('calculateReadingProgress clamps percentages between 0 and 100', () => {
  assert.equal(calculateReadingProgress(0, 2000, 1000), 0);
  assert.equal(calculateReadingProgress(500, 2000, 1000), 50);
  assert.equal(calculateReadingProgress(1500, 2000, 1000), 100);
  assert.equal(calculateReadingProgress(0, 800, 1000), 100);
});

test('buildMailtoUrl points to official Outlook address', () => {
  const mailto = buildMailtoUrl({
    email: 'cleylawyerlegal@outlook.com',
    serviceName: 'Derecho Civil',
    fullName: 'Ana Ruiz',
    phone: '+507 6000-0000',
    province: 'Panamá',
  });
  assert.ok(mailto.startsWith('mailto:cleylawyerlegal@outlook.com?subject='));
});

test('sanitizeUserText strips unsafe control chars and validation enforces input length limits', () => {
  assert.equal(sanitizeUserText('  Hola\u0000Mundo\u0007  ', 20), 'HolaMundo');
  assert.equal(sanitizeUserText('abcdef', 3), 'abc');

  const tooLong = validateWhatsAppConsultation({
    fullName: 'A'.repeat(INPUT_LIMITS.fullName + 5),
    phone: '+507 6000-0000',
    province: 'Chiriquí',
    serviceName: 'Derecho Penal y Administrativo',
    message: 'Consulta válida',
    contactPreference: 'WhatsApp',
    privacyAccepted: true,
  });
  assert.equal(tooLong.valid, false);
  assert.ok(tooLong.errors.fullName);
});
