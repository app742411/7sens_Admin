import { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Filter, 
  ChevronDown,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  CreditCard,
  Ban,
  Unlock,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Bookings');
  const [isBlocked, setIsBlocked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Mock Bookings Data
  const bookings = [
    {
      id: 'BK-2025-1246',
      eventName: 'Sunset Rooftop Party',
      eventSubtitle: 'Evening of Tasting & Discussion',
      date: 'Jun 14, 2025',
      time: '07:00 PM',
      location: 'Zurich',
      country: 'Switzerland',
      participants: '12/12',
      amount: 'CHF 55',
      status: 'Confirmed',
      image: 'https://picsum.photos/seed/ev1/60/40'
    },
    {
      id: 'BK-2025-1189',
      eventName: 'Creative Workshop & Meetings',
      eventSubtitle: 'Connect • Learn • Share',
      date: 'May 28, 2025',
      time: '06:30 PM',
      location: 'Lausanne',
      country: 'Switzerland',
      participants: '8/10',
      amount: 'CHF 55',
      status: 'Upcoming',
      image: 'https://picsum.photos/seed/ev2/60/40'
    },
    {
      id: 'BK-2025-1054',
      eventName: 'Sunset & Conversations',
      eventSubtitle: 'Meaningful Connections',
      date: 'May 17, 2025',
      time: '08:00 PM',
      location: 'Montreux',
      country: 'Switzerland',
      participants: '10/10',
      amount: 'CHF 60',
      status: 'Completed',
      image: 'https://picsum.photos/seed/ev3/60/40'
    },
    {
      id: 'BK-2025-0981',
      eventName: 'Private Art Gallery',
      eventSubtitle: 'Art & Inspiration',
      date: 'Apr 25, 2025',
      time: '05:00 PM',
      location: 'Geneva',
      country: 'Switzerland',
      participants: '6/8',
      amount: 'CHF 50',
      status: 'Cancelled',
      image: 'https://picsum.photos/seed/ev4/60/40'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[11px] font-bold rounded-sm border border-green-100">Confirmed</span>;
      case 'Upcoming':
        return <span className="px-2.5 py-1 bg-orange-50 text-orange-600 text-[11px] font-bold rounded-sm border border-orange-100">Upcoming</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-sm border border-blue-100">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-bold rounded-sm border border-red-100">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAF8] overflow-y-auto custom-scrollbar p-8">
      
      {/* Header & Back Button */}
      <div className="flex flex-col mb-8">
        <button 
          onClick={() => navigate('/users')}
          className="flex items-center gap-2 text-sm font-bold text-[#1B2A4A] mb-6 hover:text-[#C9A84C] transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Users
        </button>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-[#1B2A4A] mb-1">User Profile</h1>
            <p className="text-sm text-gray-500">View and manage user information and booking history.</p>
          </div>
          
          {/* Admin Actions Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowActions(!showActions)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-sm text-sm font-bold text-[#1B2A4A] hover:bg-gray-50 shadow-sm"
            >
              User Actions <ChevronDown size={14} />
            </button>
            
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-sm py-1 z-20 flex flex-col">
                <button 
                  onClick={() => setIsBlocked(!isBlocked)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors text-left ${
                    isBlocked ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  {isBlocked ? <Unlock size={14} /> : <Ban size={14} />}
                  {isBlocked ? 'Unblock User' : 'Block User'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Profile Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Left Card: Avatar & Contact Info */}
        <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-sm flex flex-col w-full lg:w-[350px] shrink-0 relative overflow-hidden">
          {isBlocked && (
             <div className="absolute top-0 left-0 w-full bg-red-50 text-red-600 text-[10px] font-bold text-center py-1 uppercase tracking-widest border-b border-red-100">
               Account Blocked
             </div>
          )}
          <div className="flex items-center gap-6 mb-8 mt-2">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=clara" alt="Clara Dubois" className={`w-20 h-20 rounded-full object-cover border-2 ${isBlocked ? 'border-red-400 opacity-75 grayscale' : 'border-white'} shadow-sm`} />
              {!isBlocked && (
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-sm">
                  <ShieldCheck size={12} />
                </div>
              )}
            </div>
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-xl font-bold text-[#1B2A4A]">Clara Dubois</h2>
              <span className="px-2.5 py-1 bg-[#F9F6F0] border border-[#C9A84C] text-[#C9A84C] text-[10px] font-bold tracking-wide uppercase rounded-sm flex items-center gap-1.5">
                <ShieldCheck size={12} /> Premium Member
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400" /> clara.dubois@email.com
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400" /> +41 78 123 45 67
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-400" /> Zurich, Switzerland
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gray-400" /> Member since May 12, 2025
            </div>
          </div>
        </div>

        {/* Right Card: Personal Information & Interests */}
        <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-sm flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-[120px_1fr]">
                  <span className="text-sm text-gray-500">Full Name</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">Clara Dubois</span>
                </div>
                <div className="grid grid-cols-[120px_1fr]">
                  <span className="text-sm text-gray-500">Date of Birth</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">April 15, 1992</span>
                </div>
                <div className="grid grid-cols-[120px_1fr]">
                  <span className="text-sm text-gray-500">Gender</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">Female</span>
                </div>
                <div className="grid grid-cols-[120px_1fr]">
                  <span className="text-sm text-gray-500">Languages</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">English, French, German</span>
                </div>
                <div className="grid grid-cols-[120px_1fr]">
                  <span className="text-sm text-gray-500">Profession</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">Marketing Manager</span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-[100px_1fr]">
                  <span className="text-sm text-gray-500">Interests</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">Travel, Photography, Wine Tasting</span>
                </div>
                <div className="grid grid-cols-[100px_1fr]">
                  <span className="text-sm text-gray-500">Looking For</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">Meaningful Conversations</span>
                </div>
                <div className="grid grid-cols-[100px_1fr]">
                  <span className="text-sm text-gray-500">About Me</span>
                  <span className="text-sm font-medium text-gray-600 leading-relaxed">
                    I love meeting new people and exploring different cultures. Let's connect!
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#FDFBF7] border border-[#F0EBE1] rounded-sm p-4 flex items-center justify-center gap-3">
            <ShieldCheck size={18} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] font-semibold text-center">
              Your information is private and will never be shared with others.
            </span>
          </div>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1B2A4A] mb-1">Booking History</h2>
            <p className="text-sm text-gray-500">View all past and upcoming event bookings.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-bold text-[#1B2A4A] rounded-sm hover:bg-gray-50">
            <Filter size={14} /> Filter <ChevronDown size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
          {['All Bookings', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 ${
                activeTab === tab ? 'text-[#C9A84C] border-[#C9A84C]' : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Event</th>
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Participants</th>
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Booking ID</th>
                <th className="px-6 py-4 text-xs font-bold text-[#1B2A4A]">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={booking.image} alt="" className="w-[60px] h-[40px] rounded-sm object-cover border border-gray-200" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1B2A4A]">{booking.eventName}</span>
                        <span className="text-[11px] text-gray-500">{booking.eventSubtitle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{booking.date}</span>
                      <span className="text-[11px] text-gray-500">{booking.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1">
                      <MapPin size={12} className="text-gray-400 mt-1 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">{booking.location}</span>
                        <span className="text-[11px] text-gray-500">{booking.country}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                      <Users size={14} className="text-gray-400" /> {booking.participants}
                      <span className="text-[10px] text-gray-400 font-normal">Booked</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#1B2A4A]">{booking.amount}</td>
                  <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-gray-500">{booking.id}</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-sm text-[11px] font-bold text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#C9A84C]">
            <CalendarCheck size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1B2A4A] leading-none mb-1">4</span>
            <span className="text-[11px] font-medium text-gray-500">Total Bookings</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1B2A4A] leading-none mb-1">1</span>
            <span className="text-[11px] font-medium text-gray-500">Upcoming Events</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1B2A4A] leading-none mb-1">2</span>
            <span className="text-[11px] font-medium text-gray-500">Completed</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
            <XCircle size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1B2A4A] leading-none mb-1">1</span>
            <span className="text-[11px] font-medium text-gray-500">Cancelled</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#C9A84C]">
            <CreditCard size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1B2A4A] leading-none mb-1">CHF 220</span>
            <span className="text-[11px] font-medium text-gray-500">Total Spent</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};


