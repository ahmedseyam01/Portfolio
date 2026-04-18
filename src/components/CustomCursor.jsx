"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e) => {
      const el = e.target;
      setHovering(
        el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          !!el.closest("a") ||
          !!el.closest("button")
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{ background: "radial-gradient(circle, #C800DF, #E60076)" }}
        animate={{
          x: pos.x - 7,
          y: pos.y - 7,
          scale: hovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.08 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[100] border border-[#C800DF]"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering ? "rgba(200,0,223,0.08)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.18 }}
      />
    </>
  );
}
