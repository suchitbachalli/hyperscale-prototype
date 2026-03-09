'use client';
import { motion } from 'framer-motion';
import {
  Cloud, Users, Table, MessageSquare, Folder,
  Ticket, FileText, Share2, CheckCircle2, Loader2, Circle
} from 'lucide-react';
import clsx from 'clsx';

const iconMap: Record<string, React.ElementType> = {
  cloud: Cloud,
  users: Users,
  table: Table,
  'message-square': MessageSquare,
  folder: Folder,
  ticket: Ticket,
  'file-text': FileText,
  'share-2': Share2,
};

interface SystemCardProps {
  system: string;
  icon: string;
  duration: number;
  status: 'pending' | 'running' | 'complete' | 'error';
  stepNumber: number;
  isActive: boolean;
  onClick: () => void;
}

export default function SystemCard({ system, icon, duration, status, stepNumber, isActive, onClick }: SystemCardProps) {
  const Icon = iconMap[icon] || Circle;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: stepNumber * 0.05 }}
      onClick={onClick}
      className={clsx(
        'relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border',
        isActive && 'bg-hs-surface2 border-hs-teal/30',
        !isActive && status === 'complete' && 'bg-hs-surface2/30 border-transparent hover:border-hs-border',
        !isActive && status === 'running' && 'bg-hs-amber/5 border-hs-amber/20',
        !isActive && status === 'pending' && 'bg-transparent border-transparent hover:border-hs-border',
      )}
    >
      {/* Timeline connector */}
      {stepNumber < 7 && (
        <div className={clsx(
          'absolute left-[26px] top-[48px] w-0.5 h-6',
          status === 'complete' ? 'bg-hs-teal/40' : 'bg-hs-border',
        )} />
      )}

      {/* Status icon */}
      <div className={clsx(
        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
        status === 'complete' && 'bg-hs-teal/20',
        status === 'running' && 'bg-hs-amber/20',
        status === 'pending' && 'bg-hs-surface2',
      )}>
        {status === 'complete' && <CheckCircle2 className="w-4 h-4 text-hs-teal" />}
        {status === 'running' && <Loader2 className="w-4 h-4 text-hs-amber animate-spin" />}
        {status === 'pending' && <Icon className="w-4 h-4 text-hs-muted" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={clsx(
          'text-sm font-medium truncate',
          status === 'complete' && 'text-hs-text',
          status === 'running' && 'text-hs-amber',
          status === 'pending' && 'text-hs-muted',
        )}>
          {system}
        </p>
        <p className="text-[10px] font-mono text-hs-muted">
          {status === 'complete' && `✅ ${duration}s`}
          {status === 'running' && 'Running...'}
          {status === 'pending' && `Step ${stepNumber + 1}/8`}
        </p>
      </div>
    </motion.div>
  );
}
