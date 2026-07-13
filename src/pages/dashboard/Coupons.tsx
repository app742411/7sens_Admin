import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Copy, 
  Check, 
  Percent, 
  Tag, 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle, 
  X, 
  Info,
  Ticket,
  DollarSign,
  Upload
} from 'lucide-react';

interface Coupon {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  appliesTo: string; // "All Events" or specific event title
  minOrderValue?: number; // minimum amount required to apply
  usageLimit?: number; // optional max usage
  usageCount: number; // how many times used
  startDate: string; // YYYY-MM-DDThh:mm
  endDate: string; // YYYY-MM-DDThh:mm
  isActive: boolean; // admin override toggle
  image?: string; // base64 representation or URL
  description?: string; // promo text
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    appliesTo: 'All Events',
    minOrderValue: 50,
    usageLimit: 500,
    usageCount: 125,
    startDate: '2025-06-01T00:00',
    endDate: '2025-12-31T23:59',
    isActive: true,
    description: 'Welcome promotion for newly registered members.',
    image: 'https://picsum.photos/seed/welcome/100/60'
  },
  {
    id: 2,
    code: 'EARLYBIRD25',
    type: 'fixed',
    value: 25,
    appliesTo: 'Sunset Rooftop Party',
    usageLimit: 50,
    usageCount: 48,
    startDate: '2025-05-15T00:00',
    endDate: '2025-06-25T23:59',
    isActive: true,
    description: 'Special early reservation pricing discount.',
    image: 'https://picsum.photos/seed/early/100/60'
  },
  {
    id: 3,
    code: 'VIP7SENS',
    type: 'percentage',
    value: 20,
    appliesTo: 'Exclusive Yacht Night',
    usageLimit: 20,
    usageCount: 15,
    startDate: '2025-07-01T00:00',
    endDate: '2025-07-25T23:59',
    isActive: true,
    description: 'VIP discount code for Yacht experience booking.',
    image: 'https://picsum.photos/seed/vip/100/60'
  },
  {
    id: 4,
    code: 'WINE15',
    type: 'fixed',
    value: 15,
    appliesTo: 'Wine & Dine Experience',
    minOrderValue: 100,
    usageLimit: 100,
    usageCount: 12,
    startDate: '2025-07-01T00:00',
    endDate: '2025-07-15T23:59',
    isActive: true,
    description: 'Special promo code for gourmet wine event.',
    image: 'https://picsum.photos/seed/wine/100/60'
  },
  {
    id: 5,
    code: 'AUTUMN10',
    type: 'percentage',
    value: 10,
    appliesTo: 'All Events',
    usageLimit: 200,
    usageCount: 0,
    startDate: '2025-09-01T00:00',
    endDate: '2025-11-30T23:59',
    isActive: false,
    description: 'Autumn seasonal promotional code.',
    image: 'https://picsum.photos/seed/autumn/100/60'
  }
];

const AVAILABLE_EVENTS = [
  'All Events',
  'Sunset Rooftop Party',
  'Wine & Dine Experience',
  'Exclusive Yacht Night',
  'Private Art Gallery',
  'Live Jazz Concert',
  'Wellness Retreat Day',
  'New Year\'s Eve Gala'
];

