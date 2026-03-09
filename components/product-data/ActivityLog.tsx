'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Rocket, Download } from 'lucide-react';
import type { ActivityLogEntry } from '@/data/product-data';

interface ActivityLogProps {
  entries: ActivityLogEntry[];
}

const iconMap = {
  ai: { Icon: Sparkles, color: '#ff9f43' },
  validate: { Icon: ShieldCheck, color: '#00d4aa' },
  publish: { Icon: Rocket, color: '#fb7185' },
  import: { Icon: Download, color: '#4ea8ff' },
} as const;

export default function ActivityLog({ entries }: ActivityLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length]);

  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4 flex flex-col">
      <div className="text-[10px] tracking-widest text-hs-muted mb-2">
        ACTIVITY
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-auto space-y-1.5"
        style={{ maxHeight: '240px' }}
      >
        {entries.length === 0 ? (
          <p className="text-hs-muted text-[10px] italic">
            Waiting for pipeline...
          </p>
        ) : (
          entries.map((entry) => {
            const { Icon, color } = iconMap[entry.type];
            return (
              <motion.div
                key={entry.id}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  className="w-3 h-3 shrink-0 mt-0.5"
                  style={{ color }}
                />
                <span className="text-[10px] leading-tight">
                  <span className="text-hs-blue font-mono">
                    {entry.partNumber}
                  </span>{' '}
                  <span className="text-hs-muted">{entry.action}</span>
                </span>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
