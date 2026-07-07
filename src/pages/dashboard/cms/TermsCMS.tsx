import { FileText, Calendar } from 'lucide-react';
import { CMSLayout } from '../../../components/cms/CMSLayout';
import { CMSAccordion, CMSInput } from '../../../components/cms/CMSControls';


export const TermsCMS = () => {
  const EditorContent = (
    <div className="flex flex-col gap-4">
      <CMSAccordion title="Terms & Conditions Page" icon={<FileText size={16} />} defaultExpanded published>
        <div className="flex flex-col gap-4">
          <CMSInput label="Page Title" defaultValue="Terms and Conditions" />
          <CMSInput label="Last Updated Date" type="date" defaultValue="2025-01-15" icon={<Calendar size={14} />} />
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500">Content (Rich Text Editor)</label>
            <div className="border border-gray-200 rounded-none bg-white">
              {/* Mock Rich Text Toolbar */}
              <div className="border-b border-gray-200 px-3 py-2 flex items-center gap-3 bg-gray-50/50 text-gray-500">
                <button className="font-bold text-sm hover:text-[#1B2A4A]">B</button>
                <button className="italic text-sm hover:text-[#1B2A4A]">I</button>
                <button className="underline text-sm hover:text-[#1B2A4A]">U</button>
                <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                <button className="text-xs hover:text-[#1B2A4A]">H1</button>
                <button className="text-xs hover:text-[#1B2A4A]">H2</button>
                <button className="text-xs hover:text-[#1B2A4A]">H3</button>
              </div>
              <textarea 
                className="w-full h-[400px] p-4 text-sm text-[#1B2A4A] focus:outline-none resize-y"
                defaultValue={`1. Acceptance of Terms\nBy accessing and using the 7Sens platform, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you may not use our services.\n\n2. User Eligibility\nYou must be at least 18 years of age to use this platform. By registering, you warrant that all information provided is accurate and truthful.\n\n3. Event Code of Conduct\nAll members are expected to behave with the utmost respect and courtesy during our exclusive events. Any form of harassment or inappropriate behavior will result in immediate termination of membership.\n\n4. Cancellations and Refunds\nRefunds for event bookings are only permitted if cancelled at least 48 hours prior to the event start time. Certain premium events may have strict no-refund policies which will be stated at the time of booking.`}
              />
            </div>
          </div>
        </div>
      </CMSAccordion>
    </div>
  );

  const PreviewContent = (
    <div className="w-full bg-white shadow-sm min-h-screen">
      <div className="w-full bg-[#FAFAF8] py-20 px-16 border-b border-gray-100">
        <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">LEGAL</h4>
        <h1 className="text-[#1B2A4A] text-4xl font-serif">Terms and Conditions</h1>
        <p className="text-gray-500 text-xs mt-4">Last Updated: Jan 15, 2025</p>
      </div>
      <div className="max-w-[800px] mx-auto py-16 px-8">
        <div className="prose prose-sm prose-slate max-w-none">
          <h3 className="text-[#1B2A4A] font-bold mb-2">1. Acceptance of Terms</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">By accessing and using the 7Sens platform, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you may not use our services.</p>
          
          <h3 className="text-[#1B2A4A] font-bold mb-2">2. User Eligibility</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">You must be at least 18 years of age to use this platform. By registering, you warrant that all information provided is accurate and truthful.</p>
          
          <h3 className="text-[#1B2A4A] font-bold mb-2">3. Event Code of Conduct</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">All members are expected to behave with the utmost respect and courtesy during our exclusive events. Any form of harassment or inappropriate behavior will result in immediate termination of membership.</p>
          
          <h3 className="text-[#1B2A4A] font-bold mb-2">4. Cancellations and Refunds</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">Refunds for event bookings are only permitted if cancelled at least 48 hours prior to the event start time. Certain premium events may have strict no-refund policies which will be stated at the time of booking.</p>
        </div>
      </div>
    </div>
  );

  return (
    <CMSLayout 
      title="Terms & Conditions" 
      description="Manage the terms and conditions legal page" 
      editorContent={EditorContent} 
      previewContent={PreviewContent} 
    />
  );
};
