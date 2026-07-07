import { MessageCircle } from 'lucide-react';
import { CMSLayout } from '../../../components/cms/CMSLayout';
import { CMSAccordion, CMSInput, CMSTextarea, CMSRepeaterItem } from '../../../components/cms/CMSControls';

export const FaqCMS = () => {
  const EditorContent = (
    <div className="flex flex-col gap-4">
      <CMSAccordion title="FAQ Management" icon={<MessageCircle size={16} />} defaultExpanded published>
        <div className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500">Frequently Asked Questions</label>
            
            <CMSRepeaterItem>
              <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CMSInput label="Question" defaultValue="Where do the 7Sens events take place?" />
                  <CMSInput label="Category" defaultValue="General" />
                </div>
                <CMSTextarea 
                  label="Answer (Rich Text)" 
                  rows={2} 
                  defaultValue="Our exclusive events take place in prestigious locations across Geneva, Lausanne, Montreux, and Zurich. The exact location is revealed to confirmed participants 48 hours before the event." 
                />
              </div>
            </CMSRepeaterItem>

            <CMSRepeaterItem>
              <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CMSInput label="Question" defaultValue="How is participant selection handled?" />
                  <CMSInput label="Category" defaultValue="Membership" />
                </div>
                <CMSTextarea 
                  label="Answer (Rich Text)" 
                  rows={2} 
                  defaultValue="All applications are manually reviewed by our committee to ensure a harmonious blend of profiles. We prioritize authenticity, shared values, and a genuine desire for meaningful connections." 
                />
              </div>
            </CMSRepeaterItem>

            <CMSRepeaterItem>
              <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CMSInput label="Question" defaultValue="Is this a dating website or speed-dating?" />
                  <CMSInput label="Category" defaultValue="General" />
                </div>
                <CMSTextarea 
                  label="Answer (Rich Text)" 
                  rows={2} 
                  defaultValue="No. 7Sens is a private circle focused on shared experiences. While romantic connections may naturally blossom, the primary goal is authentic human interaction in a pressure-free environment." 
                />
              </div>
            </CMSRepeaterItem>

            <button className="w-fit mx-auto mt-2 px-4 py-2 border border-gray-200 text-xs font-bold text-[#1B2A4A] rounded-none hover:bg-gray-50">
              + Add FAQ Item
            </button>
          </div>

        </div>
      </CMSAccordion>
    </div>
  );

  const PreviewContent = (
    <div className="w-full bg-white shadow-sm min-h-screen">
      <div className="w-full bg-[#FAFAF8] py-20 px-16 border-b border-gray-100 flex flex-col items-center text-center">
        <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">SUPPORT & INFO</h4>
        <h1 className="text-[#1B2A4A] text-4xl font-serif max-w-[400px]">Frequently Asked Questions</h1>
      </div>
      
      <div className="max-w-[700px] mx-auto py-16 px-8 flex flex-col gap-4">
        {[
          'Where do the 7Sens events take place?',
          'How is participant selection handled?',
          'Is this a dating website or speed-dating?',
          'What happens after an event if there is mutual interest?',
          'How do I join 7Sens events?'
        ].map((q, i) => (
          <div key={i} className="w-full border-b border-gray-200 pb-4 pt-2 flex items-center justify-between cursor-pointer group">
            <span className="text-[#1B2A4A] font-bold text-sm group-hover:text-[#C9A84C] transition-colors">{q}</span>
            <span className="text-gray-400 font-light text-xl leading-none">+</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <CMSLayout 
      title="FAQ Management" 
      description="Manage frequently asked questions and categories" 
      editorContent={EditorContent} 
      previewContent={PreviewContent} 
    />
  );
};
