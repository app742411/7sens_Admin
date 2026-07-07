import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  Loader2, 
  Upload, 
  Image as ImageIcon,
  ChevronDown,
  LogOut,
  X,
  Search
} from 'lucide-react';

export const DesignSystem = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showSystemDialog, setShowSystemDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">System State Library</h1>
        <p className="text-gray-500 mt-2">Design system, states, and UI components reference</p>
      </div>

      {/* Colors Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Colors & Branding</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-24 w-full bg-[var(--color-navy)] rounded shadow-sm flex items-end p-2">
              <span className="text-white text-xs font-mono">var(--color-navy)</span>
            </div>
            <p className="font-medium text-sm">Primary Navy</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 w-full bg-[var(--color-deep-blue)] rounded shadow-sm flex items-end p-2">
              <span className="text-white text-xs font-mono">var(--color-deep-blue)</span>
            </div>
            <p className="font-medium text-sm">Deep Blue</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 w-full bg-[var(--color-gold)] rounded shadow-sm flex items-end p-2">
              <span className="text-[var(--color-navy)] text-xs font-mono">var(--color-gold)</span>
            </div>
            <p className="font-medium text-sm">Primary Gold</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 w-full bg-[#FAFAF8] border border-gray-200 rounded shadow-sm flex items-end p-2">
              <span className="text-gray-500 text-xs font-mono">#FAFAF8</span>
            </div>
            <p className="font-medium text-sm">Background</p>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Typography</h2>
        <div className="space-y-6 bg-white p-6 rounded shadow-sm border border-gray-100">
          <div>
            <h1 className="text-4xl font-bold font-serif mb-2">Heading 1 (Serif)</h1>
            <p className="text-sm text-gray-400 font-mono">text-4xl font-bold font-serif</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold font-serif mb-2">Heading 2 (Serif)</h2>
            <p className="text-sm text-gray-400 font-mono">text-3xl font-bold font-serif</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-sans mb-2">Heading 3 (Sans)</h3>
            <p className="text-sm text-gray-400 font-mono">text-2xl font-bold font-sans</p>
          </div>
          <div>
            <p className="text-base text-gray-700 leading-relaxed mb-2">
              Body Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-gray-400 font-mono">text-base text-gray-700 leading-relaxed</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Small Text / Helper Text</p>
            <p className="text-sm text-gray-400 font-mono">text-sm text-gray-500</p>
          </div>
        </div>
      </section>

      {/* UI Components Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">UI Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs & Select */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Inputs & Dropdowns</h3>
            <div className="space-y-4">
              <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Standard Input</label><Input placeholder="Enter text here..." /></div>
              <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Input with Error</label><Input placeholder="Enter text..." /></div>
              <div className="space-y-1.5"><label className="block text-sm font-medium text-gray-700">Disabled Input</label><Input placeholder="Disabled..." disabled={true} /></div>
              
              {/* Custom Select Dropdown Mock */}
              <div className="space-y-1.5 relative">
                <label className="block text-sm font-medium text-gray-700">Select Dropdown</label>
                <div 
                  className="w-full relative cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className={`w-full px-4 py-3 bg-white border ${dropdownOpen ? 'border-[var(--color-navy)] ring-1 ring-[var(--color-navy)]' : 'border-gray-200'} text-gray-900 rounded-none focus:outline-none flex justify-between items-center transition-colors`}>
                    <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
                      {selectedOption || 'Select an option...'}
                    </span>
                    <ChevronDown size={18} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-60 overflow-auto">
                      {['Option 1', 'Option 2', 'Option 3'].map(opt => (
                        <div 
                          key={opt}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOption(opt);
                            setDropdownOpen(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons & Pickers */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Buttons & Pickers</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button isLoading>Loading</Button>
            </div>

            <div className="space-y-1.5 mt-8">
              <label className="block text-sm font-medium text-gray-700">Image Picker / Uploader</label>
              <div className="w-full border-2 border-dashed border-gray-300 bg-gray-50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                  <Upload size={20} className="text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Image Preview State</label>
              <div className="w-40 h-40 border border-gray-200 bg-gray-100 relative group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon size={32} className="text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm">Change</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System States Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">System States</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Empty State */}
          <Card className="p-8 flex flex-col items-center justify-center text-center bg-gray-50 border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Results Found</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-sm">We couldn't find anything matching your search. Try adjusting your filters.</p>
            <Button variant="outline" size="sm">Clear Filters</Button>
          </Card>

          {/* Loading State */}
          <Card className="p-8 flex flex-col items-center justify-center text-center bg-white border border-gray-100">
            <Loader2 size={32} className="text-[var(--color-navy)] animate-spin mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Loading Data...</h3>
            <p className="text-sm text-gray-500">Please wait while we fetch the latest information.</p>
          </Card>

          {/* Alert States */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700">Alert Banners</h3>
            
            {/* Success */}
            <div className="p-4 bg-green-50 border-l-4 border-green-500 flex items-start gap-3">
              <CheckCircle2 className="text-green-500 mt-0.5" size={20} />
              <div>
                <h4 className="text-green-800 font-medium">Success State</h4>
                <p className="text-sm text-green-700 mt-1">Your changes have been successfully saved to the system.</p>
              </div>
            </div>
            
            {/* Error */}
            <div className="p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <div>
                <h4 className="text-red-800 font-medium">Error State</h4>
                <p className="text-sm text-red-700 mt-1">Failed to connect to the server. Please check your internet connection and try again.</p>
              </div>
            </div>
            
            {/* Warning */}
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 flex items-start gap-3">
              <AlertTriangle className="text-orange-500 mt-0.5" size={20} />
              <div>
                <h4 className="text-orange-800 font-medium">Warning State</h4>
                <p className="text-sm text-orange-700 mt-1">Your subscription is expiring in 3 days. Please renew to avoid service interruption.</p>
              </div>
            </div>
            
            {/* Info */}
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 flex items-start gap-3">
              <Info className="text-blue-500 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-800 font-medium">Information State</h4>
                <p className="text-sm text-blue-700 mt-1">A new version of the application is available for download.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dialogs Section */}
      <section className="space-y-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Dialogs & Modals</h2>
        
        <div className="flex gap-4">
          <Button onClick={() => setShowSystemDialog(true)}>Show System Alert</Button>
          <Button variant="outline" onClick={() => setShowLogoutDialog(true)} className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
            Show Logout Dialog
          </Button>
        </div>
      </section>

      {/* Dialog Overlays */}
      
      {/* System Dialog */}
      {showSystemDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[var(--color-navy)] font-semibold">
                <AlertCircle size={20} />
                <span>System Notification</span>
              </div>
              <button 
                onClick={() => setShowSystemDialog(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                This is a standard system dialog used for confirmations, important notices, or asking the user to make a choice.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowSystemDialog(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setShowSystemDialog(false)}>Confirm Action</Button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white max-w-sm w-full shadow-xl">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <LogOut size={28} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Leave?</h3>
              <p className="text-gray-500 mb-8">
                Are you sure you want to log out of your account? You will need to enter your credentials to log back in.
              </p>
              
              <div className="w-full space-y-3">
                <Button variant="primary" className="w-full !bg-red-600 hover:!bg-red-700" onClick={() => setShowLogoutDialog(false)}>
                  Yes, Log Out
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setShowLogoutDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
