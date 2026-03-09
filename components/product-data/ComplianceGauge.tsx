'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ComplianceGaugeProps {
  score: number; // 0-100
  breakdown: { required: number; recommended: number; enhanced: number };
}

export default function ComplianceGauge({ score, breakdown }: ComplianceGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const scoreColor =
    score < 60 ? '#fb7185' : score < 80 ? '#ff9f43' : '#00d4aa';

  useEffect(() => {
    // Animate score from 0 to target
    const duration = 1200;
    const startTime = performance.now();
    const startScore = 0;
    const endScore = score;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(startScore + (endScore - startScore) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [score]);

  const breakdownRows = [
    { label: 'Required', value: breakdown.required, max: 50, color: '#00d4aa' },
    { label: 'Recommended', value: breakdown.recommended, max: 30, color: '#4ea8ff' },
    { label: 'Enhanced', value: breakdown.enhanced, max: 20, color: '#ff9f43' },
  ];

  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4">
      <div className="text-[10px] tracking-widest text-hs-muted mb-3">
        COMPLIANCE SCORE
      </div>

      {/* SVG Gauge */}
      <div className="flex justify-center mb-4">
        <svg width={100} height={100} viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx={50}
            cy={50}
            r={radius}
            fill="none"
            strokeWidth={6}
            className="stroke-hs-border"
          />
          {/* Progress arc */}
          <circle
            cx={50}
            cy={50}
            r={radius}
            fill="none"
            strokeWidth={6}
            stroke={scoreColor}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.33, 1, 0.68, 1)' }}
          />
          {/* Center score text */}
          <text
            x={50}
            y={46}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={scoreColor}
            fontSize={22}
            fontWeight="bold"
            fontFamily="inherit"
          >
            {animatedScore}
          </text>
          <text
            x={50}
            y={62}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-hs-muted"
            fontSize={10}
          >
            / 100
          </text>
        </svg>
      </div>

      {/* Breakdown rows */}
      <div className="space-y-2">
        {breakdownRows.map((row) => {
          const pct = row.max > 0 ? (row.value / row.max) * 100 : 0;
          return (
            <div key={row.label} className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-hs-muted w-24 shrink-0">
                {row.label}: {row.value}/{row.max}
              </span>
              <div className="flex-1 h-1 rounded-full bg-hs-border overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: row.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
