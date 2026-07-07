import { 
  Users, 
  Calendar, 
  Ticket, 
  DollarSign, 
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';

// Dummy Data
const lineChartData = [
  { name: 'Dec', bookings: 400 },
  { name: 'Jan', bookings: 580 },
  { name: 'Feb', bookings: 680 },
  { name: 'Mar', bookings: 900 },
  { name: 'Apr', bookings: 1100 },
  { name: 'May', bookings: 970 },
  { name: 'Jun', bookings: 1250 },
];

const statusData = [
  { name: 'Confirmed', value: 62, color: '#C9A84C' },
  { name: 'Pending', value: 18, color: '#1B2A4A' },
  { name: 'Waiting List', value: 12, color: '#D1D5DB' },
  { name: 'Cancelled', value: 8, color: '#F3F4F6' },
];

const usersData = [
  { name: 'Active', value: 68, color: '#C9A84C' },
  { name: 'Inactive', value: 20, color: '#1B2A4A' },
  { name: 'Banned', value: 5, color: '#D1D5DB' },
  { name: 'Pending', value: 7, color: '#F3F4F6' },
];

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-1 font-heading">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin! Here's what's happening with 7Sens.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-none text-sm text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
          <Calendar size={16} className="text-gray-400" />
          <span>May 18, 2025 - Jun 18, 2025</span>
          <ChevronDown size={16} className="text-gray-400 ml-2" />
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="2,543" 
          percent="+ 12.5%" 
          icon={<Users size={20} className="text-[#C9A84C]" />} 
        />
        <StatCard 
          title="Total Events" 
          value="48" 
          percent="+ 9.3%" 
          icon={<Calendar size={20} className="text-[#C9A84C]" />} 
        />
        <StatCard 
          title="Total Bookings" 
          value="1,246" 
          percent="+ 15.8%" 
          icon={<Ticket size={20} className="text-[#C9A84C]" />} 
        />
        <StatCard 
          title="Total Revenue" 
          value="CHF 125,430" 
          percent="+ 18.7%" 
          icon={<DollarSign size={20} className="text-[#C9A84C]" />} 
        />
      </div>

      {/* Main Grid: Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-none p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[#1B2A4A]">Bookings Overview</h3>
            <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 rounded px-2 py-1">
              Monthly <ChevronDown size={14} />
            </button>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#C9A84C" 
                  strokeWidth={2}
                  dot={{ fill: '#C9A84C', strokeWidth: 2, r: 4, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#1B2A4A', stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Events */}
        <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[#1B2A4A]">Top Events</h3>
            <a href="#" className="text-xs text-gray-500 hover:text-[#C9A84C]">View All</a>
          </div>
          <div className="flex flex-col gap-4">
            <EventItem 
              img="https://images.unsplash.com/photo-1533174000287-2104dc40d9d6?w=100&h=100&fit=crop" 
              title="Sunset Rooftop Party" 
              date="Jun 28, 2025" 
              bookings="342" 
            />
            <EventItem 
              img="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop" 
              title="Wine & Dine Experience" 
              date="Jul 12, 2025" 
              bookings="287" 
            />
            <EventItem 
              img="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=100&h=100&fit=crop" 
              title="Exclusive Yacht Night" 
              date="Jul 26, 2025" 
              bookings="215" 
            />
            <EventItem 
              img="https://images.unsplash.com/photo-1518998053401-a4149019816c?w=100&h=100&fit=crop" 
              title="Private Art Gallery" 
              date="Aug 09, 2025" 
              bookings="198" 
            />
          </div>
        </div>

        {/* Bookings by Status */}
        <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-[#1B2A4A] mb-4">Bookings by Status</h3>
          <div className="flex items-center">
            <div className="w-1/2 h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                    {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              {statusData.map(s => (
                <div key={s.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none" style={{ backgroundColor: s.color }}></span>
                    <span className="text-gray-500">{s.name}</span>
                  </div>
                  <span className="text-gray-900">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users by Type */}
        <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-[#1B2A4A] mb-4">Users by Type</h3>
          <div className="flex items-center">
            <div className="w-1/2 h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={usersData} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                    {usersData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              {usersData.map(s => (
                <div key={s.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none" style={{ backgroundColor: s.color }}></span>
                    <span className="text-gray-500">{s.name}</span>
                  </div>
                  <span className="text-gray-900">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[#1B2A4A]">Recent Activity</h3>
            <a href="#" className="text-xs text-gray-500 hover:text-[#C9A84C]">View All</a>
          </div>
          <div className="flex flex-col gap-4">
            <ActivityItem icon={<Ticket size={14}/>} text="New booking for Sunset Rooftop Party" time="2 min ago" />
            <ActivityItem icon={<Users size={14}/>} text="New user registered: Marie Dupont" time="15 min ago" />
            <ActivityItem icon={<DollarSign size={14}/>} text="Payment received: CHF 320.00" time="25 min ago" />
            <ActivityItem icon={<Calendar size={14}/>} text="Event updated: Wine & Dine Experience" time="1 hr ago" />
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-components for cleaner code
const StatCard = ({ title, value, percent, icon }: any) => (
  <div className="bg-white p-6 rounded-none shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden">
    <div className="flex items-center justify-center w-12 h-12 rounded-none bg-[#C9A84C]/10 mb-2">
      {icon}
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500 text-center absolute top-6 left-20">{title}</span>
      <span className="text-2xl font-bold text-[#1B2A4A] text-center absolute top-12 left-20">{value}</span>
    </div>
    <div className="flex items-center gap-1 text-green-500 text-xs font-medium mt-10">
      <ArrowUpRight size={14} />
      <span>{percent} <span className="text-gray-400 font-normal ml-1">from last month</span></span>
    </div>
  </div>
);

const EventItem = ({ img, title, date, bookings }: any) => (
  <div className="flex items-center gap-3">
    <img src={img} alt={title} className="w-12 h-10 object-cover rounded-none shadow-sm" />
    <div className="flex-1 flex flex-col">
      <span className="text-sm font-semibold text-[#1B2A4A]">{title}</span>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-[10px] text-gray-400 uppercase font-medium">Bookings</span>
      <span className="text-[#C9A84C] font-bold">{bookings}</span>
    </div>
  </div>
);

const ActivityItem = ({ icon, text, time }: any) => (
  <div className="flex items-start justify-between gap-3">
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#C9A84C] bg-[#C9A84C]/10 p-1.5 rounded-none">
        {icon}
      </div>
      <span className="text-sm text-gray-600 leading-snug pr-4">{text}</span>
    </div>
    <span className="text-[10px] text-gray-400 whitespace-nowrap mt-1">{time}</span>
  </div>
);
