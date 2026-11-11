'use client';

import { useEffect, useRef, useState, type JSX, type Ref } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import type { ToolCard } from '@/lib/content';
import { cn } from '@/lib/utils';

const base =
  'relative mt-auto hidden h-[122px] w-full flex-col items-center justify-center overflow-hidden rounded-[14.4px] bg-cream md:flex';

const SKILL_LINES = [
  'explain before you change',
  'run the tests first',
  'keep each change small',
];

const PLUGINS = [
  { label: 'agent', tone: 'bg-white' },
  { label: 'plugin', tone: 'bg-peach-soft', delay: 'tool-delay-1' },
  { label: 'your tools', tone: 'bg-white', delay: 'tool-delay-2' },
];

const CLI_STEPS = [
  { label: 'lint', delay: '' },
  { label: 'test', delay: 'tool-delay-1' },
  { label: 'build', delay: 'tool-delay-2' },
  { label: 'tag', delay: 'tool-delay-3' },
  { label: 'push', delay: 'tool-delay-4' },
];

type VisualProps = {
  armed: boolean;
  play: boolean;
  nodeRef?: Ref<HTMLDivElement>;
};

function SkillsVisual({ armed, play, nodeRef }: VisualProps) {
  return (
    <div
      ref={nodeRef}
      className={base}
      data-tool-visual=""
      data-tool-armed={armed ? 'true' : undefined}
      data-tool-play={play ? 'true' : undefined}
    >
      <div className="w-[216px] -rotate-2 rounded-[10px] border-[1.5px] border-ink bg-paper px-[13px] py-[11px]">
        <p className="font-mono text-[9.5px] font-medium text-peach">my-rules</p>
        <p className="mt-[6px] font-mono text-[9.5px] leading-[16px] text-ink">
          {SKILL_LINES.map((line, index) => (
            <span
              key={line}
              className={cn('tool-type-line block', index > 0 && `tool-delay-${index}`)}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
      <span className="absolute right-[32px] top-[10px] text-[9px] text-muted">example</span>
    </div>
  );
}

function PluginsVisual({ armed, play, nodeRef }: VisualProps) {
  return (
    <div
      ref={nodeRef}
      className={cn(base, 'flex-row')}
      data-tool-visual=""
      data-tool-armed={armed ? 'true' : undefined}
      data-tool-play={play ? 'true' : undefined}
    >
      {PLUGINS.map((pill, index) => (
        <span key={pill.label} className="flex items-center">
          {index > 0 ? <span aria-hidden className="h-[2px] w-[26px] bg-ink" /> : null}
          <span
            className={cn(
              'relative flex h-[33px] items-center rounded-pill border-[1.5px] border-ink px-[13px] font-mono text-[10px] font-medium text-ink',
              pill.tone
            )}
          >
            {pill.label}
            <span
              aria-hidden
              className={cn(
                'tool-pulse pointer-events-none absolute -inset-1 rounded-pill border-[1.5px] border-peach opacity-0',
                pill.delay
              )}
            />
          </span>
        </span>
      ))}
    </div>
  );
}

function CliVisual({ armed, play, nodeRef }: VisualProps) {
  return (
    <div
      ref={nodeRef}
      className={cn(base, 'gap-[13px] px-6 py-4')}
      data-tool-visual=""
      data-tool-armed={armed ? 'true' : undefined}
      data-tool-play={play ? 'true' : undefined}
    >
      <div className="flex flex-wrap items-center justify-center gap-[6px]">
        {CLI_STEPS.map((step) => (
          <span
            key={step.label}
            className={cn(
              'tool-chip flex h-[26px] items-center rounded-pill border border-faint bg-paper px-[9px] font-mono text-[9.5px] text-muted',
              step.delay
            )}
          >
            {step.label}
          </span>
        ))}
      </div>
      <span className="tool-command tool-delay-5 flex h-[33px] items-center rounded-pill border-[1.5px] border-ink bg-peach-soft px-[16px] font-mono text-[10px] font-medium text-ink">
        one command
      </span>
    </div>
  );
}

function HerdrVisual({ armed, play, nodeRef }: VisualProps) {
  return (
    <div
      ref={nodeRef}
      className={cn(base, 'justify-center gap-[9px] px-6 py-4')}
      data-tool-visual=""
      data-tool-armed={armed ? 'true' : undefined}
      data-tool-play={play ? 'true' : undefined}
    >
      <div className="flex h-[40px] w-full items-center justify-between gap-4 rounded-[12px] border-[1.5px] border-ink bg-paper px-[13px]">
        <span className="text-[11px] font-medium text-ink">rig board</span>
        <span className="tool-toggle relative h-[20px] w-[35px] shrink-0 rounded-pill border-[1.5px] border-ink bg-peach">
          <span
            aria-hidden
            className="tool-toggle-fill absolute inset-[1.5px] rounded-pill bg-cream opacity-0"
          />
          <span
            aria-hidden
            className="tool-toggle-knob absolute right-[3px] top-[2.5px] h-[13px] w-[13px] rounded-pill border-[1.5px] border-ink bg-paper"
          />
        </span>
      </div>
      <div className="flex h-[40px] w-full items-center justify-between gap-4 rounded-[12px] border-[1.5px] border-ink bg-paper px-[13px]">
        <span className="text-[11px] font-medium text-muted">more mods, later</span>
        <span className="relative h-[20px] w-[35px] shrink-0 rounded-pill border-[1.5px] border-ink bg-cream">
          <span className="absolute left-[3px] top-[2.5px] h-[13px] w-[13px] rounded-pill border-[1.5px] border-ink bg-paper" />
        </span>
      </div>
    </div>
  );
}

const VISUALS: Record<ToolCard['visual'], (props: VisualProps) => JSX.Element> = {
  skills: SkillsVisual,
  plugins: PluginsVisual,
  cli: CliVisual,
  herdr: HerdrVisual,
};

/**
 * Plays a tool visual once when it first scrolls into view and again on
 * every card hover. Motion lives in app/globals.css; this component only
 * supplies the armed/play flags and remounts the visual to restart a run.
 * Reduced motion keeps the final state.
 */
export function ToolVisual({
  kind,
  playKey = 0,
}: {
  kind: ToolCard['visual'];
  playKey?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(0);

  useEffect(() => {
    if (reduce) {
      setArmed(false);
      return;
    }

    const node = ref.current;
    if (!node) return;
    if (node.getBoundingClientRect().top >= window.innerHeight) setArmed(true);
  }, [reduce]);

  useEffect(() => {
    if (armed && inView) setSeen(1);
  }, [armed, inView]);

  const play = !reduce && (seen > 0 || playKey > 0);
  const Visual = VISUALS[kind];

  return (
    <Visual
      key={`${seen}-${playKey}`}
      armed={armed}
      play={play}
      nodeRef={ref}
    />
  );
}
