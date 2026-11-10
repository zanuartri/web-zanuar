import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { ABOUT, HERO } from '@/lib/content';

export function About() {
  return (
    <section id="about" className="scroll-mt-6 border-y-2 border-ink bg-paper">
      <Container className="flex flex-col gap-[18px] py-12 xl:flex-row xl:items-center xl:gap-[72px] xl:py-7">
        <div className="h-[112px] w-[112px] shrink-0 overflow-hidden rounded-pill border-[2.5px] border-ink bg-avatar md:h-[160px] md:w-[160px]">
          <Image
            src="/avatar.png"
            alt={HERO.avatarAlt}
            width={220}
            height={220}
            sizes="(min-width: 1200px) 160px, (min-width: 768px) 160px, 112px"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-[18px] xl:gap-[20px]">
          <h2 className="font-display text-[34px] leading-[37px] tracking-[-0.02em] text-ink md:text-[44px] md:leading-[46px] xl:leading-[45px]">
            {ABOUT.title}
          </h2>
          <p className="max-w-[640px] text-[16px] leading-[26px] text-ink-soft md:text-[18px] md:leading-[29px] xl:text-[19px] xl:leading-[30px]">
            {ABOUT.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
