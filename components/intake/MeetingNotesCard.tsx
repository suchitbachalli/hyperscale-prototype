'use client';

import { BrainCircuit, CheckCircle2, Sparkles } from 'lucide-react';

interface MeetingNotesCardProps {
  title: string;
  date: string;
  duration: string;
  participants: string;
  bullets: string[];
}

export default function MeetingNotesCard({ title, date, duration, participants, bullets }: MeetingNotesCardProps) {
  return (
    <div className="max-w-[85%] rounded-xl p-4 bg-gradient-to-r from-hs-blue/5 to-hs-teal/5 border border-hs-blue/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-hs-blue/20 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-hs-blue" />
          </div>
          <p className="text-sm font-medium text-hs-text">AI Meeting Notes</p>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-hs-blue/10 border border-hs-blue/20 text-hs-blue">
          Zoom AI
        </span>
      </div>

      {/* Meeting Info */}
      <div className="mb-3">
        <p className="text-sm font-semibold text-hs-text">{title}</p>
        <p className="text-[10px] text-hs-muted mt-0.5">
          {date} &middot; {duration} &middot; {participants}
        </p>
      </div>

      {/* Bullet Points */}
      <ul className="space-y-1.5 mb-3">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-hs-teal shrink-0 mt-0.5" />
            <span className="text-xs text-hs-text">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-hs-border/50">
        <span className="flex items-center gap-1 text-[9px] text-hs-muted">
          <Sparkles className="w-3 h-3 text-hs-amber" />
          Captured by Zoom AI + HyperScaleAWC
        </span>
        <span className="text-[9px] font-medium text-hs-teal">
          {bullets.length > 0 && bullets[bullets.length - 1].match(/(\d+)\s+fields?\s+auto-populated/)?.[0]}
        </span>
      </div>
    </div>
  );
}
