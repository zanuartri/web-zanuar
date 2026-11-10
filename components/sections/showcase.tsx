import { Container } from '@/components/ui/container';
import { Screenshot } from './screenshot';

export type ShowcaseProps = {
  heading: string;
  body: string;
  src: string;
  src2x?: string;
  src2xWidth?: number;
  sizes?: string;
  width: number;
  height: number;
  alt: string;
  /** Ratio classes for the frame, written literally so Tailwind keeps them. */
  aspectClassName: string;
};

export function Showcase({
  heading,
  body,
  src,
  src2x,
  src2xWidth,
  sizes,
  width,
  height,
  alt,
  aspectClassName,
}: ShowcaseProps) {
  return (
    <section className="pb-12 pt-12 md:pb-16 md:pt-16 xl:py-section">
      <Container className="flex flex-col gap-[14px] md:gap-10">
        <div className="flex flex-col gap-[18px] xl:flex-row xl:items-end xl:justify-between xl:gap-16">
          <h2 className="max-w-[640px] font-display text-[36px] leading-[45px] tracking-[-0.02em] text-ink md:text-[50px] md:leading-[63px] xl:flex-1">
            {heading}
          </h2>
          <p className="max-w-[440px] text-[15px] leading-[24px] text-ink-soft md:text-[16px] md:leading-[25px] xl:w-[440px] xl:shrink-0 xl:text-[17px] xl:leading-[27px]">
            {body}
          </p>
        </div>

        <Screenshot
          src={src}
          src2x={src2x}
          src2xWidth={src2xWidth}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          aspectClassName={aspectClassName}
        />
      </Container>
    </section>
  );
}
