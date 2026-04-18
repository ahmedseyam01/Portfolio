"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";

const categories = [
  {
    id: "frontend",
    label: "Front-End",
    emoji: "🎨",
    skills: ["React.js", "Next.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Framer Motion", "REST APIs", "Redux","React Router","React Hook Form", "Zod", "React Query","NextAuth","Axios"],
  },
  {
    id: "languages",
    label: "Languages",
    emoji: "💻",
    skills: ["JavaScript", "C++", "C#", "Python", "TypeScript","ES6+"],
  },
  {
    id: "tools",
    label: "Tools",
    emoji: "🛠️",
    skills: ["Git", "GitHub", "Figma", "VS Code", "npm", "Vite", "Postman", "Jira", "Trello", "Slack", "Google Workspace"],
  },
];

export default function Skills() {
  const [active, setActive] = useState("frontend");
  const current = categories.find((c) => c.id === active);
  
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
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[#C800DF] tracking-widest uppercase mb-3 block">Expertise</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Technical Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tabs - Defining section height */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`group relative flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-500 border ${active === cat.id
                    ? "bg-[#C800DF]/10 border-[#C800DF]/50 text-white shadow-[0_0_30px_rgba(200,0,223,0.1)]"
                    : "bg-white/5 border-white/5 text-[#9ca3af] hover:bg-white/10 hover:border-white/10 hover:text-white"
                  }`}
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{cat.emoji}</span>
                <span className="font-bold tracking-tight">{cat.label}</span>
                
                {active === cat.id && (
                  <motion.div layoutId="skill-pill" className="ml-auto w-2 h-2 rounded-full bg-[#C800DF] shadow-[0_0_10px_#C800DF]" />
                )}
              </button>
            ))}
          </div>

          {/* Main Card - Shrunk to fit better */}
          <motion.div
            key={active}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-8 flex flex-col justify-center min-h-0"
          >
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
              style={{ background: backgroundGlow }} 
            />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C800DF]/10 blur-[80px] -z-10" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-white/50">
                 <div className="w-6 h-[1px] bg-[#C800DF]" />
                 <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{current.label}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {current.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.015, duration: 0.3 }}
                    whileHover={{ y: -3, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(200, 0, 223, 0.4)" }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-white/80 text-xs font-semibold cursor-default transition-all duration-300 backdrop-blur-md"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
