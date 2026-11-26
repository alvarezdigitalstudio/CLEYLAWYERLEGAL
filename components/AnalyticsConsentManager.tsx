'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck } from 'lucide-react';

interface AnalyticsConsentManagerProps {
  measurementId: string | null;
  gtmId?: string | null;
  clarityId?: string | null;
}

type ConsentDecision = 'granted' | 'denied' | 'unset';

const CONSENT_STORAGE_KEY = 'cleylawyerlegal_ga_consent_v1';
const CONSENT_CHANGE_EVENT = 'cleylawyerlegal:consent-change';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function subscribeConsent(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

function getClientConsentSnapshot(): ConsentDecision {
  try {
    const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved === 'granted' || saved === 'denied') {
      return saved;
    }
  } catch {
    // Ignore storage restrictions
  }
  return 'unset';
}

function getServerConsentSnapshot(): ConsentDecision | 'ssr' {
  return 'ssr';
}

export function AnalyticsConsentManager({
  measurementId,
  gtmId = null,
  clarityId = null,
}: AnalyticsConsentManagerProps) {
  const [bannerForcedOpen, setBannerForcedOpen] = useState(false);
  const hasAnyAnalytics = Boolean(measurementId || gtmId || clarityId);

  const consentState = useSyncExternalStore<ConsentDecision | 'ssr'>(
    subscribeConsent,
    getClientConsentSnapshot,
    getServerConsentSnapshot,
  );

  useEffect(() => {
    if (!hasAnyAnalytics) return;

    const handleOpenPreferences = () => {
      setBannerForcedOpen(true);
    };

    window.addEventListener(
      'cleylawyerlegal:open-cookie-preferences',
      handleOpenPreferences,
    );
    return () => {
      window.removeEventListener(
        'cleylawyerlegal:open-cookie-preferences',
        handleOpenPreferences,
      );
    };
  }, [hasAnyAnalytics]);

  if (!hasAnyAnalytics || consentState === 'ssr') {
    return null;
  }

  const saveDecision = (choice: 'granted' | 'denied') => {
    setBannerForcedOpen(false);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Ignore storage access restrictions
    }
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT));

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: choice,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }

    if (typeof window.clarity === 'function') {
      window.clarity('consent', choice === 'granted');
    }
  };

  const showBanner = consentState === 'unset' || bannerForcedOpen;

  return (
    <>
      {consentState === 'granted' && (
        <>
          {measurementId && (
            <>
              <Script
                id="ga4-loader"
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('consent', 'default', {
                    analytics_storage: 'granted',
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied'
                  });
                  gtag('js', new Date());
                  gtag('config', '${measurementId}', {
                    anonymize_ip: true,
                    allow_google_signals: false,
                    allow_ad_personalization_signals: false
                  });
                `}
              </Script>
            </>
          )}

          {gtmId && (
            <Script id="gtm-loader" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });
                (function(w,d,s,l,i){
                  var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),
                      dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;
                  j.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(i)+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `}
            </Script>
          )}

          {clarityId && (
            <Script id="clarity-loader" strategy="afterInteractive">
              {`
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+encodeURIComponent(i);
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
                if (typeof window.clarity === 'function') {
                  window.clarity('consent', true);
                }
              `}
            </Script>
          )}
        </>
      )}

      {showBanner && (
        <aside
          aria-label="Preferencias de privacidad y analítica"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 bg-[#080808] text-[#FFFFFF] border border-[#D99A19]/60 p-5 shadow-xl"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="w-5 h-5 text-[#D99A19] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-3 text-xs sm:text-sm">
              <p className="font-serif text-base font-semibold text-[#F2C45D]">
                Privacidad y analítica web
              </p>
              <p className="text-[#EEEEEE]/90 leading-relaxed">
                Utilizamos almacenamiento técnico esencial y, únicamente con su
                consentimiento previo, medición estadística anónima para mejorar
                el sitio conforme a la Ley 81 de 2019 de Panamá. Consulte la{' '}
                <Link
                  href="/politica-de-cookies"
                  className="text-[#F2C45D] underline underline-offset-4 hover:text-[#FFFFFF]"
                >
                  Política de Cookies
                </Link>
                .
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => saveDecision('granted')}
                  className="px-4 py-2 bg-[#D99A19] text-[#FFFFFF] text-xs font-semibold hover:bg-[#F2C45D] hover:text-[#080808] transition-colors cursor-pointer"
                >
                  Aceptar analítica
                </button>
                <button
                  type="button"
                  onClick={() => saveDecision('denied')}
                  className="px-4 py-2 border border-[#555555] text-[#EEEEEE] text-xs font-medium hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors cursor-pointer"
                >
                  Solo esenciales
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
