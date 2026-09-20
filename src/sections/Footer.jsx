import React from "react";
import { motion } from "framer-motion";
import { socials } from "../data/profile";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-card bg-bg-darker">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="#home"
              className="text-base font-bold text-white hover:text-purple-400 transition-colors duration-200 mono-font flex items-center gap-1.5 mb-4"
            >
              kr_sanjeev:<span className="text-purple-400">~</span>$
            </a>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Backend systems · Open source · Distributed infrastructure
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${socials.find(s => s.name === 'GitHub')?.href || ''}`}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
              >
                Email
              </a>
              <a
                href="https://github.com/knockknock10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/-sanjeev-kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="/Kr_Sanjeev_Resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
              >
                Resume
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-neutral-500 hover:text-purple-400 transition-colors duration-200"
                >
                  {social.name === "GitHub" && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.name === "LinkedIn" && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {social.name === "LeetCode" && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.375a1.252 1.252 0 01 0-1.707l4.51-4.375c.466-.451 1.211-.451 1.677 0l2.69 2.607c.466.452.466 1.18 0 1.631L13.59 16.71c-.466.452-1.211.452-1.678 0l-1.69-1.638a.5.5 0 00-.69.01c-.198.203-.198.534 0 .737l1.69 1.638c1.242 1.203 3.256 1.203 4.498 0l2.69-2.607a1.252 1.252 0 00 0-1.707L13.79 8.648a3.256 3.256 0 00-4.498 0l-4.51 4.375a3.337 3.337 0 00 0 4.552l4.51 4.375c1.242 1.203 3.256 1.203 4.498 0l2.69-2.607a.5.5 0 00 0-.713.5.5 0 00-.689.01zm3.898-4.502a.5.5 0 01-.708 0 .5.5 0 01 0-.707L20.88 11.23a.5.5 0 01 .708 0 .5.5 0 01 0 .707l-1.587 1.492zm-12.7-4.108c0-.682.553-1.235 1.235-1.235h4.94c.682 0 1.235.553 1.235 1.235v2.47c0 .682-.553 1.235-1.235 1.235h-4.94a1.235 1.235 0 01-1.235-1.235v-2.47z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="sm:ml-auto self-end">
            <p className="text-[10px] text-neutral-600 mono-font">
              © {year} Sanjeev Kumar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
