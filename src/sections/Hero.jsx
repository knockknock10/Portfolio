import HeroText from "../components/HeroText";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Brief fade-in so content doesn't flash
    const t = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen pt-28 pb-16 overflow-hidden bg-[#050508]">
      {/* Subtle radial ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 sm:px-12 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <HeroText />
      </div>
    </section>
  );
};

export default Hero;
