'use client';

import { useEffect, useRef } from 'react';
import { trackSxoEvent } from '@/lib/analytics';

interface PracticeAreaViewTrackerProps {
  slug: string;
  serviceArea: string;
}

export function PracticeAreaViewTracker({
  slug,
  serviceArea,
}: PracticeAreaViewTrackerProps) {
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (trackedRef.current === slug) return;
    trackedRef.current = slug;
    trackSxoEvent('practice_area_view', {
      slug,
      service_area: serviceArea,
    });
  }, [slug, serviceArea]);

  return null;
}
