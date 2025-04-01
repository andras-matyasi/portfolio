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
  
  // Proxy for Mixpanel to avoid ad blockers
  app.post('/api/analytics/track', async (req: Request, res: Response) => {
    try {
      const { event, properties } = req.body;
      const mixpanelToken = process.env.MIXPANEL_TOKEN;
      
      // Ensure we have the required parameters
      if (!event || !mixpanelToken) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Make a request to Mixpanel
      const encodedData = Buffer.from(JSON.stringify({
        event,
        properties: {
          ...properties,
          token: mixpanelToken,
          time: properties?.time || Math.floor(Date.now() / 1000),
          ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress
        }
      })).toString('base64');
      
      const response = await axios.get(`https://api.mixpanel.com/track/?data=${encodedData}&ip=1`);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Mixpanel proxy error:', error);
      res.status(500).json({ error: 'Failed to track event' });
    }
  });
  
  const httpServer = createServer(app);

  return httpServer;
}
