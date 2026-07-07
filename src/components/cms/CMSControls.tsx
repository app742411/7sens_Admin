import { useState } from 'react';
import { ChevronUp, ChevronDown, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';

// --- Toggle ---
export const CMSToggle = ({ active, onChange }: { active: boolean, onChange?: (val: boolean) => void }) => (
  <div 
    onClick={() => onChange && onChange(!active)}
    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${active ? 'bg-green-500' : 'bg-gray-200'}`}
  >
    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-[18px]' : 'left-[2px]'}`}></div>
  </div>
);

// --- Accordion Wrapper ---
interface CMSAccordionProps {
  title: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  published?: boolean;
  children: React.ReactNode;
}

export const CMSAccordion: React.FC<CMSAccordionProps> = ({ title, icon, defaultExpanded = false, published = true, children }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isPublished, setIsPublished] = useState(published);

  return (
    <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
      <div 
        className="px-5 py-4 flex items-center justify-between cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3" onClick={() => setExpanded(!expanded)}>
          {icon && <div className="text-gray-400">{icon}</div>}
          <h3 className="text-[13px] font-bold text-[#1B2A4A] tracking-wide">{title}</h3>
          {isPublished && (
            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-sm ml-2">
              Published
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div onClick={(e) => e.stopPropagation()}>
            <CMSToggle active={isPublished} onChange={setIsPublished} />
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#C9A84C]"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-5 border-t border-gray-100 flex flex-col gap-6">
          {children}
        </div>
      )}
    </div>
  );
};

// --- Form Controls ---

export const CMSInput = ({ label, defaultValue, type = 'text', icon }: { label: string, defaultValue?: string, type?: string, icon?: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-bold text-gray-500">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        defaultValue={defaultValue} 
        className="w-full px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C]"
      />
      {icon && (
        <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  </div>
);

export const CMSTextarea = ({ label, defaultValue, rows = 3 }: { label: string, defaultValue?: string, rows?: number }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-bold text-gray-500">{label}</label>
    <textarea 
      defaultValue={defaultValue} 
      rows={rows}
      className="w-full px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C] resize-y"
    />
  </div>
);

export const CMSImageUpload = ({ label, currentImage, resolutionHint }: { label: string, currentImage?: string, resolutionHint?: string }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-bold text-gray-500">{label}</label>
    <div className="border border-gray-200 p-3 flex items-center justify-between bg-gray-50/50">
      <div className="flex items-center gap-4">
        {currentImage ? (
          <img src={currentImage} alt="Preview" className="w-16 h-10 object-cover border border-gray-200" />
        ) : (
          <div className="w-16 h-10 bg-gray-200 flex items-center justify-center border border-gray-300">
            <ImageIcon size={16} className="text-gray-400" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[#1B2A4A]">hero-banner.jpg</span>
          {resolutionHint && <span className="text-[10px] text-gray-400">{resolutionHint}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:text-[#C9A84C] transition-colors">
          Change
        </button>
        <button className="p-1.5 border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  </div>
);

// --- Repeater Item ---
export const CMSRepeaterItem = ({ children, onRemove }: { children: React.ReactNode, onRemove?: () => void }) => (
  <div className="flex items-start gap-3 p-4 border border-gray-100 bg-gray-50/30 rounded-sm relative group">
    <div className="cursor-move text-gray-300 hover:text-gray-500 pt-2 shrink-0">
      <GripVertical size={16} />
    </div>
    <div className="flex-1 w-full">
      {children}
    </div>
    <button 
      onClick={onRemove}
      className="absolute right-3 top-3 p-1.5 border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
    >
      <Trash2 size={12} />
    </button>
  </div>
);
