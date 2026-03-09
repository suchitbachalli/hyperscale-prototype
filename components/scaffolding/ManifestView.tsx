'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Zap, Settings } from 'lucide-react';

export default function ManifestView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col items-center justify-center p-8"
    >
      <div className="max-w-md w-full space-y-6">
        {/* Success header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-hs-teal/20 flex items-center justify-center glow-teal-strong">
            <CheckCircle2 className="w-10 h-10 text-hs-teal" />
          </div>
        </motion.div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Scaffolding Complete</h2>
          <p className="text-sm text-hs-muted">All systems provisioned successfully</p>
        </div>

        {/* Stats */}
        <div className="bg-hs-surface2/50 rounded-xl border border-hs-teal/20 p-6 font-mono text-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-hs-muted flex items-center gap-2">
              <Clock className="w-4 h-4" /> Duration
            </span>
            <span className="text-hs-teal font-semibold">18.6 seconds</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-hs-muted flex items-center gap-2">
              <Settings className="w-4 h-4" /> Systems
            </span>
            <span className="text-hs-text">8/8 provisioned</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-hs-muted flex items-center gap-2">
              <Zap className="w-4 h-4" /> Manual Steps
            </span>
            <span className="text-hs-text">0 <span className="text-hs-muted">(previously 112)</span></span>
          </div>
          <div className="border-t border-hs-border pt-3 flex items-center justify-between">
            <span className="text-hs-muted">AWC Score</span>
            <span className="text-hs-teal font-bold text-lg">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-hs-muted">Time saved</span>
            <span className="text-hs-amber font-semibold">~4.5 hours</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
