/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Crown, 
  TrendingUp, 
  LineChart, 
  Lock, 
  Globe, 
  Layers, 
  ChevronRight,
  Workflow
} from 'lucide-react';
import { ViewType } from '../types';

interface LandingViewProps {
  setView: (view: ViewType) => void;
}

export default function LandingView({ setView }: LandingViewProps) {
  const bentoFeatures = [
    {
      icon: Crown,
      title: 'Bespoke Private Client Ledger',
      desc: 'Sovereign-grade data structures tracking ultra-high-net-worth customer portfolios and multi-signature acquisitions.',
      span: 'col-span-12 md:col-span-7'
    },
    {
      icon: ShieldCheck,
      title: 'Multinational Trust Escrow',
      desc: 'Seamless, cryptographically secure deal escrow pipelines built for global venture partnerships.',
      span: 'col-span-12 md:col-span-5'
    },
    {
      icon: LineChart,
      title: 'Suborbital Real-time Forecasts',
      desc: 'AI-grounded pipeline projections based on actual macroeconomic indicators, luxury market fluctuations, and sovereign yields.',
      span: 'col-span-12 md:col-span-5'
    },
    {
      icon: Layers,
      title: 'Concierge Business Automations',
      desc: 'Zero-latency workflow synchronizations. Automated private heli-shuttle scheduling, Mayfair dining escrows, and Swiss dividend notifications.',
      span: 'col-span-12 md:col-span-7'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030305] text-white relative overflow-hidden select-none">
      {/* Decorative ambient background spheres */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full ambient-glowing-sphere-gold pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ambient-glowing-sphere-purple pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full ambient-glowing-sphere-blue pointer-events-none" />

      {/* Futuristic subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Floating Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 h-24 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-gradient-to-tr from-luxury-bronze to-luxury-gold rounded-xl shadow-lg shadow-luxury-gold/10">
            <Sparkles className="w-5 h-5 text-black animate-pulse" />
          </div>
          <span className="font-serif text-xl font-bold tracking-widest bg-gradient-to-r from-white via-luxury-gold-light to-luxury-gold bg-clip-text text-transparent">
            AURELIA
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('login')}
            className="text-sm text-gray-300 hover:text-luxury-gold transition-colors font-medium tracking-wide"
          >
            Vault Sign In
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:scale-[1.03] transition-all text-xs font-semibold text-black tracking-wider shadow-lg shadow-luxury-gold/20"
          >
            Launch Terminal
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        {/* Elite Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 mb-8 backdrop-blur-md"
        >
          <Crown className="w-3.5 h-3.5 text-luxury-gold" />
          <span className="text-[10px] text-luxury-gold font-semibold uppercase tracking-widest">
            The Sovereign Standard of Client Relationship Management
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl leading-[1.05] mb-8"
        >
          Manage High-Net-Worth <br />
          <span className="gold-gradient font-serif italic">Relationships with Absoluteness</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl font-light leading-relaxed mb-12"
        >
          Bespoke pipelines, sovereign-grade security protocols, and real-time capital intelligence. Aurelia is built exclusively for modern venture partners, luxury conglomerates, and private offices.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-sm mb-24"
        >
          <button 
            onClick={() => setView('login')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-tr from-luxury-bronze via-luxury-gold to-luxury-gold-light text-black font-semibold text-sm tracking-wider shadow-xl shadow-luxury-gold/15 flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <span>Request Integration</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-luxury-gold/30 transition-all text-sm font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Preview CRM Core</span>
          </button>
        </motion.div>

        {/* Luxury Glass Screenshot Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-full max-w-5xl rounded-3xl p-3 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
          <div className="rounded-2xl border border-white/5 overflow-hidden bg-[#0a0a0d] p-6 text-left aspect-[16/9] flex flex-col justify-between relative shadow-inner">
            {/* Top preview utilities */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-gray-500 font-mono ml-4">aurelia.executive/vault/dashboard</span>
              </div>
              <div className="px-3 py-1 bg-luxury-gold/10 rounded-full border border-luxury-gold/20 text-[9px] text-luxury-gold font-mono uppercase tracking-wider">
                Operational Terminal Live
              </div>
            </div>

            {/* Simulated UI layout */}
            <div className="grid grid-cols-12 gap-4 flex-1 pt-6">
              <div className="col-span-3 border-r border-white/5 pr-4 space-y-3">
                <div className="h-6 bg-white/10 rounded-lg w-3/4 animate-pulse" />
                <div className="h-4 bg-white/5 rounded-lg w-1/2" />
                <div className="space-y-2 pt-6">
                  <div className="h-8 bg-luxury-gold/5 rounded-xl border border-luxury-gold/15 w-full" />
                  <div className="h-8 bg-white/5 rounded-xl w-full" />
                  <div className="h-8 bg-white/5 rounded-xl w-full" />
                </div>
              </div>
              <div className="col-span-9 pl-2 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Vault Assets</span>
                    <h4 className="text-xl font-serif text-luxury-gold mt-1">$24.5M</h4>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Win Rate</span>
                    <h4 className="text-xl font-serif text-green-400 mt-1">94.8%</h4>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">VIP Escrows</span>
                    <h4 className="text-xl font-serif text-white mt-1">12 Active</h4>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 h-28 flex items-end justify-between gap-1.5 relative mt-4">
                  <div className="absolute top-4 left-4 flex justify-between items-center w-[93%]">
                    <span className="text-[10px] text-gray-400 font-mono">Quarterly Yield Analysis</span>
                    <span className="text-[9px] text-green-400">+18.4%</span>
                  </div>
                  {/* Mock bar charts */}
                  {[40, 65, 50, 85, 70, 95, 60].map((h, idx) => (
                    <div key={idx} className="flex-1 bg-white/5 rounded-t-lg relative" style={{ height: '70%' }}>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-luxury-bronze to-luxury-gold rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID PRODUCT FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Bespoke Framework</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-2">Enterprise-Class Capital Infrastructure</h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light text-sm mt-4">Every detail of Aurelia is meticulously engineered to provide absolute command over elite investment relationships, private jet escrows, and global sovereign holdings.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {bentoFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className={`${feat.span} rounded-2xl bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between hover:bg-white/[0.04] hover:border-luxury-gold/25 transition-all group`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-luxury-gold/5 border border-luxury-gold/15 flex items-center justify-center text-luxury-gold mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{feat.desc}</p>
                </div>
                <div className="mt-8 flex items-center gap-1.5 text-xs text-luxury-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Security Specs</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SOVEREIGN CLIENT TRUST */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5 text-center">
        <h3 className="font-serif italic text-3xl text-luxury-gold mb-8">“Aurelia completely redefined our private wealth client experience.”</h3>
        <div className="flex flex-col items-center">
          <img 
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" 
            alt="Swiss venture fund client" 
            className="w-16 h-16 rounded-full object-cover border-2 border-luxury-gold/40 mb-3"
          />
          <span className="font-serif font-bold text-white tracking-wide text-sm">Alastair Cunningham-Graeme</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Senior Director, Mayfair Private Offices</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-[11px] text-gray-500 font-mono">
          &copy; {new Date().getFullYear()} Aurelia Technologies Inc. Sovereign Wealth Infrastructure.
        </span>
        <div className="flex items-center gap-6 text-[11px] text-gray-500 font-mono">
          <a href="#" className="hover:text-luxury-gold transition-colors">Vulnerability Protocol</a>
          <a href="#" className="hover:text-luxury-gold transition-colors">Escrow Disclosures</a>
          <a href="#" className="hover:text-luxury-gold transition-colors">Geneva Compliance</a>
        </div>
      </footer>
    </div>
  );
}
