import { Container } from '@/components/ui/container';

export type DarkCalloutProps = {
  heading: string;
  body: string;
  /** Shorter copy used below 768, matching the mobile frame. */
  bodyMobile?: string;
  listLabel: string;
  items: readonly string[];
};

export function DarkCallout({
  heading,
  body,
  bodyMobile,
  listLabel,
  items,
}: DarkCalloutProps) {
  return (
    <section className="pb-12 md:pb-16 xl:pb-section">
      <Container>
        <div className="rounded-card-mobile bg-ink px-[24px] py-[28px] md:rounded-card md:p-12 xl:grid xl:min-h-[358.5px] xl:grid-cols-2 xl:gap-[72px] xl:p-14">
          <div className="flex flex-col gap-[14px] md:gap-[18px]">
            <h2 className="font-display text-[30px] leading-[38px] tracking-[-0.02em] text-paper md:text-[37px] md:leading-[47px]">
              {heading}
            </h2>
            <p className="max-w-[500px] text-[15px] leading-[24px] text-line md:text-[16px] md:leading-[26px] xl:text-[17px] xl:leading-[27px]">
              {bodyMobile ? (
                <>
                  <span className="md:hidden">{bodyMobile}</span>
                  <span className="hidden md:inline">{body}</span>
                </>
              ) : (
                body
              )}
            </p>
          </div>

          <div className="mt-[28px] hidden flex-col gap-[10px] md:flex xl:mt-0">
            <p className="text-[14px] font-medium leading-[21px] text-faint xl:leading-[18px]">{listLabel}</p>
            <ul className="flex flex-col gap-[10px]">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-[14px] border-b-[1.5px] border-ink-soft py-3 last:border-b-0"
                >
                  <span
                    aria-hidden
                    className="h-[2.5px] w-[14px] shrink-0 rounded-[2px] bg-peach"
                  />
                  <span className="text-[15px] font-medium leading-[22.5px] text-paper md:text-[17px] md:leading-[25.5px] xl:leading-[22px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
