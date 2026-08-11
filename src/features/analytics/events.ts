export const ANALYTICS_EVENTS = {
  audioComplete: 'audio_complete',
  audioChapterSelect: 'audio_chapter_select',
  audioGateAction: 'audio_gate_action',
  audioGateOpen: 'audio_gate_open',
  audioNext: 'audio_next',
  audioPause: 'audio_pause',
  audioPlay: 'audio_play',
  audioPrevious: 'audio_previous',
  audioProgress: 'audio_progress',
  audioSeek: 'audio_seek',
  audioSessionEnd: 'audio_session_end',
  authorBioExpand: 'author_bio_expand',
  contactFormStart: 'contact_form_start',
  contactMailtoOpen: 'contact_mailto_open',
  contactSourceSelect: 'contact_source_select',
  contactSubmitAttempt: 'contact_submit_attempt',
  donationSupportClick: 'donation_support_click',
  introVideoClose: 'intro_video_close',
  introVideoComplete: 'intro_video_complete',
  introVideoOpen: 'intro_video_open',
  languageChange: 'language_change',
  privacyPolicyOpen: 'privacy_policy_open',
  purchaseDialogOpen: 'purchase_dialog_open',
  purchaseStoreClick: 'purchase_store_click',
  sectionView: 'section_view',
  spotifyClick: 'spotify_click',
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsEventValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type AnalyticsEventParams = Record<string, AnalyticsEventValue>;
