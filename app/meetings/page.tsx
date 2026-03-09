'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Calendar, Clock, Users, Video, Sparkles, ChevronRight } from 'lucide-react';
import { meetingNotes } from '@/data/meetings-data';
import type { MeetingNote } from '@/data/meetings-data';
import MeetingDetail from '@/components/meetings/MeetingDetail';

const domainColorMap: Record<string, string> = {
  'erp-connection': 'bg-blue-500/20 text-blue-400',
  whitelisting: 'bg-amber-500/20 text-amber-400',
  design: 'bg-rose-500/20 text-rose-400',
  shipping: 'bg-teal-500/20 text-teal-400',
};

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingNote>(meetingNotes[0]);

  const totalFields = meetingNotes.reduce((sum, m) => sum + m.fieldsUpdated, 0);
  const uniqueDomains = new Set(meetingNotes.map((m) => m.domain)).size;

  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col p-6 gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-hs-teal" />
            Meeting Intelligence
          </h2>
          <p className="text-sm text-hs-muted mt-1">
            AI-powered meeting notes — captured, understood, and integrated by your agents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-hs-surface2 border border-hs-border text-hs-muted">
            <Calendar className="w-3 h-3" />
            {meetingNotes.length} meetings
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-hs-surface2 border border-hs-border text-hs-muted">
            <Sparkles className="w-3 h-3" />
            {totalFields} fields captured
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-hs-surface2 border border-hs-border text-hs-muted">
            <BrainCircuit className="w-3 h-3" />
            {uniqueDomains} domains enriched
          </div>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left: Meeting List */}
        <div className="w-[320px] shrink-0 overflow-auto space-y-3">
          {meetingNotes.map((meeting) => {
            const isSelected = selectedMeeting.id === meeting.id;
            const domainColor = domainColorMap[meeting.domain] || 'bg-hs-teal/20 text-hs-teal';

            return (
              <motion.div
                key={meeting.id}
                whileHover={{ x: 2 }}
                onClick={() => setSelectedMeeting(meeting)}
                className={`bg-hs-surface/50 rounded-xl border p-4 cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-hs-teal/40 bg-hs-teal/5'
                    : 'border-hs-border hover:border-hs-teal/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4 text-hs-muted" />
                  <span className="text-sm font-semibold text-white truncate">{meeting.title}</span>
                  {isSelected && <ChevronRight className="w-3 h-3 text-hs-teal ml-auto shrink-0" />}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] text-hs-muted font-mono">{meeting.date}</span>
                  <span className="text-[10px] text-hs-muted font-mono bg-hs-surface2 px-1.5 py-0.5 rounded">
                    {meeting.duration}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${domainColor}`}>
                    {meeting.domainLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* How it works card */}
          <div className="p-4 bg-hs-surface/50 rounded-xl border border-hs-border">
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="w-3.5 h-3.5 text-hs-teal" />
              <span className="text-[11px] font-semibold text-hs-muted uppercase tracking-wide">How it works</span>
            </div>
            <p className="text-[10px] text-hs-muted leading-relaxed">
              Zoom AI captures meeting notes automatically. HyperScaleAWC reads the notes,
              extracts implementation data points, and feeds them back to all agents —
              reducing manual data entry and keeping context across your entire project.
            </p>
          </div>
        </div>

        {/* Right: Meeting Detail */}
        <div className="flex-1 min-w-0 bg-hs-surface/50 rounded-xl border border-hs-border p-6 overflow-auto">
          <MeetingDetail meeting={selectedMeeting} />
        </div>
      </div>
    </div>
  );
}
