'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface TerminalOutputProps {
  lines: string[];
  visibleCount: number;
  title?: string;
}

export default function TerminalOutput({ lines, visibleCount, title = 'Terminal' }: TerminalOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const getTimestamp = (index: number) => {
    const base = 9 * 3600 + 14 * 60 + 2;
    const offset = base + index * 0.341;
    const hours = Math.floor(offset / 3600);
    const minutes = Math.floor((offset % 3600) / 60);
    const seconds = Math.floor(offset % 60);
    const ms = Math.floor((offset * 1000) % 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-hs-bg rounded-xl border border-hs-border overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-hs-surface border-b border-hs-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-hs-rose/60" />
          <div className="w-3 h-3 rounded-full bg-hs-amber/60" />
          <div className="w-3 h-3 rounded-full bg-hs-teal/60" />
        </div>
        <span className="text-xs font-mono text-hs-muted ml-2">{title}</span>
      </div>

      {/* Terminal content */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed">
        {/* Header lines */}
        <div className="text-hs-teal mb-1">[{getTimestamp(0)}] 🤖 HyperScaleAWC Scaffolding Agent v1.0</div>
        <div className="text-hs-muted mb-1">[{getTimestamp(1)}] ─────────────────────────────────────</div>
        <div className="text-hs-text mb-1">[{getTimestamp(2)}] Customer: Reynolds & Son, Inc.</div>
        <div className="text-hs-text mb-1">[{getTimestamp(3)}] ERP: Prophet 21 (Cloud)</div>
        <div className="text-hs-text mb-1">[{getTimestamp(4)}] Type: Go Program</div>
        <div className="text-hs-muted mb-3">[{getTimestamp(5)}] ─────────────────────────────────────</div>

        {/* Dynamic lines */}
        <AnimatePresence>
          {lines.slice(0, visibleCount).map((line, index) => (
            <motion.div
              key={`${index}-${line}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={clsx(
                'mb-0.5',
                line.includes('✅') && 'text-hs-teal',
                line.includes('▶') && 'text-hs-amber font-semibold mt-2',
                line.includes('→') && !line.includes('✅') && 'text-hs-muted',
                line.includes('❌') && 'text-hs-rose',
                !line.includes('✅') && !line.includes('▶') && !line.includes('→') && !line.includes('❌') && 'text-hs-text',
              )}
            >
              <span className="text-hs-muted/50">[{getTimestamp(6 + index)}]</span>{' '}
              {line}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        {visibleCount < lines.length && (
          <div className="cursor-blink text-hs-teal mt-1" />
        )}
      </div>
    </div>
  );
}
