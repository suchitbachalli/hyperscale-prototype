'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Play, MessageSquare, Phone, Video, BrainCircuit, CheckCircle2, Zap, Eye, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { chatThreads, ChatMessage } from '@/data/chat-simulation';
import CalendarPicker from './CalendarPicker';
import MeetingNotesCard from './MeetingNotesCard';

interface ChatWindowProps {
  activeThreadId: string | null;
  isPlaying: boolean;
  viewMode?: 'customer' | 'agent';
  onMessageVisible?: (messageId: string) => void;
}

// Generate agent annotations based on message content
function getAgentAnnotation(msg: ChatMessage): { text: string; icon: 'extract' | 'validate' | 'trigger' | 'source' } {
  if (msg.type === 'call-prompt') {
    return { text: 'Trigger: complexity threshold exceeded → PM escalation', icon: 'trigger' };
  }
  if (msg.type === 'calendar-prompt') {
    return { text: 'Action: calendar availability lookup via MS Graph API', icon: 'trigger' };
  }
  if (msg.type === 'meeting-notes') {
    return { text: 'Source: Zoom AI transcript → field extraction pipeline', icon: 'source' };
  }
  if (msg.sender === 'agent') {
    const content = msg.content.toLowerCase();
    if (content.includes('confirmed') || content.includes('complete') || content.includes('✅')) {
      return { text: '✓ Domain validated — fields locked', icon: 'validate' };
    }
    if (content.includes('need') || content.includes('provide') || content.includes('what')) {
      return { text: 'Requesting data — awaiting customer input', icon: 'extract' };
    }
    if (content.includes('mapped') || content.includes('captured') || content.includes('noted')) {
      const fieldCount = Math.floor(Math.random() * 4) + 2;
      return { text: `✓ ${fieldCount} fields extracted and validated`, icon: 'extract' };
    }
    return { text: '✓ Response generated — context updated', icon: 'validate' };
  }
  // Customer messages
  const words = msg.content.split(/\s+/).length;
  if (words > 20) {
    const fieldCount = Math.floor(Math.random() * 5) + 3;
    return { text: `✓ Parsed — ${fieldCount} data points extracted`, icon: 'extract' };
  }
  return { text: '✓ Response parsed and validated', icon: 'validate' };
}

