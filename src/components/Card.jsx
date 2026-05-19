import { motion } from "motion/react";
const Card = ({ style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
      className="absolute w-12 h-12 p-2 bg-bg-darker border border-neutral-850 hover:border-purple-500/30 rounded-xl cursor-grab shadow-lg transition-all duration-300"
      src={image}
      style={style}
      whileHover={{ scale: 1.1, rotate: "10deg" }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    />
  ) : (
    <motion.div
      className="absolute px-4 py-2.5 text-xs md:text-sm text-center rounded-lg border border-neutral-850 bg-bg-darker/95 text-neutral-300 w-[10rem] cursor-grab select-none shadow-lg mono-font hover:border-purple-500/30 transition-all duration-300"
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
};

export default Card;
