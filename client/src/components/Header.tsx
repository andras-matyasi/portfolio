import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar, Utensils } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [funkyToolsMenuOpen, setFunkyToolsMenuOpen] = useState(false);
  const contactMenuRef = useRef<HTMLLIElement>(null);
  const funkyToolsMenuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target as Node)) {
        setContactMenuOpen(false);
      }
      if (funkyToolsMenuRef.current && !funkyToolsMenuRef.current.contains(event.target as Node)) {
        setFunkyToolsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contactMenuRef, funkyToolsMenuRef]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isScrolled ? "bg-dark/90 border-dark-secondary" : "bg-transparent border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <a href="#top" className="text-xl font-semibold tracking-tight text-white hover:text-primary transition-colors">
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
            <li ref={funkyToolsMenuRef} className="relative">
              <button 
                className="text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setFunkyToolsMenuOpen(!funkyToolsMenuOpen)}
                onMouseEnter={() => setFunkyToolsMenuOpen(true)}
              >
                Funky tools
              </button>
              {funkyToolsMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-dark-secondary border border-dark rounded-md shadow-lg z-50">
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
            <li ref={contactMenuRef} className="relative">
              <button 
                className="text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setContactMenuOpen(!contactMenuOpen)}
                onMouseEnter={() => setContactMenuOpen(true)}
              >
                Contact
              </button>
              {contactMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-dark-secondary border border-dark rounded-md shadow-lg z-50">
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
