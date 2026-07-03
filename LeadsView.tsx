/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  DollarSign, 
  Zap, 
  User, 
  ArrowRightLeft, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  Sliders,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Grid,
  Table,
  Globe,
  Building,
  Calendar,
  X,
  ChevronDown,
  Mail
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Lead } from '../types';

interface LeadsViewProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const STAGES = [
  { id: 'new' as const, label: 'New Lead', color: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
  { id: 'qualified' as const, label: 'Qualified', color: 'border-purple-500/20 text-purple-400 bg-purple-500/5' },
  { id: 'proposal' as const, label: 'Proposal', color: 'border-amber-500/20 text-amber-400 bg-amber-500/5' },
  { id: 'negotiation' as const, label: 'Negotiation', color: 'border-orange-500/20 text-orange-400 bg-orange-500/5' },
  { id: 'won' as const, label: 'Closed Won', color: 'border-green-500/20 text-green-400 bg-green-500/5' },
  { id: 'lost' as const, label: 'Closed Lost', color: 'border-red-500/20 text-red-400 bg-red-500/5' }
];

export default function LeadsView({ leads, setLeads }: LeadsViewProps) {
  const [showAddLead, setShowAddLead] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  
  // Table search & filter states
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Selected lead for quick view profile card
  const [selectedQuickId, setSelectedQuickId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState<Lead['stage']>('new');
  const [priority, setPriority] = useState<Lead['priority']>('medium');
  const [score, setScore] = useState(85);

  // Reset page when searches/filters modify
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedStage, selectedPriority]);

  // Handle default selected quick view lead
  useEffect(() => {
    const filtered = leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesStage = selectedStage === 'All' || lead.stage === selectedStage;
      const matchesPriority = selectedPriority === 'All' || lead.priority === selectedPriority;

      return matchesSearch && matchesStage && matchesPriority;
    });

    if (filtered.length > 0) {
      if (!selectedQuickId || !filtered.some(l => l.id === selectedQuickId)) {
        setSelectedQuickId(filtered[0].id);
      }
    } else {
      setSelectedQuickId(null);
    }
  }, [leads, search, selectedStage, selectedPriority, selectedQuickId]);

  // Leads Filtering
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStage = selectedStage === 'All' || lead.stage === selectedStage;
    const matchesPriority = selectedPriority === 'All' || lead.priority === selectedPriority;

    return matchesSearch && matchesStage && matchesPriority;
  });

  // Pagination calculations
  const totalItems = filteredLeads.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email || !value) return;

    const val = parseFloat(value);
    if (isNaN(val)) return;

    const newLead: Lead = {
      id: `l-${Date.now()}`,
      name,
      company,
      email,
      value: val,
      stage,
      priority,
      score: Math.min(100, Math.max(0, score)),
      owner: 'Sterling Thorne',
      lastContacted: 'Just now'
    };

    setLeads([newLead, ...leads]);
    setName('');
    setCompany('');
    setEmail('');
    setValue('');
    setStage('new');
    setPriority('medium');
    setScore(85);
    setShowAddLead(false);
    setSelectedQuickId(newLead.id);
  };

  const handleMoveStage = (leadId: string, newStage: Lead['stage']) => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return { ...l, stage: newStage, lastContacted: 'Just now' };
      }
      return l;
    });
    setLeads(updated);
  };

  const handleDeleteLead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this prospect lead?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      if (selectedQuickId === id) {
        setSelectedQuickId(updated[0]?.id || null);
      }
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/15';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/15';
      default:
        return 'text-gray-400 bg-white/5 border-white/5';
    }
  };

  const getStageLabel = (stageId: string) => {
    return STAGES.find(s => s.id === stageId)?.label || stageId;
  };

  const quickLead = leads.find(l => l.id === selectedQuickId);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Sales Pipelines</span>
          <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">Sovereign Deal Board</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-luxury-gold text-black' : 'text-gray-400 hover:text-white'
              }`}
              title="Table view"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'kanban' ? 'bg-luxury-gold text-black' : 'text-gray-400 hover:text-white'
              }`}
              title="Kanban Board view"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowAddLead(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold tracking-wider shadow-lg shadow-luxury-gold/15 cursor-pointer font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>ADD PROSPECT</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search prospect or firm name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold/40 focus:bg-white/10 transition-all font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Stage Filter */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
            <Sliders className="w-3.5 h-3.5 text-luxury-gold" />
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium font-mono"
            >
              <option value="All" className="bg-brand-dark">All Stages</option>
              {STAGES.map(s => (
                <option key={s.id} value={s.id} className="bg-brand-dark">{s.label}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
            <Filter className="w-3.5 h-3.5 text-luxury-gold" />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium font-mono"
            >
              <option value="All" className="bg-brand-dark">All Priorities</option>
              <option value="high" className="bg-brand-dark">High</option>
              <option value="medium" className="bg-brand-dark">Medium</option>
              <option value="low" className="bg-brand-dark">Low</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* SPLIT LAYOUT FOR LEADS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Area: Kanban or Modern Data Table (Left Col) */}
        <div className={`${(quickLead && viewMode === 'table') ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6 w-full min-w-0`}>
          {viewMode === 'table' ? (
            /* DATA TABLE VIEW */
            <GlassCard className="overflow-hidden p-0 border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Prospect / Firm</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Target Value</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Pipeline Stage</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Priority</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold text-center">Score</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedLeads.length > 0 ? (
                      paginatedLeads.map((lead) => (
                        <tr 
                          key={lead.id}
                          onClick={() => setSelectedQuickId(lead.id)}
                          className={`group hover:bg-white/[0.03] transition-colors cursor-pointer ${
                            selectedQuickId === lead.id ? 'bg-luxury-gold/[0.04]' : ''
                          }`}
                        >
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold font-bold font-serif">
                                {lead.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <span className="font-serif text-sm font-semibold text-white group-hover:text-luxury-gold transition-colors block truncate">
                                  {lead.name}
                                </span>
                                <span className="text-[11px] text-gray-400 block truncate font-mono">
                                  {lead.company}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap">
                            <span className="text-sm font-serif font-bold text-luxury-gold font-mono">
                              {lead.value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap">
                            <select
                              value={lead.stage}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleMoveStage(lead.id, e.target.value as any)}
                              className="bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-luxury-gold/50 cursor-pointer font-medium font-mono"
                            >
                              {STAGES.map((s) => (
                                <option key={s.id} value={s.id} className="bg-brand-dark">
                                  {s.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap">
                            <span className={`text-[9px] px-2.5 py-1 rounded-full border font-mono tracking-wider font-semibold uppercase ${getPriorityColor(lead.priority)}`}>
                              {lead.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 text-center whitespace-nowrap">
                            <span className="text-xs font-mono font-bold bg-white/5 border border-white/5 px-2 py-0.5 rounded-lg text-luxury-gold flex items-center justify-center gap-1 mx-auto w-16">
                              <Zap className="w-2.5 h-2.5" />
                              {lead.score}%
                            </span>
                          </td>
                          <td className="px-6 py-4.5">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => handleDeleteLead(lead.id, e)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-gray-500 transition-all"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-20 bg-transparent">
                          <span className="font-serif italic text-sm text-gray-400">No sales prospects match query.</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* SOVEREIGN PAGINATION CONTROLS */}
              <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-gray-400 font-mono">
                  Showing <span className="text-white font-bold">{startIndex + 1}</span> to{' '}
                  <span className="text-white font-bold">{Math.min(startIndex + pageSize, totalItems)}</span> of{' '}
                  <span className="text-white font-bold">{totalItems}</span> prospects
                </div>

                <div className="flex items-center gap-3">
                  {/* Page size select */}
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono">
                    <span>Page Size:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="bg-brand-dark border border-white/10 rounded-lg px-2 py-1 text-white text-[11px] focus:outline-none"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                          currentPage === i + 1
                            ? 'bg-luxury-gold text-black font-bold'
                            : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ) : (
            /* KANBAN PIPELINE BOARD VIEW */
            <div className="overflow-x-auto no-scrollbar pb-6">
              <div className="flex gap-6 min-w-[1200px] h-[70vh] items-stretch">
                {STAGES.map((col) => {
                  const stageLeads = filteredLeads.filter((l) => l.stage === col.id);
                  const totalValue = stageLeads.reduce((acc, l) => acc + l.value, 0);

                  return (
                    <div 
                      key={col.id} 
                      className="flex-1 min-w-[280px] bg-brand-panel/30 rounded-2xl border border-white/5 p-4 flex flex-col justify-between"
                    >
                      {/* Column Header */}
                      <div>
                        <div className={`flex items-center justify-between p-3 rounded-xl border mb-3 ${col.color}`}>
                          <span className="text-xs uppercase tracking-wider font-semibold font-sans">{col.label}</span>
                          <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded-full font-bold">
                            {stageLeads.length}
                          </span>
                        </div>
                        
                        {/* Valuation summary */}
                        <div className="px-3 pb-4 mb-4 border-b border-white/5 flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-mono">Deal Volume</span>
                          <span className="font-serif text-luxury-gold font-semibold font-mono">
                            {totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </span>
                        </div>

                        {/* List of Leads */}
                        <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-1.5 no-scrollbar">
                          {stageLeads.length > 0 ? (
                            stageLeads.map((lead) => (
                              <div 
                                key={lead.id} 
                                onClick={() => setSelectedQuickId(lead.id)}
                                className={`p-4 rounded-xl transition-all group relative cursor-pointer border ${
                                  selectedQuickId === lead.id 
                                    ? 'border-luxury-gold ring-1 ring-luxury-gold/15 bg-luxury-gold/[0.03]' 
                                    : 'bg-white/[0.02] border-white/5 hover:border-luxury-gold/25'
                                }`}
                              >
                                {/* Score and Priority badges */}
                                <div className="flex items-center justify-between mb-3">
                                  <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${getPriorityColor(lead.priority)}`}>
                                    {lead.priority} priority
                                  </span>
                                  <span className="text-[9px] text-luxury-gold bg-luxury-gold/5 border border-luxury-gold/15 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                                    <Zap className="w-2.5 h-2.5" />
                                    {lead.score}%
                                  </span>
                                </div>

                                <div className="space-y-0.5 mb-4">
                                  <span className="text-xs font-bold text-white block group-hover:text-luxury-gold transition-colors">
                                    {lead.name}
                                  </span>
                                  <span className="text-[10px] text-gray-400 block leading-tight font-medium">
                                    {lead.company}
                                  </span>
                                </div>

                                {/* Valuation */}
                                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[11px]">
                                  <div className="flex items-center gap-1 text-gray-400">
                                    <User className="w-3 h-3 text-luxury-gold" />
                                    <span className="truncate max-w-[100px] font-mono text-[9px]">{lead.owner}</span>
                                  </div>
                                  <span className="font-serif text-luxury-gold font-bold font-mono">
                                    {lead.value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                                  </span>
                                </div>

                                {/* Quick movement selectors */}
                                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3 text-[10px]" onClick={e => e.stopPropagation()}>
                                  <span className="text-gray-500 font-mono">Move stage</span>
                                  <select
                                    value={lead.stage}
                                    onChange={(e) => handleMoveStage(lead.id, e.target.value as any)}
                                    className="bg-black/35 border border-white/10 rounded-lg px-2 py-1 text-[9px] text-white focus:outline-none focus:border-luxury-gold/40 cursor-pointer font-medium"
                                  >
                                    {STAGES.map((s) => (
                                      <option key={s.id} value={s.id} className="bg-brand-dark">
                                        {s.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-12 border border-dashed border-white/5 rounded-xl">
                              <span className="text-[10px] text-gray-600 font-mono">Pipeline vacant</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quick Lead Dossier Profile Card */}
        {quickLead && viewMode === 'table' && (
          <div className="lg:col-span-4 w-full">
            <GlassCard className="relative overflow-hidden p-6 border border-white/10 space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono font-bold block">
                  Lead Quick Dossier
                </span>
                <button
                  onClick={() => setSelectedQuickId(null)}
                  className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/15 transition-all"
                  title="Close dossier summary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Profile Card Header */}
              <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold font-serif text-3xl font-bold shadow-md">
                  {quickLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white font-bold tracking-wide">
                    {quickLead.name}
                  </h3>
                  <span className="text-xs text-gray-400 block font-medium">
                    {quickLead.company}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <span className={`text-[8px] uppercase tracking-wider font-bold border px-2.5 py-0.5 rounded-full font-mono ${getPriorityColor(quickLead.priority)}`}>
                    {quickLead.priority} priority
                  </span>
                  <span className="text-[8px] uppercase tracking-wider font-bold border border-luxury-gold/20 bg-luxury-gold/5 text-luxury-gold px-2.5 py-0.5 rounded-full font-mono">
                    {getStageLabel(quickLead.stage)}
                  </span>
                </div>
              </div>

              {/* Stats & score */}
              <div className="space-y-4 text-xs">
                {/* Close Score Indicator */}
                <div className="space-y-2 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500 uppercase">Close Probability Suitability</span>
                    <span className="text-luxury-gold font-bold">{quickLead.score}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-luxury-bronze to-luxury-gold h-full rounded-full transition-all duration-500"
                      style={{ width: `${quickLead.score}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 text-gray-400">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-gray-500">Target Value</span>
                    <span className="text-luxury-gold font-bold font-mono text-sm">
                      {quickLead.value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-gray-500">Lead Owner</span>
                    <span className="text-white">{quickLead.owner}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-gray-500">Last Contacted</span>
                    <span className="text-white">{quickLead.lastContacted}</span>
                  </div>
                </div>

                <div className="space-y-2.5 border-t border-white/5 pt-4">
                  <a href={`mailto:${quickLead.email}`} className="flex items-center gap-2.5 text-gray-300 hover:text-luxury-gold transition-colors font-mono text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-luxury-gold/70" />
                    <span className="truncate">{quickLead.email}</span>
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-white/5 pt-4 flex gap-3">
                <a
                  href={`mailto:${quickLead.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold font-mono shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>SEND SECURE MAIL</span>
                </a>
              </div>
            </GlassCard>
          </div>
        )}
      </div>

      {/* ADD STRATEGIC PROSPECT MODAL */}
      {showAddLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel border border-white/10 rounded-2xl p-8 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono block">Executive Entry</span>
                <h2 className="font-serif text-2xl text-white mt-1">Register Strategic Prospect</h2>
              </div>
              <button 
                onClick={() => setShowAddLead(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs px-2.5 py-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Contact Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kenji Takahashi" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Target Firm</label>
                  <input 
                    type="text" 
                    required 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Neo-Tokyo Sovereign Fund" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Secure Contact Email</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. takahashi@neo-tokyo.org" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Asset Valuation Estimate (USD)</label>
                  <input 
                    type="number" 
                    required 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="e.g. 1500000" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Registry Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    {STAGES.map((s) => (
                      <option key={s.id} value={s.id} className="bg-brand-dark">
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Close Probability Score (0-100)</label>
                  <input 
                    type="number" 
                    required 
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-2">Lead Priority</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 text-[10px] uppercase tracking-wider font-semibold border rounded-lg transition-all ${
                        priority === p 
                          ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold border-luxury-gold text-black font-mono' 
                          : 'border-white/10 hover:bg-white/5 text-gray-300 font-mono'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-white/5 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddLead(false)}
                  className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-xs hover:bg-white/10 text-gray-300"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10"
                >
                  Commit Prospect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
