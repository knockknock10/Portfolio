import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { profileInfo } from "../data/profile";

const HeroText = () => {
  const words = ["Backend Systems", "Cloud Workflows", "Developer Tools", "Full-Stack Products", "Open Source"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 }
    }
  };

  return (
    <motion.div 
      className="z-10 text-center md:text-left flex flex-col items-center md:items-start max-w-2xl px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Intro Badge */}
      <motion.div 
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 mb-6 shadow-[0_0_15px_rgba(139,92,246,0.05)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider mono-font">
          Full-Stack Developer • Backend Engineering • DevOps Enthusiast
        </span>
      </motion.div>

      {/* Main Heading with dynamic word cycle loop */}
      <motion.h1 
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-[56px] font-extrabold text-neutral-100 tracking-tight leading-[1.1] mb-8 flex flex-col items-center md:items-start w-full"
      >
        <span className="text-xl sm:text-2xl md:text-3xl font-medium text-purple-400 mb-6 font-mono block">
          Hi, I'm Kr Sanjeev
        </span>
        <div className="flex flex-col items-center md:items-start w-full leading-[1.1]">
          <span className="text-neutral-100 mb-2">
            Building
          </span>
          <span className="relative inline-block w-full h-[1.3em] overflow-visible">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute left-0 top-0 w-full text-center md:text-left block text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f8f9fa] to-[#d1d5db] drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)] font-extrabold tracking-tight"
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <span className="text-lg sm:text-xl md:text-2xl font-normal mt-6 tracking-normal text-neutral-400 font-sans block">
          for modern engineering teams.
        </span>
      </motion.h1>

      {/* Supporting Text */}
      <motion.p 
        variants={itemVariants}
        className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl text-pretty"
      >
        {profileInfo.supportingText}
      </motion.p>

      {/* Action Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-4 items-center justify-center md:justify-start"
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-lg border border-purple-500/30 bg-gradient-to-b from-purple-500/15 to-purple-500/5 hover:from-purple-500/25 hover:to-purple-500/10 text-purple-400 hover:text-purple-300 font-bold tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 backdrop-blur-md cursor-pointer flex items-center gap-2 text-xs uppercase mono-font"
        >
          View Projects
        </a>

        <a
          href="#console"
          className="px-6 py-3 rounded-lg border border-neutral-850 bg-gradient-to-b from-bg-card to-bg-darker hover:from-bg-card-hover hover:to-bg-card text-neutral-300 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md cursor-pointer text-xs uppercase mono-font shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          Open Console
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroText;
