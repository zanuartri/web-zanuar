import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Keep the 1184 shell (x=128 at 1440) instead of the 1080 content grid.
   * Only the nav and the homepage hero sit on that wider line.
   */
  wide?: boolean;
};

/**
 * The page shell. Below 1200 it is the padded tablet/mobile column; from 1200
 * it is the centred desktop content grid (1080, so x=180 at 1440). `wide`
 * keeps the older 1184 line for the chrome and the hero.
 */
export function Container({ className, wide = false, ...props }: ContainerProps) {
  return (
    <div
      data-reveal-group=""
      className={cn(
        'mx-auto w-full max-w-[1440px] px-[20px] md:px-12',
        wide ? 'xl:px-32' : 'xl:max-w-content xl:px-0',
        className
      )}
      {...props}
    />
  );
}
