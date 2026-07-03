/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Shield, 
  CheckSquare, 
  TrendingUp, 
  Plus, 
  Calendar, 
  ArrowUpRight, 
  Briefcase, 
  MessageSquare, 
  Zap,
  Globe,
  FileText
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MiniChart from '../components/MiniChart';
import RevenueChart from '../components/RevenueChart';
import { INITIAL_MEETINGS, RECENT_ACTIVITIES, INITIAL_CUSTOMERS, INITIAL_LEADS, INITIAL_TASKS } from '../data';
import { Customer, Lead, Task, ViewType } from '../types';

interface DashboardViewProps {
  setView: (view: ViewType) => void;
  setSelectedCustomer: (customer: Customer) => void;
  customers: Customer[];
  leads: Lead[];
  tasks: Task[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function DashboardView({
  setView,
  setSelectedCustomer,
  customers,
  leads,
  tasks,
  setCustomers,
  setLeads,
  setTasks
}: DashboardViewProps) {
  // Counters states for the animation on load
  const [custCount, setCustCount] = useState(0);
  const [pipelineCount, setPipelineCount] = useState(0);
  const [empCount, setEmpCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  // Quick Action State
  const [showQuickAccount, setShowQuickAccount] = useState(false);
  const [quickName, setQuickName] = useState('');
  const [quickCompany, setQuickCompany] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickTier, setQuickTier] = useState<'Diamond' | 'Platinum' | 'Gold'>('Platinum');

  useEffect(() => {
    // Elegant number counter animation (JS) on load
    const activeLeadsVal = leads.filter(l => l.stage !== 'won' && l.stage !== 'lost').reduce((acc, l) => acc + l.value, 0);
    const pendingTasksCount = tasks.filter(t => t.status !== 'completed').length;

    const duration = 1000; // 1s
    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCustCount(Math.min(Math.round((customers.length / steps) * currentStep), customers.length));
      setPipelineCount(Math.min(Math.round((activeLeadsVal / steps) * currentStep), activeLeadsVal));
      setEmpCount(Math.min(Math.round((12 / steps) * currentStep), 12)); // mock employees
      setTaskCount(Math.min(Math.round((pendingTasksCount / steps) * currentStep), pendingTasksCount));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [customers, leads, tasks]);

  // Create Quick Account
  const handleCreateQuickAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickCompany || !quickEmail) return;

    const newCust: Customer = {
      id: `c-${Date.now()}`,
      name: quickName,
      company: quickCompany,
      email: quickEmail,
      phone: '+1 (415) 555-0100',
      status: 'Active',
      tier: quickTier,
      lifetimeValue: quickTier === 'Diamond' ? 1200000 : quickTier === 'Platinum' ? 650000 : 350000,
      joinedDate: new Date().toISOString().split('T')[0],
      country: 'United States',
      website: `https://${quickCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      notes: 'Acquired via Executive Quick Action Dashboard Portal.',
      deals: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'customer',
          title: 'Account Initiated',
          description: `VIP digital security vault credentials generated for ${quickName}.`,
          timestamp: 'Just now',
          user: { name: 'Lord Sterling Thorne', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' }
        }
      ]
    };

    setCustomers([newCust, ...customers]);
    setQuickName('');
    setQuickCompany('');
    setQuickEmail('');
    setShowQuickAccount(false);
  };

  const activeLeadsCount = leads.filter(l => l.stage !== 'won' && l.stage !== 'lost').length;
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const taskProgressPct = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title block with luxury greetings */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">
            <Shield className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Sovereign Executive Office Console</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight mt-1">
            Enterprise Command Interface
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full font-mono">
            Live Escrow Balance: <span className="text-luxury-gold font-semibold">$12,450,000</span>
          </span>
          <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            VAULT STATUS: ONLINE
          </span>
        </div>
      </div>

      {/* STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Customers */}
        <GlassCard glow className="relative flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold font-mono">Sovereign Clients</span>
              <h3 className="text-3xl font-serif text-white font-bold">{custCount}</h3>
            </div>
            <div className="p-2.5 bg-luxury-gold/5 rounded-xl border border-luxury-gold/15 text-luxury-gold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-[11px] text-green-400 font-semibold font-mono flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12.4%
            </span>
            <MiniChart data={[12, 14, 15, 18, 22, 24]} color="gold" />
          </div>
        </GlassCard>

        {/* Active Leads Value */}
        <GlassCard glow className="relative flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold font-mono">Active Pipeline</span>
              <h3 className="text-3xl font-serif text-white font-bold">
                ${(pipelineCount / 1000000).toFixed(1)}M
              </h3>
            </div>
            <div className="p-2.5 bg-cyan-500/5 rounded-xl border border-cyan-500/15 text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-[11px] text-green-400 font-semibold font-mono flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18.2%
            </span>
            <MiniChart data={[8.5, 9.2, 11.0, 10.5, 12.0, 12.4]} color="cyan" />
          </div>
        </GlassCard>

        {/* Board / Employees */}
        <GlassCard glow className="relative flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold font-mono">Managing Partners</span>
              <h3 className="text-3xl font-serif text-white font-bold">{empCount}</h3>
            </div>
            <div className="p-2.5 bg-purple-500/5 rounded-xl border border-purple-500/15 text-purple-400">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-[11px] text-gray-400 font-mono">Sovereign Offices</span>
            <MiniChart data={[10, 10, 11, 11, 12, 12]} color="purple" />
          </div>
        </GlassCard>

        {/* Pending Actions */}
        <GlassCard glow className="relative flex flex-col justify-between h-44">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold font-mono">Escrow Audits</span>
              <h3 className="text-3xl font-serif text-white font-bold">{taskCount} Urgent</h3>
            </div>
            <div className="p-2.5 bg-emerald-500/5 rounded-xl border border-emerald-500/15 text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <span className="text-[11px] text-green-400 font-semibold font-mono flex items-center gap-0.5">
              Progress: {taskProgressPct}%
            </span>
            <MiniChart data={[5, 4, 6, 3, 2, 4]} color="green" />
          </div>
        </GlassCard>
      </div>

      {/* CORE PERFORMANCE CHARTS & WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Revenue Pipeline area chart */}
        <div className="lg:col-span-8 space-y-8">
          <RevenueChart />

          {/* Quick Actions & Team Performance Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Actions Panel */}
            <GlassCard className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Operations Portal</span>
                <h3 className="text-xl font-serif text-white mt-1 mb-4">Concierge Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setShowQuickAccount(true)}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-luxury-gold/30 hover:bg-white/10 transition-all text-center gap-2 group cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-luxury-gold group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-gray-200">New VIP Account</span>
                  </button>
                  <button 
                    onClick={() => setView('leads')}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-luxury-gold/30 hover:bg-white/10 transition-all text-center gap-2 group cursor-pointer"
                  >
                    <FileText className="w-5 h-5 text-luxury-gold group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-gray-200">Review Proposals</span>
                  </button>
                  <button 
                    onClick={() => setView('calendar')}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-luxury-gold/30 hover:bg-white/10 transition-all text-center gap-2 group group cursor-pointer"
                  >
                    <Calendar className="w-5 h-5 text-luxury-gold group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-gray-200">Schedule Board</span>
                  </button>
                  <button 
                    onClick={() => setView('reports')}
                    className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-xl hover:border-luxury-gold/30 hover:bg-white/10 transition-all text-center gap-2 group group cursor-pointer"
                  >
                    <TrendingUp className="w-5 h-5 text-luxury-gold group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-gray-200">Audit Reports</span>
                  </button>
                </div>
              </div>

              {/* Simulated Quick Account Creation Portal */}
              {showQuickAccount && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="w-full max-w-md glass-panel border border-white/10 rounded-2xl p-6 relative">
                    <h4 className="font-serif text-xl text-white mb-4">Initialize VIP Account Record</h4>
                    <form onSubmit={handleCreateQuickAccount} className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">VIP Contact Name</label>
                        <input 
                          type="text" 
                          required 
                          value={quickName}
                          onChange={e => setQuickName(e.target.value)}
                          placeholder="e.g. Lady Georgiana Cavendish" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Enterprise Corporation</label>
                        <input 
                          type="text" 
                          required 
                          value={quickCompany}
                          onChange={e => setQuickCompany(e.target.value)}
                          placeholder="e.g. Cavendish Capital Partners" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Secure Contact Email</label>
                        <input 
                          type="email" 
                          required 
                          value={quickEmail}
                          onChange={e => setQuickEmail(e.target.value)}
                          placeholder="e.g. georgiana@cavendish.ch" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['Diamond', 'Platinum', 'Gold'].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setQuickTier(t as any)}
                            className={`py-2 text-[10px] uppercase tracking-wider rounded-lg border font-semibold ${quickTier === t ? 'bg-luxury-gold border-luxury-gold text-black' : 'border-white/10 hover:bg-white/5 text-gray-300'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3 justify-end pt-4 border-t border-white/5 mt-6">
                        <button 
                          type="button" 
                          onClick={() => setShowQuickAccount(false)}
                          className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-xs hover:bg-white/10 text-gray-300"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-4 py-2 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10"
                        >
                          Generate Record
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Team Performance Widget */}
            <GlassCard>
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Firm Performance</span>
              <h3 className="text-xl font-serif text-white mt-1 mb-4">Board Members</h3>
              <div className="space-y-4">
                {[
                  { name: 'Lord Sterling Thorne', deals: '$12.4M', score: 98, role: 'Managing Partner' },
                  { name: 'Hon. Elizabeth Vance', deals: '$8.2M', score: 92, role: 'Senior Private Director' },
                  { name: 'Alistair Graeme-Cunningham', deals: '$3.9M', score: 87, role: 'Senior Director' }
                ].map((member, i) => (
                  <div key={i} className="flex flex-col gap-1 pb-3 border-b border-white/5 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block leading-tight">{member.name}</span>
                        <span className="text-[9px] text-gray-400 font-medium">{member.role}</span>
                      </div>
                      <span className="text-xs font-serif text-luxury-gold font-semibold">{member.deals} closed</span>
                    </div>
                    {/* Tiny visual score progress */}
                    <div className="w-full bg-white/5 rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-luxury-bronze to-luxury-gold rounded-full" 
                        style={{ width: `${member.score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* SIDE ACTIONS, ACTIVITIES, & MEETINGS */}
        <div className="lg:col-span-4 space-y-8">
          {/* Upcoming Meetings widget */}
          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Central Calendar</span>
                <h3 className="text-xl font-serif text-white mt-1">Sovereign Synchronies</h3>
              </div>
              <button 
                onClick={() => setView('calendar')}
                className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {INITIAL_MEETINGS.map((meeting) => (
                <div key={meeting.id} className="flex flex-col gap-1 pb-3 border-b border-white/5 last:border-b-0 last:pb-0 group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-luxury-gold transition-colors leading-tight">
                        {meeting.title}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Client: {meeting.customerName}
                      </span>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-mono tracking-wider font-semibold ${meeting.status === 'ongoing' ? 'bg-red-500/10 text-red-400 animate-pulse border border-red-500/20' : 'bg-white/5 text-gray-400 border border-white/5'}`}>
                      {meeting.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400 font-mono">
                    <span>{meeting.time}</span>
                    <span className="capitalize">{meeting.type} Sync</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Activity Timeline */}
          <GlassCard>
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Operational Ledger</span>
            <h3 className="text-xl font-serif text-white mt-1 mb-4">Real-Time Activities</h3>
            <div className="relative pl-4 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {RECENT_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="relative group">
                  {/* Ledger Dot indicator */}
                  <span className="absolute -left-[14px] top-1.5 w-[9px] h-[9px] rounded-full bg-luxury-gold border-2 border-brand-dark z-10 transition-transform group-hover:scale-125" />
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white block pr-2 leading-tight">
                        {activity.title}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono whitespace-nowrap flex-shrink-0">
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <img 
                        src={activity.user.avatar} 
                        alt={activity.user.name} 
                        className="w-4 h-4 rounded-full object-cover border border-luxury-gold/20"
                      />
                      <span className="text-[9px] text-gray-500 font-mono">by {activity.user.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
