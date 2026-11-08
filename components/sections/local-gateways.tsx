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
    <section className="pb-12 md:pb-16 xl:pb-[88px]">
      <Container>
        <div className="grid gap-[24px] rounded-card-mobile border-2 border-ink bg-peach-soft p-[24px] md:rounded-card xl:grid-cols-2 xl:items-center xl:gap-[56px] xl:p-[48px]">
          <div className="flex flex-col gap-[18px]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
              {eyebrow}
            </p>
            <h2 className="font-display text-[36px] leading-[40px] tracking-[-0.02em] text-ink md:text-[50px] md:leading-[54px]">
              {heading}
            </h2>
            <p className="text-[16px] leading-[24px] text-ink-soft md:leading-[26px] xl:text-[18px] xl:leading-[28px]">
              {body}
            </p>
          </div>

          <ul className="flex flex-col gap-[24px] xl:gap-[12px]">
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
                'flex h-[72px] flex-col justify-center gap-[2px] rounded-[18px] border-2 border-ink bg-paper px-[18px] py-[14px] transition-colors duration-fast',
                'xl:h-[59px] xl:flex-row xl:items-center xl:justify-between xl:gap-4 xl:px-[22px] xl:py-0',
                row.href
                  ? 'border-dashed border-[1.5px] hover:bg-cream'
                  : undefined
              );

              return (
                <li key={row.name}>
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
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
