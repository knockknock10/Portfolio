import React from "react";
import { motion } from "framer-motion";
import { openSourceInfo } from "../data/profile";

const OpenSource = () => {
  const { highlight, impact } = openSourceInfo;

  return (
    <section id="opensource" className="w-full py-32 sm:py-40 bg-bg-primary border-b border-border-card relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-purple-500/10 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mono-font mb-4">
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Open Source & Contributions
          </h2>
          <p className="text-base text-neutral-400 mt-4 leading-relaxed">
            Contributing to high-impact foundations of the JavaScript ecosystem.
          </p>
        </div>

        {/* PR Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-stretch">
          {/* Left panel: PR inspect info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-8 rounded-xl border border-neutral-850 bg-bg-card backdrop-blur-md flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.25)] relative overflow-hidden group hover:border-purple-500/25 transition-all duration-300"
          >
            {/* Ambient violet glow in top right */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-300" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                {/* Repository Title */}
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 fill-current text-neutral-400" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-bold text-neutral-300 mono-font">
                    {highlight.repo}
                  </span>
                </div>

                {/* PR Status Badge */}
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide mono-font">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Merged
                </span>
              </div>

              {/* PR Title */}
              <h3 className="text-2xl font-extrabold text-neutral-100 mb-4 tracking-tight leading-snug">
                {highlight.title}
              </h3>
              
              <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                {highlight.subtext}
              </p>
            </div>

            {/* Contribution Stats Panel */}
            <div className="space-y-4 pt-6 border-t border-neutral-850/60">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-bg-darker/60 border border-neutral-850">
                  <span className="block text-[10px] text-neutral-500 font-medium uppercase mono-font mb-1">
                    Weekly DLs
                  </span>
                  <span className="text-lg font-extrabold text-purple-400">
                    28M+
                  </span>
                </div>
                <div className="p-4 rounded-lg bg-bg-darker/60 border border-neutral-850">
                  <span className="block text-[10px] text-neutral-500 font-medium uppercase mono-font mb-1">
                    Workflow
                  </span>
                  <span className="text-xs font-bold text-neutral-300">
                    CLA Verified
                  </span>
                </div>
              </div>

              <a
                href={highlight.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-center text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 border border-purple-500/25 hover:border-purple-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mono-font shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              >
                Inspect Pull Request
                <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-xl border border-neutral-850 bg-bg-card backdrop-blur-md flex flex-col justify-center shadow-[0_4px_25px_rgba(0,0,0,0.25)] hover:border-purple-500/20 transition-all duration-500 group"
          >
            <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-purple-400 mono-font mb-8">
              Engineering Impact & Contributions
            </h4>
            <div className="space-y-8">
              {impact.map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-neutral-850 bg-bg-darker flex items-center justify-center text-purple-400 text-sm font-bold shadow-inner">
                    0{index + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-neutral-300 font-sans">
                      {index === 0 ? "Documentation Clarity" : index === 1 ? "Contributor Friction Reduction" : "Collaborative Standards"}
                    </p>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
