/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Award, 
  CheckCircle2, 
  BarChart3, 
  Sparkles,
  Layers,
  ArrowUpRight,
  Target,
  Users,
  Clock,
  ShieldCheck,
  TrendingDown,
  Calendar,
  ChevronRight,
  TrendingUp as TrendUpIcon
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import RevenueChart from '../components/RevenueChart';

export default function ReportsView() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'conversion' | 'pipeline' | 'officers'>('revenue');

  // Custom data definitions
  const pipelineMetrics = [
    { stage: 'New Prospecting', count: 4, value: 4800000, percentage: 35, color: '#3b82f6' },
    { stage: 'Qualified Pipeline', count: 6, value: 6900000, percentage: 50, color: '#8b5cf6' },
    { stage: 'Executive Proposal', count: 3, value: 11200000, percentage: 80, color: '#f59e0b' },
    { stage: 'Final Negotiation', count: 2, value: 5800000, percentage: 95, color: '#ef4444' },
    { stage: 'Sovereign Closed Won', count: 12, value: 24500000, percentage: 100, color: '#10b981' }
  ];

  const officerMetrics = [
    { name: 'Lord Sterling Thorne', role: 'Chief Managing Officer', rate: 98, volume: '$12.4M', tasks: 24, score: 99, color: '#e2c074' },
    { name: 'Lady Arabella Sterling', role: 'Head of VIP Escrow', rate: 96, volume: '$8.2M', tasks: 18, score: 97, color: '#c4b5fd' },
    { name: 'Charles Montgomery', role: 'Sovereign Suitability Steward', rate: 94, volume: '$5.5M', tasks: 22, score: 94, color: '#a5f3fc' },
    { name: 'Victoria Sinclair', role: 'Lead Vault Security Officer', rate: 91, volume: '$3.1M', tasks: 15, score: 92, color: '#fbcfe8' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Operational Intelligence</span>
          <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">Sovereign Performance Ledger</h1>
        </div>
        <div className="flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-xl overflow-x-auto max-w-full">
          {(['revenue', 'conversion', 'pipeline', 'officers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs rounded-lg transition-all capitalize font-medium whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'officers' ? 'Officer Performance' : `${tab} Analytics`}
            </button>
          ))}
        </div>
      </div>

      {/* CORE KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Aggregate Volume Won</span>
              <span className="text-2xl font-serif text-white font-bold">$24.5M</span>
            </div>
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-green-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% above projections</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Avg Asset Deal Size</span>
              <span className="text-2xl font-serif text-white font-bold">$1.85M</span>
            </div>
            <div className="p-2 bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-gray-400 font-mono">
            <span>UHNW accounts focus</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Proposal Conversion</span>
              <span className="text-2xl font-serif text-white font-bold">94.8%</span>
            </div>
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-green-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Elite closure rate</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Active Pipeline Weighted</span>
              <span className="text-2xl font-serif text-white font-bold">$14.2M</span>
            </div>
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-gray-400 font-mono">
            <span>Probability-weighted yield</span>
          </div>
        </GlassCard>
      </div>

      {/* DETAILED TAB CONTENT */}
      {activeTab === 'revenue' && (
        <div className="space-y-8">
          <RevenueChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono block">Audit Summary</span>
              <h3 className="text-xl font-serif text-white mt-1 mb-4">Capital Escrow Disclosures</h3>
              <div className="space-y-4 text-xs text-gray-300 font-light leading-relaxed">
                <p>During the current financial year, Rostov Sovereign Capital wire settling yielded an incremental CHF 250,000, aligning with Geneva’s sovereign fund compliance standards. In addition, the suborbital launch fleet delivery contract finalized for Aetherius Aerospace committed $1,200,000 in immediate liquidity.</p>
                <p>Vanguard Deeptech’s biometric yacht yacht system design remains weighted at a 94% suitablity score, with a proposal estimated at $480,000 pending completion of phase-3 prototype tracing in London boardroom sync.</p>
              </div>
            </GlassCard>

            {/* PERFORMANCE TIMELINE OF ACCOMPLISHMENTS */}
            <GlassCard>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono block">Quarterly Accomplishments</span>
              <h3 className="text-xl font-serif text-white mt-1 mb-6">Milestone Execution Timeline</h3>
              
              <div className="relative pl-5 space-y-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                {[
                  { title: 'CHF 250k Rostov Settlement', desc: 'Geneva vault deposit settlement successfully synchronized and signed.', date: 'July 1, 2026', tag: 'High Impact' },
                  { title: 'Aetherius Shuttle Accord', desc: 'Secure escrow authorized and shuttle contracts locked.', date: 'June 30, 2026', tag: 'Closed Won' },
                  { title: 'Quantum Cryptography Upgrade', desc: 'Lounge vault communication lines updated with RSA quantum keys.', date: 'June 28, 2026', tag: 'System Secure' }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-brand-dark border-2 border-luxury-gold group-hover:scale-125 transition-transform" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white group-hover:text-luxury-gold transition-colors">{item.title}</span>
                        <span className="text-[9px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">{item.tag}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-light">{item.desc}</p>
                      <span className="text-[9px] text-gray-500 block font-mono">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {activeTab === 'conversion' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Conversion Metrics Progress */}
          <GlassCard>
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Yield Metrics</span>
            <h3 className="text-xl font-serif text-white mt-1 mb-6">Client Acquisition Conversion</h3>
            <div className="space-y-6">
              {[
                { stage: 'Prospect suitability check', rate: 98, count: '148 Audited' },
                { stage: 'Executive Mayfair presentations', rate: 94, count: '82 Presented' },
                { stage: 'Private Escrow structuring', rate: 89, count: '34 Structured' },
                { stage: 'Multinational Contract Seal', rate: 94.8, count: '24 Executed' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <span className="font-bold text-white block">{item.stage}</span>
                      <span className="text-[10px] text-gray-500 font-mono font-medium">{item.count}</span>
                    </div>
                    <span className="font-serif text-luxury-gold font-bold">{item.rate}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-luxury-bronze to-luxury-gold rounded-full" style={{ width: `${item.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Interactive Custom SVG Radial Gauge */}
          <GlassCard className="flex flex-col items-center justify-center p-8 text-center">
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono block mb-4">Central Conversion Gauge</span>
            
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* SVG Circle Track */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.03)" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="url(#radialGaugeGrad)" 
                  strokeWidth="8" 
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 94.8) / 100}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="radialGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8c6a23" />
                    <stop offset="50%" stopColor="#e2c074" />
                    <stop offset="100%" stopColor="#f3dfae" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="font-serif text-3xl font-extrabold text-white">94.8%</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono font-bold mt-1">LTV Yield Rate</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-light mt-6 leading-relaxed max-w-xs">Our weighted portfolio client closure exceeds standard private corporate averages by 34%, ensuring high capital deployment efficiency.</p>
          </GlassCard>
        </div>
      )}

      {activeTab === 'pipeline' && (
        <GlassCard>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Stage Yields</span>
          <h3 className="text-xl font-serif text-white mt-1 mb-6">Probability Distribution Weighted</h3>
          
          <div className="space-y-5">
            {pipelineMetrics.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-white block">{item.stage}</span>
                    <span className="text-[10px] text-gray-500 font-mono font-medium">{item.count} Active Escrows</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-right text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Probability</span>
                    <span className="text-white font-semibold font-mono">{item.percentage}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Yield Value</span>
                    <span className="font-serif text-luxury-gold font-bold">
                      {item.value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* NEW SECTION: OFFICER PERFORMANCE TRACKING */}
      {activeTab === 'officers' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Officers Grid */}
            <div className="lg:col-span-8 space-y-4">
              <GlassCard className="p-6">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono block mb-1">Steward Diagnostics</span>
                <h3 className="text-xl font-serif text-white mb-6">Officer Conversion Ledger</h3>
                
                <div className="space-y-5">
                  {officerMetrics.map((officer, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-luxury-gold/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Left Block: Name & Role */}
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg border bg-white/5 flex-shrink-0" style={{ borderColor: `${officer.color}25`, color: officer.color }}>
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-sm font-bold text-white block">{officer.name}</span>
                          <span className="text-[10px] text-gray-400 block font-medium">{officer.role}</span>
                        </div>
                      </div>

                      {/* Right Block: KPIs & Achievements */}
                      <div className="flex items-center gap-6 sm:text-right text-xs">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Tasks Closed</span>
                          <span className="text-white font-semibold font-mono">{officer.tasks} Directives</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Sovereign Volume</span>
                          <span className="text-luxury-gold font-bold font-serif">{officer.volume}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Efficiency Rate</span>
                          <span className="font-bold font-mono" style={{ color: officer.color }}>{officer.rate}%</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Performance Distribution Visual Chart */}
            <div className="lg:col-span-4 space-y-6">
              <GlassCard className="p-6 text-center">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono block mb-4">Task Resolution Matrix</span>
                
                {/* SVG Visualizer representing officer distribution */}
                <div className="relative w-full h-44 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 120">
                    {/* Grid background lines */}
                    <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="20" y1="20" x2="20" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    
                    {/* SVG Bar chart for Task Resolution volumes */}
                    {[
                      { x: 40, height: 80, label: 'Thorne', val: '24', color: '#e2c074' },
                      { x: 80, height: 60, label: 'Sterling', val: '18', color: '#c4b5fd' },
                      { x: 120, height: 74, label: 'Charles', val: '22', color: '#a5f3fc' },
                      { x: 160, height: 50, label: 'Victoria', val: '15', color: '#fbcfe8' }
                    ].map((bar, i) => (
                      <g key={i} className="group">
                        {/* Bar */}
                        <rect
                          x={bar.x - 8}
                          y={100 - bar.height}
                          width="16"
                          height={bar.height}
                          fill={bar.color}
                          rx="4"
                          opacity="0.8"
                          className="hover:opacity-100 transition-opacity cursor-pointer"
                        />
                        {/* Value top label */}
                        <text
                          x={bar.x}
                          y={95 - bar.height}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="8"
                          fontFamily="monospace"
                        >
                          {bar.val}
                        </text>
                        {/* Bottom identifier */}
                        <text
                          x={bar.x}
                          y="112"
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.4)"
                          fontSize="7"
                          fontFamily="sans-serif"
                        >
                          {bar.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
                
                <p className="text-xs text-gray-400 font-light mt-4 leading-relaxed">
                  Directives closed per Officer in the last 30 operational days. Lord Sterling Thorne maintains standard-setting completion times.
                </p>
              </GlassCard>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
