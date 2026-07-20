import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Menu, Globe, ChevronDown, Bell, Ticket, Calendar, AlertCircle, CreditCard, CheckCircle2, User, Settings, LogOut, Shield } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'booking', title: 'New Booking', message: 'John Doe booked 2 tickets for Sunset Rooftop Party', time: '2 mins ago', unread: true, icon: Ticket, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 2, type: 'event', title: 'Event Update', message: 'Wine & Dine Experience is starting in 2 days', time: '1 hour ago', unread: true, icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 3, type: 'system', title: 'System Alert', message: 'Server maintenance scheduled for tonight at 2 AM', time: '5 hours ago', unread: true, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 4, type: 'payment', title: 'Payment Received', message: 'Payment of CHF 120 received from Sarah Smith', time: '1 day ago', unread: false, icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50' },
];

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN');

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#f8f9fa]">
      <Sidebar />
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center">
            <button className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors">
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-none shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {language === 'FR' ? (
                  <img src="https://flagcdn.com/w20/fr.png" width="16" alt="FR" className="rounded-sm" />
                ) : (
                  <img src="https://flagcdn.com/w20/gb.png" width="16" alt="EN" className="rounded-sm" />
                )}
                <span>{language}</span>
                <ChevronDown size={14} className={clsx("text-gray-400 transition-transform", showLanguageMenu && "rotate-180")} />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl z-50 overflow-hidden rounded-none animate-in fade-in slide-in-from-top-2 duration-200 py-1">
                  <button 
                    onClick={() => { setLanguage('FR'); setShowLanguageMenu(false); }}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 border-none bg-transparent text-left cursor-pointer font-medium"
                  >
                    <img src="https://flagcdn.com/w20/fr.png" width="16" alt="FR" className="rounded-sm" />
                    <span>French</span>
                  </button>
                  <button 
                    onClick={() => { setLanguage('EN'); setShowLanguageMenu(false); }}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 border-none bg-transparent text-left cursor-pointer font-medium"
                  >
                    <img src="https://flagcdn.com/w20/gb.png" width="16" alt="EN" className="rounded-sm" />
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={clsx(
                  "relative p-2 transition-colors rounded-full",
                  showNotifications ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A84C] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#f8f9fa]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 shadow-xl z-50 overflow-hidden rounded-md animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-[var(--color-navy)]">Notifications</h3>
                    <button className="text-xs text-[var(--color-gold)] hover:underline font-medium flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto">
                    {MOCK_NOTIFICATIONS.length > 0 ? (
                      <div className="flex flex-col">
                        {MOCK_NOTIFICATIONS.map((notification) => (
                          <div
                            key={notification.id}
                            className={clsx(
                              "flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer",
                              notification.unread ? "bg-white" : "bg-gray-50/30 opacity-75"
                            )}
                          >
                            <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5", notification.bg)}>
                              <notification.icon size={18} className={notification.color} />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className={clsx("text-sm font-semibold", notification.unread ? "text-gray-900" : "text-gray-700")}>
                                  {notification.title}
                                </span>
                                {notification.unread && (
                                  <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] shrink-0"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                {notification.message}
                              </p>
                              <span className="text-[10px] text-gray-400 font-medium mt-1">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-2">
                        <Bell size={32} className="text-gray-300" />
                        <p className="text-sm">No new notifications</p>
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/notifications');
                      }}
                      className="w-full py-2 text-sm text-[var(--color-navy)] hover:text-[var(--color-gold)] font-medium transition-colors text-center"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative font-sans" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1.5 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer rounded-none"
              >
                <div className="w-9 h-9 rounded-none bg-orange-100 flex items-center justify-center text-orange-500 overflow-hidden font-bold">
                  AU
                </div>
                <div className="hidden md:flex flex-col items-start text-left">
                  <span className="text-sm font-bold text-[#1B2A4A] leading-tight">Admin User</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Super Admin</span>
                </div>
                <ChevronDown size={14} className={clsx("text-gray-400 transition-transform", showProfileMenu && "rotate-180")} />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl z-50 overflow-hidden rounded-none animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3.5 border-b border-gray-100 bg-gray-50/50 text-left">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Signed in as</p>
                    <p className="text-sm font-bold text-[#1B2A4A] truncate mt-0.5">admin@7sens.ch</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/settings');
                      }}
                      className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-colors flex items-center gap-3 border-none bg-transparent text-left cursor-pointer"
                    >
                      <User size={16} />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/settings');
                      }}
                      className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-colors flex items-center gap-3 border-none bg-transparent text-left cursor-pointer"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/settings');
                      }}
                      className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-colors flex items-center gap-3 border-none bg-transparent text-left cursor-pointer"
                    >
                      <Shield size={16} />
                      <span>Account Security</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 border-none bg-transparent text-left cursor-pointer font-medium"
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-8 pb-4 pt-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 flex items-center justify-between text-xs text-gray-400 border-t border-gray-200/60 mt-auto">
          <span>© 2026 7Sens. All rights reserved.</span>
        </footer>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-[400px] bg-white p-10 shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <LogOut size={28} className="text-[#e3000f]" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-[#1a2b49] mb-4">Ready to Leave?</h3>
            <p className="text-[#64748b] text-base mb-8 leading-relaxed px-2">
              Are you sure you want to log out of your account? You will need to enter your credentials to log back in.
            </p>
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  navigate('/login');
                }}
                className="w-full py-3.5 bg-[#e3000f] hover:bg-red-700 text-white font-semibold transition-colors border-none cursor-pointer rounded-none"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-2 bg-transparent hover:bg-gray-50 text-[#334155] font-semibold transition-colors border-none cursor-pointer rounded-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
