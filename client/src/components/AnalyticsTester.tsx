import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AnalyticsService, { testAnalytics } from '@/lib/analytics';

export default function AnalyticsTester() {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [testPageView, setTestPageView] = useState<boolean>(false);
  
  // Function to check general GA availability
  const checkAvailability = () => {
    setTestLoading(true);
    setErrorMessage(null);
    
    try {
      if (window.gaLoaded) {
        setTestResult('✅ Google Analytics is loaded and available');
      } else if (window.gaLoadError) {
        setTestResult('❌ Google Analytics script failed to load (possibly due to ad blockers)');
      } else if (typeof window.gtag === 'function') {
        setTestResult('✅ Google Analytics seems to be available (gtag function exists)');
      } else {
        setTestResult('❌ Google Analytics is not available');
      }
      
      // Additional debug info
      const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (gaScript) {
        setTestResult(prev => `${prev}\n✅ GA script is in the DOM`);
      } else {
        setTestResult(prev => `${prev}\n❌ GA script not found in the DOM`);
      }
      
      // Check dataLayer
      if (window.dataLayer && window.dataLayer.length) {
        setTestResult(prev => `${prev}\n✅ dataLayer has ${window.dataLayer.length} items`);
      } else {
        setTestResult(prev => `${prev}\n❌ dataLayer is empty or not initialized`);
      }
    } catch (err) {
      setErrorMessage(`Error checking GA: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTestLoading(false);
    }
  };
  
  // Function to send a test event
  const sendTestEvent = async () => {
    setTestLoading(true);
    setErrorMessage(null);
    
    try {
      const eventName = `test_event_${Date.now()}`;
      const result = await AnalyticsService.trackEvent(eventName, {
        test_id: Date.now().toString(),
        test_source: 'analytics_tester',
        transport_type: 'beacon'
      });
      
      if (result) {
        setTestResult(`✅ Test event "${eventName}" sent successfully`);
        
        // Check network requests
        const hasNetwork = navigator.onLine;
        setTestResult(prev => `${prev}\n✅ Network is ${hasNetwork ? 'online' : 'offline'}`);
        } else {
        setTestResult(`❌ Failed to send test event`);
      }
    } catch (err) {
      setErrorMessage(`Error sending test event: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTestLoading(false);
    }
  };
  
  // Function to run diagnostics
  const runDiagnostics = async () => {
    setTestLoading(true);
    setErrorMessage(null);
    setTestResult('Running GA diagnostics...');
    
    try {
      // Check if GA test works
      const testResult = await testAnalytics();
      
      // Check measurement ID availability
      const measurementIdConfigured = typeof window.gtag === 'function' && 
        document.querySelector('script[src*="googletagmanager.com/gtag/js?id="]') !== null;
      
      // Build diagnostic results
      let diagnosticResults = [
        `GA Test result: ${testResult ? '✅ Success' : '❌ Failed'}`,
        `Measurement ID configured: ${measurementIdConfigured ? '✅ Yes' : '❌ No'}`,
        `gtag function available: ${typeof window.gtag === 'function' ? '✅ Yes' : '❌ No'}`,
        `dataLayer available: ${Array.isArray(window.dataLayer) ? '✅ Yes' : '❌ No'}`,
        `GA script load error: ${window.gaLoadError ? '❌ Yes (script failed to load)' : '✅ No'}`,
        `GA explicitly loaded: ${window.gaLoaded ? '✅ Yes' : '❌ No'}`
      ].join('\n');
      
      setTestResult(diagnosticResults);
    } catch (err) {
      setErrorMessage(`Error in diagnostics: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Google Analytics Tester</h3>
      
      <div className="space-y-4">
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={checkAvailability}
            disabled={testLoading}
          >
            Check GA Availability
          </Button>
          
          <Button 
            variant="outline" 
            onClick={sendTestEvent}
            disabled={testLoading}
          >
            Send Test Event
          </Button>
          
          <Button 
            variant="default" 
            onClick={runDiagnostics}
            disabled={testLoading}
          >
            Run Diagnostics
          </Button>
        </div>
        
        {testLoading && (
          <p className="text-sm">Running test...</p>
        )}
        
        {testResult && (
          <pre className="p-3 bg-muted rounded-md whitespace-pre-wrap text-sm">
            {testResult}
          </pre>
        )}
        
        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="mb-2"><strong>Note:</strong> If Google Analytics is not working:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Check if the correct measurement ID is configured (Currently using: G-KCL2J8WB7Y)</li>
            <li>Verify if an ad blocker is preventing GA from loading</li>
            <li>Confirm that the GA property is properly set up in Google Analytics dashboard</li>
            <li>It may take 24-48 hours for data to appear in GA dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}