import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Sample references data
const references = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "VP of Product, TechCorp",
    quote: "Andras has an exceptional ability to understand complex user needs and translate them into actionable product strategies. His work transformed our approach to product development.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "CEO, StartupXYZ",
    quote: "Working with Andras on our SaaS platform was a game-changer. His strategic mindset and attention to detail helped us achieve a 40% increase in user engagement.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: 3,
    name: "Emily Chen",
    position: "Head of UX, InnovateDesign",
    quote: "Andras bridges the gap between business objectives and user experience perfectly. His collaborative approach made our project not only successful but enjoyable.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  }
];

const ReferencesSection = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="references" className="py-16 md:py-24 bg-dark-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">References</h2>
          <p className="text-secondary">What colleagues and clients say about my work</p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {references.map((reference) => (
            <motion.div
              key={reference.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="bg-dark p-6 rounded-xl shadow-md flex flex-col h-full"
            >
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary/40" />
              </div>
              <p className="text-secondary italic mb-6 flex-grow">"{reference.quote}"</p>
              <div className="flex items-center mt-auto">
                <div className="mr-4">
                  <img 
                    src={reference.imageUrl} 
                    alt={reference.name} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white">{reference.name}</h4>
                  <p className="text-sm text-secondary">{reference.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReferencesSection;