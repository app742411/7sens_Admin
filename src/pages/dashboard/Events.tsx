import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  ChevronDown, 
  Filter, 
  Plus,
  Edit2,
  Trash2,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  AlertTriangle,
  X,
  Copy
} from 'lucide-react';


// Mock Data matching the screenshot
export const MOCK_EVENTS = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/event1/100/60',
    title: 'Sunset Rooftop Party',
    venue: 'Rooftop 7Sens',
    city: 'Zurich',
    date: 'Jun 28, 2025',
    time: '07:00 PM',
    capacityCurrent: 342,
    capacityTotal: 500,
    status: 'Booking Open',
    price: 120
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/event2/100/60',
    title: 'Wine & Dine Experience',
    venue: 'Le Flon Restaurant',
    city: 'Lausanne',
    date: 'Jul 12, 2025',
    time: '08:00 PM',
    capacityCurrent: 287,
    capacityTotal: 400,
    status: 'Booking Open',
    price: 150
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/event3/100/60',
    title: 'Exclusive Yacht Night',
    venue: 'Lake Geneva',
    city: 'Geneva',
    date: 'Jul 26, 2025',
    time: '06:30 PM',
    capacityCurrent: 215,
    capacityTotal: 300,
    status: 'Waiting List',
    price: 200
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/event4/100/60',
    title: 'Private Art Gallery',
    venue: 'Galerie Bellevaux',
    city: 'Montreux',
    date: 'Aug 09, 2025',
    time: '07:00 PM',
    capacityCurrent: 198,
    capacityTotal: 250,
    status: 'Booking Open',
    price: 80
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/event5/100/60',
    title: 'Live Jazz Concert',
    venue: 'The Jazz Club',
    city: 'Basel',
    date: 'Aug 23, 2025',
    time: '08:00 PM',
    capacityCurrent: 156,
    capacityTotal: 220,
    status: 'Waiting List',
    price: 90
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/event6/100/60',
    title: 'Wellness Retreat Day',
    venue: 'Nature Bliss Center',
    city: 'Interlaken',
    date: 'Sep 06, 2025',
    time: '09:00 AM',
    capacityCurrent: 98,
    capacityTotal: 150,
    status: 'Fully Booked',
    price: 180
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/event7/100/60',
    title: 'New Year\'s Eve Gala',
    venue: 'Grand Hotel Palace',
    city: 'Zurich',
    date: 'Dec 31, 2025',
    time: '09:00 PM',
    capacityCurrent: 500,
    capacityTotal: 500,
    status: 'Fully Booked',
    price: 250
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  let bg = '';
  let text = '';
  
  switch (status) {
    case 'Booking Open':
      bg = 'bg-green-50';
      text = 'text-green-600';
      break;
    case 'Waiting List':
      bg = 'bg-orange-50';
      text = 'text-orange-600';
      break;
    case 'Fully Booked':
      bg = 'bg-purple-50';
      text = 'text-purple-600';
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

export const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setEventToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete !== null) {
      setEvents(events.filter(e => e.id !== eventToDelete));
    }
    setDeleteModalOpen(false);
    setEventToDelete(null);
  };

  const handleClone = (eventToClone: typeof MOCK_EVENTS[0]) => {
    const newEvent = {
      ...eventToClone,
      id: Date.now(),
      title: `${eventToClone.title} - Copy`
    };
    
    // Find the index of the original event
    const index = events.findIndex(e => e.id === eventToClone.id);
    
    // Insert the clone right after the original event
    const newEvents = [...events];
    newEvents.splice(index + 1, 0, newEvent);
    
    setEvents(newEvents);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">Events</h1>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">Dashboard</span>
            <ChevronRight size={14} />
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">Events</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">All Events</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/events/add')}
          className="flex items-center gap-2 bg-[#C9A84C] text-white px-5 py-2.5 rounded-none font-medium shadow-sm hover:bg-[#b59641] transition-colors"
        >
          <Plus size={18} />
          Add New Event
        </button>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-none shadow-sm border border-gray-100 flex flex-col">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-[400px]">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search events by title, venue or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto">
            {/* Date Range */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Calendar size={16} className="text-[#1B2A4A]" />
              May 18, 2025 - Jun 18, 2025
              <ChevronDown size={16} className="text-gray-400 ml-1" />
            </button>
            
            {/* Status Filter */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
              All Status
              <ChevronDown size={16} className="text-gray-400 ml-1" />
            </button>
            
            {/* Filters */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Filter size={16} className="text-[#1B2A4A]" />
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/50">
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    City <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Date & Time <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Capacity <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Status <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Price <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div 
                      className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <img src={event.image} alt={event.title} className="w-20 h-12 object-cover rounded-none border border-gray-200" />
                      <div>
                        <h4 className="text-sm font-bold text-[#1B2A4A] hover:text-[#C9A84C] transition-colors">{event.title}</h4>
                        <span className="text-xs text-blue-900/60 font-medium">{event.venue}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.city}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Clock size={14} className="text-gray-400" />
                        {event.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 w-24">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Users size={14} className="text-gray-400" />
                        {event.capacityCurrent} / {event.capacityTotal}
                      </div>
                      <div className="w-full bg-gray-100 h-1 rounded-none overflow-hidden">
                        <div 
                          className="bg-[#C9A84C] h-full" 
                          style={{ width: `${(event.capacityCurrent / event.capacityTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#1B2A4A]">
                    CHF {event.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleClone(event)}
                        className="p-1.5 border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors rounded-none bg-white"
                        title="Clone Event"
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => navigate(`/events/edit/${event.id}`)}
                        className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white"
                        title="Edit Event"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(event.id)}
                        className="p-1.5 border border-red-100 text-red-400 hover:text-red-600 hover:border-red-300 transition-colors rounded-none bg-red-50/50"
                        title="Delete Event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 font-medium">
            Showing 1 to 7 of 48 events
          </div>
          
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-400 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={16} />
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
            <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
              ...
            </span>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
              7
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-none shadow-xl border border-gray-200 w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-semibold text-[#1B2A4A] flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500" />
                Confirm Deletion
              </h3>
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body */}
            <div className="px-6 py-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete this event? This action cannot be undone and will permanently remove the event and all associated bookings.
              </p>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 font-medium text-sm rounded-none hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white font-medium text-sm rounded-none hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
