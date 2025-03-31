import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projectsData";
import ProjectModal from "./ProjectModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  const { ref, controls } = useScrollAnimation();
  const isMobile = useIsMobile();

  const activeProjects = projects.filter(project => project.active);

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setActiveSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const openModal = (projectId: string) => {
    setSelectedProject(projectId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <motion.div
      variants={item}
      className="group project-card bg-dark rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full max-w-[40%] mx-auto md:max-w-full"
      onClick={() => openModal(project.id)}
    >
      <div className="relative" style={{ aspectRatio: '3/2' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="project-overlay absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1.5 border border-white/30 text-white text-xs md:text-sm font-medium rounded-lg">
            View Case Study
          </span>
        </div>
      </div>
      <div className="p-3 md:p-5">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {project.type}
        </span>
        <h3 className="text-base md:text-xl font-semibold mt-1 md:mt-2 mb-1 md:mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-[#f8f8f0] text-xs md:text-sm">{project.shortText}</p>
      </div>
    </motion.div>
  );

  return (
    <section id="case-studies" className="pt-12 pb-0 md:pt-16 md:pb-0 bg-dark overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Case Studies</h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="flex">
            {/* Left Arrow - Full height */}
            <button 
              onClick={() => api?.scrollPrev()}
              className="flex items-center justify-center w-14 md:w-20 bg-dark hover:bg-dark-secondary transition-all duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-full h-full text-primary/80 hover:text-primary transition-colors"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </div>
            </button>

            {/* Carousel content */}
            <div className="flex-1">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true
                }}
              >
                <CarouselContent className="-ml-4">
                  {activeProjects.map((project) => (
                    <CarouselItem 
                      key={project.id} 
                      className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="h-full">
                        <ProjectCard project={project} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* These are hidden but still needed for API functionality */}
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
              </Carousel>
            </div>

            {/* Right Arrow - Full height */}
            <button 
              onClick={() => api?.scrollNext()}
              className="flex items-center justify-center w-14 md:w-20 bg-dark hover:bg-dark-secondary transition-all duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-full h-full text-primary/80 hover:text-primary transition-colors"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-8 gap-2">
            {activeProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "bg-primary" : "bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="text-center my-10">
          <a
            href="#contact"
            className="inline-flex items-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-600 transition-colors font-medium"
          >
            Interested in working together?
            <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          projectId={selectedProject}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
