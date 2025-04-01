import mixpanel from 'mixpanel-browser';

// Initialize with the project token from environment variables
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';

// Initialize mixpanel 
mixpanel.init(MIXPANEL_TOKEN, {
  debug: import.meta.env.DEV, // Enable debug mode in development
  track_pageview: true,       // Automatically track page views
  persistence: 'localStorage' // Use localStorage for storing user identity
});

// Helper function to track events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  mixpanel.track(eventName, properties);
};

// Helper function to identify users
export const identifyUser = (id: string, traits?: Record<string, any>) => {
  mixpanel.identify(id);
  if (traits) {
    mixpanel.people.set(traits);
  }
};

// Track page views manually
export const trackPageView = (pageName: string) => {
  mixpanel.track('Page View', { page: pageName });
};

// Reset user identity
export const resetUser = () => {
  mixpanel.reset();
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