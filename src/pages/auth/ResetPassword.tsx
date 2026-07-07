import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Lock, EyeOff, Eye, ArrowRight } from 'lucide-react';
import logoUrl from '../../assets/images/logo/7sens.webp';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'admin@7sens.com';
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Logo */}
      <div className="mb-6 flex justify-center w-full">
        <img src={logoUrl} alt="7Sens Logo" className="h-12" />
      </div>

      {/* Header text */}
      <div className="text-center mb-8">
        <h2 className="text-[var(--color-navy)] text-2xl font-heading font-semibold mb-2">Reset Password</h2>
        <p className="text-gray-500 text-sm">Create a new password for your account</p>
      </div>

      <form onSubmit={handleReset} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[var(--color-navy)]">Email Address</label>
          <div className="flex h-12 w-full rounded-none border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-sans text-gray-500 cursor-not-allowed">
            {email}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-[var(--color-navy)]">New Password</label>
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password" 
            required 
            iconLeft={<Lock size={18} />}
            iconRight={showPassword ? <Eye size={18} onClick={() => setShowPassword(false)} /> : <EyeOff size={18} onClick={() => setShowPassword(true)} />}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-[var(--color-navy)]">Confirm Password</label>
          <Input 
            id="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password" 
            required 
            iconLeft={<Lock size={18} />}
            iconRight={showConfirmPassword ? <Eye size={18} onClick={() => setShowConfirmPassword(false)} /> : <EyeOff size={18} onClick={() => setShowConfirmPassword(true)} />}
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full mt-4 h-12 flex justify-center items-center font-semibold !shadow-none !rounded-none hover:bg-[#253965] hover:-translate-y-0.5 transition-all duration-300" 
          isLoading={isLoading}
        >
          <span>Reset Password</span>
          {!isLoading && <ArrowRight size={18} />}
        </Button>
      </form>
    </div>
  );
};
