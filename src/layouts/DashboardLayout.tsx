import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Menu, Globe, ChevronDown, Bell, Ticket, Calendar, AlertCircle, CreditCard, CheckCircle2 } from 'lucide-react';
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
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
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
