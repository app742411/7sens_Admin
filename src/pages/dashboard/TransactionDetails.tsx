import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download,
  Printer,
  Receipt,
  User,
  Mail,
  Phone,
  MapPin,
  HeadphonesIcon,
  CheckCircle2,
  Send,
  Star,
  ExternalLink,
  CreditCard,
  AlertCircle
} from 'lucide-react';

export const TransactionDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* Top Bar with Back Button */}
      <div className="flex items-center text-sm font-medium text-[#1B2A4A] cursor-pointer hover:text-[#C9A84C] transition-colors w-fit -mt-4 mb-2" onClick={() => navigate('/payments')}>
        <ArrowLeft size={16} className="mr-2" />
        Back to Transactions
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#1B2A4A] mb-2 font-heading">Translation Details</h1>
          <p className="text-gray-500">View detailed translation and breakdown of this transaction.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#1B2A4A] text-sm font-medium rounded-none hover:bg-gray-50 transition-colors">
            <Download size={16} />
            Download Invoice
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#1B2A4A] text-sm font-medium rounded-none hover:bg-gray-50 transition-colors">
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>

      {/* Top Grid - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Col 1 (span 4) */}
        <div className="md:col-span-4 bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col gap-5 h-full">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-none flex items-center justify-center text-orange-500 flex-shrink-0">
              <Receipt size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Transaction ID</span>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-[#1B2A4A]">TXN-250618-0001</span>
                <span className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-100 text-[10px] font-bold rounded-none uppercase">Completed</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-xs text-gray-500 block mb-0.5">Event</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">Sunset Rooftop Party</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block mb-0.5">Date & Time</span>
                  <span className="text-sm font-medium text-[#1B2A4A]">May 18, 2025 • 10:24 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2 (span 5) */}
        <div className="md:col-span-5 bg-white rounded-none p-6 border border-gray-100 shadow-sm grid grid-cols-2 gap-y-6 gap-x-4 h-full">
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-xs text-gray-500 mb-2">User</span>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" alt="User" className="w-10 h-10 rounded-none object-cover" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1B2A4A]">Maria Dupont</span>
                <span className="text-xs text-gray-500">maria.dupont@email.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-xs text-gray-500 mb-2">Payment Status</span>
            <div>
              <span className="inline-block px-2.5 py-1 bg-green-50 text-green-600 border border-green-100 text-[10px] font-bold rounded-none uppercase">Completed</span>
            </div>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-xs text-gray-500 mb-2">Payment Method</span>
            <div className="flex items-center gap-2">
              <span className="text-[#1A1F71] font-bold text-lg tracking-wider">VISA</span>
              <span className="text-sm font-medium text-[#1B2A4A]">•••• 4242</span>
            </div>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-xs text-gray-500 mb-2">Paid On</span>
            <span className="text-sm font-medium text-[#1B2A4A]">May 18, 2025 • 10:25 AM</span>
          </div>
        </div>

        {/* Col 3 (span 3) */}
        <div className="md:col-span-3 bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
          <div className="flex flex-col pb-4 border-b border-gray-100">
            <span className="text-xs text-gray-500 mb-1">Total Paid Amount</span>
            <span className="text-2xl font-bold text-[#1B2A4A]">CHF 120.00</span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">Refunded Amount</span>
            <span className="text-sm font-medium text-red-500">CHF 0.00</span>
          </div>
          
          <div className="flex justify-between items-center pt-4 mt-auto">
            <span className="text-xs font-semibold text-gray-500">Net Amount</span>
            <span className="text-lg font-bold text-[#1B2A4A]">CHF 120.00</span>
          </div>
        </div>

      </div>

      {/* Middle Grid - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Amount Breakdown (span 6) */}
        <div className="md:col-span-6 bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col h-full">
          <h3 className="text-sm font-bold text-[#1B2A4A] mb-6">Amount Breakdown</h3>
          
          <div className="w-full h-full flex flex-col">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-4 pb-2 border-b border-gray-100">
              <div className="w-5/12">Description</div>
              <div className="w-3/12 text-left">Amount (CHF)</div>
              <div className="w-4/12 text-left">Details</div>
            </div>
            
            <div className="flex flex-col gap-3 text-sm mb-6 flex-1">
              <div className="flex justify-between items-center">
                <div className="w-5/12 text-[#1B2A4A] font-semibold text-xs">Ticket Price (Standard)</div>
                <div className="w-3/12 font-medium text-[#1B2A4A]">CHF 120.00</div>
                <div className="w-4/12 text-left text-gray-500 text-xs">1 × CHF 120.00</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-5/12 text-[#1B2A4A] font-semibold text-xs">Service Fee</div>
                <div className="w-3/12 font-medium text-[#1B2A4A]">CHF 10.00</div>
                <div className="w-4/12 text-left text-gray-500 text-xs">Platform service charge</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-5/12 text-[#1B2A4A] font-semibold text-xs">Booking Fee</div>
                <div className="w-3/12 font-medium text-[#1B2A4A]">CHF 3.00</div>
                <div className="w-4/12 text-left text-gray-500 text-xs">Transaction processing fee</div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="w-5/12 text-[#1B2A4A] font-semibold text-xs">VAT (8.1%)</div>
                <div className="w-3/12 font-medium text-[#1B2A4A]">CHF 10.07</div>
                <div className="w-4/12 text-left text-gray-500 text-xs">On ticket price + fees</div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="w-5/12 font-bold text-[#1B2A4A] text-xs">Total Amount</div>
                <div className="w-7/12 font-bold text-[#1B2A4A]">CHF 143.07</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-5/12 text-[#1B2A4A] font-semibold text-xs">Discount Applied</div>
                <div className="w-3/12 font-bold text-green-600">- CHF 23.07</div>
                <div className="w-4/12 text-left text-gray-500 text-xs uppercase">EARLYBIRD10 (10%)</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-orange-50 border border-orange-100 mt-auto">
              <span className="font-bold text-[#1B2A4A]">Paid Amount</span>
              <span className="font-bold text-[#1B2A4A]">CHF 120.00</span>
            </div>
          </div>
        </div>

        {/* Currency & Conversion Details (span 3) */}
        <div className="md:col-span-3 bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col h-full">
          <h3 className="text-sm font-bold text-[#1B2A4A] mb-6">Currency & Conversion Details</h3>
          
          <div className="flex flex-col gap-5 text-sm flex-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Original Amount</span>
              <span className="font-medium text-[#1B2A4A]">EUR 114.50</span>
            </div>
            <div className="flex justify-between items-center pb-5 border-b border-gray-100">
              <span className="text-xs text-gray-500">Exchange Rate</span>
              <span className="font-medium text-[#1B2A4A]">1 EUR = 0.9882 CHF</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-gray-500">Converted Amount</span>
              <span className="font-medium text-[#1B2A4A]">CHF 113.20</span>
            </div>
            <div className="flex justify-between items-center pb-5 border-b border-gray-100">
              <span className="text-xs text-gray-500">Bank / Processor Fee</span>
              <span className="font-medium text-[#1B2A4A]">CHF 6.80</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 mt-auto">
            <span className="font-bold text-[#1B2A4A] text-xs">Net Amount (Paid)</span>
            <span className="font-bold text-[#1B2A4A]">CHF 120.00</span>
          </div>
        </div>

        {/* Payment Information (span 3) */}
        <div className="md:col-span-3 bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col h-full">
          <h3 className="text-sm font-bold text-[#1B2A4A] mb-6">Payment Information</h3>
          
          <div className="flex flex-col gap-6 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Payment Method</span>
              <span className="font-medium text-[#1B2A4A]">Visa •••• 4242</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Payment Gateway</span>
              <span className="font-medium text-[#1B2A4A]">Stripe</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Payment ID</span>
              <span className="font-medium text-[#1B2A4A]">pi_3M6Xf8E8jK2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Authorization Code</span>
              <span className="font-medium text-[#1B2A4A]">923481</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Receipt / Invoice</span>
              <a href="#" className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5 text-xs">
                INV-250618-0001 <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Grid - Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Booking Summary & Customer Information Combined (span 8) */}
        <div className="md:col-span-8 bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 h-full">
          
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-6">Booking Summary</h3>
            <div className="flex gap-4">
              <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=200&auto=format&fit=crop" alt="Event" className="w-32 h-24 object-cover rounded-none" />
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex gap-8">
                  <span className="text-gray-500 w-16">Event</span>
                  <span className="font-medium text-[#1B2A4A]">Sunset Rooftop Party</span>
                </div>
                <div className="flex gap-8">
                  <span className="text-gray-500 w-16">Venue</span>
                  <span className="font-medium text-[#1B2A4A]">Cloud 9 Rooftop Lounge, Zurich</span>
                </div>
                <div className="flex gap-8">
                  <span className="text-gray-500 w-16">Date & Time</span>
                  <span className="font-medium text-[#1B2A4A]">May 18, 2025, 07:00 PM</span>
                </div>
                <div className="flex gap-8">
                  <span className="text-gray-500 w-16">Participants</span>
                  <span className="font-medium text-[#1B2A4A]">1 Person</span>
                </div>
                <div className="flex gap-8">
                  <span className="text-gray-500 w-16">Seat / Spot</span>
                  <span className="font-medium text-[#1B2A4A]">Table 12</span>
                </div>
                <div className="flex gap-8">
                  <span className="text-gray-500 w-16">Booking ID</span>
                  <span className="font-medium text-[#1B2A4A]">BK-2025-1246</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px bg-gray-100 h-full"></div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-6">Customer Information</h3>
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 w-24">
                  <User size={14} />
                  <span>Full Name</span>
                </div>
                <span className="font-medium text-[#1B2A4A]">Maria Dupont</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 w-24">
                  <Mail size={14} />
                  <span>Email</span>
                </div>
                <span className="font-medium text-[#1B2A4A]">maria.dupont@email.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 w-24">
                  <Phone size={14} />
                  <span>Phone</span>
                </div>
                <span className="font-medium text-[#1B2A4A]">+41 78 123 45 67</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 w-24">
                  <MapPin size={14} />
                  <span>Location</span>
                </div>
                <span className="font-medium text-[#1B2A4A]">Zurich, Switzerland</span>
              </div>
            </div>
          </div>

        </div>

        {/* Notes & Support Combined (span 4) */}
        <div className="md:col-span-4 bg-white rounded-none p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
          <div>
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-4">Notes</h3>
            <div className="bg-blue-50 border border-blue-100 p-4 flex items-center gap-2 text-xs text-blue-600 mb-6">
              <AlertCircle size={14} />
              No notes available for this transaction.
            </div>
          </div>
          
          <div className="mt-auto">
            <h3 className="text-sm font-bold text-[#1B2A4A] mb-2">Need Help?</h3>
            <p className="text-[11px] text-gray-500 mb-4">If you have any questions about this transaction, please contact our support team.</p>
            <button className="flex items-center gap-2 text-xs font-semibold text-[#1B2A4A] hover:text-[#C9A84C] transition-colors">
              <HeadphonesIcon size={14} />
              Contact Support
            </button>
          </div>
        </div>

      </div>

      {/* Transaction Timeline */}
      <div className="bg-white rounded-none p-8 border border-gray-100 shadow-sm mb-8 w-full">
        <h3 className="text-sm font-bold text-[#1B2A4A] mb-12">Transaction Timeline</h3>
        
        <div className="flex justify-between relative px-4">
          <div className="absolute top-5 left-12 right-12 h-px bg-gray-200 -z-10">
            <div className="absolute top-0 left-0 h-full bg-green-200" style={{ width: '75%' }}></div>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white z-0 w-32">
            <div className="w-10 h-10 rounded-none bg-green-50 border border-green-200 flex items-center justify-center text-green-500">
              <CheckCircle2 size={20} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#1B2A4A]">Booking Created</p>
              <p className="text-[10px] text-gray-500">May 18, 2025</p>
              <p className="text-[10px] text-gray-500">10:20 AM</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 bg-white z-0 w-32">
            <div className="w-10 h-10 rounded-none bg-green-50 border border-green-200 flex items-center justify-center text-green-500">
              <CreditCard size={20} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#1B2A4A]">Payment Initiated</p>
              <p className="text-[10px] text-gray-500">May 18, 2025</p>
              <p className="text-[10px] text-gray-500">10:24 AM</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 bg-white z-0 w-32">
            <div className="w-10 h-10 rounded-none bg-green-50 border border-green-200 flex items-center justify-center text-green-500">
              <CheckCircle2 size={20} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#1B2A4A]">Payment Successful</p>
              <p className="text-[10px] text-gray-500">May 18, 2025</p>
              <p className="text-[10px] text-gray-500">10:25 AM</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 bg-white z-0 w-32">
            <div className="w-10 h-10 rounded-none bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
              <Send size={20} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#1B2A4A]">Confirmation Sent</p>
              <p className="text-[10px] text-gray-500">May 18, 2025</p>
              <p className="text-[10px] text-gray-500">10:25 AM</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 bg-white z-0 w-32">
            <div className="w-10 h-10 rounded-none bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
              <Star size={20} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#1B2A4A]">Event Completed</p>
              <p className="text-[10px] text-gray-500">May 18, 2025</p>
              <p className="text-[10px] text-gray-500">09:30 PM</p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};
