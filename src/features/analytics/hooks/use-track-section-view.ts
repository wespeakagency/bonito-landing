'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { trackSectionView } from '@/features/analytics/track';

export function useTrackSectionView<TElement extends HTMLElement>(
  sectionName: string,
  locale: string,
  threshold = 0.35
) {
  const [element, setElement] = useState<TElement | null>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    hasTrackedRef.current = false;
  }, [locale, sectionName]);

  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedRef.current) {
          trackSectionView(sectionName, locale);
          hasTrackedRef.current = true;
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, locale, sectionName, threshold]);

  return useCallback((node: TElement | null) => {
    setElement(node);
  }, []);
}
