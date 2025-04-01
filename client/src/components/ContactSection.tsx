import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MixpanelService from "@/lib/mixpanel";

const contactMethods = [
  {
    id: 1,
    title: "Email",
    value: "andras@matyasi.me",
    href: "mailto:andras@matyasi.me",
    icon: Mail,
  },
  {
    id: 2,
    title: "LinkedIn",
    value: "Andras Matyasi",
    href: "https://www.linkedin.com/in/amatyasi/",
    icon: Linkedin,
  },
  {
    id: 3,
    title: "Book a Meeting",
    value: "Calendly",
    href: "https://calendly.com/andras-matyasi/30min",
    icon: Calendar,
  },
];

const ContactSection = () => {
  const { ref, controls } = useScrollAnimation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="pt-0 pb-8 md:pt-0 md:pb-10 bg-dark-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium">
            Interested in working together? Feel free to reach out for
            collaborations (project-based or long-term) or just a friendly hello.
          </p>

          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
          >
            {contactMethods.map((method) => (
              <motion.div
                key={method.id}
                variants={item}
                className="p-6 bg-dark rounded-xl"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <a
                  href={method.href}
                  target={method.id !== 1 ? "_blank" : undefined}
                  rel={method.id !== 1 ? "noopener noreferrer" : undefined}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-600 transition-colors font-medium"
                  onClick={() => {
                    try {
                      MixpanelService.trackEvent('Contact Click', {
                        method: method.title.toLowerCase(),
                        section: 'contact_section',
                        value: method.value
                      });
                    } catch (err) {
                      console.error('Failed to track contact click:', err);
                    }
                  }}
                >
                  {method.value}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
