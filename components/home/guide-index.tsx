import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { GUIDE_ENTRIES, GUIDE_SUMMARY } from '@/lib/content';
import { cn } from '@/lib/utils';

export function GuideIndex() {
  return (
    <section id="guide" className="scroll-mt-6 pb-14 xl:pb-section">
      <Container>
        <div className="rounded-card-mobile border-2 border-ink bg-paper px-[20px] pb-3 pt-[24px] md:rounded-card md:px-10 md:pb-[28px] md:pt-[36px] xl:flex xl:items-center xl:gap-12 xl:p-card">
          <div className="hidden xl:flex xl:w-[280px] xl:shrink-0 xl:flex-col xl:gap-3">
            <p className="text-[15px] font-medium leading-[20px] text-muted">In this guide</p>
            <p className="font-display text-[34px] font-semibold leading-[43px] text-ink">
              Where agents get stuck.
            </p>
            <p className="text-[16px] leading-[25px] text-ink-soft">{GUIDE_SUMMARY}</p>
          </div>

          <p className="text-sm font-medium text-muted md:text-[15px] xl:hidden">In this guide</p>

          <ul
            data-reveal-group=""
            className="mt-0 md:mt-1 md:space-y-1 xl:mt-0 xl:min-w-0 xl:flex-1 xl:space-y-0"
          >
            {GUIDE_ENTRIES.map((entry, index) => {
              const isStack = entry.metaStyle === 'accent';
              const filledBadge = index < 2;

              return (
                <li
                  key={entry.href}
                  className={cn(
                    'xl:border-t-[1.5px] xl:border-line',
                    index < 2 && 'xl:border-t-0'
                  )}
                >
                  <a
                    href={entry.href}
                    className={cn(
                      'group flex min-h-12 items-center gap-[11px] rounded-pill border-2 border-transparent transition-colors duration-fast ease-out hover:border-ink hover:bg-cream active:border-ink active:bg-peach-soft md:px-4 md:py-[18px] xl:rounded-none xl:border-0 xl:px-0 xl:py-[11px] xl:hover:bg-transparent xl:active:bg-transparent',
                      !isStack && 'gap-[20px]'
                    )}
                  >
                    <span
                      className={cn(
                        'h-[32px] w-[32px] shrink-0 items-center justify-center rounded-pill border-2 border-ink font-mono text-[13px] font-medium transition-colors duration-fast ease-out md:flex xl:h-[34px] xl:w-[34px] xl:text-[15px]',
                        isStack ? 'flex' : 'hidden',
                        filledBadge
                          ? 'bg-ink text-paper'
                          : 'text-ink group-hover:bg-ink group-hover:text-paper group-active:bg-ink group-active:text-paper'
                      )}
                    >
                      {entry.number}
                    </span>

                    <span
                      className={cn(
                        'flex-1 font-display font-display-row text-ink transition-transform duration-fast ease-out xl:group-hover:translate-x-1',
                        isStack
                          ? 'text-[16px] font-normal leading-[27px] md:text-[20px] md:font-normal md:leading-[27px]'
                          : 'text-[18px] font-semibold leading-[44px] md:text-[21px] md:leading-tight'
                      )}
                    >
                      {!isStack && <span className="mr-3 md:hidden">{entry.number}</span>}
                      {entry.title}
                    </span>

                    {entry.metaStyle === 'accent' ? (
                      <span className="hidden h-[32px] shrink-0 items-center whitespace-nowrap rounded-pill bg-highlight px-[14px] font-mono text-[13px] leading-[18px] text-ink md:inline-flex">
                        {entry.meta}
                      </span>
                    ) : entry.metaStyle === 'tag' ? (
                      <span className="hidden shrink-0 md:block">
                        <Tag variant="in-the-works">{entry.meta}</Tag>
                      </span>
                    ) : (
                      <span className="hidden shrink-0 text-[15px] font-medium text-muted md:block">
                        {entry.meta}
                      </span>
                    )}

                    <span
                      aria-hidden
                      className="hidden h-[18px] w-[18px] shrink-0 translate-x-2 items-center justify-center text-ink opacity-0 transition-[opacity,transform] duration-fast ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 xl:flex"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M3 9h12m0 0-4.5-4.5M15 9l-4.5 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
