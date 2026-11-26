'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import {
  buildConsentRecord,
  clearOptionalAnalyticsCookies,
  formatConsentTimestamp,
  isOptionalCategoryEnabled,
  OPEN_PRIVACY_PREFERENCES_EVENT,
  parseStoredConsent,
  PRIVACY_CONSENT_CHANGE_EVENT,
  PRIVACY_CONSENT_POLICY_VERSION,
  readBrowserConsentRaw,
  writeBrowserConsentRecord,
  type PrivacyConsentRecord,
} from '@/lib/privacy-consent';

interface AnalyticsConsentManagerProps {
  measurementId: string | null;
  gtmId?: string | null;
  clarityId?: string | null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function subscribeConsent(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(PRIVACY_CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(PRIVACY_CONSENT_CHANGE_EVENT, callback);
  };
}

function getClientSnapshot(): string | null {
  return readBrowserConsentRaw();
}

function getServerSnapshot(): string {
  return '__ssr__';
}

export function AnalyticsConsentManager({
  measurementId,
  gtmId = null,
  clarityId = null,
}: AnalyticsConsentManagerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [configOpen, setConfigOpen] = useState(false);
  const [draftFunctional, setDraftFunctional] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const bannerRef = useRef<HTMLElement | null>(null);

  const hasAnyAnalytics = Boolean(measurementId || gtmId || clarityId);

  const rawSnapshot = useSyncExternalStore<string | null>(
    subscribeConsent,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isHydrated = rawSnapshot !== '__ssr__';
  const consentRecord: PrivacyConsentRecord | null = isHydrated
    ? parseStoredConsent(rawSnapshot)
    : null;

  const analyticsGranted = isOptionalCategoryEnabled(
    consentRecord,
    'analytics',
  );
  const showBanner = isHydrated && consentRecord === null && !configOpen;

  const openPreferencesModal = () => {
    setDraftFunctional(isOptionalCategoryEnabled(consentRecord, 'functional'));
    setDraftAnalytics(isOptionalCategoryEnabled(consentRecord, 'analytics'));
    setConfigOpen(true);
  };

  // Enforce analytics opt-out flag & clear optional analytics cookies when denied/unset
  useEffect(() => {
    if (!isHydrated) return;

    if (measurementId) {
      window[`ga-disable-${measurementId}`] = !analyticsGranted;
    }

    if (!analyticsGranted) {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
      if (typeof window.clarity === 'function') {
        window.clarity('consent', false);
      }
      clearOptionalAnalyticsCookies();
    } else {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
      if (typeof window.clarity === 'function') {
        window.clarity('consent', true);
      }
    }
  }, [isHydrated, analyticsGranted, measurementId]);

  // Listen for permanent footer trigger ("Privacidad y cookies")
  useEffect(() => {
    const handleOpenPreferences = () => {
      const latest = parseStoredConsent(readBrowserConsentRaw());
      setDraftFunctional(isOptionalCategoryEnabled(latest, 'functional'));
      setDraftAnalytics(isOptionalCategoryEnabled(latest, 'analytics'));
      setConfigOpen(true);
    };

    window.addEventListener(
      OPEN_PRIVACY_PREFERENCES_EVENT,
      handleOpenPreferences,
    );
    return () => {
      window.removeEventListener(
        OPEN_PRIVACY_PREFERENCES_EVENT,
        handleOpenPreferences,
      );
    };
  }, []);

  // Coordinate vertical offset on mobile so FloatingWhatsAppButton never overlaps banner
  useEffect(() => {
    const root = document.documentElement;
    if (!showBanner) {
      root.style.setProperty('--cley-cookie-mobile-offset', '0px');
      return;
    }

    const updateOffset = () => {
      const el = bannerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = Math.ceil(rect.height + 12);
      root.style.setProperty('--cley-cookie-mobile-offset', `${offset}px`);
    };

    updateOffset();
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updateOffset())
        : null;
    if (observer && bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    window.addEventListener('resize', updateOffset);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateOffset);
      root.style.setProperty('--cley-cookie-mobile-offset', '0px');
    };
  }, [showBanner]);

