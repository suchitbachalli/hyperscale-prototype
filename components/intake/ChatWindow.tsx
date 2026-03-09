'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Play, MessageSquare } from 'lucide-react';
import clsx from 'clsx';
import { chatThreads, ChatMessage } from '@/data/chat-simulation';

interface ChatWindowProps {
  activeThreadId: string | null;
  isPlaying: boolean;
  onMessageVisible?: (messageId: string) => void;
}

export default function ChatWindow({ activeThreadId, isPlaying, onMessageVisible }: ChatWindowProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0];

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (!isPlaying) {
      // Show all messages immediately
      setVisibleMessages(activeThread.messages);
      setTypingIndicator(false);
      clearTimeouts();
      return;
    }

    // Animate messages in sequence
    clearTimeouts();
    setVisibleMessages([]);
    setTypingIndicator(false);
    playingRef.current = true;

    let delay = 500;
    activeThread.messages.forEach((msg, idx) => {
      const currentDelay = delay;

      // Show typing indicator
      timeoutsRef.current.push(setTimeout(() => {
        if (!playingRef.current) return;
        setTypingIndicator(true);
      }, currentDelay));

      // Show message
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

  return (
    <div className="h-full flex flex-col bg-hs-surface/50 rounded-xl border border-hs-border overflow-hidden">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-hs-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-hs-teal" />
          <span className="text-sm font-medium text-hs-text">{activeThread.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-hs-teal animate-pulse" />
          <span className="text-[10px] font-mono text-hs-muted">Thread Active</span>
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
                msg.sender === 'customer' && 'flex-row-reverse'
              )}
            >
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

              {/* Message bubble */}
              <div className={clsx(
                'max-w-[80%] rounded-xl px-4 py-3',
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

      {/* Input area (disabled - demo) */}
      <div className="px-4 py-3 border-t border-hs-border">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-hs-surface2 rounded-lg border border-hs-border text-hs-muted text-sm">
          <MessageSquare className="w-4 h-4" />
          <span className="italic">Demo mode — conversations are pre-scripted</span>
        </div>
      </div>
    </div>
  );
}
