declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export function getDataLayer() {
  if (typeof window === 'undefined') {
    return null;
  }

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function pushToDataLayer(payload: Record<string, unknown>) {
  const dataLayer = getDataLayer();

  if (!dataLayer) {
    return;
  }

  dataLayer.push(payload);
}
