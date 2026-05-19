import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experienceInfo } from "../data/profile";

// Individual timeline node
const TimelineEntry = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={`relative flex items-start gap-0 md:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-row group`}
    >
      {/* Card Content */}
      <div className={`flex-1 ${isEven ? "md:text-left" : "md:text-right"} pb-12`}>
        <div
          className="p-8 rounded-xl border border-neutral-850 bg-bg-card hover:bg-bg-card-hover hover:border-purple-500/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.2)] group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.03)] relative overflow-hidden"
        >
          {/* Top ambient line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Period Badge */}
          <span className="inline-block px-2.5 py-0.5 rounded bg-purple-500/5 text-purple-400 border border-purple-500/15 text-[10px] font-bold uppercase tracking-widest mono-font mb-4">
            {exp.period}
          </span>

          {/* Role & Company */}
          <h3 className="text-xl font-bold text-neutral-100 group-hover:text-purple-400 transition-colors duration-200 leading-snug">
            {exp.role}
          </h3>
          <p className="text-sm text-neutral-500 mt-1 mb-5 font-medium">
            {exp.company}
          </p>

          {/* Divider */}
          <div className="h-[1px] bg-neutral-900/60 mb-5" />

          {/* Impact Points */}
          <ul className="space-y-3">
            {exp.impact.map((point, idx) => (
              <li key={idx} className={`flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed ${isEven ? "" : "md:flex-row-reverse md:text-right"}`}>
                <span className="text-purple-400 select-none mt-0.5 shrink-0">✦</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center Connector — only visible on md+ */}
      <div className="hidden md:flex flex-col items-center shrink-0 w-12 relative z-10">
        {/* Dot Node */}
        <div className="w-4 h-4 rounded-full border-2 border-neutral-850 bg-bg-primary group-hover:border-purple-500/50 group-hover:shadow-[0_0_14px_rgba(139,92,246,0.3)] transition-all duration-300 mt-8 shrink-0" />
      </div>

      {/* Mobile left accent bar */}
      <div className="md:hidden w-px bg-neutral-900 absolute left-0 top-0 h-full" />

      {/* Empty side — fills the other half of the 2-col layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

const Experiences = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="w-full py-32 sm:py-40 bg-bg-primary border-b border-border-card">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">

        {/* Section Header */}
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-purple-500/10 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mono-font mb-4">
            Career Log
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Experience & Impact
          </h2>
          <p className="text-base text-neutral-400 mt-4 leading-relaxed">
            Professional internships, independent infrastructure work, and open source contributions — all engineered to deliver measurable results.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Animated vertical spine — grows on scroll */}
          <div className="absolute left-1/2 hidden md:block top-0 bottom-0 w-[1px] bg-neutral-900 -translate-x-1/2 overflow-hidden">
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-purple-500/60 via-indigo-500/30 to-transparent"
            />
          </div>

          {/* Timeline Entries */}
          <div className="space-y-4">
            {experienceInfo.map((exp, idx) => (
              <TimelineEntry key={idx} exp={exp} index={idx} />
            ))}
          </div>
        </div>

        {/* End marker */}
        <div className="hidden md:flex items-center justify-center mt-6 gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neutral-900" />
          <span className="text-[10px] text-neutral-500 mono-font uppercase tracking-widest select-none">Present</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neutral-900" />
        </div>

      </div>
    </section>
  );
};

export default Experiences;
