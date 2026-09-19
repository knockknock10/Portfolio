import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const sectionIds = ["home", "about", "skills", "projects", "contact"];

function Navigation({ closeMenu, theme, toggleTheme, activeSection }) {
  const links = [
    { name: "Home", href: "#home" },
    { name: "Journey", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <ul className="nav-ul flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
      {links.map((link) => (
        <li key={link.name} className="nav-li flex items-center justify-center">
          <a
            className={`nav-link text-sm font-medium mono-font transition-colors duration-200 ${
              activeSection === link.name
                ? "text-accent font-semibold"
                : "text-neutral-400 hover:text-purple-400"
            }`}
            href={link.href}
            onClick={closeMenu}
          >
            {link.name}
            {activeSection === link.name && (
              <motion.span
                layoutId="activeNavIndicator"
                className="inline-block w-1 h-4 ml-1.5 bg-accent rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        </li>
      ))}
      <li className="flex items-center gap-3 sm:ml-2">
        <button
          onClick={toggleTheme}
          className="p-1.5 text-neutral-400 hover:text-purple-400 rounded-md transition-all duration-200 cursor-pointer flex items-center justify-center border border-transparent hover:border-neutral-850/40"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </li>
    </ul>
  );
}

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const handleActiveSection = () => {
      const scrollPos = window.scrollY + 120;
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleActiveSection, { passive: true });
    handleActiveSection();
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-[#050508]/35 border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          : "backdrop-blur-[2px] bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="flex items-center justify-between py-4">
          <a
            href="#home"
            className="text-base font-bold tracking-tight text-white hover:text-purple-400 transition-colors duration-200 mono-font flex items-center gap-1.5"
          >
            kr_sanjeev:<span className="text-purple-400">~</span>$
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <nav className="hidden sm:flex">
            <Navigation
              closeMenu={() => setIsMenuOpen(false)}
              theme={theme}
              toggleTheme={toggleTheme}
              activeSection={activeSection}
            />
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden bg-bg-primary border-b border-neutral-850/40"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <nav className="py-6 px-4">
            <Navigation
              closeMenu={() => setIsMenuOpen(false)}
              theme={theme}
              toggleTheme={toggleTheme}
              activeSection={activeSection}
            />
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
