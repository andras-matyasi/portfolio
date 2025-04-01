import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import { useEffect } from "react";
import MixpanelService from "@/lib/mixpanel";

// This component safely tracks page views when routes change
function PageViewTracker() {
  const [location] = useLocation();
  
  useEffect(() => {
    try {
      // Track page view on each location change
      // This is designed to gracefully fail if tracking is blocked
      MixpanelService.trackPageView(location);
    } catch (error) {
      // Silent fail to avoid breaking the application
      if (import.meta.env.DEV) {
        console.warn('Failed to track page view:', error);
      }
    }
  }, [location]);
  
  // This component doesn't render anything
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageViewTracker />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
