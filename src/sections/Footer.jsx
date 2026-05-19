import React from "react";
import { motion } from "framer-motion";
import { socials, profileInfo } from "../data/profile";

const getSocialIcon = (name) => {
  switch (name.toLowerCase()) {
    case "github":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.375a1.252 1.252 0 0 1 0-1.707l4.51-4.375c.466-.451 1.211-.451 1.677 0l2.69 2.607c.466.452.466 1.18 0 1.631L13.59 16.71c-.466.452-1.211.452-1.678 0l-1.69-1.638a.5.5 0 0 0-.69.01c-.198.203-.198.534 0 .737l1.69 1.638c1.242 1.203 3.256 1.203 4.498 0l2.69-2.607a1.252 1.252 0 0 0 0-1.707L13.79 8.648a3.256 3.256 0 0 0-4.498 0l-4.51 4.375a3.337 3.337 0 0 0 0 4.552l4.51 4.375c1.242 1.203 3.256 1.203 4.498 0l2.69-2.607a.5.5 0 0 0 0-.713.5.5 0 0 0-.689.01zm3.898-4.502a.5.5 0 0 1-.708 0 .5.5 0 0 1 0-.707L20.88 11.23a.5.5 0 0 1 .708 0 .5.5 0 0 1 0 .707l-1.587 1.492zm-12.7-4.108c0-.682.553-1.235 1.235-1.235h4.94c.682 0 1.235.553 1.235 1.235v2.47c0 .682-.553 1.235-1.235 1.235h-4.94a1.235 1.235 0 0 1-1.235-1.235v-2.47z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );
  }
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* ── CTA Contact Banner ── */}
      <section className="w-full bg-bg-primary border-t border-border-card py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-neutral-850 bg-bg-card/75 backdrop-blur-md p-10 md:p-16 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-purple-500/20 transition-all duration-500 group"
          >
            {/* Ambient glows */}
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
            {/* Decorative grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="max-w-xl">
                <span className="inline-block px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-semibold tracking-wider uppercase mono-font">
                  Open to Opportunities
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 leading-tight">
                  Let's Build Something<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Extraordinary</span> Together.
                </h2>
                <p className="text-sm text-neutral-400 mt-4 leading-relaxed max-w-md font-sans">
                  I'm actively looking for backend engineering, DevOps, or full-stack roles — internships or entry-level positions. I build systems that scale. Let's connect.
                </p>

                {/* Contact details as styled rows */}
                <div className="mt-6 space-y-2">
                  {[
                    { label: "Email", value: profileInfo.email, href: `mailto:${profileInfo.email}` },
                    { label: "Phone", value: profileInfo.phone, href: `tel:${profileInfo.phone}` },
                    { label: "Location", value: profileInfo.location, href: null }
                  ].map(({ label, value, href }) => (
                    <div key={label} className="flex items-center gap-3 text-xs text-neutral-400 font-sans">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-600 mono-font w-14 shrink-0">{label}</span>
                      <span className="w-px h-3 bg-neutral-850" />
                      {href ? (
                        <a href={href} className="hover:text-purple-400 transition-colors duration-200">{value}</a>
                      ) : (
                        <span>{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${profileInfo.email}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.25)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.45)] tracking-wide cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={profileInfo.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg border border-neutral-850 bg-bg-darker/60 hover:bg-bg-card-hover hover:border-purple-500/30 text-neutral-300 hover:text-white font-semibold text-sm transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Résumé
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── True Footer Bar ── */}
      <footer className="w-full bg-bg-darker py-10 border-t border-neutral-850/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Branding */}
          <div>
            <p className="mono-font text-neutral-400 font-bold text-sm">
              Built by kr_sanjeev · © {year}
            </p>
            <p className="text-[10px] text-neutral-600 tracking-wide uppercase mono-font mt-1">
              Systems &amp; Infrastructure Portfolio · React, Vite &amp; Framer Motion
            </p>
          </div>

          {/* Social Icon Row */}
          <div className="flex items-center gap-3">
            {socials.map((social, index) => (
              <div key={index} className="relative group">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-850 bg-bg-card/75 backdrop-blur-md text-neutral-400 hover:text-purple-400 hover:border-purple-500/20 hover:bg-bg-card-hover transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                >
                  {getSocialIcon(social.name)}
                </a>
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 scale-0 group-hover:scale-100 transition-transform duration-150 bg-bg-darker border border-neutral-850 text-[10px] text-neutral-300 px-2.5 py-1 rounded-lg mono-font whitespace-nowrap z-30 pointer-events-none shadow-xl">
                  {social.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
