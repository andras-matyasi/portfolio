// Google Analytics implementation
// This file provides functions for Google Analytics integration with graceful degradation

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-KCL2J8WB7Y';

// Type declaration for gtag and custom properties
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gaLoaded?: boolean;
    gaLoadError?: boolean;
  }
}

// Safe analytics wrapper that works even when GA is blocked
const safeAnalytics = {
  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return window.gaLoaded === true && typeof window.gtag === 'function';
  },

  call(method: string, ...args: any[]): boolean {
    try {
      if (this.isAvailable()) {
        window.gtag(method, ...args);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
};

// Simple, non-blocking analytics functions
export const testAnalytics = async (): Promise<boolean> => {
  if (!safeAnalytics.isAvailable()) {
    return false;
  }
  
  return safeAnalytics.call('event', 'analytics_test', {
    'test_id': Date.now().toString(),
    'timestamp': new Date().toISOString()
  });
};

// Track an event - non-blocking
export const trackEvent = async (eventName: string, eventParams: Record<string, any> = {}): Promise<boolean> => {
  if (safeAnalytics.isAvailable()) {
    console.log('Tracking event:', eventName, eventParams);
    return safeAnalytics.call('event', eventName, eventParams);
  }
  return false;
};

// Track a page view - non-blocking
export const trackPageView = async (path: string): Promise<boolean> => {
  if (safeAnalytics.isAvailable()) {
    console.log('Tracking page view:', path);
    
    // Send page view event
    safeAnalytics.call('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title
    });
    
    // Update config
    safeAnalytics.call('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_location: window.location.href
    });
    
    return true;
  }
  return false;
};

// Identify a user - non-blocking
export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  if (safeAnalytics.isAvailable()) {
    safeAnalytics.call('set', { 'user_id': userId });
    safeAnalytics.call('set', 'user_properties', userProperties);
    return true;
  }
  return false;
};

// Reset tracking - non-blocking
export const resetTracking = () => {
  if (safeAnalytics.isAvailable()) {
    safeAnalytics.call('config', GA_MEASUREMENT_ID, { send_page_view: false });
    return true;
  }
  return false;
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