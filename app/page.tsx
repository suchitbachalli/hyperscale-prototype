'use client';
import { motion } from 'framer-motion';
import {
  Server, FileText, Clock, TrendingUp,
  Cpu, MessageSquare, ArrowRight, MapPin,
  Building2, Calendar, Users, Globe, Zap
} from 'lucide-react';
import Link from 'next/link';
import AWCGauge from '@/components/shared/AWCGauge';
import MetricCard from '@/components/shared/MetricCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 bg-grid min-h-full">
      {/* Header Area */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-start justify-between"
      >
        <motion.div variants={item} className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Implementation <span className="text-gradient-teal">Automation</span>
          </h1>
          <p className="text-hs-muted text-sm">
            Reynolds & Son, Inc. — CX1 eCommerce Implementation
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-hs-teal/10 rounded-full border border-hs-teal/20">
              <div className="w-2 h-2 rounded-full bg-hs-teal animate-pulse" />
              <span className="text-xs font-mono text-hs-teal">Project Active</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-hs-surface2 rounded-full border border-hs-border">
              <Calendar className="w-3 h-3 text-hs-muted" />
              <span className="text-xs font-mono text-hs-muted">Go Live: Oct 17, 2025</span>
            </div>
          </div>
        </motion.div>
        <motion.div variants={item}>
          <AWCGauge value={87} size={130} label="Blended AWC Score" />
        </motion.div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          icon={Server}
          label="Systems Provisioned"
          value="8/8"
          sublabel="SF, SmartSheet, Teams, Jira, FTP, CIMM2, OneDrive, Intake"
          color="teal"
          delay={0.1}
        />
        <MetricCard
          icon={FileText}
          label="Intake Completion"
          value="94%"
          sublabel="28/29 domains finalized"
          color="blue"
          delay={0.2}
        />
        <MetricCard
          icon={Clock}
          label="Time Saved"
          value="47 hrs"
          sublabel="Manual: 52 hrs → Agent: 5 hrs"
          color="amber"
          delay={0.3}
        />
        <MetricCard
          icon={TrendingUp}
          label="AWC Score"
          value="87%"
          sublabel="Blended across scaffolding + intake"
          color="teal"
          delay={0.4}
        />
      </div>

      {/* Project Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-hs-surface2/50 rounded-xl border border-hs-border p-6"
      >
        <h3 className="text-sm font-semibold text-hs-text mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-hs-teal" />
          Project Overview
        </h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-3 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-hs-muted">Customer</span>
            <span className="text-hs-text">Reynolds & Son, Inc.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">Location</span>
            <span className="text-hs-text flex items-center gap-1">
              <MapPin className="w-3 h-3" /> South Barre, Vermont (EST)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">ERP</span>
            <span className="text-hs-text">Prophet 21 (Cloud) v24.2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">Industry</span>
            <span className="text-hs-text">Industrial Supply, Fire Services</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">Buying Group</span>
            <span className="text-hs-text">AD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">Contract Scope</span>
            <span className="text-hs-text">CX1 eCommerce, CIMM2, AD Adaptor</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">IPM</span>
            <span className="text-hs-text">Jen Wilburn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">Key Contacts</span>
            <span className="text-hs-text flex items-center gap-1">
              <Users className="w-3 h-3" /> Todd, Dawn, Dave
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">Beta Site</span>
            <span className="text-hs-blue">190487rey-beta.cimm2.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hs-muted">Current Site</span>
            <span className="text-hs-blue flex items-center gap-1">
              <Globe className="w-3 h-3" /> reynoldsandson.com
            </span>
          </div>
        </div>
      </motion.div>

      {/* Agent Demo Cards */}
      <div className="grid grid-cols-2 gap-6">
        <Link href="/scaffolding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="group p-6 bg-hs-surface2/50 rounded-xl border border-hs-border hover:border-hs-teal/40 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-hs-teal/10 rounded-xl">
                <Cpu className="w-6 h-6 text-hs-teal" />
              </div>
              <ArrowRight className="w-5 h-5 text-hs-muted group-hover:text-hs-teal group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Project Scaffolding Agent</h3>
            <p className="text-sm text-hs-muted mb-4">
              Watch 8 systems get provisioned in real-time — Salesforce, SmartSheet, Teams, Jira, FTP, and more. Fully automated Day Zero setup.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-1">
                {['SF', 'SS', 'TM', 'JR', 'FP', 'CM', 'OD', 'IF'].map((s, i) => (
                  <div key={s} className="w-6 h-6 rounded-full bg-hs-surface border border-hs-border flex items-center justify-center text-[8px] font-mono text-hs-muted">
                    {s}
                  </div>
                ))}
              </div>
              <span className="text-xs font-mono text-hs-teal">8 systems → 18.6s</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-hs-teal">
              <Zap className="w-4 h-4" />
              Launch Demo
            </div>
          </motion.div>
        </Link>

        <Link href="/intake">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="group p-6 bg-hs-surface2/50 rounded-xl border border-hs-border hover:border-hs-blue/40 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-hs-blue/10 rounded-xl">
                <MessageSquare className="w-6 h-6 text-hs-blue" />
              </div>
              <ArrowRight className="w-5 h-5 text-hs-muted group-hover:text-hs-blue group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Customer Interface Agent</h3>
            <p className="text-sm text-hs-muted mb-4">
              Conversational intake replacing the Excel spreadsheet. Watch 350+ fields get collected through natural dialogue across 29 domains.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-2 flex-1 bg-hs-surface rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-hs-blue to-hs-teal rounded-full" style={{ width: '94%' }} />
              </div>
              <span className="text-xs font-mono text-hs-blue">94% complete</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-hs-blue">
              <Zap className="w-4 h-4" />
              Launch Demo
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
