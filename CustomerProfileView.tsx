/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Calendar, 
  Crown, 
  Briefcase, 
  Plus, 
  Edit3, 
  CheckCircle,
  FileText,
  DollarSign
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Customer, Deal, Activity, ViewType } from '../types';

interface CustomerProfileViewProps {
  customer: Customer;
  onBack: () => void;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  customers: Customer[];
}

export default function CustomerProfileView({
  customer,
  onBack,
  setCustomers,
  customers
}: CustomerProfileViewProps) {
  const [notes, setNotes] = useState(customer.notes);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [dealTitle, setDealTitle] = useState('');
  const [dealValue, setDealValue] = useState('');
  const [dealStatus, setDealStatus] = useState<'won' | 'lost' | 'active'>('active');

  const handleSaveNotes = () => {
    const updated = customers.map((c) => {
      if (c.id === customer.id) {
        return {
          ...c,
          notes,
          activities: [
            {
              id: `act-note-${Date.now()}`,
              type: 'system' as const,
              title: 'Dossier Notes Updated',
              description: 'Sovereign memo directives modified by Managing Partner.',
              timestamp: 'Just now',
              user: { name: 'Lord Sterling Thorne', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' }
            },
            ...c.activities
          ]
        };
      }
      return c;
    });
    setCustomers(updated);
    // Alert or visual feedback can be simple state, let's just make it save dynamically
  };

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle || !dealValue) return;

    const val = parseFloat(dealValue);
    if (isNaN(val)) return;

    const newDeal: Deal = {
      id: `d-${Date.now()}`,
      title: dealTitle,
      value: val,
      status: dealStatus,
      date: new Date().toISOString().split('T')[0]
    };

    const newAct: Activity = {
      id: `act-deal-${Date.now()}`,
      type: 'revenue' as const,
      title: `Deal Asset Authorized: ${dealTitle}`,
      description: `New deal worth $${val.toLocaleString()} added to portfolio ledger as '${dealStatus}'.`,
      timestamp: 'Just now',
      user: { name: 'Lord Sterling Thorne', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' }
    };

    const updated = customers.map((c) => {
      if (c.id === customer.id) {
        return {
          ...c,
          deals: [newDeal, ...c.deals],
          lifetimeValue: dealStatus === 'won' ? c.lifetimeValue + val : c.lifetimeValue,
          activities: [newAct, ...c.activities]
        };
      }
      return c;
    });

    setCustomers(updated);
    setDealTitle('');
    setDealValue('');
    setShowAddDeal(false);
  };

  // Keep internal reference sync
  const currentCust = customers.find((c) => c.id === customer.id) || customer;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Back Header Link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-luxury-gold tracking-wider font-mono font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to VIP Registry Index</span>
      </button>

      {/* DETAILED COVER CARD */}
      <GlassCard glow={currentCust.tier === 'Diamond'} className="relative overflow-hidden p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-luxury-gold/5 via-transparent to-transparent pointer-events-none rounded-tr-xl" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold flex items-center justify-center font-serif text-3xl text-black font-bold shadow-lg shadow-luxury-gold/15">
                {currentCust.name.charAt(0)}
              </div>
              {currentCust.tier === 'Diamond' && (
                <div className="absolute -top-1.5 -right-1.5 bg-luxury-gold p-0.5 rounded-full ring-2 ring-brand-dark">
                  <Crown className="w-3.5 h-3.5 text-black" />
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-serif text-white">{currentCust.name}</h1>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-bold bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/20">
                  {currentCust.tier} VIP
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {currentCust.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 font-medium">{currentCust.company}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
              <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Joined: {currentCust.joinedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{currentCust.country}</span>
            </div>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-gray-300">
          <a href={`mailto:${currentCust.email}`} className="flex items-center gap-2.5 hover:text-luxury-gold transition-colors">
            <Mail className="w-4 h-4 text-luxury-gold/70" />
            <span className="truncate">{currentCust.email}</span>
          </a>
          <a href={`tel:${currentCust.phone}`} className="flex items-center gap-2.5 hover:text-luxury-gold transition-colors">
            <Phone className="w-4 h-4 text-luxury-gold/70" />
            <span>{currentCust.phone}</span>
          </a>
          <a href={currentCust.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-luxury-gold transition-colors">
            <Globe className="w-4 h-4 text-luxury-gold/70" />
            <span className="truncate">{currentCust.website}</span>
          </a>
        </div>
      </GlassCard>

      {/* METRICS & NOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Metrics, deals */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Asset Valuation</span>
                <span className="text-xl font-serif text-luxury-gold font-bold">
                  {currentCust.lifetimeValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="p-2 bg-luxury-gold/5 rounded-lg border border-luxury-gold/15 text-luxury-gold">
                <DollarSign className="w-4 h-4" />
              </div>
            </GlassCard>
            <GlassCard className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Dossier Assets</span>
                <span className="text-xl font-serif text-white font-bold">{currentCust.deals.length} Active</span>
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-gray-400">
                <Briefcase className="w-4 h-4" />
              </div>
            </GlassCard>
            <GlassCard className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Registry Audits</span>
                <span className="text-xl font-serif text-green-400 font-bold">Verified</span>
              </div>
              <div className="p-2 bg-green-500/5 rounded-lg border border-green-500/10 text-green-400">
                <CheckCircle className="w-4 h-4" />
              </div>
            </GlassCard>
          </div>

          {/* Deals Portfolio section */}
          <GlassCard>
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Registry Capital</span>
                <h3 className="text-xl font-serif text-white">Deal Portfolio Ledger</h3>
              </div>
              <button
                onClick={() => setShowAddDeal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-luxury-gold/30 hover:bg-white/10 text-xs text-white transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Authorize Deal Asset</span>
              </button>
            </div>

            <div className="space-y-3">
              {currentCust.deals.length > 0 ? (
                currentCust.deals.map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="space-y-0.5">
                      <span className="text-sm font-bold text-white block">{deal.title}</span>
                      <span className="text-[10px] text-gray-400 font-mono">Date authorized: {deal.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-serif font-semibold text-luxury-gold">
                        {deal.value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </span>
                      <span className={`text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-md ${deal.status === 'won' ? 'bg-green-500/10 text-green-400' : deal.status === 'lost' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {deal.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-white/[0.01] rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 font-light">No deals associated with this VIP profile.</span>
                </div>
              )}
            </div>

            {/* Authorize Deal Asset inline drawer */}
            {showAddDeal && (
              <div className="mt-6 p-5 border border-luxury-gold/25 bg-luxury-gold/5 rounded-xl">
                <h4 className="font-serif text-sm text-white mb-3">Authorize Portfolio Deal</h4>
                <form onSubmit={handleAddDeal} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 font-mono block mb-1">Deal Title</label>
                      <input 
                        type="text" 
                        required 
                        value={dealTitle}
                        onChange={(e) => setDealTitle(e.target.value)}
                        placeholder="e.g. Monaco Grand Prix Suite Retainer" 
                        className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 font-mono block mb-1">Asset Value (USD)</label>
                      <input 
                        type="number" 
                        required 
                        value={dealValue}
                        onChange={(e) => setDealValue(e.target.value)}
                        placeholder="e.g. 450000" 
                        className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 font-mono block mb-1">Initial Escrow Status</label>
                    <div className="flex gap-2">
                      {['active', 'won', 'lost'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setDealStatus(status as any)}
                          className={`py-1.5 px-3 rounded-lg text-[10px] capitalize font-semibold border ${dealStatus === status ? 'bg-luxury-gold text-black border-luxury-gold' : 'border-white/10 text-gray-300 hover:bg-white/5'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button 
                      type="button" 
                      onClick={() => setShowAddDeal(false)}
                      className="px-3.5 py-1.5 bg-transparent text-gray-300 text-xs hover:underline"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-1.5 bg-luxury-gold text-black text-xs font-semibold rounded-lg"
                    >
                      Commit Asset
                    </button>
                  </div>
                </form>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right column: Memos and Activity timeline */}
        <div className="lg:col-span-4 space-y-8">
          {/* Executive Directives / Memos */}
          <GlassCard>
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono font-bold">Executive Office</span>
                <h3 className="text-base font-serif text-white">Sovereign Directives</h3>
              </div>
              <button 
                onClick={handleSaveNotes}
                className="p-1 rounded-lg hover:bg-white/5 border border-white/5 text-luxury-gold"
                title="Save Directives"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Insert private notes..."
              rows={5}
              className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-gray-300 focus:outline-none focus:border-luxury-gold/40 focus:bg-white/10 leading-relaxed font-light"
            />
            <button
              onClick={handleSaveNotes}
              className="w-full mt-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-luxury-gold/30 hover:bg-white/10 text-[10px] uppercase tracking-widest font-mono font-semibold transition-all text-luxury-gold cursor-pointer"
            >
              Seal Directives
            </button>
          </GlassCard>

          {/* Activities log */}
          <GlassCard>
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono font-bold">VIP Ledger Log</span>
            <h3 className="text-base font-serif text-white mb-4">Activities Log</h3>
            <div className="relative pl-3 space-y-5 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
              {currentCust.activities && currentCust.activities.length > 0 ? (
                currentCust.activities.map((act) => (
                  <div key={act.id} className="relative group">
                    <span className="absolute -left-[11px] top-1.5 w-[7px] h-[7px] rounded-full bg-luxury-gold border border-brand-dark" />
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[11px] font-bold text-white block truncate leading-tight">{act.title}</span>
                        <span className="text-[9px] text-gray-400 font-mono whitespace-nowrap">{act.timestamp}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-normal font-light">{act.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <span className="text-[11px] text-gray-500 font-light font-mono">No actions registered in this timeline.</span>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
