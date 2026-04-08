"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  CreditCard,
  Wallet,
  TrendingUp,
  Search,
  Banknote,
  MinusCircle,
  PlusCircle,
  ArrowLeftRight,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppleButton } from "@/components/ui/AppleButton";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { AccountModal } from "@/components/modals/AccountModal";
import { CardModal } from "@/components/modals/CardModal";
import { MainChart } from "@/components/dashboard/MainChart";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { getDashboardStats, getChartData, getLatestTransactions } from "@/lib/actions";
import { formatCurrency, cn } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  
  const [stats, setStats] = useState({ totalBalance: 0, monthlyIncome: 0, monthlyExpense: 0 });
  const [accounts, setAccounts] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.id) return;
    setLoading(true);
    
    const [statsRes, chartRes, transRes] = await Promise.all([
      getDashboardStats(user.id),
      getChartData(user.id),
      getLatestTransactions(user.id, 5)
    ]);

    if (statsRes.success) {
      setStats(statsRes.stats || { totalBalance: 0, monthlyIncome: 0, monthlyExpense: 0 });
      setAccounts(statsRes.accounts || []);
    }
    if (chartRes.success) setChartData(chartRes.chartData || []);
    if (transRes.success) setTransactions(transRes.transactions || []);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  return (
    <div className="space-y-24 pb-32">
      {/* 
        PREMIUM SUMMARY BAR (Apple Glass Style)
      */}
      <GlassCard 
        className="flex flex-col md:flex-row items-center justify-between gap-16 p-16 border-white/10"
      >
        <TimelineItem label="Receita Mensal" amount={formatCurrency(stats.monthlyIncome)} color="text-[#34c759]" />
        <div className="hidden md:block w-px h-16 bg-white/10" />
        <TimelineItem label="Patrimônio Total" amount={formatCurrency(stats.totalBalance)} color="text-white font-bold text-5xl" isMain />
        <div className="hidden md:block w-px h-16 bg-white/10" />
        <TimelineItem label="Despesa Mensal" amount={formatCurrency(stats.monthlyExpense)} color="text-[#ff3b30] font-bold text-3xl" />
      </GlassCard>

      {/* Hero Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 px-2">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-bold tracking-apple text-white flex items-center gap-6"
          >
            Olá, {user?.name || "gabriel"} <span className="animate-pulse">👋</span>
          </motion.h2>
          <p className="text-white/40 text-2xl font-medium tracking-wide">
            Seu ecossistema financeiro de elite está pronto.
          </p>
        </div>
        <div className="flex gap-6">
          <AppleButton variant="glass" size="icon" icon={Search} className="rounded-[24px]" />
          <AppleButton variant="primary" size="lg" icon={Plus} onClick={() => setIsTransactionModalOpen(true)}>Novo Lançamento</AppleButton>
        </div>
      </section>

      {/* 
        ACTION HUB Grid
      */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <ActionHubItem icon={Banknote} label="Conta" color="text-[#007aff]" delay={0.1} onClick={() => setIsAccountModalOpen(true)} />
        <ActionHubItem icon={CreditCard} label="Cartão" color="text-[#5856d6]" delay={0.15} onClick={() => setIsCardModalOpen(true)} />
        <ActionHubItem icon={PlusCircle} label="Receita" color="text-[#34c759]" delay={0.2} onClick={() => setIsTransactionModalOpen(true)} />
        <ActionHubItem icon={MinusCircle} label="Despesa" color="text-[#ff3b30]" delay={0.25} onClick={() => setIsTransactionModalOpen(true)} />
        <ActionHubItem icon={ArrowLeftRight} label="Transferir" color="text-[#5ac8fa]" delay={0.3} />
        <ActionHubItem icon={Plus} label="Investir" color="text-[#ff9500]" delay={0.35} />
      </section>

      {/* Main Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Chart Section */}
        <GlassCard 
          delay={0.4}
          className="lg:col-span-2 p-16 min-h-[640px] flex flex-col border-white/10 relative overflow-hidden group"
        >
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-4xl font-bold tracking-apple text-white">Inteligência Preditiva</h3>
              <p className="text-white/30 text-lg font-medium tracking-wide">Fluxo de caixa nos últimos 7 dias.</p>
            </div>
            <AppleButton variant="glass" size="sm" icon={ChevronRight}>Relatórios</AppleButton>
          </div>
          
          <MainChart data={chartData} />
        </GlassCard>

        {/* Side Grid - Stacked with more gap */}
        <div className="flex flex-col gap-12">
          <GlassCard 
            delay={0.5}
            className="p-12 flex flex-col min-h-[320px] border-white/10"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-bold tracking-apple text-white">Minhas Contas</h3>
              <AppleButton size="sm" variant="glass" icon={Plus} onClick={() => setIsAccountModalOpen(true)} />
            </div>
            
            <div className="space-y-6">
              {accounts.length > 0 ? (
                accounts.map(acc => (
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 5 }}
                    key={acc.id} 
                    className="flex justify-between items-center p-6 rounded-[28px] bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                        {acc.bank?.logo ? <img src={acc.bank.logo} alt="" className="w-8 h-8 object-contain" /> : <Wallet size={24} className="text-white/20" />}
                      </div>
                      <span className="text-base font-bold text-white/80">{acc.name}</span>
                    </div>
                    <span className="text-base font-bold text-white tracking-widest">R$ {formatCurrency(acc.balance)}</span>
                  </motion.div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                  <p className="text-white/20 font-bold text-sm tracking-widest uppercase">Sem contas ativas</p>
                  <AppleButton variant="primary" className="mt-10 w-full" onClick={() => setIsAccountModalOpen(true)}>Configurar Banco</AppleButton>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Latest Transactions */}
          <GlassCard 
            delay={0.6}
            className="p-12 flex flex-col border-white/10"
          >
             <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-bold tracking-apple text-white">Últimos Atos</h3>
              <AppleButton size="sm" variant="glass" icon={ChevronRight} />
            </div>
            <TransactionList transactions={transactions} />
          </GlassCard>
        </div>
      </div>


      {/* Modals */}
      <TransactionModal 
        isOpen={isTransactionModalOpen} 
        onClose={() => {
          setIsTransactionModalOpen(false);
          fetchData(); // Refresh after action
        }} 
        accounts={accounts}
        cards={cards}
      />
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => {
          setIsAccountModalOpen(false);
          fetchData();
        }} 
        userId={user?.id || ""}
      />
      <CardModal 
        isOpen={isCardModalOpen} 
        onClose={() => {
          setIsCardModalOpen(false);
          fetchData();
        }} 
        userId={user?.id || ""}
      />
    </div>
  );
}

function TimelineItem({ label, amount, color, isMain }: { label: string, amount: string, color: string, isMain?: boolean }) {
  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 leading-none">{label}</span>
      <p className={cn("transition-all duration-500 leading-none tracking-apple", color)}>
        <span className={cn("text-white/20 mr-2 font-medium opacity-40 select-none", isMain ? "text-2xl" : "text-lg")}>R$</span>
        {amount}
      </p>
    </div>
  );
}

function ActionHubItem({ icon: Icon, label, color, delay, onClick }: { icon: any, label: string, color: string, delay: number, onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
    >
      <button onClick={onClick} className="w-full text-left">
        <GlassCard 
          className="flex flex-col items-center justify-center gap-6 p-8 md:p-10 transition-all hover:bg-white/[0.08]"
        >
          <div className={cn("p-5 rounded-[24px] bg-white/5 shadow-inner group-hover:scale-110 transition-transform", color)}>
            <Icon size={32} strokeWidth={1.5} className="text-current" />
          </div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 text-center">{label}</span>
        </GlassCard>
      </button>
    </motion.div>
  );
}

