import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profileInfo } from "../data/profile";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = profileInfo.email;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-1 py-4 text-sm text-center rounded-full font-light bg-bg-darker border border-neutral-850 text-white w-[12rem] cursor-pointer overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:bg-bg-card-hover mono-font"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2 text-emerald-400"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <img src="assets/copy-done.svg" className="w-5 filter invert" alt="copy Icon" />
            Email Copied!
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2 text-neutral-300"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img src="assets/copy.svg" className="w-5 filter invert" alt="copy icon" />
            Copy Email
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
