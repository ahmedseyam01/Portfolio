"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

// Social Icons SVGs
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

function AnimatedText({ text, className }) {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.03 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 12,
      rotateX: 90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  
  // Radial glow logic for the Hero card
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

  const backgroundGlow = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(200, 0, 223, 0.07), transparent 80%)`;

  return (
    <section id="hero" ref={ref} className="min-h-screen relative flex items-center pt-24 pb-12 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Intro Card - Refined Glassmorphism & Animation */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-12 flex flex-col justify-center min-h-[480px] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            {/* Interactive Glow */}
            <motion.div 
               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
               style={{ background: backgroundGlow }} 
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#C800DF] shadow-[0_0_10px_#C800DF] animate-pulse" />
                Available for opportunities
              </motion.div>

              <div className="flex flex-col gap-1 mb-8">
                <AnimatedText 
                  text="Ahmed" 
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none" 
                />
                <AnimatedText 
                  text="Seyam" 
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient tracking-tighter leading-none" 
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-[#9ca3af] max-w-lg leading-relaxed mb-12"
              >
                <span className="text-white font-bold">Front-End Developer</span> graduate. <br className="hidden md:block"/> Transforming creative ideas into <span className="text-[#C800DF] italic">high-performance</span> digital reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-5"
              >
                <a href="#projects" className="btn-primary px-8 py-4 flex items-center gap-3 group/btn text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#C800DF] to-[#E60076] hover:scale-105 transition-all">
                  View Projects
                  <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <div className="flex gap-3">
                   {[
                    { icon: <GithubIcon />, href: "https://github.com/ahmedseyam01" },
                    { icon: <LinkedinIcon />, href: "https://www.linkedin.com/in/ahmed-seyam-773225310" },
                  ].map((s, i) => (
                    <motion.a 
                      key={i} 
                      href={s.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, color: "#fff", backgroundColor: "rgba(200, 0, 223, 0.1)", borderColor: "rgba(200, 0, 223, 0.4)" }} 
                      className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-[#9ca3af] backdrop-blur-md transition-all duration-300"
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo Card - Glassy Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9 }}
            className="relative lg:col-span-5 rounded-3xl overflow-hidden min-h-[480px] group border border-white/10 shadow-[20px_0_50px_rgba(200,0,223,0.1)]"
          >
            <Image
              src="/ahmed-seyam.jpg"
              alt="Ahmed Seyam"
              fill
              priority
              className="object-cover object-top group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[85%]">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-center"
               >
                 <p className="text-[10px] font-mono text-[#C800DF] uppercase tracking-[0.3em] mb-2 font-bold">Featured Role</p>
                 <h3 className="text-white font-black text-lg">Junior Front-End Engineer</h3>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C800DF] via-[#C800DF]/50 to-transparent shadow-[0_0_10px_#C800DF]" />
      </motion.div>
    </section>
  );
}
