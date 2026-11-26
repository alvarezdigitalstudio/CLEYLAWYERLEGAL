import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildConsentRecord,
  createDefaultCategories,
  formatConsentTimestamp,
  isOptionalCategoryEnabled,
  parseStoredConsent,
  PRIVACY_CONSENT_POLICY_VERSION,
} from './privacy-consent';

test('default consent categories keep optional categories disabled', () => {
  const defaults = createDefaultCategories();
  assert.deepEqual(defaults, {
    necessary: true,
    functional: false,
    analytics: false,
  });
});

test('buildConsentRecord constructs accepted, rejected, and custom decisions with version and timestamp', () => {
  const fixedDate = new Date('2026-11-26T17:10:00.000Z');

  const accepted = buildConsentRecord({
    decision: 'accepted_all',
    now: fixedDate,
  });
  assert.equal(accepted.version, PRIVACY_CONSENT_POLICY_VERSION);
  assert.equal(accepted.timestamp, '2026-11-26T17:10:00.000Z');
  assert.deepEqual(accepted.categories, {
    necessary: true,
    functional: true,
    analytics: true,
  });

  const rejected = buildConsentRecord({
    decision: 'rejected_all',
    functional: true,
    analytics: true,
    now: fixedDate,
  });
  assert.deepEqual(rejected.categories, {
    necessary: true,
    functional: false,
    analytics: false,
  });

  const custom = buildConsentRecord({
    decision: 'custom',
    functional: false,
    analytics: true,
    now: fixedDate,
  });
  assert.deepEqual(custom.categories, {
    necessary: true,
    functional: false,
    analytics: true,
  });
});

test('parseStoredConsent validates schema, types, and policy version strictly', () => {
  const valid = buildConsentRecord({
    decision: 'custom',
    functional: true,
    analytics: false,
    now: new Date('2026-11-26T17:10:00.000Z'),
  });

  const parsed = parseStoredConsent(JSON.stringify(valid));
  assert.deepEqual(parsed, valid);

  assert.equal(parseStoredConsent(null), null);
  assert.equal(parseStoredConsent('not-json'), null);
  assert.equal(
    parseStoredConsent(JSON.stringify({ ...valid, version: '2025-01-old' })),
    null,
  );
  assert.equal(
    parseStoredConsent(
      JSON.stringify({
        ...valid,
        categories: { necessary: false, functional: true, analytics: false },
      }),
    ),
    null,
  );
  assert.equal(
    parseStoredConsent(JSON.stringify({ ...valid, timestamp: 'invalid-date' })),
    null,
  );
});

test('isOptionalCategoryEnabled remains false before consent and after withdrawal', () => {
  assert.equal(isOptionalCategoryEnabled(null, 'analytics'), false);
  assert.equal(isOptionalCategoryEnabled(null, 'functional'), false);

  const granted = buildConsentRecord({ decision: 'accepted_all' });
  assert.equal(isOptionalCategoryEnabled(granted, 'analytics'), true);
  assert.equal(isOptionalCategoryEnabled(granted, 'functional'), true);

  const withdrawn = buildConsentRecord({ decision: 'rejected_all' });
  assert.equal(isOptionalCategoryEnabled(withdrawn, 'analytics'), false);
  assert.equal(isOptionalCategoryEnabled(withdrawn, 'functional'), false);
});

test('formatConsentTimestamp renders readable output without throwing', () => {
  const formatted = formatConsentTimestamp('2026-11-26T17:10:00.000Z');
  assert.ok(formatted.length > 0);
  assert.equal(formatConsentTimestamp('invalid'), 'invalid');
});
