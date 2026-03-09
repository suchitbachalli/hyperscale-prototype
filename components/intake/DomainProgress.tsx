'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { intakeDomains, overallProgress } from '@/data/intake-domains';

interface DomainProgressProps {
  activeDomain: string | null;
  onSelectDomain: (domainId: string) => void;
}

export default function DomainProgress({ activeDomain, onSelectDomain }: DomainProgressProps) {
  return (
    <div className="h-full flex flex-col bg-hs-surface/50 rounded-xl border border-hs-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-hs-border">
        <h3 className="text-xs font-mono text-hs-muted uppercase tracking-wider mb-2">
          Domain Completion
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-hs-surface2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress.percentage}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-hs-teal to-hs-blue rounded-full progress-shimmer"
            />
          </div>
          <span className="text-sm font-mono text-hs-teal font-semibold">
            {overallProgress.percentage}%
          </span>
        </div>
        <p className="text-[10px] text-hs-muted mt-1 font-mono">
          {overallProgress.domainsComplete}/{overallProgress.domainsTotal} domains — {overallProgress.fieldsCollected} fields
        </p>
      </div>

      {/* Domain list */}
      <div className="flex-1 overflow-auto p-2">
        {intakeDomains.map((domain) => (
          <motion.button
            key={domain.id}
            onClick={() => onSelectDomain(domain.id)}
            whileHover={{ x: 2 }}
            className={clsx(
              'w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-colors',
              activeDomain === domain.id && 'bg-hs-surface2 border border-hs-teal/20',
              activeDomain !== domain.id && 'hover:bg-hs-surface2/50',
            )}
          >
            {/* Status icon */}
            <div className="shrink-0">
              {domain.status === 'complete' && (
                <CheckCircle2 className="w-3.5 h-3.5 text-hs-teal" />
              )}
              {domain.status === 'in-progress' && (
                <Loader2 className="w-3.5 h-3.5 text-hs-blue animate-spin" />
              )}
              {domain.status === 'not-started' && (
                <Circle className="w-3.5 h-3.5 text-hs-muted" />
              )}
            </div>

            {/* Domain name & progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={clsx(
                  'text-[11px] font-mono truncate',
                  domain.status === 'complete' && 'text-hs-text',
                  domain.status === 'in-progress' && 'text-hs-blue',
                  domain.status === 'not-started' && 'text-hs-muted',
                )}>
                  {domain.name}
                </span>
                <span className={clsx(
                  'text-[10px] font-mono ml-2 shrink-0',
                  domain.progress === 100 ? 'text-hs-teal' : 'text-hs-blue',
                )}>
                  {domain.progress}%
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="h-0.5 bg-hs-surface2 rounded-full mt-1 overflow-hidden">
                <div
                  className={clsx(
                    'h-full rounded-full transition-all',
                    domain.progress === 100 ? 'bg-hs-teal/60' : 'bg-hs-blue/60',
                  )}
                  style={{ width: `${domain.progress}%` }}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
