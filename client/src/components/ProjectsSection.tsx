import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projectsData";
import ProjectModal from "./ProjectModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import Analytics from "@/lib/analytics";
// Import Embla Carousel
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { ref, controls } = useScrollAnimation();
  const isMobile = useIsMobile();
  
  // Setup Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: isMobile ? 'center' : 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    inViewThreshold: 0.7
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const activeProjects = projects.filter(project => project.active);

  // Navigation and initialization callbacks for Embla
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    
    // Only track if slide actually changed
    if (newIndex !== activeSlide) {
      const newProject = activeProjects[newIndex];
      if (newProject) {
        Analytics.trackEvent('Carousel Slide Change', {
          project_id: newProject.id,
          project_title: newProject.title,
          project_type: newProject.type,
          slide_index: newIndex
        });
      }
    }
    setActiveSlide(newIndex);
    
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, activeProjects, activeSlide]);
  
  // Set up carousel when it's ready
  useEffect(() => {
    if (!emblaApi) return;
    
    // Save all snap positions
    setScrollSnaps(emblaApi.scrollSnapList());
    
    // Initial button state
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    
    // Add event listeners
    emblaApi.on('select', onSelect);
    
    // Cleanup on unmount
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

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
        className="group project-card bg-dark rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
        onClick={() => openModal(project.id)}
      >
        <div className="relative" style={{ aspectRatio: '3/2' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {!isMobile && (
            <div className="project-overlay absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/50 to-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-medium rounded-full shadow-lg hover:bg-white/20 transition-all duration-200">
                View Case Study
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 ${isMobile ? 'p-3' : 'p-5'}`}>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {project.type}
          </span>
          <h3 className={`font-semibold mt-2 mb-2 group-hover:text-primary transition-colors ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className={`text-[#f8f8f0] ${isMobile ? 'text-xs line-clamp-3 mb-4' : 'text-sm'}`}>
            {project.shortText}
          </p>
          {isMobile && (
            <button 
              className="mt-1 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-medium rounded-full shadow-md hover:bg-white/20 transition-all duration-200 w-full flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation(); // Stop event bubbling to prevent duplicate modal opening
                openModal(project.id);
              }}
            >
              <span>View Case Study</span>
              <ArrowRight className="h-3 w-3 ml-2" />
            </button>
          )}
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
          {/* Embla Carousel */}
          <div className="embla projects-embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {activeProjects.map((project) => (
                  <div className="embla__slide" key={project.id}>
                    <div className="embla__slide__inner h-full px-4 pb-10">
                      <ProjectCard project={project} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons - now showing on all devices */}
            <button 
              className="embla__prev embla__button" 
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous slide"
            >
              <ChevronLeft strokeWidth={1.5} />
            </button>
            <button 
              className="embla__next embla__button" 
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next slide"
            >
              <ChevronRight strokeWidth={1.5} />
            </button>
            
            {/* Dots navigation */}
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
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
