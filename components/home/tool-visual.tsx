import type { JSX } from 'react';
import type { ToolCard } from '@/lib/content';
import { cn } from '@/lib/utils';

const base =
  'relative mt-auto hidden h-[122px] w-full flex-col items-center justify-center overflow-hidden rounded-[14.4px] bg-cream md:flex';

function SkillsVisual() {
  return (
    <div className={base}>
      <div className="w-[216px] -rotate-2 rounded-[10px] border-[1.5px] border-ink bg-paper px-[13px] py-[11px]">
        <p className="font-mono text-[9.5px] font-medium text-peach">my-rules</p>
        <p className="mt-[6px] font-mono text-[9.5px] leading-[16px] text-ink">
          explain before you change
          <br />
          run the tests first
          <br />
          keep each change small
        </p>
      </div>
      <span className="absolute right-[32px] top-[10px] text-[9px] text-muted">example</span>
    </div>
  );
}

function PluginsVisual() {
  return (
    <div className={cn(base, 'flex-row')}>
      <span className="flex h-[33px] items-center rounded-pill border-[1.5px] border-ink bg-white px-[13px] font-mono text-[10px] font-medium text-ink">
        agent
      </span>
      <span aria-hidden className="h-[2px] w-[26px] bg-ink" />
      <span className="flex h-[33px] items-center rounded-pill border-[1.5px] border-ink bg-peach-soft px-[13px] font-mono text-[10px] font-medium text-ink">
        plugin
      </span>
      <span aria-hidden className="h-[2px] w-[26px] bg-ink" />
      <span className="flex h-[33px] items-center rounded-pill border-[1.5px] border-ink bg-white px-[13px] font-mono text-[10px] font-medium text-ink">
        your tools
      </span>
    </div>
  );
}

function CliVisual() {
  return (
    <div className={cn(base, 'gap-[13px] px-6 py-4')}>
      <div className="flex flex-wrap items-center justify-center gap-[6px]">
        {['lint', 'test', 'build', 'tag', 'push'].map((label) => (
          <span
            key={label}
            className="flex h-[26px] items-center rounded-pill border border-faint bg-paper px-[9px] font-mono text-[9.5px] text-muted"
          >
            {label}
          </span>
        ))}
      </div>
      <span className="flex h-[33px] items-center rounded-pill border-[1.5px] border-ink bg-peach-soft px-[16px] font-mono text-[10px] font-medium text-ink">
        one command
      </span>
    </div>
  );
}

function HerdrVisual() {
  return (
    <div className={cn(base, 'justify-center gap-[9px] px-6 py-4')}>
      <div className="flex h-[40px] w-full items-center justify-between gap-4 rounded-[12px] border-[1.5px] border-ink bg-paper px-[13px]">
        <span className="text-[11px] font-medium text-ink">rig board</span>
        <span className="relative h-[20px] w-[35px] shrink-0 rounded-pill border-[1.5px] border-ink bg-peach">
          <span className="absolute right-[3px] top-[2.5px] h-[13px] w-[13px] rounded-pill border-[1.5px] border-ink bg-paper" />
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

const VISUALS: Record<ToolCard['visual'], () => JSX.Element> = {
  skills: SkillsVisual,
  plugins: PluginsVisual,
  cli: CliVisual,
  herdr: HerdrVisual,
};

export function ToolVisual({ kind }: { kind: ToolCard['visual'] }) {
  const Visual = VISUALS[kind];
  return <Visual />;
}
