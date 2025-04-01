import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import { useEffect } from "react";
import Analytics from "@/lib/analytics";  // Use our ad-blocker safe analytics

// This component safely tracks page views when routes change
function PageViewTracker() {
  const [location] = useLocation();
  
  useEffect(() => {
    // No try/catch needed - our analytics implementation handles errors internally
    // and is designed to never throw exceptions that could break the app
    Analytics.trackPageView(location);
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
