import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skills = [
  { id: 1, name: "UX/UI Design" },
  { id: 2, name: "User Research" },
  { id: 3, name: "Wireframing" },
  { id: 4, name: "Prototyping" },
  { id: 5, name: "Design Systems" },
  { id: 6, name: "User Testing" },
];

const AboutSection = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                I'm a product designer with over 5 years of experience creating
                digital products that balance business goals with user needs. I
                specialize in user-centered design processes that deliver
                meaningful and delightful experiences.
              </p>
              <p className="text-secondary mb-6 leading-relaxed">
                My approach combines strategic thinking with practical execution.
                I work closely with development teams to ensure designs are
                implemented with the highest quality while maintaining
                feasibility.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-8">Core Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-secondary">
                    {skills.slice(0, 3).map((skill) => (
                      <li key={skill.id} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-primary" />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-secondary">
                    {skills.slice(3).map((skill) => (
                      <li key={skill.id} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-primary" />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Designer portrait"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
