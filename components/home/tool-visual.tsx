import type { JSX } from 'react';
import type { ToolCard } from '@/lib/content';
import { cn } from '@/lib/utils';

const base =
  'mt-auto hidden min-h-[170px] flex-1 flex-col items-center justify-center rounded-[20px] bg-cream xl:flex';

function SkillsVisual() {
  return (
    <div className={cn(base, 'justify-start pl-[37px]')}>
      <div className="relative w-[300px] max-w-full -rotate-2 rounded-[14px] border-2 border-ink bg-paper px-[18px] py-4">
        <p className="flex items-center gap-2 font-mono text-[13px] font-medium text-ink-soft">
          <span aria-hidden className="h-2 w-2 rounded-pill bg-peach" />
          my-rules
        </p>
        <p className="mt-2 font-mono text-[13px] leading-[22px] text-ink">
          explain before you change
          <br />
          run the tests first
          <br />
          keep each change small
        </p>
        <span className="absolute right-5 top-4 text-[12px] text-muted">example</span>
      </div>
    </div>
  );
}

function PluginsVisual() {
  return (
    <div className={cn(base, 'flex-row')}>
      <span className="flex h-[46px] items-center rounded-pill border-2 border-ink bg-paper px-[18px] font-mono text-[14px] font-medium text-ink">
        agent
      </span>
      <span aria-hidden className="h-[2.5px] w-[36px] bg-ink" />
      <span className="flex h-[46px] items-center rounded-pill border-2 border-ink bg-peach-soft px-[18px] font-mono text-[14px] font-medium text-ink">
        plugin
      </span>
      <span aria-hidden className="h-[2.5px] w-[36px] bg-ink" />
      <span className="flex h-[46px] items-center rounded-pill border-2 border-ink bg-paper px-[18px] font-mono text-[14px] font-medium text-ink">
        your tools
      </span>
    </div>
  );
}

function CliVisual() {
  return (
    <div className={cn(base, 'min-h-[214px] gap-[18px]')}>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['lint', 'test', 'build', 'tag', 'push'].map((label) => (
          <span
            key={label}
            className="flex h-[36px] items-center rounded-pill border-tag border-faint bg-paper px-3 font-mono text-[13px] text-muted"
          >
            {label}
          </span>
        ))}
      </div>
      <span className="flex h-[46px] items-center rounded-pill border-2 border-ink bg-peach-soft px-[22px] font-mono text-[14px] font-medium text-ink">
        one command
      </span>
    </div>
  );
}

function HerdrVisual() {
  return (
    <div className={cn(base, 'min-h-[214px] justify-center gap-3 px-[32px] py-[24px]')}>
      <div className="flex h-14 items-center justify-between gap-4 rounded-[16px] border-2 border-ink bg-paper px-4">
        <span className="text-[15px] font-medium text-ink">rig board</span>
        <span className="relative h-[28px] w-12 shrink-0 rounded-pill border-2 border-ink bg-peach">
          <span className="absolute right-[3px] top-[3px] h-[18px] w-[18px] rounded-pill border-2 border-ink bg-paper" />
        </span>
      </div>
      <div className="flex h-14 items-center justify-between gap-4 rounded-[16px] border-2 border-ink bg-paper px-4">
        <span className="text-[15px] font-medium text-muted">more mods, later</span>
        <span className="relative h-[28px] w-12 shrink-0 rounded-pill border-2 border-ink bg-cream">
          <span className="absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-pill border-2 border-ink bg-paper" />
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
