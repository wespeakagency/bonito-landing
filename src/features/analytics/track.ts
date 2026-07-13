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

export function trackAudioPause(chapterId: number, chapterTitle: string, locale: string) {
  trackEvent(ANALYTICS_EVENTS.audioPause, {
    chapter_id: chapterId,
    chapter_title: chapterTitle,
    locale,
  });
}

export function trackAudioComplete(
  chapterId: number,
  chapterTitle: string,
  locale: string
) {
  trackEvent(ANALYTICS_EVENTS.audioComplete, {
    chapter_id: chapterId,
    chapter_title: chapterTitle,
    locale,
  });
}

export function trackAudioGateOpen(chapterId: number | undefined, locale: string) {
  trackEvent(ANALYTICS_EVENTS.audioGateOpen, {
    chapter_id: chapterId,
    locale,
  });
}

export function trackAudioGateAction(
  action: 'listen' | 'support' | 'close',
  chapterId: number | undefined,
  locale: string
) {
  trackEvent(ANALYTICS_EVENTS.audioGateAction, {
    action,
    chapter_id: chapterId,
    locale,
  });
}

export function trackAudioProgress(
  chapterId: number,
  chapterTitle: string,
  locale: string,
  milestone: 25 | 50 | 75 | 90
) {
  trackEvent(ANALYTICS_EVENTS.audioProgress, {
    chapter_id: chapterId,
    chapter_title: chapterTitle,
    locale,
    milestone,
  });
}

export function trackAudioSeek(
  chapterId: number,
  chapterTitle: string,
  locale: string,
  fromTime: number,
  toTime: number
) {
  trackEvent(ANALYTICS_EVENTS.audioSeek, {
    chapter_id: chapterId,
    chapter_title: chapterTitle,
    locale,
    from_time: Math.round(fromTime),
    to_time: Math.round(toTime),
  });
}

export function trackAudioChapterSelect(
  chapterId: number,
  chapterTitle: string,
  locale: string
) {
  trackEvent(ANALYTICS_EVENTS.audioChapterSelect, {
    chapter_id: chapterId,
    chapter_title: chapterTitle,
    locale,
  });
}

export function trackAudioNavigation(
  direction: 'next' | 'previous',
  chapterId: number | undefined,
  chapterTitle: string | undefined,
  locale: string
) {
  trackEvent(
    direction === 'next' ? ANALYTICS_EVENTS.audioNext : ANALYTICS_EVENTS.audioPrevious,
    {
      chapter_id: chapterId,
      chapter_title: chapterTitle,
      locale,
    }
  );
}

export function trackSpotifyClick(origin: string, locale: string, destinationUrl: string) {
  trackEvent(ANALYTICS_EVENTS.spotifyClick, {
    origin,
    locale,
    destination_url: destinationUrl,
  });
}

export function trackContactFormStart(locale: string) {
  trackEvent(ANALYTICS_EVENTS.contactFormStart, { locale });
}

export function trackContactSourceSelect(locale: string, source: string) {
  trackEvent(ANALYTICS_EVENTS.contactSourceSelect, {
    locale,
    source,
  });
}

export function trackContactSubmitAttempt(locale: string, source?: string) {
  trackEvent(ANALYTICS_EVENTS.contactSubmitAttempt, {
    locale,
    source,
  });
}

export function trackContactMailtoOpen(locale: string, source?: string) {
  trackEvent(ANALYTICS_EVENTS.contactMailtoOpen, {
    locale,
    source,
  });
}

export function trackIntroVideoOpen(locale: string) {
  trackEvent(ANALYTICS_EVENTS.introVideoOpen, { locale });
}

export function trackIntroVideoComplete(locale: string) {
  trackEvent(ANALYTICS_EVENTS.introVideoComplete, { locale });
}

export function trackIntroVideoClose(locale: string) {
  trackEvent(ANALYTICS_EVENTS.introVideoClose, { locale });
}
