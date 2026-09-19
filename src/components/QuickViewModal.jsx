import { AnimatePresence } from "framer-motion";
import { projects } from "../data/profile";

const ProjectSpecModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl rounded-2xl border border-neutral-850 bg-bg-card/90 backdrop-blur-xl overflow-hidden max-h-[90vh] flex flex-col shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-bg-darker border border-neutral-850 text-neutral-400 hover:text-white hover:border-purple-500/20 transition-all z-20 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative h-56 bg-neutral-900 flex-shrink-0">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-2.5 py-0.5 rounded border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[9px] font-bold uppercase tracking-widest mono-font mb-2 inline-block">
                Specification Log
              </span>
              <h2 className="text-2xl font-bold text-neutral-100 leading-tight">{project.title}</h2>
            </div>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mono-font mb-2">System Overview</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">{project.description}</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mono-font mb-2">System Architecture</h4>
              <div className="p-4 rounded-lg bg-bg-darker border border-neutral-900 text-xs text-neutral-400 leading-relaxed font-mono">
                {project.architecture}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mono-font mb-2">Technical Deliverables</h4>
              <ul className="space-y-2.5">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <span className="text-purple-400 select-none">✦</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-6 border-t border-neutral-900 bg-bg-darker flex items-center justify-between flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[10px] text-neutral-400 bg-bg-card border border-neutral-850 mono-font">
                  {tag}
                </span>
              ))}
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-neutral-400 hover:text-white uppercase mono-font flex items-center gap-1.5">
              Codebase
              <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectSpecModal;
