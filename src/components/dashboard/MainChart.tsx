"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

import { formatCurrency } from "@/lib/utils";

interface MainChartProps {
  data: any[];
}

export function MainChart({ data }: MainChartProps) {
  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34c759" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#34c759" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff3b30" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ff3b30" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(255,255,255,0.05)" 
          />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            hide
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#34c759"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncome)"
            animationDuration={1500}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ff3b30"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorExpense)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/40 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#34c759]" />
              <span className="text-xs font-medium text-white/60">Receita</span>
            </div>
            <span className="text-xs font-bold text-white">R$ {formatCurrency(payload[0].value)}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff3b30]" />
              <span className="text-xs font-medium text-white/60">Despesa</span>
            </div>
            <span className="text-xs font-bold text-white">R$ {formatCurrency(payload[1].value)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
