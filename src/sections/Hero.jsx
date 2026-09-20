import HeroText from "../components/HeroText";

const Hero = () => {
  return (
    <section id="home" className="relative w-full min-h-screen pt-28 pb-20 overflow-hidden bg-[#050508]">
      {/* Single subtle ambient element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] right-[20%] w-80 h-80 rounded-full bg-purple-600/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12">
        <HeroText />
      </div>
    </section>
  );
};

export default Hero;
