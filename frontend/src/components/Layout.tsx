import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ChatBot } from './ChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const userRole = localStorage.getItem('userRole');
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8">
          {children}
        </main>
      </div>
      {userRole === 'STUDENT' && <ChatBot />}
    </div>
  );
};
