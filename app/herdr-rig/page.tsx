import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/reveal';
import { Checklist } from '@/components/sections/checklist';
import { DarkCallout } from '@/components/sections/dark-callout';
import { NumberedSteps } from '@/components/sections/numbered-steps';
import { PageHero } from '@/components/sections/page-hero';
import { PromiseCards } from '@/components/sections/promise-cards';
import { Screenshot } from '@/components/sections/screenshot';
import { Showcase } from '@/components/sections/showcase';
import { Container } from '@/components/ui/container';
import { HERDR_RIG } from '@/lib/herdr-rig';

export const metadata: Metadata = {
  title: 'herdr-rig · zanuar',
  description:
    'One manager agent, many coding agents, one terminal workspace. You talk to one session; it does the juggling.',
};

export default function HerdrRigPage() {
  const { hero, demo, promises, callout, steps, board, tested } = HERDR_RIG;

  return (
    <main>
      <PageHero
        tag={hero.tag}
        title={hero.title}
        lead={hero.lead}
        leadMobile={hero.leadMobile}
        actions={[hero.primary, { ...hero.secondary, variant: 'secondary' }]}
      />

      <Reveal>
        <section className="pb-12 md:pb-16 xl:pb-section">
          <Container>
            <Screenshot
              src={demo.src}
              src2x={demo.src2x}
              src2xWidth={demo.src2xWidth}
              sizes="(min-width: 1200px) 1080px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 40px)"
              mobileSrc={demo.mobileSrc}
              width={demo.width}
              height={demo.height}
              alt={demo.alt}
              aspectClassName="aspect-[820/470] md:aspect-[1184/743] xl:aspect-[1080/678]"
              priority
            />
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <PromiseCards heading={promises.heading} items={promises.items} />
      </Reveal>

      <Reveal>
        <DarkCallout
          heading={callout.heading}
          body={callout.body}
          bodyMobile={callout.bodyMobile}
          listLabel={callout.listLabel}
          items={callout.items}
        />
      </Reveal>

      <Reveal className="hidden md:block">
        <NumberedSteps
          id="how"
          heading={steps.heading}
          items={steps.items}
          worksWithLabel={steps.worksWithLabel}
          worksWith={steps.worksWith}
        />
      </Reveal>

      <Reveal className="hidden md:block">
        <Showcase
          heading={board.heading}
          body={board.body}
          src={board.src}
          src2x={board.src2x}
          src2xWidth={board.src2xWidth}
          sizes="(min-width: 1200px) 1184px, calc(100vw - 96px)"
          width={board.width}
          height={board.height}
          alt={board.alt}
          aspectClassName="aspect-[1184/680]"
        />
      </Reveal>

      <Reveal>
        <Checklist
          heading={tested.heading}
          items={tested.items}
          itemsMobile={tested.itemsMobile}
        />
      </Reveal>
    </main>
  );
}
