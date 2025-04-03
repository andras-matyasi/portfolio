import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize activity tracking (server-side implementation with ad-blocker resistance)
import ActivityService from './lib/activity';

// Track the initial page view
ActivityService.logPageView();

// Apply Inter font family to the entire app
document.documentElement.classList.add('font-inter');

// Add smooth scrolling to the document
document.documentElement.style.scrollBehavior = 'smooth';

createRoot(document.getElementById("root")!).render(<App />);
