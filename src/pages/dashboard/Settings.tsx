import { useState } from 'react';
import { 
  ChevronRight,
  Save,
  Clock,
  Bell,
  Users,
  Settings as SettingsIcon,
  Sliders,
  Info,
  Calendar,
  DollarSign,
  Globe,
  MapPin,
  Edit2,
  User,
  CheckCircle2,
  FileBox,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Toggle = ({ active, colorClass = 'bg-[#C9A84C]' }: { active: boolean, colorClass?: string }) => (
  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${active ? colorClass : 'bg-gray-200'}`}>
    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-[22px]' : 'left-0.5'}`}></div>
  </div>
);

export const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Timer Durations');

  const TABS = [
    { id: 'Timer Durations', icon: Clock },
    { id: 'Notification Settings', icon: Bell },
    { id: 'Quota Defaults', icon: Users },
    { id: 'General', icon: SettingsIcon },
    { id: 'Other Preferences', icon: Sliders }
  ];

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">Platform Settings</h1>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight size={14} />
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">Settings</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">General Settings</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white font-medium rounded-none hover:bg-[#b59641] transition-colors shadow-sm">
          <Save size={18} /> Save Changes
        </button>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-gray-200 flex overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-[#C9A84C] text-[#C9A84C]' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon size={18} />
            {tab.id}
          </button>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Column - Main Content */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Timer Durations Card */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#1B2A4A] mb-1">Timer Durations</h2>
              <p className="text-sm text-gray-500">Configure default timer durations used across the platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              
              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                  Invitation Timer (Default) <Info size={14} className="text-gray-400" />
                </label>
                <div className="flex">
                  <input type="text" defaultValue="24" className="w-16 px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] text-center font-medium" />
                  <div className="relative flex-1 border-y border-r border-gray-200 bg-white flex items-center">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] rounded-none cursor-pointer">
                      <option>Hours</option>
                      <option>Days</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Time to complete registration after invitation</p>
              </div>

              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                  Invitation Timer (Max) <Info size={14} className="text-gray-400" />
                </label>
                <div className="flex">
                  <input type="text" defaultValue="48" className="w-16 px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] text-center font-medium" />
                  <div className="relative flex-1 border-y border-r border-gray-200 bg-white flex items-center">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] rounded-none cursor-pointer">
                      <option>Hours</option>
                      <option>Days</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Maximum invitation time allowed</p>
              </div>

              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                  Waiting List Expiry <Info size={14} className="text-gray-400" />
                </label>
                <div className="flex">
                  <input type="text" defaultValue="30" className="w-16 px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] text-center font-medium" />
                  <div className="relative flex-1 border-y border-r border-gray-200 bg-white flex items-center">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] rounded-none cursor-pointer">
                      <option>Days</option>
                      <option>Hours</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Auto remove from waitlist after duration</p>
              </div>

              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                  Pre-Event Reminder <Info size={14} className="text-gray-400" />
                </label>
                <div className="flex">
                  <input type="text" defaultValue="24" className="w-16 px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] text-center font-medium" />
                  <div className="relative flex-1 border-y border-r border-gray-200 bg-white flex items-center">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] rounded-none cursor-pointer">
                      <option>Hours</option>
                      <option>Days</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Reminder before event start time</p>
              </div>

              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                  Check-in Start Time <Info size={14} className="text-gray-400" />
                </label>
                <div className="flex">
                  <input type="text" defaultValue="2" className="w-16 px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] text-center font-medium" />
                  <div className="relative flex-1 border-y border-r border-gray-200 bg-white flex items-center">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] rounded-none cursor-pointer">
                      <option>Hours</option>
                      <option>Minutes</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Before event start time</p>
              </div>

              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                  Check-in End Time <Info size={14} className="text-gray-400" />
                </label>
                <div className="flex">
                  <input type="text" defaultValue="30" className="w-16 px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] text-center font-medium" />
                  <div className="relative flex-1 border-y border-r border-gray-200 bg-white flex items-center">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] rounded-none cursor-pointer">
                      <option>Minutes</option>
                      <option>Hours</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">After event start time</p>
              </div>

              {/* Toggle Group */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Auto Confirm on Full Payment <Info size={14} className="text-gray-400" />
                  </label>
                  <Toggle active={true} />
                </div>
                <p className="text-[11px] text-gray-500">Enable auto confirmation when full payment received</p>
              </div>

              {/* Toggle Group */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Auto Move from Waitlist <Info size={14} className="text-gray-400" />
                  </label>
                  <Toggle active={true} />
                </div>
                <p className="text-[11px] text-gray-500">Automatically move next person when a spot is available</p>
              </div>

              {/* Input Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                  Queue Refresh Interval <Info size={14} className="text-gray-400" />
                </label>
                <div className="flex">
                  <input type="text" defaultValue="5" className="w-16 px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] text-center font-medium" />
                  <div className="relative flex-1 border-y border-r border-gray-200 bg-white flex items-center">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] rounded-none cursor-pointer">
                      <option>Minutes</option>
                      <option>Seconds</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Interval to refresh waiting list queue</p>
              </div>

            </div>
          </div>

          {/* Notification Settings Card */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100 overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 min-w-[700px]">
              <div>
                <h2 className="text-lg font-bold text-[#1B2A4A] mb-1">Notification Settings</h2>
                <p className="text-sm text-gray-500">Manage global notification preferences and defaults.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-[#1B2A4A] font-medium text-sm rounded-none hover:bg-gray-50 transition-colors">
                <FileBox size={16} /> Manage Templates
              </button>
            </div>

            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 text-sm font-bold text-[#1B2A4A]">Notification Type</th>
                  <th className="pb-4 text-sm font-bold text-[#1B2A4A] text-center">Email</th>
                  <th className="pb-4 text-sm font-bold text-[#1B2A4A] text-center">SMS</th>
                  <th className="pb-4 text-sm font-bold text-[#1B2A4A] text-center">WhatsApp</th>
                  <th className="pb-4 text-sm font-bold text-[#1B2A4A] text-center">Push</th>
                  <th className="pb-4 text-sm font-bold text-[#1B2A4A] text-center flex items-center justify-center gap-1">In-App <Info size={14} className="text-gray-400" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-4">
                    <p className="text-sm font-bold text-[#1B2A4A]">New Booking</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">When a user makes a new booking</p>
                  </td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={false} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} colorClass="bg-green-500" /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <p className="text-sm font-bold text-[#1B2A4A]">Booking Confirmed</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">When a booking is confirmed</p>
                  </td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={false} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} colorClass="bg-green-500" /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <p className="text-sm font-bold text-[#1B2A4A]">Booking Cancelled</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">When a booking is cancelled</p>
                  </td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={false} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} colorClass="bg-green-500" /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <p className="text-sm font-bold text-[#1B2A4A]">Waitlist Promotion</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">When user is promoted from waitlist</p>
                  </td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} colorClass="bg-green-500" /></div></td> {/* Highlighted green in image for SMS here */}
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} colorClass="bg-green-500" /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                </tr>
                <tr>
                  <td className="py-4">
                    <p className="text-sm font-bold text-[#1B2A4A]">Event Reminder</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Reminder before event start</p>
                  </td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={false} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} colorClass="bg-green-500" /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                  <td className="py-4"><div className="flex justify-center"><Toggle active={true} /></div></td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6">
              <button className="flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-[#f2deaa] text-[#C9A84C] font-bold text-sm rounded-none hover:bg-orange-50 transition-colors w-fit bg-orange-50/30">
                <SettingsIcon size={16} /> Customize Per Event Type
              </button>
            </div>
          </div>

        </div>

        {/* Right Column - Sidebars */}
        <div className="w-full xl:w-[350px] flex flex-col gap-6 shrink-0">
          
          {/* Settings Overview */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-1 flex items-center gap-2">
              <SettingsIcon size={18} className="text-[#C9A84C]" />
              Settings Overview
            </h3>
            <p className="text-xs text-gray-500 mb-5">Configure platform-wide settings and defaults.</p>
            
            <div className="flex flex-col gap-3 text-sm mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><Clock size={14} className="text-gray-400"/> Platform Timezone</span>
                <span className="text-gray-600 font-medium">Europe/Zurich (CET)</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><Calendar size={14} className="text-gray-400"/> Date Format</span>
                <span className="text-gray-600 font-medium">dd-mm-yyyy</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><DollarSign size={14} className="text-gray-400"/> Currency</span>
                <span className="text-gray-600 font-medium">CHF (Swiss Franc)</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><Globe size={14} className="text-gray-400"/> Language</span>
                <span className="text-gray-600 font-medium">English</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><MapPin size={14} className="text-gray-400"/> Default Country</span>
                <span className="text-gray-600 font-medium">Switzerland</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#C9A84C] text-[#C9A84C] font-semibold text-sm rounded-none hover:bg-orange-50/20 transition-colors">
              <Edit2 size={16} /> Edit General Settings
            </button>
          </div>

          {/* Quota Defaults */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-1 flex items-center gap-2">
              <Users size={18} className="text-[#C9A84C]" />
              Quota Defaults
            </h3>
            <p className="text-xs text-gray-500 mb-5">Set default quotas for new events.</p>
            
            <div className="flex flex-col gap-3 text-sm mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><span className="text-lg w-4 text-center leading-none text-gray-400">♂</span> Required Male Quota</span>
                <span className="text-gray-600 font-medium">50</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><span className="text-lg w-4 text-center leading-none text-gray-400">♀</span> Required Female Quota</span>
                <span className="text-gray-600 font-medium">50</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><Users size={14} className="text-gray-400"/> Total Capacity</span>
                <span className="text-gray-600 font-medium">100</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#C9A84C] text-[#C9A84C] font-semibold text-sm rounded-none hover:bg-orange-50/20 transition-colors">
              <Edit2 size={16} /> Edit Quota Defaults
            </button>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-1 flex items-center gap-2">
              <Info size={18} className="text-gray-400" />
              System Info
            </h3>
            <p className="text-xs text-gray-500 mb-5">Current configuration details.</p>
            
            <div className="flex flex-col gap-3 text-sm mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><User size={14} className="text-gray-400"/> Last Updated By</span>
                <span className="text-gray-600 font-medium">Admin User</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><Calendar size={14} className="text-gray-400"/> Last Updated On</span>
                <span className="text-gray-600 font-medium text-xs">May 18, 2025 10:25 AM</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[#1B2A4A] flex items-center gap-2 font-medium"><SettingsIcon size={14} className="text-gray-400"/> Settings Version</span>
                <span className="text-gray-600 font-medium">v1.8.0</span>
              </div>
            </div>

            <div className="w-full bg-green-50 border border-green-100 p-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <span className="text-green-700 text-xs font-bold">All settings are up to date</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
