import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data, title, subtitle }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Read scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  // Calculate transform values for height and opacity
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full py-32 sm:py-40 px-6 sm:px-12 max-w-7xl mx-auto" ref={containerRef}>
      {/* Title block */}
      <div className="mb-20 text-center max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full border border-purple-500/10 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mono-font mb-3">
          Path to Mastery
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
          {title || "Engineering Journey"}
        </h2>
        {subtitle && (
          <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-10">
        {/* Center line track for desktop, left line track for mobile */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-850/60 -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
          {/* Animated active progress tracker (purple-indigo) */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-purple-600 via-indigo-500 to-transparent rounded-full shadow-[0_0_12px_rgba(139,92,246,0.3)]"
          />
        </div>

        {data.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`group relative flex flex-col md:flex-row items-stretch justify-between mb-12 md:mb-16 w-full ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Card component */}
              <div className="w-full md:w-[45%] pl-10 md:pl-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
                  className="h-full p-6 rounded-2xl border border-neutral-850 bg-bg-card hover:bg-bg-card-hover hover:border-purple-500/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.03)] relative overflow-hidden"
                >
                  {/* Subtle top ambient bar */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Header info (Mobile layout) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-semibold tracking-wider uppercase mono-font">
                      {item.year || item.date}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mono-font">
                      {item.institution || item.job}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-200 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  {item.details && item.details.length > 0 && (
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[11px] text-neutral-400 leading-relaxed">
                          <span className="text-purple-400 select-none mt-0.5">✦</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!item.details && item.contents && (
                    <ul className="space-y-2">
                      {item.contents.map((content, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[11px] text-neutral-400 leading-relaxed">
                          <span className="text-purple-400 select-none mt-0.5">✦</span>
                          <span>{content}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>

              {/* Node dot in center */}
              <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-bg-primary border border-neutral-850 flex items-center justify-center group-hover:border-purple-500/50 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 group-hover:bg-purple-500 transition-all duration-300" />
                </div>
              </div>

              {/* Spacing spacer for desktop grid spacing */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
