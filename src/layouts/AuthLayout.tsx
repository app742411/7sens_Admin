import { Outlet } from 'react-router-dom';
import bgImage from '../assets/images/logo/authback.png';

export const AuthLayout = () => {
  return (
    <div
      className="min-h-screen w-full flex bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left side spacer to keep the form on the right side on desktop */}
      <div className="hidden lg:flex lg:w-[55%]"></div>

      {/* Right Panel - Form Container */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 relative">
        <div className="w-full max-w-[440px] bg-white rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-gray-100 relative z-10">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-center w-full">
          <p className="text-xs text-gray-400">© 2026 7Sens. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
