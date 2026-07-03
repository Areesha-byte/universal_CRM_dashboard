/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  User, 
  Mail, 
  Phone, 
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Eye,
  X,
  Sparkles,
  Shield,
  Briefcase,
  Award,
  TrendingUp,
  CheckSquare,
  Square,
  CheckCircle2,
  Clock,
  Calendar,
  CheckCircle,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Employee, Task, ViewType } from '../types';

interface EmployeesViewProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setView: (view: ViewType) => void;
  theme?: 'dark' | 'light';
}

export default function EmployeesView({
  employees,
  setEmployees,
  tasks,
  setTasks,
  setView,
  theme = 'dark'
}: EmployeesViewProps) {
  // Navigation State within Employee Tab (List vs Profile)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal states
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Form State: Add Employee
  const [empName, setEmpName] = useState('');
  const [empRole, setEmpRole] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empDept, setEmpDept] = useState('Private Wealth Advisory');
  const [empBio, setEmpBio] = useState('');
  const [empSkills, setEmpSkills] = useState('');
  const [empPerf, setEmpPerf] = useState(95);

  // Form State: Add Task (direct for employee)
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState<Task['priority']>('medium');
  const [taskClientName, setTaskClientName] = useState('');
  const [subtasks, setSubtasks] = useState<{ text: string; done: boolean }[]>([
    { text: 'Initial documentation review', done: false },
    { text: 'Verify compliance certificates', done: false },
    { text: 'Final executive summary signoff', done: false }
  ]);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDept, selectedStatus]);

  // Extract Departments
  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];

  // Filtering Logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Pagination Calculation
  const totalItems = filteredEmployees.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Create Employee Action
  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName || !empRole || !empEmail) return;

    const skillsArray = empSkills
      ? empSkills.split(',').map(s => s.trim()).filter(Boolean)
      : ['Private Wealth', 'Discretion', 'Client Relations'];

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name: empName,
      role: empRole,
      email: empEmail,
      phone: empPhone || '+44 20 7946 0777',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', // default premium avatar
      department: empDept,
      joinedDate: new Date().toISOString().split('T')[0],
      performanceScore: Number(empPerf) || 90,
      status: 'Active',
      rating: 4.8,
      skills: skillsArray,
      bio: empBio || 'High-level steward managing critical wealth portfolios.'
    };

    setEmployees([newEmp, ...employees]);
    
    // Reset Form
    setEmpName('');
    setEmpRole('');
    setEmpEmail('');
    setEmpPhone('');
    setEmpBio('');
    setEmpSkills('');
    setEmpPerf(95);
    setShowAddEmployeeModal(false);
  };

  // Create Task assigned to selected employee
  const handleCreateTask = (e: React.FormEvent, assignedEmployeeName: string) => {
    e.preventDefault();
    if (!taskTitle || !taskDueDate) return;

    // We can embed the subtasks info directly inside description or save it gracefully.
    // To represent a checklist in the description, we can format it nicely.
    // We will save subtasks to show beautiful progress bars!
    const serializedSubtasks = subtasks.length > 0 
      ? `\n\nChecklist:\n` + subtasks.map(s => `[${s.done ? 'x' : ' '}] ${s.text}`).join('\n')
      : '';

    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: taskTitle,
      description: taskDesc + serializedSubtasks,
      dueDate: taskDueDate,
      priority: taskPriority,
      status: 'todo',
      assignedTo: assignedEmployeeName,
      customerName: taskClientName || undefined
    };

    setTasks([newTask, ...tasks]);
    
    // Reset Form
    setTaskTitle('');
    setTaskDesc('');
    setTaskDueDate('');
    setTaskPriority('medium');
    setTaskClientName('');
    setSubtasks([
      { text: 'Initial documentation review', done: false },
      { text: 'Verify compliance certificates', done: false },
      { text: 'Final executive summary signoff', done: false }
    ]);
    setShowAddTaskModal(false);
  };

  const handleAddSubtask = () => {
    if (!newSubtaskText.trim()) return;
    setSubtasks([...subtasks, { text: newSubtaskText.trim(), done: false }]);
    setNewSubtaskText('');
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleToggleSubtaskInForm = (index: number) => {
    setSubtasks(subtasks.map((s, i) => i === index ? { ...s, done: !s.done } : s));
  };

  // Helper: toggle task status directly
  const handleToggleTaskStatus = (taskId: string) => {
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

  // Helper: delete task
  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to retire this directive?')) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  // Helper: Delete Employee
  const handleDeleteEmployee = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to revoke this officer\'s authorization and remove them from active registry?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      if (selectedEmployeeId === id) {
        setSelectedEmployeeId(null);
      }
    }
  };

  // Helper: Extract Checklist state from description
  const parseChecklist = (description: string) => {
    if (!description) return { items: [], pct: 0 };
    const lines = description.split('\n');
    const items: { text: string; done: boolean }[] = [];
    
    lines.forEach(line => {
      const match = line.match(/^\[([ xX]?)\]\s*(.*)$/);
      if (match) {
        items.push({
          text: match[2].trim(),
          done: match[1].toLowerCase() === 'x'
        });
      }
    });

    if (items.length === 0) {
      return { items: [], pct: 0 };
    }

    const doneCount = items.filter(i => i.done).length;
    const pct = Math.round((doneCount / items.length) * 100);
    return { items, pct };
  };

  // Helper: Update a subtask in an existing task
  const handleToggleChecklistItem = (task: Task, itemText: string) => {
    const info = parseChecklist(task.description);
    if (info.items.length === 0) return;

    const baseDescription = task.description.split('\n\nChecklist:')[0];
    const updatedItems = info.items.map(item => {
      if (item.text === itemText) {
        return { ...item, done: !item.done };
      }
      return item;
    });

    const serializedSubtasks = `\n\nChecklist:\n` + updatedItems.map(s => `[${s.done ? 'x' : ' '}] ${s.text}`).join('\n');
    
    // Update task
    const updatedTasks: Task[] = tasks.map((t) => {
  if (t.id !== task.id) return t;

  const allCompleted = updatedItems.every((i) => i.done);

  const newStatus: Task["status"] = allCompleted
    ? "completed"
    : t.status === "completed"
    ? "in_progress"
    : t.status;

  return {
    ...t,
    description: baseDescription + serializedSubtasks,
    status: newStatus,
  };
});

setTasks(updatedTasks);
  }

  // Styling helpers
  const getStatusBadgeColor = (s: string) => {
    switch (s) {
      case 'Active':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      case 'On Leave':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      default:
        return 'bg-red-500/10 border-red-500/20 text-red-400';
    }
  };

  const getPriorityClasses = (p: string) => {
    switch (p) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
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

  // Focus employee
  const currentEmployee = employees.find(e => e.id === selectedEmployeeId);
  
  // Tasks assigned to this employee
  const employeeTasks = currentEmployee 
    ? tasks.filter(t => t.assignedTo === currentEmployee.name || t.assignedTo === 'Sterling Thorne' && currentEmployee.name === 'Lord Sterling Thorne')
    : [];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. EMPLOYEE PROFILE VIEW PORTION */}
      {currentEmployee ? (
        <div className="space-y-8">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedEmployeeId(null)}
              className="flex items-center gap-2 text-xs font-mono font-medium text-gray-400 hover:text-white transition-colors py-2 px-3 bg-white/5 rounded-xl border border-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Officer Directory</span>
            </button>

            <button
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold tracking-wider font-mono shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ASSIGN SPECIAL DIRECTIVE</span>
            </button>
          </div>

          {/* Core Profile Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Premium Profile Card */}
            <div className="lg:col-span-4 space-y-6">
              <GlassCard glow className="p-6 relative overflow-hidden border border-white/10 text-center">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-luxury-gold/5 to-transparent pointer-events-none rounded-tr-xl" />
                
                {/* Avatar centerpiece */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img 
                      src={currentEmployee.avatar} 
                      alt={currentEmployee.name} 
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-2xl object-cover border border-luxury-gold/30 shadow-xl shadow-luxury-gold/10"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-brand-dark border border-white/10 p-1.5 rounded-xl text-luxury-gold">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                      {currentEmployee.name}
                    </h2>
                    <span className="text-xs text-luxury-gold font-mono uppercase mt-1 block">
                      {currentEmployee.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 justify-center">
                    <span className={`text-[9px] uppercase tracking-wider font-bold border px-2.5 py-1 rounded-full font-mono ${getStatusBadgeColor(currentEmployee.status)}`}>
                      {currentEmployee.status}
                    </span>
                    <span className="text-xs font-semibold text-gray-300 font-mono flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                      <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                      {currentEmployee.rating} Rating
                    </span>
                  </div>
                </div>

                {/* Micro KPIs */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-5 my-6">
                  <div className="text-center">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Performance</span>
                    <span className="text-xl font-serif font-bold text-white font-mono mt-1 block">
                      {currentEmployee.performanceScore}%
                    </span>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono block">Active Directives</span>
                    <span className="text-xl font-serif font-bold text-luxury-gold font-mono mt-1 block">
                      {employeeTasks.filter(t => t.status !== 'completed').length}
                    </span>
                  </div>
                </div>

                {/* Profile detail values */}
                <div className="space-y-4 text-left text-xs border-b border-white/5 pb-6 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-mono">Department</span>
                    <span className="text-white font-medium">{currentEmployee.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-mono">Officer ID</span>
                    <span className="text-white font-mono text-[11px]">{currentEmployee.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-mono">Registry Commission</span>
                    <span className="text-white font-mono text-[11px]">{currentEmployee.joinedDate}</span>
                  </div>
                </div>

                {/* Contact information */}
                <div className="space-y-3 text-left text-xs">
                  <a href={`mailto:${currentEmployee.email}`} className="flex items-center gap-2.5 text-gray-300 hover:text-luxury-gold transition-colors font-mono">
                    <Mail className="w-4 h-4 text-luxury-gold/70" />
                    <span className="truncate">{currentEmployee.email}</span>
                  </a>
                  <a href={`tel:${currentEmployee.phone}`} className="flex items-center gap-2.5 text-gray-300 hover:text-luxury-gold transition-colors font-mono">
                    <Phone className="w-4 h-4 text-luxury-gold/70" />
                    <span>{currentEmployee.phone}</span>
                  </a>
                </div>
              </GlassCard>

              {/* Skills Tag Box */}
              <GlassCard className="p-6">
                <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono block mb-4">
                  Expertise Dossier Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentEmployee.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Bio & Assigned Directives (The Task List) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Officer Bio Statement */}
              <GlassCard className="p-6 space-y-3">
                <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  Executive Mandate Bio
                </span>
                <p className="text-sm text-gray-300 font-light leading-relaxed italic bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  "{currentEmployee.bio}"
                </p>
              </GlassCard>

              {/* Performance Indicator Circular/Linear Progress Bar */}
              <GlassCard className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    Annual Audited Stewardship Score
                  </span>
                  <span className="text-sm font-bold text-white font-mono">{currentEmployee.performanceScore}/100</span>
                </div>
                
                {/* Sleek Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-white/5 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div 
                      className="bg-gradient-to-r from-luxury-bronze to-luxury-gold h-full rounded-full transition-all duration-700 shadow-md shadow-luxury-gold/15"
                      style={{ width: `${currentEmployee.performanceScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>Satisfactory Threshold (80)</span>
                    <span>Elite Reserve (95+)</span>
                  </div>
                </div>
              </GlassCard>

              {/* List of Directives Assigned */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">
                    Assigned Operations Checklist ({employeeTasks.length})
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    Showing all directives assigned to this officer
                  </span>
                </div>

                <div className="space-y-4">
                  {employeeTasks.length > 0 ? (
                    employeeTasks.map((task) => {
                      const { items: checklistItems, pct: progressPercent } = parseChecklist(task.description);
                      const displayDesc = task.description.split('\n\nChecklist:')[0];

                      return (
                        <GlassCard key={task.id} className="p-5 flex flex-col md:flex-row gap-5 items-start justify-between group">
                          <div className="flex gap-4 items-start flex-1 min-w-0">
                            {/* Checkbox Loops */}
                            <div 
                              onClick={() => handleToggleTaskStatus(task.id)}
                              className="mt-1"
                              title="Advance Status"
                            >
                              {getStatusIcon(task.status)}
                            </div>

                            <div className="space-y-2.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className={`text-base leading-snug ${task.status === 'completed' ? 'line-through text-gray-500 font-light' : 'text-white font-medium'}`}>
                                  {task.title}
                                </h4>
                                <span className={`text-[8px] uppercase tracking-wider font-semibold border px-2 py-0.5 rounded-md ${getPriorityClasses(task.priority)}`}>
                                  {task.priority}
                                </span>
                                {task.customerName && (
                                  <span className="text-[9px] bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 rounded-full font-mono">
                                    Entity: {task.customerName}
                                  </span>
                                )}
                              </div>

                              {displayDesc && (
                                <p className="text-xs text-gray-400 leading-relaxed font-light">
                                  {displayDesc}
                                </p>
                              )}

                              {/* TASK CHECKLIST PROGRESS BAR (requested components) */}
                              {checklistItems.length > 0 && (
                                <div className="space-y-2 bg-white/[0.01] border border-white/5 p-3.5 rounded-xl my-2 max-w-xl">
                                  <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-gray-500 uppercase">Directive Checklist Progress</span>
                                    <span className="text-luxury-gold font-bold">{progressPercent}% Completed</span>
                                  </div>
                                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-gradient-to-r from-luxury-bronze to-luxury-gold h-full rounded-full transition-all duration-300"
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>

                                  {/* Subtasks checklist render */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/5">
                                    {checklistItems.map((item, idx) => (
                                      <div 
                                        key={idx}
                                        onClick={() => handleToggleChecklistItem(task, item.text)}
                                        className="flex items-center gap-2 text-xs text-gray-300 hover:text-white cursor-pointer select-none transition-colors"
                                      >
                                        {item.done ? (
                                          <CheckCircle className="w-3.5 h-3.5 text-luxury-gold" />
                                        ) : (
                                          <div className="w-3.5 h-3.5 border border-gray-600 rounded" />
                                        )}
                                        <span className={item.done ? 'line-through text-gray-500 text-[11px]' : 'text-[11px]'}>
                                          {item.text}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono pt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-luxury-gold/70" />
                                  Target Escrow: {task.dueDate}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono uppercase bg-white/5 px-2.5 py-1 rounded-md border border-white/5 text-gray-400 select-none">
                              {task.status.replace('_', ' ')}
                            </span>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                              title="Retire Directive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </GlassCard>
                      );
                    })
                  ) : (
                    <div className="text-center py-16 bg-white/[0.01] rounded-2xl border border-white/5">
                      <span className="font-serif italic text-sm text-gray-500">No active directives registered for this officer.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      ) : (
        /* 2. OFFICER LIST / DIRECTORY VIEW */
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold font-mono">Aurelia Staff Registry</span>
              <h1 className="text-3xl md:text-4xl font-serif text-white mt-1">CRM Officers & Stewards</h1>
            </div>

            <button
              onClick={() => setShowAddEmployeeModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-tr from-luxury-bronze to-luxury-gold text-black hover:scale-[1.02] transition-all text-xs font-semibold tracking-wider shadow-lg shadow-luxury-gold/15 cursor-pointer font-mono"
            >
              <Plus className="w-4 h-4" />
              <span>AUTHORIZE CRM OFFICER</span>
            </button>
          </div>

          {/* Search and Filters panel */}
          <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search name, role, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold/40 focus:bg-white/10 transition-all font-mono"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Department Filter */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-luxury-gold" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium font-mono"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-brand-dark">{dept === 'All' ? 'All Departments' : dept}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
                <Filter className="w-3.5 h-3.5 text-luxury-gold" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none border-none pr-6 cursor-pointer font-medium font-mono"
                >
                  <option value="All" className="bg-brand-dark">All Statuses</option>
                  <option value="Active" className="bg-brand-dark">Active</option>
                  <option value="On Leave" className="bg-brand-dark">On Leave</option>
                  <option value="Suspended" className="bg-brand-dark">Suspended</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Grid of Employee Cards (requested components) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => {
                const activeCount = tasks.filter(t => (t.assignedTo === emp.name || t.assignedTo === 'Sterling Thorne' && emp.name === 'Lord Sterling Thorne') && t.status !== 'completed').length;
                return (
                  <GlassCard 
                    key={emp.id}
                    glow={emp.performanceScore >= 96}
                    onClick={() => setSelectedEmployeeId(emp.id)}
                    className="flex flex-col justify-between h-96 group relative overflow-hidden cursor-pointer border border-white/5 hover:border-luxury-gold/45 transition-all"
                  >
                    {emp.performanceScore >= 96 && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-luxury-gold/10 to-transparent pointer-events-none rounded-tr-xl" />
                    )}

                    <div>
                      {/* Header Badge Row */}
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[9px] uppercase tracking-wider font-bold border px-2.5 py-0.5 rounded-full font-mono ${getStatusBadgeColor(emp.status)}`}>
                          {emp.status}
                        </span>
                        
                        <span className="text-[10px] text-gray-400 font-semibold font-mono flex items-center gap-1">
                          <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                          {emp.rating}
                        </span>
                      </div>

                      {/* Avatar & Name */}
                      <div className="flex items-center gap-4 mb-5 pb-4 border-b border-white/5">
                        <img 
                          src={emp.avatar} 
                          alt={emp.name} 
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover border border-white/10 group-hover:border-luxury-gold/50 transition-colors"
                        />
                        <div className="min-w-0">
                          <h3 className="text-lg font-serif text-white group-hover:text-luxury-gold transition-colors font-semibold truncate leading-tight">
                            {emp.name}
                          </h3>
                          <span className="text-xs text-gray-400 block truncate mt-0.5">
                            {emp.role}
                          </span>
                        </div>
                      </div>

                      {/* Info lines */}
                      <div className="space-y-3 text-xs text-gray-400 font-light font-sans pt-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-mono">Department</span>
                          <span className="text-gray-300 font-medium">{emp.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-mono">Active Directives</span>
                          <span className="text-luxury-gold font-bold font-mono">{activeCount} ongoing</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar of Performance (requested components) */}
                    <div className="space-y-2 border-t border-white/5 pt-4 mt-5">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="text-gray-500">Stewardship Performance Score</span>
                        <span className="text-white font-bold">{emp.performanceScore}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-luxury-bronze to-luxury-gold h-full rounded-full transition-all duration-300"
                          style={{ width: `${emp.performanceScore}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[9px] font-mono text-gray-500">COMMISSIONED: {emp.joinedDate}</span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleDeleteEmployee(emp.id, e)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 hover:text-red-400 text-gray-500 transition-colors"
                            title="Deauthorize Officer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold text-luxury-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            View Profile
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
                <span className="font-serif italic text-lg text-gray-400">No CRM officers match the search criteria.</span>
              </div>
            )}
          </div>

          {/* Directory Pagination */}
          <div className="p-4 bg-white/[0.01] rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-gray-400 font-mono">
              Showing <span className="text-white font-bold">{startIndex + 1}</span> to{' '}
              <span className="text-white font-bold">{Math.min(startIndex + pageSize, totalItems)}</span> of{' '}
              <span className="text-white font-bold">{totalItems}</span> authorized officers
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

      {/* 3. AUTHORIZE CRM OFFICER MODAL DESIGN (requested components) */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl glass-panel border border-white/10 rounded-2xl p-8 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono block">Officer Ledger Entry</span>
                <h2 className="font-serif text-2xl text-white mt-1">Authorize New CRM Officer</h2>
              </div>
              <button 
                onClick={() => setShowAddEmployeeModal(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs px-2.5 py-1 font-mono"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Officer Name</label>
                  <input 
                    type="text" 
                    required 
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    placeholder="e.g. Sterling Thorne Jr" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Corporate Role Title</label>
                  <input 
                    type="text" 
                    required 
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value)}
                    placeholder="e.g. Wealth Stewardship Associate" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Corporate Email</label>
                  <input 
                    type="email" 
                    required 
                    value={empEmail}
                    onChange={(e) => setEmpEmail(e.target.value)}
                    placeholder="e.g. s.thorne-jr@aurelia.executive" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Secure Contact Phone</label>
                  <input 
                    type="text" 
                    value={empPhone}
                    onChange={(e) => setEmpPhone(e.target.value)}
                    placeholder="e.g. +44 20 7946 0110" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Assigned Department</label>
                  <select
                    value={empDept}
                    onChange={(e) => setEmpDept(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Private Wealth Advisory" className="bg-brand-dark">Private Wealth Advisory</option>
                    <option value="Business Development" className="bg-brand-dark">Business Development</option>
                    <option value="Legal & Risk Assurance" className="bg-brand-dark">Legal & Risk Assurance</option>
                    <option value="Client Technology Systems" className="bg-brand-dark">Client Technology Systems</option>
                    <option value="Lifestyle Concierge" className="bg-brand-dark">Lifestyle Concierge</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Initial Stewardship Score (0-100)</label>
                  <input 
                    type="number" 
                    required 
                    min="50"
                    max="100"
                    value={empPerf}
                    onChange={(e) => setEmpPerf(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Expertise Tags (Comma-separated)</label>
                <input 
                  type="text" 
                  value={empSkills}
                  onChange={(e) => setEmpSkills(e.target.value)}
                  placeholder="e.g. Asset Protection, Discretion, Offshore Trusts" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Executive Biography Mandate</label>
                <textarea 
                  value={empBio}
                  onChange={(e) => setEmpBio(e.target.value)}
                  placeholder="Draft the biographical mandate highlighting offshore experience, family office stewardship, or specific compliance expertise." 
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-luxury-gold/50 leading-relaxed"
                />
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-white/5 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-xs hover:bg-white/10 text-gray-300 font-mono"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10 font-mono"
                >
                  Seal Commission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. CREATE TASK & ASSIGNMENT FORM MODAL DESIGN (requested components) */}
      {showAddTaskModal && currentEmployee && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel border border-white/10 rounded-2xl p-8 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-mono block">Assign Operational Mandate</span>
                <h2 className="font-serif text-2xl text-white mt-1">Direct to {currentEmployee.name}</h2>
              </div>
              <button 
                onClick={() => setShowAddTaskModal(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs px-2.5 py-1 font-mono"
              >
                Close
              </button>
            </div>

            <form onSubmit={(e) => handleCreateTask(e, currentEmployee.name)} className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Mandate Title</label>
                <input 
                  type="text" 
                  required 
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Restructure family-office assets vault index" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Mandate Protocol Description</label>
                <textarea 
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  placeholder="Insert strict guidelines, security protocols, or contact routing specifications." 
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-luxury-gold/50 leading-relaxed"
                />
              </div>

              {/* Subtasks Checklist Builder */}
              <div className="space-y-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block">checklist items (Subtasks progress tracker)</label>
                
                {/* Checklist current items list */}
                <div className="space-y-2 max-h-28 overflow-y-auto pr-1 no-scrollbar">
                  {subtasks.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-xs">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          checked={item.done}
                          onChange={() => handleToggleSubtaskInForm(idx)}
                          className="rounded border-white/10 text-luxury-gold focus:ring-0 cursor-pointer"
                        />
                        <span className={`text-[11px] ${item.done ? 'line-through text-gray-500' : 'text-gray-300'}`}>{item.text}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveSubtask(idx)}
                        className="text-gray-500 hover:text-red-400 text-[10px] font-mono"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtask input bar */}
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    placeholder="e.g. Authenticate physical escrow tokens"
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubtask();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSubtask}
                    className="px-3 py-1.5 bg-white/10 border border-white/10 hover:bg-white/20 text-[11px] text-white rounded-lg transition-colors font-mono"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Target Escrow Date</label>
                  <input 
                    type="date" 
                    required 
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-1">Associated Entity</label>
                  <input 
                    type="text" 
                    value={taskClientName}
                    onChange={(e) => setTaskClientName(e.target.value)}
                    placeholder="e.g. Rostov Sovereign Capital" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono block mb-2">Priority Classification</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTaskPriority(p)}
                      className={`py-2 text-[10px] uppercase tracking-wider font-semibold border rounded-lg transition-all font-mono ${
                        taskPriority === p 
                          ? 'bg-gradient-to-tr from-luxury-bronze to-luxury-gold border-luxury-gold text-black shadow-md' 
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
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-xs hover:bg-white/10 text-gray-300 font-mono"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-gradient-to-r from-luxury-bronze to-luxury-gold text-black font-semibold text-xs rounded-xl shadow-lg shadow-luxury-gold/10 font-mono"
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
