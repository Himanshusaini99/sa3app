import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  BookOpen, 
  Trophy, 
  Clock, 
  GraduationCap, 
  Wallet, 
  MessageSquare, 
  User,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { authService } from '@/services/authService';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
  { icon: Trophy, label: 'Smart Curriculum', path: '/curriculum' },
  { icon: Clock, label: 'Timetable', path: '/timetable' },
  { icon: GraduationCap, label: 'Academic Marks', path: '/marks' },
  { icon: Wallet, label: 'Fees Structure', path: '/fees' },
  { icon: MessageSquare, label: 'Queries & Leaves', path: '/requests' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
  const userRole = localStorage.getItem('userRole');
  
  const filteredNavItems = navItems.filter(item => {
    if (userRole === 'FACULTY') {
      // Faculty only sees Dashboard, Profile, and maybe Queries
      return ['Dashboard', 'Queries & Leaves', 'Profile'].includes(item.label);
    }
    return true; // Students see everything
  });

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          <span>EduSmart</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={() => {
            authService.logout();
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
