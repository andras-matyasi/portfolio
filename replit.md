# Overview

This is a personal product portfolio website for András Matyasi, a Product Manager showcasing his professional experience, case studies, and testimonials. The site is built as a modern single-page application with server-side rendering capabilities, featuring a dark cosmic-themed design and smooth animations throughout the user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes (August 2025)

## Portfolio Migration to GitHub Pages
- **Date**: August 1, 2025
- **Migration**: Successfully moved from Replit hosting to GitHub Pages
- **Domain**: Configured custom domain (andras.matyasi.me) with DNS A records
- **Deployment**: Set up GitHub Actions workflow for automatic builds
- **Cost Reduction**: Eliminated monthly Replit hosting costs, now using free GitHub Pages
- **Development Workflow**: Maintained Replit for development with git push deployment to GitHub
- **Status**: Live and operational at andras.matyasi.me

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom theme configuration featuring a cosmic nebula background design
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface elements
- **Animations**: Framer Motion for smooth page transitions, scroll-triggered animations, and interactive elements
- **State Management**: TanStack React Query for server state management and caching
- **Responsive Design**: Mobile-first approach with custom breakpoints and touch-optimized interactions

## Backend Architecture
- **Server**: Express.js with TypeScript running in ES module mode
- **Development**: Vite for fast development server with hot module replacement
- **Build System**: esbuild for production bundling with platform-specific optimizations
- **Security**: Helmet.js for security headers, custom bot detection, and rate limiting middleware
- **Session Management**: Basic in-memory storage with extensible interface for future database integration

## Data Storage Solutions
- **Current**: In-memory storage for development with interfaces designed for easy migration
- **Configured**: Drizzle ORM with PostgreSQL schema definitions ready for production deployment
- **Database**: Neon serverless PostgreSQL configured but not actively used in current implementation

## Authentication and Authorization
- **Current State**: Basic user schema defined but no active authentication flow implemented
- **Prepared Infrastructure**: User table schema with username/password fields ready for future auth implementation
- **Session Store**: Connect-pg-simple configured for PostgreSQL session storage when needed

## Security Features
- **Bot Protection**: Honeypot routes (/wp-login.php) to trap and identify malicious bots
- **Rate Limiting**: Custom middleware limiting requests to 1000 per 15-minute window
- **Security Headers**: Comprehensive CSP, HSTS, XSS protection, and other security headers via Helmet
- **Suspicious Activity Detection**: User agent pattern matching and IP-based bot detection

## Performance Optimizations
- **Image Optimization**: Sharp.js for SVG to JPG conversion and favicon generation
- **Font Loading**: Preconnected Google Fonts with optimized loading strategy
- **Bundle Splitting**: Vite's automatic code splitting for optimal loading performance
- **Carousel Implementation**: Embla Carousel for smooth, touch-friendly project and testimonial navigation

## Analytics and Tracking
- **Google Analytics**: GA4 implementation with custom event tracking and page view monitoring
- **Data Layer**: Custom dataLayer implementation for structured event tracking
- **Debug Tools**: Development-time analytics testing and dataLayer debugging components

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Build Tools**: Vite for development, esbuild for production builds, TypeScript compiler
- **Routing**: Wouter for lightweight client-side routing

## UI and Styling
- **Component Library**: Complete Radix UI suite (accordion, dialog, dropdown, etc.) with shadcn/ui styling
- **CSS Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for advanced animations and transitions

## Server Infrastructure
- **Web Server**: Express.js with helmet for security, tsx for TypeScript execution
- **Database ORM**: Drizzle Kit and Drizzle ORM for PostgreSQL integration
- **Session Management**: connect-pg-simple for PostgreSQL session storage

## Development and Deployment
- **Database Provider**: Neon serverless PostgreSQL for production database hosting
- **Development Tools**: Replit-specific plugins for Vite integration and theme management
- **Build Pipeline**: Custom scripts for asset generation (favicons, OG images) using Sharp.js

## Analytics and Monitoring
- **Analytics Provider**: Google Analytics 4 (GA4) for user behavior tracking
- **Custom Tracking**: Custom dataLayer implementation for structured event collection
- **Error Handling**: Custom error boundaries and runtime error handling

## Content Management
- **Image Processing**: Sharp.js for server-side image optimization and format conversion
- **Asset Management**: Custom Python scripts for image filename normalization and asset organization
- **SEO Optimization**: Comprehensive meta tags, Open Graph, and Twitter Card implementations