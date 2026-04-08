"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, History, Plus } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppleButton } from "@/components/ui/AppleButton";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { getLatestTransactions, getDashboardStats } from "@/lib/actions";
import { useAuth } from "@/context/auth-context";

export default function TransactionsPage() {
  const { user } = useAuth();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.id) return;
    setLoading(true);
    const [transRes, statsRes] = await Promise.all([
      getLatestTransactions(user.id, 50),
      getDashboardStats(user.id)
    ]);
    
    if (transRes.success) setTransactions(transRes.transactions || []);
    if (statsRes.success) {
      setAccounts(statsRes.accounts || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-20 pb-32">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 px-2">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-apple text-white font-bold">Extrato</h1>
          <p className="text-white/40 text-2xl font-medium tracking-wide">Todas as suas movimentações financeiras detalhadas.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
          <div className="relative flex-1 sm:min-w-[400px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={24} strokeWidth={1.5} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar transações..." 
              className="w-full bg-white/5 border border-white/5 rounded-[28px] py-6 pl-16 pr-8 text-white placeholder:text-white/20 outline-none focus:border-accent/40 focus:bg-white/10 transition-all shadow-2xl text-xl backdrop-blur-3xl" 
            />
          </div>
          <div className="flex gap-4">
            <AppleButton variant="glass" size="icon" icon={Filter} className="rounded-[24px]" />
            <AppleButton variant="primary" size="lg" icon={Plus} onClick={() => setIsTransactionModalOpen(true)}>
              Novo Lançamento
            </AppleButton>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <GlassCard className="p-16 border-white/10 shadow-2xl relative overflow-hidden min-h-[700px]">
          {filteredTransactions.length > 0 ? (
            <TransactionList transactions={filteredTransactions} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-24 group">
               <div className="w-28 h-28 bg-white/5 rounded-[40px] flex items-center justify-center mb-10 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <History size={48} strokeWidth={1.5} className="text-white opacity-20 group-hover:text-accent group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="max-w-md space-y-4">
                  <h3 className="text-3xl font-bold tracking-apple text-white">Nenhum Registro</h3>
                  <p className="text-white/20 text-xl font-medium leading-relaxed px-8">
                    Não encontramos lançamentos para os filtros aplicados ou sua jornada ainda não começou.
                  </p>
              </div>
              <AppleButton variant="secondary" className="mt-12" onClick={() => setIsTransactionModalOpen(true)}>
                  Realizar Primeiro Lançamento
              </AppleButton>
            </div>
          )}
        </GlassCard>
      </motion.div>

      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => {
          setIsTransactionModalOpen(false);
          fetchData();
        }} 
        accounts={accounts} 
        cards={cards} 
      />
    </div>
  );
}



