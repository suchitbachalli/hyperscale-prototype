'use client';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, CheckCircle2, Clock, Sparkles, Users } from 'lucide-react';
import { liveDataPreview } from '@/data/chat-simulation';

interface DataPreviewProps {
  activeDomain: string | null;
  viewMode?: 'customer' | 'agent';
}

// Agent view field definitions per domain
interface AgentField {
  name: string;
  value: string;
  source: 'manual' | 'meeting' | 'auto';
  status: 'confirmed' | 'pending';
}

const agentFieldMap: Record<string, AgentField[]> = {
  'contacts': [
    { name: 'President', value: 'Todd Goulette', source: 'manual', status: 'confirmed' },
    { name: 'GM', value: 'Dawn Sprague', source: 'manual', status: 'confirmed' },
    { name: 'IT Admin', value: 'Dave Gilding', source: 'manual', status: 'confirmed' },
    { name: 'Timezone', value: 'EST', source: 'auto', status: 'confirmed' },
    { name: 'Phone', value: '(800)-639-2901', source: 'manual', status: 'confirmed' },
    { name: 'Email', value: 'sales@reynoldsandson.com', source: 'auto', status: 'confirmed' },
    { name: 'Website', value: 'reynoldsandson.com', source: 'auto', status: 'confirmed' },
    { name: 'Address', value: 'South Barre, VT 05670', source: 'manual', status: 'confirmed' },
  ],
  'contract-scope': [
    { name: 'Platform', value: 'CX1 eCommerce', source: 'manual', status: 'confirmed' },
    { name: 'Admin Portal', value: 'CIMM2', source: 'manual', status: 'confirmed' },
    { name: 'Adaptor', value: 'AD Adaptor', source: 'manual', status: 'confirmed' },
    { name: 'Buying Group', value: 'AD', source: 'auto', status: 'confirmed' },
    { name: 'Go-Live Target', value: 'Oct 17, 2025', source: 'manual', status: 'confirmed' },
  ],
  'erp-connection': [
    { name: 'ERP Name', value: 'Prophet 21', source: 'meeting', status: 'confirmed' },
    { name: 'Version', value: '24.2.5512.606', source: 'meeting', status: 'confirmed' },
    { name: 'Hosting', value: 'Cloud (Epicor)', source: 'meeting', status: 'confirmed' },
    { name: 'API Username', value: 'UNILOG1', source: 'meeting', status: 'confirmed' },
    { name: 'Live URL', value: 'reynoldsandson-API...', source: 'meeting', status: 'confirmed' },
    { name: 'Play URL', value: 'reynoldsandson-play-API...', source: 'meeting', status: 'confirmed' },
    { name: 'DB (Live)', value: 'az_108520_live', source: 'meeting', status: 'confirmed' },
    { name: 'DB (Play)', value: 'az_108520_play', source: 'meeting', status: 'confirmed' },
    { name: 'Store Name', value: 'Reynolds and Son, Inc.', source: 'meeting', status: 'confirmed' },
    { name: 'Order Statuses', value: 'BAL, COD, HOLD, NO LIMIT', source: 'meeting', status: 'confirmed' },
    { name: 'Pricing Contracts', value: 'One per customer', source: 'meeting', status: 'confirmed' },
    { name: 'B2B APIs', value: 'Installed', source: 'meeting', status: 'confirmed' },
  ],
  'erp-integration': [
    { name: 'Sync Type', value: 'Real-time + Scheduled', source: 'auto', status: 'confirmed' },
    { name: 'Import Frequency', value: 'Every 15 min', source: 'meeting', status: 'confirmed' },
    { name: 'Inventory Sync', value: 'Enabled', source: 'auto', status: 'confirmed' },
    { name: 'Price Sync', value: 'Contract-based', source: 'meeting', status: 'confirmed' },
    { name: 'Order Push', value: 'Real-time', source: 'auto', status: 'confirmed' },
    { name: 'Error Handling', value: 'Retry + Alert', source: 'auto', status: 'confirmed' },
    { name: 'Webhook URL', value: 'Pending setup', source: 'auto', status: 'pending' },
    { name: 'Rate Limit', value: '100 req/min', source: 'auto', status: 'confirmed' },
  ],
  'shipping': [
    { name: 'Charge at Checkout', value: 'No (free shipping)', source: 'manual', status: 'confirmed' },
    { name: 'Ship Via Codes', value: '11 codes mapped', source: 'meeting', status: 'confirmed' },
    { name: 'Primary Warehouse', value: 'South Barre, VT', source: 'meeting', status: 'confirmed' },
    { name: 'Pickup: Barre', value: 'Active', source: 'meeting', status: 'confirmed' },
    { name: 'Pickup: Colchester', value: 'Inactive', source: 'meeting', status: 'confirmed' },
    { name: 'Pickup: Rutland', value: 'Inactive', source: 'meeting', status: 'confirmed' },
    { name: 'UPS Freight', value: 'Not integrated', source: 'meeting', status: 'confirmed' },
    { name: 'Default Carrier', value: 'UPS Ground', source: 'auto', status: 'confirmed' },
    { name: 'LTL Freight', value: 'Manual quote', source: 'manual', status: 'pending' },
  ],
  'design': [
    { name: 'Primary Color', value: '#CC0000 (Reynolds Red)', source: 'meeting', status: 'confirmed' },
    { name: 'Secondary', value: '#333333 (Charcoal)', source: 'meeting', status: 'confirmed' },
    { name: 'Background', value: '#FFFFFF (White)', source: 'meeting', status: 'confirmed' },
    { name: 'Logo', value: 'Uploaded (SVG)', source: 'meeting', status: 'confirmed' },
    { name: 'Tagline', value: 'Industrial Supply Specialists', source: 'meeting', status: 'confirmed' },
    { name: 'Meta Title', value: 'Reynolds & Son, Inc. — ...', source: 'auto', status: 'confirmed' },
    { name: 'Meta Description', value: 'Reynolds & Son delivers...', source: 'auto', status: 'confirmed' },
    { name: 'Favicon', value: 'Pending upload', source: 'manual', status: 'pending' },
  ],
  'whitelisting': [
    { name: 'Unilog IPs', value: '182.72.168.202, 115.160...', source: 'meeting', status: 'confirmed' },
    { name: 'CIMM ESB IPs', value: '34.66.86.87, 35.193...', source: 'auto', status: 'confirmed' },
    { name: 'Prod IPs', value: '34.132.104.253, 34.135...', source: 'auto', status: 'confirmed' },
    { name: 'Epicor Ticket', value: 'EPC-2025-09-4412', source: 'meeting', status: 'confirmed' },
    { name: 'Status', value: 'All whitelisted', source: 'meeting', status: 'confirmed' },
    { name: 'Verified', value: 'Connectivity test passed', source: 'auto', status: 'confirmed' },
  ],
};

