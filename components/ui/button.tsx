import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-ink font-mono text-sm font-medium tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0',
  {
    variants: {
      variant: {
        signal:
          'bg-signal text-paper shadow-[4px_4px_0_0_theme(colors.ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_theme(colors.ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        ghost:
          'bg-paper text-ink shadow-[4px_4px_0_0_theme(colors.ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_theme(colors.ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        muted:
          'border-ink/20 bg-ink/[0.04] text-ink/35 cursor-not-allowed',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
