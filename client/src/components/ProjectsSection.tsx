import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projectsData";
import ProjectModal from "./ProjectModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { ref, controls } = useScrollAnimation();

  const openModal = (projectId: string) => {
    setSelectedProject(projectId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="work" className="pt-12 pb-0 md:pt-16 md:pb-0 bg-dark-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Selected Work</h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group project-card bg-dark rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={() => openModal(project.id)}
            >
              <div className="relative aspect-video">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="project-overlay absolute inset-0 bg-dark/60 opacity-0 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 border border-white/30 text-white text-sm font-medium rounded-lg">
                    View Case Study
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary text-sm">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mb-0 pb-0">
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
