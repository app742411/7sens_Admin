import { useState } from 'react';
import {
  ChevronRight,
  Search,
  Calendar,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Eye,
  Send,
  Mail,
  MailOpen,
  XCircle,
  Clock,
  Plus,
  SendHorizonal,
  FileText,
  FileBox,
  MessageCircle,
  User,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  Copy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../../components/common/MetricCard';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Sunset Rooftop Party Reminder',
    subtitle: 'Event Reminder',
    type: 'Event',
    channels: ['email', 'whatsapp'],
    recipientsCount: 342,
    sentOnDate: 'Jun 18, 2025\n10:00 AM',
    sentBy: 'Admin',
    status: 'Delivered',
    statusPercent: '98.2%'
  },
  {
    id: 2,
    title: 'Wine & Dine Experience Update',
    subtitle: 'Event Update',
    type: 'Event',
    channels: ['email'],
    recipientsCount: 287,
    sentOnDate: 'Jun 17, 2025\n05:30 PM',
    sentBy: 'Admin',
    status: 'Delivered',
    statusPercent: '97.6%'
  },
  {
    id: 3,
    title: 'Exclusive Yacht Night Invitation',
    subtitle: 'New Event',
    type: 'Event',
    channels: ['email', 'whatsapp'],
    recipientsCount: 215,
    sentOnDate: 'Jun 16, 2025\n02:15 PM',
    sentBy: 'Admin',
    status: 'Opened',
    statusPercent: '72.1%'
  },
  {
    id: 4,
    title: 'New Year\'s Eve Gala Announcement',
    subtitle: 'New Event',
    type: 'Event',
    channels: ['email', 'whatsapp', 'sms'],
    recipientsCount: 500,
    sentOnDate: 'Jun 15, 2025\n11:00 AM',
    sentBy: 'Admin',
    status: 'Delivered',
    statusPercent: '95.4%'
  },
  {
    id: 5,
    title: 'Weekly Digest',
    subtitle: 'Newsletter',
    type: 'Marketing',
    channels: ['email'],
    recipientsCount: 1240,
    sentOnDate: 'Jun 14, 2025\n09:00 AM',
    sentBy: 'System',
    status: 'Delivered',
    statusPercent: '99.1%'
  },
  {
    id: 6,
    title: 'Payment Receipt',
    subtitle: 'Transaction',
    type: 'Transactional',
    channels: ['email'],
    recipientsCount: 156,
    sentOnDate: 'Jun 13, 2025\n08:45 PM',
    sentBy: 'System',
    status: 'Delivered',
    statusPercent: '100%'
  },
  {
    id: 7,
    title: 'Account Verification',
    subtitle: 'Account',
    type: 'Transactional',
    channels: ['email'],
    recipientsCount: 23,
    sentOnDate: 'Jun 12, 2025\n04:20 PM',
    sentBy: 'System',
    status: 'Failed',
    statusPercent: '13.0%'
  },
  {
    id: 8,
    title: 'Welcome to 7Sens',
    subtitle: 'Account',
    type: 'Transactional',
    channels: ['email', 'whatsapp'],
    recipientsCount: 98,
    sentOnDate: 'Jun 11, 2025\n10:30 AM',
    sentBy: 'Admin',
    status: 'Opened',
    statusPercent: '68.4%'
  }
];

const MOCK_LOGS = [
  {
    id: 'LOG-001',
    timestamp: 'Jun 18, 2025\n10:00:15 AM',
    recipient: 'marie.dupont@email.com',
    channel: 'email',
    messageTitle: 'Sunset Rooftop Party Reminder',
    status: 'Delivered',
    error: null
  },
  {
    id: 'LOG-002',
    timestamp: 'Jun 18, 2025\n10:00:12 AM',
    recipient: '+41 79 123 45 67',
    channel: 'whatsapp',
    messageTitle: 'Sunset Rooftop Party Reminder',
    status: 'Failed',
    error: 'Invalid phone number format'
  },
  {
    id: 'LOG-003',
    timestamp: 'Jun 18, 2025\n10:00:10 AM',
    recipient: 'lucas.morel@email.com',
    channel: 'email',
    messageTitle: 'Sunset Rooftop Party Reminder',
    status: 'Bounced',
    error: 'Mailbox full'
  },
  {
    id: 'LOG-004',
    timestamp: 'Jun 17, 2025\n05:30:45 PM',
    recipient: 'sophie.bernard@email.com',
    channel: 'email',
    messageTitle: 'Wine & Dine Experience Update',
    status: 'Delivered',
    error: null
  }
];

