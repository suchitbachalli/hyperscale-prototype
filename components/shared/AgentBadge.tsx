'use client';
import { Bot } from 'lucide-react';
import clsx from 'clsx';

interface AgentBadgeProps {
  name: string;
  status: 'active' | 'idle' | 'running';
}

export default function AgentBadge({ name, status }: AgentBadgeProps) {
  return (
    <div className={clsx(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border',
      status === 'active' && 'bg-hs-teal/10 border-hs-teal/30 text-hs-teal',
      status === 'running' && 'bg-hs-amber/10 border-hs-amber/30 text-hs-amber',
      status === 'idle' && 'bg-hs-surface2 border-hs-border text-hs-muted',
    )}>
      <Bot className="w-3 h-3" />
      <span>{name}</span>
      <div className={clsx(
        'w-1.5 h-1.5 rounded-full',
        status === 'active' && 'bg-hs-teal animate-pulse',
        status === 'running' && 'bg-hs-amber animate-pulse',
        status === 'idle' && 'bg-hs-muted',
      )} />
    </div>
  );
}
