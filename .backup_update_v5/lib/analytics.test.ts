import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSxoEventPayload,
  getClarityId,
  getGtmId,
} from './analytics';

test('getGtmId strictly validates GTM-XXXXX identifiers and rejects placeholders', () => {
  assert.equal(getGtmId({ NEXT_PUBLIC_GTM_ID: '' }), null);
  assert.equal(getGtmId({ NEXT_PUBLIC_GTM_ID: 'GTM-XXXXXXXX' }), null);
  assert.equal(getGtmId({ NEXT_PUBLIC_GTM_ID: 'UA-12345-1' }), null);
  assert.equal(getGtmId({ NEXT_PUBLIC_GTM_ID: 'gtm-ab12cd3' }), 'GTM-AB12CD3');
});

test('getClarityId strictly validates alphanumeric project IDs and rejects placeholders', () => {
  assert.equal(getClarityId({ NEXT_PUBLIC_CLARITY_ID: '' }), null);
  assert.equal(getClarityId({ NEXT_PUBLIC_CLARITY_ID: 'MY_CLARITY_ID' }), null);
  assert.equal(getClarityId({ NEXT_PUBLIC_CLARITY_ID: 'abc' }), null);
  assert.equal(
    getClarityId({ NEXT_PUBLIC_CLARITY_ID: 'o1a2b3c4d5' }),
    'o1a2b3c4d5',
  );
});

test('buildSxoEventPayload whitelists non-PII context and strips sensitive personal fields', () => {
  const payload = buildSxoEventPayload({
    channel: 'whatsapp',
    location: 'practice_area_form',
    service_area: 'Derecho Penal y Administrativo',
    province: 'Chiriquí',
    modality: 'Presencial en David, Chiriquí',
    fullName: 'Juan Pérez',
    phone: '+507 6000-0000',
    email: 'juan@example.com',
    message: 'Expediente confidencial 123',
  });

  assert.deepEqual(payload, {
    channel: 'whatsapp',
    location: 'practice_area_form',
    service_area: 'Derecho Penal y Administrativo',
    province: 'Chiriquí',
    modality: 'Presencial en David, Chiriquí',
  });
  assert.equal('fullName' in payload, false);
  assert.equal('phone' in payload, false);
  assert.equal('email' in payload, false);
  assert.equal('message' in payload, false);
});
