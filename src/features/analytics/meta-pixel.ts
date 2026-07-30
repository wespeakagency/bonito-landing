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
  | 'AddToCart';

type FbqFunction = (
  command: 'track' | 'trackCustom' | 'init',
  eventName: string,
  params?: Record<string, unknown>
) => void;

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
    event: 'InitiateCheckout',
    buildParams: (params) => ({
      content_category: 'book_purchase',
      origin: params.origin,
    }),
  },
  [ANALYTICS_EVENTS.purchaseStoreClick]: {
    event: 'Purchase',
    buildParams: (params) => ({
      value: 0,
      currency: 'USD',
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
  [ANALYTICS_EVENTS.spotifyClick]: {
    event: 'ViewContent',
    buildParams: (params) => ({
      content_type: 'spotify_outbound',
      content_name: params.origin,
      destination_url: params.destination_url,
    }),
  },
};

export function trackFbEvent(
  event: MetaStandardEvent,
  params?: Record<string, unknown>
) {
  if (!META_PIXEL_ENABLED || typeof window === 'undefined' || !window.fbq) {
    return;
  }

  window.fbq('track', event, params);
}

export function dispatchToMetaPixel(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams
) {
  const mapping = EVENT_MAP[eventName];

  if (!mapping) {
    return;
  }

  const eventParams = mapping.buildParams ? mapping.buildParams(params) : undefined;
  trackFbEvent(mapping.event, eventParams);
}
