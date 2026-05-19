import React, { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import TerminalConsole from "./sections/TerminalConsole";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import QuickViewModal from "./components/QuickViewModal";

const App = () => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-bg-primary text-[#f5f5f5] overflow-x-hidden relative">
      <Navbar openQuickView={() => setIsQuickViewOpen(true)} />
      
      {/* Sections Stack */}
      <Hero openQuickView={() => setIsQuickViewOpen(true)} />
      <TerminalConsole />
      <About />
      <Skills />
      <Projects />
      <OpenSource />
      <Testimonial />
      <Contact />
      <Footer />

      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};

export default App;
