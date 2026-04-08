"use client";

import { useState } from "react";
import { Landmark, LandmarkIcon, Layout } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { AppleButton } from "@/components/ui/AppleButton";
import { createAccount } from "@/lib/actions";
import { SUPPORTED_BANKS } from "@/lib/banks";
import { AccountType } from "@/lib/types";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { toast } from "react-hot-toast";


interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function AccountModal({ isOpen, onClose, userId }: AccountModalProps) {
  const [bankId, setBankId] = useState<string>("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState<AccountType>(AccountType.CHECKING);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createAccount({
      name,
      balance: parseFloat(balance),
      type,
      bankId: bankId || undefined,
      userId,
    });

    setLoading(false);
    if (res.success) {
      toast.success("Instituição vinculada com sucesso!");
      onClose();
      // Reset form
      setName("");
      setBalance("");
      setType(AccountType.CHECKING);
      setBankId("");
    } else {
      toast.error(res.error || "Erro ao vincular instituição");
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vincular Instituição">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bank Selection Grid */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Selecionar Banco</label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {SUPPORTED_BANKS.map((bank) => (
              <button
                key={bank.id}
                type="button"
                onClick={() => {
                  setBankId(bank.id);
                  setName(bank.name);
                }}
                className={cn(
                  "relative aspect-square rounded-2xl p-2 flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-2xl",
                  bankId === bank.id ? "bg-white/10 ring-2 ring-accent" : "bg-white/5 hover:bg-white/10"
                )}
              >
                <img 
                  src={bank.logo} 
                  alt={bank.name} 
                  className={cn(
                    "w-10 h-10 object-contain transition-all",
                    bankId === bank.id ? "grayscale-0 scale-110" : "grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100"
                  )} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Saldo Inicial</label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors text-2xl font-bold">R$</div>
            <input
              type="number"
              step="0.01"
              required
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0,00"
              className="w-full bg-white/5 border border-white/10 rounded-[24px] py-6 pl-16 pr-8 text-4xl font-bold text-white placeholder:text-white/5 outline-none focus:bg-white/10 transition-all text-right"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Apelido da Conta</label>
            <div className="relative group">
              <LandmarkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white" size={20} />
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Conta Principal, Reserva de Emergência..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Tipo de Conta</label>
             <select 
               value={type}
               onChange={(e) => setType(e.target.value as AccountType)}
               className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-white/20 transition-all font-medium appearance-none"
             >
               <option value={AccountType.CHECKING} className="bg-[#0b0e14]">Conta Corrente</option>
               <option value={AccountType.SAVINGS} className="bg-[#0b0e14]">Poupança / Reserva</option>
               <option value={AccountType.CASH} className="bg-[#0b0e14]">Dinheiro (Carteira)</option>
               <option value={AccountType.INVESTMENT} className="bg-[#0b0e14]">Investimento</option>
             </select>
          </div>
        </div>

        <AppleButton 
          type="submit" 
          variant="primary" 
          className="w-full py-5 text-lg font-bold"
          disabled={loading}
        >
          {loading ? "Estabelecendo Conexão..." : "Confirmar Vinculação"}
        </AppleButton>
      </form>
    </Modal>
  );
}
