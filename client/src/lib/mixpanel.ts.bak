// IMPORTANT: This file is carefully designed to NOT break when analytics are blocked
// We avoid direct imports of ad-blocked packages and use lazy initialization

// This will hold the mixpanel instance if available
let mixpanelInstance: any = null;

// Initialize with the project token from environment variables
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';

// Flag to track if direct Mixpanel is available
let isMixpanelAvailable = false;

// A queue to store events if Mixpanel is being loaded
const eventQueue: Array<{name: string, props?: any}> = [];

// Unique device ID for anonymous tracking
const getDeviceId = (): string => {
  try {
    let deviceId = localStorage.getItem('mp_device_id');
    if (!deviceId) {
      deviceId = `device_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('mp_device_id', deviceId);
    }
    return deviceId;
  } catch (e) {
    // In case localStorage is disabled
    return `device_${Math.random().toString(36).substring(2, 15)}`;
  }
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
      if (import.meta.env.DEV) {
        console.warn('Failed to track event via proxy:', response.status);
      }
    }
  } catch (error) {
    // Silent fail for production
    if (import.meta.env.DEV) {
      console.warn('Error tracking via proxy:', error);
    }
  }
};

// Try to load Mixpanel asynchronously
const initMixpanel = async (): Promise<void> => {
  if (!MIXPANEL_TOKEN) return;
  
  try {
    // Dynamic import to prevent it from being a hard dependency that could break the site
    const mixpanelModule = await import('mixpanel-browser').catch(() => null);
    
    // If import failed (likely blocked by ad blocker), just return
    if (!mixpanelModule) {
      isMixpanelAvailable = false;
      if (import.meta.env.DEV) {
        console.warn('Mixpanel library could not be loaded - likely blocked');
      }
      return;
    }
    
    // We have the module, set up Mixpanel
    mixpanelInstance = mixpanelModule.default;
    
    // Initialize Mixpanel
    mixpanelInstance.init(MIXPANEL_TOKEN, {
      debug: import.meta.env.DEV,
      track_pageview: true,
      persistence: 'localStorage',
      ip: true,
      property_blacklist: ['$initial_referrer', '$initial_referring_domain']
    });
    
    isMixpanelAvailable = true;
    
    // Process any queued events
    while (eventQueue.length > 0) {
      const event = eventQueue.shift();
      if (event) {
        mixpanelInstance.track(event.name, event.props);
      }
    }
    
    if (import.meta.env.DEV) {
      console.log('Mixpanel initialized successfully');
    }
  } catch (error) {
    // Direct integration failed, mark as unavailable
    isMixpanelAvailable = false;
    if (import.meta.env.DEV) {
      console.warn('Failed to initialize Mixpanel:', error);
    }
  }
};

// Start loading Mixpanel in the background
if (typeof window !== 'undefined') {
  // Only try to initialize in browser environment
  setTimeout(() => {
    initMixpanel().catch(() => {
      // Silently fail on initializing - site should still work
    });
  }, 0);
}

// Helper function to track events with fallback
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    // Always track via proxy as a fallback
    trackViaProxy(eventName, properties);
    
    // If Mixpanel is available, also track directly
    if (isMixpanelAvailable && mixpanelInstance) {
      mixpanelInstance.track(eventName, properties);
    } 
    // If Mixpanel might become available later, queue the event
    else if (MIXPANEL_TOKEN && !isMixpanelAvailable && mixpanelInstance === null) {
      eventQueue.push({name: eventName, props: properties});
    }
  } catch (error) {
    // Silent failure to prevent breaking the site
    if (import.meta.env.DEV) {
      console.warn('Failed to track event:', error);
    }
  }
};

// Helper function to identify users
export const identifyUser = (id: string, traits?: Record<string, any>) => {
  try {
    // Store the ID for proxy usage
    try {
      localStorage.setItem('mp_user_id', id);
    } catch (e) {
      // Ignore localStorage errors
    }
    
    // If Mixpanel is available, identify directly
    if (isMixpanelAvailable && mixpanelInstance) {
      mixpanelInstance.identify(id);
      if (traits) {
        mixpanelInstance.people.set(traits);
      }
    }
    
    // Always send via proxy as well
    trackViaProxy('$identify', { 
      distinct_id: id,
      ...traits
    });
  } catch (error) {
    // Silent failure
    if (import.meta.env.DEV) {
      console.warn('Error identifying user:', error);
    }
  }
};

// Track page views
export const trackPageView = (pageName: string) => {
  trackEvent('Page View', { page: pageName });
};

// Reset user identity
export const resetUser = () => {
  try {
    try {
      localStorage.removeItem('mp_user_id');
    } catch (e) {
      // Ignore localStorage errors
    }
    
    if (isMixpanelAvailable && mixpanelInstance) {
      mixpanelInstance.reset();
    }
  } catch (error) {
    // Silent failure
    if (import.meta.env.DEV) {
      console.warn('Error resetting user:', error);
    }
  }
};

// Export a dummy mixpanel object that won't break the site if Mixpanel is blocked
export const mixpanel = new Proxy({}, {
  get: (_target, prop) => {
    // If the real mixpanel is available, pass through to it
    if (isMixpanelAvailable && mixpanelInstance) {
      return mixpanelInstance[prop];
    }
    
    // Otherwise return a dummy function that does nothing
    return () => {};
  }
});

// Default export with a service interface
const MixpanelService = {
  trackEvent,
  identifyUser,
  trackPageView,
  resetUser,
  // This is a proxy that safely returns the real mixpanel or dummy functions
  mixpanel
};

export default MixpanelService;