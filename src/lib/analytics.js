// Thin wrapper around GA4's gtag — every tracked interaction in the app calls
// this instead of touching window.gtag directly, so swapping providers later
// (or adding a second one) means changing one function, not every call site.
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
