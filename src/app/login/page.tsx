"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogIn, 
  Mail, 
  Lock, 
  ChevronRight, 
  ShieldCheck,
  Wallet
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppleButton } from "@/components/ui/AppleButton";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("gabriel@exemplo.com");
  const [password, setPassword] = useState("password123");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  if (!mounted) return <div className="min-h-screen bg-[#05070a]" />;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#05070a]">
      {/* Background Vibrancy Blobs */}
      <div className="bg-blob blob-blue" />
      <div className="bg-blob blob-purple" />
      <div className="bg-blob blob-pink" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[460px] z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 bg-accent rounded-[20px] flex items-center justify-center shadow-2xl shadow-accent/40 border border-white/20">
               <Wallet className="text-white" size={32} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-apple mb-3 text-white">
                Finanças<span className="text-accent underline decoration-4 underline-offset-8">.</span>
              </h1>
              <p className="text-white/40 font-medium text-xl tracking-wide">Elite em inteligência financeira.</p>
            </div>
          </motion.div>
        </div>

        <GlassCard className="p-10 border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3 block ml-1 group-focus-within:text-accent transition-colors">E-mail Institucional</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-all" size={20} strokeWidth={1.5} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4.5 pl-14 pr-6 text-white placeholder:text-white/10 outline-none focus:border-accent/40 focus:bg-white/10 transition-all font-medium text-lg"
                    placeholder="exemplo@financasplus.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3 block ml-1 group-focus-within:text-accent transition-colors">Criptografia de Acesso</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-all" size={20} strokeWidth={1.5} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4.5 pl-14 pr-6 text-white placeholder:text-white/10 outline-none focus:border-accent/40 focus:bg-white/10 transition-all font-medium text-lg"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <AppleButton 
              type="submit" 
              className="w-full py-5 text-lg font-bold group"
            >
               Sincronizar Acesso
               <ChevronRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </AppleButton>
          </form>

          <div className="mt-10 flex items-center justify-center gap-2 text-white/20 text-xs">
            <ShieldCheck size={16} strokeWidth={2} className="text-secondary/50" />
            <span className="font-bold tracking-widest uppercase">Safe & Encrypted Session</span>
          </div>
        </GlassCard>

        <div className="mt-12 text-center space-y-6">
          <p className="text-white/20 text-sm font-semibold tracking-wide">Ainda não possui credenciais premium?</p>
          <button className="text-white font-bold text-sm tracking-[0.2em] uppercase hover:text-accent border-b border-white/10 hover:border-accent transition-all pb-1">Solicitar Convite de Elite</button>
        </div>
      </motion.div>

      {/* Subtle Bottom Branding */}
      <footer className="absolute bottom-10 text-white/10 font-bold uppercase tracking-[0.6em] text-[9px] select-none">
        Developed with Antigravity AI • 2026
      </footer>
    </div>
  );
}

