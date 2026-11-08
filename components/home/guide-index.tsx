import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { GUIDE_ENTRIES } from '@/lib/content';
import { cn } from '@/lib/utils';

export function GuideIndex() {
  return (
    <section id="guide" className="scroll-mt-6 pb-14 xl:pb-24">
      <Container>
        <div className="rounded-card-mobile border-2 border-ink bg-paper px-[20px] pb-3 pt-[24px] md:rounded-card md:px-10 md:pb-[28px] md:pt-[36px]">
          <p className="text-sm font-medium text-muted md:text-[15px]">In this guide</p>

          <ul className="mt-1 md:space-y-1">
            {GUIDE_ENTRIES.map((entry) => (
              <li
                key={entry.href}
                className="md:border-b-[1.5px] md:border-line md:last:border-b-0"
              >
                <a
                  href={entry.href}
                  className="group flex min-h-12 items-center gap-[20px] rounded-pill border-transparent transition-colors duration-fast hover:border-2 hover:border-ink hover:bg-cream active:border-ink active:bg-peach-soft md:min-h-0 md:border-b-2 md:border-line md:px-4 md:py-[18px]"
                >
                  <span
                    className={cn(
                      'hidden h-10 w-10 shrink-0 items-center justify-center rounded-pill border-2 border-ink font-mono text-[15px] font-medium md:flex',
                      entry.isProject
                        ? 'bg-ink text-paper'
                        : 'text-ink group-hover:bg-ink group-hover:text-paper'
                    )}
                  >
                    {entry.number}
                  </span>

                  <span className="flex-1 font-display font-display-row text-[18px] font-semibold leading-[48px] text-ink md:text-[28px] md:leading-tight xl:text-[30px]">
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
