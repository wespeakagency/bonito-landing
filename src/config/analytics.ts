const DEFAULT_GA_MEASUREMENT_ID = '';

export const DATA_LAYER_NAME = 'dataLayer';
export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? '';
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? DEFAULT_GA_MEASUREMENT_ID;

export const GTM_ENABLED = GTM_CONTAINER_ID.length > 0;
export const GA_FALLBACK_ENABLED = !GTM_ENABLED && GA_MEASUREMENT_ID.length > 0;
