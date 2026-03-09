'use client';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { liveDataPreview } from '@/data/chat-simulation';

interface DataPreviewProps {
  activeDomain: string | null;
}

function renderValue(val: unknown, depth: number = 0): JSX.Element {
  if (val === null || val === undefined) return <span className="text-hs-muted">null</span>;
  if (typeof val === 'boolean') return <span className="text-hs-amber">{val.toString()}</span>;
  if (typeof val === 'number') return <span className="text-hs-blue">{val}</span>;
  if (typeof val === 'string') return <span className="text-hs-teal">&quot;{val}&quot;</span>;
  if (Array.isArray(val)) {
    return (
      <span>
        <span className="text-hs-muted">[</span>
        {val.map((item, i) => (
          <span key={i}>
            {i > 0 && <span className="text-hs-muted">, </span>}
            {renderValue(item, depth + 1)}
          </span>
        ))}
        <span className="text-hs-muted">]</span>
      </span>
    );
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>);
    return (
      <div className="ml-4">
        <span className="text-hs-muted">{'{'}</span>
        {entries.map(([key, v], i) => (
          <div key={key} className="ml-4">
            <span className="text-hs-rose">&quot;{key}&quot;</span>
            <span className="text-hs-muted">: </span>
            {typeof v === 'object' && v !== null && !Array.isArray(v) ? (
              renderValue(v, depth + 1)
            ) : (
              renderValue(v, depth + 1)
            )}
            {i < entries.length - 1 && <span className="text-hs-muted">,</span>}
          </div>
        ))}
        <span className="text-hs-muted">{'}'}</span>
      </div>
    );
  }
  return <span>{String(val)}</span>;
}

export default function DataPreview({ activeDomain }: DataPreviewProps) {
  // Show relevant section based on active domain
  let previewData: Record<string, unknown> = liveDataPreview;

  const domainDataMap: Record<string, unknown> = {
    'contacts': { contacts: { president: 'Todd Goulette', gm: 'Dawn Sprague', it: 'Dave Gilding', timezone: 'EST' } },
    'erp-connection': liveDataPreview.erp,
    'shipping': { shipping: { chargeAtCheckout: false, shipVias: 11, pickupLocations: ['Barre'], rateIntegration: false } },
    'design': { primaryColors: [{ hex: '#CC0000', name: 'Reynolds Red' }, { hex: '#333333', name: 'Charcoal' }, { hex: '#FFFFFF', name: 'White' }] },
    'whitelisting': { ips: { unilog: ['182.72.168.202', '115.160.247.186'], cimmesb: ['34.66.86.87', '35.193.59.255'], prod: ['34.132.104.253', '34.135.100.59'] }, status: 'confirmed' },
  };

  if (activeDomain && domainDataMap[activeDomain]) {
    previewData = domainDataMap[activeDomain] as Record<string, unknown>;
  }

  return (
    <div className="h-full flex flex-col bg-hs-surface/50 rounded-xl border border-hs-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-hs-border flex items-center gap-2">
        <Database className="w-4 h-4 text-hs-blue" />
        <span className="text-sm font-medium text-hs-text">Live Data Preview</span>
      </div>

      {/* JSON preview */}
      <div className="flex-1 overflow-auto p-4">
        <motion.pre
          key={activeDomain}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[11px] leading-relaxed"
        >
          {renderValue(previewData)}
        </motion.pre>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-hs-border">
        <p className="text-[10px] font-mono text-hs-muted">
          Auto-updating as conversation progresses
        </p>
      </div>
    </div>
  );
}
