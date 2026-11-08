import { Container } from '@/components/ui/container';
import { Screenshot } from './screenshot';

export type ShowcaseProps = {
  heading: string;
  body: string;
  src: string;
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
  width,
  height,
  alt,
  aspectClassName,
}: ShowcaseProps) {
  return (
    <section className="pb-12 pt-12 md:pb-16 md:pt-16 xl:pb-[88px] xl:pt-[88px]">
      <Container className="flex flex-col gap-[14px] md:gap-10">
        <div className="flex flex-col gap-[18px] xl:flex-row xl:items-end xl:justify-between xl:gap-24">
          <h2 className="max-w-[640px] font-display text-[36px] leading-[39px] tracking-[-0.02em] text-ink md:text-[50px] md:leading-[54px]">
            {heading}
          </h2>
          <p className="max-w-[440px] text-[15px] leading-[24px] text-ink-soft md:text-[16px] md:leading-[25px] xl:text-[17px] xl:leading-[27px]">
            {body}
          </p>
        </div>

        <Screenshot
          src={src}
          width={width}
          height={height}
          alt={alt}
          aspectClassName={aspectClassName}
        />
      </Container>
    </section>
  );
}
