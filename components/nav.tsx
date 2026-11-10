'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SOCIAL_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'The guide' },
  { href: '/zrouter', label: 'ZRouter' },
  { href: '/herdr-rig', label: 'herdr-rig' },
  { href: '/#about', label: 'About' },
];

const OUTSIDE_LINKS = [
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.x, label: 'X' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => href === pathname;

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      menuButton?.focus();
    };
  }, [open]);

  const closeMenu = () => {
    dialogRef.current?.close();
  };

  return (
    <header>
      <Container wide className="flex h-[68px] items-center justify-between md:h-[84px]">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display font-wordmark text-[24px] font-semibold leading-none text-ink md:text-[28px]"
        >
          zanuar
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-[32px] md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'text-[16px] text-ink transition-colors duration-fast hover:text-ink-soft',
                isActive(href)
                  ? 'font-semibold underline decoration-2 underline-offset-4'
                  : 'font-medium'
              )}
            >
              {label}
            </Link>
          ))}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'h-11 px-[20px] text-[15px] leading-5'
            )}
          >
            GitHub
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-pill border-2 border-ink bg-paper transition-colors duration-fast hover:bg-peach-soft md:hidden"
        >
          <span aria-hidden className="h-[2px] w-4 rounded-full bg-ink" />
          <span aria-hidden className="h-[2px] w-4 rounded-full bg-ink" />
        </button>
      </Container>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-cream p-0 text-ink backdrop:bg-cream"
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex h-[68px] items-center justify-between px-[20px]">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-display font-wordmark text-[24px] font-semibold leading-none text-ink"
            >
              zanuar
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="flex h-11 w-11 items-center justify-center rounded-pill bg-ink text-paper transition-colors duration-fast hover:bg-ink-soft"
            >
              <span aria-hidden className="text-[24px] font-medium leading-none">
                ×
              </span>
            </button>
          </div>

          <nav aria-label="Menu" className="flex flex-col gap-2 px-[20px] pt-10">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive(href) ? 'page' : undefined}
                className={cn(
                  'font-display text-[44px] font-semibold leading-[60px] text-ink',
                  isActive(href) && 'underline decoration-2 underline-offset-4'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-2 px-[20px] pb-[32px]">
            <div className="flex gap-[20px] text-[16px] font-semibold text-ink">
              {OUTSIDE_LINKS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href || undefined}
                  target={href ? '_blank' : undefined}
                  rel={href ? 'noopener noreferrer' : undefined}
                  className="transition-colors duration-fast hover:text-ink-soft"
                >
                  {label} ↗
                </a>
              ))}
            </div>
            <a
              href={SOCIAL_LINKS.email ? `mailto:${SOCIAL_LINKS.email}` : undefined}
              className="flex h-[80px] items-center gap-[14px] rounded-pill border-2 border-ink bg-paper p-[14px] text-[16px] font-semibold text-ink transition-all duration-fast ease-out hover:-translate-y-0.5 hover:bg-peach-soft hover:shadow-[0_4px_0_var(--color-peach)] active:translate-y-0 active:shadow-none"
            >
              <Image
                src="/avatar.png"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-pill border-2 border-ink object-cover"
              />
              Say hi by email
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
