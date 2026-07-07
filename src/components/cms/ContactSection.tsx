import { ArrowRight } from 'lucide-react';

export const ContactSection = () => {
  return (
    <div className="w-full bg-[#FAFAF8] py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Column - Form */}
        <div className="flex flex-col">
          <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Building a relationship</h4>
          <h2 className="text-[#1B2A4A] text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Schedule a meeting.
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-md leading-relaxed">
            Fill out our form to join our private circle. We will contact you after reviewing your application.
          </p>

          <form className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col border-b border-gray-200 pb-2">
                <label className="text-[#1B2A4A] text-[10px] font-bold tracking-widest uppercase mb-3">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Clara Dubois"
                  className="bg-transparent border-none outline-none text-gray-500 text-sm placeholder-gray-300 w-full"
                />
              </div>
              <div className="flex flex-col border-b border-gray-200 pb-2">
                <label className="text-[#1B2A4A] text-[10px] font-bold tracking-widest uppercase mb-3">E-mail Address</label>
                <input 
                  type="email" 
                  placeholder="clara@example.ch"
                  className="bg-transparent border-none outline-none text-gray-500 text-sm placeholder-gray-300 w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col border-b border-gray-200 pb-2">
                <label className="text-[#1B2A4A] text-[10px] font-bold tracking-widest uppercase mb-3">Age</label>
                <input 
                  type="text" 
                  placeholder="32"
                  className="bg-transparent border-none outline-none text-gray-500 text-sm placeholder-gray-300 w-full"
                />
              </div>
              <div className="flex flex-col border-b border-gray-200 pb-2">
                <label className="text-[#1B2A4A] text-[10px] font-bold tracking-widest uppercase mb-3">City</label>
                <input 
                  type="text" 
                  placeholder="Geneva"
                  className="bg-transparent border-none outline-none text-gray-500 text-sm placeholder-gray-300 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col border-b border-gray-200 pb-2">
              <label className="text-[#1B2A4A] text-[10px] font-bold tracking-widest uppercase mb-3">Why do you want to join 7Sens?</label>
              <textarea 
                placeholder="Share with us your vision of authentic relationships..."
                className="bg-transparent border-none outline-none text-gray-500 text-sm placeholder-gray-300 w-full resize-none h-12"
              ></textarea>
            </div>

            <button 
              type="button" 
              className="mt-4 w-full bg-[#1B2A4A] text-white text-xs font-bold tracking-[0.15em] uppercase py-5 flex items-center justify-center gap-3 hover:bg-[#2a4070] transition-colors"
            >
              Submit Application <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Right Column - Info & Map */}
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Swiss</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Geneva — Lausanne — Montreux — Zurich
              </p>
            </div>
            <div>
              <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Direct Contact</h4>
              <p className="text-gray-500 text-xs leading-relaxed flex flex-col gap-1">
                <span>hello@7sens.ch</span>
                <span>+41 78 123 45 67</span>
              </p>
            </div>
          </div>

          {/* Map Preview */}
          <div className="relative w-full h-[300px] bg-[#F0EBE1] overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center">
            {/* Mocking the map background lines */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at center, transparent 0%, #FAFAF8 100%), repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%)',
              backgroundSize: '100% 100%, 20px 20px'
            }}></div>
            
            {/* Simple curvy path representation for the river/lake */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M 0,150 C 100,120 200,180 300,130 S 400,160 400,160" fill="none" stroke="#E6E2D8" strokeWidth="8" />
            </svg>

            {/* Map Pin Box */}
            <div className="relative z-10 flex flex-col items-center transform -translate-y-4">
              <div className="bg-[#1B2A4A] text-white px-5 py-3 shadow-lg flex flex-col items-center">
                <span className="text-[11px] font-bold tracking-wider mb-1">7Sens Geneva HQ</span>
                <span className="text-[9px] text-gray-300">Rue du Rhône, 1204 Geneva</span>
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#1B2A4A]"></div>
              <div className="w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-white shadow-sm mt-1"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
