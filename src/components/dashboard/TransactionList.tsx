"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShoppingBag, 
  Coffee, 
  Zap, 
  Heart, 
  Car,
  MoreHorizontal
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: any[];
}

const CATEGORY_ICONS: any = {
  "Alimentação": Coffee,
  "Saúde": Heart,
  "Transporte": Car,
  "Lazer": ShoppingBag,
  "Geral": Zap,
};

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <p className="text-white/20 font-bold text-sm tracking-[0.2em] uppercase mb-6">Nenhuma transação recente</p>
        <p className="text-white/10 text-base max-w-[240px] leading-relaxed">Seu extrato aparecerá aqui assim que você realizar o primeiro lançamento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {transactions.map((t, index) => {
        const Icon = CATEGORY_ICONS[t.category] || Zap;
        const isIncome = t.type === "INCOME";

        return (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, ease: "easeOut" }}
            className="group flex items-center justify-between p-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer shadow-2xl"
          >
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-16 h-16 rounded-[24px] flex items-center justify-center transition-all shadow-inner",
                isIncome ? "bg-[#34c759]/10 text-[#34c759]" : "bg-[#ff3b30]/10 text-[#ff3b30]"
              )}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-white font-bold tracking-apple text-lg mb-1.5">{t.description}</h4>
                <div className="flex items-center gap-4">
                  <span className="text-white/30 text-[11px] font-bold uppercase tracking-widest">{t.category}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <p className="text-white/20 text-[11px] font-medium tracking-apple">{formatDate(t.date)}</p>
                </div>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <p className={cn(
                "text-2xl font-bold tracking-apple",
                isIncome ? "text-[#34c759]" : "text-white"
              )}>
                {isIncome ? "+" : "-"} R$ {formatCurrency(t.amount)}
              </p>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <MoreHorizontal size={20} className="text-white/20" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

