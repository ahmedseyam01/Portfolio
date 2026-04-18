"use client";

import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

// Social Icons SVGs for the footer
const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      {loadingComplete && (
        <>
          <AnimatedBackground />
          <Navbar />

          <main id="main-content" className="flex min-h-screen flex-col w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <footer className="border-t border-white/5 py-12 relative z-10 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex gap-4 mb-2">
                  {[
                    { icon: <GithubIcon />, href: "https://github.com/ahmedseyam01", label: "Github" },
                    { icon: <LinkedinIcon />, href: "https://www.linkedin.com/in/ahmed-seyam-773225310", label: "LinkedIn" },
                  ].map((s) => (
                    <a 
                      key={s.label} 
                      href={s.href} 
                      aria-label={s.label}
                      className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-[#C800DF] hover:border-[#C800DF]/30 hover:bg-[#C800DF]/5 transition-all duration-300"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
                <p className="text-[#9ca3af] text-sm font-medium tracking-wide">
                   © 2026 Portfolio. Developed by <span className="text-white font-bold">Ahmed Seyam</span>
                </p>
              </div>
              
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C800DF]/50 to-transparent" />
            </div>
          </footer>
        </>
      )}
    </>
  );
}
