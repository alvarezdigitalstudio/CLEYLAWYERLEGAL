'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { calculateReadingProgress } from '@/lib/legal-logic';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const nextProgress = calculateReadingProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      setProgress(nextProgress);
      setShowTopBtn(window.scrollY > 480);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        role="progressbar"
        aria-label="Progreso de lectura"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-[#D99A19] to-[#F2C45D] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="fixed bottom-[calc(5.25rem+var(--cley-cookie-mobile-offset,0px))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-24 sm:right-6 z-30 w-11 h-11 bg-[#080808] text-[#F2C45D] border border-[#D99A19]/60 flex items-center justify-center hover:bg-[#D99A19] hover:text-[#FFFFFF] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
