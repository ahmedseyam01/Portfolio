"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import TypewriterHeading from "@/components/TypewriterHeading";
import initialCategories from "@/data/skills.json";

export default function Skills() {
  const [categories, setCategories] = useState(initialCategories);
  const [active, setActive] = useState(initialCategories[0]?.id || "frontend");

  useEffect(() => {
    fetch('/api/skills', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
          setActive((prev) => prev || data[0].id);
        }
      })
      .catch(err => console.error("Failed to load skills from API", err));
  }, []);

  const current = categories.find((c) => c.id === active) || categories[0];

  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    if (rectRef.current) {
      mouseX.set(e.clientX - rectRef.current.left);
      mouseY.set(e.clientY - rectRef.current.top);
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  const backgroundGlow = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(200, 0, 223, 0.12), transparent 80%)`;

  return <>
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[#C800DF] tracking-widest uppercase mb-3 block">Expertise</span>
          <TypewriterHeading text="Technical" gradientText="Stack" className="text-3xl md:text-5xl font-bold text-white tracking-tight" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Category Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActive(cat.id)}
                className={`group relative flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-300 border ${active === cat.id
                  ? "bg-[#C800DF]/10 border-[#C800DF]/60 text-white shadow-[0_0_30px_rgba(200,0,223,0.15)]"
                  : "bg-white/5 border-white/5 text-[#9ca3af] hover:bg-white/10 hover:border-white/10 hover:text-white"
                  }`}
              >
                <motion.span 
                  animate={{ scale: active === cat.id ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl"
                >
                  {cat.emoji}
                </motion.span>
                <span className="font-bold tracking-tight">{cat.label}</span>

                {active === cat.id && (
                  <motion.div 
                    layoutId="skill-pill-indicator" 
                    className="ml-auto w-2.5 h-2.5 rounded-full bg-[#C800DF] shadow-[0_0_12px_#C800DF]" 
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Main Card with Staggered Skill Badges */}
          {current && (
            <motion.div
              key={active}
              ref={cardRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col justify-center min-h-0 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(200,0,223,0.12)] transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: backgroundGlow }}
              />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#C800DF]/10 rounded-full blur-[70px] -z-10" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-white/50">
                  <div className="w-6 h-[1px] bg-[#C800DF]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{current.label}</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {current.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.3, ease: "easeOut" }}
                      whileHover={{ 
                        scale: 1.06, 
                        y: -3, 
                        backgroundColor: "rgba(200, 0, 223, 0.2)", 
                        borderColor: "rgba(200, 0, 223, 0.5)",
                        color: "#ffffff"
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-white/80 text-xs font-semibold cursor-default transition-colors duration-200 transform-gpu"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  </>;
}
