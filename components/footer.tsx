import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SOCIAL_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';

const COPYRIGHT = 'Zanuar, November 2026';

export function Footer() {
  const emailHref = SOCIAL_LINKS.email
    ? `mailto:${SOCIAL_LINKS.email}`
    : undefined;
  const xHref = SOCIAL_LINKS.x || undefined;

  return (
    <footer className="pb-10 pt-14 md:pb-16 md:pt-[88px]">
      <Container>
        <h2 className="max-w-[760px] font-display text-[36px] leading-[39px] tracking-[-0.02em] text-ink md:text-[50px] md:leading-[52px]">
          If you build with agents too, come say hi.
        </h2>

        <div className="mt-[22px] flex flex-col gap-[22px] md:mt-12 md:flex-row md:items-center md:gap-3">
          <a
            href={emailHref}
            className={cn(
              buttonVariants({ variant: 'primary' }),
              'h-[54px] w-full border-0 px-[24px] text-[17px] leading-[22px] md:h-[49px] md:w-auto md:text-[16px] md:leading-[21px]'
            )}
          >
            Email me
          </a>

          <div className="hidden items-center gap-3 md:flex md:flex-1">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'h-[53px] px-[24px] text-[16px] leading-[21px]'
              )}
            >
              GitHub
            </a>
            <a
              href={xHref}
              target={xHref ? '_blank' : undefined}
              rel={xHref ? 'noopener noreferrer' : undefined}
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'h-[53px] px-[24px] text-[16px] leading-[21px]'
              )}
            >
              X
            </a>
            <span className="ml-auto text-[15px] text-muted">{COPYRIGHT}</span>
          </div>

          <div className="flex items-center gap-5 text-[15px] text-muted md:hidden">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-fast hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={xHref}
              target={xHref ? '_blank' : undefined}
              rel={xHref ? 'noopener noreferrer' : undefined}
              className="transition-colors duration-fast hover:text-ink"
            >
              X
            </a>
            <span>{COPYRIGHT}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
