'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Database, Zap, Loader2, RotateCcw, FastForward } from 'lucide-react';
import {
  productItems,
  taxonomyCategories,
  pipelineStages,
  catalogInfo,
  generateTerminalLines,
} from '@/data/product-data';
import type { ActivityLogEntry } from '@/data/product-data';
import CatalogCard from '@/components/product-data/CatalogCard';
import TaxonomyTree from '@/components/product-data/TaxonomyTree';
import PipelineFlow from '@/components/product-data/PipelineFlow';
import ComplianceGauge from '@/components/product-data/ComplianceGauge';
import RiskDistribution from '@/components/product-data/RiskDistribution';
import FieldCompleteness from '@/components/product-data/FieldCompleteness';
import ActivityLog from '@/components/product-data/ActivityLog';
import TerminalOutput from '@/components/scaffolding/TerminalOutput';
import GlowButton from '@/components/shared/GlowButton';

export default function ProductDataPage() {
  // ── Core simulation state ──────────────────────────────────
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState<1 | 10>(1);
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [currentStage, setCurrentStage] = useState<string | null>(null);

  // ── Stage progress ─────────────────────────────────────────
  const [stageProgress, setStageProgress] = useState<Record<string, { done: number; total: number }>>({
    import: { done: 0, total: 24 },
    enrich: { done: 0, total: 24 },
    validate: { done: 0, total: 24 },
    publish: { done: 0, total: 24 },
  });

  // ── Taxonomy tree state ────────────────────────────────────
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['root']));
  const [importedCategoryIds, setImportedCategoryIds] = useState<Set<string>>(new Set());
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // ── Compliance gauge state ─────────────────────────────────
  const [overallScore, setOverallScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ required: 0, recommended: 0, enhanced: 0 });

  // ── Risk distribution state ────────────────────────────────
  const [riskCounts, setRiskCounts] = useState({ high: 0, medium: 0, low: 0 });

  // ── Field completeness state ───────────────────────────────
  const [fieldMetrics, setFieldMetrics] = useState<{ label: string; value: number; total: number }[]>([
    { label: 'Descriptions', value: 0, total: 24 },
    { label: 'Images', value: 0, total: 24 },
    { label: 'Brand/Mfr', value: 0, total: 24 },
    { label: 'GTINs/UPCs', value: 0, total: 24 },
    { label: 'Specifications', value: 0, total: 24 },
    { label: 'Keywords', value: 0, total: 24 },
    { label: 'FAQ Schema', value: 0, total: 24 },
    { label: 'Weight/UOM', value: 0, total: 24 },
  ]);

  // ── Activity log state ─────────────────────────────────────
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);

  // ── Terminal output state ──────────────────────────────────
  const [visibleLineCount, setVisibleLineCount] = useState(0);

  // ── Current item info for PipelineFlow ─────────────────────
  const [currentItemInfo, setCurrentItemInfo] = useState<{
    partNumber: string;
    name: string;
    brand: string;
    categoryPath: string;
    action: string;
  } | null>(null);

  // ── Refs ───────────────────────────────────────────────────
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // ── Pre-generated terminal lines ───────────────────────────
  const allTerminalLines = useMemo(() => generateTerminalLines(productItems), []);

  // ── Timeout helpers ────────────────────────────────────────
  const clearTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const addTimeout = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay / speed);
    timeoutsRef.current.push(t);
    return t;
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  // ── Begin Population (simulation engine) ───────────────────
  const beginPopulation = useCallback(() => {
    clearTimeouts();
    setIsRunning(true);
    setIsComplete(false);
    setVisibleLineCount(0);
    setCurrentItemIndex(-1);
    setCurrentStage(null);
    setActivityLog([]);
    setCurrentItemInfo(null);

    let cumulativeDelay = 0;

    // ─── Phase 0: Header lines (first 9 lines of terminal output) ───
    for (let i = 0; i < 9; i++) {
      const lineIdx = i;
      cumulativeDelay += 80;
      addTimeout(() => {
        setVisibleLineCount(lineIdx + 1);
      }, cumulativeDelay);
    }

    // ─── Phase 1: Import ────────────────────────────────────────────
    cumulativeDelay += 200;
    addTimeout(() => {
      setCurrentStage('import');
    }, cumulativeDelay);

    for (let i = 0; i < productItems.length; i++) {
      const item = productItems[i];
      const baseLineIndex = 9 + i * 4;

      cumulativeDelay += 200;
      addTimeout(() => {
        setCurrentItemIndex(i);
        setCurrentStage('import');
        setActiveCategoryId(item.categoryId);
        setCurrentItemInfo({
          partNumber: item.partNumber,
          name: item.name,
          brand: item.brand,
          categoryPath: item.categoryPath,
          action: 'Importing from PIM...',
        });
        setVisibleLineCount(baseLineIndex + 1);
        setActivityLog((prev) => [
          ...prev,
          { id: `imp-${i}`, action: 'Imported', partNumber: item.partNumber, type: 'import' },
        ]);
      }, cumulativeDelay);

      cumulativeDelay += 100;
      addTimeout(() => {
        setVisibleLineCount(baseLineIndex + 4);
        setStageProgress((prev) => ({
          ...prev,
          import: { ...prev.import, done: i + 1 },
        }));
        const cat = item.categoryId;
        setImportedCategoryIds((prev) => {
          const n = new Set(Array.from(prev));
          n.add(cat);
          return n;
        });
        const category = taxonomyCategories.find((c) => c.id === cat);
        if (category) {
          setExpandedCategories((prev) => {
            const n = new Set(Array.from(prev));
            n.add(cat);
            let current: typeof category | undefined = category;
            while (current?.parentId) {
              n.add(current.parentId);
              current = taxonomyCategories.find((c) => c.id === current!.parentId);
            }
            return n;
          });
        }
      }, cumulativeDelay);
    }

    // ─── Phase 2: Enrich ────────────────────────────────────────────
    // After import: 9 header lines + 24*4 import lines = 105 lines consumed
    // Then 3 separator/header lines for enrich phase
    cumulativeDelay += 300;
    const enrichSeparatorStart = 9 + productItems.length * 4;
    addTimeout(() => {
      setCurrentStage('enrich');
      setVisibleLineCount(enrichSeparatorStart + 3);
    }, cumulativeDelay);

    let enrichLineOffset = enrichSeparatorStart + 3;
    for (let i = 0; i < productItems.length; i++) {
      const item = productItems[i];
      // Each enriched item has: 1 enriching line + optional AI lines + 1 done line
      const linesForItem = 1 + (item.enrichments.length > 1 ? 1 : 0) + (item.enrichments.length > 2 ? 1 : 0) + 1;

      cumulativeDelay += 350;
      const currentEnrichOffset = enrichLineOffset;
      addTimeout(() => {
        setCurrentItemIndex(i);
        setCurrentItemInfo({
          partNumber: item.partNumber,
          name: item.name,
          brand: item.brand,
          categoryPath: item.categoryPath,
          action: item.enrichments[0] + '...',
        });
        setVisibleLineCount(currentEnrichOffset + linesForItem);
        setStageProgress((prev) => ({
          ...prev,
          enrich: { ...prev.enrich, done: i + 1 },
        }));
        for (const enrichment of item.enrichments) {
          setActivityLog((prev) => [
            ...prev,
            {
              id: `enr-${i}-${enrichment}`,
              action: enrichment,
              partNumber: item.partNumber,
              type: 'ai',
            },
          ]);
        }
      }, cumulativeDelay);

      enrichLineOffset += linesForItem;
    }

    // ─── Phase 3: Validate ──────────────────────────────────────────
    cumulativeDelay += 300;
    const validateSeparatorStart = enrichLineOffset;
    addTimeout(() => {
      setCurrentStage('validate');
      setVisibleLineCount(validateSeparatorStart + 3);
    }, cumulativeDelay);

    let validateLineOffset = validateSeparatorStart + 3;
    for (let i = 0; i < productItems.length; i++) {
      const item = productItems[i];
      // Each validated item has 3 lines: scoring, breakdown, result
      const linesForItem = 3;

      cumulativeDelay += 200;
      const currentValidateOffset = validateLineOffset;
      addTimeout(() => {
        setCurrentItemIndex(i);
        setCurrentItemInfo({
          partNumber: item.partNumber,
          name: item.name,
          brand: item.brand,
          categoryPath: item.categoryPath,
          action: `Scoring: ${item.scoreAfter}/100`,
        });
        setVisibleLineCount(currentValidateOffset + linesForItem);
        setStageProgress((prev) => ({
          ...prev,
          validate: { ...prev.validate, done: i + 1 },
        }));

        // Update compliance score (running average)
        const validatedItems = productItems.slice(0, i + 1);
        const avgScore = Math.round(
          validatedItems.reduce((s, it) => s + it.scoreAfter, 0) / validatedItems.length
        );
        setOverallScore(avgScore);
        setScoreBreakdown({
          required: Math.round(avgScore * 0.5),
          recommended: Math.round(avgScore * 0.3),
          enhanced: avgScore - Math.round(avgScore * 0.5) - Math.round(avgScore * 0.3),
        });

        // Update risk counts
        const riskItems = productItems.slice(0, i + 1);
        setRiskCounts({
          high: riskItems.filter((it) => it.riskTier === 'HIGH').length,
          medium: riskItems.filter((it) => it.riskTier === 'MEDIUM').length,
          low: riskItems.filter((it) => it.riskTier === 'LOW').length,
        });

        // Update field completeness
        const items = productItems.slice(0, i + 1);
        const total = items.length;
        setFieldMetrics([
          {
            label: 'Descriptions',
            value: items.filter(
              (it) => it.description || it.enrichments.some((e) => e.includes('Description'))
            ).length,
            total,
          },
          {
            label: 'Images',
            value: items.filter((it) => it.imageCount > 0).length,
            total,
          },
          {
            label: 'Brand/Mfr',
            value: items.filter((it) => it.brand && it.manufacturer).length,
            total,
          },
          {
            label: 'GTINs/UPCs',
            value: items.filter((it) => it.upc !== null).length,
            total,
          },
          {
            label: 'Specifications',
            value: items.filter((it) => it.hasSpecs).length,
            total,
          },
          {
            label: 'Keywords',
            value: items.filter(
              (it) => it.hasKeywords || it.enrichments.some((e) => e.includes('Keywords'))
            ).length,
            total,
          },
          {
            label: 'FAQ Schema',
            value: items.filter((it) => it.enrichments.some((e) => e.includes('FAQ'))).length,
            total,
          },
          {
            label: 'Weight/UOM',
            value: items.filter((it) => it.hasWeight).length,
            total,
          },
        ]);

        setActivityLog((prev) => [
          ...prev,
          {
            id: `val-${i}`,
            action: `Score: ${item.scoreAfter}/100 (${item.riskTier})`,
            partNumber: item.partNumber,
            type: 'validate',
          },
        ]);
      }, cumulativeDelay);

      validateLineOffset += linesForItem;
    }

    // ─── Phase 4: Publish ───────────────────────────────────────────
    cumulativeDelay += 300;
    const publishSeparatorStart = validateLineOffset;
    addTimeout(() => {
      setCurrentStage('publish');
      setVisibleLineCount(publishSeparatorStart + 3);
    }, cumulativeDelay);

    let publishLineOffset = publishSeparatorStart + 3;
    for (let i = 0; i < productItems.length; i++) {
      const item = productItems[i];
      // Each published item has 3 lines: publishing, JSON-LD, done
      const linesForItem = 3;

      cumulativeDelay += 120;
      const currentPublishOffset = publishLineOffset;
      addTimeout(() => {
        setCurrentItemIndex(i);
        setCurrentItemInfo({
          partNumber: item.partNumber,
          name: item.name,
          brand: item.brand,
          categoryPath: item.categoryPath,
          action: 'Publishing JSON-LD...',
        });
        setVisibleLineCount(currentPublishOffset + linesForItem);
        setStageProgress((prev) => ({
          ...prev,
          publish: { ...prev.publish, done: i + 1 },
        }));
        setActivityLog((prev) => [
          ...prev,
          {
            id: `pub-${i}`,
            action: 'Published to workspace',
            partNumber: item.partNumber,
            type: 'publish',
          },
        ]);
      }, cumulativeDelay);

      publishLineOffset += linesForItem;
    }

    // ─── Completion ─────────────────────────────────────────────────
    cumulativeDelay += 500;
    addTimeout(() => {
      setVisibleLineCount(allTerminalLines.length);
      setIsComplete(true);
      setIsRunning(false);
      setCurrentStage(null);
      setCurrentItemInfo(null);
      setActiveCategoryId(null);
    }, cumulativeDelay);
  }, [speed, allTerminalLines]);

  // ── Reset ──────────────────────────────────────────────────
  const resetDemo = () => {
    clearTimeouts();
    setIsRunning(false);
    setIsComplete(false);
    setCurrentItemIndex(-1);
    setCurrentStage(null);
    setStageProgress({
      import: { done: 0, total: 24 },
      enrich: { done: 0, total: 24 },
      validate: { done: 0, total: 24 },
      publish: { done: 0, total: 24 },
    });
    setExpandedCategories(new Set(['root']));
    setImportedCategoryIds(new Set());
    setActiveCategoryId(null);
    setOverallScore(0);
    setScoreBreakdown({ required: 0, recommended: 0, enhanced: 0 });
    setRiskCounts({ high: 0, medium: 0, low: 0 });
    setFieldMetrics([
      { label: 'Descriptions', value: 0, total: 24 },
      { label: 'Images', value: 0, total: 24 },
      { label: 'Brand/Mfr', value: 0, total: 24 },
      { label: 'GTINs/UPCs', value: 0, total: 24 },
      { label: 'Specifications', value: 0, total: 24 },
      { label: 'Keywords', value: 0, total: 24 },
      { label: 'FAQ Schema', value: 0, total: 24 },
      { label: 'Weight/UOM', value: 0, total: 24 },
    ]);
    setActivityLog([]);
    setVisibleLineCount(0);
    setCurrentItemInfo(null);
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col p-6 gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-hs-amber" />
            Product Data Agent
          </h2>
          <p className="text-sm text-hs-muted mt-1">
            PIM pipeline — the longest pole in implementation
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Speed toggle */}
          <button
            onClick={() => setSpeed((s) => (s === 1 ? 10 : 1))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              speed === 10
                ? 'bg-hs-amber/10 border-hs-amber/30 text-hs-amber'
                : 'bg-hs-surface2 border-hs-border text-hs-muted hover:text-hs-text'
            }`}
          >
            <FastForward className="w-3 h-3" />
            {speed}x speed
          </button>

          {!isComplete ? (
            <GlowButton onClick={beginPopulation} variant="amber" disabled={isRunning}>
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" /> Begin Population
                </>
              )}
            </GlowButton>
          ) : (
            <GlowButton onClick={resetDemo} variant="teal" icon={RotateCcw}>
              Reset
            </GlowButton>
          )}
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Panel */}
        <div className="w-[260px] shrink-0 flex flex-col gap-4 min-h-0">
          <CatalogCard
            catalog={catalogInfo}
            stageProgress={stageProgress}
            isRunning={isRunning}
          />
          <div className="flex-1 min-h-0">
            <TaxonomyTree
              categories={taxonomyCategories}
              expandedIds={expandedCategories}
              onToggle={(id) =>
                setExpandedCategories((prev) => {
                  const n = new Set(Array.from(prev));
                  if (n.has(id)) {
                    n.delete(id);
                  } else {
                    n.add(id);
                  }
                  return n;
                })
              }
              importedCategoryIds={importedCategoryIds}
              activeCategoryId={activeCategoryId}
            />
          </div>
        </div>

        {/* Center Panel */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 min-h-0">
          <PipelineFlow
            stages={pipelineStages}
            currentStage={currentStage}
            stageProgress={stageProgress}
            currentItem={currentItemInfo}
            isComplete={isComplete}
          />
          <div className="flex-1 min-h-0">
            <TerminalOutput
              lines={allTerminalLines}
              visibleCount={visibleLineCount}
              title="hyperscale-pim-agent — bash"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[260px] shrink-0 flex flex-col gap-4 min-h-0 overflow-auto">
          <ComplianceGauge score={overallScore} breakdown={scoreBreakdown} />
          <RiskDistribution counts={riskCounts} total={productItems.length} />
          <FieldCompleteness metrics={fieldMetrics} />
          <ActivityLog entries={activityLog} />
        </div>
      </div>
    </div>
  );
}
