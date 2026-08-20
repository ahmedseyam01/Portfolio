"use client";

import { siteConfig } from "@/data/config";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex gap-4 mb-2">
            {[
              { icon: <GithubIcon />, href: siteConfig.github, label: "Github" },
              { icon: <LinkedinIcon />, href: siteConfig.linkedin, label: "LinkedIn" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
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
  );
}
