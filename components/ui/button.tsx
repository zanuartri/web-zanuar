import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex h-[58px] items-center justify-center rounded-pill border-2 px-[28px] text-[17px] font-semibold leading-[22px] transition-all duration-fast ease-out disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none',
  {
    variants: {
      variant: {
        primary:
          'border-ink bg-ink text-paper hover:-translate-y-0.5 hover:shadow-[0_4px_0_var(--color-peach)] active:translate-y-0 active:bg-ink-soft active:shadow-none disabled:border-faint disabled:bg-cream disabled:text-faint',
        secondary:
          'border-ink bg-paper text-ink hover:-translate-y-0.5 hover:bg-peach-soft hover:shadow-[0_4px_0_var(--color-peach)] active:translate-y-0 active:bg-peach-soft active:shadow-none disabled:border-faint disabled:bg-paper disabled:text-faint',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
