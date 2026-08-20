import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Admin panel for managing portfolio content",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
