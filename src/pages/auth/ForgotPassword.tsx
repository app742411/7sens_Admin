import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, ArrowRight } from 'lucide-react';
import logoUrl from '../../assets/images/logo/7sens.webp';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demonstration, navigate straight to reset password with a dummy email
      navigate('/reset-password?email=admin@7sens.com');
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
        <h2 className="text-[var(--color-navy)] text-2xl font-heading font-semibold mb-2">Forgot Password?</h2>
        <p className="text-gray-500 text-sm">Enter your email to receive a password reset link</p>
      </div>

      <form onSubmit={handleSendLink} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-[var(--color-navy)]">Email Address</label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            required 
            autoComplete="email"
            iconLeft={<Mail size={18} />}
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full mt-4 h-12 flex justify-center items-center font-semibold !shadow-none !rounded-none hover:bg-[#253965] hover:-translate-y-0.5 transition-all duration-300" 
          isLoading={isLoading}
        >
          <span>Send Reset Link</span>
          {!isLoading && <ArrowRight size={18} />}
        </Button>
      </form>

      <div className="mt-8">
        <Link to="/login" className="text-sm text-[var(--color-gold)] font-medium no-underline hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};
