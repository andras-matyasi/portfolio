import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import helmet from "helmet";
import { detectSuspiciousBots, validateHumanForm } from "./security";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply Helmet security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://fonts.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "https:", "http:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  // Set TTL for HSTS to 2 years
  hsts: {
    maxAge: 15552000,
    includeSubDomains: true,
    preload: true,
  },
  // Enable XSS protection
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: "same-origin" },
}));

// Add rate limiting for basic bot protection (1000 requests per 15 minutes)
const requestCounts = new Map<string, { count: number, timestamp: number }>();
app.use((req, res, next) => {
  // Skip rate limiting for static content and resources
  if (
    req.path.endsWith('.js') || 
    req.path.endsWith('.css') || 
    req.path.endsWith('.svg') || 
    req.path.endsWith('.jpg') || 
    req.path.endsWith('.png') || 
    req.path.endsWith('.ico') || 
    req.path.endsWith('.woff') || 
    req.path.endsWith('.woff2') ||
    req.path === '/' ||
    req.path === '/robots.txt' ||
    req.path === '/sitemap.xml'
  ) {
    return next();
  }

  const ip = req.ip || req.socket.remoteAddress || "";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 1000; // Increased to 1000 requests
  
  // Get or initialize record for this IP
  let record = requestCounts.get(ip);
  if (!record) {
    record = { count: 0, timestamp: now };
    requestCounts.set(ip, record);
  }
  
  // Reset if outside window
  if (now - record.timestamp > windowMs) {
    record.count = 0;
    record.timestamp = now;
  }
  
  // Increment request count
  record.count++;
  
  // Check if over limit
  if (record.count > maxRequests) {
    return res.status(429).json({ 
      message: "Too many requests, please try again later." 
    });
  }
  
  next();
});

// Apply bot detection middleware
app.use(detectSuspiciousBots);

// Apply form validation for POST requests
app.post('*', validateHumanForm);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
