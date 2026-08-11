import { META_PIXEL_ENABLED } from '@/config/analytics';
import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
  type AnalyticsEventParams,
} from '@/features/analytics/events';

type MetaStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'CompleteRegistration'
  | 'Search'
  | 'AddToCart'
  | 'Donate';

type FbqOptions = {
  eventID?: string;
};

type FbqFunction = (
  command: 'track' | 'trackCustom' | 'init',
  eventName: string,
  params?: Record<string, unknown>,
  options?: FbqOptions
) => void;

function generateEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

const EVENT_MAP: Partial<
  Record<
    AnalyticsEventName,
    {
      event: MetaStandardEvent;
      buildParams?: (params: AnalyticsEventParams) => Record<string, unknown>;
    }
  >
> = {
  [ANALYTICS_EVENTS.purchaseDialogOpen]: {
    event: 'AddToCart',
    buildParams: (params) => ({
      content_category: 'book_purchase',
      origin: params.origin,
    }),
  },
  [ANALYTICS_EVENTS.purchaseStoreClick]: {
    event: 'InitiateCheckout',
    buildParams: (params) => ({
      content_name: params.store_name,
      content_category: params.store_type,
      origin: params.origin,
    }),
  },
  [ANALYTICS_EVENTS.contactFormStart]: {
    event: 'Lead',
    buildParams: (params) => ({
      content_category: 'contact_form',
      locale: params.locale,
    }),
  },
  [ANALYTICS_EVENTS.contactSubmitAttempt]: {
    event: 'Lead',
    buildParams: (params) => ({
      content_category: 'contact_submit',
      source: params.source,
      locale: params.locale,
    }),
  },
  [ANALYTICS_EVENTS.contactMailtoOpen]: {
    event: 'Contact',
    buildParams: (params) => ({
      source: params.source,
      locale: params.locale,
    }),
  },
  [ANALYTICS_EVENTS.audioPlay]: {
    event: 'ViewContent',
    buildParams: (params) => ({
      content_type: 'audio_chapter',
      content_ids: [String(params.chapter_id ?? '')],
      content_name: params.chapter_title,
    }),
  },
  [ANALYTICS_EVENTS.audioComplete]: {
    event: 'ViewContent',
    buildParams: (params) => ({
      content_type: 'audio_chapter_complete',
      content_ids: [String(params.chapter_id ?? '')],
      content_name: params.chapter_title,
    }),
  },
  [ANALYTICS_EVENTS.introVideoOpen]: {
    event: 'ViewContent',
    buildParams: (params) => ({
      content_type: 'intro_video',
      locale: params.locale,
    }),
  },
  [ANALYTICS_EVENTS.introVideoComplete]: {
    event: 'ViewContent',
    buildParams: (params) => ({
      content_type: 'intro_video_complete',
      locale: params.locale,
    }),
  },
  [ANALYTICS_EVENTS.donationSupportClick]: {
    event: 'Donate',
    buildParams: (params) => ({
      content_category: 'audiobook_gate',
      chapter_id: params.chapter_id,
      locale: params.locale,
    }),
  },
  [ANALYTICS_EVENTS.authorBioExpand]: {
    event: 'ViewContent',
    buildParams: (params) => ({
      content_type: 'author_bio',
      locale: params.locale,
    }),
  },
  [ANALYTICS_EVENTS.spotifyClick]: {
    event: 'ViewContent',
    buildParams: (params) => ({
      content_type: 'spotify_outbound',
      content_name: params.origin,
      destination_url: params.destination_url,
    }),
  },
};

const AUDIO_HIGH_ENGAGEMENT_THRESHOLD = 75;

export function trackFbEvent(
  event: MetaStandardEvent,
  params?: Record<string, unknown>
) {
  if (!META_PIXEL_ENABLED || typeof window === 'undefined' || !window.fbq) {
    return;
  }

  window.fbq('track', event, params, { eventID: generateEventId() });
}

export function trackFbCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (!META_PIXEL_ENABLED || typeof window === 'undefined' || !window.fbq) {
    return;
  }

  window.fbq('trackCustom', eventName, params, { eventID: generateEventId() });
}

function dispatchAudioHighEngagement(params: AnalyticsEventParams) {
  const percent = Number(params.percent_complete);
  if (!Number.isFinite(percent) || percent < AUDIO_HIGH_ENGAGEMENT_THRESHOLD) {
    return;
  }

  trackFbCustomEvent('AudioHighEngagement', {
    content_type: 'audio_chapter',
    content_ids: [String(params.chapter_id ?? '')],
    content_name: params.chapter_title,
    percent_complete: percent,
    current_time: params.current_time,
    duration: params.duration,
    locale: params.locale,
  });
}

export function dispatchToMetaPixel(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams
) {
  if (eventName === ANALYTICS_EVENTS.audioSessionEnd) {
    dispatchAudioHighEngagement(params);
    return;
  }

  const mapping = EVENT_MAP[eventName];

  if (!mapping) {
    return;
  }

  const eventParams = mapping.buildParams ? mapping.buildParams(params) : undefined;
  trackFbEvent(mapping.event, eventParams);
}
