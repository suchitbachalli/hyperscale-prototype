'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Circle, FolderTree } from 'lucide-react';
import clsx from 'clsx';
import { ProductCategory } from '@/data/product-data';

interface TaxonomyTreeProps {
  categories: ProductCategory[];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  importedCategoryIds: Set<string>;
  activeCategoryId: string | null;
}

function TreeNode({
  category,
  categories,
  expandedIds,
  onToggle,
  importedCategoryIds,
  activeCategoryId,
}: {
  category: ProductCategory;
  categories: ProductCategory[];
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  importedCategoryIds: Set<string>;
  activeCategoryId: string | null;
}) {
  const children = categories.filter((c) => c.parentId === category.id);
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(category.id);
  const isImported = importedCategoryIds.has(category.id);
  const isActive = activeCategoryId === category.id;

  // Color logic: amber if active, teal if imported, muted otherwise
  const nameColor = isActive
    ? 'text-hs-amber'
    : isImported
      ? 'text-hs-teal'
      : 'text-hs-muted';

  const badgeBg = isActive
    ? 'bg-hs-amber/15 text-hs-amber'
    : isImported
      ? 'bg-hs-teal/15 text-hs-teal'
      : 'bg-hs-surface2 text-hs-muted';

  const iconColor = isActive
    ? 'text-hs-amber'
    : isImported
      ? 'text-hs-teal'
      : 'text-hs-muted';

  return (
    <div>
      {/* Node row */}
      <button
        onClick={() => hasChildren && onToggle(category.id)}
        className={clsx(
          'w-full flex items-center gap-1.5 py-1 rounded-md transition-colors group',
          hasChildren ? 'cursor-pointer hover:bg-hs-surface2/50' : 'cursor-default',
        )}
        style={{ paddingLeft: `${category.depth * 12}px` }}
      >
        {/* Expand/collapse or leaf icon */}
        {hasChildren ? (
          <ChevronRight
            className={clsx('w-3 h-3 shrink-0 transition-transform duration-200', iconColor)}
            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
          />
        ) : (
          <Circle className={clsx('w-2 h-2 shrink-0 ml-0.5 mr-0.5', iconColor)} />
        )}

        {/* Name */}
        <span className={clsx('text-xs truncate', nameColor)}>
          {category.name}
        </span>

        {/* Item count badge */}
        <span
          className={clsx(
            'ml-auto shrink-0 inline-flex items-center justify-center min-w-[18px] px-1 py-0 rounded-full text-[9px] font-mono font-medium',
            badgeBg,
          )}
        >
          {category.itemCount}
        </span>
      </button>

      {/* Children (animated expand/collapse) */}
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            key={`children-${category.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {children.map((child) => (
              <TreeNode
                key={child.id}
                category={child}
                categories={categories}
                expandedIds={expandedIds}
                onToggle={onToggle}
                importedCategoryIds={importedCategoryIds}
                activeCategoryId={activeCategoryId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TaxonomyTree({
  categories,
  expandedIds,
  onToggle,
  importedCategoryIds,
  activeCategoryId,
}: TaxonomyTreeProps) {
  // Root-level categories (parentId === null)
  const rootCategories = categories.filter((c) => c.parentId === null);

  return (
    <div className="bg-hs-surface/50 rounded-xl border border-hs-border p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <FolderTree className="w-3.5 h-3.5 text-hs-muted" />
        <span className="text-[10px] tracking-widest text-hs-muted font-mono uppercase">
          Taxonomy
        </span>
      </div>

      {/* Scrollable tree */}
      <div className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {rootCategories.map((root) => (
            <TreeNode
              key={root.id}
              category={root}
              categories={categories}
              expandedIds={expandedIds}
              onToggle={onToggle}
              importedCategoryIds={importedCategoryIds}
              activeCategoryId={activeCategoryId}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