  // Close preferences modal on Escape
  useEffect(() => {
    if (!configOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setConfigOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [configOpen]);

  if (!isHydrated) {
    return null;
  }

  const applyRecord = (record: PrivacyConsentRecord) => {
    writeBrowserConsentRecord(record);
    setConfigOpen(false);

    if (measurementId) {
      window[`ga-disable-${measurementId}`] = !record.categories.analytics;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: record.categories.analytics ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }

    if (typeof window.clarity === 'function') {
      window.clarity('consent', record.categories.analytics);
    }

    if (!record.categories.analytics) {
      clearOptionalAnalyticsCookies();
    }
  };

  const handleAcceptAll = () => {
    applyRecord(buildConsentRecord({ decision: 'accepted_all' }));
  };

  const handleRejectAll = () => {
    applyRecord(buildConsentRecord({ decision: 'rejected_all' }));
  };

  const handleSaveCustom = () => {
    applyRecord(
      buildConsentRecord({
        decision: 'custom',
        functional: draftFunctional,
        analytics: draftAnalytics,
      }),
    );
  };

  const hasPreviouslyGrantedOptional = Boolean(
    consentRecord &&
      (consentRecord.categories.functional ||
        consentRecord.categories.analytics),
  );

  return (
    <>
      {/* Optional analytics scripts remain strictly blocked until explicit analytics consent */}
      {analyticsGranted && hasAnyAnalytics && (
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

      {/* Compact Floating Privacy Notice */}
      {showBanner && (
        <motion.aside
          ref={bannerRef}
          aria-label="Aviso de privacidad y cookies"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 sm:bottom-5 sm:left-6 sm:right-24 md:right-auto md:w-[680px] md:max-w-[calc(100vw-8.5rem)] z-[45] rounded-xl bg-[#080808] text-[#FFFFFF] border border-[#D99A19]/45 p-3.5 sm:px-4 sm:py-3.5 shadow-[0_14px_38px_rgba(8,8,8,0.42)]"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <ShieldCheck
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#D99A19] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="space-y-1 min-w-0">
                <p className="text-xs text-[#FFFFFF]/90 leading-snug sm:leading-relaxed">
                  Tu privacidad es importante. Utilizamos cookies necesarias para
                  el funcionamiento del sitio y, con tu autorización, otras
                  tecnologías para mejorar tu experiencia.
                </p>

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-[#FFFFFF]/75">
                  <Link
                    href="/politica-de-cookies"
                    className="text-[#F2C45D] underline underline-offset-4 hover:text-[#FFFFFF] transition-colors"
                  >
                    Política de cookies
                  </Link>
                  <span aria-hidden="true">·</span>
                  <Link
                    href="/politica-de-privacidad"
                    className="text-[#F2C45D] underline underline-offset-4 hover:text-[#FFFFFF] transition-colors"
                  >
                    Política de privacidad
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 md:flex md:items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-3 sm:px-3.5 py-2 rounded-lg bg-[#D99A19] text-[#FFFFFF] text-xs font-semibold hover:bg-[#F2C45D] hover:text-[#080808] transition-colors cursor-pointer min-h-[38px] whitespace-nowrap"
              >
                Aceptar
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className="px-3 sm:px-3.5 py-2 rounded-lg bg-[#171717] border border-[#FFFFFF]/25 text-[#FFFFFF] text-xs font-medium hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors cursor-pointer min-h-[38px] whitespace-nowrap"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={openPreferencesModal}
                className="px-2.5 sm:px-3.5 py-2 rounded-lg border border-[#D99A19]/50 text-[#F2C45D] text-xs font-medium hover:bg-[#171717] hover:border-[#F2C45D] transition-colors cursor-pointer min-h-[38px] whitespace-nowrap"
              >
                Configurar
              </button>
            </div>
          </div>
        </motion.aside>
      )}

      {/* Granular Privacy & Cookies Configuration Modal */}
      {configOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-50 bg-[#080808]/80 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setConfigOpen(false);
            }
          }}
        >
          <motion.div
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#080808] text-[#FFFFFF] border border-[#D99A19]/55 shadow-[0_20px_50px_rgba(0,0,0,0.65)] p-5 sm:p-7 relative"
          >
            <button
              type="button"
              onClick={() => setConfigOpen(false)}
              aria-label="Cerrar configuración de privacidad"
              className="absolute top-4 right-4 w-9 h-9 rounded-lg border border-[#FFFFFF]/20 text-[#FFFFFF] flex items-center justify-center hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="pr-10 space-y-2">
              <div className="flex items-center gap-2.5 text-[#F2C45D]">
                <SlidersHorizontal className="w-4 h-4 shrink-0" aria-hidden="true" />
                <h2
                  id="cookie-preferences-title"
                  className="font-serif text-xl sm:text-2xl font-semibold text-[#F2C45D]"
                >
                  Privacidad y cookies
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#FFFFFF]/85 leading-relaxed">
                Administra tu consentimiento por categoría. Las tecnologías
                opcionales permanecen desactivadas y bloqueadas hasta recibir tu
                autorización expresa.
              </p>
            </div>

            {/* Saved decision status */}
            <div className="mt-4 rounded-lg bg-[#171717] border border-[#FFFFFF]/10 px-3.5 py-2.5 text-xs text-[#FFFFFF]/80 flex flex-wrap items-center justify-between gap-2">
              <span>
                {consentRecord ? (
                  <>
                    Estado guardado:{' '}
                    <strong className="text-[#FFFFFF]">
                      {formatConsentTimestamp(consentRecord.timestamp)}
                    </strong>
                  </>
                ) : (
                  'Estado actual: sin autorización de categorías opcionales.'
                )}
              </span>
              <span className="text-[#F2C45D] tabular-nums">
                Versión {PRIVACY_CONSENT_POLICY_VERSION}
              </span>
            </div>

            {/* Categories */}
            <div className="mt-5 space-y-3">
              {/* 1. Necessary */}
              <div className="rounded-lg bg-[#171717] border border-[#D99A19]/30 p-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#FFFFFF]">
                      Cookies necesarias
                    </h3>
                    <span className="text-[11px] font-medium text-[#F2C45D]">
                      · Siempre activas
                    </span>
                  </div>
                  <p className="text-xs text-[#FFFFFF]/75 leading-relaxed">
                    Almacenamiento técnico esencial para el funcionamiento del
                    sitio, seguridad de navegación y conservación de tu decisión
                    de privacidad.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked="true"
                  aria-label="Cookies necesarias (siempre activas)"
                  disabled
                  className="shrink-0 mt-0.5 w-11 h-6 rounded-full bg-[#D99A19] p-0.5 flex items-center justify-end opacity-90 cursor-not-allowed"
                >
                  <span className="w-5 h-5 rounded-full bg-[#080808] shadow-sm" />
                </button>
              </div>

              {/* 2. Functional */}
              <div className="rounded-lg bg-[#171717] border border-[#FFFFFF]/12 p-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#FFFFFF]">
                      Tecnologías funcionales
                    </h3>
                    <span className="text-[11px] text-[#FFFFFF]/65">
                      · {draftFunctional ? 'Activada' : 'Desactivada'}
                    </span>
                  </div>
                  <p className="text-xs text-[#FFFFFF]/75 leading-relaxed">
                    Preferencias opcionales de experiencia en el navegador. El
                    sitio no carga complementos funcionales de terceros ni
                    utiliza técnicas de fingerprinting.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={draftFunctional}
                  aria-label="Activar tecnologías funcionales"
                  onClick={() => setDraftFunctional((prev) => !prev)}
                  className={`shrink-0 mt-0.5 w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                    draftFunctional
                      ? 'bg-[#D99A19] justify-end'
                      : 'bg-[#080808] border border-[#FFFFFF]/30 justify-start'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full transition-colors ${
                      draftFunctional ? 'bg-[#080808]' : 'bg-[#FFFFFF]/80'
                    }`}
                  />
                </button>
              </div>

              {/* 3. Analytics */}
              <div className="rounded-lg bg-[#171717] border border-[#FFFFFF]/12 p-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#FFFFFF]">
                      Analíticas y medición
                    </h3>
                    <span className="text-[11px] text-[#FFFFFF]/65">
                      · {draftAnalytics ? 'Activada' : 'Desactivada'}
                    </span>
                  </div>
                  <p className="text-xs text-[#FFFFFF]/75 leading-relaxed">
                    Medición estadística agregada (Google Analytics 4, Google
                    Tag Manager o Microsoft Clarity cuando estén habilitados).
                    Ningún script de medición se ejecuta sin tu autorización.{' '}
                    {hasAnyAnalytics
                      ? 'Identificadores oficiales configurados y sujetos a esta elección.'
                      : 'Actualmente no hay rastreadores estadísticos activos en este entorno.'}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={draftAnalytics}
                  aria-label="Activar cookies analíticas y medición"
                  onClick={() => setDraftAnalytics((prev) => !prev)}
                  className={`shrink-0 mt-0.5 w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                    draftAnalytics
                      ? 'bg-[#D99A19] justify-end'
                      : 'bg-[#080808] border border-[#FFFFFF]/30 justify-start'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full transition-colors ${
                      draftAnalytics ? 'bg-[#080808]' : 'bg-[#FFFFFF]/80'
                    }`}
                  />
                </button>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-[#FFFFFF]/70 leading-relaxed">
              Este sitio no utiliza cookies publicitarias ni retargeting
              comercial. Consulta nuestras políticas:{' '}
              <Link
                href="/politica-de-cookies"
                onClick={() => setConfigOpen(false)}
                className="text-[#F2C45D] underline underline-offset-4 hover:text-[#FFFFFF]"
              >
                Política de cookies
              </Link>
              ,{' '}
              <Link
                href="/politica-de-privacidad"
                onClick={() => setConfigOpen(false)}
                className="text-[#F2C45D] underline underline-offset-4 hover:text-[#FFFFFF]"
              >
                Política de privacidad
              </Link>{' '}
              y{' '}
              <Link
                href="/aviso-legal"
                onClick={() => setConfigOpen(false)}
                className="text-[#F2C45D] underline underline-offset-4 hover:text-[#FFFFFF]"
              >
                Aviso legal
              </Link>
              .
            </p>

            <div className="mt-5 pt-4 border-t border-[#FFFFFF]/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <button
                type="button"
                onClick={handleRejectAll}
                className="px-4 py-2.5 rounded-lg bg-[#171717] border border-[#FFFFFF]/25 text-[#FFFFFF] text-xs font-medium hover:border-[#F2C45D] hover:text-[#F2C45D] transition-colors cursor-pointer"
              >
                {hasPreviouslyGrantedOptional
                  ? 'Retirar consentimiento'
                  : 'Rechazar opcionales'}
              </button>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-4 py-2.5 rounded-lg border border-[#D99A19] text-[#F2C45D] text-xs font-semibold hover:bg-[#171717] transition-colors cursor-pointer"
                >
                  Guardar preferencias
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-lg bg-[#D99A19] text-[#FFFFFF] text-xs font-semibold hover:bg-[#F2C45D] hover:text-[#080808] transition-colors cursor-pointer"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
