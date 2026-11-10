import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-68px)] items-center pb-[84px] md:min-h-[calc(100svh-84px)]">
      <Container className="flex flex-col items-center gap-[28px] text-center">
        <div className="h-[200px] w-[200px] shrink-0 overflow-hidden rounded-pill border-[2.5px] border-ink bg-avatar">
          <Image
            src="/avatar.png"
            alt=""
            width={200}
            height={200}
            sizes="200px"
            className="h-full w-full object-cover"
          />
        </div>

        <span className="rounded-pill border-tag border-ink bg-peach-soft px-[14px] py-[7px] font-mono text-[14px] font-medium leading-[18px] text-ink">
          404
        </span>

        <h1 className="font-display text-[40px] leading-[50px] tracking-[-0.025em] text-ink md:text-[64px] md:leading-[80px] xl:text-[80px] xl:leading-[100px]">
          This page took a nap.
        </h1>

        <p className="max-w-[640px] text-[18px] leading-[27px] text-ink-soft md:text-[20px] md:leading-[30px]">
          The link might be old, or the page moved. The guide is still right
          here.
        </p>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'primary' }),
              'h-[54px] w-full md:h-[58px] md:w-auto'
            )}
          >
            Back to the guide
          </Link>
          <Link
            href="/zrouter"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'h-[54px] w-full md:h-[58px] md:w-auto'
            )}
          >
            Meet ZRouter
          </Link>
        </div>
      </Container>
    </main>
  );
}
