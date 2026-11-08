import { About } from '@/components/home/about';
import { GuideIndex } from '@/components/home/guide-index';
import { Hero } from '@/components/home/hero';
import { ToolCards } from '@/components/home/tool-cards';
import { ZRouterSection } from '@/components/home/zrouter-section';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <GuideIndex />
      <ZRouterSection />
      <ToolCards />
      <About />
    </main>
  );
}
