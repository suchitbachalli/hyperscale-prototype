'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, Video } from 'lucide-react';
import clsx from 'clsx';

interface CalendarPickerProps {
  onSchedule: (day: string, time: string) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIMES = ['9:30 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

// true = available, false = busy
const AVAILABILITY: Record<string, Record<string, boolean>> = {
  'Mon':  { '9:30 AM': true,  '10:00 AM': false, '11:00 AM': true,  '1:00 PM': true,  '2:00 PM': false, '3:00 PM': true,  '4:00 PM': true  },
  'Tue':  { '9:30 AM': true,  '10:00 AM': true,  '11:00 AM': false, '1:00 PM': true,  '2:00 PM': false, '3:00 PM': true,  '4:00 PM': true  },
  'Wed':  { '9:30 AM': false, '10:00 AM': false, '11:00 AM': true,  '1:00 PM': true,  '2:00 PM': true,  '3:00 PM': false, '4:00 PM': true  },
  'Thu':  { '9:30 AM': true,  '10:00 AM': true,  '11:00 AM': true,  '1:00 PM': true,  '2:00 PM': true,  '3:00 PM': false, '4:00 PM': true  },
  'Fri':  { '9:30 AM': true,  '10:00 AM': true,  '11:00 AM': true,  '1:00 PM': true,  '2:00 PM': true,  '3:00 PM': true,  '4:00 PM': false },
};

export default function CalendarPicker({ onSchedule }: CalendarPickerProps) {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showInviteSent, setShowInviteSent] = useState(false);

  const handleSelect = (day: string, time: string) => {
    if (selectedSlot) return; // already selected
    if (!AVAILABILITY[day]?.[time]) return; // busy slot

    setSelectedSlot({ day, time });
    onSchedule(day, time);

    setTimeout(() => {
      setConfirmed(true);
      setTimeout(() => {
        setShowInviteSent(true);
      }, 1000);
    }, 300);
  };

  return (
    <div className="max-w-[85%] rounded-xl p-4 bg-gradient-to-r from-hs-amber/5 to-hs-teal/5 border border-hs-amber/30">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-hs-amber/20 flex items-center justify-center">
          <Calendar className="w-4 h-4 text-hs-amber" />
        </div>
        <div>
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-hs-teal" />
                <p className="text-sm font-medium text-hs-teal">Scheduled! Zoom meeting confirmed</p>
              </motion.div>
            ) : (
              <motion.p
                key="title"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-hs-text"
              >
                Schedule with Jen Wilburn
              </motion.p>
            )}
          </AnimatePresence>
          <p className="text-[10px] text-hs-muted">Week of Oct 6-10, 2025</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="text-[9px] font-mono text-hs-muted pb-1 pr-1 text-right w-16" />
              {DAYS.map((day) => (
                <th key={day} className="text-[10px] font-mono text-hs-muted pb-1 px-0.5">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((time) => (
              <tr key={time}>
                <td className="text-[9px] font-mono text-hs-muted pr-1 text-right py-0.5 whitespace-nowrap">
                  {time}
                </td>
                {DAYS.map((day) => {
                  const available = AVAILABILITY[day]?.[time] ?? false;
                  const isSelected = selectedSlot?.day === day && selectedSlot?.time === time;

                  return (
                    <td key={`${day}-${time}`} className="px-0.5 py-0.5">
                      <button
                        onClick={() => handleSelect(day, time)}
                        disabled={!available || !!selectedSlot}
                        className={clsx(
                          'w-full rounded text-[9px] py-1 px-0.5 transition-all duration-200 border',
                          isSelected
                            ? 'bg-hs-amber/30 border-hs-amber text-hs-amber shadow-[0_0_8px_rgba(var(--hs-amber-rgb,245,158,11),0.4)]'
                            : available
                              ? 'bg-hs-teal/20 hover:bg-hs-teal/30 border-hs-teal/30 text-hs-teal cursor-pointer'
                              : 'bg-hs-surface2/50 text-hs-muted/50 cursor-not-allowed line-through border-transparent'
                        )}
                      >
                        {isSelected ? (
                          <span className="flex items-center justify-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                          </span>
                        ) : available ? (
                          <Video className="w-3 h-3 mx-auto" />
                        ) : (
                          '--'
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite sent message */}
      <AnimatePresence>
        {showInviteSent && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] text-hs-muted mt-2 text-center"
          >
            Meeting invite sent to Dave
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
