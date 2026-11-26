'use client';

import { getClarityId, getGtmId } from '@/lib/analytics';
import { getGaMeasurementId } from '@/lib/seo-config';

export function CookiePreferencesTrigger() {
  const gaId = getGaMeasurementId({
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  });
  const gtmId = getGtmId({
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  });
  const clarityId = getClarityId({
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  });

  if (!gaId && !gtmId && !clarityId) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent('cleylawyerlegal:open-cookie-preferences'),
        );
      }}
      className="text-[#EEEEEE]/85 hover:text-[#F2C45D] transition-colors text-left cursor-pointer"
    >
      Preferencias de analítica
    </button>
  );
}
