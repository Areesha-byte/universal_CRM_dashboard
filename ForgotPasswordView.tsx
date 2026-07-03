/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Shield, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { ViewType } from '../types';

interface ForgotPasswordViewProps {
  setView: (view: ViewType) => void;
}

export default function ForgotPasswordView({ setView }: ForgotPasswordViewProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Simulate luxury decryption key recovery dispatch
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ambient-glowing-sphere-gold pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ambient-glowing-sphere-purple pointer-events-none" />

      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="relative p-2 bg-gradient-to-tr from-luxury-bronze to-luxury-gold rounded-xl shadow-lg shadow-luxury-gold/10">
          <Sparkles className="w-5 h-5 text-black animate-pulse" />
        </div>
        <span className="font-serif text-2xl font-bold tracking-widest bg-gradient-to-r from-white via-luxury-gold-light to-luxury-gold bg-clip-text text-transparent">
          AURELIA
        </span>
      </div>

      <GlassCard glow className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2.5 bg-luxury-gold/5 rounded-full border border-luxury-gold/20 text-luxury-gold mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-serif text-white tracking-wide">Secure Token Recovery</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold mt-1">Multi-Signature Identity Check</p>
        </div>

        {success ? (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 text-xs font-semibold leading-relaxed">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2 animate-bounce" />
              <span>Decryption Recovery Dispatch Sent</span>
              <p className="text-[10px] text-gray-400 font-normal mt-2">A high-priority cryptographic security package has been sent to your registered family-office routing email.</p>
            </div>

            <button
              onClick={() => setView('login')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black font-semibold text-xs tracking-widest uppercase shadow-lg shadow-luxury-gold/10 hover:scale-[1.01] transition-all cursor-pointer"
            >
              Return to Vault Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-xs text-gray-400 leading-relaxed font-light text-center">
              Enter the secure private office email address associated with your Aurelia signature. A physical recovery token signature will be generated.
            </p>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Registered Sovereign Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. s.thorne@aurelia.executive"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50 focus:bg-white/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-tr from-luxury-bronze via-luxury-gold to-luxury-gold-light text-black font-semibold text-xs tracking-widest uppercase shadow-lg shadow-luxury-gold/15 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Validating Credentials...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-black" />
                  <span>Generate Recovery Token</span>
                </>
              )}
            </button>
          </form>
        )}
      </GlassCard>

      <button 
        onClick={() => setView('login')}
        className="mt-8 text-xs text-gray-500 hover:text-gray-300 font-mono tracking-wider transition-colors flex items-center gap-1"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Vault Sign In</span>
      </button>
    </div>
  );
}
