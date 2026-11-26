import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BLOG_ARTICLES,
  PRACTICE_AREAS,
} from './legal-data';
import {
  createConsultationReference,
  filterBlogArticles,
  filterPracticeAreas,
  getNextCarouselIndex,
  getPrevCarouselIndex,
  validateConsultationForm,
} from './legal-logic';

test('filterPracticeAreas returns all areas when Todas is selected', () => {
  const result = filterPracticeAreas(PRACTICE_AREAS, 'Todas');
  assert.equal(result.length, PRACTICE_AREAS.length);
});

test('filterPracticeAreas filters strictly by chosen category', () => {
  const corporate = filterPracticeAreas(PRACTICE_AREAS, 'Corporativo');
  assert.ok(corporate.length > 0);
  assert.ok(corporate.every((area) => area.category === 'Corporativo'));
});

test('filterBlogArticles filters articles by category', () => {
  const all = filterBlogArticles(BLOG_ARTICLES, 'Todos');
  assert.equal(all.length, BLOG_ARTICLES.length);

  const labor = filterBlogArticles(BLOG_ARTICLES, 'Laboral');
  assert.equal(labor.length, 1);
  assert.equal(labor[0]?.category, 'Laboral');
});

test('carousel navigation wraps forward and backward safely', () => {
  assert.equal(getNextCarouselIndex(0, 3), 1);
  assert.equal(getNextCarouselIndex(2, 3), 0);
  assert.equal(getPrevCarouselIndex(0, 3), 2);
  assert.equal(getPrevCarouselIndex(2, 3), 1);
  assert.equal(getNextCarouselIndex(0, 0), 0);
});

test('validateConsultationForm rejects empty or invalid inputs with clear Spanish errors', () => {
  const invalid = validateConsultationForm({
    fullName: 'Ab',
    email: 'correo-invalido',
    phone: '123',
    serviceArea: '',
    modality: 'Presencial en Panamá',
    message: 'Hola',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.serviceArea);
  assert.ok(invalid.errors.message);
});

test('validateConsultationForm accepts valid inquiry details', () => {
  const valid = validateConsultationForm({
    fullName: 'María Rodríguez',
    email: 'maria@empresa.pa',
    phone: '+507 6123 4567',
    serviceArea: 'Asesoría Legal',
    modality: 'Videollamada',
    message: 'Requiero asesoría para revisar un contrato de arrendamiento comercial.',
  });

  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('createConsultationReference produces deterministic CLL reference code', () => {
  assert.equal(createConsultationReference(1700000123456), 'CLL-123456');
});
