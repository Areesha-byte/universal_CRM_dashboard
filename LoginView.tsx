/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Shield, Lock, Eye, EyeOff, Crown } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { ViewType } from '../types';

interface LoginViewProps {
  setView: (view: ViewType) => void;
  onLoginSuccess: () => void;
}

export default function LoginView({ setView, onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('s.thorne@aurelia.executive');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Simulate luxury secure biometric handshake
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ambient-glowing-sphere-gold pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ambient-glowing-sphere-purple pointer-events-none" />

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
            <Crown className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-serif text-white tracking-wide">Secure Vault Entry</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold mt-1">Aurelia Multi-Signature Terminal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Vault Key Identifier (Email)</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50 focus:bg-white/10 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block">Pass-Secret Token (Password)</label>
              <button 
                type="button" 
                onClick={() => setView('forgot-password')}
                className="text-[10px] text-luxury-gold hover:underline font-medium"
              >
                Token Recovery
              </button>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50 focus:bg-white/10 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Biometric Toggle check */}
          <div className="flex items-center gap-2 py-1">
            <input 
              type="checkbox" 
              id="biometric" 
              defaultChecked
              className="rounded border-white/10 bg-white/5 text-luxury-gold focus:ring-luxury-gold cursor-pointer"
            />
            <label htmlFor="biometric" className="text-[10px] text-gray-400 select-none cursor-pointer">
              Enable local hardware multi-signature handshake (Biometric Auth)
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-tr from-luxury-bronze via-luxury-gold to-luxury-gold-light text-black font-semibold text-xs tracking-widest uppercase shadow-lg shadow-luxury-gold/15 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Decrypting Ledger...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-black" />
                <span>Verify & Unlock Vault</span>
              </>
            )}
          </button>
        </form>
      </GlassCard>

      <button 
        onClick={() => setView('landing')}
        className="mt-8 text-xs text-gray-500 hover:text-gray-300 font-mono tracking-wider transition-colors"
      >
        ← Return to Landing Site
      </button>
    </div>
  );
}
