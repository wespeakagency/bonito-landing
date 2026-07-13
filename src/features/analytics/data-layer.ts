import { DATA_LAYER_NAME } from '@/config/analytics';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export function getDataLayer() {
  if (typeof window === 'undefined') {
    return null;
  }

  window[DATA_LAYER_NAME] = window[DATA_LAYER_NAME] || [];
  return window[DATA_LAYER_NAME];
}

export function pushToDataLayer(payload: Record<string, unknown>) {
  const dataLayer = getDataLayer();

  if (!dataLayer) {
    return;
  }

  dataLayer.push(payload);
}
