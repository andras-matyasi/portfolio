import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Analytics (with ad-blocker resistance)
import './lib/analytics';

// Apply Inter font family to the entire app
document.documentElement.classList.add('font-inter');

// Add smooth scrolling to the document
document.documentElement.style.scrollBehavior = 'smooth';

createRoot(document.getElementById("root")!).render(<App />);
