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
          className="relative bg-dark-secondary rounded-xl w-[40%] max-w-4xl max-h-[90vh] overflow-y-auto p-3 md:p-8 animate-fade-in"
        >
          <button
            className="absolute top-3 right-3 md:top-4 md:right-4 text-[#f8f8f0] hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="mb-5 md:mb-8">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {project.type}
            </span>
            <h2 className="text-xl md:text-3xl font-bold mt-1 md:mt-2 mb-2 md:mb-4">
              {project.title}
            </h2>
            <p className="text-[#f8f8f0] text-sm md:text-base">{project.shortText}</p>
          </div>

          <div className="w-full mb-5 md:mb-8 rounded-lg overflow-hidden" style={{ aspectRatio: '3/2' }}>
            <img
              src={project.image}
              alt={`${project.title} Overview`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-5 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Problem</h3>
            <p className="text-[#f8f8f0] text-sm md:text-base mb-2 md:mb-4">{project.problem}</p>
          </div>

          <div className="mb-5 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Solution</h3>
            <p className="text-[#f8f8f0] text-sm md:text-base mb-2 md:mb-4">{project.solution}</p>
          </div>

          <div className="mb-5 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Success</h3>
            <p className="text-[#f8f8f0] text-sm md:text-base mb-2 md:mb-4">{project.success}</p>
          </div>

          <div className="mb-5 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Key Learnings</h3>
            <ul className="list-disc pl-4 md:pl-5 space-y-1 md:space-y-2">
              {project.keyLearnings.map((learning, index) => (
                <li key={index} className="text-[#f8f8f0] text-sm md:text-base">
                  {learning}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <button
              className="inline-flex items-center px-4 py-1.5 md:px-5 md:py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors text-sm md:text-base font-medium"
              onClick={onClose}
            >
              <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
              Back to Projects
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
