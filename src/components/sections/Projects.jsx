"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import initialProjects from "@/data/projects.json";
import TypewriterHeading from "@/components/TypewriterHeading";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

function ProjectCard({ project, index }) {
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

  const background = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, ${project.accent}10, transparent 80%)`;

  const hasGithub = project.github && project.github !== "#";
  const hasLive = project.live && project.live !== "#";

  return <>
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(200,0,223,0.12)] transform-gpu"
    >
      {/* Dynamic Hover Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background }}
      />

      {/* Border Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
            <span className="text-4xl font-black opacity-10 group-hover:opacity-40 transition-all duration-300 transform group-hover:-translate-y-1" style={{ color: project.accent }}>
              {project.title.charAt(0)}
            </span>
            <div className="w-6 h-[2px] mt-2 rounded-full" style={{ backgroundColor: project.accent }} />
          </div>

          <div className="flex gap-3">
            {hasGithub && (
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="w-11 h-11 flex items-center justify-center rounded-xl text-[#9ca3af] bg-white/[0.03] border border-white/5 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <GithubIcon />
              </motion.a>
            )}
            {hasLive && (
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={project.live.startsWith('http') ? project.live : `https://${project.live}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} Live Demo`}
                className="w-11 h-11 flex items-center justify-center rounded-xl text-[#9ca3af] bg-white/[0.03] border border-white/5 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
          {project.title}
        </h3>

        <p className="text-[#9ca3af] text-sm leading-relaxed mb-8 flex-1 group-hover:text-[#d1d5db] transition-colors">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2.5 mt-auto">
          {project.tech.map((t) => (
            <motion.span
              key={t}
              whileHover={{ y: -2, scale: 1.05 }}
              className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] bg-white/[0.05] border border-white/5 px-3 py-1.5 rounded-lg group-hover:border-white/10 group-hover:text-white transition-all cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  </>;
}

export default function Projects() {
  const [projectsList, setProjectsList] = useState(initialProjects);

  useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      })
      .catch(err => console.error("Failed to load projects from API", err));
  }, []);

  return <>
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C800DF]" />
            <span className="font-mono text-xs text-[#C800DF] tracking-[0.3em] uppercase">Showcase</span>
          </div>
          <TypewriterHeading text="Featured" gradientText="Projects" className="text-4xl md:text-6xl font-black text-white tracking-tighter" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  </>;
}