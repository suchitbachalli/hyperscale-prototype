'use client';
import { Bot, Database, FileText, CheckCircle2 } from 'lucide-react';

export default function StatusBar() {
  return (
    <footer className="h-8 bg-hs-surface border-t border-hs-border flex items-center justify-between px-6 text-[11px] font-mono text-hs-muted">
      <div className="flex items-center gap-4">
        <span className="text-hs-teal">⚡ Powered by HyperScaleAWC Engine v1.0</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <Database className="w-3 h-3" />
          <span>8 systems provisioned</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText className="w-3 h-3" />
          <span>29 domains tracked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3" />
          <span>350+ fields collected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>94% intake complete</span>
        </div>
        <div className="border-l border-hs-border pl-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Bot className="w-3 h-3 text-hs-muted" />
            <span>Scaffolding: <span className="text-hs-muted">Idle</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bot className="w-3 h-3 text-hs-teal" />
            <span>Interface: <span className="text-hs-teal">Active</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
