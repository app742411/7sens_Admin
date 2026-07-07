import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const variantStyles = {
  primary: 'bg-[var(--color-navy)] text-white shadow-sm hover:bg-[var(--color-deep-blue)] hover:shadow-md active:translate-y-px active:shadow-none',
  secondary: 'bg-[var(--color-gold)] text-[var(--color-navy)] shadow-sm hover:brightness-90 hover:shadow-md active:translate-y-px active:shadow-none',
  outline: 'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-none font-sans font-medium transition-all duration-200 cursor-pointer outline-none gap-2',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-navy)] focus-visible:ring-offset-white',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 
            className="animate-spin absolute" 
            style={{ color: variant === 'primary' ? 'white' : 'var(--color-navy)' }} 
            size={18} 
          />
        )}
        <span className={clsx("inline-flex items-center gap-2", isLoading && 'opacity-0')}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
