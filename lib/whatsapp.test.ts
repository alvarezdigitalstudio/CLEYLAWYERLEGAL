import test from 'node:test';
import assert from 'node:assert/strict';
import { BRAND_INFO } from './legal-data';
import {
  buildFloatingWhatsAppHref,
  extractWhatsAppDigits,
  FLOATING_WHATSAPP_DEFAULT_MESSAGE,
} from './whatsapp';

test('extractWhatsAppDigits parses official wa.me URL and phone display cleanly', () => {
  assert.equal(extractWhatsAppDigits(BRAND_INFO.whatsappUrl), '50764971468');
  assert.equal(extractWhatsAppDigits(BRAND_INFO.phoneDisplay), '50764971468');
  assert.equal(extractWhatsAppDigits(''), null);
  assert.equal(extractWhatsAppDigits(undefined), null);
  assert.equal(extractWhatsAppDigits('123'), null);
});

test('buildFloatingWhatsAppHref builds official international wa.me link with encoded greeting', () => {
  const href = buildFloatingWhatsAppHref(BRAND_INFO.whatsappUrl);
  assert.ok(href);
  assert.equal(
    href,
    `https://wa.me/50764971468?text=${encodeURIComponent(FLOATING_WHATSAPP_DEFAULT_MESSAGE)}`,
  );
  assert.equal(buildFloatingWhatsAppHref(''), null);
  assert.equal(buildFloatingWhatsAppHref(null), null);
});
