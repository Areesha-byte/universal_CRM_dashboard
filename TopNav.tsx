/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Sun, 
  Moon, 
  Menu, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  ChevronDown,
  Activity,
  CreditCard,
  Crown
} from 'lucide-react';
import { CURRENT_USER } from '../data';
import { ViewType } from '../types';

interface TopNavProps {
  setView: (view: ViewType) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onLogout: () => void;
}

export default function TopNav({
  setView,
  isOpenMobile,
  setIsOpenMobile,
  theme,
  setTheme,
  onLogout
}: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const notifications = [
    { id: 1, title: 'CHF 250,000 Transferred', desc: 'Rostov Sovereign Capital wire successfully settled', time: '10m ago', unread: true },
    { id: 2, title: 'VIP Lead Qualified (Score: 97%)', desc: 'Kenji Takahashi / Neo-Tokyo Sovereign', time: '1h ago', unread: true },
    { id: 3, title: 'Agreement Signed', desc: 'Aetherius Aerospace customized space shuttle fleet', time: '2h ago', unread: false },
  ];

  const messages = [
    { id: 1, sender: 'Julian Mercer', text: 'Has Alaric confirmed the custom bar designs inside the lounge?', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', time: '23m ago' },
    { id: 2, sender: 'Elena Rostova', text: 'Please prepare the offshore escrow routing for tomorrow’s launch.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', time: '2h ago' },
  ];

  return (
    <header className="sticky top-0 z-30 h-20 w-full flex items-center justify-between px-6 border-b border-white/5 bg-brand-dark/45 backdrop-blur-md">
      {/* Search & Mobile Toggle */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="md:hidden p-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search VIP accounts, contracts, leads..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold/50 focus:bg-white/10 focus:ring-1 focus:ring-luxury-gold/25 transition-all"
          />
        </div>
      </div>

      {/* Action Utilities */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-xl border border-white/5 hover:border-luxury-gold/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          title="Toggle luxury ambience theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-luxury-gold" /> : <Moon className="w-4 h-4 text-luxury-bronze" />}
        </button>

        {/* Messages Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfileDropdown(false);
            }}
            className="p-2.5 rounded-xl border border-white/5 hover:border-luxury-gold/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all relative"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-luxury-gold rounded-full ring-2 ring-brand-dark" />
          </button>

          {showMessages && (
            <div className="absolute right-0 mt-3.5 w-80 rounded-2xl glass-panel border border-white/10 p-4 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <span className="font-serif font-semibold text-white tracking-wide text-sm">Concierge Communications</span>
                <span className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold">2 New</span>
              </div>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 hover:bg-white/5 p-2 rounded-xl transition-all cursor-pointer">
                    <img src={msg.avatar} alt={msg.sender} className="w-9 h-9 rounded-full object-cover border border-luxury-gold/30" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-xs font-semibold text-white truncate">{msg.sender}</span>
                        <span className="text-[9px] text-gray-400 font-mono">{msg.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setView('dashboard');
                  setShowMessages(false);
                }}
                className="w-full mt-4 text-center text-xs text-luxury-gold font-medium hover:underline pt-2 border-t border-white/5"
              >
                Launch Communications Core
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfileDropdown(false);
            }}
            className="p-2.5 rounded-xl border border-white/5 hover:border-luxury-gold/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-luxury-gold rounded-full ring-2 ring-brand-dark animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3.5 w-80 rounded-2xl glass-panel border border-white/10 p-4 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <span className="font-serif font-semibold text-white tracking-wide text-sm">Aurelia Live Feed</span>
                <span className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold">Real-Time</span>
              </div>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-2.5 rounded-xl transition-all cursor-pointer relative ${notif.unread ? 'bg-white/5 border-l-2 border-luxury-gold' : 'hover:bg-white/5'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold text-white pr-2 leading-tight">{notif.title}</span>
                      <span className="text-[9px] text-gray-400 font-mono flex-shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-normal">{notif.desc}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setView('notifications');
                  setShowNotifications(false);
                }}
                className="w-full mt-4 text-center text-xs text-luxury-gold font-medium hover:underline pt-2 border-t border-white/5"
              >
                Launch Notification Center
              </button>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative ml-2">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
              setShowMessages(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full border border-white/5 hover:border-luxury-gold/20 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-8 h-8 rounded-full object-cover border border-luxury-gold/30"
            />
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1 hidden sm:block" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-3.5 w-64 rounded-2xl glass-panel border border-white/10 p-4 shadow-2xl z-50">
              {/* User Header */}
              <div className="flex flex-col gap-1 pb-3.5 border-b border-white/5 mb-2 text-center">
                <div className="relative mx-auto mb-2">
                  <img
                    src={CURRENT_USER.avatar}
                    alt={CURRENT_USER.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold/50 mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-luxury-gold p-0.5 rounded-full ring-2 ring-brand-dark">
                    <Crown className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
                <span className="font-serif font-bold text-white tracking-wide text-sm leading-tight">{CURRENT_USER.name}</span>
                <span className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold">{CURRENT_USER.role}</span>
              </div>

              {/* Navigation Options */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setView('settings');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all text-left"
                >
                  <UserIcon className="w-4 h-4 text-luxury-gold" />
                  <span>My Aurelia Signature</span>
                </button>
                <button
                  onClick={() => {
                    setView('settings');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all text-left"
                >
                  <Settings className="w-4 h-4 text-luxury-gold" />
                  <span>SaaS Escrow Configuration</span>
                </button>
                <button
                  onClick={() => {
                    setView('dashboard');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all text-left"
                >
                  <Activity className="w-4 h-4 text-luxury-gold" />
                  <span>Personal Security Protocol</span>
                </button>
              </div>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2 mt-3.5 text-xs rounded-xl hover:bg-red-500/10 text-red-400 transition-all text-left border-t border-white/5 pt-3"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out Securely</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
