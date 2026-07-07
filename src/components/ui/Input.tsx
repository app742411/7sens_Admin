import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, success, iconLeft, iconRight, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {iconLeft && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center">
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            'flex h-12 w-full rounded-none border border-gray-200 bg-white py-3 text-sm font-sans text-gray-900 transition-all duration-200 outline-none',
            iconLeft ? 'pl-11' : 'pl-4',
            iconRight ? 'pr-11' : 'pr-4',
            'placeholder:text-gray-400',
            'hover:not(:disabled):border-gray-300',
            'focus-visible:border-[var(--color-navy)] focus-visible:ring-2 focus-visible:ring-[var(--color-navy)]/10',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200',
            error && 'border-[var(--color-error)] focus-visible:border-[var(--color-error)] focus-visible:ring-2 focus-visible:ring-[var(--color-error)]/10',
            success && 'border-[var(--color-success)] focus-visible:border-[var(--color-success)] focus-visible:ring-2 focus-visible:ring-[var(--color-success)]/10',
            className
          )}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center justify-center cursor-pointer hover:text-gray-600 transition-colors">
            {iconRight}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
