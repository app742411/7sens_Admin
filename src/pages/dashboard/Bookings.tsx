import { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  Calendar, 
  ChevronDown, 
  Filter, 
  Download,
  MoreHorizontal,
  Eye,
  Plus,
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../../components/common/MetricCard';

const MOCK_BOOKINGS = [
  {
    id: 'BK-2025-1246',
    bookedOn: 'Jun 18, 2025, 10:25 AM',
    event: {
      title: 'Sunset Rooftop Party',
      date: 'Jun 28, 2025',
      time: '07:00 PM',
      location: 'Zurich',
      image: 'https://picsum.photos/seed/event1/100/60'
    },
    user: {
      name: 'Marie Dupont',
      email: 'marie.dupont@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
    },
    dateTime: 'May 18, 2025\n10:25 AM',
    tickets: '2\nAdults',
    amount: 'CHF 240.00',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Card'
  },
  {
    id: 'BK-2025-1245',
    bookedOn: 'Jun 18, 2025, 09:15 AM',
    event: {
      title: 'Wine & Dine Experience',
      date: 'Jul 12, 2025',
      time: '06:30 PM',
      location: 'Zurich',
      image: 'https://picsum.photos/seed/event2/100/60'
    },
    user: {
      name: 'Jean Martin',
      email: 'jean.martin@email.com',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
    },
    dateTime: 'May 18, 2025\n09:15 AM',
    tickets: '4\nAdults',
    amount: 'CHF 480.00',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    paymentMethod: ''
  },
  {
    id: 'BK-2025-1244',
    bookedOn: 'Jun 17, 2025, 08:30 PM',
    event: {
      title: 'Exclusive Yacht Night',
      date: 'Jul 26, 2025',
      time: '08:00 PM',
      location: 'Zurich',
      image: 'https://picsum.photos/seed/event4/100/60'
    },
    user: {
      name: 'Sophie Bernard',
      email: 'sophie.bernard@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
    },
    dateTime: 'May 17, 2025\n08:30 PM',
    tickets: '3\nAdults',
    amount: 'CHF 750.00',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'PayPal'
  },
  {
    id: 'BK-2025-1243',
    bookedOn: 'Jun 17, 2025, 05:20 PM',
    event: {
      title: 'Private Art Gallery',
      date: 'Aug 09, 2025',
      time: '05:00 PM',
      location: 'Zurich',
      image: 'https://picsum.photos/seed/event5/100/60'
    },
    user: {
      name: 'Lucas Morel',
      email: 'lucas.morel@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
    },
    dateTime: 'May 17, 2025\n05:20 PM',
    tickets: '1\nAdult',
    amount: 'CHF 120.00',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    paymentMethod: ''
  },
  {
    id: 'BK-2025-1242',
    bookedOn: 'Jun 16, 2025, 03:40 PM',
    event: {
      title: 'Live Jazz Concert',
      date: 'Jul 05, 2025',
      time: '09:00 PM',
      location: 'Zurich',
      image: 'https://picsum.photos/seed/event6/100/60'
    },
    user: {
      name: 'Emma Dupont',
      email: 'emma.dupont@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop'
    },
    dateTime: 'May 16, 2025\n03:40 PM',
    tickets: '2\nAdults',
    amount: 'CHF 180.00',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Card'
  },
  {
    id: 'BK-2025-1241',
    bookedOn: 'Jun 16, 2025, 11:10 AM',
    event: {
      title: 'Chef\'s Table Experience',
      date: 'Jul 19, 2025',
      time: '07:30 PM',
      location: 'Zurich',
      image: 'https://picsum.photos/seed/event7/100/60'
    },
    user: {
      name: 'Thomas Fischer',
      email: 'thomas.fischer@email.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
    },
    dateTime: 'May 16, 2025\n11:10 AM',
    tickets: '2\nAdults',
    amount: 'CHF 320.00',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    paymentMethod: ''
  },
  {
    id: 'BK-2025-1240',
    bookedOn: 'Jun 15, 2025, 10:05 AM',
    event: {
      title: 'Beach Party Bash',
      date: 'Jun 30, 2025',
      time: '02:00 PM',
      location: 'Zurich',
      image: 'https://picsum.photos/seed/event8/100/60'
    },
    user: {
      name: 'Camille Leroy',
      email: 'camille.leroy@email.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop'
    },
    dateTime: 'May 15, 2025\n10:05 AM',
    tickets: '5\nAdults',
    amount: 'CHF 500.00',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    paymentMethod: ''
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  let bg = '';
    
  switch (status) {
    case 'Confirmed':
      bg = 'bg-green-50 border-green-200 text-green-600';
      break;
    case 'Pending':
      bg = 'bg-blue-50 border-blue-200 text-blue-500';
      break;
    case 'Cancelled':
      bg = 'bg-red-50 border-red-200 text-red-500';
      break;
    default:
      bg = 'bg-gray-50 border-gray-200 text-gray-600';
  }

  return (
    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-none border ${bg}`}>
      {status}
    </span>
  );
};

export const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Bookings');

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">Bookings</h1>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight size={14} />
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">Bookings</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">All Bookings</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white font-medium rounded-none hover:bg-[#b59641] transition-colors shadow-sm">
          <Plus size={18} /> New Booking
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard 
          title="Total Bookings" 
          value="1,246" 
          icon={<CalendarCheck size={20} />} 
          trend="up" 
          trendValue="15.8%" 
          trendText="from last month"
          iconBgClass="bg-purple-50"
          iconColorClass="text-purple-600"
        />
        <MetricCard 
          title="Confirmed" 
          value="842" 
          icon={<CheckCircle2 size={20} />} 
          trend="up" 
          trendValue="16.3%" 
          trendText="from last month"
          iconBgClass="bg-green-50"
          iconColorClass="text-green-500"
        />
        <MetricCard 
          title="Pending" 
          value="176" 
          icon={<Clock size={20} />} 
          trend="down" 
          trendValue="4.6%" 
          trendText="from last month"
          iconBgClass="bg-orange-50"
          iconColorClass="text-orange-500"
        />
        <MetricCard 
          title="Cancelled" 
          value="98" 
          icon={<XCircle size={20} />} 
          trend="down" 
          trendValue="2.1%" 
          trendText="from last month"
          iconBgClass="bg-red-50"
          iconColorClass="text-red-500"
        />
        <MetricCard 
          title="Total Revenue" 
          value="CHF 125,430" 
          icon={<DollarSign size={20} />} 
          trend="up" 
          trendValue="18.7%" 
          trendText="from last month"
          iconBgClass="bg-blue-50"
          iconColorClass="text-blue-500"
        />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Column - Main Content */}
        <div className="flex-1 min-w-0 w-full bg-white rounded-none shadow-sm border border-gray-100 flex flex-col">
          
          {/* Top Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-[400px]">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by booking ID, event name, user name, email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
                <Calendar size={16} className="text-[#1B2A4A]" />
                May 18, 2025 - Jun 18, 2025
                <ChevronDown size={16} className="text-gray-400 ml-1" />
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
                <Filter size={16} className="text-[#1B2A4A]" />
                Filters
                <ChevronDown size={16} className="text-gray-400 ml-1" />
              </button>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
                <Download size={16} className="text-[#1B2A4A]" />
                Export
                <ChevronDown size={16} className="text-gray-400 ml-1" />
              </button>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="p-5 border-b border-gray-100 flex gap-4 overflow-x-auto items-center">
            <div className="relative shrink-0 min-w-[150px]">
              <select className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                <option>All Events</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative shrink-0 min-w-[150px]">
              <select className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                <option>All Status</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative shrink-0 min-w-[180px]">
              <select className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                <option>All Payment Status</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative shrink-0 min-w-[200px]">
              <select className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                <option>All Payment Methods</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative shrink-0 min-w-[150px]">
              <select className="w-full appearance-none pl-4 pr-10 py-2 border-transparent text-sm font-medium text-gray-500 bg-transparent hover:text-gray-700 focus:outline-none cursor-pointer">
                <option>All Channels</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <button className="text-sm font-bold text-[#1B2A4A] underline ml-auto shrink-0 whitespace-nowrap pr-2">Clear All</button>
          </div>

          {/* Sub Tabs */}
          <div className="flex border-b border-gray-100 px-2 overflow-x-auto hide-scrollbar">
            {['All Bookings', 'Confirmed', 'Pending', 'Cancelled', 'Refunded'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-[#C9A84C] text-[#C9A84C]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-white">
                  <th className="px-3 py-4 w-[50px] shrink-0">
                    <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                  </th>
                  <th className="px-3 py-4 w-[110px]">Booking ID</th>
                  <th className="px-3 py-4 w-[220px]">Event</th>
                  <th className="px-3 py-4 w-[180px]">User</th>
                  <th className="px-3 py-4 w-[90px]">Tickets</th>
                  <th className="px-3 py-4 w-[90px]">Amount</th>
                  <th className="px-3 py-4 w-[95px]">Status</th>
                  <th className="px-3 py-4 w-[130px]">Payment</th>
                  <th className="px-3 py-4 w-[85px] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_BOOKINGS.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                    <td className="px-3 py-4">
                      <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                    </td>
                    <td className="px-3 py-4">
                      <h4 className="text-sm font-bold text-[#1B2A4A]">{booking.id}</h4>
                      <p className="text-[11px] text-gray-500 whitespace-nowrap">{booking.bookedOn}</p>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <img src={booking.event.image} alt={booking.event.title} className="w-12 h-8 rounded-none object-cover shrink-0 border border-gray-100" />
                        <div>
                          <p className="text-sm font-bold text-[#1B2A4A] truncate max-w-[160px]">{booking.event.title}</p>
                          <p className="text-[11px] text-gray-500 whitespace-nowrap">{booking.event.date} • {booking.event.time}</p>
                          <p className="text-[11px] text-gray-400 whitespace-nowrap">{booking.event.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <img src={booking.user.avatar} alt={booking.user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-[#1B2A4A] truncate max-w-[140px]">{booking.user.name}</p>
                          <p className="text-[11px] text-gray-500 truncate max-w-[140px]">{booking.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700 font-semibold">{booking.tickets.replace('\n', ' ')}</p>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <p className="text-sm text-[#1B2A4A] font-bold">{booking.amount}</p>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-none ${
                        booking.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600' :
                        booking.paymentStatus === 'Unpaid' ? 'bg-orange-50 text-orange-500' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => navigate(`/bookings/${booking.id}`)}
                          className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white cursor-pointer">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
            <div className="text-sm text-gray-500 font-medium">
              Showing 1 to 10 of 1,246 bookings
            </div>
            
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#1B2A4A] bg-[#1B2A4A] text-white rounded-none text-sm font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">2</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">3</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">4</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">5</button>
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">125</button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded-none text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                <option>10 / page</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column - Sidebars */}
        <div className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Booking Overview */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-6">Booking Overview</h3>
            
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 shrink-0">
                {/* Mock Donut Chart using SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="16" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray="160 251.2" /> {/* Green (Confirmed) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="40 251.2" strokeDashoffset="-160" /> {/* Orange (Pending) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="20 251.2" strokeDashoffset="-200" /> {/* Red (Cancelled) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="15 251.2" strokeDashoffset="-220" /> {/* Blue (Refunded) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1B2A4A" strokeWidth="16" strokeDasharray="16.2 251.2" strokeDashoffset="-235" /> {/* Dark (No Show) */}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-bold text-[#1B2A4A] leading-tight">1,246</span>
                  <span className="text-[10px] text-gray-500 font-medium">Total</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 flex-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="flex items-center gap-1.5 font-medium text-[#1B2A4A]"><span className="w-2 h-2 rounded-full bg-green-500"></span> Confirmed</span>
                  <span className="text-gray-500">842 (67.6%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="flex items-center gap-1.5 font-medium text-[#1B2A4A]"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Pending</span>
                  <span className="text-gray-500">176 (14.1%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="flex items-center gap-1.5 font-medium text-[#1B2A4A]"><span className="w-2 h-2 rounded-full bg-red-500"></span> Cancelled</span>
                  <span className="text-gray-500">98 (7.9%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="flex items-center gap-1.5 font-medium text-[#1B2A4A]"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Refunded</span>
                  <span className="text-gray-500">62 (5.0%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="flex items-center gap-1.5 font-medium text-[#1B2A4A]"><span className="w-2 h-2 rounded-full bg-[#1B2A4A]"></span> No Show</span>
                  <span className="text-gray-500">68 (5.4%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Overview */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-4">Revenue Overview</h3>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[#1B2A4A]">CHF 125,430</h4>
              <p className="text-xs font-semibold text-green-500 flex items-center gap-1 mt-1">
                <span className="text-lg leading-none transform -rotate-45">→</span> 18.7% <span className="text-gray-400 font-medium">from last month</span>
              </p>
            </div>
            
            {/* Mock Line Chart */}
            <div className="h-32 w-full relative">
              <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                <path d="M 0 80 Q 25 75 50 60 T 100 70 T 150 40 T 200 45 T 250 15 T 300 30" fill="none" stroke="#fcd34d" strokeWidth="2" />
                <circle cx="0" cy="80" r="3" fill="#f59e0b" />
                <circle cx="50" cy="60" r="3" fill="#f59e0b" />
                <circle cx="100" cy="70" r="3" fill="#f59e0b" />
                <circle cx="150" cy="40" r="3" fill="#f59e0b" />
                <circle cx="200" cy="45" r="3" fill="#f59e0b" />
                <circle cx="250" cy="15" r="3" fill="#f59e0b" />
                <circle cx="300" cy="30" r="3" fill="#f59e0b" />
              </svg>
              <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[9px] text-gray-400 font-medium uppercase px-1">
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>

          {/* Top Events by Bookings */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-5">Top Events by Bookings</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/event1/40/40" className="w-8 h-8 rounded-sm object-cover shrink-0" alt="Sunset" />
                  <span className="text-xs font-semibold text-[#1B2A4A]">Sunset Rooftop Party</span>
                </div>
                <span className="text-xs font-bold text-[#1B2A4A]">342</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/event2/40/40" className="w-8 h-8 rounded-sm object-cover shrink-0" alt="Wine" />
                  <span className="text-xs font-semibold text-[#1B2A4A]">Wine & Dine Experience</span>
                </div>
                <span className="text-xs font-bold text-[#1B2A4A]">287</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/event4/40/40" className="w-8 h-8 rounded-sm object-cover shrink-0" alt="Yacht" />
                  <span className="text-xs font-semibold text-[#1B2A4A]">Exclusive Yacht Night</span>
                </div>
                <span className="text-xs font-bold text-[#1B2A4A]">215</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/event5/40/40" className="w-8 h-8 rounded-sm object-cover shrink-0" alt="Art" />
                  <span className="text-xs font-semibold text-[#1B2A4A]">Private Art Gallery</span>
                </div>
                <span className="text-xs font-bold text-[#1B2A4A]">198</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/event6/40/40" className="w-8 h-8 rounded-sm object-cover shrink-0" alt="Jazz" />
                  <span className="text-xs font-semibold text-[#1B2A4A]">Live Jazz Concert</span>
                </div>
                <span className="text-xs font-bold text-[#1B2A4A]">158</span>
              </div>
            </div>

            <button className="w-full py-2.5 border border-gray-200 text-[#1B2A4A] font-bold text-xs rounded-none hover:bg-gray-50 transition-colors uppercase tracking-wider">
              View All Events
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
