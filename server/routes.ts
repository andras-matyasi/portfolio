import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { trackActivity, identifyUser } from "./activity";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)
  
  // Honeypot route for bot detection
  app.get('/wp-login.php', (req, res) => {
    // Log suspicious access (in production, you might want to store these in a database)
    console.log(`Potential bot detected from IP: ${req.ip}, User-Agent: ${req.headers['user-agent']}`);
    
    // Return a fake login page to make it seem legitimate, but it's actually a trap
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>WordPress Login</title></head>
        <body>
          <h1>WordPress Login</h1>
          <form method="post" action="/wp-login.php">
            <input type="text" name="log" placeholder="Username" />
            <input type="password" name="pwd" placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
        </body>
      </html>
    `);
  });
  
  // Handle POST to honeypot (collect bot credentials)
  app.post('/wp-login.php', (req, res) => {
    console.log(`Bot attempted login with credentials: ${JSON.stringify(req.body)}`);
    // Delay response to waste bot resources
    setTimeout(() => {
      res.status(403).json({ error: 'Invalid credentials' });
    }, 2000);
  });
  
  // Activity logging endpoint - intentionally using a generic name to avoid ad blockers
  app.post('/api/log', async (req: Request, res: Response, next: NextFunction) => {
    // Set content type to JSON explicitly to prevent Vite middleware from intercepting
    res.setHeader('Content-Type', 'application/json');
    
    try {
      const { action, data = {} } = req.body;
      
      if (!action) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
      
      // Log the incoming event for debugging
      console.log(`[Activity] Tracking: ${action}`, JSON.stringify(data).substring(0, 100) + (JSON.stringify(data).length > 100 ? '...' : ''));
      
      // Add user agent and referrer info from headers
      const properties = {
        ...data,
        $user_agent: req.headers['user-agent'] || 'Unknown',
        $referrer: req.headers.referer || null,
      };
      
      // Use distinct_id from data if available
      if (data.session_id) {
        properties.distinct_id = data.session_id;
      }
      
      // Track the activity using Mixpanel
      await trackActivity(action, properties, req.ip);
      
      // Return success to the client
      return res.status(200).send(JSON.stringify({ success: true }));
    } catch (error) {
      console.error('Error processing activity:', error);
      return res.status(500).send(JSON.stringify({ success: false, error: 'Internal server error' }));
    }
  });
  
  // User identification endpoint
  app.post('/api/identify', async (req: Request, res: Response, next: NextFunction) => {
    // Set content type to JSON explicitly to prevent Vite middleware from intercepting
    res.setHeader('Content-Type', 'application/json');
    
    try {
      const { distinct_id, traits = {} } = req.body;
      
      if (!distinct_id) {
        return res.status(400).send(JSON.stringify({ success: false, message: 'Missing required fields' }));
      }
      
      // Log the identification event
      console.log(`[Activity] Identifying user: ${distinct_id}`);
      
      // Identify the user in Mixpanel
      await identifyUser(distinct_id, traits);
      
      // Return success to the client
      return res.status(200).send(JSON.stringify({ success: true }));
    } catch (error) {
      console.error('Error identifying user:', error);
      return res.status(500).send(JSON.stringify({ success: false, error: 'Internal server error' }));
    }
  });
  
  // Keep the old endpoint for backward compatibility
  app.post('/api/analytics/track', async (req: Request, res: Response, next: NextFunction) => {
    // Set content type to JSON explicitly to prevent Vite middleware from intercepting
    res.setHeader('Content-Type', 'application/json');
    
    try {
      const { event, properties = {} } = req.body;
      
      if (event) {
        // Log the event
        console.log(`[Analytics Legacy] Tracking: ${event}`);
        
        // Forward to our new tracking system
        await trackActivity(event, properties, req.ip);
      }
      
      return res.status(200).send(JSON.stringify({ success: true }));
    } catch (error) {
      console.error('Error in legacy analytics endpoint:', error);
      return res.status(200).send(JSON.stringify({ success: true })); // Still return success to avoid breaking clients
    }
  });
  
  const httpServer = createServer(app);

  return httpServer;
}
