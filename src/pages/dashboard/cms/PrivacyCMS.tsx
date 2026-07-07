import { FileText, Calendar } from 'lucide-react';
import { CMSLayout } from '../../../components/cms/CMSLayout';
import { CMSAccordion, CMSInput } from '../../../components/cms/CMSControls';

export const PrivacyCMS = () => {
  const EditorContent = (
    <div className="flex flex-col gap-4">
      <CMSAccordion title="Privacy Policy Page" icon={<FileText size={16} />} defaultExpanded published>
        <div className="flex flex-col gap-4">
          <CMSInput label="Page Title" defaultValue="Privacy Policy" />
          <CMSInput label="Last Updated Date" type="date" defaultValue="2025-02-01" icon={<Calendar size={14} />} />
          
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
                defaultValue={`1. Information We Collect\nWe collect personal information that you provide to us, such as name, address, contact information, passwords and security data, and payment information. We also collect information about your interests and preferences to better match you with relevant events.\n\n2. How We Use Your Information\nWe use your personal information for a variety of business purposes, including to provide and manage your account, to process your requests and payments, to communicate with you about our events, and to personalize your experience on our platform.\n\n3. Information Sharing\nWe do not share, sell, rent or trade any of your information with third parties for their promotional purposes. We may share your information with our trusted service providers who assist us in operating our platform.\n\n4. Data Security\nWe have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.`}
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
        <h1 className="text-[#1B2A4A] text-4xl font-serif">Privacy Policy</h1>
        <p className="text-gray-500 text-xs mt-4">Last Updated: Feb 01, 2025</p>
      </div>
      <div className="max-w-[800px] mx-auto py-16 px-8">
        <div className="prose prose-sm prose-slate max-w-none">
          <h3 className="text-[#1B2A4A] font-bold mb-2">1. Information We Collect</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">We collect personal information that you provide to us, such as name, address, contact information, passwords and security data, and payment information. We also collect information about your interests and preferences to better match you with relevant events.</p>
          
          <h3 className="text-[#1B2A4A] font-bold mb-2">2. How We Use Your Information</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">We use your personal information for a variety of business purposes, including to provide and manage your account, to process your requests and payments, to communicate with you about our events, and to personalize your experience on our platform.</p>
          
          <h3 className="text-[#1B2A4A] font-bold mb-2">3. Information Sharing</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">We do not share, sell, rent or trade any of your information with third parties for their promotional purposes. We may share your information with our trusted service providers who assist us in operating our platform.</p>
          
          <h3 className="text-[#1B2A4A] font-bold mb-2">4. Data Security</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
        </div>
      </div>
    </div>
  );

  return (
    <CMSLayout 
      title="Privacy Policy" 
      description="Manage the privacy policy page" 
      editorContent={EditorContent} 
      previewContent={PreviewContent} 
    />
  );
};
