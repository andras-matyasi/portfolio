// Google Analytics implementation
// This file provides functions for Google Analytics integration

// Type declaration for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Track an event
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  try {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Track a page view
export const trackPageView = (path: string) => {
  try {
    if (window.gtag) {
      window.gtag('config', 'G-KCL2J8WB7Y', {
        page_path: path
      });
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Identify a user
export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  try {
    if (window.gtag) {
      window.gtag('set', 'user_properties', {
        user_id: userId,
        ...userProperties
      });
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Reset tracking
export const resetTracking = () => {
  try {
    // GA4 doesn't have a direct method to reset user identification
    // This is a placeholder for compatibility
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Export a service object with all methods for API compatibility
const AnalyticsService = {
  trackEvent,
  trackPageView,
  identifyUser,
  reset: resetTracking,
  track: trackEvent,
  identify: identifyUser,
  people: {
    set: (props: Record<string, any>) => {
      if (window.gtag) {
        window.gtag('set', 'user_properties', props);
      }
    },
    increment: () => {}, // GA4 handles this differently
    append: () => {}, // GA4 handles this differently
    track_charge: () => {}, // GA4 handles this differently
    clear_charges: () => {}, // GA4 handles this differently
    set_once: () => {}, // GA4 handles this differently
    union: () => {}, // GA4 handles this differently
    unset: () => {}, // GA4 handles this differently
    remove: () => {} // GA4 handles this differently
  },
  init: () => {
    // GA4 is already initialized via the script in index.html
  }
};

export default AnalyticsService;