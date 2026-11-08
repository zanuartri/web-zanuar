import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center rounded-pill px-[14px] py-[7px] text-[14px] font-semibold leading-[18px]',
  {
    variants: {
      variant: {
        'in-the-works': 'border-tag border-ink bg-peach-soft text-ink',
        'open-source': 'border-tag border-ink bg-peach-soft text-ink',
        idea: 'border-0 bg-cream text-muted',
        live: 'border-0 bg-ink text-paper',
      },
    },
    defaultVariants: {
      variant: 'in-the-works',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant }), className)} {...props} />;
}

export { tagVariants };
