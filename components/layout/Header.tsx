'use client';
import Image from 'next/image';
import { Activity, Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 bg-hs-surface/80 backdrop-blur-xl border-b border-hs-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-hs-teal" />
          <span className="text-sm text-hs-muted">
            <span className="text-hs-text font-medium">HyperScaleAWC.ai</span>
            {' — '}Autonomous Work Completion Platform
          </span>
        </div>
        <div className="w-px h-6 bg-hs-border" />
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-hs-border">
          <Image src="/orgill-logo.svg" alt="Orgill" width={64} height={20} className="opacity-90" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-hs-teal/10 rounded-full border border-hs-teal/20">
          <Shield className="w-3 h-3 text-hs-teal" />
          <span className="text-xs font-mono text-hs-teal">SECURE</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-hs-surface2 rounded-full border border-hs-border">
          <div className="w-2 h-2 rounded-full bg-hs-teal animate-pulse" />
          <span className="text-xs font-mono text-hs-muted">DEMO</span>
        </div>
      </div>
    </header>
  );
}
