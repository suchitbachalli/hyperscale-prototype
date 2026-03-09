'use client';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel?: string;
  color?: 'teal' | 'amber' | 'blue' | 'rose';
  delay?: number;
}

const colorMap = {
  teal: { bg: 'bg-hs-teal/10', border: 'border-hs-teal/20', text: 'text-hs-teal', glow: 'glow-teal' },
  amber: { bg: 'bg-hs-amber/10', border: 'border-hs-amber/20', text: 'text-hs-amber', glow: 'glow-amber' },
  blue: { bg: 'bg-hs-blue/10', border: 'border-hs-blue/20', text: 'text-hs-blue', glow: 'glow-blue' },
  rose: { bg: 'bg-hs-rose/10', border: 'border-hs-rose/20', text: 'text-hs-rose', glow: '' },
};

export default function MetricCard({ icon: Icon, label, value, sublabel, color = 'teal', delay = 0 }: MetricCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        'p-5 rounded-xl border bg-hs-surface2/50 backdrop-blur-sm',
        colors.border
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={clsx('p-2 rounded-lg', colors.bg)}>
          <Icon className={clsx('w-4 h-4', colors.text)} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold font-mono text-white">{value}</p>
        <p className="text-xs text-hs-muted font-medium">{label}</p>
        {sublabel && (
          <p className={clsx('text-[10px] font-mono', colors.text)}>{sublabel}</p>
        )}
      </div>
    </motion.div>
  );
}
