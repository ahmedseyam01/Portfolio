"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

function AboutCard({ children, className = "", delay = 0 }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(200, 0, 223, 0.05), transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden group transition-all duration-500 hover:border-white/20 ${className}`}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
        style={{ background }} 
      />
      {children}
    </motion.div>
  );
}

export default function About() {
  const traits = [
    {
      emoji: "🎓",
      title: "CS & AI Student",
      desc: "Studying Computer Science and Artificial Intelligence, applying that foundation to deep engineering.",
    },
    {
      emoji: "⚡",
      title: "Fast Learner",
      desc: "Committed to mastering new technologies quickly and applying them with precision.",
    },
    {
      emoji: "🎨",
      title: "UI Craftsman",
      desc: "Passionate about pixel-perfect interfaces, smooth animations, and accessible patterns.",
    },
    {
      emoji: "🔗",
      title: "API & State",
      desc: "Experienced in integrating REST APIs and managing complex state with modern tools.",
    },
  ];

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C800DF]" />
            <span className="font-mono text-xs text-[#C800DF] tracking-[0.3em] uppercase">Identity</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Who <span className="text-gradient">I Am</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Bio Card */}
          <AboutCard className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center">
            <div className="relative z-10">
              <p className="text-[#d1d5db] text-xl leading-relaxed mb-8">
                I'm a passionate Front-End Developer who thrives at the intersection of <span className="text-white font-bold border-b-2 border-[#C800DF]/30">clean code</span> and <span className="text-white font-bold border-b-2 border-[#C800DF]/30">beautiful design</span>.
              </p>
              <div className="space-y-6 text-[#9ca3af] leading-relaxed text-base">
                <p>
                  As a CS & AI student, I bring analytical thinking to every UI challenge. My focus on React, Next.js, and modern CSS tooling helps me build fast, accessible, and visually rich web experiences.
                </p>
                <p>
                  I'm driven by curiosity and a constant desire to improve — always exploring new techniques in state management, animation systems, and design systems.
                </p>
              </div>
            </div>
          </AboutCard>

          {/* Traits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {traits.map((trait, i) => (
              <AboutCard key={trait.title} delay={i * 0.1} className="p-8 flex flex-col gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-all duration-300 group-hover/item:bg-[#C800DF]/10 group-hover/item:border-[#C800DF]/30 group-hover/item:scale-110">
                  {trait.emoji}
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-2 group-hover/item:text-[#C800DF] transition-colors tracking-tight">{trait.title}</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">{trait.desc}</p>
                </div>
              </AboutCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
