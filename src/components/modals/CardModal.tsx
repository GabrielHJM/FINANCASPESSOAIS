"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck, Zap } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { AppleButton } from "@/components/ui/AppleButton";
import { createCard } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";


interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function CardModal({ isOpen, onClose, userId }: CardModalProps) {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createCard({
      name,
      limit: parseFloat(limit),
      userId,
    });

    setLoading(false);
    if (res.success) {
      toast.success("Cartão digital emitido com sucesso!");
      onClose();
      // Reset form
      setName("");
      setLimit("");
    } else {
      toast.error(res.error || "Erro ao emitir cartão");
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Cartão de Crédito">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card Preview (Apple-style) */}
        <div className="relative h-56 w-full rounded-[32px] bg-gradient-to-br from-white/10 to-transparent border border-white/20 p-8 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all duration-700">
             <Zap size={120} strokeWidth={1.5} className="text-accent" />
          </div>
          
          <div className="h-10 w-14 bg-white/10 rounded-lg border border-white/10 mb-8" />
          
          <div className="space-y-2">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">Limite Disponível</p>
            <p className="text-3xl font-bold text-white tracking-apple">
               <span className="text-white/20 mr-2">R$</span>
               {limit || "0,00"}
            </p>
          </div>
          
          <div className="absolute bottom-8 left-8">
             <p className="text-white font-bold tracking-widest uppercase text-xs">{name || "Seu Nome"}</p>
          </div>
          
          <div className="absolute bottom-8 right-8">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 grayscale opacity-20" />
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Limite Total</label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors text-2xl font-bold">R$</div>
            <input
              type="number"
              step="0.01"
              required
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="0,00"
              className="w-full bg-white/5 border border-white/10 rounded-[24px] py-6 pl-16 pr-8 text-4xl font-bold text-white placeholder:text-white/5 outline-none focus:bg-white/10 transition-all text-right"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Identificação do Cartão</label>
          <div className="relative group">
            <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white" size={20} />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Nubank Ultravioleta, Inter Black..."
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-all font-medium"
            />
          </div>
        </div>

        <AppleButton 
          type="submit" 
          variant="primary" 
          className="w-full py-5 text-lg font-bold"
          disabled={loading}
        >
          {loading ? "Processando..." : "Emitir Cartão Digital"}
        </AppleButton>

        <div className="flex items-center justify-center gap-2 text-white/10 text-xs">
          <ShieldCheck size={16} strokeWidth={2} />
          <span className="font-bold tracking-widest uppercase">Safe & Secured Connection</span>
        </div>
      </form>
    </Modal>
  );
}
