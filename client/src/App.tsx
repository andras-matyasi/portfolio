import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { trackPageView, testAnalytics } from "./lib/analytics";

function Router() {
  const [location] = useLocation();
  const [didInitGA, setDidInitGA] = useState(false);
  
  // Initialize and test GA on first render
  useEffect(() => {
    const initGA = async () => {
      try {
        // Run a GA test to see if it's working
        await testAnalytics();
        
        // Send initial page view
        await trackPageView(location);
        
        console.log('Google Analytics initialization completed');
        setDidInitGA(true);
      } catch (err) {
        console.error('Error initializing analytics:', err);
      }
    };
    
    initGA();
  }, []);
  
  // Track page views whenever the location changes (after initial setup)
  useEffect(() => {
    if (didInitGA) {
      trackPageView(location)
        .then(success => {
          if (success) {
            console.log('Page view tracked successfully:', location);
          }
        })
        .catch(err => {
          console.error('Failed to track page view:', err);
        });
    }
  }, [location, didInitGA]);
  
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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
