import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'outline';
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
  error: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]',
  info: 'bg-[var(--color-info-bg)] text-[var(--color-info)]',
  outline: 'bg-transparent text-gray-800 border border-gray-300',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-none px-3 py-[2px] text-xs font-semibold font-sans leading-relaxed uppercase tracking-wider whitespace-nowrap',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
