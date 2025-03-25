import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar, Utensils } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [funkyToolsMenuOpen, setFunkyToolsMenuOpen] = useState(false);
  const contactMenuRef = useRef<HTMLLIElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const funkyToolsMenuRef = useRef<HTMLLIElement>(null);
  const funkyToolsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contactMenuRef.current && 
        !contactMenuRef.current.contains(event.target as Node) && 
        contactDropdownRef.current && 
        !contactDropdownRef.current.contains(event.target as Node)
      ) {
        setContactMenuOpen(false);
      }
      
      if (
        funkyToolsMenuRef.current && 
        !funkyToolsMenuRef.current.contains(event.target as Node) && 
        funkyToolsDropdownRef.current && 
        !funkyToolsDropdownRef.current.contains(event.target as Node)
      ) {
        setFunkyToolsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contactMenuRef, funkyToolsMenuRef]);

  // Handlers for menu interactions
  const handleFunkyToolsMouseEnter = () => {
    setFunkyToolsMenuOpen(true);
    setContactMenuOpen(false);
  };

  const handleContactMouseEnter = () => {
    setContactMenuOpen(true);
    setFunkyToolsMenuOpen(false);
  };

  // Track mouse movement for horizontal detection
  const handleMouseMove = (e: React.MouseEvent, menuRef: React.RefObject<HTMLLIElement>, setMenuOpen: (open: boolean) => void) => {
    if (!menuRef.current) return;
    
    const rect = menuRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    
    // Check if mouse is moving horizontally outside the menu's bounds
    if (mouseX < rect.left - 20 || mouseX > rect.right + 20) {
      setMenuOpen(false);
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isScrolled ? "bg-dark/90 border-dark-secondary" : "bg-transparent border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={(e) => {
        // Global mouse move to detect when mouse is far from any menu
        if (contactMenuOpen) {
          handleMouseMove(e, contactMenuRef, setContactMenuOpen);
        }
        if (funkyToolsMenuOpen) {
          handleMouseMove(e, funkyToolsMenuRef, setFunkyToolsMenuOpen);
        }
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <a href="#top" className="text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-600 transition-all duration-300">
          Andras Matyasi
        </a>
        <nav>
          <ul className="flex space-x-6 text-sm">
            <li>
              <a href="#case-studies" className="text-white hover:text-primary transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#about" className="text-white hover:text-primary transition-colors">
                About Me
              </a>
            </li>
            <li>
              <a href="#references" className="text-white hover:text-primary transition-colors">
                References
              </a>
            </li>
            <li 
              ref={funkyToolsMenuRef} 
              className="relative"
              onMouseEnter={handleFunkyToolsMouseEnter}
            >
              <button 
                className="text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setFunkyToolsMenuOpen(!funkyToolsMenuOpen)}
              >
                Funky tools
              </button>
              {funkyToolsMenuOpen && (
                <div 
                  ref={funkyToolsDropdownRef}
                  className="absolute right-0 mt-2 py-2 w-48 bg-dark-secondary border border-dark rounded-md shadow-lg z-50"
                  onMouseEnter={handleFunkyToolsMouseEnter}
                >
                  <a 
                    href="https://lunchvote.matyasi.me" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block px-4 py-2 text-sm text-white hover:bg-dark/50 flex items-center"
                  >
                    <Utensils className="h-4 w-4 mr-2" />
                    Lunchvote
                  </a>
                </div>
              )}
            </li>
            <li 
              ref={contactMenuRef} 
              className="relative"
              onMouseEnter={handleContactMouseEnter}
            >
              <button 
                className="text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setContactMenuOpen(!contactMenuOpen)}
              >
                Contact
              </button>
              {contactMenuOpen && (
                <div 
                  ref={contactDropdownRef}
                  className="absolute right-0 mt-2 py-2 w-48 bg-dark-secondary border border-dark rounded-md shadow-lg z-50"
                  onMouseEnter={handleContactMouseEnter}
                >
                  <a 
                    href="mailto:andras@matyasi.me" 
                    className="block px-4 py-2 text-sm text-white hover:bg-dark/50 flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/amatyasi/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block px-4 py-2 text-sm text-white hover:bg-dark/50 flex items-center"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://calendly.com/andras-matyasi/30min" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block px-4 py-2 text-sm text-white hover:bg-dark/50 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book a meeting
                  </a>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
