import { useState, useEffect } from "react";

/**
 * A simple cache for external images to improve loading performance
 * and reduce external network requests
 */

// Type for the cache entries
interface CacheEntry {
  dataUrl: string;
  timestamp: number;
}

// Cache storage - using a simple object for simpler serialization
const imageCache: Record<string, CacheEntry> = {};

// Default cache time: 24 hours (in milliseconds)
const DEFAULT_CACHE_TIME = 24 * 60 * 60 * 1000;

/**
 * Loads and caches an image from a URL
 * @param url The image URL to load and cache
 * @param cacheTime The time in milliseconds to keep the image in cache (default: 24 hours)
 * @returns Promise that resolves to a data URL for the image
 */
export async function getCachedImage(url: string, cacheTime: number = DEFAULT_CACHE_TIME): Promise<string> {
  // Check if URL is already in cache and not expired
  const cachedEntry = imageCache[url];
  if (cachedEntry && Date.now() - cachedEntry.timestamp < cacheTime) {
    return cachedEntry.dataUrl;
  }
  
  // If not in cache or expired, fetch the image
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        
        // Store in cache
        imageCache[url] = {
          dataUrl,
          timestamp: Date.now()
        };
        
        resolve(dataUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error caching image:", error);
    // Return the original URL if caching fails
    return url;
  }
}

/**
 * Component hook for loading a cached image
 * @param url The image URL to load from cache or network
 * @returns An object containing the cached image URL and loading state
 */
export function useCachedImage(url: string) {
  const [cachedUrl, setCachedUrl] = useState<string>(url);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    let isMounted = true;
    
    async function loadImage() {
      try {
        setIsLoading(true);
        const dataUrl = await getCachedImage(url);
        if (isMounted) {
          setCachedUrl(dataUrl);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading cached image:", error);
        if (isMounted) {
          // Fall back to original URL
          setCachedUrl(url);
          setIsLoading(false);
        }
      }
    }
    
    loadImage();
    
    return () => {
      isMounted = false;
    };
  }, [url]);
  
  return { cachedUrl, isLoading };
}