/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Database, 
  Bell, 
  Lock, 
  Globe, 
  Terminal,
  Save,
  CheckCircle2,
  Sliders,
  Crown
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { CURRENT_USER } from '../data';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'database'>('profile');
  const [successMsg, setSuccessMsg] = useState('');

  // Profile forms
  const [name, setName] = useState(CURRENT_USER.name);
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [role, setRole] = useState(CURRENT_USER.role);

  // Security forms
  const [isMfaActive, setIsMfaActive] = useState(true);
  const [ledgerKey, setLedgerKey] = useState('0x6C3E...A429...E912');

  // Database forms
  const [dbStatus, setDbStatus] = useState<'connected' | 'offline'>('connected');
  const [webhookUrl, setWebhookUrl] = useState('https://api.aurelia.executive/v1/escrow/notify');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Configurations successfully signed and sealed in secure storage.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title Header */}
      <div>
        <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Administrative Vault</span>
        <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">SaaS & Escrow Configuration</h1>
      </div>

      {/* Success notification banner */}
      {successMsg && (
        <div className="p-4 rounded-xl border border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold text-xs font-semibold flex items-center gap-2 animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Subnav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'profile' as const, label: 'Managing Partner Profile', icon: User },
            { id: 'security' as const, label: 'Multi-Signature Security', icon: Shield },
            { id: 'database' as const, label: 'SaaS Vault Integration', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSuccessMsg('');
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all text-left
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-luxury-gold/10 to-transparent border-l-2 border-luxury-gold text-white font-semibold'
                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-luxury-gold' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side Settings Forms */}
        <div className="lg:col-span-9">
          <GlassCard>
            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-1.5 pb-3 border-b border-white/5 mb-4">
                    <Crown className="w-5 h-5 text-luxury-gold" />
                    <h3 className="text-lg font-serif text-white">Signature Credentials</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Executive Signature Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Corporate Command Role</label>
                      <input 
                        type="text" 
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Secure Routing Email</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-1.5 pb-3 border-b border-white/5 mb-4">
                    <Lock className="w-5 h-5 text-luxury-gold" />
                    <h3 className="text-lg font-serif text-white">Multi-Signature Protocol</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl">
                      <div>
                        <span className="text-xs font-bold text-white block">Multi-Factor Hardware Token</span>
                        <span className="text-[10px] text-gray-400 font-light mt-0.5 block">Require physical biometric security key validation on high-value asset transfers.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMfaActive(!isMfaActive)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-semibold border ${isMfaActive ? 'bg-luxury-gold text-black border-luxury-gold' : 'border-white/10 hover:bg-white/5 text-gray-300'}`}
                      >
                        {isMfaActive ? 'ACTIVE' : 'INACTIVE'}
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Central Cryptographic Ledger Signature Key</label>
                      <input 
                        type="text" 
                        value={ledgerKey}
                        onChange={(e) => setLedgerKey(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'database' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-1.5 pb-3 border-b border-white/5 mb-4">
                    <Database className="w-5 h-5 text-luxury-gold" />
                    <h3 className="text-lg font-serif text-white">Central Vault synchronization</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Geneva Vault Synchronization State</label>
                      <div className="flex gap-2">
                        {(['connected', 'offline'] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setDbStatus(s)}
                            className={`flex-1 py-3 text-xs uppercase tracking-wider border rounded-xl font-semibold ${
                              dbStatus === s 
                                ? 'bg-luxury-gold border-luxury-gold text-black' 
                                : 'border-white/10 text-gray-300 hover:bg-white/5'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Webhook Dispatch Escrow Endpoint URL</label>
                      <input 
                        type="url" 
                        required
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-end pt-6 border-t border-white/5 mt-8">
                <button 
                  type="submit" 
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10 hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Seal System Configuration</span>
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