const sourceConfig = {
  manual: { label: 'Manual', color: 'bg-hs-blue/20 text-hs-blue border-hs-blue/30' },
  meeting: { label: 'Meeting', color: 'bg-hs-amber/20 text-hs-amber border-hs-amber/30' },
  auto: { label: 'Auto', color: 'bg-hs-teal/20 text-hs-teal border-hs-teal/30' },
};

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
            {renderValue(v, depth + 1)}
            {i < entries.length - 1 && <span className="text-hs-muted">,</span>}
          </div>
        ))}
        <span className="text-hs-muted">{'}'}</span>
      </div>
    );
  }
  return <span>{String(val)}</span>;
}

export default function DataPreview({ activeDomain, viewMode = 'customer' }: DataPreviewProps) {
  const isAgentView = viewMode === 'agent';

  // Customer view data
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

  // Agent view data
  const fields = (activeDomain && agentFieldMap[activeDomain]) || agentFieldMap['contacts'];
  const confirmedCount = fields.filter(f => f.status === 'confirmed').length;
  const meetingCount = fields.filter(f => f.source === 'meeting').length;

  return (
    <div className="h-full flex flex-col bg-hs-surface/50 rounded-xl border border-hs-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-hs-border flex items-center gap-2">
        {isAgentView ? (
          <>
            <BrainCircuit className="w-4 h-4 text-hs-teal" />
            <span className="text-sm font-medium text-hs-teal">Agent Field Tracker</span>
          </>
        ) : (
          <>
            <Database className="w-4 h-4 text-hs-blue" />
            <span className="text-sm font-medium text-hs-text">Live Data Preview</span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {isAgentView ? (
          <motion.div
            key={`agent-${activeDomain}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2"
          >
            {/* Summary bar */}
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2 bg-hs-surface2 rounded-lg border border-hs-border">
              <CheckCircle2 className="w-3 h-3 text-hs-teal shrink-0" />
              <span className="text-[10px] font-mono text-hs-teal">{confirmedCount}/{fields.length}</span>
              {meetingCount > 0 && (
                <>
                  <span className="text-hs-border">|</span>
                  <Sparkles className="w-3 h-3 text-hs-amber shrink-0" />
                  <span className="text-[10px] font-mono text-hs-amber">{meetingCount} from AI</span>
                </>
              )}
            </div>

            {/* Field rows */}
            <div className="space-y-1">
              {fields.map((field, i) => {
                const src = sourceConfig[field.source];
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] ${
                      field.status === 'confirmed'
                        ? 'bg-hs-teal/5 border border-hs-teal/10'
                        : 'bg-hs-surface2 border border-hs-border'
                    }`}
                  >
                    {field.status === 'confirmed' ? (
                      <CheckCircle2 className="w-3 h-3 text-hs-teal shrink-0" />
                    ) : (
                      <Clock className="w-3 h-3 text-hs-muted shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-hs-muted">{field.name}</span>
                      <p className="text-hs-text truncate">{field.value}</p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono border shrink-0 ${src.color}`}>
                      {src.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="p-4">
            <motion.pre
              key={activeDomain}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[11px] leading-relaxed"
            >
              {renderValue(previewData)}
            </motion.pre>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-hs-border">
        <p className="text-[10px] font-mono text-hs-muted">
          {isAgentView
            ? `${confirmedCount} fields captured · ${meetingCount} from meeting AI`
            : 'Auto-updating as conversation progresses'
          }
        </p>
      </div>
    </div>
  );
}
