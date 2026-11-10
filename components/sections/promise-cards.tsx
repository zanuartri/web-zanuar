import { Container } from '@/components/ui/container';

export type PromiseCard = {
  title: string;
  body: string;
  /** Shorter copy used below 768, matching the mobile frame. */
  bodyMobile?: string;
};

export type PromiseCardsProps = {
  heading: string;
  items: readonly PromiseCard[];
};

export function PromiseCards({ heading, items }: PromiseCardsProps) {
  return (
    <section className="pb-12 md:pb-16 xl:pb-section">
      <Container className="flex flex-col gap-[14px] md:gap-10">
        <h2 className="font-display text-[36px] leading-[39px] tracking-[-0.02em] text-ink md:text-[50px] md:leading-[52px]">
          {heading}
        </h2>

        <ul className="grid gap-[14px] xl:grid-cols-3 xl:gap-[24px]">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 rounded-card-mobile border-2 border-ink bg-paper p-[22px] md:p-card xl:gap-[14px] xl:rounded-card xl:p-card"
            >
              <h3 className="font-display text-[26px] leading-[32px] text-ink md:text-[31px] md:leading-[35px]">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[23px] text-ink-soft md:text-[16px] md:leading-[25px]">
                {item.bodyMobile ? (
                  <>
                    <span className="md:hidden">{item.bodyMobile}</span>
                    <span className="hidden md:inline">{item.body}</span>
                  </>
                ) : (
                  item.body
                )}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
