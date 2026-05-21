import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../data/profile";

const categoryDescriptions = {
  Backend: "Building high-performance APIs, secure authentication systems, and scalable server-side architectures.",
  Database: "Designing relational & non-relational database schemas, indexes, and optimized query paths.",
  "DevOps & Cloud": "Containerizing applications, building automated CI/CD pipelines, and managing cloud infrastructure.",
  Frontend: "Developing clean, interactive, and responsive user interfaces with modern client-side technologies.",
  Tools: "Managing version control systems, testing endpoints, and maintaining efficient developer workflows."
};

const categoryIcons = {
  Backend: (
    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  Database: (
    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  "DevOps & Cloud": (
    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  Frontend: (
    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Tools: (
    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

const Skills = () => {
  const categories = [
    { key: "Backend", title: "Backend Systems" },
    { key: "Database", title: "Databases & Cache" },
    { key: "DevOps & Cloud", title: "DevOps & Infrastructure" },
    { key: "Frontend", title: "Frontend Development" },
    { key: "Tools", title: "Tools & Systems" }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    }
  };

  return (
    <section 
      id="skills" 
      className="w-full py-40 sm:py-48 bg-bg-primary border-b border-border-card relative overflow-hidden"
    >
      {/* High tech subtle grid canvas background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e24_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-purple-500/10 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mono-font mb-4">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Skills & Core Technologies
          </h2>
          <p className="text-base text-neutral-400 mt-4 leading-relaxed">
            A grouped breakdown of languages, systems, and tools I use to build scalable server applications and full-stack solutions.
          </p>
        </div>

        {/* Clean, interactive grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14"
        >
          {categories.map((cat, idx) => {
            const data = skillsData[cat.key] || [];
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="p-10 sm:p-12 rounded-2xl border border-neutral-850 bg-bg-card transition-all duration-300 hover:border-purple-500/25 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-xl bg-bg-darker/60 border border-neutral-850">
                        {categoryIcons[cat.key]}
                      </div>
                      <h3 className="text-base font-bold uppercase tracking-wider text-neutral-200 mono-font">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-xs text-purple-400 font-bold px-2.5 py-0.5 rounded bg-purple-500/5 border border-purple-500/10 mono-font">
                      {data.length} skills
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-450 leading-relaxed mb-8 font-sans">
                    {categoryDescriptions[cat.key]}
                  </p>
                </div>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2.5 pt-6 border-t border-neutral-900/60">
                  {data.map((skill, sIdx) => {
                    let logoSrc = skill.logo;
                    if (skill.name.toLowerCase() === "tailwind css" || skill.name.toLowerCase() === "tailwind") {
                      logoSrc = "/assets/logos/tailwindcss.svg";
                    } else if (skill.name.toLowerCase() === "vite") {
                      logoSrc = "/assets/logos/vitejs.svg";
                    } else if (skill.name.toLowerCase() === "c++") {
                      logoSrc = "/assets/logos/cplusplus.svg";
                    } else if (["java", "python", "sql", "bash"].includes(skill.name.toLowerCase())) {
                      logoSrc = null;
                    }

                    return (
                      <div
                        key={sIdx}
                        className="px-3.5 py-1.5 rounded-lg border border-neutral-850 bg-bg-darker/60 hover:bg-bg-card-hover text-xs font-semibold mono-font text-neutral-300 hover:text-purple-400 transition-all duration-200 flex items-center gap-2 hover:border-purple-500/20 hover:scale-[1.02] cursor-default select-none"
                      >
                        {logoSrc ? (
                          <img
                            src={logoSrc}
                            alt={skill.name}
                            className="w-4 h-4 object-contain opacity-70 transition-opacity"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                        )}
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
