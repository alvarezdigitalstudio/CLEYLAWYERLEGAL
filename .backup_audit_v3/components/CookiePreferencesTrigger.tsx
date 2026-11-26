'use client';

import { getGaMeasurementId } from '@/lib/seo-config';

export function CookiePreferencesTrigger() {
  const gaId = getGaMeasurementId({
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  });

  if (!gaId) {
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
