'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Zap, FastForward } from 'lucide-react';
import SystemCard from '@/components/scaffolding/SystemCard';
import TerminalOutput from '@/components/scaffolding/TerminalOutput';
import ManifestView from '@/components/scaffolding/ManifestView';
import GlowButton from '@/components/shared/GlowButton';
import { scaffoldingSteps } from '@/data/scaffolding-steps';

type StepStatus = 'pending' | 'running' | 'complete' | 'error';

export default function ScaffoldingPage() {
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    scaffoldingSteps.map(() => 'pending')
  );
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [allTerminalLines, setAllTerminalLines] = useState<string[]>([]);
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const addTimeout = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
    return t;
  };

  const runSimulation = useCallback(() => {
    clearTimeouts();
    setIsRunning(true);
    setIsComplete(false);
    setStepStatuses(scaffoldingSteps.map(() => 'pending'));
    setAllTerminalLines([]);
    setVisibleLineCount(0);
    setActiveStep(0);

    let totalDelay = 0;
    const allLines: string[] = [];
    scaffoldingSteps.forEach(step => {
      step.terminalLines.forEach(line => allLines.push(line));
    });
    setAllTerminalLines(allLines);

    let globalLineIndex = 0;

    scaffoldingSteps.forEach((step, stepIndex) => {
      const stepDelay = totalDelay;
      const duration = (step.duration * 1000) / speed;
      const lineDelay = duration / step.terminalLines.length;

      // Mark step as running
      addTimeout(() => {
        setStepStatuses(prev => {
          const next = [...prev];
          next[stepIndex] = 'running';
          return next;
        });
        setActiveStep(stepIndex);
      }, stepDelay);

      // Animate terminal lines
      step.terminalLines.forEach((_, lineIdx) => {
        const currentGlobalLine = globalLineIndex;
        addTimeout(() => {
          setVisibleLineCount(currentGlobalLine + 1);
        }, stepDelay + lineIdx * lineDelay);
        globalLineIndex++;
      });

      // Mark step complete
      addTimeout(() => {
        setStepStatuses(prev => {
          const next = [...prev];
          next[stepIndex] = 'complete';
          return next;
        });
      }, stepDelay + duration);

      totalDelay += duration + 800 / speed;
    });

    // All complete
    addTimeout(() => {
      setIsRunning(false);
      setIsComplete(true);
    }, totalDelay + 500 / speed);
  }, [speed]);

  const reset = () => {
    clearTimeouts();
    setIsRunning(false);
    setIsComplete(false);
    setStepStatuses(scaffoldingSteps.map(() => 'pending'));
    setAllTerminalLines([]);
    setVisibleLineCount(0);
    setActiveStep(0);
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col p-6 gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-hs-teal" />
            Project Scaffolding Agent
          </h2>
          <p className="text-sm text-hs-muted mt-1">
            Automated Day Zero provisioning across 8 systems
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Speed toggle */}
          <button
            onClick={() => setSpeed(s => s === 1 ? 10 : 1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              speed === 10
                ? 'bg-hs-amber/10 border-hs-amber/30 text-hs-amber'
                : 'bg-hs-surface2 border-hs-border text-hs-muted hover:text-hs-text'
            }`}
          >
            <FastForward className="w-3 h-3" />
            {speed}x speed
          </button>

          {!isRunning && !isComplete && (
            <GlowButton onClick={runSimulation} icon={Play}>
              Begin Scaffolding
            </GlowButton>
          )}
          {isComplete && (
            <GlowButton onClick={reset} icon={RotateCcw} variant="amber">
              Reset Demo
            </GlowButton>
          )}
          {isRunning && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-hs-amber/10 rounded-lg border border-hs-amber/20">
              <div className="w-2 h-2 rounded-full bg-hs-amber animate-pulse" />
              <span className="text-sm font-mono text-hs-amber">Running...</span>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left panel - Timeline */}
        <div className="w-[340px] shrink-0 bg-hs-surface/50 rounded-xl border border-hs-border p-4 overflow-auto">
          <h3 className="text-xs font-mono text-hs-muted uppercase tracking-wider mb-4">
            Provisioning Timeline
          </h3>
          <div className="space-y-2">
            {scaffoldingSteps.map((step, index) => (
              <SystemCard
                key={step.id}
                system={step.system}
                icon={step.icon}
                duration={step.duration}
                status={stepStatuses[index]}
                stepNumber={index}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>

        {/* Right panel - Terminal or Detail */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="manifest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <ManifestView />
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col gap-4"
              >
                {/* Terminal */}
                <div className="flex-1 min-h-0">
                  <TerminalOutput
                    lines={allTerminalLines}
                    visibleCount={visibleLineCount}
                    title="hyperscale-scaffolding — bash"
                  />
                </div>

                {/* Active step detail */}
                {stepStatuses[activeStep] === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-hs-surface2/50 rounded-xl border border-hs-border p-4"
                  >
                    <h4 className="text-xs font-mono text-hs-teal uppercase tracking-wider mb-3">
                      {scaffoldingSteps[activeStep].system} — Output
                    </h4>
                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      {Object.entries(scaffoldingSteps[activeStep].outputs).map(([key, val]) => (
                        <div key={key} className="flex gap-2">
                          <span className="text-hs-muted shrink-0">{key}:</span>
                          <span className="text-hs-text truncate">
                            {Array.isArray(val) ? val.join(', ') : val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
