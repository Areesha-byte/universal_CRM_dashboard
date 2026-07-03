/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  Users, 
  Target, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  theme?: 'dark' | 'light';
  onLogout: () => void;
}

export default function Sidebar({
  currentView,
  setView,
  isCollapsed,
  setIsCollapsed,
  isOpenMobile,
  setIsOpenMobile,
  theme = 'dark',
  onLogout
}: SidebarProps) {
  const menuItems = [
    { view: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { view: 'customers' as ViewType, label: 'Customers', icon: Users },
    { view: 'leads' as ViewType, label: 'Leads Pipeline', icon: Target },
    { view: 'employees' as ViewType, label: 'Officers Directory', icon: ShieldCheck },
    { view: 'tasks' as ViewType, label: 'Tasks', icon: CheckSquare },
    { view: 'calendar' as ViewType, label: 'Calendar Sync', icon: Calendar },
    { view: 'notifications' as ViewType, label: 'Notification Logs', icon: Bell },
    { view: 'reports' as ViewType, label: 'Reports & Stats', icon: BarChart3 },
    { view: 'settings' as ViewType, label: 'Settings', icon: Settings },
  ];

  const handleNav = (view: ViewType) => {
    setView(view);
    setIsOpenMobile(false);
  };

  const isSelected = (view: ViewType) => {
    if (view === currentView) return true;
    if (view === 'customers' && currentView === 'customer-profile') return true;
    if (view === 'employees' && currentView === 'employee-profile') return true;
    return false;
  };

  const containerClasses = `
    fixed inset-y-0 left-0 z-40 flex flex-col justify-between border-r 
    transition-all duration-500 ease-in-out
    ${theme === 'dark' 
      ? 'glass-panel border-white/5 text-gray-300' 
      : 'glass-panel-light border-black/5 text-gray-700'}
    ${isCollapsed ? 'w-20' : 'w-64'}
    ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-35 md:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside className={containerClasses}>
        {/* Brand Header */}
        <div className="flex items-center justify-between p-6 h-20 border-b border-white/5">
          <div 
            onClick={() => handleNav('dashboard')}
            className={`flex items-center gap-3 cursor-pointer select-none transition-all ${isCollapsed ? 'mx-auto' : ''}`}
          >
            <div className="relative p-2 bg-gradient-to-tr from-luxury-bronze to-luxury-gold rounded-xl shadow-lg shadow-luxury-gold/10">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            {!isCollapsed && (
              <span className="font-serif text-xl font-bold tracking-wider bg-gradient-to-r from-white via-luxury-gold-light to-luxury-gold bg-clip-text text-transparent">
                AURELIA
              </span>
            )}
          </div>

          {/* Collapse Button (Desktop Only) */}
          {!isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden md:flex p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsCollapsed(false)}
              className="hidden md:flex absolute -right-3 top-7 p-1 bg-brand-panel border border-white/10 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all shadow-md"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-6 px-3 overflow-y-auto no-scrollbar space-y-1">
          {menuItems.map((item) => {
            const active = isSelected(item.view);
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 relative group
                  ${active 
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-luxury-gold/10 to-transparent border-l-2 border-luxury-gold text-white font-medium shadow-[inset_1px_0_0_rgba(226,192,116,0.15)]'
                      : 'bg-gradient-to-r from-luxury-gold-dark/5 to-transparent border-l-2 border-luxury-gold-dark text-gray-900 font-medium'
                    : 'hover:bg-white/5 hover:text-white text-gray-400'
                  }
                  ${isCollapsed ? 'justify-center px-0' : ''}
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105 ${active ? 'text-luxury-gold' : ''}`} />
                {!isCollapsed && <span className="text-sm tracking-wide">{item.label}</span>}
                
                {/* Tooltip for Collapsed Sidebar */}
                {isCollapsed && (
                  <div className="absolute left-20 hidden group-hover:flex items-center z-50">
                    <div className="bg-brand-panel text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-white/10 font-medium whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
          {/* Collapse toggle footer on mobile */}
          <button
            onClick={onLogout}
            className={`
              w-full flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-gray-400 transition-all duration-300 group relative
              ${isCollapsed ? 'justify-center px-0' : ''}
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5 text-red-500/80" />
            {!isCollapsed && <span className="text-sm tracking-wide font-medium">Exit Aurelia</span>}

            {isCollapsed && (
              <div className="absolute left-20 hidden group-hover:flex items-center z-50">
                <div className="bg-brand-panel text-red-400 text-xs px-3 py-2 rounded-lg shadow-xl border border-white/10 font-medium whitespace-nowrap">
                  Exit Aurelia
                </div>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}