"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, LogOut, Menu, X, Loader2 } from "lucide-react";
import Logo from "@/public/img/logo.svg";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/cms/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user || null);
        if (!data.user && pathname !== "/dashboard/login") {
          router.push("/dashboard/login");
        }
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/cms/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/dashboard/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#2D3E50]" />
      </div>
    );
  }

  if (!user && pathname === "/dashboard/login") {
    return (
      <div className="flex flex-col h-screen font-sans">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen font-sans">
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4 bg-[#2D3E50] text-white shrink-0">
            <div className="gap-2 items-center flex rounded-sm text-xs bg-muted">
              <img src={Logo.src} alt="UCEK Logo" width={40} height={40} className="dark:invert" />
              <div className="font-semibold leading-tight">
                University College of Engineering, <span className="font-normal">Kariavattom</span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 flex items-center space-x-3 border-b border-gray-100 shrink-0">
            <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            <Link 
              href="/dashboard"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname === '/dashboard' ? 'bg-[#2D3E50]/10 text-[#2D3E50] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link 
              href="/dashboard/pages"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/dashboard/pages') ? 'bg-[#2D3E50]/10 text-[#2D3E50] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FileText className="w-5 h-5" />
              <span>Pages</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 px-3 py-2 rounded-lg text-[#E74D3C] hover:bg-[#E74D3C]/10 transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
          
          <div className="p-4 border-t border-gray-100 shrink-0">
            <p className="text-center text-xs text-gray-500">
              Designed and Developed by{" "}
              <a href="https://mulearn.uck.ac.in" target="_blank" className="underline underline-offset-4 hover:text-[#2D3E50]">
                μLearn UCEK
              </a>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <header className="flex items-center justify-between lg:hidden h-14 px-4 bg-white border-b border-gray-200 shadow-sm z-30">
            <div className="flex items-center gap-2">
              <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-md font-semibold text-[#2D3E50] truncate">CMS</h1>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
