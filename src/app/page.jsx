"use client";

import { MotionConfig } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

// The page renders right away (and is server-rendered); the loading screen
// is only a short overlay on top instead of blocking the whole page.
export default function Home() {
  return <>
    <MotionConfig reducedMotion="user">
      <LoadingScreen />

      <AnimatedBackground />
      <Navbar />

      <main id="main-content" className="flex min-h-screen flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  </>;
}
