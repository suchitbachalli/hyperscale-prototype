'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Server, Database, Globe, Shield, Cpu, HardDrive, Network } from 'lucide-react';

interface GCPVisualizationProps {
  activeStep: number;
  completedSteps: number[];
}

const gcpNodes = [
  { id: 'lb', label: 'Load Balancer', icon: Globe, x: 50, y: 8, activateAt: 0 },
  { id: 'web1', label: 'Web Server 1', icon: Server, x: 20, y: 32, activateAt: 0 },
  { id: 'web2', label: 'Web Server 2', icon: Server, x: 50, y: 32, activateAt: 1 },
  { id: 'api', label: 'API Gateway', icon: Network, x: 80, y: 32, activateAt: 2 },
  { id: 'app1', label: 'App Instance', icon: Cpu, x: 15, y: 56, activateAt: 3 },
  { id: 'app2', label: 'App Instance', icon: Cpu, x: 50, y: 56, activateAt: 4 },
  { id: 'worker', label: 'Worker Node', icon: HardDrive, x: 85, y: 56, activateAt: 5 },
  { id: 'db', label: 'Cloud SQL', icon: Database, x: 30, y: 80, activateAt: 6 },
  { id: 'cache', label: 'Redis Cache', icon: Shield, x: 70, y: 80, activateAt: 7 },
];

const connections = [
  { from: 'lb', to: 'web1' },
  { from: 'lb', to: 'web2' },
  { from: 'lb', to: 'api' },
  { from: 'web1', to: 'app1' },
  { from: 'web2', to: 'app2' },
  { from: 'api', to: 'worker' },
  { from: 'app1', to: 'db' },
  { from: 'app2', to: 'db' },
  { from: 'app2', to: 'cache' },
  { from: 'worker', to: 'cache' },
];

function getNodePos(id: string) {
  const node = gcpNodes.find(n => n.id === id);
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
}

export default function GCPVisualization({ activeStep, completedSteps }: GCPVisualizationProps) {
  const maxActivated = Math.max(activeStep, ...completedSteps, -1);

  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Cloud className="w-4 h-4 text-hs-blue" />
        <span className="text-xs font-mono text-hs-muted uppercase tracking-wider">GCP Infrastructure</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-hs-teal animate-pulse" />
          <span className="text-[10px] font-mono text-hs-teal">us-central1</span>
        </div>
      </div>

      <div className="flex-1 relative min-h-[200px]">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {connections.map((conn) => {
            const from = getNodePos(conn.from);
            const to = getNodePos(conn.to);
            const fromNode = gcpNodes.find(n => n.id === conn.from);
            const toNode = gcpNodes.find(n => n.id === conn.to);
            const isActive = fromNode && toNode && maxActivated >= fromNode.activateAt && maxActivated >= toNode.activateAt;

            return (
              <motion.line
                key={`${conn.from}-${conn.to}`}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={isActive ? '#00d4aa' : '#2a2a3e'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive ? 'none' : '4 4'}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: isActive ? 0.6 : 0.2 }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {gcpNodes.map((node) => {
          const isActive = maxActivated >= node.activateAt;
          const isCurrent = activeStep === node.activateAt;
          const Icon = node.icon;

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1 : 0.8,
              }}
              transition={{ duration: 0.4, delay: isActive ? 0.1 : 0 }}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  isCurrent
                    ? 'bg-hs-amber/20 border border-hs-amber/40 shadow-[0_0_12px_rgba(255,159,67,0.3)]'
                    : isActive
                    ? 'bg-hs-teal/20 border border-hs-teal/30 shadow-[0_0_8px_rgba(0,212,170,0.2)]'
                    : 'bg-hs-surface2 border border-hs-border'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isCurrent ? 'text-hs-amber' : isActive ? 'text-hs-teal' : 'text-hs-muted'
                  }`}
                />
              </div>
              <span
                className={`text-[8px] font-mono mt-1 whitespace-nowrap ${
                  isActive ? 'text-hs-text' : 'text-hs-muted/50'
                }`}
              >
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="mt-2 pt-2 border-t border-hs-border flex items-center justify-between">
        <span className="text-[10px] font-mono text-hs-muted">
          {completedSteps.length > 0 ? `${Math.min(completedSteps.length + 1, 9)}/9 nodes active` : 'Waiting...'}
        </span>
        <span className="text-[10px] font-mono text-hs-blue">
          project: reynolds-son-cx1
        </span>
      </div>
    </div>
  );
}
