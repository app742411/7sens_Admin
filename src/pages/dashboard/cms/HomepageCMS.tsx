import { LayoutDashboard, Users, Calendar, MapPin, Star } from 'lucide-react';
import { CMSLayout } from '../../../components/cms/CMSLayout';
import { HomepagePreview } from '../../../components/cms/HomepagePreview';
import { 
  CMSAccordion, 
  CMSInput, 
  CMSTextarea, 
  CMSImageUpload, 
  CMSRepeaterItem 
} from '../../../components/cms/CMSControls';

export const HomepageCMS = () => {
  const EditorContent = (
    <div className="flex flex-col gap-4">
      {/* 1. Hero Banner */}
      <CMSAccordion title="Hero Banner" icon={<LayoutDashboard size={16} />} defaultExpanded>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500">Background Type</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#1B2A4A] cursor-pointer">
                <input type="radio" name="bgType" defaultChecked className="accent-[#C9A84C]" /> Image
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input type="radio" name="bgType" className="accent-[#C9A84C]" /> Video
              </label>
            </div>
          </div>
          
          <CMSImageUpload 
            label="Banner Image" 
            currentImage="https://picsum.photos/seed/hero/200/100" 
            resolutionHint="1920 x 800px" 
          />
          
          <CMSInput label="Eyebrow Text" defaultValue="CURATED EXPERIENCES" />
          <CMSInput label="Title" defaultValue="Meaningful Connections Begin With Shared Experiences." />
          <CMSTextarea 
            label="Description" 
            defaultValue="7Sens creates exclusive events where encounters happen naturally, through authentic experiences and sincere exchanges." 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <CMSInput label="Primary Button Text" defaultValue="EXPLORE EVENTS" />
            <CMSInput label="Primary Button Link" defaultValue="/events" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <CMSInput label="Secondary Button Text" defaultValue="HOW IT WORKS" />
            <CMSInput label="Secondary Button Link" defaultValue="/how-it-works" />
          </div>
        </div>
      </CMSAccordion>

      {/* 2. How It Works */}
      <CMSAccordion title="How It Works" icon={<LayoutDashboard size={16} />} published>
        <div className="flex flex-col gap-4">
          <CMSInput label="Section Eyebrow" defaultValue="HOW IT WORKS" />
          <CMSInput label="Section Title" defaultValue="Three steps. Natural connections." />
          
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[11px] font-bold text-gray-500">Steps</label>
            
            <CMSRepeaterItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 border border-gray-200 rounded-sm flex items-center justify-center shrink-0 bg-white">
                    <Users size={20} className="text-gray-400" />
                  </div>
                  <CMSInput label="Title" defaultValue="Join an exclusive event." />
                </div>
                <CMSTextarea label="Description" rows={2} defaultValue="Choose from our carefully selected experiences, designed to bring together like-minded profiles." />
              </div>
            </CMSRepeaterItem>
            
            <CMSRepeaterItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 border border-gray-200 rounded-sm flex items-center justify-center shrink-0 bg-white">
                    <Calendar size={20} className="text-gray-400" />
                  </div>
                  <CMSInput label="Title" defaultValue="Meet naturally, through activities." />
                </div>
                <CMSTextarea label="Description" rows={2} defaultValue="Participate in concrete and immersive activities that break the ice effortlessly and without pressure." />
              </div>
            </CMSRepeaterItem>
            
            <button className="w-fit mx-auto mt-2 px-4 py-2 border border-gray-200 text-xs font-bold text-[#1B2A4A] rounded-none hover:bg-gray-50">
              + Add Step
            </button>
          </div>
        </div>
      </CMSAccordion>

      {/* 3. Featured Events */}
      <CMSAccordion title="Featured Events" icon={<Calendar size={16} />}>
        <div className="flex flex-col gap-4">
          <CMSInput label="Section Eyebrow" defaultValue="FEATURED EVENTS" />
          <CMSInput label="Section Title" defaultValue="Unique experiences await you." />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500">View All Button Text</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-none text-sm text-[#1B2A4A] focus:outline-none focus:border-[#C9A84C]">
                <option>SEE ALL EVENTS</option>
              </select>
            </div>
            <CMSInput label="View All Button Link" defaultValue="/events" />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[11px] font-bold text-gray-500">Events Source</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#1B2A4A] cursor-pointer">
                <input type="radio" name="evtSrc" defaultChecked className="accent-[#C9A84C]" /> Manual Select
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input type="radio" name="evtSrc" className="accent-[#C9A84C]" /> Latest Events
              </label>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <CMSRepeaterItem>
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/ev1/50/50" className="w-12 h-12 object-cover" alt="" />
                <div>
                  <h4 className="text-sm font-bold text-[#1B2A4A]">Evening of Tasting & Discussion</h4>
                  <p className="text-[10px] text-gray-500">Geneva — May 24, 2025</p>
                </div>
                <span className="ml-auto text-xs font-bold text-[#1B2A4A] pr-4">CHF 85</span>
              </div>
            </CMSRepeaterItem>
            <button className="w-fit mx-auto mt-2 px-4 py-2 border border-gray-200 text-xs font-bold text-[#1B2A4A] rounded-none hover:bg-gray-50">
              + Add / Change Events
            </button>
          </div>
        </div>
      </CMSAccordion>

      {/* 4. Cities */}
      <CMSAccordion title="Cities" icon={<MapPin size={16} />}>
        <div className="flex flex-col gap-4">
          <CMSInput label="Section Eyebrow" defaultValue="OUR DESTINATIONS" />
          <CMSInput label="Section Title" defaultValue="Where our events take place." />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {['Geneva', 'Lausanne', 'Montreux', 'Zurich'].map((city, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 border border-gray-100 bg-gray-50/50 relative group cursor-move">
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 cursor-pointer text-gray-400 hover:text-red-500">
                  <Star size={12} /> {/* Using star as a mock delete icon just for variety */}
                </div>
                <img src={`https://picsum.photos/seed/city${i}/40/40`} className="w-10 h-10 rounded-full" alt="" />
                <span className="text-[10px] font-bold text-[#1B2A4A]">{city}</span>
              </div>
            ))}
          </div>
          <button className="w-fit mx-auto mt-2 px-4 py-2 border border-gray-200 text-xs font-bold text-[#1B2A4A] rounded-none hover:bg-gray-50">
            + Add / Remove Cities
          </button>
        </div>
      </CMSAccordion>

      {/* 5. Why It's Different */}
      <CMSAccordion title="Why It's Different" icon={<Star size={16} />}>
        <div className="flex flex-col gap-4">
          <CMSInput label="Section Eyebrow" defaultValue="WHY 7SENS?" />
          <CMSInput label="Title" defaultValue='"True alchemy cannot be planned."' />
          <CMSTextarea 
            label="Description" 
            defaultValue="7Sens is not a dating site. It is a place where human connections are created naturally, through shared experiences, in a caring, inspiring and highly refined environment." 
          />
          <div className="grid grid-cols-2 gap-4">
            <CMSInput label="Button Text" defaultValue="LEARN MORE" />
            <CMSInput label="Button Link" defaultValue="/about" />
          </div>
          <CMSImageUpload 
            label="Image" 
            currentImage="https://picsum.photos/seed/diff/200/100" 
            resolutionHint="1200 x 1200px" 
          />
        </div>
      </CMSAccordion>
    </div>
  );

  return (
    <CMSLayout 
      title="Homepage Content" 
      description="Manage and update homepage sections" 
      editorContent={EditorContent} 
      previewContent={<HomepagePreview />} 
    />
  );
};
