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
import Analytics from "@/lib/analytics";

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
      const newSlideIndex = api.selectedScrollSnap();
      // Only track if slide actually changed
      if (newSlideIndex !== activeSlide) {
        const newProject = activeProjects[newSlideIndex];
        if (newProject) {
          Analytics.trackEvent('Carousel Slide Change', {
            project_id: newProject.id,
            project_title: newProject.title,
            project_type: newProject.type,
            slide_index: newSlideIndex
          });
        }
      }
      setActiveSlide(newSlideIndex);
    };
    
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api, activeSlide, activeProjects]);

  const openModal = (projectId: string) => {
    // Find the project to get its details for tracking
    const project = projects.find(p => p.id === projectId);
    
    // Track case study view
    if (project) {
      Analytics.trackEvent('View Case Study', {
        project_id: projectId,
        project_title: project.title,
        project_type: project.type
      });
    }
    
    setSelectedProject(projectId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    // Track case study close
    if (selectedProject) {
      const project = projects.find(p => p.id === selectedProject);
      if (project) {
        Analytics.trackEvent('Close Case Study', {
          project_id: selectedProject,
          project_title: project.title,
          project_type: project.type
        });
      }
    }
    
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    const isMobile = useIsMobile();
    
    return (
      <motion.div
        variants={item}
        className="group project-card bg-dark rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
        onClick={() => openModal(project.id)}
      >
        <div className="relative" style={{ aspectRatio: '3/2' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="project-overlay absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-4 py-2 border border-white/30 text-white text-sm font-medium rounded-lg">
              View Case Study
            </span>
          </div>
        </div>
        <div className={`p-4 ${isMobile ? 'p-3' : 'p-5'}`}>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {project.type}
          </span>
          <h3 className={`font-semibold mt-2 mb-2 group-hover:text-primary transition-colors ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className={`text-[#f8f8f0] ${isMobile ? 'text-xs line-clamp-3' : 'text-sm'}`}>
            {project.shortText}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="case-studies" className="pt-12 pb-0 md:pt-16 md:pb-0 bg-dark overflow-hidden">
      <div className={`${isMobile ? 'px-0' : 'container mx-auto px-4 md:px-6'}`}>
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10 px-4"
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
          className="relative max-w-full overflow-hidden"
        >
          <div className="flex">
            {/* Left Arrow - Hidden on mobile, visible on desktop */}
            {!isMobile && (
              <button 
                onClick={() => {
                  api?.scrollPrev();
                  Analytics.trackEvent('Carousel Navigation', {
                    direction: 'previous',
                    current_slide: activeSlide
                  });
                }}
                className="flex items-center justify-center w-14 md:w-20 bg-dark hover:bg-dark-secondary transition-all duration-300 cursor-pointer hidden md:flex"
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
            )}

            {/* Carousel content */}
            <div className="flex-1">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: false, // Ensures snap behavior when swiping
                }}
              >
                <CarouselContent className="-ml-4">
                  {activeProjects.map((project) => (
                    <CarouselItem 
                      key={project.id} 
                      className={`pl-4 ${isMobile ? 'basis-[95%]' : 'basis-full md:basis-1/2 lg:basis-1/3'}`}
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

            {/* Right Arrow - Hidden on mobile, visible on desktop */}
            {!isMobile && (
              <button 
                onClick={() => {
                  api?.scrollNext();
                  Analytics.trackEvent('Carousel Navigation', {
                    direction: 'next',
                    current_slide: activeSlide
                  });
                }}
                className="flex items-center justify-center w-14 md:w-20 bg-dark hover:bg-dark-secondary transition-all duration-300 cursor-pointer hidden md:flex"
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
            )}
          </div>
          
          <div className="flex items-center justify-center mt-8 gap-2">
            {activeProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  api?.scrollTo(index);
                  // Only track if actually changing slides
                  if (activeSlide !== index) {
                    const targetProject = activeProjects[index];
                    Analytics.trackEvent('Carousel Dot Navigation', {
                      from_slide: activeSlide,
                      to_slide: index,
                      target_project: targetProject?.title
                    });
                  }
                }}
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
            onClick={() => {
              Analytics.trackEvent('CTA Click', {
                cta_text: 'Interested in working together?',
                cta_location: 'case_studies_section',
                destination: 'contact_section'
              });
            }}
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
