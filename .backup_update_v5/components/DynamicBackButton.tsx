'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { resolveBackDestination } from '@/lib/legal-logic';

export function DynamicBackButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get('from');
  const navInfo = resolveBackDestination({ fromParam });

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const resolved = resolveBackDestination({
      fromParam,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    });

    if (
      resolved.useHistoryBack &&
      typeof window !== 'undefined' &&
      window.history.length > 1
    ) {
      event.preventDefault();
      router.back();
    }
  };

  return (
    <Link
      href={navInfo.href}
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#080808] text-[#FFFFFF] border border-[#D99A19] text-[11px] sm:text-xs font-semibold tracking-wider hover:bg-[#D99A19] transition-colors shadow-sm"
    >
      <ArrowLeft className="w-3.5 h-3.5 text-[#F2C45D]" aria-hidden="true" />
      <span>{navInfo.label}</span>
    </Link>
  );
}
