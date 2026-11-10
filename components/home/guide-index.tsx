import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { GUIDE_ENTRIES } from '@/lib/content';
import { cn } from '@/lib/utils';

export function GuideIndex() {
  return (
    <section id="guide" className="scroll-mt-6 pb-14 xl:pb-section">
      <Container>
        <div className="rounded-card-mobile border-2 border-ink bg-paper px-[20px] pb-3 pt-[24px] md:rounded-card md:px-10 md:pb-[28px] md:pt-[36px] xl:flex xl:items-center xl:gap-12 xl:p-card">
          <div className="hidden xl:flex xl:w-[280px] xl:shrink-0 xl:flex-col xl:gap-3">
            <p className="text-[15px] font-medium leading-[20px] text-muted">In this guide</p>
            <p className="font-display text-[34px] font-semibold leading-[38px] text-ink">
              Where agents get stuck.
            </p>
            <p className="text-[16px] leading-[25px] text-ink-soft">
              Five moments that break a coding session, and the small tool I
              build for each one.
            </p>
          </div>

          <p className="text-sm font-medium text-muted md:text-[15px] xl:hidden">In this guide</p>

          <ul className="mt-1 md:space-y-1 xl:mt-0 xl:min-w-0 xl:flex-1 xl:space-y-0">
            {GUIDE_ENTRIES.map((entry) => (
              <li
                key={entry.href}
                className="md:border-b-[1.5px] md:border-line md:last:border-b-0"
              >
                <a
                  href={entry.href}
                  className="group flex min-h-12 items-center gap-[20px] rounded-pill border-2 border-transparent transition-colors duration-fast ease-out hover:border-ink hover:bg-cream active:border-ink active:bg-peach-soft md:min-h-0 md:px-4 md:py-[18px] xl:rounded-none xl:border-0 xl:px-0 xl:py-[11px] xl:hover:bg-transparent xl:active:bg-transparent"
                >
                  <span
                    className={cn(
                      'hidden h-10 w-10 shrink-0 items-center justify-center rounded-pill border-2 border-ink font-mono text-[15px] font-medium transition-colors duration-fast ease-out md:flex xl:h-[34px] xl:w-[34px]',
                      entry.isProject
                        ? 'bg-ink text-paper'
                        : 'text-ink group-hover:bg-ink group-hover:text-paper group-active:bg-ink group-active:text-paper'
                    )}
                  >
                    {entry.number}
                  </span>

                  <span className="flex-1 font-display font-display-row text-[18px] font-semibold leading-[48px] text-ink transition-transform duration-fast ease-out md:text-[27px] md:leading-tight xl:text-[21px] xl:leading-[26px] xl:group-hover:translate-x-1">
                    <span className="mr-3 md:hidden">{entry.number}</span>
                    {entry.title}
                  </span>

                  {entry.isProject ? (
                    <span className="hidden md:block">
                      <Tag variant="in-the-works">{entry.meta}</Tag>
                    </span>
                  ) : (
                    <span className="hidden text-[15px] font-medium text-muted md:block">
                      {entry.meta}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
