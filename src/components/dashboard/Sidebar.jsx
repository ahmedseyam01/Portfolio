"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Code2, 
  MessageSquare, 
  LogOut 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
    { name: "Skills", href: "/dashboard/skills", icon: Code2 },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare }
  ];

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' })
    });
    router.push('/');
    router.refresh();
  };

  return (
    <aside className="w-64 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col fixed left-0 top-0">
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#C800DF] to-[#E60076]" />
          <span className="font-bold text-xl text-white tracking-tight">
            Admin <span className="text-white/40">Panel</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-[#C800DF]/10 text-[#C800DF] border border-[#C800DF]/20" 
                  : "text-[#9ca3af] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#9ca3af] hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Exit Dashboard</span>
        </button>
      </div>
    </aside>
  );
}
