import { useState, useRef, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Image as ImageIcon,
  DollarSign,
  FileText,
  Save,
  ChevronRight,
  ClipboardList,
  UploadCloud,
  Settings,
  Lightbulb,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  List,
  Link,
  Smile,
  Image as ImageIconSmall,
  Quote,
  Check,
  ChevronDown
} from 'lucide-react';

const CustomSelect = ({ name, value, onChange, options, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-[#1B2A4A]" : "text-gray-500"}>{value || placeholder}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-none py-1 max-h-60 overflow-y-auto">
          {options.map((option: string) => (
            <div
              key={option}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-[#C9A84C] flex justify-between items-center transition-colors ${
                value === option ? 'text-[#C9A84C] font-medium bg-gray-50' : 'text-gray-700'
              }`}
              onClick={() => {
                onChange({ target: { name, value: option } });
                setIsOpen(false);
              }}
            >
              {option}
              {value === option && <Check size={14} className="text-[#C9A84C]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';
import { MOCK_EVENTS } from './Events';

export const AddEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    venueName: '',
    venueAddress: '',
    date: '',
    startTime: '',
    ageCategory: '',
    capacity: '',
    maleQuota: '',
    femaleQuota: '',
    timer: '24 Hours',
    description: '',
    status: 'Waiting List',
    price: '',
    internalNotes: '',
    tableCount: '',
    roundDuration: '7',
    isDateTBD: false
  });

  useEffect(() => {
    if (isEditMode) {
      const event = MOCK_EVENTS.find(e => e.id === parseInt(id));
      if (event) {
        // Parse date
        const d = new Date(event.date);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        // Parse time
        const [timePart, modifier] = event.time.split(' ');
        let [hours, minutes] = timePart.split(':');
        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
        const formattedTime = `${hours.padStart(2, '0')}:${minutes}`;

        setFormData({
          title: event.title,
          city: event.city,
          venueName: event.venue,
          venueAddress: '123 Example Street', // Mock missing fields
          date: formattedDate,
          startTime: formattedTime,
          ageCategory: '28-38', // Mock
          capacity: event.capacityTotal.toString(),
          maleQuota: '100', // Mock
          femaleQuota: '100', // Mock
          timer: '24 Hours',
          description: 'This is a mocked description for ' + event.title,
          status: event.status,
          price: event.price.toString(),
          internalNotes: 'Mock internal note',
          tableCount: '20',
          roundDuration: '7',
          isDateTBD: false
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Automatic capacity splitting
      if (name === 'capacity' && value) {
        const total = parseInt(value) || 0;
        const half = Math.floor(total / 2);
        newData.maleQuota = half.toString();
        newData.femaleQuota = half.toString();
      }
      
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Event saved successfully!');
    navigate('/events');
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">
            {isEditMode ? 'Edit Event' : 'Add New Event'}
          </h1>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <RouterLink to="/events" className="hover:text-[#C9A84C] transition-colors">Events</RouterLink>
            <ChevronRight size={14} />
            <span className="text-gray-400">{isEditMode ? 'Edit Event' : 'Add New Event'}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate('/events')}
            className="px-5 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-none hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-[#C9A84C] text-white px-5 py-2 rounded-none font-medium shadow-sm hover:bg-[#b59641] transition-colors"
          >
            <Save size={18} />
            Save Event
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Form Area (Left) */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <form id="add-event-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Basic Information */}
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-[#1B2A4A] mb-5 flex items-center gap-2">
                <ClipboardList size={20} className="text-[#C9A84C]" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                {/* Row 1 */}
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Event Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">City <span className="text-red-500">*</span></label>
                  <CustomSelect 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    options={['Zurich', 'Geneva', 'Basel', 'Lausanne']}
                    placeholder="Select city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Venue Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="venueName"
                    required
                    value={formData.venueName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="Enter venue name"
                  />
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Venue Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="venueAddress"
                      required
                      value={formData.venueAddress}
                      onChange={handleChange}
                      className="w-full border border-gray-200 pl-3 pr-9 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                      placeholder="Enter address"
                    />
                    <MapPin size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-[#1B2A4A]">Date <span className="text-red-500">*</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox"
                        name="isDateTBD"
                        checked={formData.isDateTBD}
                        onChange={handleChange}
                        className="w-3.5 h-3.5 rounded-sm border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]"
                      />
                      <span className="text-[11px] font-medium text-gray-500">TBD (Pre-registration)</span>
                    </label>
                  </div>
                  <div>
                    <input 
                      type="date" 
                      name="date"
                      required={!formData.isDateTBD}
                      disabled={formData.isDateTBD}
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm ${formData.isDateTBD ? 'bg-gray-100 text-transparent' : 'text-gray-500'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Start Time <span className="text-red-500">*</span></label>
                  <div>
                    <input 
                      type="time" 
                      name="startTime"
                      required={!formData.isDateTBD}
                      disabled={formData.isDateTBD}
                      value={formData.startTime}
                      onChange={handleChange}
                      className={`w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm ${formData.isDateTBD ? 'bg-gray-100 text-transparent' : 'text-gray-500'}`}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Age Category <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="ageCategory"
                    required
                    value={formData.ageCategory}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="e.g. 28-38"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Enter age range (e.g. 28-38)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Total Capacity <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="capacity"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="Enter total capacity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Invitation Timer <span className="text-red-500">*</span></label>
                  <CustomSelect 
                    name="timer"
                    value={formData.timer}
                    onChange={handleChange}
                    options={['24 Hours', '48 Hours']}
                    placeholder="Select timer"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Default 24h or 48h - configurable</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 mt-5">
                {/* Row 4 */}
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Table Count <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="tableCount"
                    required
                    min="1"
                    value={formData.tableCount}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="Enter number of tables"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Used for live event rotation</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Round Duration (Min) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="roundDuration"
                    required
                    min="1"
                    value={formData.roundDuration}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="e.g. 7"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Default 7 minutes</p>
                </div>
              </div>
            </div>

            {/* Quotas */}
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-[#1B2A4A] mb-5 flex items-center gap-2">
                <Users size={20} className="text-[#C9A84C]" />
                Quotas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Required Male Quota <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="maleQuota"
                    required
                    min="0"
                    value={formData.maleQuota}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="Enter number"
                  />
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                    <strong className="text-gray-600">Auto-trigger threshold:</strong> If this number of men register, the event is automatically confirmed.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Required Female Quota <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="femaleQuota"
                    required
                    min="0"
                    value={formData.femaleQuota}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="Enter number"
                  />
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                    <strong className="text-gray-600">Auto-trigger threshold:</strong> If this number of women register, the event is automatically confirmed.
                  </p>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-[#1B2A4A] mb-5 flex items-center gap-2">
                <Link size={20} className="text-[#C9A84C]" />
                Event Details
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Rich Text Editor Mockup */}
                <div className="lg:col-span-1 xl:col-span-2">
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Event Description <span className="text-red-500">*</span></label>
                  <div className="border border-gray-200 rounded-none overflow-hidden flex flex-col">
                    {/* Toolbar */}
                    <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex flex-wrap items-center gap-2">
                      <select className="text-sm bg-transparent border-none focus:ring-0 text-gray-600 py-1 pr-6 cursor-pointer">
                        <option>Paragraph</option>
                        <option>Heading 1</option>
                        <option>Heading 2</option>
                      </select>
                      <div className="h-4 w-px bg-gray-300 mx-1"></div>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><Bold size={14} /></button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><Italic size={14} /></button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><Underline size={14} /></button>
                      <div className="h-4 w-px bg-gray-300 mx-1"></div>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><List size={14} /></button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><AlignLeft size={14} /></button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><Quote size={14} /></button>
                      <div className="h-4 w-px bg-gray-300 mx-1"></div>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><Link size={14} /></button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><Smile size={14} /></button>
                      <button type="button" className="p-1 hover:bg-gray-200 rounded-none text-gray-600"><ImageIconSmall size={14} /></button>
                    </div>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full p-4 border-none focus:ring-0 resize-none text-sm"
                      placeholder="Describe your event..."
                    />
                  </div>
                </div>

                {/* Image Upload & Preview */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 xl:grid-cols-2 lg:col-span-2 xl:col-span-1">
                  <div>
                    <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Cover Image <span className="text-red-500">*</span></label>
                    <div className="border border-dashed border-gray-300 rounded-none h-[154px] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer p-4 text-center">
                      <UploadCloud size={28} className="text-gray-400 mb-2" />
                      <p className="text-xs text-[#1B2A4A] font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-[10px] text-gray-500">JPG, PNG or WebP (Max 5MB)</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1.5 opacity-0 hidden xl:block">Preview</label>
                    <div className="border border-gray-100 rounded-none h-[154px] flex flex-col items-center justify-center bg-gray-50 p-4">
                      <ImageIcon size={32} className="text-gray-200 mb-2" />
                      <span className="text-xs text-gray-400">No image selected</span>
                      <span className="absolute top-2 left-3 text-[10px] text-gray-400 font-medium hidden">Image Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-[#1B2A4A] mb-5 flex items-center gap-2">
                <Settings size={20} className="text-[#C9A84C]" />
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Status <span className="text-red-500">*</span></label>
                  <CustomSelect 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={['Waiting List', 'Booking Open', 'Fully Booked', 'Completed', 'Cancelled']}
                    placeholder="Select status"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Price (CHF) <span className="text-red-500">*</span></label>
                  <div className="flex border border-gray-200 rounded-none overflow-hidden focus-within:ring-2 focus-within:ring-[#C9A84C]/20 focus-within:border-[#C9A84C]">
                    <input 
                      type="number" 
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-none focus:ring-0 text-sm"
                      placeholder="Enter amount"
                    />
                    <div className="bg-gray-50 border-l border-gray-200 px-3 py-2 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">CHF</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1.5">Internal Notes</label>
                  <input 
                    type="text" 
                    name="internalNotes"
                    value={formData.internalNotes}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C] text-sm"
                    placeholder="Only visible to admins"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Sidebar (Right) */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Event Summary */}
          <div className="bg-white rounded-none p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-[#1B2A4A] mb-6 flex items-center gap-2">
              <CalendarIcon size={18} className="text-[#C9A84C]" />
              Event Summary
            </h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <Settings size={16} className="text-gray-400" />
                  Status
                </div>
                <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-none text-xs font-semibold whitespace-nowrap">
                  {formData.status}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <CalendarIcon size={16} className="text-gray-400" />
                  Date
                </div>
                <span className="text-sm text-gray-500 text-right">
                  {formData.date ? formData.date : 'Not selected'}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <Clock size={16} className="text-gray-400" />
                  Start Time
                </div>
                <span className="text-sm text-gray-500 text-right">
                  {formData.startTime ? formData.startTime : 'Not selected'}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <Users size={16} className="text-gray-400" />
                  Total Capacity
                </div>
                <span className="text-sm text-gray-500 text-right">
                  {formData.capacity || '-'}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 shrink-0" />
                  Table Count
                </div>
                <span className="text-sm text-gray-500 text-right">
                  {formData.tableCount || '-'}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <DollarSign size={16} className="text-gray-400" />
                  Price
                </div>
                <span className="text-sm text-gray-500 text-right">
                  CHF {formData.price || '0'}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <MapPin size={16} className="text-gray-400" />
                  City
                </div>
                <span className="text-sm text-gray-500 text-right">
                  {formData.city || '-'}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 text-sm font-medium text-[#1B2A4A]">
                  <FileText size={16} className="text-gray-400" />
                  Venue
                </div>
                <span className="text-sm text-gray-500 text-right max-w-[120px] truncate" title={formData.venueName}>
                  {formData.venueName || '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Tip Box */}
          <div className="bg-[#fef9eb] rounded-none p-5 border border-[#f5e6c4]">
            <div className="flex items-start gap-3">
              <Lightbulb size={20} className="text-[#C9A84C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[#8b6b23] mb-1">Tip</h4>
                <p className="text-xs text-[#a08442] leading-relaxed">
                  You can save this event as draft. It will be visible in the All Events list.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
