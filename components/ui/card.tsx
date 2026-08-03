import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative rounded-xl border-2 border-ink bg-paper shadow-[6px_6px_0_0_theme(colors.ink)] transition-transform duration-200',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card };
