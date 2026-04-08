"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Landmark } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppleButton } from "@/components/ui/AppleButton";
import { AccountModal } from "@/components/modals/AccountModal";
import { useAuth } from "@/context/auth-context";

export default function AccountsPage() {
  const { user } = useAuth();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-apple text-white">Minhas Contas</h1>
          <p className="text-white/40 text-xl font-medium tracking-wide">Gerencie seu patrimônio em um ecossistema unificado.</p>
        </div>
        <AppleButton variant="primary" icon={Plus} size="lg" onClick={() => setIsAccountModalOpen(true)}>
          Vincular Novo Banco
        </AppleButton>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {/* Empty State Card - Apple-style glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <button className="w-full group" onClick={() => setIsAccountModalOpen(true)}>
            <GlassCard 
              className="border-2 border-dashed border-white/5 p-12 flex flex-col items-center justify-center gap-8 min-h-[360px] bg-white/[0.01] hover:border-accent/40 transition-all duration-500"
            >
              <div className="p-8 bg-white/5 rounded-[32px] shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                <Landmark size={48} strokeWidth={1.5} className="text-white opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all" />
              </div>
              <div className="text-center space-y-3 px-6">
                <h3 className="text-2xl font-bold tracking-apple text-white group-hover:text-accent transition-colors">Conectar Instituição</h3>
                <p className="text-white/20 text-sm font-medium leading-relaxed max-w-[240px]">Integre seus saldos para uma visão 360º de suas finanças.</p>
              </div>
            </GlassCard>
          </button>
        </motion.div>
      </div>

      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
        userId={user?.id || ""} 
      />
    </div>
  );
}


