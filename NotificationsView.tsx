/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  Clock, 
  Plus, 
  Info,
  Calendar,
  X,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: 'deal' | 'suitability' | 'task' | 'system';
  unread: boolean;
  amount?: string;
  officer?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'deal' | 'suitability' | 'task' | 'system';
  description: string;
  officer?: string;
  status: 'completed' | 'ongoing' | 'scheduled';
}

export default function NotificationsView() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { 
      id: 'notif-1', 
      title: 'CHF 250,000 Transferred', 
      desc: 'Rostov Sovereign Capital wire successfully settled in Geneva physical secure vaults.', 
      time: '10 minutes ago', 
      category: 'deal', 
      unread: true, 
      amount: 'CHF 250,000',
      officer: 'Lady Arabella Sterling'
    },
    { 
      id: 'notif-2', 
      title: 'VIP Lead Qualified (Score: 97%)', 
      desc: 'Kenji Takahashi / Neo-Tokyo Sovereign passed rigorous compliance framework screening.', 
      time: '1 hour ago', 
      category: 'suitability', 
      unread: true,
      officer: 'Charles Montgomery'
    },
    { 
      id: 'notif-3', 
      title: 'Suborbital Space Shuttle Contract Signed', 
      desc: 'Aetherius Aerospace customized fleet delivery has been authenticated and sealed.', 
      time: '2 hours ago', 
      category: 'deal', 
      unread: false, 
      amount: '$1,200,000',
      officer: 'Charles Montgomery'
    },
    { 
      id: 'notif-4', 
      title: 'Stewardship Directive Assigned', 
      desc: 'New task assigned to Victoria Sinclair: Meticulously audit Rostov safe deposit Escrow guidelines.', 
      time: '4 hours ago', 
      category: 'task', 
      unread: false,
      officer: 'Victoria Sinclair'
    },
    { 
      id: 'notif-5', 
      title: 'Biometric Encryption Protocol Upgraded', 
      desc: 'Client-facing vault portal communications have transitioned to quantum keys.', 
      time: '1 day ago', 
      category: 'system', 
      unread: false,
      officer: 'Julian Drake'
    }
  ]);

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: 'event-1',
      title: 'Rostov Sovereign Capital Wire Settlement',
      date: '2026-07-01',
      time: '10:40 AM',
      category: 'deal',
      description: 'Physical bullion vault wire finalized. Geneva compliance approved and logged into decentralized trust register.',
      officer: 'Lady Arabella Sterling',
      status: 'completed'
    },
    {
      id: 'event-2',
      title: 'Neo-Tokyo Sovereign Suitability Check Passed',
      date: '2026-07-01',
      time: '09:15 AM',
      category: 'suitability',
      description: 'Kenji Takahashi’s private offshore holdings underwent rigorous cross-border taxation scanning.',
      officer: 'Charles Montgomery',
      status: 'completed'
    },
    {
      id: 'event-3',
      title: 'Aetherius Aerospace Fleet Deployment Sign-off',
      date: '2026-06-30',
      time: '04:50 PM',
      category: 'deal',
      description: 'Client finalized customized cockpit cabin details and authorized Zurich escrow transfer of $1.2M.',
      officer: 'Charles Montgomery',
      status: 'completed'
    },
    {
      id: 'event-4',
      title: 'Quantum Key Security Deployment',
      date: '2026-06-30',
      time: '08:00 AM',
      category: 'system',
      description: 'Upgraded Aurelia multi-tier communication layer to reject standard legacy RSA certificates.',
      officer: 'Julian Drake',
      status: 'completed'
    },
    {
      id: 'event-5',
      title: 'Audit Rostov Physical Safe-Deposit Escrow',
      date: '2026-07-01',
      time: '02:00 PM',
      category: 'task',
      description: 'Victoria Sinclair executing random physical inventory audits at our London vaults.',
      officer: 'Victoria Sinclair',
      status: 'ongoing'
    },
    {
      id: 'event-6',
      title: 'Monaco Harbor Berth Leasing Sign-off',
      date: '2026-07-04',
      time: '11:00 AM',
      category: 'deal',
      description: 'Scheduled signature of luxury 90m superyacht mooring lease with VIP sovereign representative.',
      officer: 'Marcus Hawthorne',
      status: 'scheduled'
    }
  ]);

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'deal' | 'suitability' | 'task' | 'system'>('all');
  const [showAddNotificationModal, setShowAddNotificationModal] = useState(false);

  // Form states for dispatching a simulated notification
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'deal' | 'suitability' | 'task' | 'system'>('deal');
  const [newAmount, setNewAmount] = useState('');
  const [newOfficer, setNewOfficer] = useState('');

  // Handle marking notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  // Handle delete notification
  const handleDeleteNotif = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  // Dispatch custom notification
  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: newTitle,
      desc: newDesc,
      time: 'Just now',
      category: newCategory,
      unread: true,
      amount: newAmount || undefined,
      officer: newOfficer || undefined
    };

    const newEvent: TimelineEvent = {
      id: `event-${Date.now()}`,
      title: newTitle,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: newCategory,
      description: newDesc,
      officer: newOfficer || undefined,
      status: 'completed'
    };

    setNotifications([newNotif, ...notifications]);
    setTimelineEvents([newEvent, ...timelineEvents]);

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewCategory('deal');
    setNewAmount('');
    setNewOfficer('');
    setShowAddNotificationModal(false);
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(n => activeCategoryFilter === 'all' || n.category === activeCategoryFilter);

  // Helper styles for categories
  const getCategoryTheme = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'deal':
        return {
          icon: <Award className="w-4 h-4 text-emerald-400" />,
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          indicator: 'bg-emerald-500'
        };
      case 'suitability':
        return {
          icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
          bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
          indicator: 'bg-cyan-500'
        };
      case 'task':
        return {
          icon: <Clock className="w-4 h-4 text-luxury-gold" />,
          bg: 'bg-luxury-gold/10 border-luxury-gold/20 text-luxury-gold',
          indicator: 'bg-luxury-gold'
        };
      default:
        return {
          icon: <ShieldAlert className="w-4 h-4 text-purple-400" />,
          bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
          indicator: 'bg-purple-500'
        };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Operations Monitoring</span>
          <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">Notification & Audit Logs</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-mono"
          >
            Mark All As Read
          </button>
          <button
            onClick={() => setShowAddNotificationModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold tracking-wider font-mono shadow-lg shadow-luxury-gold/15"
          >
            <Plus className="w-4 h-4" />
            <span>DISPATCH NOTIFICATION</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left = Notification Panel, Right = Timeline Design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Filterable Notification Panel */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="p-6">
            
            {/* Panel Header & Category Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-luxury-gold" />
                <h3 className="text-lg font-serif text-white">Live Operations Feed</h3>
                <span className="bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {notifications.filter(n => n.unread).length} Unread
                </span>
              </div>

              {/* Pill Categories Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['all', 'deal', 'suitability', 'task', 'system'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-widest rounded-lg border transition-all ${
                      activeCategoryFilter === cat
                        ? 'bg-luxury-gold border-luxury-gold text-black font-semibold'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Notification Cards */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 select-none">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => {
                  const themeInfo = getCategoryTheme(notif.category);
                  return (
                    <div 
                      key={notif.id}
                      onClick={() => handleMarkAsRead(notif.id)}
                      className={`p-4 rounded-xl border transition-all relative flex gap-4 items-start cursor-pointer hover:border-luxury-gold/30 ${
                        notif.unread 
                          ? 'bg-white/[0.03] border-white/10 shadow-lg' 
                          : 'bg-white/[0.01] border-white/5 opacity-80'
                      }`}
                    >
                      {/* Unread indicator dot */}
                      {notif.unread && (
                        <div className={`absolute left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-r-md ${themeInfo.indicator}`} />
                      )}

                      {/* Category icon container */}
                      <div className={`p-2.5 rounded-xl border flex-shrink-0 ${themeInfo.bg}`}>
                        {themeInfo.icon}
                      </div>

                      {/* Notification details */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex justify-between items-start gap-2">
                          <span className={`text-sm font-semibold transition-colors ${notif.unread ? 'text-white' : 'text-gray-300'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[9px] text-gray-500 font-mono font-medium flex-shrink-0">
                            {notif.time}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          {notif.desc}
                        </p>

                        {/* Metadata badges for VIP CRM tracking */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {notif.amount && (
                            <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/15">
                              Volume: {notif.amount}
                            </span>
                          )}
                          {notif.officer && (
                            <span className="text-[9px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded-full border border-white/5">
                              Officer: {notif.officer}
                            </span>
                          )}
                          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                            {notif.category}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {notif.unread && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(notif.id);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-luxury-gold border border-white/5"
                            title="Mark as Read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotif(notif.id);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 border border-white/5"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 border border-dashed border-white/5 rounded-xl bg-white/[0.01]">
                  <span className="font-serif italic text-sm text-gray-500">No logs matching selection in active system cache.</span>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Right column: Interactive Timeline Design */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6">
            <div className="pb-4 border-b border-white/5 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Historical Ledger</span>
              <h3 className="text-lg font-serif text-white mt-0.5">Chronological Audit Timeline</h3>
            </div>

            {/* Vertical Timeline component */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
              {timelineEvents.map((event) => {
                const getEventStatusStyle = (st: string) => {
                  switch (st) {
                    case 'completed':
                      return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
                    case 'ongoing':
                      return 'bg-amber-500/20 border-amber-500/50 text-amber-400 animate-pulse';
                    default:
                      return 'bg-white/10 border-white/20 text-gray-400';
                  }
                };

                return (
                  <div key={event.id} className="relative group">
                    {/* Circle Bullet Pointer */}
                    <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-brand-dark border-2 border-luxury-gold group-hover:scale-125 transition-transform z-10" />

                    {/* Timeline Event Detail */}
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-xs font-bold text-white leading-snug">
                          {event.title}
                        </span>
                        <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-md border ${getEventStatusStyle(event.status)}`}>
                          {event.status}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                        {event.description}
                      </p>

                      <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono pt-2 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {event.date} — {event.time}
                        </span>
                        {event.officer && (
                          <span className="text-luxury-gold">
                            By: {event.officer}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

      </div>

      {/* DISPATCH NOTIFICATION MODAL */}
      {showAddNotificationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel border border-white/10 rounded-2xl p-8 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono block">Aurelia Control Center</span>
                <h2 className="font-serif text-xl text-white mt-1">Dispatch Simulated Alert</h2>
              </div>
              <button 
                onClick={() => setShowAddNotificationModal(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs px-2.5 py-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateNotification} className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Alert Title</label>
                <input 
                  type="text" 
                  required 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Monaco Mooring Escrow Deposited" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Details & Description</label>
                <textarea 
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Insert secure logistics audit detail line." 
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-luxury-gold/50 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Responsible Officer</label>
                  <input 
                    type="text" 
                    value={newOfficer}
                    onChange={(e) => setNewOfficer(e.target.value)}
                    placeholder="e.g. Marcus Hawthorne" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Deal Volume (Optional)</label>
                  <input 
                    type="text" 
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="e.g. $450,000" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-2">Operation Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'deal', label: 'Deal Volume' },
                    { value: 'suitability', label: 'Compliance' },
                    { value: 'task', label: 'Directive' },
                    { value: 'system', label: 'Vault Sec' }
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setNewCategory(item.value as any)}
                      className={`py-2 text-[10px] uppercase tracking-wider font-mono font-semibold rounded-xl border transition-all ${
                        newCategory === item.value 
                          ? 'bg-luxury-gold border-luxury-gold text-black' 
                          : 'border-white/10 text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-white/5 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddNotificationModal(false)}
                  className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-xs hover:bg-white/10 text-gray-300"
                >
                  Dismiss
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10"
                >
                  Dispatch Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
