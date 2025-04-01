// Safe, non-blocked analytics implementation
// This file deliberately avoids using terms that would trigger ad blockers
// This approach allows the site to work even when tracking is blocked

// Configuration - simplified to only use server proxy
const TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';
const PROXY_URL = '/api/analytics/track';

// Anonymous device ID generation with localStorage fallback
const getDeviceId = (): string => {
  try {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = `device_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  } catch (e) {
    // In case localStorage is disabled
    return `device_${Math.random().toString(36).substring(2, 15)}`;
  }
};

// Server-side tracking via proxy
const trackViaProxy = async (name: string, props?: Record<string, any>): Promise<void> => {
  try {
    // Get device ID for tracking
    const deviceId = getDeviceId();
    
    // Call our server proxy endpoint
    await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: name,
        properties: {
          ...props,
          distinct_id: deviceId,
          $device_id: deviceId,
        },
      }),
    });
  } catch (err) {
    // Silent failure in production
    if (import.meta.env.DEV) {
      console.warn('Event tracking error:', err);
    }
  }
};

// Direct tracking to API was completely removed to avoid ad blocker detection
// Instead, we'll rely solely on our server-side proxy which is more resilient
const trackDirect = async (name: string, props?: Record<string, any>): Promise<void> => {
  // This is now just a no-op function since we're only using the proxy
  return Promise.resolve();
};

// Main tracking function that only uses server-side proxy
export const trackEvent = (name: string, props?: Record<string, any>): void => {
  // Skip if we don't have an event name
  if (!name) return;
  
  // Only use the server proxy method now - more reliable with ad blockers
  trackViaProxy(name, props).catch(() => {
    // Nothing to do on failure
  });
  
  // We've removed the direct tracking to avoid ad blocker issues
};

// Track page views
export const trackPageView = (pageName: string): void => {
  trackEvent('Page View', { page: pageName });
};

// Identify a user
export const identifyUser = (id: string, traits?: Record<string, any>): void => {
  try {
    // Store user ID locally
    localStorage.setItem('user_id', id);
    
    // Track identify event
    trackEvent('$identify', {
      distinct_id: id,
      ...traits
    });
  } catch (err) {
    // Silent failure
    if (import.meta.env.DEV) {
      console.warn('User identification error:', err);
    }
  }
};

// Reset tracking
export const resetTracking = (): void => {
  try {
    localStorage.removeItem('user_id');
    localStorage.removeItem('device_id');
  } catch (err) {
    // Silent failure
  }
};

// Create a fake implementation of any tracking methods that might be expected
const noopFunc = () => {};

// Exported service with all methods
const AnalyticsService = {
  trackEvent,
  trackPageView,
  identifyUser,
  reset: resetTracking,
  // Dummy implementation for any direct methods that might be called
  track: trackEvent,
  identify: identifyUser,
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