import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileInfo, experiences, mySocials } from "../constants";

const QuickViewModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-2xl overflow-hidden border border-neutral-850 bg-bg-card backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
        >
          {/* Top Bar (OS/Terminal styled) */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-bg-darker/90 border-b border-neutral-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
              <span className="ml-2 text-xs text-neutral-500 mono-font">recruiter_summary.sh</span>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer p-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:thin]">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-block px-2.5 py-0.5 text-[10px] font-semibold text-purple-400 bg-purple-500/5 rounded border border-purple-500/10 mono-font">
                SYSTEM DIAGNOSTIC: PASS
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{profileInfo.name}</h3>
              <p className="text-xs text-neutral-400 mono-font leading-relaxed">{profileInfo.role}</p>
            </div>

            {/* Summary Block */}
            <div className="p-4 bg-bg-darker/60 border border-neutral-850 rounded-xl">
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans">
                {profileInfo.summary}
              </p>
            </div>

            {/* Matrix Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Education */}
              <div className="p-4 border border-neutral-850 rounded-xl bg-bg-darker/30">
                <h4 className="text-[10px] font-semibold text-purple-400 tracking-wider uppercase mono-font mb-2">Education</h4>
                <p className="text-xs font-bold text-neutral-200">B.Tech CSE — SRM University AP</p>
                <p className="text-[10px] text-neutral-500 mt-1 mono-font">CGPA: 8.42 | SGPA: 8.73 (2024-2028)</p>
              </div>

              {/* Open Source */}
              <div className="p-4 border border-neutral-850 rounded-xl bg-bg-darker/30">
                <h4 className="text-[10px] font-semibold text-purple-400 tracking-wider uppercase mono-font mb-2">Open Source</h4>
                <p className="text-xs font-bold text-neutral-200">Webpack JS Organization</p>
                <p className="text-[10px] text-emerald-400 mt-1 mono-font">PR #20356 Merged (webpack-cli)</p>
              </div>
            </div>

            {/* Quick Skills */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-semibold text-purple-400 tracking-wider uppercase mono-font">Core Engineering Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "MongoDB", "React.js", "REST APIs", "JWT Auth", "Docker", "Kubernetes", "AWS S3", "Linux", "Git"].map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-[11px] text-neutral-300 bg-bg-darker/60 border border-neutral-850 rounded mono-font"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-neutral-900/60">
              <a
                href="https://kr-sanjeev.netlify.app/Kr_Sanjeev_Resume.pdf"
                download
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-[0_4px_15px_rgba(139,92,246,0.2)] transition-all duration-200 mono-font uppercase tracking-wider cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Resume
              </a>

              <a
                href={`mailto:${profileInfo.email}`}
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-neutral-300 bg-bg-darker/60 border border-neutral-850 hover:bg-bg-card-hover hover:border-purple-500/30 rounded-lg transition-all duration-200 mono-font uppercase tracking-wider cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/255" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Instant Email
              </a>

              <div className="flex gap-3.5 sm:ml-auto items-center justify-center pt-2 sm:pt-0">
                {mySocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-neutral-850 rounded-lg bg-bg-darker/60 hover:bg-bg-card-hover hover:border-purple-500/20 text-neutral-400 hover:text-purple-400 transition-all duration-300 cursor-pointer flex items-center justify-center"
                    title={social.name}
                  >
                    {social.name.toLowerCase() === "github" ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    ) : social.name.toLowerCase() === "linkedin" ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.375a1.252 1.252 0 0 1 0-1.707l4.51-4.375c.466-.451 1.211-.451 1.677 0l2.69 2.607c.466.452.466 1.18 0 1.631L13.59 16.71c-.466.452-1.211.452-1.678 0l-1.69-1.638a.5.5 0 0 0-.69.01c-.198.203-.198.534 0 .737l1.69 1.638c1.242 1.203 3.256 1.203 4.498 0l2.69-2.607a1.252 1.252 0 0 0 0-1.707L13.79 8.648a3.256 3.256 0 0 0-4.498 0l-4.51 4.375a3.337 3.337 0 0 0 0 4.552l4.51 4.375c1.242 1.203 3.256 1.203 4.498 0l2.69-2.607a.5.5 0 0 0 0-.713.5.5 0 0 0-.689.01zm3.898-4.502a.5.5 0 0 1-.708 0 .5.5 0 0 1 0-.707L20.88 11.23a.5.5 0 0 1 .708 0 .5.5 0 0 1 0 .707l-1.587 1.492zm-12.7-4.108c0-.682.553-1.235 1.235-1.235h4.94c.682 0 1.235.553 1.235 1.235v2.47c0 .682-.553 1.235-1.235 1.235h-4.94a1.235 1.235 0 0 1-1.235-1.235v-2.47z"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
