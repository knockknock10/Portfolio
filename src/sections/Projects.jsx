import { motion } from "framer-motion";
import { projects } from "../data/profile";

// Featured project gets full treatment; others get compact overview
const featuredProject = projects.find(p => p.id === "commithub");
const otherProjects = projects.filter(p => p.id !== "commithub");

const ProjectCaseStudy = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 sm:p-10 lg:p-12 border border-neutral-800 bg-bg-card hover:border-neutral-700 transition-all duration-300"
  >
    {/* Left: visual / diagram area */}
    <div className="flex-shrink-0 w-full lg:w-[40%] h-[200px] sm:h-[240px] lg:h-full min-h-[200px] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
      {/* Project number */}
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-800 text-[10px] font-bold text-neutral-400 mono-font uppercase tracking-wider">
        Project {String(index + 1).padStart(2, '0')}
      </div>
    </div>

    {/* Right: content */}
    <div className="flex-1">
      {/* Badge + title */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mono-font px-2 py-0.5 rounded border border-purple-500/10 bg-purple-500/5">
          {project.id === "commithub" ? "Featured" : "Work"}
        </span>
        <span className="text-[10px] text-neutral-600 mono-font">
          {project.tags.join(" · ")}
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
        {project.title}
      </h3>

      <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-4">
        {project.intro}
      </p>

      {/* Architecture summary */}
      <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 mb-5">
        <p className="text-xs text-neutral-500 leading-relaxed font-mono">
          {project.architecture}
        </p>
      </div>

      {/* Details */}
      <ul className="space-y-2 mb-6">
        {project.details.map((d, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-400">
            <span className="text-purple-400 mt-0.5">→</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60">
        <div className="flex items-center gap-4">
          {project.live && (
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold mono-font">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Demo
            </span>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors duration-200 mono-font flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Codebase
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="w-full py-24 sm:py-32 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mono-font mb-4">
            Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            What I&apos;ve Built
          </h2>
          <p className="text-neutral-500 max-w-xl text-sm sm:text-base leading-relaxed">
            A selection of systems I&apos;ve designed and shipped — from full-stack platforms
            to containerized microservices.
          </p>
        </div>

        {/* Featured project — full width, dominates */}
        {featuredProject && (
          <div className="mb-12 sm:mb-16">
            <ProjectCaseStudy project={featuredProject} index={0} />
          </div>
        )}

        {/* Other projects — compact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((proj, i) => (
            <ProjectCaseStudy key={proj.id} project={proj} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
