import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DataLayer from '@/lib/dataLayer';

const DataLayerDebug = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dataLayerEntries, setDataLayerEntries] = useState<any[]>([]);
  
  // Initialize with current dataLayer contents and set up observer
  useEffect(() => {
    // Get initial entries
    if (typeof window !== 'undefined') {
      setDataLayerEntries(window.dataLayer || []);
      
      // Set up an observer to monitor dataLayer changes
      const originalPush = Array.prototype.push;
      
      // Override dataLayer push method
      if (window.dataLayer) {
        window.dataLayer.push = function(...args) {
          // Call original push method
          const result = originalPush.apply(this, args);
          
          // Update our state with the new entries
          setDataLayerEntries([...window.dataLayer]);
          
          return result;
        };
      }
    }
    
    // Listen for key combo to toggle the debug panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Generate test events
  const generateTestEvent = () => {
    DataLayer.trackEvent(
      'test', 
      'button_click', 
      'test_event_' + Date.now()
    );
  };
  
  // Only render if visible
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-900 bg-opacity-95 text-white p-4 rounded-lg shadow-lg border border-slate-700 w-96 max-h-96 overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">DataLayer Debug</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsVisible(false)}
          className="h-6 text-xs"
        >
          Close
        </Button>
      </div>
      
      <div className="space-x-2 mb-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={generateTestEvent}
          className="text-xs h-7"
        >
          Generate Test Event
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setDataLayerEntries(window.dataLayer || [])}
          className="text-xs h-7"
        >
          Refresh
        </Button>
      </div>
      
      <div className="text-xs mt-2">
        <p className="mb-1 text-slate-400">Press Ctrl+Shift+D to toggle this debug panel</p>
        <p className="mb-2 text-slate-400">GTM Container: {window.document.querySelector('script[src*="googletagmanager.com/gtm.js?id="]')?.getAttribute('src')?.split('id=')[1]?.split('&')[0] || 'Not found'}</p>
        
        <div className="mt-2">
          <p className="font-semibold mb-1">DataLayer Entries ({dataLayerEntries.length}):</p>
          {dataLayerEntries.length === 0 ? (
            <p className="text-slate-400 italic">No entries yet</p>
          ) : (
            <div className="space-y-2 mt-1">
              {dataLayerEntries.map((entry, index) => (
                <div key={index} className="p-2 bg-slate-800 rounded text-xs overflow-auto">
                  <pre className="whitespace-pre-wrap break-all">{JSON.stringify(entry, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataLayerDebug;