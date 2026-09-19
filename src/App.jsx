import { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import Verifications from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-bg-primary text-[#f5f5f5] overflow-x-hidden relative">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <OpenSource />
      <Verifications />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