export const Coupons = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  // Form states
  const [formCode, setFormCode] = useState('');
  const [formType, setFormType] = useState<'percentage' | 'fixed'>('percentage');
  const [formValue, setFormValue] = useState(10);
  const [formAppliesTo, setFormAppliesTo] = useState('All Events');
  const [formMinOrderValue, setFormMinOrderValue] = useState<string>('');
  const [formHasLimit, setFormHasLimit] = useState(true);
  const [formUsageLimit, setFormUsageLimit] = useState(100);
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formError, setFormError] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('7sens_coupons');
    if (saved) {
      try {
        setCoupons(JSON.parse(saved));
      } catch {
        setCoupons(DEFAULT_COUPONS);
      }
    } else {
      setCoupons(DEFAULT_COUPONS);
      localStorage.setItem('7sens_coupons', JSON.stringify(DEFAULT_COUPONS));
    }
  }, []);

  // Save to localStorage whenever coupons state changes
  const saveCoupons = (updatedCoupons: Coupon[]) => {
    setCoupons(updatedCoupons);
    localStorage.setItem('7sens_coupons', JSON.stringify(updatedCoupons));
  };

  // Helper: compute coupon status dynamically
  const getCouponStatus = (coupon: Coupon): 'Active' | 'Scheduled' | 'Expired' | 'Inactive' => {
    if (!coupon.isActive) return 'Inactive';
    
    const now = new Date();
    const start = new Date(coupon.startDate);
    const end = new Date(coupon.endDate);
    
    if (now < start) return 'Scheduled';
    if (now > end) return 'Expired';
    
    if (coupon.usageLimit !== undefined && coupon.usageCount >= coupon.usageLimit) {
      return 'Expired'; // Fully redeemed
    }
    
    return 'Active';
  };

  // Copy code to clipboard helper
  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopySuccess(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  // Image upload base64 handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for adding
  const handleAddClick = () => {
    setEditingCoupon(null);
    setFormCode('');
    setFormType('percentage');
    setFormValue(10);
    setFormAppliesTo('All Events');
    setFormMinOrderValue('');
    setFormHasLimit(true);
    setFormUsageLimit(100);
    setFormDescription('');
    setFormImage('');
    
    // Set default dates (start now, end next month)
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(now.getMonth() + 1);
    
    setFormStartDate(now.toISOString().slice(0, 16));
    setFormEndDate(nextMonth.toISOString().slice(0, 16));
    setFormIsActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditClick = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormCode(coupon.code);
    setFormType(coupon.type);
    setFormValue(coupon.value);
    setFormAppliesTo(coupon.appliesTo);
    setFormMinOrderValue(coupon.minOrderValue ? coupon.minOrderValue.toString() : '');
    setFormHasLimit(coupon.usageLimit !== undefined);
    setFormUsageLimit(coupon.usageLimit || 100);
    setFormStartDate(coupon.startDate);
    setFormEndDate(coupon.endDate);
    setFormIsActive(coupon.isActive);
    setFormDescription(coupon.description || '');
    setFormImage(coupon.image || '');
    setFormError('');
    setIsModalOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (id: number) => {
    setCouponToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Perform deletion
  const confirmDelete = () => {
    if (couponToDelete !== null) {
      const updated = coupons.filter(c => c.id !== couponToDelete);
      saveCoupons(updated);
    }
    setIsDeleteModalOpen(false);
    setCouponToDelete(null);
  };

  // Toggle status directly from list
  const handleToggleStatus = (id: number) => {
    const updated = coupons.map(c => {
      if (c.id === id) {
        return { ...c, isActive: !c.isActive };
      }
      return c;
    });
    saveCoupons(updated);
  };

  // Save Add/Edit form
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validations
    const cleanCode = formCode.trim().toUpperCase();
    if (!cleanCode) {
      setFormError('Coupon code is required.');
      return;
    }
    if (!/^[A-Z0-9_-]+$/.test(cleanCode)) {
      setFormError('Code must contain only letters, numbers, hyphens, and underscores.');
      return;
    }

    // Check duplicate code (excluding current editing coupon)
    const duplicate = coupons.find(c => c.code === cleanCode && (!editingCoupon || c.id !== editingCoupon.id));
    if (duplicate) {
      setFormError('A coupon with this code already exists.');
      return;
    }

    if (formValue <= 0) {
      setFormError('Discount value must be greater than 0.');
      return;
    }

    if (formType === 'percentage' && formValue > 100) {
      setFormError('Percentage discount cannot exceed 100%.');
      return;
    }

    if (!formStartDate || !formEndDate) {
      setFormError('Start and end dates are required.');
      return;
    }

    if (new Date(formEndDate) <= new Date(formStartDate)) {
      setFormError('End date must be after the start date.');
      return;
    }

    const minOrderVal = formMinOrderValue ? parseFloat(formMinOrderValue) : undefined;
    if (minOrderVal !== undefined && (isNaN(minOrderVal) || minOrderVal < 0)) {
      setFormError('Minimum order value must be a valid positive number.');
      return;
    }

    const usageLim = formHasLimit ? formUsageLimit : undefined;

    if (editingCoupon) {
      // Modify
      const updated = coupons.map(c => {
        if (c.id === editingCoupon.id) {
          return {
            ...c,
            code: cleanCode,
            type: formType,
            value: formValue,
            appliesTo: formAppliesTo,
            minOrderValue: minOrderVal,
            usageLimit: usageLim,
            startDate: formStartDate,
            endDate: formEndDate,
            isActive: formIsActive,
            description: formDescription,
            image: formImage
          };
        }
        return c;
      });
      saveCoupons(updated);
    } else {
      // Create new
      const newCoupon: Coupon = {
        id: Date.now(),
        code: cleanCode,
        type: formType,
        value: formValue,
        appliesTo: formAppliesTo,
        minOrderValue: minOrderVal,
        usageLimit: usageLim,
        usageCount: 0,
        startDate: formStartDate,
        endDate: formEndDate,
        isActive: formIsActive,
        description: formDescription,
        image: formImage
      };
      saveCoupons([newCoupon, ...coupons]);
    }

    setIsModalOpen(false);
  };

  // Calculations for Stats Card
  const totalUses = coupons.reduce((sum, c) => sum + c.usageCount, 0);
  
  // Estimate Total Savings: if fixed, value * uses. If percentage, assume a mock average ticket price of CHF 120 per use.
  const estimatedSavings = coupons.reduce((sum, c) => {
    if (c.type === 'fixed') {
      return sum + (c.value * c.usageCount);
    } else {
      return sum + ((120 * c.value / 100) * c.usageCount);
    }
  }, 0);

  const activeCount = coupons.filter(c => getCouponStatus(c) === 'Active').length;

  // Filter & Search Logic
  const filteredCoupons = coupons.filter(c => {
    const status = getCouponStatus(c);
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.appliesTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    const matchesType = typeFilter === 'All' || c.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-600';
      case 'Scheduled':
        return 'bg-blue-50 text-blue-600';
      case 'Expired':
        return 'bg-red-50 text-red-600';
      case 'Inactive':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B2A4A] mb-2 font-heading">Promo Codes</h1>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <span className="hover:text-[#C9A84C] transition-colors cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-gray-400">Promo Codes & Coupons</span>
          </div>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-[#C9A84C] text-white px-5 py-2.5 rounded-none font-medium shadow-sm hover:bg-[#b59641] transition-colors cursor-pointer border-none"
        >
          <Plus size={18} />
          Create Promo Code
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-6 shadow-sm border border-gray-100 hover:border-[#C9A84C]/50 hover:shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-transparent to-[#C9A84C]/5 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Promo Codes</span>
              <span className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">{coupons.length}</span>
            </div>
            <div className="w-10 h-10 rounded-none bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center group-hover:from-[#C9A84C] group-hover:to-[#b59641] group-hover:bg-gradient-to-br group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
              <Tag size={18} />
            </div>
          </div>
          <div className="text-[11px] font-bold text-gray-400 mt-2 border-t border-gray-50 pt-3 z-10">
            Active and inactive codes
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-6 shadow-sm border border-gray-100 hover:border-green-300 hover:shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-transparent to-green-500/5 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Coupons</span>
              <span className="text-2xl font-extrabold text-green-600 tracking-tight">{activeCount}</span>
            </div>
            <div className="w-10 h-10 rounded-none bg-green-55 text-green-600 flex items-center justify-center group-hover:from-green-600 group-hover:to-green-500 group-hover:bg-gradient-to-br group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
              <Percent size={18} />
            </div>
          </div>
          <div className="text-[11px] font-bold text-green-600 mt-2 border-t border-gray-50 pt-3 z-10">
            Currently available for use
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-6 shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-transparent to-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Uses</span>
              <span className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">{totalUses}</span>
            </div>
            <div className="w-10 h-10 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-500 group-hover:bg-gradient-to-br group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
              <Ticket size={18} />
            </div>
          </div>
          <div className="text-[11px] font-bold text-blue-600 mt-2 border-t border-gray-50 pt-3 z-10">
            Redeemed at checkout
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-6 shadow-sm border border-gray-100 hover:border-[#C9A84C]/50 hover:shadow-md transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-transparent to-[#C9A84C]/5 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Est. Savings Given</span>
              <span className="text-2xl font-extrabold text-[#C9A84C] tracking-tight">CHF {estimatedSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="w-10 h-10 rounded-none bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center group-hover:from-[#C9A84C] group-hover:to-[#b59641] group-hover:bg-gradient-to-br group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="text-[11px] font-bold text-[#C9A84C] mt-2 border-t border-gray-50 pt-3 z-10">
            Accumulated discount value
          </div>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-none shadow-sm border border-gray-100 flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-center bg-white">
          <div className="relative w-full lg:w-[400px]">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by code or applied event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 focus:border-[#C9A84C]"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto">
            {/* Type Filter */}
            <div className="flex items-center bg-white border border-gray-200 px-3 py-2 rounded-none">
              <span className="text-xs text-gray-400 font-bold uppercase mr-2">Type</span>
              <select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-sm font-medium text-[#1B2A4A] bg-transparent border-none outline-none cursor-pointer pr-4"
              >
                <option value="All">All Types</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center bg-white border border-gray-200 px-3 py-2 rounded-none">
              <span className="text-xs text-gray-400 font-bold uppercase mr-2">Status</span>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm font-medium text-[#1B2A4A] bg-transparent border-none outline-none cursor-pointer pr-4"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Expired">Expired</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || statusFilter !== 'All' || typeFilter !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setTypeFilter('All');
                }}
                className="text-sm font-medium text-[#C9A84C] hover:underline cursor-pointer whitespace-nowrap border-none bg-transparent"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wider bg-gray-50/50">
                <th className="px-6 py-4">Promo Code</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Applies To</th>
                <th className="px-6 py-4">Min. Spend</th>
                <th className="px-6 py-4">Usage Limit</th>
                <th className="px-6 py-4">Valid Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((coupon) => {
                  const status = getCouponStatus(coupon);
                  return (
                    <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors group">
                      {/* Code */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {coupon.image ? (
                            <img src={coupon.image} alt={coupon.code} className="w-20 h-12 object-cover rounded-none border border-gray-200 shrink-0" />
                          ) : (
                            <div className="w-20 h-12 bg-gray-50 border border-gray-200 border-dashed flex items-center justify-center text-gray-400 shrink-0">
                              <Tag size={16} />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-[#1B2A4A] tracking-wider bg-gray-100 px-2.5 py-1 text-sm border border-gray-200">
                                {coupon.code}
                              </span>
                              <button 
                                onClick={() => handleCopyCode(coupon.id, coupon.code)}
                                className="p-1 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer border-none bg-transparent"
                                title="Copy Promo Code"
                              >
                                {copySuccess[coupon.id] ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                              </button>
                            </div>
                            {coupon.description ? (
                              <p className="text-xs text-gray-500 max-w-[220px] line-clamp-1" title={coupon.description}>
                                {coupon.description}
                              </p>
                            ) : (
                              <span className="text-[10px] text-gray-400 italic">No description</span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      {/* Discount amount */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-gray-900 text-sm">
                            {coupon.type === 'percentage' ? `${coupon.value}%` : `CHF ${coupon.value.toFixed(2)}`}
                          </span>
                          <span className="text-[11px] text-gray-400 uppercase font-bold">OFF</span>
                        </div>
                      </td>

                      {/* Applies To */}
                      <td className="px-6 py-4.5 max-w-[200px] truncate">
                        <span className="text-sm font-medium text-gray-700">
                          {coupon.appliesTo}
                        </span>
                      </td>

                      {/* Min. Spend */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-600">
                          {coupon.minOrderValue ? `CHF ${coupon.minOrderValue.toFixed(2)}` : '—'}
                        </span>
                      </td>

                      {/* Limit / Usage Ratio */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-xs text-gray-500 font-medium">
                            <span>{coupon.usageCount} / {coupon.usageLimit !== undefined ? coupon.usageLimit : '∞'} uses</span>
                          </div>
                          {coupon.usageLimit !== undefined && (
                            <div className="w-24 h-1.5 bg-gray-100 overflow-hidden">
                              <div 
                                className="h-full bg-[#C9A84C] transition-all duration-300"
                                style={{ width: `${Math.min(100, (coupon.usageCount / coupon.usageLimit) * 100)}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Valid Duration */}
                      <td className="px-6 py-4.5 text-xs text-gray-500 font-medium whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Start: {formatDate(coupon.startDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> End: {formatDate(coupon.endDate)}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-none inline-block ${getStatusBadgeColor(status)}`}>
                          {status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          {/* Toggle active state */}
                          <button
                            onClick={() => handleToggleStatus(coupon.id)}
                            className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors duration-300 border-none ${coupon.isActive ? 'bg-[#C9A84C]' : 'bg-gray-200'}`}
                            title={coupon.isActive ? "Deactivate Promo Code" : "Activate Promo Code"}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${coupon.isActive ? 'left-[18px]' : 'left-0.5'}`}></span>
                          </button>

                          {/* Edit */}
                          <button 
                            onClick={() => handleEditClick(coupon)}
                            className="p-2 text-gray-400 hover:text-[#C9A84C] hover:bg-gray-50 transition-colors cursor-pointer border-none bg-transparent"
                            title="Edit Promo Code"
                          >
                            <Edit2 size={16} />
                          </button>
                          
                          {/* Delete */}
                          <button 
                            onClick={() => handleDeleteClick(coupon.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
                            title="Delete Promo Code"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 font-medium bg-white">
                    <Tag size={40} className="text-gray-300 mx-auto mb-3" />
                    No promo codes found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Promo Code Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs px-4">
          <div className="w-full max-w-2xl bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#1B2A4A] p-6 text-white">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Tag size={20} className="text-[#C9A84C]" />
                {editingCoupon ? `Edit Promo Code: ${editingCoupon.code}` : 'Create New Promo Code'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer p-1 border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSaveCoupon} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {formError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 flex gap-3 text-red-700 text-sm">
                  <AlertTriangle size={18} className="shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Code */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Promo Code Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. SUMMER50" 
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                    disabled={!!editingCoupon}
                    className="w-full px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] font-semibold tracking-wider disabled:bg-gray-50 disabled:text-gray-400"
                  />
                  <p className="text-[11px] text-gray-500">Alphanumeric, capitalized. Cannot be changed after creation.</p>
                </div>

                {/* Applies To */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Applies To <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full border border-gray-200 bg-white flex items-center">
                    <select 
                      value={formAppliesTo}
                      onChange={(e) => setFormAppliesTo(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-2 bg-transparent text-sm font-medium text-[#1B2A4A] focus:outline-none rounded-none cursor-pointer border-none"
                    >
                      {AVAILABLE_EVENTS.map(evt => (
                        <option key={evt} value={evt}>{evt}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-gray-500">Specific event or all current/future events.</p>
                </div>

                {/* Discount Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A]">
                    Discount Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                      <input 
                        type="radio" 
                        name="discountType" 
                        checked={formType === 'percentage'}
                        onChange={() => setFormType('percentage')}
                        className="accent-[#C9A84C] w-4 h-4 cursor-pointer"
                      />
                      Percentage (%)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                      <input 
                        type="radio" 
                        name="discountType" 
                        checked={formType === 'fixed'}
                        onChange={() => setFormType('fixed')}
                        className="accent-[#C9A84C] w-4 h-4 cursor-pointer"
                      />
                      Fixed Amount (CHF)
                    </label>
                  </div>
                </div>

                {/* Discount Value */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Discount Value <span className="text-red-500">*</span>
                  </label>
                  <div className="flex relative items-center">
                    {formType === 'fixed' && (
                      <span className="absolute left-3 text-sm text-gray-500 font-medium">CHF</span>
                    )}
                    <input 
                      type="number" 
                      min="1"
                      step={formType === 'percentage' ? '1' : '0.01'}
                      value={formValue}
                      onChange={(e) => setFormValue(parseFloat(e.target.value) || 0)}
                      className={`w-full py-2 pr-8 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] font-semibold ${
                        formType === 'fixed' ? 'pl-11' : 'pl-3'
                      }`}
                    />
                    {formType === 'percentage' && (
                      <span className="absolute right-3 text-sm text-gray-500 font-medium">%</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500">
                    {formType === 'percentage' ? 'Percent deduction (e.g. 10 for 10% off)' : 'Direct monetary reduction in CHF'}
                  </p>
                </div>

                {/* Min Spend */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Min Spend Requirement <Info size={14} className="text-gray-400"  />
                  </label>
                  <div className="flex relative items-center">
                    <span className="absolute left-3 text-sm text-gray-500 font-medium">CHF</span>
                    <input 
                      type="number" 
                      min="0"
                      step="0.01"
                      placeholder="No minimum spend"
                      value={formMinOrderValue}
                      onChange={(e) => setFormMinOrderValue(e.target.value)}
                      className="w-full pl-11 pr-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500">Minimum booking total required to redeem code.</p>
                </div>

                {/* Usage Limits */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A]">Usage Limit</label>
                  <div className="flex items-center gap-4 py-1">
                    <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formHasLimit}
                        onChange={(e) => setFormHasLimit(e.target.checked)}
                        className="accent-[#C9A84C] w-4 h-4 cursor-pointer"
                      />
                      Limit total uses
                    </label>
                    
                    {formHasLimit && (
                      <input 
                        type="number" 
                        min="1"
                        value={formUsageLimit}
                        onChange={(e) => setFormUsageLimit(parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-1 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] font-semibold text-center"
                      />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500">Limits how many times this promo code can be redeemed globally.</p>
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Start Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="datetime-local" 
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] font-medium"
                  />
                  <p className="text-[11px] text-gray-500">Promo code will not work before this time.</p>
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    Expiry Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="datetime-local" 
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] font-medium"
                  />
                  <p className="text-[11px] text-gray-500">Promo code will automatically expire after this time.</p>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-[#1B2A4A]">Description</label>
                  <textarea 
                    placeholder="Describe this promotion (e.g. 10% discount for first time users)..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] font-medium resize-none"
                  />
                  <p className="text-[11px] text-gray-500">Brief explanation of the coupon rules or marketing details.</p>
                </div>

                {/* Promo Image Upload */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-[#1B2A4A]">Promo Banner / Thumbnail Image</label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {formImage ? (
                      <div className="relative group shrink-0">
                        <img src={formImage} alt="Preview" className="w-32 h-20 object-cover rounded-none border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => setFormImage('')}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors border-none shadow-sm cursor-pointer"
                          title="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <label className="w-32 h-20 bg-gray-50 border border-gray-200 border-dashed flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100/50 transition-colors">
                        <Upload size={18} className="mb-1" />
                        <span className="text-[10px] font-semibold uppercase">Upload</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-[#1B2A4A]">Recommended size: 100x60 pixels</span>
                      <span className="text-[11px] text-gray-500">Supports JPG, PNG, WEBP, or SVG files. Loaded as base64 data.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle Status */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 border-none ${formIsActive ? 'bg-[#C9A84C]' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${formIsActive ? 'left-[22px]' : 'left-0.5'}`}></span>
                </button>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1B2A4A]">Enabled / Active Status</span>
                  <span className="text-xs text-gray-500">When disabled, this code cannot be applied regardless of date windows.</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="border-t border-gray-100 pt-6 flex justify-end gap-3 bg-white sticky bottom-0 mt-auto">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold cursor-pointer rounded-none"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[#C9A84C] hover:bg-[#b59641] text-white font-semibold cursor-pointer rounded-none transition-colors shadow-sm border-none"
                >
                  {editingCoupon ? 'Save Changes' : 'Create Promo Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs px-4">
          <div className="w-full max-w-[420px] bg-white p-8 shadow-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5 text-red-600">
              <AlertTriangle size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#1a2b49] mb-3">Delete Promo Code?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to permanently delete this promo code? Users will no longer be able to use it, and all history for this code in active bookings will be unlinked. This cannot be undone.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={confirmDelete}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors rounded-none cursor-pointer border-none"
              >
                Yes, Delete Coupon
              </button>
              <button 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCouponToDelete(null);
                }}
                className="w-full py-2 bg-transparent hover:bg-gray-50 text-gray-500 font-semibold transition-colors rounded-none border-none cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
