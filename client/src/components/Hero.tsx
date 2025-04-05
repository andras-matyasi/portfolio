import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Analytics from "@/lib/analytics";
import { colors } from "@/lib/colors";

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
            className="text-lg md:text-xl leading-relaxed mb-8 text-balance bg-gradient-to-r from-teal-400 via-orange-500 to-teal-600 bg-clip-text text-transparent font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ 
              backgroundImage: `linear-gradient(to right, ${colors.teal}, ${colors.orange}, ${colors.teal})` 
            }}
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
              className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              style={{ 
                background: `linear-gradient(to right, ${colors.darkBlue}, ${colors.teal})`,
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = `linear-gradient(to right, ${colors.darkBlueDark}, ${colors.tealDark})`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = `linear-gradient(to right, ${colors.darkBlue}, ${colors.teal})`;
              }}
              onClick={() => {
                try {
                  Analytics.trackEvent('CTA Click', {
                    cta_text: 'Check out my work',
                    cta_location: 'hero_section',
                    destination: 'case_studies_section'
                  });
                } catch (err) {
                  console.error('Failed to track CTA click:', err);
                }
              }}
            >
              Check out my work
              <ChevronDown className="h-4 w-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
      <div 
        className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full blur-3xl"
        style={{ background: `${colors.orange}20` }} // 20 adds opacity (~12%)
      ></div>
      <div 
        className="absolute top-24 -left-24 w-64 h-64 rounded-full blur-3xl"
        style={{ background: `${colors.teal}15` }} // 15 adds opacity (~8%)
      ></div>
      <div 
        className="absolute top-64 right-24 w-48 h-48 rounded-full blur-3xl"
        style={{ background: `${colors.darkBlue}10` }} // 10 adds opacity (~6%)
      ></div>
    </section>
  );
};

export default Hero;
