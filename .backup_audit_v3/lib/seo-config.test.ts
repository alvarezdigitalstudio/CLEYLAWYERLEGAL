import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBingSiteAuthXml,
  buildHomeJsonLdGraph,
  getAllPublicPaths,
  getAllPublicUrls,
  getBingVerificationCode,
  getGaMeasurementId,
  getGoogleVerificationCode,
  getIndexNowKey,
  getSiteUrl,
  validateIndexNowUrls,
} from './seo-config';

test('getSiteUrl prefers NEXT_PUBLIC_SITE_URL, falls back cleanly, and strips trailing slashes', () => {
  assert.equal(
    getSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://cleylawyerlegal.com/' }),
    'https://cleylawyerlegal.com',
  );
  assert.equal(
    getSiteUrl({ APP_URL: 'https://preview.run.app/' }),
    'https://preview.run.app',
  );
  assert.equal(
    getSiteUrl({ APP_URL: 'MY_APP_URL' }),
    'https://cleylawyerlegal.com',
  );
});

test('verification helpers ignore empty or placeholder values and return real tokens', () => {
  assert.equal(getGoogleVerificationCode({ GOOGLE_SITE_VERIFICATION: '' }), null);
  assert.equal(
    getGoogleVerificationCode({ GOOGLE_SITE_VERIFICATION: 'MY_CODE' }),
    null,
  );
  assert.equal(
    getGoogleVerificationCode({ GOOGLE_SITE_VERIFICATION: 'abc123token' }),
    'abc123token',
  );

  assert.equal(getBingVerificationCode({ BING_SITE_VERIFICATION: '  ' }), null);
  assert.equal(
    getBingVerificationCode({ BING_SITE_VERIFICATION: 'BING123456' }),
    'BING123456',
  );
});

test('getGaMeasurementId strictly validates G-XXXXXXXXXX IDs and rejects placeholders', () => {
  assert.equal(getGaMeasurementId({ NEXT_PUBLIC_GA_MEASUREMENT_ID: '' }), null);
  assert.equal(
    getGaMeasurementId({ NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-XXXXXXXXXX' }),
    null,
  );
  assert.equal(
    getGaMeasurementId({ NEXT_PUBLIC_GA_MEASUREMENT_ID: 'invalid-id' }),
    null,
  );
  assert.equal(
    getGaMeasurementId({ NEXT_PUBLIC_GA_MEASUREMENT_ID: 'g-ab12cd34ef' }),
    'G-AB12CD34EF',
  );
});

test('getIndexNowKey validates safe key characters and length', () => {
  assert.equal(getIndexNowKey({ INDEXNOW_KEY: 'short' }), null);
  assert.equal(getIndexNowKey({ INDEXNOW_KEY: '../bad/key' }), null);
  assert.equal(
    getIndexNowKey({ INDEXNOW_KEY: 'a1b2c3d4-e5f6-7890' }),
    'a1b2c3d4-e5f6-7890',
  );
});

test('buildBingSiteAuthXml escapes XML entities safely', () => {
  const xml = buildBingSiteAuthXml('CODE<123>&');
  assert.ok(xml.includes('<?xml version="1.0" encoding="utf-8"?>'));
  assert.ok(xml.includes('<user>CODE&lt;123&gt;&amp;</user>'));
});

test('getAllPublicPaths covers all 24 canonical pages (core + 17 areas + 4 compliance)', () => {
  const paths = getAllPublicPaths();
  assert.equal(paths.length, 24);
  assert.ok(paths.includes('/'));
  assert.ok(paths.includes('/areas-de-practica'));
  assert.ok(paths.includes('/contacto'));
  assert.ok(paths.includes('/derecho-penal'));
  assert.ok(paths.includes('/politica-de-privacidad'));

  const urls = getAllPublicUrls('https://cleylawyerlegal.com/');
  assert.equal(urls[0], 'https://cleylawyerlegal.com');
  assert.ok(urls.includes('https://cleylawyerlegal.com/derecho-penal'));
});

test('validateIndexNowUrls accepts same-origin URLs and rejects external domains', () => {
  const ok = validateIndexNowUrls(
    [
      'https://cleylawyerlegal.com/',
      'https://cleylawyerlegal.com/derecho-penal',
    ],
    'https://cleylawyerlegal.com',
  );
  assert.equal(ok.valid, true);
  assert.equal(ok.urls.length, 2);

  const bad = validateIndexNowUrls(
    ['https://evil.example/phishing'],
    'https://cleylawyerlegal.com',
  );
  assert.equal(bad.valid, false);
  assert.ok(bad.error);
});

test('buildHomeJsonLdGraph uses verified Chiriquí/Panamá brand info without unverified data', () => {
  const graph = buildHomeJsonLdGraph('https://cleylawyerlegal.com');
  const serialized = JSON.stringify(graph);
  assert.ok(serialized.includes('Licdo. Cley González Caballero'));
  assert.ok(serialized.includes('5551'));
  assert.ok(serialized.includes('+507 6497-1468'));
  assert.ok(serialized.includes('cleylawyerlegal@outlook.com'));
  assert.ok(!serialized.includes('openingHours'));
  assert.ok(!serialized.includes('aggregateRating'));
});
