import { ArrowUpRight } from 'lucide-react';

interface CMSLayoutProps {
  title: string;
  description: string;
  editorContent: React.ReactNode;
  previewContent: React.ReactNode;
}

export const CMSLayout: React.FC<CMSLayoutProps> = ({ title, description, editorContent, previewContent }) => {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2A4A] mb-1 font-heading">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#1B2A4A] font-medium rounded-none hover:bg-gray-50 transition-colors shadow-sm">
            Preview Site <ArrowUpRight size={16} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-[#C9A84C] text-white font-medium rounded-none hover:bg-[#b59641] transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </div>

      {/* Split Pane Container */}
      <div className="flex flex-col xl:flex-row gap-6 items-start flex-1 min-h-[800px]">
        
        {/* Left Pane - Editor (Scrollable locally or grows with page) */}
        <div className="w-full xl:w-[500px] 2xl:w-[600px] flex flex-col gap-4 shrink-0 pb-12">
          {editorContent}
        </div>

        {/* Right Pane - Live Preview (Sticky) */}
        <div className="hidden xl:flex flex-col flex-1 sticky top-6 bg-[#FAFAF8] border border-gray-200 rounded-none overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
            <h3 className="text-sm font-bold text-[#1B2A4A]">Live Preview</h3>
            <div className="flex items-center gap-2">
              {/* Desktop/Mobile toggles could go here */}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto relative custom-scrollbar">
            {/* The scaled down preview content */}
            <div className="absolute top-0 left-0 w-full transform origin-top-left transition-all duration-300">
              {previewContent}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
