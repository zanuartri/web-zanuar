'use client';

import { motion, type Variants } from 'framer-motion';
import { AgentConsole } from '@/components/agent-console';
import { Badge } from '@/components/ui/badge';

const skills = ['LangGraph', 'LangChain', 'RAG', 'Agent Evals', 'Test Automation'];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_420px]">
      <motion.section variants={container} initial="hidden" animate="show" className="space-y-7">
        <motion.p
          variants={item}
          className="inline-flex items-center gap-2 border-2 border-ink bg-lime px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-ink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ink animate-blink" />
          QA Engineer &rarr; AI Agent Engineer
        </motion.p>

        <motion.h1
          variants={item}
          className="text-balance font-display text-5xl font-medium leading-[1.04] text-ink sm:text-7xl"
        >
          I build agents that{' '}
          <span className="relative whitespace-nowrap">
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 -z-10 h-[0.4em] -rotate-1 bg-signal/25"
            />
            act
          </span>
          , not just <span className="italic text-ink/40">chat.</span>
        </motion.h1>

        <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-ink/85">
          <span className="mr-1 inline-flex items-center rounded-md border-2 border-ink bg-lime px-1.5 py-0.5 font-mono text-base font-semibold text-ink">
            6+
          </span>
          years automating QA, now spent building AI agents: systems that
          plan, call tools, and get evaluated like production code, not
          demos. Most recently, I led an AI agent platform for QA at my
          company, taking it from idea to something the team runs daily.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </motion.div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <AgentConsole />
      </motion.div>
    </div>
  );
}
