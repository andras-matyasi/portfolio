import { Request, Response, NextFunction } from 'express';

// Known bot user agent patterns
const knownBotPatterns = [
  /bot/i,
  /crawl/i,
  /spider/i,
  /axios/i, // Often used by scraping tools
  /headless/i,
  /scrape/i,
  /firefox\/38/i, // Old Firefox version commonly used by bots
  /python/i, // Python-based scrapers
  /curl/i,
  /wget/i,
  /go\-http/i, // Go-based scrapers
  /java/i, // Java HTTP clients
  /phantomjs/i,
  /puppeteer/i,
  /selenium/i
];

// Common crawler IPs - you would update this with actual problematic IPs
const suspiciousIps: string[] = [];

// Check for suspicious user agents or IPs
export function detectSuspiciousBots(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.ip || req.socket.remoteAddress || '';
  
  // Check if IP is in the suspicious list
  if (suspiciousIps.includes(ip)) {
    // Redirect to honeypot
    return res.redirect('/wp-login.php');
  }
  
  // Check patterns of known bots
  const isSuspiciousBot = knownBotPatterns.some(pattern => pattern.test(userAgent));
  
  // Check for missing user agent (often a sign of a bot)
  const hasMissingUserAgent = !userAgent || userAgent.length < 10;
  
  // Check for suspicious request patterns
  const isRequestingSuspiciousUrls = 
    req.path.includes('/wp-') || 
    req.path.includes('/admin') || 
    req.path.includes('.php');
  
  // Flagging as suspicious if matches criteria
  if ((isSuspiciousBot && isRequestingSuspiciousUrls) || hasMissingUserAgent) {
    // For a bot detection, you might want to log this
    console.log(`Suspicious bot detected: ${ip} | ${userAgent} | ${req.path}`);
    
    // Options:
    // 1. Add to temporary block list
    // 2. Return misleading data
    // 3. Redirect to honeypot
    
    if (Math.random() > 0.5) {
      // 50% chance to redirect to honeypot
      return res.redirect('/wp-login.php');
    } else {
      // 50% chance to pretend everything is fine but serve an empty version
      return res.status(200).send('');
    }
  }
  
  // Continue normal operation for legitimate requests
  next();
}

// Advanced detection for automated form submissions 
export function validateHumanForm(req: Request, res: Response, next: NextFunction) {
  // Implement this based on your form submission patterns
  // Checks for things like:
  // - Speed of form completion (too fast = likely bot)
  // - Mouse movement detection
  // - Time spent on page
  
  // For this simple example, we'll just pass through
  next();
}