import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import bgImage from '../assets/images/logo/authback.png';
import logoUrl from '../assets/images/logo/7sens.webp';

export const NotFound = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-8 left-8">
        <img src={logoUrl} alt="7Sens Logo" className="h-12" />
      </div>
      
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-none shadow-2xl p-12 border border-gray-100 flex flex-col items-center text-center">
        <h1 className="text-[120px] font-serif font-bold text-[#C9A84C] leading-none mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/" className="w-full">
          <Button variant="primary" className="w-full gap-2 py-4">
            <Home size={18} />
            Return to Dashboard
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-8 text-center w-full">
        <p className="text-xs text-gray-500 font-medium">© 2026 7Sens. All rights reserved.</p>
      </div>
    </div>
  );
};
