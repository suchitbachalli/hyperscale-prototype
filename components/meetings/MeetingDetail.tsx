'use client';
import { motion } from 'framer-motion';
import { Clock, Users, Tag, BrainCircuit, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { MeetingNote } from '@/data/meetings-data';

interface MeetingDetailProps {
  meeting: MeetingNote;
}

const domainColorMap: Record<string, string> = {
  'erp-connection': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  whitelisting: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  design: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  shipping: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const domainColor = domainColorMap[meeting.domain] || 'bg-hs-teal/20 text-hs-teal border-hs-teal/30';

  return (
    <div className="h-full overflow-auto space-y-4">
      {/* Header section */}
      <div>
        <h3 className="text-lg font-bold text-white">{meeting.title}</h3>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-hs-muted font-mono bg-hs-surface2 px-2 py-1 rounded-md">
            <Clock className="w-3 h-3" />
            {meeting.date}
          </span>
          <span className="flex items-center gap-1 text-xs text-hs-muted font-mono bg-hs-surface2 px-2 py-1 rounded-md">
            <Clock className="w-3 h-3" />
            {meeting.duration}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${domainColor}`}>
            {meeting.domainLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-hs-muted">
          <Users className="w-3.5 h-3.5" />
          <span>{meeting.participants.join(', ')}</span>
        </div>
      </div>

      {/* Summary section */}
      <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-white">AI Meeting Summary</h4>
          </div>
          <span className="text-[10px] text-hs-muted bg-hs-surface2 px-2 py-0.5 rounded-full">
            Powered by Zoom AI
          </span>
        </div>
        <ul className="space-y-2">
          {meeting.summary.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-hs-teal shrink-0 mt-0.5" />
              <span className="text-sm text-hs-text">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Extracted Data section */}
      <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-blue-400" />
          <h4 className="text-sm font-semibold text-white">Extracted Data Points</h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(meeting.extractedData).map(([key, value]) => (
            <div key={key} className="bg-hs-surface2/50 rounded-lg p-2">
              <div className="text-[10px] text-hs-muted uppercase tracking-wide">{key}</div>
              <div className="text-xs text-hs-text font-mono mt-0.5">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Context section */}
      <div className="bg-gradient-to-r from-hs-teal/5 to-hs-blue/5 rounded-xl border border-hs-teal/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <BrainCircuit className="w-4 h-4 text-hs-teal" />
          <h4 className="text-sm font-semibold text-white">Agent Context</h4>
        </div>
        <p className="text-sm text-hs-text">{meeting.agentContext}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] font-semibold text-hs-teal bg-hs-teal/10 border border-hs-teal/20 px-2 py-1 rounded-full">
            {meeting.fieldsUpdated} fields auto-populated
          </span>
        </div>
        <p className="text-[11px] text-hs-muted mt-2 flex items-center gap-1">
          <ArrowRight className="w-3 h-3" />
          This intelligence feeds back into all agent interactions across the implementation.
        </p>
      </div>
    </div>
  );
}
