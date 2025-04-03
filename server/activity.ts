// Server-side activity tracking module
import Mixpanel from 'mixpanel';

// Configuration
const DEBUG_TRACKING = process.env.DEBUG_TRACKING === 'true';
const token = process.env.MIXPANEL_TOKEN;
const mixpanel = token ? Mixpanel.init(token) : null;

// Log initialization status at startup
if (mixpanel) {
  console.log('[Activity] Mixpanel tracking initialized with token');
  if (DEBUG_TRACKING) {
    console.log('[Activity] Debug tracking mode is enabled - all events will be logged');
  }
} else {
  console.warn('[Activity] Mixpanel tracking disabled - no token provided. Set MIXPANEL_TOKEN environment variable to enable.');
}

/**
 * Tracks an event via Mixpanel's server-side API
 * @param eventName The name of the event to track
 * @param properties Additional properties to include with the event
 * @param ip Optional IP address of the user (will be anonymized)
 */
export async function trackActivity(
  eventName: string,
  properties: Record<string, any> = {},
  ip?: string
): Promise<boolean> {
  if (!mixpanel) {
    // We've already logged a warning at startup, no need to log for each event
    return false;
  }

  try {
    // Fix timestamp for Mixpanel (Unix timestamp in seconds)
    // Mixpanel expects "time" property as a unix timestamp in seconds
    properties.time = Math.floor(Date.now() / 1000);
    
    // Anonymize IP if provided and use it for geolocation
    if (ip) {
      // Only keep first 2 parts of IP for privacy (e.g., 192.168.x.x)
      const anonymizedIp = ip.split('.').slice(0, 2).join('.') + '.0.0';
      
      // Use Mixpanel's standard IP property which will be automatically used for geolocation
      // Mixpanel will automatically detect city, region, and country from this
      properties.$ip = anonymizedIp;
    }
    
    // Let Mixpanel determine geolocation from IP instead of providing hardcoded values

    // Add environment info
    properties.environment = process.env.NODE_ENV || 'development';
    
    // Debug log if enabled
    if (DEBUG_TRACKING) {
      console.log(`[Activity Debug] Tracking "${eventName}" with properties:`, 
        JSON.stringify(properties, null, 2).substring(0, 500) + 
        (JSON.stringify(properties).length > 500 ? '...(truncated)' : '')
      );
    }
    
    // Track the event without using callbacks (to avoid type issues)
    try {
      mixpanel.track(eventName, properties);
      return true;
    } catch (err) {
      console.error('Error tracking event in Mixpanel:', err);
      return false;
    }
  } catch (error) {
    console.error('Failed to track activity:', error);
    return false;
  }
}

/**
 * Identify a user profile in Mixpanel
 * @param distinctId A unique identifier for the user
 * @param traits User profile properties to set
 */
export async function identifyUser(
  distinctId: string,
  traits: Record<string, any> = {}
): Promise<boolean> {
  if (!mixpanel) {
    // We've already logged a warning at startup, no need to log for each event
    return false;
  }

  try {
    // Debug log if enabled
    if (DEBUG_TRACKING) {
      console.log(`[Activity Debug] Identifying user "${distinctId}" with traits:`, 
        JSON.stringify(traits, null, 2).substring(0, 500) + 
        (JSON.stringify(traits).length > 500 ? '...(truncated)' : '')
      );
    }
    
    // Identify the user without using callbacks (to avoid type issues)
    try {
      mixpanel.people.set(distinctId, traits);
      return true;
    } catch (err) {
      console.error('Error identifying user in Mixpanel:', err);
      return false;
    }
  } catch (error) {
    console.error('Failed to identify user:', error);
    return false;
  }
}