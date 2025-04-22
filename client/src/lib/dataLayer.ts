// Type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Push an event to the dataLayer
 * @param eventName The name of the event to track
 * @param eventData Additional data to include with the event
 */
export const pushEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
        timestamp: new Date().toISOString()
      });
      console.log('DataLayer event pushed:', eventName);
      return true;
    }
    return false;
  } catch (error) {
    console.error('DataLayer error:', error);
    return false;
  }
};

/**
 * Track a page view
 * @param path The path of the page
 * @param additionalData Additional data to include with the page view
 */
export const trackPageView = (path: string, additionalData: Record<string, any> = {}) => {
  return pushEvent('page_view', {
    page_path: path,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    page_title: typeof document !== 'undefined' ? document.title : '',
    ...additionalData
  });
};

/**
 * Track a user interaction or conversion
 * @param category Event category (e.g., 'engagement', 'conversion')
 * @param action Event action (e.g., 'click', 'submit')
 * @param label Optional event label for more context
 * @param value Optional numeric value
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  return pushEvent('custom_event', {
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value
  });
};

/**
 * Set user properties in the dataLayer
 * @param userId User ID
 * @param properties Additional user properties
 */
export const setUserProperties = (userId: string, properties: Record<string, any> = {}) => {
  return pushEvent('set_user_properties', {
    user_id: userId,
    user_properties: properties
  });
};

// Export all methods for use in components
const DataLayer = {
  pushEvent,
  trackPageView,
  trackEvent,
  setUserProperties
};

export default DataLayer;