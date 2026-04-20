import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { USERS } from '../data/mockData';

export const Navbar = () => {
  const userRole = localStorage.getItem('userRole');
  const user = userRole === 'faculty' ? USERS.faculty : USERS.student;

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg w-96">
        <Search className="w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search subjects, activities..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.id}</p>
          </div>
          <img 
            src={user.profileImage} 
            alt={user.name} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
};
