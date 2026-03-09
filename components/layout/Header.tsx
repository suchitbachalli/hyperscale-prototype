'use client';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 shrink-0 bg-hs-surface/80 backdrop-blur-xl border-b border-hs-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <img src="/hyperscale-logo.svg" alt="HyperScale" className="h-5" />
          <span className="text-sm text-hs-muted hidden lg:inline">
            {' — '}Autonomous Work Completion Platform
          </span>
        </div>
        <div className="w-px h-6 bg-hs-border" />
        <div className="flex items-center gap-3 px-3 py-1 bg-white/5 rounded-lg border border-hs-border">
          <img src="/orgill-logo.svg" alt="Orgill" className="h-5" />
          <div className="w-px h-4 bg-hs-border/60" />
          <img src="/unilog-logo.svg" alt="Unilog" className="h-[22px]" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-hs-teal/10 rounded-full border border-hs-teal/20">
          <Shield className="w-3 h-3 text-hs-teal" />
          <span className="text-xs font-mono text-hs-teal">SECURE</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-hs-surface2 rounded-full border border-hs-border">
          <div className="w-2 h-2 rounded-full bg-hs-teal animate-pulse" />
          <span className="text-xs font-mono text-hs-muted">LIVE</span>
        </div>
      </div>
    </header>
  );
}
