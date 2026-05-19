import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/profile";

const ProjectSpecModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-2xl border border-neutral-850 bg-bg-card/90 backdrop-blur-xl overflow-hidden max-h-[90vh] flex flex-col shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-bg-darker border border-neutral-850 text-neutral-400 hover:text-white hover:border-purple-500/20 transition-all z-20 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Banner */}
        <div className="relative h-56 bg-neutral-900 flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-2.5 py-0.5 rounded border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[9px] font-bold uppercase tracking-widest mono-font mb-2 inline-block">
              Specification Log
            </span>
            <h2 className="text-2xl font-bold text-neutral-100 leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
          {/* Overview */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mono-font mb-2">
              System Overview
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Details */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mono-font mb-2">
              System Architecture & Flow
            </h4>
            <div className="p-4 rounded-lg bg-bg-darker border border-neutral-900 text-xs text-neutral-400 leading-relaxed font-mono">
              {project.architecture}
            </div>
          </div>

          {/* Key Deliverables / Metrics */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mono-font mb-2">
              Technical Deliverables
            </h4>
            <ul className="space-y-2.5">
              {project.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <span className="text-purple-400 select-none">✦</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-neutral-900 bg-bg-darker flex items-center justify-between flex-shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] text-neutral-400 bg-bg-card border border-neutral-850 mono-font"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-neutral-400 hover:text-white uppercase mono-font flex items-center gap-1.5"
            >
              Codebase
              <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 16 } 
    }
  };

  return (
    <section 
      id="projects" 
      className="w-full py-32 sm:py-40 bg-bg-primary border-b border-border-card relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Intro */}
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-purple-500/10 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mono-font mb-4">
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Projects That Show How I Build
          </h2>
          <p className="text-base text-neutral-400 mt-4 leading-relaxed">
            Backend systems, cloud workflows, CI/CD pipelines, and full-stack engineering.
          </p>
        </div>

        {/* Dynamic Interactive Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12"
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              variants={cardVariants}
              className="rounded-2xl border border-neutral-850 bg-bg-card hover:border-purple-500/25 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] group h-full"
            >
              {/* Top Banner Image / Preview Area */}
              <div className="relative h-64 sm:h-72 overflow-hidden border-b border-neutral-900 bg-neutral-950 flex-shrink-0">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-75 group-hover:scale-[1.02] group-hover:opacity-90 transition-all duration-500 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                
                {/* Badge Number */}
                <div className="absolute top-6 left-6 px-3 py-1 rounded bg-bg-darker/90 border border-neutral-850 text-[10px] font-bold tracking-wider mono-font text-purple-400 uppercase">
                  Project 0{idx + 1}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-100 group-hover:text-purple-300 transition-colors duration-300 leading-tight mb-3">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                    {proj.intro}
                  </p>

                  {/* Architecture Paragraph Block */}
                  <div className="p-4 rounded-xl bg-bg-darker/50 border border-neutral-900 mb-6">
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mono-font block mb-1.5">
                      Architecture Paradigm
                    </span>
                    <p className="text-xs text-neutral-450 leading-relaxed font-mono">
                      {proj.architecture}
                    </p>
                  </div>
                </div>

                {/* Tags and Footer */}
                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded text-[10px] text-neutral-400 bg-bg-darker/60 border border-neutral-850 mono-font uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-900/60">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors duration-300 uppercase mono-font flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 outline-none"
                    >
                      <span>View System Specs</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-neutral-400 hover:text-white transition-colors duration-300 uppercase mono-font flex items-center gap-1.5"
                    >
                      <span>Codebase</span>
                      <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Specification Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectSpecModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
