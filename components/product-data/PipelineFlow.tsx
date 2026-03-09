'use client';

import { motion } from 'framer-motion';
import {
  Download,
  Sparkles,
  ShieldCheck,
  Rocket,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import type { PipelineStage } from '@/data/product-data';

// ── Prop Types ─────────────────────────────────────────────

interface PipelineFlowProps {
  stages: PipelineStage[];
  currentStage: string | null;
  stageProgress: Record<string, { done: number; total: number }>;
  currentItem: {
    partNumber: string;
    name: string;
    brand: string;
    categoryPath: string;
    action: string;
  } | null;
  isComplete: boolean;
}

// ── Color Maps ─────────────────────────────────────────────

const colorMap: Record<
  string,
  {
    bgMuted: string;
    bgActive: string;
    text: string;
    border: string;
    fill: string;
    stroke: string;
    glow: string;
  }
> = {
  blue: {
    bgMuted: 'bg-hs-blue/10',
    bgActive: 'bg-hs-blue/20',
    text: 'text-hs-blue',
    border: 'border-hs-blue',
    fill: 'bg-hs-blue',
    stroke: 'stroke-hs-blue',
    glow: 'shadow-[0_0_12px_rgba(78,168,255,0.4)]',
  },
  amber: {
    bgMuted: 'bg-hs-amber/10',
    bgActive: 'bg-hs-amber/20',
    text: 'text-hs-amber',
    border: 'border-hs-amber',
    fill: 'bg-hs-amber',
    stroke: 'stroke-hs-amber',
    glow: 'shadow-[0_0_12px_rgba(255,159,67,0.4)]',
  },
  teal: {
    bgMuted: 'bg-hs-teal/10',
    bgActive: 'bg-hs-teal/20',
    text: 'text-hs-teal',
    border: 'border-hs-teal',
    fill: 'bg-hs-teal',
    stroke: 'stroke-hs-teal',
    glow: 'shadow-[0_0_12px_rgba(0,212,170,0.4)]',
  },
  rose: {
    bgMuted: 'bg-hs-rose/10',
    bgActive: 'bg-hs-rose/20',
    text: 'text-hs-rose',
    border: 'border-hs-rose',
    fill: 'bg-hs-rose',
    stroke: 'stroke-hs-rose',
    glow: 'shadow-[0_0_12px_rgba(251,113,133,0.4)]',
  },
};

// ── Icon Map ───────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  import: Download,
  enrich: Sparkles,
  validate: ShieldCheck,
  publish: Rocket,
};

// ── SVG Stroke Color Map (inline hex values for SVG) ──────

const svgStrokeMap: Record<string, string> = {
  blue: '#4ea8ff',
  amber: '#ff9f43',
  teal: '#00d4aa',
  rose: '#fb7185',
};

// ── Helpers ────────────────────────────────────────────────

function getStageState(
  stage: PipelineStage,
  currentStage: string | null,
  stageProgress: Record<string, { done: number; total: number }>,
  isComplete: boolean,
): 'pending' | 'active' | 'complete' {
  const progress = stageProgress[stage.id];
  if (isComplete || (progress && progress.done === progress.total && progress.total > 0)) {
    return 'complete';
  }
  if (currentStage === stage.id) {
    return 'active';
  }
  return 'pending';
}

// ── Connecting Arrow ───────────────────────────────────────

function ConnectingArrow({
  isActive,
  isComplete,
  color,
}: {
  isActive: boolean;
  isComplete: boolean;
  color: string;
}) {
  const strokeColor = isComplete ? (svgStrokeMap[color] || '#2a2a3e') : '#2a2a3e';

  return (
    <div className="flex items-center flex-shrink-0 mx-1">
      <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
        {isActive ? (
          <line
            x1="0"
            y1="8"
            x2="40"
            y2="8"
            stroke={svgStrokeMap[color] || '#2a2a3e'}
            strokeWidth="2"
            strokeDasharray="6 4"
            style={{
              animation: 'flowRight 0.6s linear infinite',
            }}
          />
        ) : (
          <line
            x1="0"
            y1="8"
            x2="40"
            y2="8"
            stroke={strokeColor}
            strokeWidth="2"
          />
        )}
        {/* Arrowhead */}
        <polygon
          points="38,4 46,8 38,12"
          fill={isComplete ? (svgStrokeMap[color] || '#2a2a3e') : '#2a2a3e'}
        />
      </svg>
    </div>
  );
}

// ── Stage Card ─────────────────────────────────────────────

