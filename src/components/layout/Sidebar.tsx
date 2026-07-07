import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  User
} from 'lucide-react';
import { clsx } from 'clsx';
import logoUrl from '../../assets/images/logo/7sens.webp';
import bgImage from '../../assets/images/logo/authback.png';

export const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ Events: true });

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
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    // { name: 'Waiting List', icon: Hourglass, path: '/waiting-list' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
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
                    className="group flex items-center justify-between px-4 py-3 cursor-pointer text-gray-600 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-all duration-200 font-medium rounded-none"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className="text-gray-500 group-hover:text-[#C9A84C] transition-colors" />
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
                                : "border-transparent text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10"
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
                    "group flex items-center gap-4 px-4 py-3 no-underline rounded-none transition-all duration-200 font-medium",
                    isActive
                      ? "bg-[#C9A84C] text-white shadow-md"
                      : "text-gray-600 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                  )}
                  end={item.path === '/'}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={20} className={isActive ? "text-white" : "text-gray-500 group-hover:text-[#C9A84C] transition-colors"} />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 flex flex-col gap-4">
        {/* User Profile Block */}
        <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-none shadow-sm cursor-pointer hover:bg-white transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-orange-100 flex items-center justify-center text-orange-500 overflow-hidden">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--color-navy)]">Admin User</span>
              <span className="text-xs text-gray-500">Super Admin</span>
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        {/* Log Out */}
        <NavLink
          to="/login"
          className="group flex items-center gap-4 px-4 py-3 text-gray-600 no-underline rounded-none transition-all duration-200 font-medium hover:bg-red-50 hover:text-red-600"
        >
          <Power size={20} className="text-gray-500 group-hover:text-red-600 transition-colors" />
          <span>Log Out</span>
        </NavLink>
      </div>
    </aside>
  );
};
