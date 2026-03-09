'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Cpu, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/scaffolding', label: 'Scaffolding Agent', icon: Cpu },
  { href: '/intake', label: 'Customer Interface', icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-hs-surface border-r border-hs-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-hs-teal to-hs-blue flex items-center justify-center glow-teal">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">HyperScale</h1>
          <p className="text-[10px] text-hs-muted uppercase tracking-widest">AWC.ai</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-hs-teal/10 text-hs-teal border border-hs-teal/20'
                    : 'text-hs-muted hover:text-hs-text hover:bg-white/5'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-hs-teal"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Environment Badge */}
      <div className="p-4 border-t border-hs-border">
        <div className="flex items-center gap-2 px-3 py-2 bg-hs-amber/10 rounded-lg border border-hs-amber/20">
          <div className="w-2 h-2 rounded-full bg-hs-amber animate-pulse" />
          <span className="text-xs font-mono text-hs-amber">PROTOTYPE</span>
        </div>
        <p className="mt-3 text-[10px] text-hs-muted text-center">
          v1.0 — Demo Environment
        </p>
      </div>
    </aside>
  );
}
