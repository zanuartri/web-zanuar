import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { HERO } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section className="pb-14 pt-4 xl:pb-40 xl:pt-24">
      <Container className="flex flex-col gap-[22px] md:gap-[28px] xl:flex-row xl:items-center xl:justify-between xl:gap-[6%]">
        <div className="relative order-first h-[300px] w-[350px] shrink-0 xl:order-last xl:aspect-[470/560] xl:h-auto xl:w-[39.7%]">
          <div className="motion-avatar absolute left-[47px] top-[23px] h-[260px] w-[260px] overflow-hidden rounded-[28px] border-[2.5px] border-ink bg-avatar xl:left-[6.8%] xl:top-[10.5%] xl:h-auto xl:w-[91.5%] xl:aspect-square xl:rounded-[36px]">
            <Image
              src="/avatar.png"
              alt={HERO.avatarAlt}
              width={430}
              height={430}
              priority
              sizes="(min-width: 1200px) 430px, 260px"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="motion-bubble absolute right-[32px] top-[8px] rounded-[20px] border-2 border-ink bg-paper px-4 py-[9px] text-[15px] font-semibold text-ink xl:right-[15.4%] xl:top-[3.9%] xl:rounded-[22px] xl:px-[20px] xl:py-3 xl:text-[17px]">
            {HERO.bubble}
          </div>

          <span
            aria-hidden
            className="absolute left-0 top-[470px] hidden h-[22px] w-[22px] rounded-pill bg-peach xl:block xl:top-[84%]"
          />
          <span
            aria-hidden
            className="absolute left-[30px] top-[484px] hidden h-3 w-3 rounded-pill bg-peach-soft xl:left-[6.4%] xl:block xl:top-[86.4%]"
          />
        </div>

        <div className="flex w-full flex-col gap-[22px] xl:w-auto xl:min-w-0 xl:max-w-[618px] xl:flex-1 xl:gap-[28px]">
          <h1 className="font-display text-[45px] leading-[46px] tracking-[-0.025em] text-ink md:text-[75px] md:leading-[77px]">
            {HERO.title}
          </h1>
          <p className="max-w-[500px] text-[18px] leading-[27px] text-ink-soft md:text-[21px] md:leading-[32px]">
            {HERO.lead}
          </p>
          <div className="flex flex-col gap-[22px] md:flex-row md:gap-3.5 md:pt-1.5">
            <a
              href="#zrouter"
              className={cn(buttonVariants({ variant: 'primary' }), 'w-full md:w-auto')}
            >
              Meet ZRouter
            </a>
            <a
              href="#guide"
              className={cn(buttonVariants({ variant: 'secondary' }), 'w-full md:w-auto')}
            >
              Read the guide
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
