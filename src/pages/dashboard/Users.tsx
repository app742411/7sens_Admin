import { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  ChevronDown, 
  Filter, 
  Download,
  MoreHorizontal,
  Eye,
  User,
  UserCheck,
  UserX,
  ShieldCheck,
  UserPlus,
  Plus,
  X,
  Copy,
  Edit2,
  Lock,
  UserMinus,
  CheckCircle2,
  Check,
  Clock,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../../components/common/MetricCard';

const MOCK_USERS = [
  {
    id: 'USR-250618-0001',
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    role: 'User',
    status: 'Active',
    joinedOn: 'May 18, 2025\n10:24 AM',
    lastActive: 'May 18, 2025\n10:25 AM',
    phone: '+41 79 123 45 67'
  },
  {
    id: 'USR-250618-0002',
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
    role: 'User',
    status: 'Active',
    joinedOn: 'May 18, 2025\n09:15 AM',
    lastActive: 'May 18, 2025\n09:42 AM',
    phone: '+41 78 234 56 78'
  },
  {
    id: 'USR-250618-0003',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    role: 'Organizer',
    status: 'Active',
    joinedOn: 'May 17, 2025\n08:30 PM',
    lastActive: 'May 18, 2025\n08:10 AM',
    phone: '+41 79 345 67 89'
  },
  {
    id: 'USR-250618-0004',
    name: 'Lucas Morel',
    email: 'lucas.morel@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    role: 'User',
    status: 'Inactive',
    joinedOn: 'May 16, 2025\n11:02 AM',
    lastActive: 'May 10, 2025\n04:12 PM',
    phone: '+41 76 456 78 90'
  },
  {
    id: 'USR-250618-0005',
    name: 'Camille Leroy',
    email: 'camille.leroy@email.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
    role: 'User',
    status: 'Active',
    joinedOn: 'May 16, 2025\n10:45 AM',
    lastActive: 'May 18, 2025\n11:20 AM',
    phone: '+41 77 567 89 01'
  },
  {
    id: 'USR-250618-0006',
    name: 'Thomas Fischer',
    email: 'thomas.fischer@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    role: 'Organizer',
    status: 'Active',
    joinedOn: 'May 15, 2025\n07:25 PM',
    lastActive: 'May 17, 2025\n09:30 PM',
    phone: '+41 79 444 55 66'
  },
  {
    id: 'USR-250618-0007',
    name: 'Anna Müller',
    email: 'anna.mueller@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop',
    role: 'Admin',
    status: 'Active',
    joinedOn: 'May 15, 2025\n11:05 AM',
    lastActive: 'May 18, 2025\n12:05 PM',
    phone: '+41 78 999 88 77'
  },
  {
    id: 'USR-250618-0008',
    name: 'David Rossi',
    email: 'david.rossi@email.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop',
    role: 'User',
    status: 'Inactive',
    joinedOn: 'May 14, 2025\n02:18 PM',
    lastActive: 'May 05, 2025\n06:40 PM',
    phone: '+41 76 111 22 33'
  },
  {
    id: 'USR-250618-0009',
    name: 'Julie Perrin',
    email: 'julie.perrin@email.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop',
    role: 'User',
    status: 'Active',
    joinedOn: 'May 14, 2025\n09:00 AM',
    lastActive: 'May 18, 2025\n07:50 AM',
    phone: '+41 77 333 44 55'
  },
  {
    id: 'USR-250618-0010',
    name: 'Alexandre Blanc',
    email: 'alexandre.blanc@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    role: 'User',
    status: 'Active',
    joinedOn: 'May 13, 2025\n05:35 PM',
    lastActive: 'May 18, 2025\n01:15 PM',
    phone: '+41 79 555 66 77'
  }
];

const RoleBadge = ({ role }: { role: string }) => {
  let bg = '';
  let text = '';
  
  switch (role) {
    case 'Admin':
      bg = 'bg-orange-50';
      text = 'text-orange-500';
      break;
    case 'Organizer':
      bg = 'bg-purple-50';
      text = 'text-purple-600';
      break;
    default:
      bg = 'bg-blue-50';
      text = 'text-blue-600';
  }

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-none ${bg} ${text}`}>
      {role}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === 'Active';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-none ${isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
      {status}
    </span>
  );
};

export const Users = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(MOCK_USERS[0]);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">Users</h1>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight size={14} />
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">Users</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">All Users</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white font-medium rounded-none hover:bg-[#b59641] transition-colors shadow-sm">
          <Plus size={18} /> Add New User
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard 
          title="Total Users" 
          value="2,543" 
          icon={<User size={20} />} 
          trend="up" 
          trendValue="12.5%" 
          trendText="from last month"
          iconBgClass="bg-blue-50"
          iconColorClass="text-blue-500"
        />
        <MetricCard 
          title="Active Users" 
          value="2,156" 
          icon={<UserCheck size={20} />} 
          trend="up" 
          trendValue="9.8%" 
          trendText="from last month"
          iconBgClass="bg-green-50"
          iconColorClass="text-green-500"
        />
        <MetricCard 
          title="Inactive Users" 
          value="287" 
          icon={<UserX size={20} />} 
          trend="down" 
          trendValue="4.2%" 
          trendText="from last month"
          iconBgClass="bg-red-50"
          iconColorClass="text-red-500"
        />
        <MetricCard 
          title="Email Verified" 
          value="2,301" 
          icon={<ShieldCheck size={20} />} 
          trend="up" 
          trendValue="11.3%" 
          trendText="from last month"
          iconBgClass="bg-purple-50"
          iconColorClass="text-purple-500"
        />
        <MetricCard 
          title="New This Month" 
          value="156" 
          icon={<UserPlus size={20} />} 
          trend="up" 
          trendValue="15.7%" 
          trendText="from last month"
          iconBgClass="bg-orange-50"
          iconColorClass="text-orange-500"
        />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Column - Table */}
        <div className="flex-1 w-full bg-white rounded-none shadow-sm border border-gray-100 flex flex-col">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-[350px]">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto">
              <div className="relative shrink-0">
                <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                  <option>All Roles</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative shrink-0">
                <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                  <option>All Status</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
                <Filter size={16} className="text-[#1B2A4A]" />
                More Filters
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
                <Download size={16} className="text-[#1B2A4A]" />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/50">
                  <th className="px-5 py-4 w-10">
                    <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                  </th>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Joined On</th>
                  <th className="px-5 py-4">Last Active</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_USERS.map((user) => (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${selectedUser?.id === user.id ? 'bg-orange-50/20' : ''}`}
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <td className="px-5 py-4">
                      <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" onClick={e => e.stopPropagation()} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-[#1B2A4A]">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 whitespace-pre-line">
                      {user.joinedOn}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 whitespace-pre-line">
                      {user.lastActive}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(`/users/${user.id}`); }}
                          className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white">
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
          <div className="p-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 font-medium">
              Showing 1 to 10 of 2,543 users
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
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">255</button>
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

        {/* Right Column - User Details Sidebar */}
        {selectedUser && (
          <div className="w-full xl:w-[350px] flex flex-col gap-6 shrink-0 bg-white shadow-sm border border-gray-100 rounded-none p-6 animate-in slide-in-from-right-4 duration-300">
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#1B2A4A]">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-16 h-16 rounded-full object-cover shadow-sm border border-gray-100" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[15px] font-bold text-[#1B2A4A]">{selectedUser.name}</h4>
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-none">Active</span>
                </div>
                <p className="text-xs text-gray-500">{selectedUser.email}</p>
                <p className="text-xs text-gray-500">{selectedUser.phone}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-none w-fit border border-gray-100">
                  User ID: {selectedUser.id}
                  <Copy size={12} className="cursor-pointer hover:text-blue-600" />
                </div>
              </div>
            </div>

            <div className="flex border-b border-gray-100 mb-5">
              <button className="flex-1 py-2 text-sm font-semibold text-[#C9A84C] border-b-2 border-[#C9A84C]">Profile</button>
              <button className="flex-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Activity</button>
              <button className="flex-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Bookings</button>
            </div>

            <div className="flex flex-col gap-4 text-sm mb-6">
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><User size={14}/> Role</span>
                <span className="text-[#1B2A4A] font-medium">{selectedUser.role}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-gray-300 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div> Status</span>
                <span className="text-[#1B2A4A] font-medium flex items-center gap-2">
                  <div className="w-8 h-4 bg-green-500 rounded-full relative">
                    <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><Calendar size={14}/> Joined On</span>
                <span className="text-[#1B2A4A] font-medium">{selectedUser.joinedOn.replace('\n', ' ')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><Clock size={14} className="text-gray-400"/> Last Active</span>
                <span className="text-[#1B2A4A] font-medium">{selectedUser.lastActive.replace('\n', ' ')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><CheckCircle2 size={14}/> Email Verified</span>
                <span className="text-green-600 font-medium flex items-center gap-1"><Check size={14}/> Yes</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><UserCheck size={14}/> Phone Verified</span>
                <span className="text-green-600 font-medium flex items-center gap-1"><Check size={14}/> Yes</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><span className="text-sm font-serif italic">A</span> Preferred Language</span>
                <span className="text-[#1B2A4A] font-medium">English</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-50 pb-3">
                <span className="text-gray-500 flex items-center gap-2"><span className="text-sm w-3.5 text-center">🌍</span> Country</span>
                <span className="text-[#1B2A4A] font-medium">Switzerland</span>
              </div>

              <div>
                <span className="text-gray-500 text-sm block mb-1">Bio</span>
                <p className="text-[#1B2A4A] text-sm">Event lover and photography enthusiast.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#C9A84C] text-[#C9A84C] font-semibold text-sm rounded-none hover:bg-orange-50/20 transition-colors">
                <Edit2 size={16} /> Edit User
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-orange-200 text-orange-500 font-semibold text-sm rounded-none hover:bg-orange-50 transition-colors">
                <Lock size={16} /> Reset Password
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-500 font-semibold text-sm rounded-none hover:bg-red-50 transition-colors">
                <UserMinus size={16} /> Deactivate User
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

// Assuming Clock is missing from imports, need to add it inline or above. Wait I didn't import Clock. Let's make sure it's in lucide-react. I'll use `import { Clock } from 'lucide-react'` instead of inline.
