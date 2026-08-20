import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  delay = 0,
  glowColor = "rgba(200, 0, 223, 0.05)",
  glowSize = "500px",
  interactive = true,
  initial = { opacity: 0, y: 15 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: false },
  transition = { duration: 0.55 }
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!interactive) return;
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const background = useMotionTemplate`radial-gradient(${glowSize} circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={{ ...transition, delay }}
      className={`relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden group transition-all duration-300 hover:border-white/20 ${className}`}
    >
      {interactive && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background }}
        />
      )}
      {children}
    </motion.div>
  );
}
