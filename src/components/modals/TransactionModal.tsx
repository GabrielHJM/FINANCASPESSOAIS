"use client";

import { useState } from "react";
import { DollarSign, Tag, Calendar, Layout, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { AppleButton } from "@/components/ui/AppleButton";
import { createTransaction } from "@/lib/actions";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { toast } from "react-hot-toast";


interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: any[];
  cards: any[];
}

export function TransactionModal({ isOpen, onClose, accounts, cards }: TransactionModalProps) {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Geral");
  const [accountId, setAccountId] = useState("");
  const [cardId, setCardId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category,
      accountId: accountId || undefined,
      cardId: cardId || undefined,
    });

    setLoading(false);
    if (res.success) {
      toast.success("Lançamento realizado com sucesso!");
      onClose();
      // Reset form
      setAmount("");
      setDescription("");
      setAccountId("");
      setCardId("");
    } else {
      toast.error(res.error || "Erro ao realizar lançamento");
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Lançamento">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Type Selector */}
        <div className="flex p-1.5 bg-white/5 rounded-2xl gap-2">
          <button
            type="button"
            onClick={() => setType(TransactionType.EXPENSE)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold tracking-apple text-sm",
              type === TransactionType.EXPENSE ? "bg-[#ff3b30] text-white shadow-lg" : "text-white/40 hover:text-white"
            )}
          >
            <ArrowDownCircle size={18} /> Despesa
          </button>
          <button
            type="button"
            onClick={() => setType(TransactionType.INCOME)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold tracking-apple text-sm",
              type === TransactionType.INCOME ? "bg-[#34c759] text-white shadow-lg" : "text-white/40 hover:text-white"
            )}
          >
            <ArrowUpCircle size={18} /> Receita
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Valor do Lançamento</label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors text-2xl font-bold">R$</div>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full bg-white/5 border border-white/10 rounded-[24px] py-6 pl-16 pr-8 text-4xl font-bold text-white placeholder:text-white/5 outline-none focus:bg-white/10 transition-all text-right"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Descrição</label>
            <div className="relative group">
              <Layout className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white" size={20} />
              <input
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Aluguel, Salário, Mercado..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Categoria</label>
               <select 
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                 className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-white/20 transition-all font-medium appearance-none"
               >
                 <option value="Geral" className="bg-[#0b0e14]">Geral</option>
                 <option value="Alimentação" className="bg-[#0b0e14]">Alimentação</option>
                 <option value="Lazer" className="bg-[#0b0e14]">Lazer</option>
                 <option value="Saúde" className="bg-[#0b0e14]">Saúde</option>
                 <option value="Transporte" className="bg-[#0b0e14]">Transporte</option>
               </select>
            </div>
            
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Fonte</label>
               <select 
                 required
                 value={accountId || cardId}
                 onChange={(e) => {
                   const val = e.target.value;
                   if (val.startsWith("card_")) {
                     setCardId(val.replace("card_", ""));
                     setAccountId("");
                   } else {
                     setAccountId(val);
                     setCardId("");
                   }
                 }}
                 className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-white/20 transition-all font-medium appearance-none"
               >
                 <option value="" disabled className="bg-[#0b0e14]">Selecionar Conta/Cartão</option>
                 {accounts.map(acc => (
                   <option key={acc.id} value={acc.id} className="bg-[#0b0e14]">{acc.name}</option>
                 ))}
                 {cards.map(card => (
                   <option key={card.id} value={`card_${card.id}`} className="bg-[#0b0e14]">💳 {card.name}</option>
                 ))}
               </select>
            </div>
          </div>
        </div>

        <AppleButton 
          type="submit" 
          variant="primary" 
          className="w-full py-5 text-lg font-bold"
          disabled={loading}
        >
          {loading ? "Sincronizando..." : "Confirmar Lançamento"}
        </AppleButton>
      </form>
    </Modal>
  );
}
