'use client';

import { OPEN_PRIVACY_PREFERENCES_EVENT } from '@/lib/privacy-consent';

export function CookiePreferencesTrigger() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(OPEN_PRIVACY_PREFERENCES_EVENT));
      }}
      className="text-[#EEEEEE]/85 hover:text-[#F2C45D] transition-colors text-left cursor-pointer"
    >
      Privacidad y cookies
    </button>
  );
}
