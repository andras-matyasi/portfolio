import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

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
  
  // Enhanced proxy for Mixpanel to avoid ad blockers
  app.post('/api/analytics/track', async (req: Request, res: Response) => {
    try {
      const { event, properties } = req.body;
      const mixpanelToken = process.env.MIXPANEL_TOKEN;
      
      // Ensure we have the required parameters but don't fail the site if missing
      if (!event) {
        return res.status(400).json({ error: 'Missing event name' });
      }
      
      // If we don't have a token, just acknowledge the request but don't actually track
      if (!mixpanelToken) {
        console.warn('Mixpanel proxy: Missing token, analytics event not sent');
        return res.status(200).json({ success: false, reason: 'missing_token' });
      }
      
      // Enhanced IP detection
      const clientIp = req.headers['cf-connecting-ip'] || 
                      req.headers['x-real-ip'] || 
                      req.headers['x-forwarded-for'] || 
                      req.connection.remoteAddress || 
                      req.ip || 
                      '0.0.0.0';
      
      // Make a request to Mixpanel with timeout and retry
      try {
        // Prepare data for Mixpanel - correct format based on their API docs
        const eventData = [{
          event,
          properties: {
            ...properties,
            token: mixpanelToken,
            time: properties?.time || Math.floor(Date.now() / 1000),
            ip: clientIp,
            $source: 'server-proxy',
            distinct_id: properties?.distinct_id || 'anonymous'
          }
        }];
        
        const encodedData = Buffer.from(JSON.stringify(eventData)).toString('base64');
        
        // Debug log for tracking
        console.log(`Sending event to Mixpanel: ${event}`);
        
        // Use the batch endpoint for better reliability
        const response = await axios.get(`https://api.mixpanel.com/track/?data=${encodedData}&verbose=1&ip=1`, {
          timeout: 3000 // 3 second timeout
        });
        
        console.log(`Mixpanel response: ${response.status} ${response.statusText}`);
        
        res.status(200).json({ success: true });
      } catch (error: any) {
        // Log detailed error information for debugging
        console.error('Mixpanel API request failed:');
        console.error(`- Message: ${error.message || 'Unknown error'}`);
        
        if (error.response) {
          console.error(`- Status: ${error.response.status}`);
          console.error(`- Data: ${JSON.stringify(error.response.data)}`);
          console.error(`- Headers: ${JSON.stringify(error.response.headers)}`);
        } else if (error.request) {
          console.error('- No response received');
        }
        
        // Return success to client anyway - analytics should never break the site
        res.status(200).json({ success: false, reason: 'api_error' });
      }
    } catch (error) {
      // Something went very wrong, but don't break the client experience
      console.error('Mixpanel proxy unexpected error:', error);
      res.status(200).json({ success: false, reason: 'server_error' });
    }
  });
  
  const httpServer = createServer(app);

  return httpServer;
}
