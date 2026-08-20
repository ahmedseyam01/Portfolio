"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { damping: 30, stiffness: 350, mass: 0.1 });
  const dotY = useSpring(rawY, { damping: 30, stiffness: 350, mass: 0.1 });

  const ringX = useSpring(rawX, { damping: 25, stiffness: 200, mass: 0.2 });
  const ringY = useSpring(rawY, { damping: 25, stiffness: 200, mass: 0.2 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e) => {
      const el = e.target;
      if (el) {
        setHovering(
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          !!el.closest("a") ||
          !!el.closest("button")
        );
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  return (
    <>
      {/* Glow Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 rounded-full pointer-events-none z-[100] transform-gpu"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, #C800DF, #E60076)",
        }}
        animate={{
          scale: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[100] border border-[#C800DF]/70 transform-gpu"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: hovering ? "rgba(200, 0, 223, 0.15)" : "rgba(0,0,0,0)",
        }}
        animate={{
          scale: hovering ? 1.6 : 1,
          borderColor: hovering ? "#E60076" : "#C800DF",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
