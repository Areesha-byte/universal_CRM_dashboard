/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ViewType, Customer, Lead, Task, Employee } from './types';
import { INITIAL_CUSTOMERS, INITIAL_LEADS, INITIAL_TASKS, INITIAL_EMPLOYEES } from './data';

// Components
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';

// Views
import LandingView from './views/LandingView';
import DashboardView from './views/DashboardView';
import CustomersView from './views/CustomersView';
import CustomerProfileView from './views/CustomerProfileView';
import LeadsView from './views/LeadsView';
import TasksView from './views/TasksView';
import CalendarView from './views/CalendarView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';
import ForgotPasswordView from './views/ForgotPasswordView';
import EmployeesView from './views/EmployeesView';
import NotificationsView from './views/NotificationsView';

export default function App() {
  const [currentView, setView] = useState<ViewType>('landing');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Unified persistent memory states
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(INITIAL_CUSTOMERS[0]);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);

  const handleLogout = () => {
    setView('landing');
  };

  const handleLoginSuccess = () => {
    setView('dashboard');
  };

  const isFullPage = 
    currentView === 'landing' || 
    currentView === 'login' || 
    currentView === 'forgot-password';

  return (
    <div className={`${theme} min-h-screen transition-colors duration-500`}>
      {isFullPage ? (
        // Fullscreen site pages (Landing, Login, Recovery)
        <main className="w-full">
          {currentView === 'landing' && <LandingView setView={setView} />}
          {currentView === 'login' && (
            <LoginView setView={setView} onLoginSuccess={handleLoginSuccess} />
          )}
          {currentView === 'forgot-password' && (
            <ForgotPasswordView setView={setView} />
          )}
        </main>
      ) : (
        // Executive Core CRM Application Frame
        <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#050507]' : 'bg-gray-50'}`}>
          {/* Collapsible and Responsive Sidebar */}
          <Sidebar
            currentView={currentView}
            setView={setView}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isOpenMobile={isOpenMobile}
            setIsOpenMobile={setIsOpenMobile}
            theme={theme}
            onLogout={handleLogout}
          />

          {/* Core Content Shell */}
          <div 
            className={`
              flex-1 flex flex-col transition-all duration-500 ease-in-out min-w-0
              ${isCollapsed ? 'md:pl-20' : 'md:pl-64'}
            `}
          >
            {/* Top Navigation Utilities */}
            <TopNav
              setView={setView}
              isOpenMobile={isOpenMobile}
              setIsOpenMobile={setIsOpenMobile}
              theme={theme}
              setTheme={setTheme}
              onLogout={handleLogout}
            />

            {/* View Port Router with ambient luxury indicators */}
            <main className="flex-1 p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Subtle background nodes for luxury dark mood */}
              {theme === 'dark' && (
                <>
                  <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full ambient-glowing-sphere-gold pointer-events-none" />
                  <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full ambient-glowing-sphere-purple pointer-events-none" />
                </>
              )}

              <div className="relative z-10 max-w-7xl mx-auto">
                {currentView === 'dashboard' && (
                  <DashboardView
                    setView={setView}
                    setSelectedCustomer={setSelectedCustomer}
                    customers={customers}
                    leads={leads}
                    tasks={tasks}
                    setCustomers={setCustomers}
                    setLeads={setLeads}
                    setTasks={setTasks}
                  />
                )}
                {currentView === 'customers' && (
                  <CustomersView
                    customers={customers}
                    setCustomers={setCustomers}
                    setView={setView}
                    setSelectedCustomer={setSelectedCustomer}
                    theme={theme}
                  />
                )}
                {currentView === 'customer-profile' && (
                  <CustomerProfileView
                    customer={selectedCustomer}
                    onBack={() => setView('customers')}
                    setCustomers={setCustomers}
                    customers={customers}
                  />
                )}
                {currentView === 'leads' && (
                  <LeadsView leads={leads} setLeads={setLeads} />
                )}
                {currentView === 'tasks' && (
                  <TasksView tasks={tasks} setTasks={setTasks} employees={employees} />
                )}
                {currentView === 'employees' && (
                  <EmployeesView
                    employees={employees}
                    setEmployees={setEmployees}
                    tasks={tasks}
                    setTasks={setTasks}
                    setView={setView}
                    theme={theme}
                  />
                )}
                {currentView === 'calendar' && (
                  <CalendarView />
                )}
                {currentView === 'reports' && (
                  <ReportsView />
                )}
                {currentView === 'notifications' && (
                  <NotificationsView />
                )}
                {currentView === 'settings' && (
                  <SettingsView />
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
