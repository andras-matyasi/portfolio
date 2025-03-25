import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Real references data
const references = [
  {
    id: 1,
    name: "Áron Albert",
    position: "Software Engineer, Kameleo",
    quote: "András was keen on knowing the users and their needs better. He is the most user-centric PMs I ever worked with, actively seeking insights and feedback. I could feel the pain of the user when reading the PRDs.",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQGYKO-mdYXhkg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1712325416363?e=1748476800&v=beta&t=hvz7YLJNlxvKxQDCxhRA2h23wrhB5aRecDihRg5lSYo"
  },
  {
    id: 2,
    name: "Ferenc Agócs",
    position: "Software Engineer, Kameleo",
    quote: "Andris always had a clear idea for our product, and focused on what matters. His keen attention to all the different moving parts and processes in the life of our product always kept us on track. His professional skill and fun personality is something I wish I had at all my previous jobs.",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQGX2FNMIRQ-WQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681594537997?e=1748476800&v=beta&t=xg--Q_KS8HTNMiENc04mKmlvbLPHpwVUh7rRacBDGio"
  },
  {
    id: 3,
    name: "Bence Gulyás",
    position: "Full-stack Product Designer, Freelance (profession.hu)",
    quote: "What set Andris apart was his balanced approach to decision-making. He skillfully filtered senior stakeholder input while facilitating unbiased trade-offs during the design process. This collaborative approach kept us focused on solving the right problems.",
    imageUrl: "https://media.licdn.com/dms/image/v2/C4D03AQF_4uj0A567jg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1612304072619?e=1748476800&v=beta&t=nOkhTpJ0XKilv1cZMeebsXNIWc_Z-BGPC84ciae-FUg"
  },
  {
    id: 4,
    name: "Fanni Csomós",
    position: "Marketing Manager, Kameleo",
    quote: "Andris is the kind of product guy every team needs. He knows exactly when to push, when to say no, and how to balance user insights without blindly following requests. He has a killer instinct for strategy, collaborates seamlessly with marketing, stays hands-on when needed, and ensures great ideas turn into real impact. Smart, driven, and always two steps ahead. If you get the chance to work with him, take it.",
    imageUrl: "https://media.licdn.com/dms/image/v2/C4E03AQF3PFEEFsHxfg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1624865088478?e=1748476800&v=beta&t=FqnO1AAZy0Wk95u04gVWJSy6lFZcGHc3X5_XO-1koSw"
  },
  {
    id: 5,
    name: "Ádám Kóbor",
    position: "Senior Software Engineer, Lovely Systems",
    quote: "Throughout our collaboration, Andras consistently showed exceptional resilience and leadership, steering our teams effectively even in a demanding and high-pressure environment. He maintained focus on delivering value to users and the business, while skillfully managing competing priorities and expectations from various stakeholders.",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQH2h1x8BaSE7w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728410409203?e=1748476800&v=beta&t=-coc9IAtv2MQgObLysamSTn4nDrv8YelAXLMm0Epero"
  },
  {
    id: 6,
    name: "Eszter Somogyi-Vass",
    position: "Product Lead, profession,hu",
    quote: "I've had the pleasure of working closely with Andris, and I can confidently say he's one of the best product managers I've collaborated with. His attention to detail is great, and he always keeps the user experience at the heart of every decision. Beyond that, Andris is a fantastic communicator and works seamlessly with teams across the board—whether it's engineering, design, or stakeholders. He has a knack for bringing people together to solve problems efficiently.",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQESn2zA4XEGHQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1729507589620?e=1748476800&v=beta&t=-VeNfPXRbJUquduiW_XJ7r9kwAyjSHzmC0SxWZCxVz8"
  },
  {
    id: 7,
    name: "Balázs Wágner",
    position: "UX Designer, Bitrise",
    quote: "It's really easy to work with András, I really enjoyed it. As a senior product manager, he had a sharp vision while giving me a high degree of freedom. He was prepared and focused, keeping projects on track. The work we did together had an impact and was fun, too.",
    imageUrl: "https://media.licdn.com/dms/image/v2/C4E03AQHDNXxZVBhqvQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1628000953607?e=1748476800&v=beta&t=npMO5V5fYJ4wVgpJzUHvtaOjw8Y51OmNVowaARd7iLw"
  },
  {
    id: 8,
    name: "Ádám Krajcs",
    position: "Lead Software Engineer, profession.hu",
    quote: "I had the pleasure of working with Andris for several years at Profession.hu. He has an exceptional ability to define and communicate a clear product vision while ensuring alignment between business goals and user needs. Andris is highly data-driven, making informed decisions based on thorough analysis while also valuing user feedback and market trends.",
    imageUrl: "https://media.licdn.com/dms/image/v2/C4E03AQGWJqyze1aZDQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1606301602048?e=1748476800&v=beta&t=c5TlKGyGzB1aOAXHglWZJmhLp9RFrco_FDzPn3w8YXc"
  },
  {
    id: 9,
    name: "Balázs Sólyom",
    position: "Chief Data Officer, Trendency",
    quote: "Andris is the kind of person who, if dropped into the jungle with a few tools, would not only find his way back but might also return with a new idea or concept. Working with him is a great advantage because he doesn't just want to get things done - he wants to do them well. He's a consultant-minded colleague who actively seeks to understand the underlying problems behind each task and offers solutions to address them.",
    imageUrl: "https://media.licdn.com/dms/image/v2/C4E03AQGokA7aY9zomg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1621232009879?e=1748476800&v=beta&t=3g-rDHofbOAZm3JdJbdf5Eas6S6N50I8Ro_NXWItTts"
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
          <p className="text-[#f8f8f0]">What colleagues and clients say about my work</p>
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
              <p className="text-[#f8f8f0] italic mb-6 flex-grow">"{reference.quote}"</p>
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
                  <p className="text-sm text-[#f8f8f0]">{reference.position}</p>
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