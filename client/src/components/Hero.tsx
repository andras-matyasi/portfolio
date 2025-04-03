import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ActivityService from "@/lib/activity";

const Hero = () => {
  return (
    <section className="pt-32 pb-8 md:pt-48 md:pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            I translate user pain into business gain
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl leading-relaxed mb-8 text-balance bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your Product guy, turning 'we should build this' into 'our users love this.'
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="#case-studies" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              onClick={() => {
                ActivityService.logClick('cta-work-button', 'navigation', {
                  cta_text: 'Check out my work',
                  section: 'hero',
                  destination: 'case_studies'
                });
              }}
            >
              Check out my work
              <ChevronDown className="h-4 w-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
