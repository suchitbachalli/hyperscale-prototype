'use client';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'teal' | 'amber' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function GlowButton({ children, onClick, icon: Icon, variant = 'teal', size = 'md', disabled = false }: GlowButtonProps) {
  const variants = {
    teal: 'bg-hs-teal hover:bg-hs-teal/90 text-black glow-teal',
    amber: 'bg-hs-amber hover:bg-hs-amber/90 text-black glow-amber',
    blue: 'bg-hs-blue hover:bg-hs-blue/90 text-black glow-blue',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        'inline-flex items-center gap-2 rounded-lg font-semibold transition-all',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
}
