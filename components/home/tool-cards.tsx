import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { TOOL_CARDS } from '@/lib/content';
import { SOCIAL_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';
import { ToolVisual } from './tool-visual';

function NothingPublished() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-card-mobile border-2 border-ink bg-paper p-[24px] md:rounded-card md:p-10">
      <Image
        src="/avatar.png"
        alt=""
        width={72}
        height={72}
        sizes="72px"
        className="h-[72px] w-[72px] rounded-pill border-2 border-ink bg-avatar object-cover"
      />

      <h3 className="font-display text-[30px] leading-[37px] tracking-[-0.02em] text-ink md:text-[36px] md:leading-[44px]">
        Nothing here yet.
      </h3>
      <p className="max-w-[496px] text-[15px] leading-[25px] text-ink-soft md:text-[16px]">
        The first small tools land here as they ship. Follow along on GitHub to
        see them first.
      </p>

      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: 'primary' }),
          'h-[42px] px-[18px] text-[14px]'
        )}
      >
        Follow on GitHub
      </a>
    </div>
  );
}

export function ToolCards() {
  return (
    <section aria-label="Smaller tools" className="pb-14 md:pb-20 xl:pb-[120px]">
      <Container>
        {TOOL_CARDS.length === 0 ? (
          <NothingPublished />
        ) : (
          <div className="grid gap-[14px] md:grid-cols-2 md:gap-[24px]">
            {TOOL_CARDS.map((card) => (
              <article
                key={card.id}
                id={card.id}
                className="flex scroll-mt-[32px] flex-col gap-[10px] rounded-card-mobile border-2 border-ink bg-paper p-[24px] md:gap-[18px] md:rounded-card xl:p-[36px]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-pill border-2 border-ink font-mono text-[15px] font-medium text-ink md:flex">
                    {card.number}
                  </span>
                  <span className="text-[13px] font-semibold text-muted md:hidden">
                    {card.number} · {card.tag}
                  </span>
                  <span className="hidden md:block">
                    <Tag variant="idea">{card.tag}</Tag>
                  </span>
                </div>

                <h3 className="font-display font-display-card text-[28px] leading-[31px] tracking-[-0.02em] text-ink md:text-[32px] md:leading-[35px] xl:text-[40px] xl:leading-[44px]">
                  {card.title}
                </h3>

                <p className="text-[15px] leading-[23px] text-ink-soft md:hidden">
                  {card.bodyMobile}
                </p>
                <p className="hidden text-[16px] leading-[25px] text-ink-soft md:block">
                  {card.body}
                </p>

                <ToolVisual kind={card.visual} />
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
