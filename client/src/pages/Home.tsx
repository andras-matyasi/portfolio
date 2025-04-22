import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ReferencesSection from "@/components/ReferencesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnalyticsTester from "@/components/AnalyticsTester";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAnalyticsTester, setShowAnalyticsTester] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Check URL parameters to enable analytics tester
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('analytics_debug') === 'true') {
      setShowAnalyticsTester(true);
    }

    return () => clearTimeout(timer);
  }, []);

  // Add custom scrollbar styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #1E2224;
      }
      ::-webkit-scrollbar-thumb {
        background: #5E6AD2;
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Keyboard shortcut for showing analytics tester
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+A to toggle analytics tester
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAnalyticsTester(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-dark">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex flex-col">
        <Hero />
        
        {/* Analytics Tester (only shown if enabled) */}
        {showAnalyticsTester && (
          <div className="container mx-auto px-4 py-8 mt-8">
            <AnalyticsTester />
          </div>
        )}
        
        <ProjectsSection />
        <AboutSection />
        <ReferencesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
