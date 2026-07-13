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
  RefreshCcw,
  FileText,
  DollarSign,
  CheckCircle2,
  XCircle,
  BarChart3,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../../components/common/MetricCard';

const MOCK_TRANSACTIONS = [
  {
    id: 'TXN-250618-0001',
    user: { name: 'Marie Dupont', email: 'marie.dupont@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
    event: { title: 'Sunset Rooftop Party', date: 'Jun 28, 2025' },
    dateTime: 'May 18, 2025\n10:24 AM',
    amount: 'CHF 120.00',
    status: 'Completed',
    paymentMethod: { type: 'VISA', last4: '4242' }
  },
  {
    id: 'TXN-250618-0002',
    user: { name: 'Jean Martin', email: 'jean.martin@email.com', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop' },
    event: { title: 'Wine & Dine Experience', date: 'Jul 12, 2025' },
    dateTime: 'May 18, 2025\n10:30 AM',
    amount: 'CHF 150.00',
    status: 'Completed',
    paymentMethod: { type: 'Mastercard', last4: '5555' }
  },
  {
    id: 'TXN-250618-0003',
    user: { name: 'Sophie Bernard', email: 'sophie.bernard@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop' },
    event: { title: 'Exclusive Yacht Night', date: 'Jul 26, 2025' },
    dateTime: 'May 17, 2025\n09:15 PM',
    amount: 'CHF 200.00',
    status: 'Refunded',
    paymentMethod: { type: 'VISA', last4: '4242' }
  },
  {
    id: 'TXN-250618-0004',
    user: { name: 'Lucas Morel', email: 'lucas.morel@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' },
    event: { title: 'Private Art Gallery', date: 'Aug 09, 2025' },
    dateTime: 'May 17, 2025\n08:42 PM',
    amount: 'CHF 80.00',
    status: 'Completed',
    paymentMethod: { type: 'ApplePay', last4: '' }
  },
  {
    id: 'TXN-250618-0005',
    user: { name: 'Camille Leroy', email: 'camille.leroy@email.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop' },
    event: { title: 'Live Jazz Concert', date: 'Aug 23, 2025' },
    dateTime: 'May 16, 2025\n07:25 PM',
    amount: 'CHF 90.00',
    status: 'Failed',
    paymentMethod: { type: 'Stripe', last4: '' }
  },
  {
    id: 'TXN-250618-0006',
    user: { name: 'Thomas Fischer', email: 'thomas.fischer@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop' },
    event: { title: 'Wellness Retreat Day', date: 'Sep 06, 2025' },
    dateTime: 'May 16, 2025\n06:10 PM',
    amount: 'CHF 180.00',
    status: 'Completed',
    paymentMethod: { type: 'VISA', last4: '4242' }
  },
  {
    id: 'TXN-250618-0007',
    user: { name: 'Anna Müller', email: 'anna.mueller@email.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop' },
    event: { title: 'New Year\'s Eve Gala', date: 'Dec 31, 2025' },
    dateTime: 'May 15, 2025\n11:05 AM',
    amount: 'CHF 250.00',
    status: 'Pending',
    paymentMethod: { type: 'Mastercard', last4: '7777' }
  },
  {
    id: 'TXN-250618-0008',
    user: { name: 'David Rossi', email: 'david.rossi@email.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop' },
    event: { title: 'Sunset Rooftop Party', date: 'Jun 28, 2025' },
    dateTime: 'May 15, 2025\n10:12 AM',
    amount: 'CHF 120.00',
    status: 'Refunded',
    paymentMethod: { type: 'Stripe', last4: '' }
  },
  {
    id: 'TXN-250618-0009',
    user: { name: 'Julie Perrin', email: 'julie.perrin@email.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop' },
    event: { title: 'Wine & Dine Experience', date: 'Jul 12, 2025' },
    dateTime: 'May 14, 2025\n09:40 PM',
    amount: 'CHF 150.00',
    status: 'Completed',
    paymentMethod: { type: 'ApplePay', last4: '' }
  },
  {
    id: 'TXN-250618-0010',
    user: { name: 'Alexandre Blanc', email: 'alexandre.blanc@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' },
    event: { title: 'Exclusive Yacht Night', date: 'Jul 26, 2025' },
    dateTime: 'May 14, 2025\n08:28 PM',
    amount: 'CHF 200.00',
    status: 'Completed',
    paymentMethod: { type: 'VISA', last4: '4242' }
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  let bg = '';
  let text = '';
  
  switch (status) {
    case 'Completed':
      bg = 'bg-green-50';
      text = 'text-green-600';
      break;
    case 'Refunded':
      bg = 'bg-purple-50';
      text = 'text-purple-600';
      break;
    case 'Failed':
      bg = 'bg-red-50';
      text = 'text-red-500';
      break;
    case 'Pending':
      bg = 'bg-orange-50';
      text = 'text-orange-500';
      break;
    default:
      bg = 'bg-gray-100';
      text = 'text-gray-600';
  }

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-none ${bg} ${text}`}>
      {status}
    </span>
  );
};

const PaymentMethodLabel = ({ method }: { method: any }) => {
  if (method.type === 'VISA') {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold text-[#1434CB] italic tracking-tighter text-sm">VISA</span>
        <span className="text-gray-400 text-xs tracking-widest">•••• {method.last4}</span>
      </div>
    );
  }
  if (method.type === 'Mastercard') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-80 mix-blend-multiply"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-80 mix-blend-multiply"></div>
        </div>
        <span className="text-gray-400 text-xs tracking-widest">•••• {method.last4}</span>
      </div>
    );
  }
  if (method.type === 'ApplePay') {
    return (
      <div className="flex items-center gap-1 text-gray-900 font-semibold text-sm">
        <span className="text-lg leading-none"></span> Pay
      </div>
    );
  }
  if (method.type === 'Stripe') {
    return (
      <div className="font-bold text-[#635BFF] tracking-tighter text-sm">stripe</div>
    );
  }
  return <span className="text-gray-600 text-sm">{method.type}</span>;
};

export const Transactions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">All Transactions</h1>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <span className="hover:text-[#C9A84C] transition-colors cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">Payments</span>
          <ChevronRight size={14} />
          <span className="text-gray-400">All Transactions</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard 
          title="Total Transactions" 
          value="1,246" 
          icon={<FileText size={20} />} 
          trend="up" 
          trendValue="18.7%" 
          trendText="from last month"
          iconBgClass="bg-orange-50"
          iconColorClass="text-orange-500"
        />
        <MetricCard 
          title="Total Amount" 
          value="CHF 125,430" 
          icon={<DollarSign size={20} />} 
          trend="up" 
          trendValue="16.2%" 
          trendText="from last month"
          iconBgClass="bg-yellow-50"
          iconColorClass="text-yellow-500"
        />
        <MetricCard 
          title="Successful" 
          value="1,102" 
          icon={<CheckCircle2 size={20} />} 
          trend="up" 
          trendValue="17.3%" 
          trendText="from last month"
          iconBgClass="bg-green-50"
          iconColorClass="text-green-500"
        />
        <MetricCard 
          title="Refunded" 
          value="68" 
          icon={<RefreshCcw size={18} />} 
          trend="up" 
          trendValue="9.8%" 
          trendText="from last month"
          iconBgClass="bg-purple-50"
          iconColorClass="text-purple-500"
        />
        <MetricCard 
          title="Failed" 
          value="76" 
          icon={<XCircle size={20} />} 
          trend="down" 
          trendValue="4.3%" 
          trendText="from last month"
          iconBgClass="bg-red-50"
          iconColorClass="text-red-500"
        />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Column - Table */}
        <div className="flex-1 min-w-0 w-full bg-white rounded-none shadow-sm border border-gray-100 flex flex-col">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-[350px]">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by transaction ID, user, event or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
                <Download size={16} className="text-[#1B2A4A]" />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/50">
                  <th className="px-5 py-4">Transaction ID</th>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Event</th>
                  <th className="px-5 py-4">Date & Time</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Payment Method</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_TRANSACTIONS.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">{txn.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={txn.user.avatar} alt={txn.user.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-[#1B2A4A]">{txn.user.name}</p>
                          <p className="text-xs text-gray-500">{txn.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#1B2A4A]">{txn.event.title}</p>
                      <p className="text-xs text-gray-500">{txn.event.date}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 whitespace-pre-line">
                      {txn.dateTime}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-700">
                      {txn.amount}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={txn.status} />
                    </td>
                    <td className="px-5 py-4">
                      <PaymentMethodLabel method={txn.paymentMethod} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {txn.status === 'Refunded' ? (
                          <button className="p-1.5 border border-purple-100 text-purple-500 hover:text-purple-700 transition-colors rounded-none bg-purple-50" title="View Refund Details">
                            <RefreshCcw size={16} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => navigate(`/payments/${txn.id}`)}
                            className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white"
                          >
                            <Eye size={16} />
                          </button>
                        )}
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
              Showing 1 to 10 of 1,246 transactions
            </div>
            
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#1B2A4A] bg-[#1B2A4A] text-white rounded-none text-sm font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                4
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                5
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                125
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-none text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              10 / page
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Right Column - Sidebars */}
        <div className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Revenue Summary */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-[#1B2A4A] mb-5 flex items-center gap-2">
              <BarChart3 size={18} className="text-[#C9A84C]" />
              Revenue Summary
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#1B2A4A]">Gross Revenue</span>
                <span className="text-sm font-semibold text-gray-700">CHF 125,430.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#1B2A4A]">Refunded Amount</span>
                <span className="text-sm font-semibold text-red-500">- CHF 6,890.00</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-[#1B2A4A]">Net Revenue</span>
                <span className="text-sm font-bold text-[#1B2A4A]">CHF 118,540.00</span>
              </div>
            </div>
          </div>

          {/* Filters Sidebar */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-[#1B2A4A] flex items-center gap-2">
                <Filter size={18} className="text-[#C9A84C]" />
                Filters
              </h3>
              <button className="text-[11px] font-semibold text-gray-500 hover:text-[#1B2A4A]">Clear all</button>
            </div>
            
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-[#1B2A4A] mb-2">Status</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 px-3 py-2.5 rounded-none text-sm text-gray-600 appearance-none bg-white focus:outline-none focus:border-[#C9A84C]">
                    <option>All Status</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B2A4A] mb-2">Payment Method</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 px-3 py-2.5 rounded-none text-sm text-gray-600 appearance-none bg-white focus:outline-none focus:border-[#C9A84C]">
                    <option>All Methods</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B2A4A] mb-2">Event</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 px-3 py-2.5 rounded-none text-sm text-gray-600 appearance-none bg-white focus:outline-none focus:border-[#C9A84C]">
                    <option>All Events</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B2A4A] mb-2">Date Range</label>
                <div className="relative">
                  <input type="text" value="May 18, 2025 - Jun 18, 2025" readOnly className="w-full border border-gray-200 px-3 py-2.5 rounded-none text-sm text-gray-600 bg-white focus:outline-none focus:border-[#C9A84C]" />
                  <Calendar size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B2A4A] mb-2">Amount Range (CHF)</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min amount" className="w-full border border-gray-200 px-3 py-2.5 rounded-none text-sm focus:outline-none focus:border-[#C9A84C]" />
                  <span className="text-xs text-gray-400">to</span>
                  <input type="number" placeholder="Max amount" className="w-full border border-gray-200 px-3 py-2.5 rounded-none text-sm focus:outline-none focus:border-[#C9A84C]" />
                </div>
              </div>

              <button className="w-full bg-[#C9A84C] hover:bg-[#b59641] text-white font-medium py-3 rounded-none mt-2 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-[#1B2A4A] mb-5 flex items-center gap-2">
              <Users size={18} className="text-[#C9A84C] hidden" /> {/* Hidden unused icon to match spacing maybe? The mockup uses an action icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              Quick Actions
            </h3>
            
            <div className="flex flex-col gap-4">
              <button className="flex items-start gap-3 p-3 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all text-left">
                <div className="text-[#C9A84C] mt-0.5"><RefreshCcw size={16} /></div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B2A4A]">Initiate Refund</h4>
                  <p className="text-xs text-gray-500 mt-1">Refund a transaction to the user</p>
                </div>
              </button>
              
              <button className="flex items-start gap-3 p-3 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all text-left">
                <div className="text-[#C9A84C] mt-0.5"><Download size={16} /></div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B2A4A]">Export Transactions</h4>
                  <p className="text-xs text-gray-500 mt-1">Download transactions in CSV</p>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
