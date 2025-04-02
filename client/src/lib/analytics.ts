// Empty analytics implementation (placeholder)
// This file provides no-op functions for analytics calls to avoid errors in the application

// No-op function that does nothing
const noopFunc = () => {};

// Export simple no-op functions with the same signatures as before
export const trackEvent = noopFunc;
export const trackPageView = noopFunc;
export const identifyUser = noopFunc;
export const resetTracking = noopFunc;

// Export a service object with all methods as no-ops to maintain API compatibility
const AnalyticsService = {
  trackEvent: noopFunc,
  trackPageView: noopFunc,
  identifyUser: noopFunc,
  reset: noopFunc,
  track: noopFunc,
  identify: noopFunc,
  people: {
    set: noopFunc,
    increment: noopFunc,
    append: noopFunc,
    track_charge: noopFunc,
    clear_charges: noopFunc,
    set_once: noopFunc,
    union: noopFunc,
    unset: noopFunc,
    remove: noopFunc
  },
  init: noopFunc
};

export default AnalyticsService;