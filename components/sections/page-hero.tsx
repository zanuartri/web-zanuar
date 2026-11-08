import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

export type HeroAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

export type PageHeroProps = {
  tag: string;
  title: string;
  lead: string;
  /** Shorter lead used below 768, matching the mobile frame. */
  leadMobile?: string;
  actions: readonly HeroAction[];
};

export function PageHero({
  tag,
  title,
  lead,
  leadMobile,
  actions,
}: PageHeroProps) {
  return (
    <section className="pb-[40px] pt-[20px] md:pb-[48px] md:pt-[40px] xl:pb-[56px] xl:pt-[72px]">
      <Container className="flex flex-col gap-[18px] md:gap-[24px] xl:gap-[26px]">
        <nav
          aria-label="Breadcrumb"
          className="text-[15px] leading-[20px] font-medium text-muted underline underline-offset-4"
        >
          <Link
            href="/"
            className="transition-colors duration-fast hover:text-ink"
          >
            The guide
          </Link>
          <span aria-hidden className="whitespace-pre">
            {'  ›  '}
          </span>
          <span>Projects</span>
          <span aria-hidden className="whitespace-pre">
            {'  ›  '}
          </span>
          <span aria-current="page">{title}</span>
        </nav>

        <div className="flex flex-col gap-[18px] md:gap-[24px] xl:flex-row xl:items-end xl:justify-between xl:gap-24">
          <div className="flex min-w-0 flex-col gap-[18px] md:gap-[24px] xl:max-w-[686px] xl:gap-[22px]">
            <Tag
              variant="open-source"
              className="w-fit text-[13px] px-3 py-[6px] md:text-[14px] md:px-[14px] md:py-[7px]"
            >
              {tag}
            </Tag>

            <h1 className="font-display text-[65px] leading-[65px] tracking-[-0.03em] text-ink md:text-[117px] md:leading-[109px]">
              {title}
            </h1>

            <p className="max-w-[560px] text-[18px] leading-[27px] text-ink-soft md:text-[20px] md:leading-[30px] xl:text-[22px] xl:leading-[33px]">
              {leadMobile ? (
                <>
                  <span className="md:hidden">{leadMobile}</span>
                  <span className="hidden md:inline">{lead}</span>
                </>
              ) : (
                lead
              )}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3 xl:shrink-0">
            {actions.map((action, index) => {
              const external = action.href.startsWith('http');
              const className = cn(
                buttonVariants({ variant: action.variant ?? 'primary' }),
                'h-[54px] w-full md:h-[58px] md:w-auto',
                index > 0 && 'hidden md:inline-flex'
              );

              return external ? (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {action.label}
                </a>
              ) : (
                <Link key={action.label} href={action.href} className={className}>
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
