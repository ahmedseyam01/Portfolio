"use client";

import { motion } from "framer-motion";

export default function TypewriterHeading({ text, gradientText, className = "" }) {
  return (
    <div className={`relative inline-flex items-center max-w-full ${className}`}>
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{
          width: ["0%", "100%", "100%", "0%", "0%"],
        }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.42, 0.72, 0.94, 1],
        }}
        className="overflow-hidden whitespace-nowrap inline-flex items-center pr-1.5 border-r-2 border-[#C800DF] transform-gpu"
        style={{
          willChange: "width",
        }}
      >
        <span className="text-white">{text}</span>
        {gradientText && <span className="text-gradient ml-2.5 font-black">{gradientText}</span>}
      </motion.div>
    </div>
  );
}
