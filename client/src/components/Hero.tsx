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
      {/* Purple blue blob 1 */}
      <motion.div 
        className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-purple-700/20 rounded-full blur-3xl"
        initial={{ opacity: 0.5 }}
        animate="animate"
        variants={blobVariants}
        style={{ animation: "pulse 15s infinite ease-in-out" }}
      />
      
      {/* Blue indigo blob 2 */}
      <motion.div 
        className="absolute top-[20%] -right-[30%] w-[70%] h-[70%] bg-gradient-to-bl from-blue-500/15 via-violet-500/10 to-indigo-600/20 rounded-full blur-3xl"
        initial={{ opacity: 0.6 }}
        animate="animate"
        variants={blob2Variants}
        style={{ animation: "pulse 18s infinite ease-in-out 2s" }}
      />
      
      {/* Small accent blob */}
      <motion.div 
        className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-tr from-purple-600/10 via-blue-400/15 to-indigo-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0.5 }}
        animate="animate"
        variants={blob3Variants}
        style={{ animation: "pulse 20s infinite ease-in-out 4s" }}
      />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 animated-grid opacity-30"></div>
      
      {/* Additional animated elements */}
      <div className="absolute top-[40%] left-[50%] w-24 h-24 rounded-full bg-blue-500/5" 
           style={{ animation: "float 8s infinite ease-in-out" }}></div>
      <div className="absolute top-[20%] left-[20%] w-16 h-16 rounded-full bg-purple-500/5" 
           style={{ animation: "float 12s infinite ease-in-out 2s" }}></div>
      <div className="absolute top-[70%] right-[30%] w-20 h-20 rounded-full bg-indigo-500/5" 
           style={{ animation: "float 10s infinite ease-in-out 1s" }}></div>
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
            <a 
              href="#work" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Check out my work</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
