/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Video, 
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  UserCheck,
  Award,
  Check,
  RefreshCw,
  VideoOff
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Meeting } from '../types';
import { INITIAL_MEETINGS } from '../data';

export default function CalendarView() {
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed represents January, so 5 is June)
  const [selectedDay, setSelectedDay] = useState<number>(29); // June 29, 2026

  // Filters
  const [protocolFilter, setProtocolFilter] = useState<'all' | 'virtual' | 'in_person'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'ongoing' | 'completed'>('all');

  // Meeting form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingType, setMeetingType] = useState<'virtual' | 'in_person'>('virtual');
  const [meetingDuration, setMeetingDuration] = useState('1h 00m');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(1);
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle || !clientName || !meetingTime) return;

    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    const newMeeting: Meeting = {
      id: `m-${Date.now()}`,
      title: meetingTitle,
      customerName: clientName,
      time: meetingTime,
      date: dateStr,
      type: meetingType,
      status: 'scheduled',
      duration: meetingDuration
    };

    setMeetings([newMeeting, ...meetings]);
    setMeetingTitle('');
    setClientName('');
    setMeetingTime('');
    setMeetingDuration('1h 00m');
    setShowAddModal(false);
  };

  // Quick preset dispatchers for testing convenience
  const handleQuickPreset = (preset: { title: string; client: string; time: string; type: 'virtual' | 'in_person'; duration: string }) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    const newMeeting: Meeting = {
      id: `m-${Date.now()}`,
      title: preset.title,
      customerName: preset.client,
      time: preset.time,
      date: dateStr,
      type: preset.type,
      status: 'scheduled',
      duration: preset.duration
    };

    setMeetings([newMeeting, ...meetings]);
  };

  // Meeting Status Advancement
  const advanceMeetingStatus = (id: string, nextStatus: Meeting['status']) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: nextStatus } : m));
  };

  const totalDays = daysInMonth(currentYear, currentMonth);
  const startOffset = firstDayOfMonth(currentYear, currentMonth);

  // Generate calendar cells
  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    cells.push(i);
  }

  // Get active day meetings with active filters
  const getSelectedDateStr = () => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    return `${currentYear}-${formattedMonth}-${formattedDay}`;
  };

  const selectedDateStr = getSelectedDateStr();

  // Filter criteria logic
  const dayMeetingsFiltered = meetings.filter((m) => {
    const dateMatch = m.date === selectedDateStr;
    const protocolMatch = protocolFilter === 'all' || m.type === protocolFilter;
    const statusMatch = statusFilter === 'all' || m.status === statusFilter;
    return dateMatch && protocolMatch && statusMatch;
  });

  const checkDayHasMeeting = (dayNum: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    const dateCheck = `${currentYear}-${formattedMonth}-${formattedDay}`;
    return meetings.some((m) => m.date === dateCheck);
  };

  const getMeetingCountByStatus = (status: Meeting['status']) => {
    return meetings.filter(m => m.status === status).length;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Operations Scheduling</span>
          <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">Sovereign Synchronizations</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold tracking-wider font-mono shadow-lg shadow-luxury-gold/15 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>SCHEDULE BOARD SYNC</span>
          </button>
        </div>
      </div>

      {/* QUICK STATS CARDS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Aggregate Meetings</span>
            <span className="text-xl font-serif font-bold text-white mt-1 block">{meetings.length}</span>
          </div>
          <CalendarIcon className="w-4 h-4 text-luxury-gold" />
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Active Scheduled</span>
            <span className="text-xl font-serif font-bold text-luxury-gold mt-1 block">{getMeetingCountByStatus('scheduled')}</span>
          </div>
          <Clock className="w-4 h-4 text-luxury-gold" />
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Live In Progress</span>
            <span className="text-xl font-serif font-bold text-red-400 mt-1 block animate-pulse">{getMeetingCountByStatus('ongoing')}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Settled & Completed</span>
            <span className="text-xl font-serif font-bold text-emerald-400 mt-1 block">{getMeetingCountByStatus('completed')}</span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* MAIN LAYOUT SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: THE DETAILED CALENDAR UI */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard className="p-6">
            
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-luxury-gold" />
                <h2 className="text-xl font-serif text-white tracking-wide">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevMonth}
                  className="p-2 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setCurrentMonth(5);
                    setCurrentYear(2026);
                    setSelectedDay(29);
                  }}
                  className="px-3 py-1.5 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-[10px] uppercase font-mono tracking-wider text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  Reset To June
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] uppercase tracking-widest text-gray-500 font-mono font-bold mb-4">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Grid Cells */}
            <div className="grid grid-cols-7 gap-2.5">
              {cells.map((dayNum, idx) => {
                if (dayNum === null) {
                  return <div key={`empty-${idx}`} className="aspect-square bg-transparent" />;
                }

                const isActive = selectedDay === dayNum;
                const hasMeetings = checkDayHasMeeting(dayNum);

                return (
                  <button
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`
                      aspect-square rounded-xl flex flex-col justify-between p-2.5 border transition-all relative cursor-pointer
                      ${isActive 
                        ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold border-luxury-gold text-black shadow-lg shadow-luxury-gold/15 font-semibold' 
                        : 'border-white/5 bg-white/[0.01] text-gray-300 hover:bg-white/5 hover:border-white/10'
                      }
                    `}
                  >
                    <span className="text-xs font-mono font-medium">{dayNum}</span>
                    {hasMeetings && (
                      <span className={`w-1.5 h-1.5 rounded-full mx-auto ${isActive ? 'bg-black' : 'bg-luxury-gold'} animate-pulse`} />
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* PRESENTS & PRESETS CHEAT SHEET */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
              <Sparkles className="w-4 h-4 text-luxury-gold" />
              <h3 className="text-xs uppercase tracking-wider font-mono text-white">VIP Sync Dispatcher Presets</h3>
            </div>
            <p className="text-[11px] text-gray-400 font-light mb-4">
              Instantly schedule pre-structured VIP sovereign presentations on the active selected date for verification and testing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Rostov Escrow Review', client: 'Elena Rostova', time: '11:00 AM - 12:00 PM', type: 'virtual' as const, duration: '1h 00m' },
                { title: 'Aetherius Steering Sync', client: 'Lord Sterling Thorne', time: '1:30 PM - 3:00 PM', type: 'in_person' as const, duration: '1h 30m' },
                { title: 'Neo-Tokyo Suitability', client: 'Kenji Takahashi', time: '4:00 PM - 5:00 PM', type: 'virtual' as const, duration: '1h 00m' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPreset(preset)}
                  className="p-3 text-left rounded-xl bg-white/5 border border-white/5 hover:border-luxury-gold/30 hover:bg-white/10 text-xs transition-all space-y-1 group"
                >
                  <span className="font-bold text-white block group-hover:text-luxury-gold transition-colors">{preset.title}</span>
                  <span className="text-[10px] text-gray-400 block font-mono">{preset.time}</span>
                  <span className="text-[9px] text-gray-500 block uppercase font-mono tracking-wider">{preset.type === 'virtual' ? 'Virtual Sync' : 'Mayfair Room'}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE MEETING CARDS & TIMELINE */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-6">
            <div className="pb-4 border-b border-white/5 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono">Dossier Briefing</span>
              <h3 className="text-lg font-serif text-white mt-0.5">
                Day Schedule ({monthNames[currentMonth]} {selectedDay})
              </h3>
            </div>

            {/* PROTOCOL FILTER SELECTION BAR */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-black/25 rounded-xl border border-white/5 mb-6">
              {(['all', 'virtual', 'in_person'] as const).map((pf) => (
                <button
                  key={pf}
                  onClick={() => setProtocolFilter(pf)}
                  className={`py-1.5 text-[9px] uppercase tracking-widest font-mono rounded-lg transition-all ${
                    protocolFilter === pf 
                      ? 'bg-luxury-gold text-black font-bold' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {pf === 'in_person' ? 'In-Person' : pf}
                </button>
              ))}
            </div>

            {/* ACTIVE LIST OF INTERACTIVE MEETING CARDS */}
            <div className="space-y-4">
              {dayMeetingsFiltered.length > 0 ? (
                dayMeetingsFiltered.map((meeting) => (
                  <div 
                    key={meeting.id} 
                    className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-luxury-gold/20 transition-all space-y-3 relative overflow-hidden"
                  >
                    {/* Visual indicators for ongoing meetings */}
                    {meeting.status === 'ongoing' && (
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-red-500 via-luxury-gold to-green-500 animate-pulse" />
                    )}

                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-white block pr-2 leading-tight">
                          {meeting.title}
                        </span>
                        <span className={`text-[8px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md ${
                          meeting.status === 'ongoing' 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                            : meeting.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-white/5 text-gray-400 border border-white/5'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium block">
                        VIP Client: {meeting.customerName}
                      </span>
                    </div>

                    <div className="space-y-2 text-[10px] text-gray-400 font-mono border-t border-white/5 pt-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-luxury-gold/70" />
                        <span>{meeting.time} ({meeting.duration})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {meeting.type === 'virtual' ? (
                          <>
                            <Video className="w-3.5 h-3.5 text-luxury-gold/70" />
                            <span className="text-cyan-400 underline cursor-pointer">Sovereign Secure Link</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-luxury-gold/70" />
                            <span>Executive Boardroom / Mayfair Room</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* STATUS ACTION BAR TO ADVANCE THE MEETING STATUS */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1.5">
                      <span className="text-[8px] uppercase tracking-wider text-gray-500 font-mono font-medium">Advance State</span>
                      <div className="flex gap-1.5">
                        {meeting.status === 'scheduled' && (
                          <button
                            onClick={() => advanceMeetingStatus(meeting.id, 'ongoing')}
                            className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-[9px] uppercase font-mono tracking-widest text-red-400 border border-red-500/10"
                          >
                            Go Live
                          </button>
                        )}
                        {meeting.status === 'ongoing' && (
                          <button
                            onClick={() => advanceMeetingStatus(meeting.id, 'completed')}
                            className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-[9px] uppercase font-mono tracking-widest text-emerald-400 border border-emerald-500/10"
                          >
                            Finalize
                          </button>
                        )}
                        {meeting.status !== 'completed' && (
                          <button
                            onClick={() => advanceMeetingStatus(meeting.id, 'completed')}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                            title="Complete Sync"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setMeetings(meetings.filter(m => m.id !== meeting.id));
                          }}
                          className="px-2 py-1 rounded bg-white/5 hover:bg-red-500/10 text-[9px] uppercase font-mono text-gray-400 hover:text-red-400"
                          title="Cancel meeting"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 border border-dashed border-white/5 rounded-xl bg-white/[0.01]">
                  <span className="text-xs text-gray-500 font-light font-mono block mb-1">No synchronizations fit the criteria.</span>
                  <span className="text-[10px] text-gray-600 block">Use the Dispatcher Presets below to quickly schedule test meetings.</span>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* SCHEDULE BOARD SYNC MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel border border-white/10 rounded-2xl p-8 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono block">Executive Office</span>
                <h2 className="font-serif text-xl text-white mt-1">Schedule Board Meeting</h2>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs px-2.5 py-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Meeting Title</label>
                <input 
                  type="text" 
                  required 
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="e.g. Bespoke Yacht Escrow Signoff" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">VIP Client / Target Entity</label>
                <input 
                  type="text" 
                  required 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Rostov Sovereign Capital" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Meeting Time</label>
                  <input 
                    type="text" 
                    required 
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    placeholder="e.g. 2:00 PM - 3:00 PM" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Duration</label>
                  <input 
                    type="text" 
                    required 
                    value={meetingDuration}
                    onChange={(e) => setMeetingDuration(e.target.value)}
                    placeholder="e.g. 1h 00m" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-2">Meeting Protocol</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMeetingType('virtual')}
                    className={`py-2.5 text-xs font-semibold rounded-xl border uppercase tracking-wider transition-all ${
                      meetingType === 'virtual' 
                        ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold border-luxury-gold text-black shadow-lg shadow-luxury-gold/15' 
                        : 'border-white/10 hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    Sovereign Virtual Sync
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType('in_person')}
                    className={`py-2.5 text-xs font-semibold rounded-xl border uppercase tracking-wider transition-all ${
                      meetingType === 'in_person' 
                        ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold border-luxury-gold text-black shadow-lg shadow-luxury-gold/15' 
                        : 'border-white/10 hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    Mayfair Boardroom
                  </button>
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-white/5 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-xs hover:bg-white/10 text-gray-300"
                >
                  Dismiss
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10"
                >
                  Authorize Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
