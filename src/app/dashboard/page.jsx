"use client";

import { motion } from "framer-motion";
import { FolderGit2, Code2, MessageSquare, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, skillsRes, messagesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/skills'),
          fetch('/api/messages')
        ]);
        
        const projects = await projectsRes.json();
        const skills = await skillsRes.json();
        const messages = await messagesRes.json();

        const totalSkills = skills.reduce((acc, cat) => acc + cat.skills.length, 0);
        const unread = messages.filter(m => m.status === 'unread').length;

        setStats({
          projects: projects.length,
          skills: totalSkills,
          messages: messages.length,
          unreadMessages: unread
        });

        setRecentMessages(messages.slice(0, 3));
      } catch (error) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { name: "Total Projects", value: stats.projects, icon: FolderGit2, link: "/dashboard/projects" },
    { name: "Total Skills", value: stats.skills, icon: Code2, link: "/dashboard/skills" },
    { name: "Total Messages", value: stats.messages, icon: MessageSquare, link: "/dashboard/messages" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-[#9ca3af]">Welcome back. Here&apos;s your portfolio at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link href={stat.link} key={stat.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C800DF]/10 flex items-center justify-center text-[#C800DF]">
                    <Icon size={24} />
                  </div>
                  <ArrowUpRight size={20} className="text-[#9ca3af] group-hover:text-[#C800DF] transition-colors" />
                </div>
                <h3 className="text-[#9ca3af] font-medium text-sm mb-1">{stat.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                     {loading ? "-" : stat.value}
                  </span>
                  {stat.name === "Total Messages" && stats.unreadMessages > 0 && !loading && (
                    <span className="text-xs text-[#C800DF] font-medium">{stats.unreadMessages} unread</span>
                  )}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Messages</h2>
            <Link href="/dashboard/messages" className="text-sm text-[#C800DF] hover:text-[#E60076] transition-colors flex items-center gap-1 font-medium">
              View All <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="text-[#9ca3af] text-sm">Loading messages...</div>
            ) : recentMessages.length === 0 ? (
              <div className="text-[#9ca3af] text-sm">No messages yet.</div>
            ) : (
              recentMessages.map((msg) => (
                <Link href="/dashboard/messages" key={msg.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${msg.status === 'unread' ? 'bg-[#C800DF] shadow-[0_0_10px_#C800DF]' : 'bg-transparent'}`} />
                    <div>
                      <h4 className={`text-sm ${msg.status === 'unread' ? 'text-white font-bold' : 'text-[#9ca3af] font-medium'}`}>{msg.name}</h4>
                      <p className="text-xs text-[#9ca3af] mt-0.5 line-clamp-1">{msg.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#6b7280] font-medium">{new Date(msg.date).toLocaleDateString()}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/projects" className="w-full flex items-center justify-between p-4 rounded-xl bg-[#C800DF]/10 border border-[#C800DF]/20 text-[#C800DF] hover:bg-[#C800DF]/20 transition-all font-medium text-sm">
              <span className="flex items-center gap-2"><FolderGit2 size={18}/> Manage Projects</span>
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/dashboard/skills" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] text-white transition-all font-medium text-sm">
              <span className="flex items-center gap-2"><Code2 size={18}/> Update Skills</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
