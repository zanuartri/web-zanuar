import { Container } from '@/components/ui/container';

export type Step = {
  title: string;
  body: string;
};

export type NumberedStepsProps = {
  id?: string;
  heading: string;
  items: readonly Step[];
  worksWithLabel: string;
  worksWith: readonly string[];
};

export function NumberedSteps({
  id,
  heading,
  items,
  worksWithLabel,
  worksWith,
}: NumberedStepsProps) {
  return (
    <section
      id={id}
      className="scroll-mt-6 border-y-2 border-ink bg-paper py-16 md:py-20 xl:py-section"
    >
      <Container className="flex flex-col gap-[32px] md:gap-[40px] xl:gap-[48px]">
        <h2 className="font-display text-[36px] leading-[39px] tracking-[-0.02em] text-ink md:text-[50px] md:leading-[52px] xl:leading-[51px]">
          {heading}
        </h2>

        <ol className="grid gap-[32px] md:gap-[40px] xl:grid-cols-3 xl:gap-[48px]">
          {items.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-4">
              <span
                aria-hidden
                className={
                  index === 0
                    ? 'flex h-12 w-12 items-center justify-center rounded-pill border-2 border-ink bg-ink font-mono text-[18px] font-medium text-paper'
                    : 'flex h-12 w-12 items-center justify-center rounded-pill border-2 border-ink font-mono text-[18px] font-medium text-ink'
                }
              >
                {index + 1}
              </span>
              <h3 className="font-display text-[26px] leading-[32px] text-ink md:text-[27px] md:leading-[32px] xl:leading-[33px]">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[24px] text-ink-soft md:text-[16px] md:leading-[25px]">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-4 border-t-[1.5px] border-line pt-[24px] xl:flex-row xl:items-center xl:gap-[10px] xl:min-h-[62.5px]">
          <p className="text-[15px] font-medium text-muted">{worksWithLabel}</p>
          <ul className="flex flex-wrap gap-[10px]">
            {worksWith.map((name) => (
              <li
                key={name}
                className="inline-flex h-[37px] items-center rounded-pill border-tag border-ink bg-cream px-4 text-[14px] font-medium text-ink"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
