import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Edit2, 
  Eye,
  Info,
  CalendarCheck,
  UserCheck,
  Hourglass,
  List,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Lightbulb,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Trash2,
  CheckCircle2,
  ArrowUp
} from 'lucide-react';
import { MOCK_EVENTS } from './Events';

const MOCK_PARTICIPANTS = [
  {
    id: 1,
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    phone: '+41 79 123 45 67',
    tickets: 2,
    bookedOn: 'May 18, 2025\n10:24 AM',
    paymentStatus: 'Paid',
    amount: 'CHF 240',
    status: 'Confirmed'
  },
  {
    id: 2,
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
    phone: '+41 78 234 56 78',
    tickets: 1,
    bookedOn: 'May 18, 2025\n10:30 AM',
    paymentStatus: 'Paid',
    amount: 'CHF 120',
    status: 'Confirmed'
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    email: 'sophie.bernard@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    phone: '+41 79 345 67 89',
    tickets: 2,
    bookedOn: 'May 18, 2025\n10:45 AM',
    paymentStatus: 'Paid',
    amount: 'CHF 240',
    status: 'Confirmed'
  },
  {
    id: 4,
    name: 'Lucas Morel',
    email: 'lucas.morel@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    phone: '+41 76 456 78 90',
    tickets: 3,
    bookedOn: 'May 18, 2025\n11:02 AM',
    paymentStatus: 'Paid',
    amount: 'CHF 360',
    status: 'Confirmed'
  },
  {
    id: 5,
    name: 'Camille Leroy',
    email: 'camille.leroy@email.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
    phone: '+41 77 567 89 01',
    tickets: 1,
    bookedOn: 'May 18, 2025\n11:15 AM',
    paymentStatus: 'Paid',
    amount: 'CHF 120',
    status: 'Confirmed'
  }
];

