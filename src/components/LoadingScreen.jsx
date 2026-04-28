"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 300);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return <>
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]"
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-20 h-20 flex items-center justify-center"
            >
              {/* Spinning ring */}
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border-t-2 border-r-2 border-[#C800DF]"
                aria-hidden="true"
              />
              {/* Inner bg */}
              <div className="absolute inset-1 rounded-xl bg-[#111827] border border-[#C800DF]/10" />
              {/* Initials */}
              <span className="relative z-10 text-2xl font-black text-gradient">AE</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-center"
            >
              <p className="text-white font-semibold tracking-tight">Ahmed Ehab Seyam</p>
              <p className="text-[#9ca3af] text-sm font-mono mt-1">Front-End Developer</p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-40 h-0.5 bg-[#1f2937] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-[#C800DF] to-[#E60076]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>;
}
