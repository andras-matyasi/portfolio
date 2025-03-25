import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <li>
              <a href="#contact" className="text-white hover:text-primary transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
