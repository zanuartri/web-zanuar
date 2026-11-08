import { Container } from '@/components/ui/container';

export default function HomePage() {
  return (
    <main>
      <section className="pb-16 pt-14 xl:pb-24">
        <Container>
          <h1 className="max-w-[620px] font-display text-[52px] leading-[54px] tracking-[-0.025em] text-ink md:text-[76px] md:leading-[78px] xl:text-display">
            A field guide to coding with agents.
          </h1>
        </Container>
      </section>
    </main>
  );
}
