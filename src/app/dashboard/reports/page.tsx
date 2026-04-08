"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, PieChart as PieIcon, Calendar, ArrowUpRight, ArrowDownLeft, Info, BarChart3 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppleButton } from "@/components/ui/AppleButton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getLatestTransactions, getDashboardStats } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export default function ReportsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({ monthlyIncome: 0, monthlyExpense: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      const [transRes, statsRes] = await Promise.all([
        getLatestTransactions(user.id, 100),
        getDashboardStats(user.id)
      ]);

      if (transRes.success) {
        const categories = transRes.transactions?.reduce((acc: any, t: any) => {
          if (t.type === "EXPENSE") {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
          }
          return acc;
        }, {});

        const formatted = Object.keys(categories || {}).map(cat => ({
          name: cat,
          value: categories[cat]
        }));
        setData(formatted);
      }

      if (statsRes.success) {
        setStats(statsRes.stats || { monthlyIncome: 0, monthlyExpense: 0 });
      }
      setLoading(false);
    };

    fetchData();
  }, [user?.id]);

  const COLORS = ["#007aff", "#5856d6", "#ff3b30", "#34c759", "#ff9500", "#af52de"];

  return (
    <div className="space-y-20 pb-32">
      <header className="space-y-4 px-2">
        <h1 className="text-6xl font-bold tracking-apple text-white flex items-center gap-6">
          Relatórios <span className="text-accent underline decoration-8 underline-offset-8">Premium</span>
        </h1>
        <p className="text-white/40 text-2xl font-medium tracking-wide">Análise preditiva e comportamento de gastos sob demanda.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <GlassCard className="p-16 min-h-[600px] border-white/10 flex flex-col">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-[#5856d6]/10 rounded-[28px] flex items-center justify-center text-[#5856d6] shadow-inner">
              <PieIcon size={32} />
            </div>
            <h3 className="text-3xl font-bold tracking-apple text-white">Distribuição de Gastos</h3>
          </div>

          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(40px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                   itemStyle={{ color: "#fff" }}
                   formatter={(v: any) => `R$ ${formatCurrency(v)}`}
                />

              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
             {data.map((item, index) => (
               <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{item.name}</span>
               </div>
             ))}
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="p-10 border-white/10 hover:bg-white/[0.04] transition-all group">
            <div className="flex items-center gap-5 mb-8">
               <div className="w-14 h-14 bg-[#34c759]/10 rounded-3xl flex items-center justify-center text-[#34c759] shadow-inner group-hover:scale-110 transition-transform">
                 <ArrowUpRight size={28} />
               </div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Receita Mensal</p>
                  <p className="text-3xl font-bold text-[#34c759] tracking-apple">R$ {formatCurrency(stats.monthlyIncome)}</p>
               </div>
            </div>
            <AppleButton variant="glass" className="w-full">Exportar PDF</AppleButton>
          </GlassCard>

          <GlassCard className="p-10 border-white/10 hover:bg-white/[0.04] transition-all group">
            <div className="flex items-center gap-5 mb-8">
               <div className="w-14 h-14 bg-[#ff3b30]/10 rounded-3xl flex items-center justify-center text-[#ff3b30] shadow-inner group-hover:scale-110 transition-transform">
                 <ArrowDownLeft size={28} />
               </div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Despesa Mensal</p>
                  <p className="text-3xl font-bold text-white tracking-apple">R$ {formatCurrency(stats.monthlyExpense)}</p>
               </div>
            </div>
            <AppleButton variant="glass" className="w-full">Analisar Faturas</AppleButton>
          </GlassCard>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <GlassCard className="p-16 flex flex-col items-center justify-center text-center border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
          
          <div className="w-28 h-28 bg-white/5 rounded-[40px] flex items-center justify-center mb-10 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <BarChart3 size={48} strokeWidth={1.5} className="text-white opacity-20 group-hover:text-accent group-hover:opacity-100 transition-all duration-500" />
          </div>
          
          <div className="max-w-xl space-y-4">
              <h3 className="text-3xl font-bold tracking-apple text-white">Ecossistema em Aprendizado</h3>
              <p className="text-white/20 text-xl font-medium leading-relaxed px-8">
                Para gerar análises precisas de nível platina, nosso motor de IA precisa de ao menos 15 dias de histórico financeiro consistente.
              </p>
          </div>

          <div className="mt-12 flex items-center gap-4 text-white/30 bg-white/5 px-8 py-4 rounded-3xl border border-white/5 font-bold tracking-[0.2em] text-[10px] uppercase shadow-lg backdrop-blur-3xl">
              <Info size={18} strokeWidth={2} className="text-accent animate-pulse" />
              <span>Processamento Neuronal em Tempo Real</span>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function ReportCard({ icon: Icon, title, description, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    >
      <GlassCard className="p-12 flex flex-col gap-8 hover:bg-white/[0.08] group min-h-[300px]">
        <div className="p-6 bg-white/5 rounded-[32px] w-fit shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
          <Icon size={36} strokeWidth={1.5} className="text-white/20 group-hover:text-accent group-hover:opacity-100 transition-all duration-500" />
        </div>
        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-white tracking-apple">{title}</h3>
          <p className="text-white/30 text-lg font-medium leading-relaxed">{description}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

