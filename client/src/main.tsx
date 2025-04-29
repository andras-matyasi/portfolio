import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Analytics (with ad-blocker resistance)
import AnalyticsService from './lib/analytics';

// Apply Inter font family to the entire app
document.documentElement.classList.add('font-inter');

// Add smooth scrolling to the document
document.documentElement.style.scrollBehavior = 'smooth';

// Ensure Google Analytics is ready
if (typeof window !== 'undefined') {
  // Mark as loaded when gtag is available
  if (window.gtag && typeof window.gtag === 'function') {
    window.gaLoaded = true;
  }
  
  // Add listener to check when GA becomes available
  const checkGA = () => {
    if (window.gtag && typeof window.gtag === 'function' && !window.gaLoaded) {
      window.gaLoaded = true;
      console.log('Google Analytics is now available');
      
      // Track initial page view
      AnalyticsService.trackPageView(window.location.pathname);
    }
  };
  
  // Check several times with increasing delay
  setTimeout(checkGA, 500);
  setTimeout(checkGA, 1000);
  setTimeout(checkGA, 2000);
}

createRoot(document.getElementById("root")!).render(<App />);
