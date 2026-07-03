/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  CheckSquare, 
  Square, 
  Clock, 
  AlertCircle, 
  User, 
  SlidersHorizontal,
  ChevronDown,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Task, Employee } from '../types';

interface TasksViewProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  employees?: Employee[];
}

export default function TasksView({ tasks, setTasks, employees = [] }: TasksViewProps) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // New task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [customerName, setCustomerName] = useState('');
  const [assignedTo, setAssignedTo] = useState('Lord Sterling Thorne');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const newTask: Task = {
      id: `t-${Date.now()}`,
      title,
      description,
      dueDate,
      priority,
      status: 'todo',
      assignedTo: assignedTo || 'Lord Sterling Thorne',
      customerName: customerName || undefined
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCustomerName('');
    setAssignedTo('Lord Sterling Thorne');
    setShowAddTask(false);
  };

  const handleToggleStatus = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        let nextStatus: Task['status'] = 'todo';
        if (t.status === 'todo') nextStatus = 'in_progress';
        else if (t.status === 'in_progress') nextStatus = 'completed';
        else nextStatus = 'todo';

        return { ...t, status: nextStatus };
      }
      return t;
    });
    setTasks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  const getPriorityClasses = (p: string) => {
    switch (p) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/15';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/15';
      default:
        return 'text-gray-400 bg-white/5 border-white/5';
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400 cursor-pointer flex-shrink-0 transition-transform hover:scale-110" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-amber-400 cursor-pointer flex-shrink-0 transition-transform hover:scale-110" />;
      default:
        return <Square className="w-5 h-5 text-gray-500 cursor-pointer flex-shrink-0 transition-transform hover:scale-110" />;
    }
  };

  const getStatusTextClasses = (s: string) => {
    if (s === 'completed') return 'line-through text-gray-500 font-light';
    return 'text-white font-medium';
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Operations Checklist</span>
          <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">Escrow Directives</h1>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold tracking-wider shadow-lg shadow-luxury-gold/15 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Executive Directive</span>
        </button>
      </div>

      {/* FILTER PANEL */}
      <GlassCard className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-end">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Priority filter */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-luxury-gold" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium"
            >
              <option value="All" className="bg-brand-dark">All Priorities</option>
              <option value="high" className="bg-brand-dark">High Priority</option>
              <option value="medium" className="bg-brand-dark">Medium Priority</option>
              <option value="low" className="bg-brand-dark">Low Priority</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <CheckSquare className="w-3.5 h-3.5 text-luxury-gold" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium"
            >
              <option value="All" className="bg-brand-dark">All Statuses</option>
              <option value="todo" className="bg-brand-dark">Todo</option>
              <option value="in_progress" className="bg-brand-dark">In Progress</option>
              <option value="completed" className="bg-brand-dark">Completed</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* TASKS LIST */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <GlassCard key={task.id} className="p-5 flex gap-4 items-start justify-between group">
              <div className="flex gap-4 items-start flex-1 min-w-0">
                {/* Clicking on check status loops: todo -> in_progress -> completed */}
                <div 
                  onClick={() => handleToggleStatus(task.id)}
                  title="Loop Status (Todo → In Progress → Completed)"
                  className="mt-1"
                >
                  {getStatusIcon(task.status)}
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`text-base leading-tight ${getStatusTextClasses(task.status)}`}>
                      {task.title}
                    </h3>
                    <span className={`text-[8px] uppercase tracking-wider font-semibold border px-2 py-0.5 rounded-md ${getPriorityClasses(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.customerName && (
                      <span className="text-[9px] bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 rounded-full font-mono">
                        Client: {task.customerName}
                      </span>
                    )}
                  </div>
                  {task.description && (
                    <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2 max-w-3xl">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-luxury-gold/70" />
                      Due Date: {task.dueDate}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <User className="w-3 h-3 text-luxury-gold/70" />
                      Owner: {task.assignedTo}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Loop trigger helper tag */}
                <span className="text-[8px] font-mono uppercase bg-white/5 px-2 py-1 rounded border border-white/5 text-gray-500 hidden md:block select-none capitalize">
                  Status: {task.status.replace('_', ' ')}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete directive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          ))
        ) : (
          <div className="text-center py-20 bg-white/[0.01] rounded-2xl border border-white/5">
            <span className="font-serif italic text-lg text-gray-400">No active directives found matching filters.</span>
          </div>
        )}
      </div>

      {/* CREATE EXECUTIVE DIRECTIVE MODAL */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel border border-white/10 rounded-2xl p-8 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono block">Executive Office</span>
                <h2 className="font-serif text-2xl text-white mt-1">Issue Executive Directive</h2>
              </div>
              <button 
                onClick={() => setShowAddTask(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs px-2.5 py-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Directive Title</label>
                <input 
                  type="text" 
                  required 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Audit Swiss wire routes for Rostov Sovereign" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Target Description / Protocol</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Draft detailed specifications, security procedures, or family-office contact protocols." 
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-luxury-gold/50 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Due Date</label>
                  <input 
                    type="date" 
                    required 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Associated Client / Entity</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rostov Sovereign Capital" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Assign Officer / Steward</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="Lord Sterling Thorne" className="bg-brand-dark">Lord Sterling Thorne (You)</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name} className="bg-brand-dark">
                      {emp.name} — {emp.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-2">Directive Priority</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 text-[10px] uppercase tracking-wider font-semibold border rounded-lg transition-all ${
                        priority === p 
                          ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold border-luxury-gold text-black' 
                          : 'border-white/10 hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      {p} Priority
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-white/5 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddTask(false)}
                  className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-xs hover:bg-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10"
                >
                  Issue Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
