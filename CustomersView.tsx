/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Crown, 
  MapPin, 
  Mail, 
  Phone, 
  DollarSign, 
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  SlidersHorizontal,
  ExternalLink,
  Eye,
  Trash2,
  Grid,
  Table,
  Globe,
  Building,
  Calendar,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Customer, ViewType } from '../types';

interface CustomersViewProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  setView: (view: ViewType) => void;
  setSelectedCustomer: (customer: Customer) => void;
  theme?: 'dark' | 'light';
}

export default function CustomersView({
  customers,
  setCustomers,
  setView,
  setSelectedCustomer,
  theme = 'dark'
}: CustomersViewProps) {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Quick Profile Card state
  const [selectedQuickId, setSelectedQuickId] = useState<string | null>(null);

  // Form states for adding customer
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tier, setTier] = useState<'Diamond' | 'Platinum' | 'Gold'>('Platinum');
  const [country, setCountry] = useState('United Kingdom');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');

  // Reset pagination on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedTier, selectedStatus]);

  // Set default quick view customer
  useEffect(() => {
    const filtered = customers.filter((cust) => {
      const matchesSearch = 
        cust.name.toLowerCase().includes(search.toLowerCase()) ||
        cust.company.toLowerCase().includes(search.toLowerCase()) ||
        cust.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesTier = selectedTier === 'All' || cust.tier === selectedTier;
      const matchesStatus = selectedStatus === 'All' || cust.status === selectedStatus;

      return matchesSearch && matchesTier && matchesStatus;
    });

    if (filtered.length > 0) {
      if (!selectedQuickId || !filtered.some(c => c.id === selectedQuickId)) {
        setSelectedQuickId(filtered[0].id);
      }
    } else {
      setSelectedQuickId(null);
    }
  }, [customers, search, selectedTier, selectedStatus, selectedQuickId]);

  // Filtering logic
  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch = 
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.company.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesTier = selectedTier === 'All' || cust.tier === selectedTier;
    const matchesStatus = selectedStatus === 'All' || cust.status === selectedStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  // Pagination calculation
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email) return;

    const newCust: Customer = {
      id: `c-${Date.now()}`,
      name,
      company,
      email,
      phone: phone || '+44 20 7946 0000',
      status: 'Active',
      tier,
      lifetimeValue: tier === 'Diamond' ? 1500000 : tier === 'Platinum' ? 800000 : 400000,
      joinedDate: new Date().toISOString().split('T')[0],
      country,
      website: website || `https://${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.co`,
      notes,
      deals: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'customer',
          title: 'Account Record Authorized',
          description: `VIP dossier and physical vault index established for ${name}.`,
          timestamp: 'Just now',
          user: { name: 'Lord Sterling Thorne', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' }
        }
      ]
    };

    setCustomers([newCust, ...customers]);
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setNotes('');
    setWebsite('');
    setShowAddModal(false);
    setSelectedQuickId(newCust.id);
  };

  const inspectCustomer = (cust: Customer) => {
    setSelectedCustomer(cust);
    setView('customer-profile');
  };

  const handleDeleteCustomer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this customer record from the central ledger?')) {
      const updated = customers.filter(c => c.id !== id);
      setCustomers(updated);
      if (selectedQuickId === id) {
        setSelectedQuickId(updated[0]?.id || null);
      }
    }
  };

  const getTierBadgeColor = (t: string) => {
    switch (t) {
      case 'Diamond':
        return 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-400';
      case 'Platinum':
        return 'bg-gradient-to-r from-luxury-gold/10 to-luxury-gold-light/10 border-luxury-gold/20 text-luxury-gold';
      default:
        return 'bg-white/5 border-white/10 text-gray-400';
    }
  };

  const getStatusBadgeColor = (s: string) => {
    switch (s) {
      case 'Active':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'Pending':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      default:
        return 'bg-white/5 border-white/5 text-gray-500';
    }
  };

  const quickCust = customers.find(c => c.id === selectedQuickId);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Elite Registry</span>
          <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">Sovereign Client Index</h1>
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
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-luxury-gold text-black' : 'text-gray-400 hover:text-white'
              }`}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold tracking-wider shadow-lg shadow-luxury-gold/15 cursor-pointer font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>AUTHORIZE VIP</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, company, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold/40 focus:bg-white/10 transition-all font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Tier filter dropdown */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-luxury-gold" />
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium font-mono"
            >
              <option value="All" className="bg-brand-dark">All Tiers</option>
              <option value="Diamond" className="bg-brand-dark">Diamond VIP</option>
              <option value="Platinum" className="bg-brand-dark">Platinum Enterprise</option>
              <option value="Gold" className="bg-brand-dark">Gold Strategic</option>
            </select>
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
            <Filter className="w-3.5 h-3.5 text-luxury-gold" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium font-mono"
            >
              <option value="All" className="bg-brand-dark">All Statuses</option>
              <option value="Active" className="bg-brand-dark">Active</option>
              <option value="Pending" className="bg-brand-dark">Pending</option>
              <option value="Inactive" className="bg-brand-dark">Inactive</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* SPLIT LAYOUT: MAIN AREA + SIDE PROFILE CARD (Lg screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Area: Grid or Table (Left Col) */}
        <div className={`${quickCust ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6 w-full min-w-0`}>
          {viewMode === 'table' ? (
            /* DATA TABLE VIEW */
            <GlassCard className="overflow-hidden p-0 border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Client / Firm</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Tier</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Status</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">Region</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold text-right">Valuation</th>
                      <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedCustomers.length > 0 ? (
                      paginatedCustomers.map((cust) => (
                        <tr 
                          key={cust.id}
                          onClick={() => setSelectedQuickId(cust.id)}
                          className={`group hover:bg-white/[0.03] transition-colors cursor-pointer ${
                            selectedQuickId === cust.id ? 'bg-luxury-gold/[0.04]' : ''
                          }`}
                        >
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold flex items-center justify-center text-black font-bold font-serif shadow-md">
                                {cust.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <span className="font-serif text-sm font-semibold text-white group-hover:text-luxury-gold transition-colors block truncate">
                                  {cust.name}
                                </span>
                                <span className="text-[11px] text-gray-400 block truncate font-mono">
                                  {cust.company}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap">
                            <span className={`text-[9px] px-2.5 py-1 rounded-full border font-mono tracking-wider font-semibold ${getTierBadgeColor(cust.tier)}`}>
                              {cust.tier}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap">
                            <span className={`text-[9px] px-2.5 py-1 rounded-full border font-mono tracking-wider font-semibold ${getStatusBadgeColor(cust.status)}`}>
                              {cust.status}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-xs text-gray-300">
                              <MapPin className="w-3.5 h-3.5 text-luxury-gold/70" />
                              <span className="font-mono text-[11px]">{cust.country}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4.5 text-right whitespace-nowrap">
                            <span className="text-sm font-serif font-bold text-luxury-gold font-mono">
                              {cust.lifetimeValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </span>
                          </td>
                          <td className="px-6 py-4.5">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  inspectCustomer(cust);
                                }}
                                className="p-2 rounded-lg bg-white/5 hover:bg-luxury-gold hover:text-black text-gray-400 transition-all"
                                title="Inspect VIP Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteCustomer(cust.id, e)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-gray-500 transition-all"
                                title="Revoke Authorization"
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
                          <span className="font-serif italic text-sm text-gray-400">No VIP profiles matching query in central records.</span>
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
                  <span className="text-white font-bold">{totalItems}</span> elite accounts
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
            /* GRID VIEW */
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {paginatedCustomers.length > 0 ? (
                  paginatedCustomers.map((cust) => (
                    <GlassCard 
                      key={cust.id} 
                      glow={cust.tier === 'Diamond'}
                      onClick={() => setSelectedQuickId(cust.id)}
                      className={`flex flex-col justify-between h-80 group relative overflow-hidden cursor-pointer border ${
                        selectedQuickId === cust.id ? 'border-luxury-gold ring-1 ring-luxury-gold/20' : 'border-white/5'
                      }`}
                    >
                      {cust.tier === 'Diamond' && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-luxury-gold/10 to-transparent pointer-events-none rounded-tr-xl" />
                      )}
                      
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] px-2.5 py-1 rounded-full border font-mono tracking-wider font-semibold ${getTierBadgeColor(cust.tier)}`}>
                              {cust.tier}
                            </span>
                            <span className={`text-[10px] px-2.5 py-1 rounded-full border font-mono tracking-wider font-semibold ${getStatusBadgeColor(cust.status)}`}>
                              {cust.status}
                            </span>
                          </div>
                          {cust.tier === 'Diamond' && <Crown className="w-4 h-4 text-luxury-gold" />}
                        </div>

                        <div className="space-y-1 mb-6">
                          <h3 className="text-xl font-serif text-white group-hover:text-luxury-gold transition-colors truncate">
                            {cust.name}
                          </h3>
                          <span className="text-xs text-gray-400 font-medium block">
                            {cust.company}
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs text-gray-400 font-light border-t border-white/5 pt-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-luxury-gold/70" />
                            <span className="truncate">{cust.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-luxury-gold/70" />
                            <span>{cust.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-luxury-gold/70" />
                            <span>{cust.country}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-t border-white/5 pt-4 mt-6">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Lifetime Asset Valuation</span>
                          <span className="text-base font-serif text-luxury-gold font-bold font-mono">
                            {cust.lifetimeValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              inspectCustomer(cust);
                            }}
                            className="p-2 bg-white/5 hover:bg-luxury-gold hover:text-black rounded-lg text-gray-400 transition-all flex items-center justify-center"
                            title="Inspect Dossier"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-20 bg-white/[0.01] rounded-2xl border border-white/5">
                    <span className="font-serif italic text-lg text-gray-400">No VIP profiles matching query in central records.</span>
                  </div>
                )}
              </div>

              {/* GRID PAGINATION */}
              <div className="p-4 bg-white/[0.01] rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-gray-400 font-mono">
                  Showing <span className="text-white font-bold">{startIndex + 1}</span> to{' '}
                  <span className="text-white font-bold">{Math.min(startIndex + pageSize, totalItems)}</span> of{' '}
                  <span className="text-white font-bold">{totalItems}</span> accounts
                </div>

                <div className="flex items-center gap-3">
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
            </div>
          )}
        </div>

        {/* Quick Profile Side Panel (Right Col) */}
        {quickCust && (
          <div className="lg:col-span-4 w-full">
            <GlassCard glow={quickCust.tier === 'Diamond'} className="relative overflow-hidden p-6 border border-white/10 space-y-6">
              {quickCust.tier === 'Diamond' && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-luxury-gold/10 to-transparent pointer-events-none rounded-tr-xl" />
              )}
              
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold font-mono font-bold block">
                  VIP Quick Profile
                </span>
                <button
                  onClick={() => setSelectedQuickId(null)}
                  className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/15 transition-all"
                  title="Close Quick Dossier"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Profile Card Centerpiece */}
              <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-white/5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold flex items-center justify-center text-black font-serif text-3xl font-bold shadow-lg shadow-luxury-gold/15">
                    {quickCust.name.charAt(0)}
                  </div>
                  {quickCust.tier === 'Diamond' && (
                    <div className="absolute -top-1.5 -right-1.5 bg-luxury-gold p-0.5 rounded-full ring-2 ring-brand-dark">
                      <Crown className="w-3.5 h-3.5 text-black" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white font-bold tracking-wide">
                    {quickCust.name}
                  </h3>
                  <span className="text-xs text-gray-400 block font-medium">
                    {quickCust.company}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <span className={`text-[8px] uppercase tracking-wider font-bold border px-2.5 py-0.5 rounded-full font-mono ${getTierBadgeColor(quickCust.tier)}`}>
                    {quickCust.tier}
                  </span>
                  <span className={`text-[8px] uppercase tracking-wider font-bold border px-2.5 py-0.5 rounded-full font-mono ${getStatusBadgeColor(quickCust.status)}`}>
                    {quickCust.status}
                  </span>
                </div>
              </div>

              {/* Bio & Contact details */}
              <div className="space-y-4 text-xs">
                {quickCust.notes && (
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Dossier Memos / Directives</span>
                    <p className="text-gray-300 font-light leading-relaxed italic bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                      "{quickCust.notes}"
                    </p>
                  </div>
                )}

                <div className="space-y-2.5 border-t border-white/5 pt-4 text-gray-400">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-gray-500">Jurisdiction</span>
                    <span className="text-white">{quickCust.country}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-gray-500">Asset Valuation</span>
                    <span className="text-luxury-gold font-bold">
                      {quickCust.lifetimeValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-gray-500">Date Logged</span>
                    <span className="text-white">{quickCust.joinedDate}</span>
                  </div>
                </div>

                <div className="space-y-2.5 border-t border-white/5 pt-4">
                  <a href={`mailto:${quickCust.email}`} className="flex items-center gap-2.5 text-gray-300 hover:text-luxury-gold transition-colors font-mono text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-luxury-gold/70" />
                    <span className="truncate">{quickCust.email}</span>
                  </a>
                  {quickCust.phone && (
                    <a href={`tel:${quickCust.phone}`} className="flex items-center gap-2.5 text-gray-300 hover:text-luxury-gold transition-colors font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-luxury-gold/70" />
                      <span>{quickCust.phone}</span>
                    </a>
                  )}
                  {quickCust.website && (
                    <a href={quickCust.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-300 hover:text-luxury-gold transition-colors font-mono text-[11px]">
                      <Globe className="w-3.5 h-3.5 text-luxury-gold/70" />
                      <span className="truncate">{quickCust.website}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-white/5 pt-4 flex gap-3">
                <button
                  onClick={() => inspectCustomer(quickCust)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold font-mono shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>FULL DOSSIER</span>
                </button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>

      {/* AUTHORIZE VIP CUSTOMER DOSSIER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass-panel border border-white/10 rounded-2xl p-8 max-h-[90vh] overflow-y-auto no-scrollbar relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono block">Executive Command</span>
                <h2 className="font-serif text-2xl text-white mt-1">Authorize New VIP Customer</h2>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs px-2.5 py-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">VIP Sovereign Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lord Sterling Thorne" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Elite Holding or Enterprise</label>
                  <input 
                    type="text" 
                    required 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Thorne Capital Holdings" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Secure Email Routing</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. s.thorne@thornecapital.ch" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Dedicated Phone Escrow</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +41 22 790 1488" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Sovereign Jurisdiction</label>
                  <input 
                    type="text" 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Switzerland" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Secure Portal Website</label>
                  <input 
                    type="url" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="e.g. https://thornecapital.ch" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-2">Registry Tier Classification</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Diamond', 'Platinum', 'Gold'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`py-3 text-xs rounded-xl border font-semibold tracking-wider transition-all uppercase ${
                        tier === t 
                          ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold border-luxury-gold text-black shadow-lg shadow-luxury-gold/15' 
                          : 'border-white/10 hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      {t} {t === 'Diamond' ? 'VIP' : t === 'Platinum' ? 'Enterprise' : 'Strategic'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Registry Memo / Custom Directives</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Insert secure metadata notes about private asset requirements, escrow timelines, or family office details." 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-luxury-gold/50 leading-relaxed"
                />
              </div>

              <div className="flex gap-4 justify-end pt-6 border-t border-white/5 mt-8">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-white/5 rounded-xl border border-white/5 text-xs font-semibold hover:bg-white/10 text-gray-300 transition-colors"
                >
                  Close Drawer
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10 hover:scale-[1.01] transition-transform"
                >
                  Sovereign Seal Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}