'use client';

import { motion } from 'framer-motion';

interface FieldCompletenessProps {
  metrics: { label: string; value: number; total: number }[];
}

export default function FieldCompleteness({ metrics }: FieldCompletenessProps) {
  function getColor(pct: number): string {
    if (pct >= 90) return '#00d4aa';
    if (pct >= 70) return '#ff9f43';
    return '#fb7185';
  }

  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4">
      <div className="text-[10px] tracking-widest text-hs-muted mb-3">
        FIELD COMPLETENESS
      </div>

      <div className="space-y-2">
        {metrics.map((metric, idx) => {
          const pct = metric.total > 0 ? Math.round((metric.value / metric.total) * 100) : 0;
          const color = getColor(pct);

          return (
            <div key={metric.label} className="flex items-center justify-between">
              <span className="text-[10px] text-hs-muted w-20 shrink-0 truncate">
                {metric.label}
              </span>
              <div className="flex-1 h-1 mx-2 rounded-full bg-hs-border/50 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 0.7,
                    ease: 'easeOut',
                    delay: idx * 0.08,
                  }}
                />
              </div>
              <span
                className="text-[10px] font-mono font-bold w-8 text-right shrink-0"
                style={{ color }}
              >
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
