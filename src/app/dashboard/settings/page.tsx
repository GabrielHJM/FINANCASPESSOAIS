"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, CreditCard as CreditCardIcon, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppleButton } from "@/components/ui/AppleButton";
import { useAuth } from "@/context/auth-context";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-20 pb-32">
      <header className="space-y-4 px-2">
        <h1 className="text-6xl font-bold tracking-apple text-white flex items-center gap-6">
          Ajustes <span className="text-white/20 font-light">Sistêmicos</span>
        </h1>
        <p className="text-white/40 text-2xl font-medium tracking-wide">Personalize sua experiência de gestão elite.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* User Profile */}
          <GlassCard className="p-16 border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-32 h-32 bg-accent/20 rounded-[40px] flex items-center justify-center text-accent border border-accent/20 shadow-2xl">
                 <User size={64} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-bold tracking-apple text-white mb-2">{user?.name || "Gabriel"}</h3>
                <p className="text-white/30 text-lg font-medium tracking-wide">{user?.email || "gabriel@contoso.com"}</p>
                <div className="flex justify-center md:justify-start gap-3 mt-6">
                   <span className="px-4 py-2 bg-white/5 rounded-full text-[11px] font-bold uppercase tracking-widest text-accent border border-accent/20">Membro Founder</span>
                   <span className="px-4 py-2 bg-white/5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#34c759] border border-[#34c759]/20">Verificado</span>
                </div>
              </div>
            </div>
            <AppleButton variant="glass" size="lg">Editar Perfil</AppleButton>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SettingsItem icon={Bell} title="Notificações" description="Alertas de gastos e avisos de vencimento." />
            <SettingsItem icon={Shield} title="Segurança" description="Autenticação biométrica e chaves de acesso." />
            <SettingsItem icon={Palette} title="Aparência" description="Ajustes de transparência e cores de destaque." />
            <SettingsItem icon={Sparkles} title="Inteligência" description="Configurações de análise preditiva da IA." />
          </div>
        </div>

        <div className="space-y-12">
          <GlassCard className="p-12 border-white/10 bg-gradient-to-br from-accent/10 to-transparent relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
               <Sparkles size={240} />
            </div>
            <div className="flex items-center gap-6 mb-10">
               <CreditCardIcon className="text-accent" size={40} />
               <h4 className="text-2xl font-bold text-white tracking-apple">Plano Vitalício</h4>
            </div>
            <p className="text-white/40 text-lg font-medium leading-relaxed mb-12">Você possui acesso ilimitado a todas as ferramentas premium do ecossistema FinançasPlus.</p>
            <AppleButton variant="primary" size="lg" className="w-full shadow-accent/20 shadow-2xl">Gerenciar Assinatura</AppleButton>
          </GlassCard>


          <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-[32px]">
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/10 mb-4">Versão do Sistema</p>
             <p className="text-xs font-bold text-white/20 tracking-widest">FP-OS 1.0.4.STABLE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsItem({ icon: Icon, title, description }: any) {
  return (
    <GlassCard className="p-8 border-white/5 hover:border-white/10 transition-all cursor-pointer flex gap-5 items-start group">
      <div className="p-4 bg-white/5 rounded-2xl text-white/20 group-hover:text-white transition-all">
         <Icon size={24} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors tracking-apple">{title}</h4>
        <p className="text-sm text-white/20 font-medium leading-relaxed">{description}</p>
      </div>
    </GlassCard>
  );
}
