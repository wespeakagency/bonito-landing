import { pushToDataLayer } from '@/features/analytics/data-layer';
import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
  type AnalyticsEventParams,
} from '@/features/analytics/events';

export function trackEvent<TEventName extends AnalyticsEventName>(
  event: TEventName,
  params: AnalyticsEventParams = {}
) {
  pushToDataLayer({
    event,
    ...params,
  });
}

export function trackSectionView(sectionName: string, locale: string) {
  trackEvent(ANALYTICS_EVENTS.sectionView, {
    section_name: sectionName,
    locale,
  });
}

export function trackLanguageChange(fromLocale: string, toLocale: string) {
  trackEvent(ANALYTICS_EVENTS.languageChange, {
    from_locale: fromLocale,
    to_locale: toLocale,
  });
}

export function trackPurchaseDialogOpen(origin: string, locale: string) {
  trackEvent(ANALYTICS_EVENTS.purchaseDialogOpen, {
    origin,
    locale,
  });
}

export function trackPurchaseStoreClick(
  origin: string,
  storeName: string,
  storeType: string,
  locale: string
) {
  trackEvent(ANALYTICS_EVENTS.purchaseStoreClick, {
    origin,
    store_name: storeName,
    store_type: storeType,
    locale,
  });
}

export function trackAudioPlay(chapterId: number, chapterTitle: string, locale: string) {
  trackEvent(ANALYTICS_EVENTS.audioPlay, {
    chapter_id: chapterId,
    chapter_title: chapterTitle,
    locale,
  });
}
