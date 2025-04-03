// Client-side activity logging module
// This is intentionally named generically to avoid ad blocker detection

// Anonymized unique identifier for this session
const sessionId = generateSessionId();

/**
 * Generates a simple session ID for basic analytics without cookies
 */
function generateSessionId(): string {
  // Generate a random ID for this session if we don't have one yet
  // This will be reset when the user refreshes or reopens the page
  const randomPart = Math.random().toString(36).substring(2, 15);
  const timestamp = new Date().getTime().toString(36);
  return `${timestamp}_${randomPart}`;
}

/**
 * Logs a user action to the server
 */
export async function logAction(action: string, data: Record<string, any> = {}): Promise<boolean> {
  try {
    // Get screen dimensions
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get browser and OS info from user agent
    const userAgent = navigator.userAgent;
    
    // Get page load time if available
    let pageLoadTime = null;
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    }
    
    // Add session ID for anonymized user tracking
    const payload = {
      action,
      data: {
        ...data,
        session_id: sessionId,
        page: window.location.pathname,
        referrer: document.referrer || null,
        screen_size: `${screenWidth}x${screenHeight}`,
        viewport_size: `${viewportWidth}x${viewportHeight}`,
        user_agent: userAgent,
        page_load_time: pageLoadTime,
        url: window.location.href,
        host: window.location.host,
        language: navigator.language,
        timestamp: Math.floor(Date.now() / 1000), // Unix timestamp in seconds for Mixpanel compatibility
      }
    };

    // Use fetch API to send to our generic endpoint with explicit API prefix
    const response = await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      // Use non-blocking request that doesn't slow down the UI
      credentials: 'same-origin',
    });

    // Check if we got a successful response
    if (!response.ok) {
      console.debug('Activity logging failed with status:', response.status);
      return false;
    }
    
    // Try to parse the response as JSON
    try {
      const result = await response.json();
      return result.success === true;
    } catch (parseError) {
      console.debug('Failed to parse activity logging response');
      return response.ok;
    }
  } catch (err) {
    // Silent fail to avoid impacting user experience
    console.debug('Activity logging failed silently');
    return false;
  }
}

/**
 * Log a page view event
 */
export function logPageView(pageName?: string): void {
  logAction('page_viewed', { 
    name: pageName || window.location.pathname 
  });
}

/**
 * Track when a user clicks on a specific UI element
 */
export function logClick(elementId: string, elementType: string, additionalData: Record<string, any> = {}): void {
  logAction('element_clicked', {
    element_id: elementId,
    element_type: elementType,
    ...additionalData
  });
}

// Export a simple API that looks generic enough to avoid detection
const ActivityService = {
  logAction,
  logPageView,
  logClick,
  // Legacy API compatibility (these functions are aliased to the new functions)
  trackEvent: logAction,
  trackPageView: logPageView,
  identifyUser: () => Promise.resolve(true), // No-op for client side for privacy
};

export default ActivityService;