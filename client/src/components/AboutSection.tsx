import { motion } from "framer-motion";
import { Check, Scroll, Lightbulb, Briefcase, GraduationCap, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const areaOfExpertise = [
  { id: 1, name: "B2B: SaaS" },
  { id: 2, name: "HR tech and job boards" },
  { id: 3, name: "Mobility" },
  { id: 4, name: "Web3" },
  { id: 5, name: "Rapid prototyping with AI" },
];

const superpowers = [
  { id: 1, name: "User research - feeling as bad as the customer", icon: Scroll },
  { id: 2, name: "Being hands-on to make good calls", icon: Briefcase },
  { id: 3, name: "Avoiding sunken cost fallacy", icon: Target },
  { id: 4, name: "Working on: getting rid of biases and overfitting data", icon: Lightbulb },
];

const AboutSection = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="about" className="py-16 md:py-24 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[#f8f8f0] mb-4 leading-relaxed">
                Product Manager from Budapest, Hungary, with a passion for research. 
                Discovery is what makes me truly happy - finding the intersection between 
                user needs and business opportunities.
              </p>
              <p className="text-[#f8f8f0] mb-6 leading-relaxed">
                I'm a Reforge alumni, having completed both the Mastering PM and 
                Strategy and Growth Series. These programs have shaped my strategic 
                approach to product development.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-8">Areas of Expertise</h3>
              <div className="grid grid-cols-1 gap-2">
                <ul className="space-y-2 text-[#f8f8f0]">
                  {areaOfExpertise.map((area) => (
                    <li key={area.id} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      {area.name}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-dark-secondary p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-6">Superpowers</h3>
              <div className="space-y-6">
                {superpowers.map((power) => (
                  <div key={power.id} className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                      <power.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-white">{power.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-white font-medium">Reforge Alumni</span>
                </div>
                <p className="text-[#f8f8f0] text-sm mt-2">
                  Mastering Product Management, Strategy and Growth Series
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
