import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { ZROUTER } from '@/lib/content';
import { SOCIAL_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';
import { ZRouterDemoFrame } from './demo-boundary';

export function ZRouterSection() {
  return (
    <section id="zrouter" className="scroll-mt-6 pb-14 pt-[24px] md:pb-20 xl:pb-section xl:pt-0">
      <Container className="flex flex-col gap-[18px] xl:gap-10">
        <div className="flex flex-col gap-[18px] xl:grid xl:grid-cols-[minmax(0,1fr)_440px] xl:items-end xl:gap-24">
          <div className="flex flex-col gap-[18px] xl:min-w-0 xl:gap-[20px]">
            <span className="inline-flex w-fit items-center rounded-pill border-tag border-ink bg-peach-soft px-3 py-1.5 text-[13px] font-semibold text-ink xl:hidden">
              {ZROUTER.number} · {ZROUTER.status}
            </span>
            <div className="hidden xl:flex xl:flex-col xl:gap-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-ink font-mono text-[18px] font-medium text-paper">
                {ZROUTER.number}
              </span>
              <Tag variant="in-the-works" className="w-fit">
                {ZROUTER.status}
              </Tag>
            </div>
            <h2 className="font-display text-[34px] leading-[36px] tracking-[-0.02em] text-ink md:text-[59px] md:leading-[62px]">
              {ZROUTER.title}
            </h2>
          </div>

          <p className="max-w-[440px] text-[16px] leading-[25px] text-ink-soft md:hidden">
            {ZROUTER.leadMobile}
          </p>
          <p className="hidden max-w-[440px] text-[18px] leading-[28px] text-ink-soft md:block">
            {ZROUTER.lead}
          </p>
        </div>

        <ZRouterDemoFrame />

        <div className="hidden xl:flex xl:items-center xl:justify-between xl:gap-6">
          <ul className="flex max-w-[798px] flex-wrap gap-2">
            {ZROUTER.features.map((feature, index) => (
              <li
                key={feature}
                className={cn(
                  'inline-flex h-[37px] items-center rounded-pill border-tag border-ink px-4 text-[14px] font-medium text-ink',
                  index === 0 ? 'bg-peach-soft' : 'bg-paper'
                )}
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'primary' }),
                'h-[53px] px-[24px] text-[16px]'
              )}
            >
              Follow on GitHub
            </a>
            <a
              href="/zrouter"
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'h-[53px] px-[24px] text-[16px]'
              )}
            >
              How it will work
            </a>
          </div>
        </div>

        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: 'primary' }),
            'h-[54px] w-full text-[17px] md:max-w-[350px] xl:hidden'
          )}
        >
          Follow on GitHub
        </a>
      </Container>
    </section>
  );
}
