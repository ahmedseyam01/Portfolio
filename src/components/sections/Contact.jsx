"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MessageSquare, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/config";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import GlassCard from "@/components/GlassCard";
import TypewriterHeading from "@/components/TypewriterHeading";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return <>
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C800DF]" />
            <span className="font-mono text-xs text-[#C800DF] tracking-[0.3em] uppercase">Connect</span>
          </div>
          <TypewriterHeading text="Let's" gradientText="Connect" className="text-4xl md:text-6xl font-black text-white tracking-tighter" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-white mb-8">Contact Information</h3>
              <div className="space-y-8">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-5 group/link">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C800DF] group-hover/link:bg-[#C800DF] group-hover/link:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-white font-medium group-hover/link:text-[#C800DF] transition-colors">{siteConfig.email}</p>
                  </div>
                </a>

                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-5 group/link">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C800DF] group-hover/link:bg-[#C800DF] group-hover/link:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest mb-1">Phone Number</p>
                    <p className="text-white font-medium group-hover/link:text-[#C800DF] transition-colors">{siteConfig.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C800DF]">
                    <MessageSquare size={24} />
                  </div>
                  <div className="flex gap-4">
                    {[
                      { icon: <GithubIcon />, href: siteConfig.github, label: "Github" },
                      { icon: <LinkedinIcon />, href: siteConfig.linkedin, label: "LinkedIn" },
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
            </GlassCard>

            <GlassCard className="p-8 bg-gradient-to-br from-[#C800DF]/10 to-transparent">
              <p className="text-white font-bold text-lg mb-3">Available for New Projects</p>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                I&apos;m currently looking for new opportunities and collaborations. If you have a question or just want to say hi, I&apos;ll do my best to get back to you!
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 md:p-12 h-full">
              <form className="flex flex-col h-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all duration-300"
                      placeholder="Ahmed Seyam"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all duration-300"
                      placeholder="ahmed@example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-[0.2em] ml-1">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all duration-300 resize-none flex-1"
                      placeholder="Let's build something amazing together..."
                    ></textarea>
                  </div>
                </div>

                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="mt-auto relative overflow-hidden group/btn py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm text-white transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C800DF] to-[#E60076] transition-transform duration-500 group-hover/btn:scale-105" />
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'loading' && <Loader2 className="animate-spin" size={18} />}
                    {status === 'success' && <CheckCircle2 size={18} />}
                    {status === 'idle' && "Send Message"}
                    {status === 'loading' && "Sending..."}
                    {status === 'success' && "Sent Successfully!"}
                    {status === 'error' && "Error! Try Again"}
                  </span>
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  </>;
}