const MOCK_TEMPLATES = [
  {
    id: 'TPL-001',
    name: 'Event Reminder (24h)',
    subject: 'Upcoming: {{event_name}} starts tomorrow!',
    type: 'Event',
    channels: ['email', 'whatsapp'],
    lastUpdated: 'May 10, 2025'
  },
  {
    id: 'TPL-002',
    name: 'Booking Confirmation',
    subject: 'Your tickets for {{event_name}} are confirmed',
    type: 'Transactional',
    channels: ['email'],
    lastUpdated: 'Apr 22, 2025'
  },
  {
    id: 'TPL-003',
    name: 'Monthly Newsletter',
    subject: 'What\'s happening this month at 7Sens',
    type: 'Marketing',
    channels: ['email'],
    lastUpdated: 'Jun 01, 2025'
  },
  {
    id: 'TPL-004',
    name: 'Waitlist Promotion',
    subject: 'Good news! Tickets available for {{event_name}}',
    type: 'Event',
    channels: ['email', 'sms'],
    lastUpdated: 'May 15, 2025'
  }
];

const TypeBadge = ({ type }: { type: string }) => {
  let bg = '';
  let text = '';

  switch (type) {
    case 'Event':
      bg = 'bg-purple-50';
      text = 'text-purple-600';
      break;
    case 'Marketing':
      bg = 'bg-orange-50';
      text = 'text-orange-500';
      break;
    case 'Transactional':
      bg = 'bg-blue-50';
      text = 'text-blue-500';
      break;
    default:
      bg = 'bg-gray-50';
      text = 'text-gray-600';
  }

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-none ${bg} ${text}`}>
      {type}
    </span>
  );
};

const StatusBadge = ({ status, percent }: { status: string, percent: string }) => {
  let bg = '';
  let text = '';

  switch (status) {
    case 'Delivered':
      bg = 'bg-green-50';
      text = 'text-green-600';
      break;
    case 'Opened':
      bg = 'bg-blue-50';
      text = 'text-blue-500';
      break;
    case 'Failed':
      bg = 'bg-red-50';
      text = 'text-red-500';
      break;
    default:
      bg = 'bg-orange-50';
      text = 'text-orange-500';
  }

  return (
    <div className="flex flex-col gap-1 items-start">
      <span className={`px-2.5 py-1 text-[11px] font-bold rounded-none ${bg} ${text}`}>
        {status}
      </span>
      <span className="text-xs text-gray-500 font-medium px-1">{percent}</span>
    </div>
  );
};

export const Notifications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Sent Notifications');

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">Notifications</h1>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight size={14} />
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">Notifications</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">{activeTab}</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white font-medium rounded-none hover:bg-[#b59641] transition-colors shadow-sm">
          <Plus size={18} /> Send New Notification
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
         
          title="Total Sent"
          value="3,568"
          icon={<SendHorizonal size={20} />}
          trend="up"
          trendValue="15.6%"
          trendText="from last month"
          iconBgClass="bg-orange-50"
          iconColorClass="text-orange-500"
        />
        <MetricCard
         
          title="Delivery Rate"
          value="3,182"
          icon={<Mail size={20} />}
          trend="up"
          trendValue="14.4%"
          trendText="from last month"
          iconBgClass="bg-green-50"
          iconColorClass="text-green-500"
        />
        <MetricCard
         
          title="Open Rate"
          value="1,926"
          icon={<MailOpen size={20} />}
          trend="up"
          trendValue="11.3%"
          trendText="from last month"
          iconBgClass="bg-purple-50"
          iconColorClass="text-purple-600"
        />
        <MetricCard
         
          title="Click Rate"
          value="386"
          icon={<XCircle size={20} />}
          trend="down"
          trendValue="5.2%"
          trendText="from last month"
          iconBgClass="bg-red-50"
          iconColorClass="text-red-500"
        />
        <MetricCard
         
          title="Bounce Rate"
          value="94"
          icon={<Clock size={20} />}
          trend="down"
          trendValue="2.1%"
          trendText="from last month"
          iconBgClass="bg-yellow-50"
          iconColorClass="text-yellow-600"
        />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">

        {/* Left Column - Main Content */}
        <div className="flex-1 w-full bg-white rounded-none shadow-sm border border-gray-100 flex flex-col">

          {/* Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-[350px]">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, message, type or recipient..."
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

              <div className="relative shrink-0">
                <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                  <option>All Types</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative shrink-0">
                <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] bg-white hover:bg-gray-50 focus:outline-none focus:border-[#C9A84C]">
                  <option>All Channels</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-none text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors whitespace-nowrap">
                <Filter size={16} className="text-[#1B2A4A]" />
                Filters
              </button>
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="flex border-b border-gray-100 px-2 overflow-x-auto hide-scrollbar">
            {['Sent Notifications', 'Notification Logs', 'Templates'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                    ? 'border-[#C9A84C] text-[#C9A84C]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab === 'Sent Notifications' && <SendHorizonal size={16} />}
                {tab === 'Notification Logs' && <FileText size={16} />}
                {tab === 'Templates' && <FileBox size={16} />}
                {tab}
              </button>
            ))}
          </div>

          {/* Table Content */}
          {activeTab === 'Sent Notifications' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/50">
                    <th className="px-5 py-4 w-10">
                      <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                    </th>
                    <th className="px-5 py-4">Title</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Channel</th>
                    <th className="px-5 py-4">Recipients</th>
                    <th className="px-5 py-4">Sent On</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <tr key={notif.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <input type="checkbox" className="rounded-none border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]" />
                      </td>
                      <td className="px-5 py-4">
                        <h4 className="text-sm font-bold text-[#1B2A4A]">{notif.title}</h4>
                        <p className="text-xs text-gray-500">{notif.subtitle}</p>
                      </td>
                      <td className="px-5 py-4">
                        <TypeBadge type={notif.type} />
                      </td>
                      <td className="px-5 py-4 flex gap-1.5 items-center mt-2">
                        {notif.channels.includes('email') && <Mail size={16} className="text-gray-500" />}
                        {notif.channels.includes('whatsapp') && <MessageCircle size={16} className="text-green-500" />}
                        {notif.channels.includes('sms') && <MessageCircle size={16} className="text-blue-500" />} {/* Reusing icon for SMS placeholder */}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-[#1B2A4A] block">{notif.recipientsCount}</span>
                        <span className="text-xs text-gray-500">Users</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600 whitespace-pre-line block">{notif.sentOnDate}</span>
                        <span className="text-xs text-gray-400">by {notif.sentBy}</span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={notif.status} percent={notif.statusPercent} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white">
                            <Send size={16} />
                          </button>
                          <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white">
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
          )}

          {activeTab === 'Notification Logs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/50">
                    <th className="px-5 py-4">Log ID</th>
                    <th className="px-5 py-4">Timestamp</th>
                    <th className="px-5 py-4">Recipient</th>
                    <th className="px-5 py-4">Channel</th>
                    <th className="px-5 py-4">Message</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 text-xs font-semibold text-gray-500">{log.id}</td>
                      <td className="px-5 py-4 text-xs text-gray-600 whitespace-pre-line">{log.timestamp}</td>
                      <td className="px-5 py-4 text-sm font-medium text-[#1B2A4A]">{log.recipient}</td>
                      <td className="px-5 py-4 flex items-center mt-2">
                        {log.channel === 'email' && <Mail size={16} className="text-gray-500" />}
                        {log.channel === 'whatsapp' && <MessageCircle size={16} className="text-green-500" />}
                        {log.channel === 'sms' && <MessageCircle size={16} className="text-blue-500" />}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-[#1B2A4A] max-w-[200px] truncate">{log.messageTitle}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-none ${log.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                            log.status === 'Failed' ? 'bg-red-50 text-red-500' :
                              'bg-orange-50 text-orange-500'
                          }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-red-500 font-medium">
                        {log.error ? (
                          <div className="flex items-center gap-1">
                            <AlertCircle size={12} /> {log.error}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Templates' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/50">
                    <th className="px-5 py-4">Template Name</th>
                    <th className="px-5 py-4">Subject / Content Preview</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Channels</th>
                    <th className="px-5 py-4">Last Updated</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_TEMPLATES.map((tpl) => (
                    <tr key={tpl.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <h4 className="text-sm font-bold text-[#1B2A4A]">{tpl.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{tpl.id}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-600 truncate max-w-[250px]" title={tpl.subject}>{tpl.subject}</p>
                      </td>
                      <td className="px-5 py-4">
                        <TypeBadge type={tpl.type} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          {tpl.channels.includes('email') && <Mail size={16} className="text-gray-500" />}
                          {tpl.channels.includes('whatsapp') && <MessageCircle size={16} className="text-green-500" />}
                          {tpl.channels.includes('sms') && <MessageCircle size={16} className="text-blue-500" />}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{tpl.lastUpdated}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors rounded-none bg-white">
                            <Copy size={16} />
                          </button>
                          <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors rounded-none bg-white">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="p-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 font-medium">
              Showing 1 to 10 of 3,568 notifications
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
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">357</button>
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

          {/* Notification Details Sidebar */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-4 flex items-center gap-2">
              <SendHorizonal size={18} className="text-[#C9A84C]" />
              Notification Details
            </h3>

            <h4 className="text-md font-bold text-[#1B2A4A] mb-2 leading-snug">Sunset Rooftop Party Reminder</h4>
            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-bold rounded-none mb-3 inline-block">Event Reminder</span>

            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              This is a reminder for the upcoming event Sunset Rooftop Party on June 28, 2025.
            </p>

            <div className="flex flex-col gap-3 text-xs mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-gray-500 flex items-center gap-2"><Calendar size={14} /> Sent On</span>
                <span className="text-[#1B2A4A] font-medium">Jun 18, 2025 10:00 AM</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-gray-500 flex items-center gap-2"><div className="flex -space-x-1"><User size={12} /><User size={12} /></div> Recipients</span>
                <span className="text-[#1B2A4A] font-medium">342 Users</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-gray-500 flex items-center gap-2"><Mail size={14} /> Channels</span>
                <span className="text-[#1B2A4A] font-medium">Email, WhatsApp</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-gray-500 flex items-center gap-2"><CheckCircle2 size={14} /> Status</span>
                <span className="text-[#1B2A4A] font-medium">Delivered (98.2%)</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-gray-500 flex items-center gap-2"><User size={14} /> Sent By</span>
                <span className="text-[#1B2A4A] font-medium">Admin User</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-[#C9A84C] text-[#C9A84C] font-semibold text-sm rounded-none hover:bg-orange-50/20 transition-colors">
                <Send size={16} /> Re-send Notification
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 text-gray-600 font-semibold text-sm rounded-none hover:bg-gray-50 transition-colors">
                <Eye size={16} /> View Full Details
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1B2A4A] mb-5 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              Quick Actions
            </h3>

            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between p-3 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all text-left">
                <div className="flex gap-3 items-start">
                  <div className="text-gray-400 mt-0.5"><FileText size={18} /></div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B2A4A]">Send New Notification</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Create and send a new notification</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>

              <button className="flex items-center justify-between p-3 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all text-left">
                <div className="flex gap-3 items-start">
                  <div className="text-gray-400 mt-0.5"><FileText size={18} /></div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B2A4A]">View Notification Logs</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Check delivery and error logs</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>

              <button className="flex items-center justify-between p-3 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all text-left">
                <div className="flex gap-3 items-start">
                  <div className="text-gray-400 mt-0.5"><FileBox size={18} /></div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B2A4A]">Manage Templates</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Create and manage templates</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
