import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "50%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-15%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "25%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        {/* Mountain Layer 1 */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            y: mountain1Y,
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;
