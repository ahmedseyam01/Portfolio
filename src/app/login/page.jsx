"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, KeyRound, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C800DF]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E60076]/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-[#9ca3af] hover:text-white mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C800DF] to-[#E60076] flex items-center justify-center shadow-lg shadow-[#C800DF]/20">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white tracking-tight mb-2">Admin Access</h1>
            <p className="text-[#9ca3af] text-sm">Please log in to manage your portfolio.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" suppressHydrationWarning>
            <div>
              <label className="block text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-2 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" size={18} />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-[#C800DF]/50 focus:bg-white/[0.07] transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </motion.div>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full relative overflow-hidden group/btn py-4 rounded-xl font-bold text-white transition-all duration-500 mt-4 disabled:opacity-70 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#C800DF] to-[#E60076] transition-transform duration-500 group-hover/btn:scale-105" />
              <span className="relative z-10 flex items-center gap-2">
                {loading ? <><Loader2 className="animate-spin" size={18} /> Verifying...</> : "Sign In to Dashboard"}
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
