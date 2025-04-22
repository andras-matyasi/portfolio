// Google Analytics implementation
// This file provides functions for Google Analytics integration

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-KCL2J8WB7Y';

// Type declaration for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Check if GA is loaded and available
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.gtag;
};

// Track an event
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  try {
    if (isGAAvailable()) {
      console.log('Tracking event:', eventName, eventParams);
      window.gtag('event', eventName, eventParams);
      return true;
    } else {
      console.warn('Google Analytics not available for event:', eventName);
      return false;
    }
  } catch (error) {
    console.error('Analytics error when tracking event:', error);
    return false;
  }
};

// Track a page view
export const trackPageView = (path: string) => {
  try {
    if (isGAAvailable()) {
      console.log('Tracking page view:', path);
      window.gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title
      });
      
      // Also set the config for this pageview
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path
      });
      return true;
    } else {
      console.warn('Google Analytics not available for page view:', path);
      return false;
    }
  } catch (error) {
    console.error('Analytics error when tracking page view:', error);
    return false;
  }
};

// Identify a user
export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  try {
    if (isGAAvailable()) {
      console.log('Setting user ID:', userId);
      // Set user ID for the current session
      window.gtag('set', {
        'user_id': userId
      });
      
      // Set additional user properties
      window.gtag('set', 'user_properties', {
        ...userProperties
      });
      return true;
    } else {
      console.warn('Google Analytics not available for user identification');
      return false;
    }
  } catch (error) {
    console.error('Analytics error when identifying user:', error);
    return false;
  }
};

// Reset tracking
export const resetTracking = () => {
  try {
    if (isGAAvailable()) {
      console.log('Resetting tracking data');
      // Since GA4 doesn't have a direct reset method, we create a new session
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false
      });
      return true;
    } else {
      console.warn('Google Analytics not available for reset');
      return false;
    }
  } catch (error) {
    console.error('Analytics error when resetting:', error);
    return false;
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