// Google Analytics implementation
// This file provides functions for Google Analytics integration

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

// Attempt to ensure Google Analytics is properly initialized
// This helps recover if there were loading issues
const ensureGA = (): void => {
  if (typeof window === 'undefined') return;
  
  // If GA script loading failed, we'll try one more time
  if (window.gaLoadError === true) {
    console.warn('Attempting to recover Google Analytics initialization...');
    try {
      // Check if script is already in the DOM
      const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (!existingScript) {
        console.log('Re-injecting Google Analytics script');
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);
      }
    } catch (e) {
      console.error('Recovery attempt failed:', e);
    }
  }
};

// Wait for GA to be ready with timeout
const waitForGA = async (timeout = 2000): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  // If GA is already loaded and ready
  if (window.gaLoaded === true && typeof window.gtag === 'function') {
    return true;
  }
  
  // If GA failed to load, try recovery
  if (window.gaLoadError === true) {
    ensureGA();
  }
  
  return new Promise((resolve) => {
    let elapsed = 0;
    const interval = 100;
    
    const check = () => {
      // Check if GA has been loaded after waiting
      if (window.gaLoaded === true && typeof window.gtag === 'function') {
        resolve(true);
        return;
      }
      
      elapsed += interval;
      if (elapsed >= timeout) {
        console.warn('Timed out waiting for Google Analytics to load');
        resolve(false);
        return;
      }
      
      setTimeout(check, interval);
    };
    
    check();
  });
};

// Check if GA is loaded and available
const isGAAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if explicitly marked as loaded
  if (window.gaLoaded === true && typeof window.gtag === 'function') {
    return true;
  }
  
  // Fallback check - if gtag exists and appears to be valid
  const gtagExists = typeof window.gtag === 'function';
  const dataLayerExists = Array.isArray(window.dataLayer);
  
  if (gtagExists && dataLayerExists) {
    return true;
  }
  
  // If explicitly marked as errored
  if (window.gaLoadError === true) {
    return false;
  }
  
  // Default - missing or undetermined
  return false;
};

// Test if Google Analytics is working properly
export const testAnalytics = async (): Promise<boolean> => {
  // Wait for GA to be ready (with a timeout)
  const gaReady = await waitForGA();
  
  if (!gaReady) {
    console.warn('Google Analytics is not available for testing');
    return false;
  }
  
  try {
    // Send a test event with unique identifier
    const testId = Date.now().toString();
    console.log('Sending GA test event with ID:', testId);
    
    window.gtag('event', 'analytics_test', {
      'test_id': testId,
      'timestamp': new Date().toISOString(),
      'transport_type': 'beacon'
    });
    
    // Check network requests could be done here in a real testing scenario
    return true;
  } catch (error) {
    console.error('Analytics test failed:', error);
    return false;
  }
};

// Track an event
export const trackEvent = async (eventName: string, eventParams: Record<string, any> = {}): Promise<boolean> => {
  // Try to ensure GA is loaded first
  await waitForGA(1000); // Wait up to 1s for GA to load
  
  try {
    if (isGAAvailable()) {
      console.log('Tracking event:', eventName, eventParams);
      
      // Add timestamp and common properties
      const enhancedParams = {
        ...eventParams,
        event_time: new Date().toISOString(),
        transport_type: 'beacon'
      };
      
      window.gtag('event', eventName, enhancedParams);
      return true;
    } else {
      console.warn('Google Analytics not available for event:', eventName);
      // If GA failed to load, we could queue the event here for later sending
      return false;
    }
  } catch (error) {
    console.error('Analytics error when tracking event:', error);
    return false;
  }
};

// Track a page view
export const trackPageView = async (path: string): Promise<boolean> => {
  // Try to ensure GA is loaded first
  await waitForGA(1000); // Wait up to 1s for GA to load
  
  try {
    if (isGAAvailable()) {
      console.log('Tracking page view:', path);
      
      // Send as a page_view event
      window.gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
        transport_type: 'beacon'
      });
      
      // Also update configuration
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
        page_location: window.location.href
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