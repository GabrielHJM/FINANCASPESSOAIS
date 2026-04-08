"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  Wallet,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Geral", href: "/dashboard" },
  { icon: Wallet, label: "Contas", href: "/dashboard/accounts" },
  { icon: CreditCard, label: "Cartões", href: "/dashboard/cards" },
  { icon: ArrowLeftRight, label: "Transações", href: "/dashboard/transactions" },
  { icon: BarChart3, label: "Relatórios", href: "/dashboard/reports" },
  { icon: Settings, label: "Configurar", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#05070a]" />;

  return (
    <div className="min-h-screen bg-[#05070a] text-white selection:bg-accent selection:text-white relative overflow-hidden">
      {/* Background Vibrancy Blobs */}
      <div className="bg-blob blob-blue" />
      <div className="bg-blob blob-purple" />
      <div className="bg-blob blob-pink" />

      {/* 
        PREMIUM macOS SIDEBAR
      */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-[280px] flex-col p-8 border-r border-white/5 bg-black/20 backdrop-blur-3xl z-50">
        <div className="flex items-center gap-3 mb-12 px-2 shrink-0">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <Wallet className="text-white" size={20} strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold tracking-apple px-1">
            Finanças<span className="text-accent underline decoration-4 underline-offset-4">.</span>
          </h2>
        </div>

        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div 
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative",
                    isActive 
                      ? "bg-white/10 text-white shadow-xl shadow-black/20" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon 
                    size={20} 
                    strokeWidth={isActive ? 2 : 1.5} 
                    className={cn(
                      "transition-all duration-300",
                      isActive ? "text-accent scale-110" : "group-hover:text-white group-hover:scale-110"
                    )} 
                  />
                  <span className={cn(
                    "text-sm tracking-apple transition-colors",
                    isActive ? "font-semibold" : "font-medium"
                  )}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 shrink-0">
          <button 
            onClick={logout}
            className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl text-white/40 hover:bg-secondary/10 hover:text-secondary transition-all font-semibold text-sm group"
          >
            <LogOut size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* 
        MAIN CONTENT REGION
      */}
      <main className="md:pl-[280px] min-h-screen p-8 lg:p-16 pb-32 md:pb-16 relative z-10">
        <div className="max-w-[1400px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 
        MOBILE iOS TAB BAR
      */}
      <nav className="md:hidden fixed bottom-8 left-6 right-6 h-20 bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-around px-4 z-50 rounded-[32px] shadow-2xl">
        {menuItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative flex-1 py-2">
              <div className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300",
                isActive ? "text-accent scale-110" : "text-white/40"
              )}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">{item.label}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-tab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-full shadow-[0_0_12px_rgba(0,122,255,0.8)]"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

