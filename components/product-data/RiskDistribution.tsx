'use client';

import { motion } from 'framer-motion';

interface RiskDistributionProps {
  counts: { high: number; medium: number; low: number };
  total: number;
}

export default function RiskDistribution({ counts, total }: RiskDistributionProps) {
  const rows = [
    { label: 'HIGH', count: counts.high, color: '#fb7185', bgClass: 'bg-hs-rose' },
    { label: 'MEDIUM', count: counts.medium, color: '#ff9f43', bgClass: 'bg-hs-amber' },
    { label: 'LOW', count: counts.low, color: '#00d4aa', bgClass: 'bg-hs-teal' },
  ];

  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4">
      <div className="text-[10px] tracking-widest text-hs-muted mb-3">
        RISK DISTRIBUTION
      </div>

      <div className="space-y-2.5">
        {rows.map((row, idx) => {
          const pct = total > 0 ? (row.count / total) * 100 : 0;
          return (
            <div key={row.label} className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono w-16 shrink-0"
                style={{ color: row.color }}
              >
                {row.label}
              </span>
              <div className="flex-1 h-2 rounded-full bg-hs-border/50 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: row.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: idx * 0.15,
                  }}
                />
              </div>
              <span
                className="text-[10px] font-mono font-bold w-6 text-right shrink-0"
                style={{ color: row.color }}
              >
                {row.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
