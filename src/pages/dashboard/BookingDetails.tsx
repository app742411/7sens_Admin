import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  MapPin,
  ExternalLink,
  Share2,
  Mail,
  XCircle,
  Info,
  Download,
  CalendarPlus,
  Wine,
  MessageSquare,
  Star,
  Users2
} from 'lucide-react';

export const BookingDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* Top Bar with Back Button */}
      <div className="flex items-center text-sm font-medium text-[#1B2A4A] cursor-pointer hover:text-[#C9A84C] transition-colors w-fit -mt-4 mb-2" onClick={() => navigate('/bookings')}>
        <ArrowLeft size={16} className="mr-2" />
        Back to Bookings
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#1B2A4A] mb-2 font-heading">Booking Details</h1>
          <p className="text-gray-500">View your booking information and event details.</p>
        </div>
        <div className="flex items-center bg-green-50 px-4 py-2 rounded-none border border-green-100">
          <div className="w-2 h-2 rounded-none bg-green-500 mr-2"></div>
          <span className="text-sm font-medium text-green-700">Status: Confirmed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Event Card */}
          <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6">
            <img 
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop" 
              alt="Event" 
              className="w-full md:w-64 h-48 object-cover rounded-none"
            />
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-none w-fit mb-3">
                Evening of Tasting & Discussion
              </span>
              <h2 className="text-2xl font-semibold text-[#1B2A4A] mb-3">Sunset Rooftop Party</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                An exclusive evening of meaningful conversations, fine wines, and stunning views. Connect with like-minded people in a relaxed and elegant atmosphere.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-400 gap-1.5 mb-1">
                    <Calendar size={16} />
                    <span>Jun 14, 2025</span>
                  </div>
                  <span className="text-gray-600 pl-5 text-xs">Saturday</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-400 gap-1.5 mb-1">
                    <Clock size={16} />
                    <span>07:00 PM</span>
                  </div>
                  <span className="text-gray-600 pl-5 text-xs">(2.5 Hours)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-400 gap-1.5 mb-1">
                    <MapPin size={16} />
                    <span>Zurich</span>
                  </div>
                  <span className="text-gray-600 pl-5 text-xs">Switzerland</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-400 gap-1.5 mb-1">
                    <Users size={16} />
                    <span>12 / 12</span>
                  </div>
                  <span className="text-gray-600 pl-5 text-xs">Booked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1B2A4A] mb-6">Booking Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1B2A4A]">BK-2025-1246</span>
                  <div className="cursor-pointer text-gray-400 hover:text-gray-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Booking Date</p>
                <span className="font-medium text-[#1B2A4A]">May 18, 2025 10:25 AM</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Booked By</p>
                <div className="flex items-center gap-2">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" alt="User" className="w-6 h-6 rounded-none object-cover" />
                  <span className="font-medium text-[#1B2A4A]">Clara Dubois</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 mb-6"></div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Participants</p>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-400" />
                  <span className="font-medium text-[#1B2A4A]">1 Person</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Ticket Type</p>
                <span className="font-medium text-[#1B2A4A]">Standard Ticket</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Booking Status</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-none border border-green-100">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-none p-4 flex items-center gap-3">
              <CheckCircle className="text-green-500" size={20} />
              <p className="text-sm text-green-700">Your spot is confirmed! We look forward to seeing you at the event.</p>
            </div>
          </div>

          {/* Venue Information */}
          <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1B2A4A] mb-6">Venue Information</h3>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="w-full sm:w-1/3 flex flex-col gap-3">
                <img src="https://images.unsplash.com/photo-1572116469696-31de0f17ce34?q=80&w=400&auto=format&fit=crop" alt="Venue" className="w-full h-32 object-cover rounded-none" />
                <h4 className="font-semibold text-[#1B2A4A]">Cloud 9 Rooftop Lounge</h4>
                <p className="text-sm text-gray-500">Maagstrasse 80, 8005 Zurich, Switzerland</p>
                <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 w-fit">
                  View on Map <ExternalLink size={14} />
                </a>
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Dress Code</p>
                    <p className="font-medium text-[#1B2A4A]">Smart Casual</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Parking</p>
                    <p className="font-medium text-[#1B2A4A]">Available (Paid)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Nearest Station</p>
                    <p className="font-medium text-[#1B2A4A]">Zürich Hardbrücke (5 min walk)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Entry</p>
                    <p className="font-medium text-[#1B2A4A]">Please arrive 15 minutes early</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="text-gray-400 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Contact</p>
                    <p className="font-medium text-[#1B2A4A]">+41 44 123 45 67</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-none p-4 flex items-center gap-3">
              <Info className="text-orange-500" size={20} />
              <p className="text-sm text-orange-800">Please bring a valid ID. Entry is subject to event guidelines.</p>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex flex-col gap-6">
          
          {/* Payment Breakdown */}
          <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1B2A4A] mb-6">Payment Breakdown</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Ticket Price (Standard)</span>
                <span className="font-medium text-[#1B2A4A]">CHF 45.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Service Fee</span>
                <span className="font-medium text-[#1B2A4A]">CHF 5.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Booking Fee</span>
                <span className="font-medium text-[#1B2A4A]">CHF 3.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">VAT (8.1%)</span>
                <span className="font-medium text-[#1B2A4A]">CHF 5.86</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-gray-100 mb-4"></div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-[#1B2A4A]">CHF 58.86</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-none border border-green-100">
                Paid
              </span>
              <div className="flex flex-col text-xs text-gray-500">
                <span>Paid on May 18, 2025 10:25 AM</span>
                <span>via Visa •••• 4242</span>
              </div>
            </div>

            <button className="w-full py-2.5 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Download size={16} />
              Download Invoice
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1B2A4A] mb-6">Quick Actions</h3>
            
            <div className="flex flex-col">
              <button className="flex items-center gap-3 py-4 text-sm font-medium text-[#1B2A4A] hover:text-[#C9A84C] transition-colors border-b border-gray-100">
                <CalendarPlus size={18} className="text-gray-400" />
                Add to Calendar
              </button>
              <button className="flex items-center gap-3 py-4 text-sm font-medium text-[#1B2A4A] hover:text-[#C9A84C] transition-colors border-b border-gray-100">
                <Share2 size={18} className="text-gray-400" />
                Share Event
              </button>
              <button className="flex items-center gap-3 py-4 text-sm font-medium text-[#1B2A4A] hover:text-[#C9A84C] transition-colors border-b border-gray-100">
                <Mail size={18} className="text-gray-400" />
                Contact Organizer
              </button>
              <button className="flex items-center gap-3 py-4 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                <XCircle size={18} />
                Cancel Booking
              </button>
            </div>
          </div>
          {/* Booking Notes */}
          <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4">Special Requests</h3>
            <div className="bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-800">
              <span className="font-semibold block mb-1">Dietary Requirements:</span>
              Vegetarian meal requested. Allergic to peanuts.
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 block mb-1">Host Notes:</span>
              <p className="text-sm text-[#1B2A4A]">VIP guest, please ensure premium seating near the front.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Schedule */}
      <div className="bg-white rounded-none p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1B2A4A] mb-6">Event Schedule (What to Expect)</h3>
        
        <div className="flex flex-col sm:flex-row justify-between relative">
          <div className="absolute top-6 left-0 right-0 h-px bg-gray-200 hidden sm:block -z-10"></div>
          
          <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 flex-1 mb-8 sm:mb-0 relative bg-white z-0 pr-4 sm:pr-0">
            <div className="w-12 h-12 rounded-none bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0 mx-auto sm:mx-0">
              <Users2 size={20} />
            </div>
            <div className="flex-1 sm:text-left">
              <p className="text-xs font-semibold text-gray-800 mb-1 mt-1">07:00 PM</p>
              <p className="text-sm font-semibold text-[#1B2A4A] mb-1">Welcome & Check-in</p>
              <p className="text-xs text-gray-500 max-w-[150px]">Meet your host and fellow participants</p>
            </div>
            <div className="hidden sm:block absolute top-6 -right-6 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 flex-1 mb-8 sm:mb-0 relative bg-white z-0 pr-4 sm:pr-0">
            <div className="w-12 h-12 rounded-none bg-green-50 border border-green-100 flex items-center justify-center text-green-500 flex-shrink-0 mx-auto sm:mx-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <div className="flex-1 sm:text-left">
              <p className="text-xs font-semibold text-gray-800 mb-1 mt-1">07:15 PM</p>
              <p className="text-sm font-semibold text-[#1B2A4A] mb-1">Icebreaker Activities</p>
              <p className="text-xs text-gray-500 max-w-[150px]">Fun activities to help start conversations</p>
            </div>
            <div className="hidden sm:block absolute top-6 -right-6 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 flex-1 mb-8 sm:mb-0 relative bg-white z-0 pr-4 sm:pr-0">
            <div className="w-12 h-12 rounded-none bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 mx-auto sm:mx-0">
              <Wine size={20} />
            </div>
            <div className="flex-1 sm:text-left">
              <p className="text-xs font-semibold text-gray-800 mb-1 mt-1">07:45 PM</p>
              <p className="text-sm font-semibold text-[#1B2A4A] mb-1">Wine Tasting & Discussion</p>
              <p className="text-xs text-gray-500 max-w-[160px]">Curated wines and guided meaningful discussions</p>
            </div>
            <div className="hidden sm:block absolute top-6 -right-6 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 flex-1 mb-8 sm:mb-0 relative bg-white z-0 pr-4 sm:pr-0">
            <div className="w-12 h-12 rounded-none bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0 mx-auto sm:mx-0">
              <MessageSquare size={20} />
            </div>
            <div className="flex-1 sm:text-left">
              <p className="text-xs font-semibold text-gray-800 mb-1 mt-1">09:00 PM</p>
              <p className="text-sm font-semibold text-[#1B2A4A] mb-1">Open Conversations</p>
              <p className="text-xs text-gray-500 max-w-[150px]">Free flow conversations and connections</p>
            </div>
            <div className="hidden sm:block absolute top-6 -right-6 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 flex-1 relative bg-white z-0">
            <div className="w-12 h-12 rounded-none bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500 flex-shrink-0 mx-auto sm:mx-0">
              <Star size={20} />
            </div>
            <div className="flex-1 sm:text-left">
              <p className="text-xs font-semibold text-gray-800 mb-1 mt-1">09:30 PM</p>
              <p className="text-sm font-semibold text-[#1B2A4A] mb-1">Event Ends</p>
              <p className="text-xs text-gray-500 max-w-[150px]">Take memories and new connections home</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