export default function ChatWindow({ activeThreadId, isPlaying, viewMode = 'customer', onMessageVisible }: ChatWindowProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0];
  const isAgentView = viewMode === 'agent';

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (!isPlaying) {
      setVisibleMessages(activeThread.messages);
      setTypingIndicator(false);
      clearTimeouts();
      return;
    }

    clearTimeouts();
    setVisibleMessages([]);
    setTypingIndicator(false);
    playingRef.current = true;

    let delay = 500;
    activeThread.messages.forEach((msg, idx) => {
      const currentDelay = delay;

      timeoutsRef.current.push(setTimeout(() => {
        if (!playingRef.current) return;
        setTypingIndicator(true);
      }, currentDelay));

      const typingDuration = msg.sender === 'agent' ? 1500 : 800;
      timeoutsRef.current.push(setTimeout(() => {
        if (!playingRef.current) return;
        setTypingIndicator(false);
        setVisibleMessages(prev => [...prev, msg]);
        onMessageVisible?.(msg.id);
      }, currentDelay + typingDuration));

      delay += typingDuration + 1000;
    });

    return () => {
      playingRef.current = false;
      clearTimeouts();
    };
  }, [activeThreadId, isPlaying]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [visibleMessages, typingIndicator]);

  // Annotation badge component for agent view
  const AgentAnnotation = ({ msg }: { msg: ChatMessage }) => {
    if (!isAgentView) return null;
    const annotation = getAgentAnnotation(msg);
    const iconClass = 'w-3 h-3';
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className={clsx(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-mono mt-1',
          annotation.icon === 'extract' && 'bg-hs-teal/10 text-hs-teal border border-hs-teal/20',
          annotation.icon === 'validate' && 'bg-hs-blue/10 text-hs-blue border border-hs-blue/20',
          annotation.icon === 'trigger' && 'bg-hs-amber/10 text-hs-amber border border-hs-amber/20',
          annotation.icon === 'source' && 'bg-hs-rose/10 text-hs-rose border border-hs-rose/20',
        )}
      >
        {annotation.icon === 'extract' && <Sparkles className={iconClass} />}
        {annotation.icon === 'validate' && <CheckCircle2 className={iconClass} />}
        {annotation.icon === 'trigger' && <Zap className={iconClass} />}
        {annotation.icon === 'source' && <Eye className={iconClass} />}
        {annotation.text}
      </motion.div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-hs-surface/50 rounded-xl border border-hs-border overflow-hidden">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-hs-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-hs-teal" />
          <span className="text-sm font-medium text-hs-text">{activeThread.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {isAgentView ? (
            <>
              <BrainCircuit className="w-3.5 h-3.5 text-hs-teal" />
              <span className="text-[10px] font-mono text-hs-teal">Agent Analysis</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-hs-teal animate-pulse" />
              <span className="text-[10px] font-mono text-hs-muted">Thread Active</span>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
        <AnimatePresence>
          {visibleMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={clsx(
                'flex gap-3',
                msg.sender === 'customer' && !isAgentView && 'flex-row-reverse'
              )}
            >
              {msg.type === 'call-prompt' ? (
                <div className="w-full">
                  <div className="max-w-[85%] rounded-xl p-4 bg-gradient-to-r from-hs-teal/5 to-hs-blue/5 border border-hs-teal/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-hs-amber/20 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-hs-amber" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-hs-text">{msg.content}</p>
                        <p className="text-[10px] text-hs-muted">Jen Wilburn — Implementation Project Manager</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-hs-teal/20 hover:bg-hs-teal/30 border border-hs-teal/30 rounded-lg text-xs font-medium text-hs-teal transition-colors">
                        <Video className="w-3.5 h-3.5" />
                        Join Zoom Call
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-hs-blue/20 hover:bg-hs-blue/30 border border-hs-blue/30 rounded-lg text-xs font-medium text-hs-blue transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Join Teams Call
                      </button>
                    </div>
                    <p className="text-[9px] text-hs-muted mt-2 text-center">jennifer.wilburn@unilogcorp.com | ext. 2847</p>
                  </div>
                  <AgentAnnotation msg={msg} />
                </div>
              ) : msg.type === 'calendar-prompt' ? (
                <div className="max-w-[85%]">
                  <CalendarPicker onSchedule={() => {}} />
                  <AgentAnnotation msg={msg} />
                </div>
              ) : msg.type === 'meeting-notes' && msg.meetingData ? (
                <div>
                  <MeetingNotesCard
                    title={msg.meetingData.title}
                    date={msg.meetingData.date}
                    duration={msg.meetingData.duration}
                    participants={msg.meetingData.participants}
                    bullets={msg.meetingData.bullets}
                  />
                  <AgentAnnotation msg={msg} />
                </div>
              ) : (
                <div className={clsx('flex gap-3 w-full', msg.sender === 'customer' && !isAgentView && 'flex-row-reverse')}>
                  {/* Avatar */}
                  <div className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    msg.sender === 'agent' ? 'bg-hs-teal/20' : 'bg-hs-blue/20',
                  )}>
                    {msg.sender === 'agent' ? (
                      <Bot className="w-4 h-4 text-hs-teal" />
                    ) : (
                      <User className="w-4 h-4 text-hs-blue" />
                    )}
                  </div>

                  {/* Message bubble + annotation */}
                  <div className="flex flex-col max-w-[80%]">
                    <div className={clsx(
                      'rounded-xl px-4 py-3',
                      msg.sender === 'agent'
                        ? 'bg-hs-surface2 border border-hs-border'
                        : 'bg-hs-blue/10 border border-hs-blue/20',
                    )}>
                      {msg.senderName && (
                        <p className="text-[10px] font-mono text-hs-blue mb-1">{msg.senderName}</p>
                      )}
                      {msg.sender === 'agent' && (
                        <p className="text-[10px] font-mono text-hs-teal mb-1">HyperScaleAWC Agent</p>
                      )}
                      {msg.timestamp && (
                        <p className="text-[10px] font-mono text-hs-amber mb-1 italic">&#x23F0; {msg.timestamp}</p>
                      )}
                      <div className="text-sm text-hs-text whitespace-pre-line leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                    <AgentAnnotation msg={msg} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typingIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-hs-teal/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-hs-teal" />
            </div>
            <div className="bg-hs-surface2 border border-hs-border rounded-xl px-4 py-3">
              <div className="typing-dots flex gap-1">
                <span className="w-2 h-2 rounded-full bg-hs-teal/60">&middot;</span>
                <span className="w-2 h-2 rounded-full bg-hs-teal/60">&middot;</span>
                <span className="w-2 h-2 rounded-full bg-hs-teal/60">&middot;</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t border-hs-border">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-hs-surface2 rounded-lg border border-hs-border text-hs-muted text-sm">
          <MessageSquare className="w-4 h-4" />
          <span className="italic">Auto-updating as conversation progresses</span>
        </div>
      </div>
    </div>
  );
}
