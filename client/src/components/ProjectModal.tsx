import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { projects } from "@/data/projectsData";

interface ProjectModalProps {
  projectId: string;
  onClose: () => void;
}

const ProjectModal = ({ projectId, onClose }: ProjectModalProps) => {
  const project = projects.find((p) => p.id === projectId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center modal">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-dark/80 backdrop-blur-md"
        ></motion.div>
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-dark-secondary rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-fade-in"
        >
          <button
            className="absolute top-4 right-4 text-[#f8f8f0] hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-8">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {project.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
              {project.title}
            </h2>
            <p className="text-[#f8f8f0]">{project.fullDescription}</p>
          </div>

          <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <img
              src={project.coverImage}
              alt={`${project.title} Overview`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Role</h3>
              <p className="text-[#f8f8f0]">{project.role}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Timeline</h3>
              <p className="text-[#f8f8f0]">{project.timeline}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Tools</h3>
              <p className="text-[#f8f8f0]">{project.tools}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            {project.overview.map((paragraph, index) => (
              <p key={index} className="text-[#f8f8f0] mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.process.slice(0, 2).map((step, index) => (
                <div key={index}>
                  <h4 className="text-lg font-medium mb-2">{step.title}</h4>
                  <p className="text-[#f8f8f0] mb-4">{step.description}</p>
                </div>
              ))}
              {project.process.slice(2).map((step, index) => (
                <div key={index + 2}>
                  <h4 className="text-lg font-medium mb-2">{step.title}</h4>
                  <p className="text-[#f8f8f0]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {project.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${project.title} Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Results</h3>
            <p className="text-[#f8f8f0] mb-4">{project.results}</p>
          </div>

          <div className="text-center">
            <button
              className="inline-flex items-center px-5 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
              onClick={onClose}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
