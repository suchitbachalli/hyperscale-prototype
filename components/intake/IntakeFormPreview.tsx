'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface IntakeFormPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const tabs = [
  {
    name: 'Welcome',
    fields: [
      { label: 'Company Name', value: 'Reynolds & Son, Inc.' },
      { label: 'Address', value: '47 Bridge Street, South Barre, VT 05670' },
      { label: 'Primary Contact', value: 'Dawn Sprague (dsprague@reynoldsandson.com)' },
      { label: 'Technical Contact', value: 'Dave Gilding (dgilding@reynoldsandson.com)' },
      { label: 'Management Contact', value: 'Todd Goulette (toddgoulette@reynoldsandson.com)' },
      { label: 'IPM', value: 'Jen Wilburn' },
      { label: 'Timezone', value: 'Eastern (EST)' },
    ],
  },
  {
    name: 'ERP - P21',
    fields: [
      { label: 'ERP Name', value: 'Prophet 21' },
      { label: 'Version (Live)', value: '24.2.5512.606' },
      { label: 'Hosting', value: 'Cloud (Epicor)' },
      { label: 'API URL (Live)', value: 'https://reynoldsandson-API.epicordistribution.com/' },
      { label: 'Username', value: 'UNILOG1' },
      { label: 'Store Name', value: 'Reynolds and Son, Inc.' },
      { label: 'DB Name', value: 'az_108520_live' },
      { label: 'Pricing Contracts', value: 'Yes (one per customer)' },
    ],
  },
  {
    name: 'Payment - WorldPay',
    fields: [
      { label: 'Gateway', value: 'WorldPay' },
      { label: 'Transaction Type', value: 'AUTH' },
      { label: 'Cards Accepted', value: 'Mastercard, AMEX, Visa' },
      { label: 'Account ID', value: '1043904' },
      { label: 'Acceptor ID', value: '529000203169' },
    ],
  },
  {
    name: 'Registration',
    fields: [
      { label: 'Newsletter', value: 'Yes' },
      { label: 'Retail Accounts', value: 'No' },
      { label: 'On Account', value: 'Yes' },
      { label: 'Access Option', value: 'Manual review (Option 2)' },
      { label: 'PO Allowed', value: 'Yes' },
      { label: 'Catalog Assignment', value: 'Customer-specific' },
      { label: 'CPN Add', value: 'Yes (with ERP writeback)' },
      { label: 'Credit App Link', value: 'Yes' },
    ],
  },
  {
    name: 'Shipping',
    fields: [
      { label: 'Charge at Checkout', value: 'No' },
      { label: 'Ship Vias', value: '11 loaded (3 pickup, 8 carrier)' },
      { label: 'Active Pickup', value: 'BARRE only' },
      { label: 'Rate Integration', value: 'No' },
    ],
  },
  {
    name: 'Design',
    fields: [
      { label: 'Primary Color 1', value: '#CC0000 (Reynolds Red)' },
      { label: 'Primary Color 2', value: '#333333 (Charcoal)' },
      { label: 'Primary Color 3', value: '#FFFFFF (White)' },
      { label: 'Meta Title', value: 'Reynolds & Son, Inc. – Industrial Supply & Air System Specialists' },
      { label: 'Maintenance Email', value: 'sales@reynoldsandson.com' },
      { label: 'Maintenance Phone', value: '(800)-639-2901' },
    ],
  },
];

export default function IntakeFormPreview({ isOpen, onClose }: IntakeFormPreviewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[85vh] bg-hs-surface rounded-2xl border border-hs-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-hs-border">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-hs-teal" />
                <div>
                  <h2 className="text-lg font-semibold text-white">Intake Form Export Preview</h2>
                  <p className="text-xs text-hs-muted">
                    Conversational data &rarr; Excel format mapping
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-hs-surface2 rounded-lg transition-colors">
                <X className="w-5 h-5 text-hs-muted" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-6">
                {tabs.map((tab, tabIndex) => (
                  <motion.div
                    key={tab.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: tabIndex * 0.1 }}
                  >
                    <h3 className="text-sm font-mono text-hs-teal uppercase tracking-wider mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {tab.name}
                    </h3>
                    <div className="bg-hs-surface2/50 rounded-lg border border-hs-border overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          {tab.fields.map((field, fieldIdx) => (
                            <tr key={field.label} className={fieldIdx % 2 === 0 ? 'bg-transparent' : 'bg-hs-surface2/30'}>
                              <td className="px-4 py-2 text-xs font-mono text-hs-muted w-1/3 border-r border-hs-border">
                                {field.label}
                              </td>
                              <td className="px-4 py-2 text-xs font-mono text-hs-text">
                                {field.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-hs-border bg-hs-surface2/30">
              <p className="text-[10px] font-mono text-hs-muted text-center">
                This data was collected conversationally through the HyperScaleAWC Customer Interface Agent —
                no spreadsheets required. Export generates the standard MASTER_TEMPLATE_2025_DISCOVERY_INTAKE.xlsx format.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
