import { cn } from '@/lib/utils';

export type ScreenshotProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Larger file (native size, never upscaled) paired with `src` using width descriptors. */
  src2x?: string;
  src2xWidth?: number;
  sizes?: string;
  /** Different art below 768. Only this file is fetched at that width. */
  mobileSrc?: string;
  /** Ratio classes, written literally so Tailwind keeps them. */
  aspectClassName: string;
  /** Above-the-fold art loads eagerly; everything else lazily. */
  priority?: boolean;
  className?: string;
};

/**
 * Framed product screenshot. The wrapper holds the ratio (and shows the
 * skeleton token behind it) before the file decodes, so nothing shifts.
 */
export function Screenshot({
  src,
  width,
  height,
  alt,
  src2x,
  src2xWidth,
  sizes,
  mobileSrc,
  aspectClassName,
  priority = false,
  className,
}: ScreenshotProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[16px] border-2 border-ink xl:rounded-[20px]',
        aspectClassName,
        className
      )}
    >
      <span aria-hidden className="motion-skeleton absolute inset-0 bg-skeleton" />
      <picture>
        {mobileSrc ? (
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
        ) : null}
        <img
          src={src}
          srcSet={
            src2x && src2xWidth ? `${src} ${width}w, ${src2x} ${src2xWidth}w` : undefined
          }
          sizes={src2x ? sizes : undefined}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
    </div>
  );
}
