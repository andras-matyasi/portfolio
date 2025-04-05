import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar, Utensils, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { colors } from "@/lib/colors";

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [petProjectsMenuOpen, setPetProjectsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactMenuRef = useRef<HTMLLIElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const petProjectsMenuRef = useRef<HTMLLIElement>(null);
  const petProjectsDropdownRef = useRef<HTMLDivElement>(null);
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
        petProjectsMenuRef.current && 
        !petProjectsMenuRef.current.contains(event.target as Node) && 
        petProjectsDropdownRef.current && 
        !petProjectsDropdownRef.current.contains(event.target as Node)
      ) {
        setPetProjectsMenuOpen(false);
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
  }, [contactMenuRef, petProjectsMenuRef, mobileMenuRef]);

  // Handlers for menu interactions
  const handlePetProjectsMouseEnter = () => {
    setPetProjectsMenuOpen(true);
    setContactMenuOpen(false);
  };

  const handleContactMouseEnter = () => {
    setContactMenuOpen(true);
    setPetProjectsMenuOpen(false);
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: isScrolled ? `${colors.darkBlue}e6` : 'transparent', // e6 is ~90% opacity in hex
        borderColor: isScrolled ? `${colors.darkBlueDark}` : 'transparent',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={(e) => {
        // Global mouse move to detect when mouse is far from any menu
        if (contactMenuOpen) {
          handleMouseMove(e, contactMenuRef, setContactMenuOpen);
        }
        if (petProjectsMenuOpen) {
          handleMouseMove(e, petProjectsMenuRef, setPetProjectsMenuOpen);
        }
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <a 
          href="#top" 
          className="text-xl font-semibold tracking-tight bg-clip-text text-transparent transition-all duration-300"
          style={{ 
            backgroundImage: `linear-gradient(to right, ${colors.orange}, ${colors.teal})`,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundImage = `linear-gradient(to right, ${colors.orangeDark}, ${colors.tealDark})`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundImage = `linear-gradient(to right, ${colors.orange}, ${colors.teal})`;
          }}
        >
          Andras Matyasi
        </a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a 
                  href="#case-studies" 
                  className="text-white transition-colors"
                  style={{ 
                    transition: 'color 0.3s ease' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.orange;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-white transition-colors"
                  style={{ 
                    transition: 'color 0.3s ease' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.orange;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  About Me
                </a>
              </li>
              <li>
                <a 
                  href="#references" 
                  className="text-white transition-colors"
                  style={{ 
                    transition: 'color 0.3s ease' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.orange;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  References
                </a>
              </li>
              <li 
                ref={petProjectsMenuRef} 
                className="relative"
                onMouseEnter={handlePetProjectsMouseEnter}
              >
                <button 
                  className="text-white transition-colors flex items-center"
                  style={{ 
                    transition: 'color 0.3s ease' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.orange;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}
                  onClick={() => setPetProjectsMenuOpen(!petProjectsMenuOpen)}
                >
                  Pet projects
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" 
                    style={{ transform: petProjectsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {petProjectsMenuOpen && (
                  <div 
                    ref={petProjectsDropdownRef}
                    className="absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg z-50"
                    style={{
                      backgroundColor: `${colors.darkBlue}f5`,
                      borderColor: colors.darkBlueDark,
                      border: `1px solid ${colors.darkBlueDark}`
                    }}
                    onMouseEnter={handlePetProjectsMouseEnter}
                  >
                    <a 
                      href="https://lunchvote.matyasi.me" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block px-4 py-2 text-sm text-white flex items-center"
                      style={{ transition: 'background-color 0.2s ease, color 0.2s ease' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.darkBlueDark}`;
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'white';
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
                  className="text-white transition-colors flex items-center"
                  style={{ 
                    transition: 'color 0.3s ease' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.orange;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}
                  onClick={() => setContactMenuOpen(!contactMenuOpen)}
                >
                  Contact
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200"
                    style={{ transform: contactMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {contactMenuOpen && (
                  <div 
                    ref={contactDropdownRef}
                    className="absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg z-50"
                    style={{
                      backgroundColor: `${colors.darkBlue}f5`,
                      borderColor: colors.darkBlueDark,
                      border: `1px solid ${colors.darkBlueDark}`
                    }}
                    onMouseEnter={handleContactMouseEnter}
                  >
                    <a 
                      href="mailto:andras@matyasi.me" 
                      className="block px-4 py-2 text-sm text-white flex items-center"
                      style={{ transition: 'background-color 0.2s ease, color 0.2s ease' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.darkBlueDark}`;
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/amatyasi/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block px-4 py-2 text-sm text-white flex items-center"
                      style={{ transition: 'background-color 0.2s ease, color 0.2s ease' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.darkBlueDark}`;
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                    <a 
                      href="https://calendly.com/andras-matyasi/30min" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block px-4 py-2 text-sm text-white flex items-center"
                      style={{ transition: 'background-color 0.2s ease, color 0.2s ease' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.darkBlueDark}`;
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'white';
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
            className="text-white transition-colors p-1"
            style={{ 
              transition: 'color 0.3s ease' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = colors.orange;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'white';
            }}
            onClick={toggleMobileMenu}
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
          className="border-t overflow-hidden"
          style={{
            backgroundColor: `${colors.darkBlue}f2`, // f2 is ~95% opacity in hex
            borderColor: colors.darkBlueDark,
          }}
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
                className="text-white transition-colors py-2 text-lg"
                style={{ 
                  transition: 'color 0.3s ease' 
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.orange;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onClick={handleMobileLinkClick}
              >
                Case Studies
              </a>
              <a 
                href="#about" 
                className="text-white transition-colors py-2 text-lg"
                style={{ 
                  transition: 'color 0.3s ease' 
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.orange;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onClick={handleMobileLinkClick}
              >
                About Me
              </a>
              <a 
                href="#references" 
                className="text-white transition-colors py-2 text-lg"
                style={{ 
                  transition: 'color 0.3s ease' 
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.orange;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onClick={handleMobileLinkClick}
              >
                References
              </a>
              
              {/* Pet Projects Accordion */}
              <div className="py-2">
                <button 
                  className="text-white transition-colors flex items-center justify-between w-full text-lg"
                  style={{ 
                    transition: 'color 0.3s ease' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.orange;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}
                  onClick={() => setPetProjectsMenuOpen(!petProjectsMenuOpen)}
                >
                  <span>Pet projects</span>
                  {petProjectsMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {petProjectsMenuOpen && (
                  <div className="mt-2 pl-4 border-l border-dark-secondary">
                    <a 
                      href="https://lunchvote.matyasi.me" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-2 text-white flex items-center"
                      style={{ 
                        transition: 'color 0.3s ease',
                        marginLeft: '1px' 
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'white';
                      }}
                      onClick={handleMobileLinkClick}
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
                  className="text-white transition-colors flex items-center justify-between w-full text-lg"
                  style={{ 
                    transition: 'color 0.3s ease' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.orange;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'white';
                  }}
                  onClick={() => setContactMenuOpen(!contactMenuOpen)}
                >
                  <span>Contact</span>
                  {contactMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {contactMenuOpen && (
                  <div className="mt-2 pl-4 border-l border-dark-secondary">
                    <a 
                      href="mailto:andras@matyasi.me" 
                      className="block py-2 text-white flex items-center"
                      style={{ 
                        transition: 'color 0.3s ease',
                        marginLeft: '1px' 
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'white';
                      }}
                      onClick={handleMobileLinkClick}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/amatyasi/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-2 text-white flex items-center"
                      style={{ 
                        transition: 'color 0.3s ease',
                        marginLeft: '1px' 
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'white';
                      }}
                      onClick={handleMobileLinkClick}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                    <a 
                      href="https://calendly.com/andras-matyasi/30min" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block py-2 text-white flex items-center"
                      style={{ 
                        transition: 'color 0.3s ease',
                        marginLeft: '1px' 
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = colors.orange;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'white';
                      }}
                      onClick={handleMobileLinkClick}
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