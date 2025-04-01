import mixpanel from 'mixpanel-browser';

// Initialize with the project token from environment variables
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';
let USE_PROXY = true; // Use proxy by default to avoid ad blockers

// Initialize mixpanel browser library for features like autocapture
if (MIXPANEL_TOKEN) {
  try {
    // Initialize mixpanel 
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: import.meta.env.DEV, // Enable debug mode in development
      track_pageview: true,       // Automatically track page views
      persistence: 'localStorage', // Use localStorage for storing user identity
      ip: true,                    // Enable IP tracking for city/country data
      property_blacklist: ['$initial_referrer', '$initial_referring_domain'] // Only block referrer data
    });
    
    // Log successful initialization in development only
    if (import.meta.env.DEV) {
      console.log('Mixpanel initialized successfully');
    }
    
    // If we reach here without errors, we can try direct tracking
    USE_PROXY = false;
  } catch (error) {
    // If direct initialization fails, fallback to proxy
    console.warn('Mixpanel direct initialization failed, will use proxy', error);
    USE_PROXY = true;
  }
} else {
  // In development, provide a helpful error message
  if (import.meta.env.DEV) {
    console.warn('Mixpanel not initialized: Missing VITE_MIXPANEL_TOKEN environment variable');
  }
}

// Unique device ID for anonymous tracking
const getDeviceId = () => {
  let deviceId = localStorage.getItem('mp_device_id');
  if (!deviceId) {
    deviceId = `device_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('mp_device_id', deviceId);
  }
  return deviceId;
};

// Proxy-based tracking function that won't be blocked by ad blockers
const trackViaProxy = async (eventName: string, properties?: Record<string, any>) => {
  try {
    const deviceId = getDeviceId();
    
    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventName,
        properties: {
          ...properties,
          distinct_id: deviceId,
          $device_id: deviceId,
        },
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to track event via proxy:', await response.text());
    }
  } catch (error) {
    console.error('Error tracking via proxy:', error);
  }
};

// Helper function to track events with fallback
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    if (USE_PROXY) {
      // Use our server proxy
      trackViaProxy(eventName, properties);
    } else {
      // Try direct tracking first
      try {
        mixpanel.track(eventName, properties);
      } catch (error) {
        // Fallback to proxy if direct tracking fails
        console.warn('Direct tracking failed, using proxy fallback:', error);
        trackViaProxy(eventName, properties);
      }
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

// Helper function to identify users
export const identifyUser = (id: string, traits?: Record<string, any>) => {
  try {
    // Store the ID for proxy usage
    localStorage.setItem('mp_user_id', id);
    
    if (!USE_PROXY) {
      mixpanel.identify(id);
      if (traits) {
        mixpanel.people.set(traits);
      }
    }
    
    // Also send via proxy for redundancy
    trackViaProxy('$identify', { 
      distinct_id: id,
      ...traits
    });
  } catch (error) {
    console.error('Error identifying user:', error);
  }
};

// Track page views
export const trackPageView = (pageName: string) => {
  trackEvent('Page View', { page: pageName });
};

// Reset user identity
export const resetUser = () => {
  try {
    localStorage.removeItem('mp_user_id');
    
    if (!USE_PROXY) {
      mixpanel.reset();
    }
  } catch (error) {
    console.error('Error resetting user:', error);
  }
};

// The mixpanel instance for any custom usage
export { mixpanel };

// Default export 
const MixpanelService = {
  trackEvent,
  identifyUser,
  trackPageView,
  resetUser,
  mixpanel,
};

export default MixpanelService;