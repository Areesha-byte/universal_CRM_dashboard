/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Deal {
  id: string;
  title: string;
  value: number;
  status: 'won' | 'lost' | 'active';
  date: string;
}

export interface Activity {
  id: string;
  type: 'customer' | 'lead' | 'meeting' | 'task' | 'revenue' | 'system';
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
  tier: 'Diamond' | 'Platinum' | 'Gold';
  lifetimeValue: number;
  joinedDate: string;
  country: string;
  website: string;
  notes: string;
  deals: Deal[];
  activities: Activity[];
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  value: number;
  stage: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  score: number; // 0-100
  owner: string;
  lastContacted: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  assignedTo: string;
  customerName?: string;
}

export interface Meeting {
  id: string;
  title: string;
  customerName: string;
  time: string;
  date: string; // YYYY-MM-DD
  type: 'virtual' | 'in_person';
  status: 'scheduled' | 'ongoing' | 'completed';
  duration: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  joinedDate: string;
  performanceScore: number; // 0-100
  status: 'Active' | 'On Leave' | 'Suspended';
  rating: number; // e.g. 4.8
  skills: string[];
  bio: string;
}

export type ViewType =
  | 'landing'
  | 'dashboard'
  | 'customers'
  | 'customer-profile'
  | 'leads'
  | 'tasks'
  | 'employees'
  | 'employee-profile'
  | 'calendar'
  | 'reports'
  | 'notifications'
  | 'settings'
  | 'login'
  | 'forgot-password';
