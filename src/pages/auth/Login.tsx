import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, EyeOff, Eye, ArrowRight } from 'lucide-react';
import logoUrl from '../../assets/images/logo/7sens.webp';

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
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
        <h2 className="text-[var(--color-navy)] text-2xl font-heading font-semibold mb-2">Welcome Back!</h2>
        <p className="text-gray-500 text-sm">Sign in to continue to the 7Sens Admin Panel</p>
      </div>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-[var(--color-navy)]">Email Address</label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            defaultValue="admin@7sens.com"
            required 
            autoComplete="email"
            iconLeft={<Mail size={18} />}
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-[var(--color-navy)]">Password</label>
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Enter your password" 
            defaultValue="password123"
            required 
            autoComplete="current-password"
            iconLeft={<Lock size={18} />}
            iconRight={showPassword ? <Eye size={18} onClick={() => setShowPassword(false)} className="cursor-pointer text-gray-400 hover:text-gray-600" /> : <EyeOff size={18} onClick={() => setShowPassword(true)} className="cursor-pointer text-gray-400 hover:text-gray-600" />}
          />
        </div>

        <div className="flex justify-between items-center mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded-none border-gray-300 text-[var(--color-gold)] focus:ring-[var(--color-gold)] w-4 h-4 cursor-pointer" />
            <span className="text-sm text-gray-500">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-[var(--color-gold)] font-medium no-underline hover:underline">Forgot Password?</Link>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full mt-2 h-12 flex justify-center items-center font-semibold !shadow-none !rounded-none hover:bg-[#253965] hover:-translate-y-0.5 transition-all duration-300" 
          isLoading={isLoading}
        >
          <span>Sign In</span>
          {!isLoading && <ArrowRight size={18} />}
        </Button>
      </form>


    </div>
  );
};
