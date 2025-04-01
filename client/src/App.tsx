import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import { useEffect } from "react";
import MixpanelService from "@/lib/mixpanel";

// This component tracks page views when routes change
function PageViewTracker() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Track page view on each location change
    MixpanelService.trackPageView(location);
  }, [location]);
  
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
