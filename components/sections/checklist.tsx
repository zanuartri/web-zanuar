import { Container } from '@/components/ui/container';

export type ChecklistItem = {
  label: string;
  status: string;
};

export type ChecklistProps = {
  heading: string;
  /** Full list, 768 and up. */
  items: readonly ChecklistItem[];
  /** Shortened rows drawn in the mobile frame, below 768. */
  itemsMobile: readonly ChecklistItem[];
};

export function Checklist({ heading, items, itemsMobile }: ChecklistProps) {
  return (
    <section className="pb-14 md:pb-20 xl:pb-[120px]">
      <Container className="flex flex-col gap-[14px] md:gap-10 xl:grid xl:grid-cols-[minmax(0,1fr)_648px] xl:items-start xl:gap-24">
        <h2 className="font-display text-[36px] leading-[39px] tracking-[-0.02em] text-ink md:text-[52px] md:leading-[56px] xl:text-[64px] xl:leading-[66px]">
          {heading}
        </h2>

        <div className="rounded-card-mobile border-2 border-ink bg-paper px-[20px] py-[18px] md:rounded-card md:px-[32px] md:py-[12px]">
          <ul className="md:hidden">
            {itemsMobile.map((item) => (
              <li
                key={item.label}
                className="border-b-[1.5px] border-line py-[14px] first:pt-0 last:border-b-0 last:pb-0"
              >
                <p className="text-[15px] font-medium leading-6 text-ink">
                  <span className="mr-[10px]">{item.status}</span>
                  <span>{item.label}</span>
                </p>
              </li>
            ))}
          </ul>

          <ul className="hidden md:block">
            {items.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-4 border-b-[1.5px] border-line py-[20px] last:border-b-0"
              >
                <span
                  aria-hidden
                  className="h-[22px] w-[22px] shrink-0 rounded-pill border-2 border-ink"
                />
                <span className="flex-1 text-[17px] font-medium text-ink">
                  {item.label}
                </span>
                <span className="shrink-0 text-[14px] text-muted">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
