"use client";

import { motion } from "framer-motion";

// Types the heading once when it scrolls into view, then the caret keeps blinking
// in CSS. Animating width in an infinite loop forced a layout on every frame.
export default function TypewriterHeading({ text, gradientText, className = "" }) {
  return (
    <div className={`relative inline-flex items-center max-w-full ${className}`}>
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="typewriter-caret overflow-hidden whitespace-nowrap inline-flex items-center pr-1.5 border-r-2 border-[#C800DF]"
      >
        <span className="text-white">{text}</span>
        {gradientText && <span className="text-gradient ml-2.5 font-black">{gradientText}</span>}
      </motion.div>
    </div>
  );
}
