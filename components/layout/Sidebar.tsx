'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Cpu, MessageSquare, Database, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/scaffolding', label: 'Scaffolding Agent', icon: Cpu },
  { href: '/intake', label: 'Customer Interface', icon: MessageSquare },
  { href: '/product-data', label: 'Product Data', icon: Database },
  { href: '/meetings', label: 'Meeting Intel', icon: BrainCircuit },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-hs-surface border-r border-hs-border flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 py-5">
        <img src="/hyperscale-logo.svg" alt="HyperScale" className="h-8" />
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

      {/* Partner Logos + Version */}
      <div className="p-4 border-t border-hs-border">
        <div className="flex items-center justify-center gap-4 px-3 py-3">
          <img src="/orgill-logo.svg" alt="Orgill" className="h-6 opacity-90" />
          <div className="w-px h-6 bg-hs-border/60" />
          <img src="/unilog-logo.svg" alt="Unilog" className="h-7 opacity-90" />
        </div>
        <p className="mt-2 text-[10px] text-hs-muted text-center font-mono">
          v1.1.0 Environment
        </p>
      </div>
    </aside>
  );
}
