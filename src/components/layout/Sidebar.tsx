import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  CreditCard,
  Bell,
  Settings,
  FileText,
  Power,
  ChevronDown,
  User,
  LogOut,
  AlertCircle,
  Percent,
  PieChart,
  Library
} from 'lucide-react';
import { clsx } from 'clsx';
import logoUrl from '../../assets/images/logo/7sens.webp';
import bgImage from '../../assets/images/logo/authback.png';

export const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ Events: true });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    {
      name: 'Events',
      icon: Calendar,
      subItems: [
        { name: 'All Events', path: '/events' },
        { name: 'Add Event', path: '/events/add' }
      ]
    },
    { name: 'Bookings', icon: Ticket, path: '/bookings' },
    { name: 'Promo Codes', icon: Percent, path: '/coupons' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    // { name: 'Waiting List', icon: Hourglass, path: '/waiting-list' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Matchmaking Reports', icon: PieChart, path: '/reports/matchmaking' },
    { name: 'Questionnaire Library', icon: Library, path: '/questionnaire-library' },
    // { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    {
      name: 'CMS',
      icon: LayoutDashboard,
      subItems: [
        { name: 'Homepage', path: '/cms/homepage' },
        // { name: 'About Page', path: '/cms/about' },
        { name: 'FAQ', path: '/cms/faq' },
        { name: 'Contact Info', path: '/cms/contact' },
        { name: 'Terms & Conditions', path: '/cms/terms' },
        { name: 'Privacy Policy', path: '/cms/privacy' }
      ]
    },
    { name: 'Settings', icon: Settings, path: '/settings' },
    // { name: 'System Logs', icon: FileText, path: '/system-logs' },
    { name: 'Design System', icon: FileText, path: '/design-system' },
    { name: '404 Error Page', icon: AlertCircle, path: '/404-preview' },
  ];

  return (
    <aside
      className="w-[280px] flex flex-col h-screen fixed left-0 top-0 border-r border-gray-100 shadow-sm z-50 bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="p-8 pb-4 flex flex-col items-start">
        <img src={logoUrl} alt="7Sens Logo" className="h-16" />
      </div>

      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <li key={item.name} className="flex flex-col gap-1">
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleMenu(item.name)}
                    className="group flex items-center justify-between px-4 py-2 cursor-pointer text-[#1B2A4A] text-sm hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-all duration-200 font-medium rounded-none"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={18} className="text-[#1B2A4A]/70 group-hover:text-[#C9A84C] transition-colors" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 group-hover:text-[#C9A84C] transition-transform ${openMenus[item.name] ? 'rotate-180' : ''}`} />
                  </div>
                  {openMenus[item.name] && (
                    <ul className="flex flex-col gap-1 list-none pl-12 pr-4 py-1 m-0">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) => clsx(
                              "block px-3 py-2 text-sm no-underline rounded-none transition-colors font-medium border-l-2",
                              isActive
                                ? "border-[#C9A84C] text-[#C9A84C] bg-orange-50/30"
                                : "border-transparent text-[#1B2A4A]/80 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10"
                            )}
                            end={true}
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path!}
                  className={({ isActive }) => clsx(
                    "group flex items-center gap-4 px-4 py-2 no-underline rounded-none transition-all duration-200 font-medium text-sm",
                    isActive
                      ? "bg-[#C9A84C] text-white shadow-md"
                      : "text-[#1B2A4A] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                  )}
                  end={item.path === '/'}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={18} className={isActive ? "text-white" : "text-[#1B2A4A]/70 group-hover:text-[#C9A84C] transition-colors"} />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 relative">
        {/* Profile Dropdown Menu */}
        {showProfileMenu && (
          <div className="absolute bottom-[88px] left-6 right-6 bg-white border border-gray-100 shadow-lg p-2 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2">
            <button 
              onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C9A84C] transition-colors flex items-center gap-2 font-medium"
            >
              <Settings size={16} /> Settings
            </button>
            <div className="h-px bg-gray-100 my-1"></div>
            <button 
              onClick={() => { setShowProfileMenu(false); setShowLogoutDialog(true); }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium"
            >
              <Power size={16} /> Log Out
            </button>
          </div>
        )}

        {/* User Profile Block */}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={clsx(
            "flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm cursor-pointer hover:border-[#C9A84C]/50 transition-all duration-200 group relative overflow-hidden",
            showProfileMenu ? "border-[#C9A84C]/50 bg-white" : ""
          )}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C9A84C] to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-gradient-to-br from-[#1B2A4A] to-[#2a3f6c] flex items-center justify-center text-white overflow-hidden shadow-inner">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#1B2A4A]">Admin User</span>
              <span className="text-xs text-[#C9A84C] font-semibold tracking-wider uppercase">Super Admin</span>
            </div>
          </div>
          <ChevronDown size={16} className={clsx("text-gray-400 transition-transform duration-200", showProfileMenu ? "rotate-180 text-[#C9A84C]" : "group-hover:text-[#C9A84C]")} />
        </div>
      </div>

      {/* Logout Dialog */}
      {showLogoutDialog && (
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
                  setShowLogoutDialog(false);
                  navigate('/login');
                }}
                className="w-full py-3.5 bg-[#e3000f] hover:bg-red-700 text-white font-semibold transition-colors rounded-none"
              >
                Yes, Log Out
              </button>
              <button 
                onClick={() => setShowLogoutDialog(false)}
                className="w-full py-2 bg-transparent hover:bg-gray-50 text-[#334155] font-semibold transition-colors rounded-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
