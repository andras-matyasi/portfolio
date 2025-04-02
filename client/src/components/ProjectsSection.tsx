import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projectsData";
import ProjectModal from "./ProjectModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import Analytics from "@/lib/analytics";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { ref, controls } = useScrollAnimation();
  const isMobile = useIsMobile();
  const swiperRef = useRef<any>(null);

  const activeProjects = projects.filter(project => project.active);

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
          {/* Swiper component */}
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
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
            onSlideChange={(swiper) => {
              const newSlideIndex = swiper.realIndex;
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
            }}
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
            className="projects-swiper"
          >
            {activeProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="h-full px-1 pb-10">
                  <ProjectCard project={project} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
