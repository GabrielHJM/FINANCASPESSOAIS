"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AppleButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "glass" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export function AppleButton({ 
  children, 
  className, 
  icon: Icon, 
  variant = "primary", 
  size = "md",
  onClick,
  disabled,
  ...props 
}: AppleButtonProps) {
  const variants = {
    primary: "bg-accent text-white shadow-[0_20px_40px_-12px_rgba(0,122,255,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,122,255,0.4)]",
    secondary: "bg-white text-black hover:bg-white/90 shadow-xl",
    glass: "bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/20",
    danger: "bg-[#ff3b30] text-white shadow-[0_4px_14px_rgba(255,59,48,0.3)] hover:brightness-110",
    outline: "bg-transparent border-2 border-white/10 text-white hover:bg-white/5 hover:border-white/20",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs font-bold",
    md: "px-8 py-4 text-sm font-bold",
    lg: "px-10 py-5 text-base font-bold",
    icon: "p-4",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center gap-3 rounded-[20px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-apple overflow-hidden group",
        variants[variant as keyof typeof variants],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={size === "sm" ? 16 : 20} strokeWidth={1.5} className="current-color" />}
      {children}
    </motion.button>
  );
}
