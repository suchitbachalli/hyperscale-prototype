'use client';

import { motion } from 'framer-motion';
import { Database, Server } from 'lucide-react';
import clsx from 'clsx';
import { CatalogInfo } from '@/data/product-data';

interface CatalogCardProps {
  catalog: CatalogInfo;
  stageProgress: Record<string, { done: number; total: number }>;
  isRunning: boolean;
}

const stageConfig: { id: string; name: string; color: string }[] = [
  { id: 'import', name: 'Import', color: 'blue' },
  { id: 'enrich', name: 'Enrich', color: 'amber' },
  { id: 'validate', name: 'Validate', color: 'teal' },
  { id: 'publish', name: 'Publish', color: 'rose' },
];

const barColorMap: Record<string, string> = {
  blue: 'bg-hs-blue',
  amber: 'bg-hs-amber',
  teal: 'bg-hs-teal',
  rose: 'bg-hs-rose',
};

const barTrackColorMap: Record<string, string> = {
  blue: 'bg-hs-blue/20',
  amber: 'bg-hs-amber/20',
  teal: 'bg-hs-teal/20',
  rose: 'bg-hs-rose/20',
};

const textColorMap: Record<string, string> = {
  blue: 'text-hs-blue',
  amber: 'text-hs-amber',
  teal: 'text-hs-teal',
  rose: 'text-hs-rose',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

export default function CatalogCard({ catalog, stageProgress, isRunning }: CatalogCardProps) {
  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4">
      {/* Header: icon + catalog name */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-hs-blue/15 flex items-center justify-center shrink-0">
          <Database className="w-3.5 h-3.5 text-hs-blue" />
        </div>
        <h3 className="text-sm font-semibold text-white truncate">
          {catalog.name}
        </h3>
      </div>

      {/* Source row */}
      <div className="flex items-center gap-1.5 mb-2">
        <Server className="w-3 h-3 text-hs-muted shrink-0" />
        <span className="text-xs font-mono text-hs-muted truncate">
          Source: {catalog.source}
        </span>
      </div>

      {/* Items row */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-mono text-hs-muted">Items:</span>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-hs-blue/15 text-[10px] font-mono font-medium text-hs-blue">
          {catalog.totalItems}
        </span>
      </div>

      {/* Stage progress bars */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2.5"
      >
        {stageConfig.map((stage) => {
          const progress = stageProgress[stage.id] ?? { done: 0, total: catalog.totalItems };
          const pct = progress.total > 0 ? (progress.done / progress.total) * 100 : 0;

          return (
            <motion.div key={stage.id} variants={itemVariants}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] text-hs-muted font-mono">
                  {stage.name}
                </span>
                <span className={clsx('text-[10px] font-mono', textColorMap[stage.color])}>
                  {progress.done}/{progress.total}
                </span>
              </div>
              <div className={clsx('h-1.5 rounded-full overflow-hidden', barTrackColorMap[stage.color])}>
                <motion.div
                  className={clsx('h-full rounded-full', barColorMap[stage.color])}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Running indicator */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 flex items-center gap-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hs-amber opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-hs-amber" />
          </span>
          <span className="text-[10px] font-mono text-hs-amber">
            Pipeline running...
          </span>
        </motion.div>
      )}
    </div>
  );
}
