import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar, Utensils, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Analytics from "@/lib/analytics";

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [funkyToolsMenuOpen, setFunkyToolsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactMenuRef = useRef<HTMLLIElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const funkyToolsMenuRef = useRef<HTMLLIElement>(null);
  const funkyToolsDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
      
      // Close mobile menu when clicking outside
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        (event.target as Element).tagName !== 'BUTTON'
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contactMenuRef, funkyToolsMenuRef, mobileMenuRef]);

  // Handlers for menu interactions
  const handleFunkyToolsMouseEnter = () => {
    setFunkyToolsMenuOpen(true);
    setContactMenuOpen(false);
  };

  const handleContactMouseEnter = () => {
    setContactMenuOpen(true);
    setFunkyToolsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when a link is clicked and handle smooth scrolling
  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Close mobile menu
    setMobileMenuOpen(false);
    
    // Check if this is an anchor link
    const href = e.currentTarget.getAttribute('href');
    const linkText = e.currentTarget.textContent?.trim() || '';
    
    // Track click in Mixpanel
    Analytics.trackEvent('Navigation Click', {
      link: href,
      text: linkText,
      mobile: true
    });
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      // Find the target element and scroll to it smoothly
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Small delay to allow the menu to close first
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Account for header height
            behavior: 'smooth'
          });
        }, 300);
      }
    }
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

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a 
                  href="#case-studies" 
                  className="text-white hover:text-primary transition-colors"
                  onClick={(e) => {
                    // Track desktop navigation
                    Analytics.trackEvent('Navigation Click', {
                      link: '#case-studies',
                      text: 'Case Studies',
                      mobile: false
                    });
                  }}
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-white hover:text-primary transition-colors"
                  onClick={(e) => {
                    // Track desktop navigation
                    Analytics.trackEvent('Navigation Click', {
                      link: '#about',
                      text: 'About Me',
                      mobile: false
                    });
                  }}
                >
                  About Me
                </a>
              </li>
              <li>
                <a 
                  href="#references" 
                  className="text-white hover:text-primary transition-colors"
                  onClick={(e) => {
                    // Track desktop navigation
                    Analytics.trackEvent('Navigation Click', {
                      link: '#references',
                      text: 'References',
                      mobile: false
                    });
                  }}
                >
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
                  onClick={() => {
                    setFunkyToolsMenuOpen(!funkyToolsMenuOpen);
                    try {
                      Analytics.trackEvent('Menu Toggle', {
                        menu: 'funky_tools',
                        action: !funkyToolsMenuOpen ? 'open' : 'close',
                        mobile: false
                      });
                    } catch (err) {
                      console.error('Failed to track funky tools menu toggle:', err);
                    }
                  }}
                >
                  Funky tools
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" 
                    style={{ transform: funkyToolsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
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
                      onClick={() => {
                        Analytics.trackEvent('External Link Click', {
                          link: 'https://lunchvote.matyasi.me',
                          text: 'Lunchvote',
                          category: 'funky_tools',
                          mobile: false
                        });
                      }}
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
                  onClick={() => {
                    setContactMenuOpen(!contactMenuOpen);
                    try {
                      Analytics.trackEvent('Menu Toggle', {
                        menu: 'contact',
                        action: !contactMenuOpen ? 'open' : 'close',
                        mobile: false
                      });
                    } catch (err) {
                      console.error('Failed to track contact menu toggle:', err);
                    }
                  }}
                >
                  Contact
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200"
                    style={{ transform: contactMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
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
                      onClick={() => {
                        Analytics.trackEvent('Contact Click', {
                          method: 'email',
                          text: 'Email',
                          mobile: false
                        });
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/amatyasi/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block px-4 py-2 text-sm text-white hover:bg-dark/50 flex items-center"
                      onClick={() => {
                        Analytics.trackEvent('Contact Click', {
                          method: 'linkedin',
                          text: 'LinkedIn',
                          mobile: false
                        });
                      }}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                    <a 
                      href="https://calendly.com/andras-matyasi/30min" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block px-4 py-2 text-sm text-white hover:bg-dark/50 flex items-center"
                      onClick={() => {
                        Analytics.trackEvent('Contact Click', {
                          method: 'calendly',
                          text: 'Book a meeting',
                          mobile: false
                        });
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book a meeting
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        )}

        {/* Mobile Hamburger Menu Button */}
        {isMobile && (
          <button 
            className="text-white hover:text-primary transition-colors p-1"
            onClick={() => {
              toggleMobileMenu();
              try {
                Analytics.trackEvent('Menu Toggle', {
                  menu: 'mobile_main',
                  action: !mobileMenuOpen ? 'open' : 'close',
                  mobile: true
                });
              } catch (err) {
                console.error('Failed to track mobile menu toggle:', err);
              }
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu Panel */}
      {isMobile && (
        <motion.div
          ref={mobileMenuRef}
          className="bg-dark/95 border-t border-dark-secondary overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? "auto" : 0
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#case-studies" 
                className="text-white hover:text-primary transition-colors py-2 text-lg"
                onClick={handleMobileLinkClick}
              >
                Case Studies
              </a>
              <a 
                href="#about" 
                className="text-white hover:text-primary transition-colors py-2 text-lg"
                onClick={handleMobileLinkClick}
              >
                About Me
              </a>
              <a 
                href="#references" 
                className="text-white hover:text-primary transition-colors py-2 text-lg"
                onClick={handleMobileLinkClick}
              >
                References
              </a>
              
              {/* Funky Tools Accordion */}
              <div className="py-2">
                <button 
                  className="text-white hover:text-primary transition-colors flex items-center justify-between w-full text-lg"
                  onClick={() => {
                    setFunkyToolsMenuOpen(!funkyToolsMenuOpen);
                    try {
                      Analytics.trackEvent('Menu Toggle', {
                        menu: 'funky_tools',
                        action: !funkyToolsMenuOpen ? 'open' : 'close',
                        mobile: true
                      });
                    } catch (err) {
                      console.error('Failed to track mobile funky tools menu toggle:', err);
                    }
                  }}
                >
                  <span>Funky tools</span>
                  {funkyToolsMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {funkyToolsMenuOpen && (
                  <div className="mt-2 pl-4 border-l border-dark-secondary">
                    <a 
                      href="https://lunchvote.matyasi.me" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-2 text-white hover:text-primary transition-colors flex items-center"
                      onClick={(e) => {
                        Analytics.trackEvent('External Link Click', {
                          link: 'https://lunchvote.matyasi.me',
                          text: 'Lunchvote',
                          category: 'funky_tools',
                          mobile: true
                        });
                        handleMobileLinkClick(e);
                      }}
                    >
                      <Utensils className="h-4 w-4 mr-2" />
                      Lunchvote
                    </a>
                  </div>
                )}
              </div>
              
              {/* Contact Accordion */}
              <div className="py-2">
                <button 
                  className="text-white hover:text-primary transition-colors flex items-center justify-between w-full text-lg"
                  onClick={() => {
                    setContactMenuOpen(!contactMenuOpen);
                    try {
                      Analytics.trackEvent('Menu Toggle', {
                        menu: 'contact',
                        action: !contactMenuOpen ? 'open' : 'close',
                        mobile: true
                      });
                    } catch (err) {
                      console.error('Failed to track mobile contact menu toggle:', err);
                    }
                  }}
                >
                  <span>Contact</span>
                  {contactMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {contactMenuOpen && (
                  <div className="mt-2 pl-4 border-l border-dark-secondary">
                    <a 
                      href="mailto:andras@matyasi.me" 
                      className="block py-2 text-white hover:text-primary transition-colors flex items-center"
                      onClick={(e) => {
                        Analytics.trackEvent('Contact Click', {
                          method: 'email',
                          text: 'Email',
                          mobile: true
                        });
                        handleMobileLinkClick(e);
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/amatyasi/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-2 text-white hover:text-primary transition-colors flex items-center"
                      onClick={(e) => {
                        Analytics.trackEvent('Contact Click', {
                          method: 'linkedin',
                          text: 'LinkedIn',
                          mobile: true
                        });
                        handleMobileLinkClick(e);
                      }}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                    <a 
                      href="https://calendly.com/andras-matyasi/30min" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-2 text-white hover:text-primary transition-colors flex items-center"
                      onClick={(e) => {
                        Analytics.trackEvent('Contact Click', {
                          method: 'calendly',
                          text: 'Book a meeting',
                          mobile: true
                        });
                        handleMobileLinkClick(e);
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book a meeting
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
