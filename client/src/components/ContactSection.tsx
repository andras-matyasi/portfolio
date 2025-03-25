import { motion } from "framer-motion";
import { Mail, Users, Hash } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contactMethods = [
  {
    id: 1,
    title: "Email",
    value: "hello@andrasmatyasi.com",
    href: "mailto:hello@andrasmatyasi.com",
    icon: Mail,
  },
  {
    id: 2,
    title: "LinkedIn",
    value: "linkedin.com/in/andrasmatyasi",
    href: "#",
    icon: Users,
  },
  {
    id: 3,
    title: "Dribbble",
    value: "dribbble.com/andrasmatyasi",
    href: "#",
    icon: Hash,
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
    <section id="contact" className="py-20 md:py-32 bg-dark-secondary">
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
            collaborations or just a friendly hello.
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
                  className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-600 transition-colors font-medium"
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