function StageCard({
  stage,
  state,
  progress,
}: {
  stage: PipelineStage;
  state: 'pending' | 'active' | 'complete';
  progress: { done: number; total: number };
}) {
  const colors = colorMap[stage.color] || colorMap.blue;
  const Icon = iconMap[stage.id] || Download;
  const ratio = progress.total > 0 ? (progress.done / progress.total) * 100 : 0;

  const isPending = state === 'pending';
  const isActive = state === 'active';
  const isComplete = state === 'complete';

  // Icon container classes
  const iconContainerClasses = isPending
    ? 'bg-hs-surface2 border border-hs-border'
    : isActive
      ? `${colors.bgActive} border ${colors.border} ${colors.glow}`
      : `${colors.bgMuted} border ${colors.border}`;

  // Icon classes
  const iconClasses = isPending
    ? 'text-hs-muted'
    : colors.text;

  // Name classes
  const nameClasses = isPending
    ? 'text-hs-muted'
    : `${colors.text} font-semibold`;

  // Progress bar background
  const barBg = isPending ? 'bg-hs-border' : isComplete ? colors.fill : colors.fill;
  const barTrack = 'bg-hs-surface2';

  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 min-w-[90px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${iconContainerClasses}`}
      >
        {isComplete && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-hs-teal flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-hs-bg" />
          </div>
        )}
        {isActive ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon className={`w-5 h-5 ${iconClasses}`} />
          </motion.div>
        ) : (
          <Icon className={`w-5 h-5 ${iconClasses}`} />
        )}
      </div>

      {/* Name */}
      <span className={`text-xs ${nameClasses}`}>{stage.name}</span>

      {/* Description */}
      <span className="text-[10px] text-hs-muted text-center leading-tight">
        {stage.description}
      </span>

      {/* Progress Bar */}
      <div className={`w-full h-1.5 rounded-full ${barTrack} overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${isPending ? 'bg-hs-border' : barBg}`}
          initial={{ width: 0 }}
          animate={{ width: `${ratio}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Count */}
      <span className="text-[10px] font-mono text-hs-muted">
        {progress.done}/{progress.total}
      </span>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────

export default function PipelineFlow({
  stages,
  currentStage,
  stageProgress,
  currentItem,
  isComplete,
}: PipelineFlowProps) {
  // Resolve current stage color for the current item display
  const activeStage = stages.find((s) => s.id === currentStage);
  const activeColors = activeStage ? colorMap[activeStage.color] || colorMap.blue : colorMap.blue;

  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4">
      {/* Inline keyframes for the flow animation */}
      <style>{`
        @keyframes flowRight {
          from { stroke-dashoffset: 10; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* ── Top section: Pipeline stages ── */}
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => {
          const state = getStageState(stage, currentStage, stageProgress, isComplete);
          const progress = stageProgress[stage.id] || { done: 0, total: 0 };

          // Determine connector state (between this stage and the next)
          const showConnector = index < stages.length - 1;
          const nextStage = stages[index + 1];
          const nextState = nextStage
            ? getStageState(nextStage, currentStage, stageProgress, isComplete)
            : 'pending';

          // The connector is "complete" if the current (left) stage is complete
          const connectorComplete = state === 'complete';
          // The connector is "active" if the current stage is complete and the next is active
          const connectorActive =
            state === 'complete' && nextState === 'active';

          return (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex-1 flex justify-center">
                <StageCard stage={stage} state={state} progress={progress} />
              </div>
              {showConnector && (
                <ConnectingArrow
                  isActive={connectorActive}
                  isComplete={connectorComplete}
                  color={stage.color}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Bottom section: Current Item / Completion ── */}
      {isComplete ? (
        <motion.div
          className="bg-hs-surface2/50 rounded-lg border border-hs-border p-3 mt-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-10 h-10 rounded-lg bg-hs-teal/10 border border-hs-teal flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-hs-teal" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-hs-teal">
              Pipeline Complete
            </span>
            <span className="text-sm text-hs-text">
              {stages.length > 0 && stageProgress[stages[stages.length - 1].id]
                ? `${stageProgress[stages[stages.length - 1].id].total}/${stageProgress[stages[stages.length - 1].id].total}`
                : '24/24'}{' '}
              items published to workspace
            </span>
          </div>
        </motion.div>
      ) : currentItem ? (
        <motion.div
          className="bg-hs-surface2/50 rounded-lg border border-hs-border p-3 mt-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={currentItem.partNumber}
        >
          {/* Spinning loader in the current stage color */}
          <div className="flex-shrink-0">
            <Loader2 className={`w-5 h-5 animate-spin ${activeColors.text}`} />
          </div>

          {/* Item details */}
          <div className="flex-1 min-w-0">
            <span className="text-xs font-mono text-hs-blue">
              {currentItem.partNumber}
            </span>
            <p className="text-sm text-hs-text truncate">{currentItem.name}</p>
            <p className="text-[10px] text-hs-muted truncate">
              {currentItem.brand} &middot; {currentItem.categoryPath}
            </p>
          </div>

          {/* Current action */}
          <div className="flex-shrink-0">
            <span className={`text-xs ${activeColors.text}`}>
              {currentItem.action}
            </span>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
