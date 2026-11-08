'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Section reveal: fade in and rise 12px, once, when a section scrolls into
 * view. The animation itself is CSS (`motion/slow`, ease-out); Framer Motion
 * only supplies the in-view and reduced-motion signals CSS cannot.
 *
 * Anything already on screen at first paint stays untouched, so a section
 * below the fold is the only thing that can animate and the page reads whole
 * with scripting off.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const node = ref.current;
    if (!node) return;
    if (node.getBoundingClientRect().top >= window.innerHeight) setArmed(true);
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-slow ease-out motion-reduce:transition-none',
        armed && !inView && 'translate-y-3 opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
}
