import type { Metadata } from 'next';
import { ZRouterDemoFrame } from '@/components/home/demo-boundary';
import { Reveal } from '@/components/motion/reveal';
import { Checklist } from '@/components/sections/checklist';
import { DarkCallout } from '@/components/sections/dark-callout';
import { LiveMap } from '@/components/sections/live-map';
import { LocalGateways } from '@/components/sections/local-gateways';
import { NumberedSteps } from '@/components/sections/numbered-steps';
import { PageHero } from '@/components/sections/page-hero';
import { PromiseCards } from '@/components/sections/promise-cards';
import { Container } from '@/components/ui/container';
import { ZROUTER } from '@/lib/zrouter';

export const metadata: Metadata = {
  title: 'ZRouter · zanuar',
  description:
    'A router for coding agents that switches providers without losing your cache or context.',
};

export default function ZRouterPage() {
  const { hero, gateways, promises, callout, steps, dashboard, roadmap } = ZROUTER;

  return (
    <main>
      <PageHero
        tag={hero.tag}
        title={hero.title}
        lead={hero.lead}
        actions={[hero.primary, { ...hero.secondary, variant: 'secondary' }]}
      />

      <Reveal>
        <section className="pb-12 md:pb-16 xl:pb-[88px]">
          <Container>
            <ZRouterDemoFrame />
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <LocalGateways
          eyebrow={gateways.eyebrow}
          heading={gateways.heading}
          body={gateways.body}
          rows={gateways.rows}
        />
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
        <section className="py-16 md:py-20 xl:py-[88px]">
          <Container>
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-24">
              <h2 className="max-w-[640px] font-display text-[50px] leading-[54px] tracking-[-0.02em] text-ink">
                {dashboard.heading}
              </h2>
              <p className="max-w-[440px] text-[16px] leading-[25px] text-ink-soft xl:text-[17px] xl:leading-[27px]">
                {dashboard.body}
              </p>
            </div>

            <div className="mt-10">
              <LiveMap />
            </div>

            <p className="mt-10 text-[15px] leading-[22px] text-ink-soft">
              {dashboard.caption}
            </p>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <div id="roadmap" className="scroll-mt-6">
          <Checklist
            heading={roadmap.heading}
            items={roadmap.items}
            itemsMobile={roadmap.itemsMobile}
            accentFirst
          />
        </div>
      </Reveal>
    </main>
  );
}
