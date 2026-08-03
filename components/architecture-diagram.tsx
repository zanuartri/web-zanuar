'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function ArchitectureDiagram({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <div ref={ref} className="[perspective:1400px]">
      <motion.div
        style={{ rotateX, y, transformStyle: 'preserve-3d' }}
        className="overflow-hidden rounded-xl border-2 border-ink shadow-[8px_8px_0_0_theme(colors.ink)]"
      >
        <Image src={src} alt={alt} width={1200} height={675} className="w-full" />
      </motion.div>
    </div>
  );
}
