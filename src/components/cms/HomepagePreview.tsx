import { ArrowRight } from 'lucide-react';

export const HomepagePreview = () => {
  return (
    <div className="w-full bg-[#FAFAF8] shadow-sm transition-all duration-300">
      
      {/* 1. Hero Banner */}
      <div className="w-full relative h-[600px] flex items-center">
        {/* Mock Graphic/Image on the right */}
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M50 0 C70 40 30 60 100 100 L100 0 Z" fill="#F0EBE1" opacity="0.5" />
            <path d="M60 0 C80 30 40 70 100 100" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.8" />
            <path d="M55 0 C75 35 35 65 100 100" fill="none" stroke="#C9A84C" strokeWidth="0.2" opacity="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 px-16 max-w-[600px]">
          <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">CURATED EXPERIENCES</h4>
          <h1 className="text-[#1B2A4A] text-5xl font-serif mb-6 leading-tight">
            Meaningful Connections Begin With Shared Experiences.
          </h1>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            7Sens creates exclusive events where encounters happen naturally, through authentic experiences and sincere exchanges.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-[#1B2A4A] text-white text-[10px] font-bold tracking-[0.15em] uppercase px-8 py-4">
              Explore Events
            </button>
            <button className="bg-transparent border border-[#1B2A4A] text-[#1B2A4A] text-[10px] font-bold tracking-[0.15em] uppercase px-8 py-4">
              How it works
            </button>
          </div>
        </div>
      </div>

      {/* 2. How It Works */}
      <div className="w-full py-20 px-16 flex flex-col items-center text-center">
        <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">HOW IT WORKS</h4>
        <h2 className="text-[#1B2A4A] text-3xl font-serif mb-16">Three steps. Natural connections.</h2>
        
        <div className="grid grid-cols-1 gap-12 max-w-[500px]">
          <div className="flex items-start gap-8 text-left">
            <div className="flex flex-col items-center gap-2 mt-1">
              <span className="text-[#C9A84C] text-sm font-serif italic">01</span>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
            </div>
            <div>
              <h3 className="text-[#1B2A4A] font-bold text-lg mb-2">Join an exclusive event.</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Choose from our carefully selected experiences, designed to bring together like-minded profiles.</p>
            </div>
          </div>

          <div className="flex items-start gap-8 text-left">
            <div className="flex flex-col items-center gap-2 mt-1">
              <span className="text-[#C9A84C] text-sm font-serif italic">02</span>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
            </div>
            <div>
              <h3 className="text-[#1B2A4A] font-bold text-lg mb-2">Meet naturally, through activities.</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Participate in concrete and immersive activities that break the ice effortlessly and without pressure.</p>
            </div>
          </div>

          <div className="flex items-start gap-8 text-left">
            <div className="flex flex-col items-center gap-2 mt-1">
              <span className="text-[#C9A84C] text-sm font-serif italic">03</span>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
            </div>
            <div>
              <h3 className="text-[#1B2A4A] font-bold text-lg mb-2">Continue the conversation if the interest is mutual.</h3>
              <p className="text-gray-500 text-xs leading-relaxed">If there is a connection, continue the conversation freely. No algorithm, just destiny.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Featured Events */}
      <div className="w-full py-20 px-16 bg-white">
        <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">FEATURED EVENTS</h4>
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-[#1B2A4A] text-3xl font-serif">Unique experiences await you.</h2>
          <button className="text-[10px] font-bold text-[#1B2A4A] tracking-wider uppercase border-b border-[#1B2A4A] pb-1 flex items-center gap-1">
            See all events <ArrowRight size={12} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          {[
            { title: 'Evening of Tasting & Discussion', loc: 'Geneva', date: 'May 24, 2025', price: 'CHF 85' },
            { title: 'Creative Workshop & Meetings', loc: 'Lausanne', date: 'May 28, 2025', price: 'CHF 55' },
            { title: 'Sunset & Conversations', loc: 'Montreux', date: 'June 2, 2025', price: 'CHF 50' },
            { title: 'Art & Inspiration', loc: 'Zurich', date: 'June 8, 2025', price: 'CHF 50' }
          ].map((ev, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-24 h-24 bg-gray-200 shrink-0">
                <img src={`https://picsum.photos/seed/ev${i}/200/200`} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex flex-col py-1">
                <h4 className="text-[#1B2A4A] font-bold text-sm leading-tight mb-1">{ev.title}</h4>
                <p className="text-[10px] text-gray-500 mb-2">{ev.loc} — {ev.date}</p>
                <p className="text-[10px] font-bold text-[#1B2A4A] mt-auto">{ev.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Cities */}
      <div className="w-full py-20 px-16 text-center">
        <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">OUR DESTINATIONS</h4>
        <h2 className="text-[#1B2A4A] text-3xl font-serif mb-12">Where our events take place.</h2>
        
        <div className="grid grid-cols-5 gap-y-8 max-w-[600px] mx-auto">
          {['Geneva', 'Lausanne', 'Montreux', 'Zurich', 'Annecy', 'Yverdon', 'Neuchâtel', 'Fribourg', 'Sion', 'Lugano'].map((city, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <img src={`https://picsum.photos/seed/city${i}/60/60`} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="" />
              <span className="text-[10px] font-bold text-[#1B2A4A]">{city}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Why It's Different */}
      <div className="w-full py-20 px-16 flex items-center justify-between">
        <div className="max-w-[300px]">
          <h4 className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">WHY 7SENS?</h4>
          <h2 className="text-[#1B2A4A] text-3xl font-serif mb-6 leading-tight">"True alchemy cannot be planned."</h2>
          <p className="text-gray-500 text-xs mb-8 leading-relaxed">
            7Sens is not a dating site. It is a place where human connections are created naturally, through shared experiences, in a caring, inspiring and highly refined environment.
          </p>
          <button className="bg-[#1B2A4A] text-white text-[10px] font-bold tracking-[0.15em] uppercase px-8 py-4">
            Learn more
          </button>
        </div>
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden relative">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M50 0 C70 40 30 60 100 100 L100 0 Z" fill="#F0EBE1" />
           </svg>
        </div>
      </div>

    </div>
  );
};
