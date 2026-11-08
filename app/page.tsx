import { About } from '@/components/home/about';
import { GuideIndex } from '@/components/home/guide-index';
import { Hero } from '@/components/home/hero';
import { ToolCards } from '@/components/home/tool-cards';
import { ZRouterSection } from '@/components/home/zrouter-section';
import { Reveal } from '@/components/motion/reveal';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Reveal>
        <GuideIndex />
      </Reveal>
      <Reveal>
        <ZRouterSection />
      </Reveal>
      <Reveal>
        <ToolCards />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
    </main>
  );
}
