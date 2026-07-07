import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Menu, Globe, ChevronDown, Bell } from 'lucide-react';

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#f8f9fa]">
      <Sidebar />
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-transparent flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center">
            <button className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors">
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-none shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Globe size={16} className="text-gray-500" />
              <span>EN</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={24} />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-none bg-[#C9A84C] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#f8f9fa]">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-8 pb-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 flex items-center justify-between text-xs text-gray-400 border-t border-gray-200/60 mt-auto">
          <span>© 2026 7Sens. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
};
