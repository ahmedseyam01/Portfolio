"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

function ContactCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(200, 0, 223, 0.05), transparent 80%)`;

  return <>
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden group transition-all duration-500 hover:border-white/20 ${className}`}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
        style={{ background }} 
      />
      {children}
    </div>
  </>;
}

export default function Contact() {
  return <>
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C800DF]" />
            <span className="font-mono text-xs text-[#C800DF] tracking-[0.3em] uppercase">Connect</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Let's <span className="text-gradient">Connect</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <ContactCard className="p-8">
              <h3 className="text-xl font-bold text-white mb-8">Contact Information</h3>
              <div className="space-y-8">
                <a href="mailto:ahmedehabsiam@gmail.com" className="flex items-center gap-5 group/link">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C800DF] group-hover/link:bg-[#C800DF] group-hover/link:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-white font-medium group-hover/link:text-[#C800DF] transition-colors">ahmedehabsiam@gmail.com</p>
                  </div>
                </a>

                <a href="tel:01205298585" className="flex items-center gap-5 group/link">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C800DF] group-hover/link:bg-[#C800DF] group-hover/link:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest mb-1">Phone Number</p>
                    <p className="text-white font-medium group-hover/link:text-[#C800DF] transition-colors">01205298585</p>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C800DF]">
                    <MessageSquare size={24} />
                  </div>
                  <div className="flex gap-4">
                    {[
                      { icon: <GithubIcon />, href: "https://github.com/ahmedseyam01", label: "Github" },
                      { icon: <LinkedinIcon />, href: "https://www.linkedin.com/in/ahmed-seyam-773225310", label: "LinkedIn" },
                    ].map((s) => (
                      <a 
                        key={s.label} 
                        href={s.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white hover:bg-white/10 hover:border-[#C800DF]/30 transition-all duration-300"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ContactCard>

            <ContactCard className="p-8 bg-gradient-to-br from-[#C800DF]/10 to-transparent">
              <p className="text-white font-bold text-lg mb-3">Available for New Projects</p>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                I'm currently looking for new opportunities and collaborations. If you have a question or just want to say hi, I'll do my best to get back to you!
              </p>
            </ContactCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <ContactCard className="p-8 md:p-12 h-full">
              <form className="flex flex-col h-full" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all duration-300" 
                      placeholder="Ahmed Seyam" 
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all duration-300" 
                      placeholder="ahmed@example.com" 
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em] ml-1">Your Message</label>
                    <textarea 
                      rows={5} 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all duration-300 resize-none flex-1" 
                      placeholder="Let's build something amazing together..."
                    ></textarea>
                  </div>
                </div>
                
                <button className="mt-auto relative overflow-hidden group/btn py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm text-white transition-all duration-500">
                   <div className="absolute inset-0 bg-gradient-to-r from-[#C800DF] to-[#E60076] transition-transform duration-500 group-hover/btn:scale-105" />
                   <span className="relative z-10">Send Message</span>
                </button>
              </form>
            </ContactCard>
          </motion.div>
        </div>
      </div>
    </section>
  </>;
}
