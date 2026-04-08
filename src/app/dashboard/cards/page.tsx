"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, CreditCard, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppleButton } from "@/components/ui/AppleButton";
import { CardModal } from "@/components/modals/CardModal";
import { useAuth } from "@/context/auth-context";

export default function CardsPage() {
  const { user } = useAuth();
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-apple text-white">Meus Cartões</h1>
          <p className="text-white/40 text-xl font-medium tracking-wide">Gestão de limites, faturas e segurança de nível elite.</p>
        </div>
        <AppleButton variant="primary" icon={Plus} size="lg" onClick={() => setIsCardModalOpen(true)}>
          Novo Cartão
        </AppleButton>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {/* Empty State Card - Apple-style glass */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <button className="w-full group text-left" onClick={() => setIsCardModalOpen(true)}>
            <GlassCard 
              className="border-2 border-dashed border-white/5 p-12 flex flex-col items-center justify-center gap-10 min-h-[400px] bg-white/[0.01] hover:border-accent/40 transition-all duration-500"
            >
              <div className="relative">
                <div className="p-9 bg-white/5 rounded-[40px] shadow-2xl border border-white/10 transition-all group-hover:rotate-6 group-hover:scale-110 duration-500">
                  <CreditCard size={56} strokeWidth={1.5} className="text-white/20 group-hover:text-accent group-hover:opacity-100 transition-all" />
                </div>
                <div className="absolute -top-3 -right-3 p-3 bg-accent text-white rounded-full shadow-2xl border border-white/20 animate-bounce">
                    <ShieldCheck size={20} strokeWidth={2} />
                </div>
              </div>
              <div className="text-center space-y-3 px-6">
                <h3 className="text-2xl font-bold tracking-apple text-white group-hover:text-accent transition-colors">Solicitar Cartão</h3>
                <p className="text-white/20 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                  Monitore cada centavo com segurança biométrica e limites inteligentes.
                </p>
              </div>
            </GlassCard>
          </button>
        </motion.div>
      </div>

      <CardModal 
        isOpen={isCardModalOpen} 
        onClose={() => setIsCardModalOpen(false)} 
        userId={user?.id || ""} 
      />
    </div>
  );
}


