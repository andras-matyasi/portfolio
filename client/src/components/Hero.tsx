import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const AnimatedGradientBackground = () => {
  // Animation variants for the gradient blobs
  const blobVariants = {
    animate: {
      scale: [1, 1.1, 1.2, 1.1, 1],
      opacity: [0.5, 0.7, 0.6, 0.8, 0.5],
      rotate: [0, 15, 0, -15, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  };

  const blob2Variants = {
    animate: {
      scale: [1.1, 1, 1.2, 0.9, 1.1],
      opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
      rotate: [0, -20, 0, 20, 0],
      transition: {
        duration: 18,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  const blob3Variants = {
    animate: {
      scale: [0.9, 1.2, 1, 1.1, 0.9],
      opacity: [0.5, 0.6, 0.8, 0.7, 0.5],
      rotate: [0, 25, 0, -25, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
        delay: 2
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Main animated background with more visible gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-purple-900/5"></div>
      
      {/* Purple blue blob 1 */}
      <motion.div 
        className="blob blob-1 -top-[20%] -left-[5%] w-[90%] h-[90%]"
        initial={{ opacity: 0.5 }}
        animate="animate"
        variants={blobVariants}
      />
      
      {/* Blue indigo blob 2 */}
      <motion.div 
        className="blob blob-2 top-[10%] -right-[20%] w-[80%] h-[80%]"
        initial={{ opacity: 0.6 }}
        animate="animate"
        variants={blob2Variants}
      />
      
      {/* Small accent blob */}
      <motion.div 
        className="blob blob-3 bottom-[5%] left-[15%] w-[50%] h-[50%]"
        initial={{ opacity: 0.5 }}
        animate="animate"
        variants={blob3Variants}
      />
      
      {/* Animated particle elements */}
      <div className="particles-container absolute inset-0">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={index}
            className="hero-particle"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-blue-900/10 animate-pulse"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 animated-grid opacity-40"></div>
      
      {/* Additional animated floating elements */}
      <div className="floating-element top-[30%] left-[40%] w-32 h-32 bg-blue-500/10"></div>
      <div className="floating-element top-[15%] left-[25%] w-24 h-24 bg-purple-500/10" 
           style={{ animationDelay: "2s" }}></div>
      <div className="floating-element top-[60%] right-[20%] w-28 h-28 bg-indigo-500/10" 
           style={{ animationDelay: "1s" }}></div>
           
      {/* Moving light streaks */}
      <motion.div 
        className="hero-moving-streak hero-moving-streak-1 w-40"
        style={{ top: '30%', left: '-10%' }}
        animate={{ 
          left: ['0%', '100%'],
          opacity: [0, 0.7, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          repeatType: "loop", 
          ease: "easeInOut", 
          times: [0, 0.5, 1] 
        }}
      />
      <motion.div 
        className="hero-moving-streak hero-moving-streak-2 w-60"
        style={{ top: '60%', left: '-10%' }}
        animate={{ 
          left: ['0%', '100%'],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "loop", 
          ease: "easeInOut",
          delay: 2,
          times: [0, 0.5, 1]
        }}
      />
    </div>
  );
};

const Hero = () => {
  // Handle scroll indicator animation
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <section className="pt-32 pb-24 md:pt-48 md:pb-32 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated gradient background */}
      <AnimatedGradientBackground />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            I translate user pain into business gain
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl leading-relaxed mb-8 text-balance gradient-text font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Your Product guy, turning 'we should build this' into 'our users love this.'
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#work" className="hero-button">
              <span className="relative z-10">Check out my work</span>
              <span className="hero-button-hover-overlay"></span>
              <ChevronDown className="h-4 w-4 ml-2 relative z-10" />
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Subtle scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm text-gray-400 mb-2">Scroll</span>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-gray-500 to-transparent"
          animate={{ 
            scaleY: [1, 0.8, 1],
            opacity: [0.7, 0.5, 0.7] 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
