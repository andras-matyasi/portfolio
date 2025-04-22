import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import { useEffect } from "react";
import { trackPageView } from "./lib/dataLayer";
import DataLayerDebug from '@/components/DataLayerDebug';

function Router() {
  const [location] = useLocation();
  
  // Track page views whenever the location changes
  useEffect(() => {
    // Push page view event to dataLayer
    trackPageView(location);
  }, [location]);
  
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
      <DataLayerDebug />
    </QueryClientProvider>
  );
}

export default App;
