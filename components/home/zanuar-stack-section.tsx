import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ZANUAR_STACK } from '@/lib/content';
import { SOCIAL_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';

const nodeClass =
  'absolute flex h-[38px] items-center justify-center rounded-pill border-2 border-ink font-mono text-[13px] leading-[20px] text-ink';

function TeamWorkflowDiagram() {
  return (
    <figure
      role="img"
      aria-label={ZANUAR_STACK.diagramDescription}
      className="mt-[18px] w-full max-w-[515px] rounded-[20px] border-2 border-ink bg-paper px-5 py-[17px] xl:col-start-2 xl:row-start-1 xl:mt-7 xl:h-[250px] xl:justify-self-end"
    >
      <div aria-hidden>
        <p className="font-mono text-[12px] leading-[18px] text-ink-soft">
          {ZANUAR_STACK.diagramLabel}
        </p>

        <div className="relative mx-auto mt-[13px] h-[168px] w-full max-w-[266px]">
          <span className="absolute left-1/2 top-[38px] h-[78px] w-[2px] -translate-x-1/2 bg-connector" />
          <span className="absolute left-0 right-0 top-[116px] mx-auto h-[2px] w-[53.4%] bg-connector" />
          <span className="absolute left-[23.3%] top-[116px] h-[14px] w-[2px] -translate-x-1/2 bg-connector" />
          <span className="absolute left-[76.7%] top-[116px] h-[14px] w-[2px] -translate-x-1/2 bg-connector" />

          <span className={cn(nodeClass, 'left-1/2 top-0 w-[62.4%] -translate-x-1/2 bg-ink text-paper')}>
            Orchestrator
          </span>
          <span
            className={cn(nodeClass, 'left-1/2 top-[60px] w-[62.4%] -translate-x-1/2 bg-highlight')}
          >
            Repo manager
          </span>
          <span className={cn(nodeClass, 'left-0 top-[130px] w-[46.6%] bg-cream')}>Worker</span>
          <span className={cn(nodeClass, 'left-[53.4%] top-[130px] w-[46.6%] bg-cream')}>
            Reviewer
          </span>
        </div>
      </div>
    </figure>
  );
}

export function ZanuarStackSection() {
  return (
    <section id="zanuar-stack" className="scroll-mt-6 pb-[28px] xl:pb-[44px]">
      <Container>
        <div className="xl:grid xl:grid-cols-[500px_515px] xl:justify-between">
          <div className="flex flex-col">
            <p className="font-mono text-[13px] leading-[18px] text-ink">{ZANUAR_STACK.label}</p>
            <h2 className="font-display font-display-auto mt-[9px] text-[37px] font-[560] leading-[43px] tracking-normal text-ink xl:text-[46px] xl:leading-[51px]">
              {ZANUAR_STACK.title}
            </h2>
            <p className="mt-[28px] text-[20px] leading-[28px] text-ink xl:mt-[25px] xl:text-[22px]">
              {ZANUAR_STACK.name}
            </p>
            <p className="mt-[9px] max-w-[500px] text-[17px] leading-[25px] text-ink-soft xl:mt-[13px] xl:text-[18px] xl:leading-[27px]">
              {ZANUAR_STACK.pitch}
            </p>

            <div className="mt-[11px] flex flex-wrap gap-3 xl:mt-4">
              <a
                href={SOCIAL_LINKS.zanuarStackInstall}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: 'primary' }),
                  'h-[58px] px-[20px] text-[16px] md:px-[28px]'
                )}
              >
                Install the skills
              </a>
              <a
                href={SOCIAL_LINKS.zanuarStack}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'h-[58px] px-[20px] text-[16px] md:px-[28px]'
                )}
              >
                View on GitHub
              </a>
            </div>
          </div>

          <TeamWorkflowDiagram />

          <a
            href="#herdr"
            className="mt-[15px] block self-start text-[15px] leading-[21px] text-ink xl:col-start-1 xl:row-start-2 xl:mt-[26px]"
          >
            Working in Herdr? See{' '}
            <span className="underline decoration-2 underline-offset-4">herdr-rig</span>{' '}
            <span aria-hidden>→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
