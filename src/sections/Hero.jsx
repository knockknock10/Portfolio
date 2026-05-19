import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { Particles } from "../components/Particles";

const Hero = ({ openQuickView }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section id="home" className="relative w-full min-h-screen pt-28 pb-12 overflow-hidden bg-[#050508]">
      {/* Parallax Landscape - Base Layer (z-0) */}
      <div className="absolute inset-0 z-0">
        <ParallaxBackground />
      </div>

      {/* Floating Particles - Layer 1 (z-1) */}
      <Particles
        className="absolute inset-0 z-1"
        quantity={60}
        staticity={50}
        ease={40}
        size={0.6}
        color="#e2e8f0"
      />

      {/* Cinematic Soft Overlays - Layer 1 (z-1) - subtle text shield & bottom blend */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/30 via-transparent to-transparent z-1 pointer-events-none md:block hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/35 via-transparent to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-[#050508]/5 z-1 pointer-events-none md:hidden block" />

      {/* Ambient Lighting Orbs - Cinematic Color depth */}
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none z-1" />
      <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none z-1" />

      {/* Hero Content - Layer 10 (z-10) */}
      <div className="relative flex items-center justify-between w-full min-h-[calc(100vh-10rem)] px-6 sm:px-12 max-w-7xl mx-auto z-10">
        <HeroText />
      </div>

      {/* 3D Canvas (Astronaut) - Layer 2 (z-2) - fully crisp and unblocked */}
      <figure
        className="absolute inset-0 z-2 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.8} color="#d8b4fe" />
          <directionalLight position={[5, 3, 5]} intensity={2.5} color="#fffaf0" />
          <pointLight position={[-4, 2, 2]} intensity={2.0} color="#c084fc" />
          <pointLight position={[3, -2, 1]} intensity={1.0} color="#eab308" />
          <Suspense fallback={<Loader />}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <Astronaut
                scale={isMobile ? 0.16 : 0.3}
                position={isMobile ? [0, -1.5, 0] : [1.4, -0.6, -0.5]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 8, 1 + state.mouse.y / 8, 2.8],
      0.4,
      delta
    );
  });
}

export default Hero;
