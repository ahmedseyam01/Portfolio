"use client";

import { motion } from "framer-motion";

const orbs = [
  { w: 600, h: 600, top: "-10%", left: "-10%", color: "#C800DF", dur: 18, delay: 0 },
  { w: 500, h: 500, top: "60%",  left: "70%",  color: "#E60076", dur: 22, delay: 3 },
  { w: 350, h: 350, top: "40%",  left: "30%",  color: "#7c00df", dur: 26, delay: 6 },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur: Math.random() * 8 + 6,
  delay: Math.random() * 5,
}));

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0a] overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C800DF 1px, transparent 1px), linear-gradient(to bottom, #C800DF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated Orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 2 === 0 ? "#C800DF" : "#E60076",
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