const MOCK_WAITLIST = [
  {
    id: 1,
    name: 'Laura Bernasconi',
    email: 'laura.bernasconi@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    phone: '+41 79 234 56 78',
    tickets: 2,
    joined: 'Jun 28, 2025\n07:00 PM',
    addedOn: 'May 18, 2025\n09:15 AM',
    status: 'Waiting List'
  },
  {
    id: 2,
    name: 'Marco Rossi',
    email: 'marco.rossi@email.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
    phone: '+41 78 345 67 89',
    tickets: 1,
    joined: 'Jun 28, 2025\n07:00 PM',
    addedOn: 'May 18, 2025\n09:42 AM',
    status: 'Waiting List'
  },
  {
    id: 3,
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    phone: '+41 76 456 78 90',
    tickets: 2,
    joined: 'Jun 28, 2025\n07:00 PM',
    addedOn: 'May 18, 2025\n10:05 AM',
    status: 'Waiting List'
  },
  {
    id: 4,
    name: 'Julien Morel',
    email: 'julien.morel@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    phone: '+41 79 567 89 01',
    tickets: 1,
    joined: 'Jun 28, 2025\n07:00 PM',
    addedOn: 'May 18, 2025\n10:37 AM',
    status: 'Waiting List'
  },
  {
    id: 5,
    name: 'Emma Dupont',
    email: 'emma.dupont@email.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
    phone: '+41 78 678 90 12',
    tickets: 2,
    joined: 'Jun 28, 2025\n07:00 PM',
    addedOn: 'May 18, 2025\n11:12 AM',
    status: 'Waiting List'
  },
  {
    id: 6,
    name: 'Thomas Blanc',
    email: 'thomas.blanc@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    phone: '+41 76 789 01 23',
    tickets: 1,
    joined: 'Jun 28, 2025\n07:00 PM',
    addedOn: 'May 18, 2025\n11:45 AM',
    status: 'Waiting List'
  }
];

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Participants');
  const [activeSubTab, setActiveSubTab] = useState('Waiting List');
  
  const event = MOCK_EVENTS.find(e => e.id === parseInt(id || '1')) || MOCK_EVENTS[0];

  const TABS = [
    { id: 'Overview', icon: Info },
    { id: 'Bookings', icon: CalendarCheck },
    { id: 'Participants', icon: UserCheck },
    { id: 'Waiting List', icon: Hourglass },
    { id: 'Activity Log', icon: List }
  ];

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      
      {/* Top Navigation */}
      <div className="flex items-center gap-2 text-sm font-medium text-[#1B2A4A] cursor-pointer hover:text-[#C9A84C] transition-colors w-fit" onClick={() => navigate('/events')}>
        <ChevronLeft size={16} />
        Back to Events
      </div>

      {/* Hero Header */}
      <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex items-center gap-5">
          <img src={event.image} alt={event.title} className="w-[120px] h-[80px] object-cover rounded-none border border-gray-200" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1B2A4A]">{event.title}</h1>
              <span className="bg-green-50 text-green-600 px-2.5 py-1 text-xs font-semibold rounded-none">
                {event.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-1.5"><Calendar size={16} /> {event.date}</div>
              <div className="flex items-center gap-1.5"><Clock size={16} /> {event.time}</div>
              <div className="flex items-center gap-1.5"><MapPin size={16} /> {event.city}</div>
              <div className="flex items-center gap-1.5"><Users size={16} /> {event.capacityCurrent} / {event.capacityTotal} Booked</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button 
            onClick={() => navigate(`/events/edit/${event.id}`)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 border border-gray-200 text-gray-700 font-medium rounded-none hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Edit2 size={16} /> Edit Event
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-[#C9A84C] text-white font-medium rounded-none hover:bg-[#b59641] transition-colors shadow-sm">
            <Eye size={16} /> View Event
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white px-2 border-b border-gray-200 flex overflow-x-auto hide-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
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

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {activeTab === 'Participants' ? (
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
              
              {/* Tab Header */}
              <div>
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-1">Participants (per event)</h2>
                <p className="text-sm text-gray-500">Manage and view all participant bookings for this event.</p>
              </div>

              {/* Status Sub-tabs */}
              <div className="flex overflow-x-auto gap-2 pb-2">
                <button 
                  onClick={() => setActiveSubTab('Confirmed')}
                  className={`flex items-center gap-2 px-5 py-2.5 border font-semibold text-sm rounded-none whitespace-nowrap ${
                    activeSubTab === 'Confirmed' ? 'border-[#C9A84C] bg-orange-50/30 text-[#C9A84C]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserCheck size={16} /> Confirmed 
                  <span className={`${activeSubTab === 'Confirmed' ? 'bg-orange-100 text-[#C9A84C]' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded-none text-xs ml-1`}>342</span>
                </button>
                <button 
                  onClick={() => setActiveSubTab('Waiting List')}
                  className={`flex items-center gap-2 px-5 py-2.5 border font-semibold text-sm rounded-none whitespace-nowrap ${
                    activeSubTab === 'Waiting List' ? 'border-[#C9A84C] bg-orange-50/30 text-[#C9A84C]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Hourglass size={16} /> Waiting List 
                  <span className={`${activeSubTab === 'Waiting List' ? 'bg-orange-100 text-[#C9A84C]' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded-none text-xs ml-1`}>58</span>
                </button>
                <button 
                  onClick={() => setActiveSubTab('Pending')}
                  className={`flex items-center gap-2 px-5 py-2.5 border font-semibold text-sm rounded-none whitespace-nowrap ${
                    activeSubTab === 'Pending' ? 'border-[#C9A84C] bg-orange-50/30 text-[#C9A84C]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Clock size={16} /> Pending 
                  <span className={`${activeSubTab === 'Pending' ? 'bg-orange-100 text-[#C9A84C]' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded-none text-xs ml-1`}>23</span>
                </button>
                <button 
                  onClick={() => setActiveSubTab('Cancelled')}
                  className={`flex items-center gap-2 px-5 py-2.5 border font-semibold text-sm rounded-none whitespace-nowrap ${
                    activeSubTab === 'Cancelled' ? 'border-[#C9A84C] bg-orange-50/30 text-[#C9A84C]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <X size={16} /> Cancelled 
                  <span className={`${activeSubTab === 'Cancelled' ? 'bg-orange-100 text-[#C9A84C]' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded-none text-xs ml-1`}>12</span>
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-[350px]">
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search by name, email or phone..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto overflow-visible">
                  {activeSubTab === 'Waiting List' ? (
                    <>
                      <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#C9A84C] text-[#C9A84C] font-semibold text-sm rounded-none hover:bg-orange-50 transition-colors bg-white">
                          Participant Actions <ChevronDown size={14} />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-100 shadow-xl rounded-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 flex flex-col py-2">
                          <button className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors">
                            <ArrowUp size={16} className="text-gray-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="block text-sm font-bold text-[#1B2A4A]">Promote to Confirmed</span>
                              <span className="block text-[11px] text-gray-500 mt-0.5 leading-tight">Move selected to confirmed list</span>
                            </div>
                          </button>
                          <button className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors">
                            <UserPlus size={16} className="text-gray-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="block text-sm font-bold text-[#1B2A4A]">Manually Approve</span>
                              <span className="block text-[11px] text-gray-500 mt-0.5 leading-tight">Approve selected participants</span>
                            </div>
                          </button>
                          <button className="flex items-start gap-3 px-4 py-3 hover:bg-red-50 text-left transition-colors">
                            <Trash2 size={16} className="text-red-400 mt-0.5 shrink-0" />
                            <div>
                              <span className="block text-sm font-bold text-red-600">Remove from List</span>
                              <span className="block text-[11px] text-red-400 mt-0.5 leading-tight">Remove selected from waitlist</span>
                            </div>
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors">
                            <Download size={16} className="text-gray-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="block text-sm font-bold text-[#1B2A4A]">Export List (CSV)</span>
                              <span className="block text-[11px] text-gray-500 mt-0.5 leading-tight">Download waitlist as CSV</span>
                            </div>
                          </button>
                        </div>
                      </div>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-[#1B2A4A] font-medium text-sm rounded-none hover:bg-gray-50 transition-colors whitespace-nowrap">
                        <Download size={16} /> Export Waitlist (CSV)
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-[#1B2A4A] font-medium text-sm rounded-none hover:bg-gray-50 transition-colors">
                        <Download size={16} /> Export
                      </button>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-[#1B2A4A] font-medium text-sm rounded-none hover:bg-gray-50 transition-colors">
                        <Filter size={16} /> Filters
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-visible border border-gray-100">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/80">
                      <th className="px-5 py-4 w-10">
                        <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                      </th>
                      <th className="px-5 py-4">Participant</th>
                      <th className="px-5 py-4">Contact</th>
                      <th className="px-5 py-4">Tickets</th>
                      <th className="px-5 py-4">{activeSubTab === 'Waiting List' ? 'Joined' : 'Booked On'}</th>
                      <th className="px-5 py-4">{activeSubTab === 'Waiting List' ? 'Added On' : 'Payment'}</th>
                      {activeSubTab !== 'Waiting List' && <th className="px-5 py-4">Status</th>}
                      <th className="px-5 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activeSubTab === 'Waiting List' ? (
                      MOCK_WAITLIST.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3">
                            <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                              <div>
                                <p className="text-sm font-semibold text-[#1B2A4A]">{p.name}</p>
                                <p className="text-xs text-gray-500">{p.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 font-medium">
                            {p.phone}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 font-medium">
                            {p.tickets}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 font-medium whitespace-pre-line">
                            {p.joined}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 font-medium whitespace-pre-line">
                            <div className="flex items-center gap-3">
                              <span>{p.addedOn}</span>
                              <span className="inline-flex items-center px-2 py-0.5 border border-orange-200 text-[10px] font-semibold rounded-none bg-orange-50 text-orange-500">
                                {p.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-1.5 border border-green-200 text-green-500 hover:text-green-600 hover:border-green-300 transition-colors rounded-none bg-white" title="Promote to Confirmed">
                                <ArrowUp size={16} />
                              </button>
                              <button className="p-1.5 border border-blue-200 text-blue-500 hover:text-blue-600 hover:border-blue-300 transition-colors rounded-none bg-white" title="Manually Approve">
                                <CheckCircle2 size={16} />
                              </button>
                              <button className="p-1.5 border border-red-200 text-red-500 hover:text-red-600 hover:border-red-300 transition-colors rounded-none bg-white" title="Remove">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      MOCK_PARTICIPANTS.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3">
                            <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                              <div>
                                <p className="text-sm font-semibold text-[#1B2A4A]">{p.name}</p>
                                <p className="text-xs text-gray-500">{p.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 font-medium">
                            {p.phone}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 font-medium">
                            {p.tickets}
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 font-medium whitespace-pre-line">
                            {p.bookedOn}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-none w-fit">
                                {p.paymentStatus}
                              </span>
                              <span className="text-sm text-gray-600 font-medium">{p.amount}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 border border-green-200 text-xs font-semibold rounded-none bg-green-50 text-green-600">
                              {p.status} <Check size={12} />
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white">
                                <Eye size={16} />
                              </button>
                              <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="pt-2 flex justify-between items-center gap-4 text-sm text-gray-500 font-medium flex-wrap">
                <div>Showing 1 to 10 of 342 participants</div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft size={16} /></button>
                  <button className="w-8 h-8 flex items-center justify-center border border-[#1B2A4A] bg-[#1B2A4A] text-white rounded-none text-sm font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">2</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">3</button>
                  <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">35</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors"><ChevronRight size={16} /></button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-none p-8 shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Info size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">{activeTab}</h3>
                <p className="text-gray-500 max-w-md">
                  This is static mock data for the {activeTab} tab. The UI is dynamically structured to swap out this content view based on the selected tab above.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Event Summary */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-[#1B2A4A] mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-[#C9A84C]" />
              Event Summary
            </h3>
            
            <img src={event.image} alt="Event Cover" className="w-full h-32 object-cover rounded-none mb-5 border border-gray-200" />
            
            <h4 className="text-lg font-bold text-[#1B2A4A] mb-4">{event.title}</h4>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <Calendar size={16} className="text-gray-400" /> {event.date}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <Clock size={16} className="text-gray-400" /> {event.time}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <MapPin size={16} className="text-gray-400" /> {event.city}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <Users size={16} className="text-gray-400" /> {event.capacityCurrent} / {event.capacityTotal} Booked
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1B2A4A]">Booking Status</span>
                <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-none font-semibold text-xs">Booking Open</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1B2A4A]">Price</span>
                <span className="font-bold text-gray-700">CHF {event.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#1B2A4A]">Total Revenue</span>
                <span className="font-bold text-gray-700">CHF 41,040</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fef9eb] rounded-none p-5 border border-[#f5e6c4]">
            <div className="flex items-start gap-3">
              <Lightbulb size={20} className="text-[#C9A84C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[#8b6b23] mb-1">Tip</h4>
                <p className="text-xs text-[#a08442] leading-relaxed">
                  You can manage participants from all tabs and export data for your records.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
