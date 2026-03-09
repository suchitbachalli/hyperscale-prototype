'use client';
import { useState, useCallback, useRef } from 'react';

interface UseSimulationOptions {
  steps: number;
  onStepStart?: (step: number) => void;
  onStepComplete?: (step: number) => void;
  onComplete?: () => void;
  baseDelay?: number;
  speedMultiplier?: number;
}

export function useSimulation({
  steps,
  onStepStart,
  onStepComplete,
  onComplete,
  baseDelay = 800,
  speedMultiplier = 1,
}: UseSimulationOptions) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(speedMultiplier);
  speedRef.current = speedMultiplier;

  const runStep = useCallback((stepIndex: number, durations: number[]) => {
    if (stepIndex >= steps) {
      setIsRunning(false);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    setCurrentStep(stepIndex);
    onStepStart?.(stepIndex);

    const duration = (durations[stepIndex] || 2) * 1000 / speedRef.current;

    timeoutRef.current = setTimeout(() => {
      setCompletedSteps(prev => { const next = new Set(Array.from(prev)); next.add(stepIndex); return next; });
      onStepComplete?.(stepIndex);

      timeoutRef.current = setTimeout(() => {
        runStep(stepIndex + 1, durations);
      }, baseDelay / speedRef.current);
    }, duration);
  }, [steps, onStepStart, onStepComplete, onComplete, baseDelay]);

  const start = useCallback((durations: number[]) => {
    setIsRunning(true);
    setCompletedSteps(new Set());
    setIsComplete(false);
    setCurrentStep(0);
    runStep(0, durations);
  }, [runStep]);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setCurrentStep(-1);
    setCompletedSteps(new Set());
    setIsComplete(false);
  }, [stop]);

  const setSpeed = useCallback((multiplier: number) => {
    speedRef.current = multiplier;
  }, []);

  return {
    currentStep,
    isRunning,
    completedSteps,
    isComplete,
    start,
    stop,
    reset,
    setSpeed,
  };
}
