'use client';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, FileSpreadsheet, MessageSquare, Eye, Bot, Pause } from 'lucide-react';
import DomainProgress from '@/components/intake/DomainProgress';
import ChatWindow from '@/components/intake/ChatWindow';
import DataPreview from '@/components/intake/DataPreview';
import IntakeFormPreview from '@/components/intake/IntakeFormPreview';
import GlowButton from '@/components/shared/GlowButton';
import { chatThreads } from '@/data/chat-simulation';

// Map domain IDs to thread IDs
const domainToThread: Record<string, string> = {
  'contacts': 'thread-contacts',
  'contract-scope': 'thread-contract-scope',
  'add-on-products': 'thread-add-on-products',
  'whitelisting': 'thread-whitelisting',
  'recaptcha-maps': 'thread-recaptcha-maps',
  'smtp': 'thread-smtp',
  'ssl': 'thread-ssl',
  'erp-connection': 'thread-erp',
  'erp-integration': 'thread-erp-integration',
  'api-endpoints': 'thread-api-endpoints',
  'payment-gateway': 'thread-payment-gateway',
  'tax': 'thread-tax',
  'shipping': 'thread-shipping',
  'registration': 'thread-registration',
  'items-uom': 'thread-items-uom',
  'pricing': 'thread-pricing',
  'availability': 'thread-availability',
  'my-account': 'thread-my-account',
  'checkout-logged': 'thread-checkout-logged',
  'checkout-guest': 'thread-checkout-guest',
  'qa-testing': 'thread-qa-testing',
  'warehouses': 'thread-warehouses',
  'social-media': 'thread-social-media',
  'blog-chat': 'thread-blog-chat',
  'data-content': 'thread-data-content',
  'design': 'thread-design',
  'features': 'thread-features',
  'redirects': 'thread-redirects',
  'termly': 'thread-termly',
};

export default function IntakePage() {
  const [activeDomain, setActiveDomain] = useState<string>('contacts');
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-contacts');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFormPreview, setShowFormPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'customer' | 'agent'>('customer');

  const handleSelectDomain = useCallback((domainId: string) => {
    setActiveDomain(domainId);
    const threadId = domainToThread[domainId];
    if (threadId) {
      setActiveThreadId(threadId);
      setIsPlaying(false);
    }
  }, []);

  const handlePlayAll = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="h-[calc(100vh-5.5rem)] flex flex-col p-6 gap-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-hs-blue" />
              Customer Interface Agent
            </h2>
            <p className="text-sm text-hs-muted mt-1">
              Conversational intake — 350+ fields across 29 domains
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="flex items-center bg-hs-surface2 rounded-lg border border-hs-border overflow-hidden">
              <button
                onClick={() => setViewMode('customer')}
                className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                  viewMode === 'customer'
                    ? 'bg-hs-blue/20 text-hs-blue'
                    : 'text-hs-muted hover:text-hs-text'
                }`}
              >
                <Eye className="w-3 h-3 inline mr-1" />
                Customer View
              </button>
              <button
                onClick={() => setViewMode('agent')}
                className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                  viewMode === 'agent'
                    ? 'bg-hs-teal/20 text-hs-teal'
                    : 'text-hs-muted hover:text-hs-text'
                }`}
              >
                <Bot className="w-3 h-3 inline mr-1" />
                Agent View
              </button>
            </div>

            <GlowButton
              onClick={handlePlayAll}
              icon={isPlaying ? Pause : Play}
              variant="blue"
              size="sm"
            >
              {isPlaying ? 'Pause' : 'Play All'}
            </GlowButton>
            <GlowButton
              onClick={() => setShowFormPreview(true)}
              icon={FileSpreadsheet}
              variant="teal"
              size="sm"
            >
              Generate Intake Form
            </GlowButton>
          </div>
        </div>

        {/* Three-panel layout */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Left - Domain Progress */}
          <div className="w-[280px] shrink-0">
            <DomainProgress
              activeDomain={activeDomain}
              onSelectDomain={handleSelectDomain}
            />
          </div>

          {/* Center - Chat */}
          <div className="flex-1 min-w-0">
            <ChatWindow
              activeThreadId={activeThreadId}
              isPlaying={isPlaying}
              viewMode={viewMode}
            />
          </div>

          {/* Right - Data Preview */}
          <div className="w-[280px] shrink-0">
            <DataPreview activeDomain={activeDomain} viewMode={viewMode} />
          </div>
        </div>
      </div>

      {/* Intake Form Preview Modal */}
      <IntakeFormPreview
        isOpen={showFormPreview}
        onClose={() => setShowFormPreview(false)}
      />
    </>
  );
}
