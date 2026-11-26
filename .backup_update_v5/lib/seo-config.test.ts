import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBingSiteAuthXml,
  buildHomeJsonLdGraph,
  buildLegalPageJsonLdGraph,
  buildPracticeAreaJsonLdGraph,
  buildSocialMetadata,
  getAllPublicPaths,
  getAllPublicUrls,
  getBingVerificationCode,
  getGaMeasurementId,
  getGoogleVerificationCode,
  getIndexNowKey,
  getSiteUrl,
  HOME_OG_DESCRIPTION,
  HOME_OG_TITLE,
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  TWITTER_IMAGE_ALT,
  validateIndexNowUrls,
} from './seo-config';
import { PRACTICE_AREAS_17 } from './legal-data';

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

test('buildHomeJsonLdGraph uses verified Chiriquí/Panamá brand info and links Article nodes cleanly', () => {
  const graph = buildHomeJsonLdGraph('https://cleylawyerlegal.com');
  const serialized = JSON.stringify(graph);
  assert.ok(serialized.includes('Licdo. Cley González Caballero'));
  assert.ok(serialized.includes('5551'));
  assert.ok(serialized.includes('+507 6497-1468'));
  assert.ok(serialized.includes('cleylawyerlegal@outlook.com'));
  assert.ok(serialized.includes('https://cleylawyerlegal.com/og-cleylawyerlegal.png'));
  assert.ok(!serialized.includes('openingHours'));
  assert.ok(!serialized.includes('aggregateRating'));

  const articleNodes = graph['@graph'].filter(
    (node) => node['@type'] === 'Article',
  );
  assert.equal(articleNodes.length, 3);
});

test('buildPracticeAreaJsonLdGraph connects area Service, FAQPage, and BreadcrumbList to canonical @ids', () => {
  const penal = PRACTICE_AREAS_17[0];
  const graph = buildPracticeAreaJsonLdGraph(
    penal,
    'https://cleylawyerlegal.com',
    '/assets/test.jpg',
  );
  const serialized = JSON.stringify(graph);
  assert.ok(serialized.includes('https://cleylawyerlegal.com/#person'));
  assert.ok(serialized.includes('https://cleylawyerlegal.com/#legalservice'));
  assert.ok(serialized.includes('https://cleylawyerlegal.com/derecho-penal#faq'));
  assert.ok(serialized.includes('https://cleylawyerlegal.com/derecho-penal#breadcrumb'));
});

test('buildLegalPageJsonLdGraph generates WebPage and BreadcrumbList for legal pages', () => {
  const graph = buildLegalPageJsonLdGraph(
    'Aviso Legal',
    'Información del titular.',
    '/aviso-legal',
    'https://cleylawyerlegal.com',
  );
  assert.equal(graph['@graph'].length, 2);
  assert.equal(graph['@graph'][0]['@type'], 'WebPage');
  assert.equal(graph['@graph'][1]['@type'], 'BreadcrumbList');
});

test('buildSocialMetadata outputs official 1200x630 PNG Open Graph, Twitter Card, and canonical HTTPS URLs', () => {
  const meta = buildSocialMetadata({
    siteUrl: 'https://cleylawyerlegal.com/',
    path: '/',
    title: 'CleyLawyerLegal | Abogado Penalista en Chiriquí y Panamá',
    ogTitle: HOME_OG_TITLE,
    description: HOME_OG_DESCRIPTION,
  });

  assert.equal(meta.alternates?.canonical, 'https://cleylawyerlegal.com');
  assert.equal(meta.openGraph?.type, 'website');
  assert.equal(meta.openGraph?.siteName, 'CleyLawyerLegal');
  assert.equal(meta.openGraph?.locale, 'es_PA');
  assert.equal(meta.openGraph?.url, 'https://cleylawyerlegal.com');
  assert.equal(meta.openGraph?.title, HOME_OG_TITLE);
  assert.equal(meta.openGraph?.description, HOME_OG_DESCRIPTION);

  const ogImages = meta.openGraph?.images as Array<Record<string, unknown>>;
  assert.equal(ogImages.length, 1);
  assert.equal(ogImages[0].url, `https://cleylawyerlegal.com${OG_IMAGE_PATH}`);
  assert.equal(
    ogImages[0].secureUrl,
    `https://cleylawyerlegal.com${OG_IMAGE_PATH}`,
  );
  assert.equal(ogImages[0].type, 'image/png');
  assert.equal(ogImages[0].width, 1200);
  assert.equal(ogImages[0].height, 630);
  assert.equal(ogImages[0].alt, OG_IMAGE_ALT);

  assert.equal(meta.twitter?.card, 'summary_large_image');
  assert.equal(meta.twitter?.title, HOME_OG_TITLE);
  assert.equal(meta.twitter?.description, HOME_OG_DESCRIPTION);
  const twImages = meta.twitter?.images as Array<Record<string, unknown>>;
  assert.equal(twImages[0].url, `https://cleylawyerlegal.com${OG_IMAGE_PATH}`);
  assert.equal(twImages[0].alt, TWITTER_IMAGE_ALT);
});

test('buildSocialMetadata builds specific subpage URLs without double slashes', () => {
  const meta = buildSocialMetadata({
    siteUrl: 'https://cleylawyerlegal.com',
    path: '/derecho-penal',
    title: 'Derecho Penal en Panamá | CleyLawyerLegal',
    description: 'Defensa penal técnica en David, Chiriquí y todo Panamá.',
    type: 'article',
  });

  assert.equal(
    meta.alternates?.canonical,
    'https://cleylawyerlegal.com/derecho-penal',
  );
  assert.equal(meta.openGraph?.url, 'https://cleylawyerlegal.com/derecho-penal');
  assert.equal(meta.openGraph?.type, 'article');
});
