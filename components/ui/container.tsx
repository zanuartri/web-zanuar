import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1440px] px-[20px] md:px-12 xl:px-32',
        className
      )}
      {...props}
    />
  );
}
