import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export type GatewayRow = {
  name: string;
  note: string;
  href?: string;
};

export type LocalGatewaysProps = {
  eyebrow: string;
  heading: string;
  body: string;
  rows: readonly GatewayRow[];
};

export function LocalGateways({ eyebrow, heading, body, rows }: LocalGatewaysProps) {
  return (
    <section className="pb-12 md:pb-16 xl:pb-section">
      <Container>
        <div className="grid gap-[24px] rounded-[24px] border-2 border-ink bg-peach-soft p-[24px] md:rounded-card xl:grid-cols-[minmax(0,1fr)_500px] xl:items-center xl:gap-[56px] xl:p-card">
          <div className="flex flex-col gap-[18px]">
            <p className="font-mono text-[13px] font-semibold uppercase leading-[19.5px] tracking-[0.08em] text-rust xl:font-sans xl:leading-[17px]">
              {eyebrow}
            </p>
            <h2 className="font-display text-[36px] leading-[45px] tracking-[-0.02em] text-ink md:text-[50px] md:leading-[63px]">
              {heading}
            </h2>
            <p className="text-[16px] leading-[24px] text-ink-soft md:leading-[26px] xl:text-[18px] xl:leading-[28px] xl:text-ink">
              {body}
            </p>
          </div>

          <ul data-reveal-group="gateway" className="flex flex-col gap-[12px]">
            {rows.map((row) => {
              const content = (
                <>
                  <span className="text-[16px] font-semibold text-ink xl:text-[18px]">
                    {row.name}
                  </span>
                  <span className="text-[13px] text-ink-soft xl:text-[15px]">
                    {row.note}
                  </span>
                </>
              );
              const className = cn(
                'relative flex h-[72px] flex-col justify-center gap-[2px] rounded-[18px] bg-paper px-4 py-[14px] transition-colors duration-fast',
                'xl:h-[59px] xl:flex-row xl:items-center xl:justify-between xl:gap-4 xl:px-[20px] xl:py-4',
                row.href
                  ? 'border-[1.5px] border-dashed border-ink bg-transparent hover:bg-cream xl:h-[58px] xl:border-0'
                  : 'border-2 border-ink'
              );

              return (
                <li key={row.name}>
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                      <svg
                        aria-hidden
                        className="pointer-events-none absolute inset-0 hidden h-full w-full text-ink xl:block"
                        viewBox="0 0 500 58"
                        preserveAspectRatio="none"
                      >
                        <rect
                          x="0.75"
                          y="0.75"
                          width="498.5"
                          height="56.5"
                          rx="17.25"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="6 5"
                          className="motion-dash"
                        />
                      </svg>
                    </a>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
