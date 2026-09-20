import { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import Engineering from "./sections/Engineering";
import About from "./sections/About";
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
      <Projects />
      <OpenSource />
      <Engineering />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
