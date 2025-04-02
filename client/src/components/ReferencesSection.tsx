import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useMemo, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Fisher-Yates (Knuth) shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Real references data
const referencesData = [
  {
    id: 1,
    name: "Áron Albert",
    position: "Software Engineer, Kameleo",
    quote: "András was keen on knowing the users and their needs better. He is the most user-centric PMs I ever worked with, actively seeking insights and feedback. I could feel the pain of the user when reading the PRDs.",
    imageUrl: "/images/references/1_Áron_Albert.jpg"
  },
  {
    id: 2,
    name: "Ferenc Agócs",
    position: "Software Engineer, Kameleo",
    quote: "Andris always had a clear idea for our product, and focused on what matters. His keen attention to all the different moving parts and processes in the life of our product always kept us on track. His professional skill and fun personality is something I wish I had at all my previous jobs.",
    imageUrl: "/images/references/2_Ferenc_Agócs.jpg"
  },
  {
    id: 3,
    name: "Bence Gulyás",
    position: "Product Designer, Freelance",
    quote: "What set Andris apart was his balanced approach to decision-making. He skillfully filtered senior stakeholder input while facilitating unbiased trade-offs during the design process. This collaborative approach kept us focused on solving the right problems.",
    imageUrl: "/images/references/3_Bence_Gulyás.jpg"
  },
  {
    id: 4,
    name: "Fanni Csomós",
    position: "Marketing Manager, Kameleo",
    quote: "Andris is the kind of product guy every team needs. He knows exactly when to push, when to say no, and how to balance user insights without blindly following requests. He has a killer instinct for strategy, collaborates seamlessly with marketing, stays hands-on when needed, and ensures great ideas turn into real impact. Smart, driven, and always two steps ahead. If you get the chance to work with him, take it.",
    imageUrl: "/images/references/4_Fanni_Csomós.jpg"
  },
  {
    id: 5,
    name: "Ádám Kóbor",
    position: "Senior Software Engineer, Lovely Systems",
    quote: "Throughout our collaboration, Andras consistently showed exceptional resilience and leadership, steering our teams effectively even in a demanding and high-pressure environment. He maintained focus on delivering value to users and the business, while skillfully managing competing priorities and expectations from various stakeholders.",
    imageUrl: "/images/references/5_Ádám_Kóbor.jpg"
  },
  {
    id: 6,
    name: "Eszter Somogyi-Vass",
    position: "Product Lead, profession,hu",
    quote: "I've had the pleasure of working closely with Andris, and I can confidently say he's one of the best product managers I've collaborated with. His attention to detail is great, and he always keeps the user experience at the heart of every decision. Beyond that, Andris is a fantastic communicator and works seamlessly with teams across the board—whether it's engineering, design, or stakeholders. He has a knack for bringing people together to solve problems efficiently.",
    imageUrl: "/images/references/6_Eszter_Somogyi-Vass.jpg"
  },
  {
    id: 7,
    name: "Balázs Wágner",
    position: "UX Designer, Bitrise",
    quote: "It's really easy to work with András, I really enjoyed it. As a senior product manager, he had a sharp vision while giving me a high degree of freedom. He was prepared and focused, keeping projects on track. The work we did together had an impact and was fun, too.",
    imageUrl: "/images/references/7_Balázs_Wágner.jpg"
  },
  {
    id: 8,
    name: "Ádám Krajcs",
    position: "Lead Software Engineer, profession.hu",
    quote: "I had the pleasure of working with Andris for several years at Profession.hu. He has an exceptional ability to define and communicate a clear product vision while ensuring alignment between business goals and user needs. Andris is highly data-driven, making informed decisions based on thorough analysis while also valuing user feedback and market trends.",
    imageUrl: "/images/references/8_Ádám_Krajcs.jpg"
  },
  {
    id: 9,
    name: "Balázs Sólyom",
    position: "Chief Data Officer, Trendency",
    quote: "Andris is the kind of person who, if dropped into the jungle with a few tools, would not only find his way back but might also return with a new idea or concept. Working with him is a great advantage because he doesn't just want to get things done - he wants to do them well. He's a consultant-minded colleague who actively seeks to understand the underlying problems behind each task and offers solutions to address them.",
    imageUrl: "/images/references/9_Balázs_Sólyom.jpg"
  }
];

const ReferencesSection = () => {
  const { ref, controls } = useScrollAnimation();
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);
  
  // Shuffle references once on component mount
  const references = useMemo(() => shuffleArray(referencesData), []);

  const isMobile = useIsMobile();

  const ReferenceCard = ({ reference }: { reference: typeof referencesData[0] }) => (
    <div className="bg-dark p-6 rounded-xl shadow-md flex flex-col h-full" style={{ minHeight: '300px' }}>
      <div className="mb-3">
        <Quote className="h-8 w-8 text-primary/40" />
      </div>
      <p className="text-[#f8f8f0] italic mb-6 text-sm flex-grow line-clamp-6">
        "{reference.quote}"
      </p>
      <div className="flex items-center mt-auto">
        <div className="mr-3">
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
    </div>
  );

  return (
    <section id="references" className="py-16 md:py-24 bg-dark-secondary">
      <div className={`${isMobile ? 'px-0' : 'container mx-auto px-4 md:px-6'}`}>
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">References</h2>
          <p className="text-[#f8f8f0]">Curious what it’s like to work with me? Here’s what my peers say - unpaid and flattering.</p>
        </motion.div>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-full overflow-hidden"
        >
          {/* Swiper component */}
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={15}
            slidesPerView={isMobile ? 1.05 : 3}
            centeredSlides={isMobile}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={!isMobile}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            breakpoints={{
              320: {
                slidesPerView: 1.05,
                spaceBetween: 15,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 25,
                centeredSlides: false,
              }
            }}
            className="reference-swiper"
          >
            {references.map((reference) => (
              <SwiperSlide key={reference.id}>
                <div className="h-full px-1 pb-10">
                  <ReferenceCard reference={reference} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          

        </motion.div>
      </div>
    </section>
  );
};

export default ReferencesSection;