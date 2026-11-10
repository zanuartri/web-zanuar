'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const NOTE_DOWN = 'Try it: switch provider A back up. Illustrative, not live data.';
const NOTE_UP = 'Try it: take provider A down.';
const NOTE_DOWN_MOBILE = 'Tap Up to bring provider A back. Illustrative, not live data.';
const NOTE_UP_MOBILE = 'Tap Down to take provider A down. Illustrative, not live data.';

function Toggle({
  up,
  onToggle,
  compact,
  className,
}: {
  up: boolean;
  onToggle: () => void;
  compact?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={up}
      aria-label="Provider A"
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-1 rounded-pill border-2 border-ink bg-cream text-[14px] transition-colors duration-fast',
        compact ? 'h-[50px] pl-[14px] pr-1' : 'h-[46px] pl-4 pr-1',
        className
      )}
    >
      <span className="font-medium text-ink-soft">Provider A</span>
      <span
        className={cn(
          'flex items-center rounded-pill px-4 font-semibold transition-colors duration-fast ease-out',
          compact ? 'h-[38px]' : 'h-[32px]',
          up ? 'bg-ink text-paper' : 'text-muted hover:bg-paper hover:text-ink active:bg-paper active:text-ink'
        )}
      >
        Up
      </span>
      <span
        className={cn(
          'flex items-center rounded-pill px-4 font-semibold transition-colors duration-fast ease-out',
          compact ? 'h-[38px]' : 'h-[32px]',
          up ? 'text-muted hover:bg-paper hover:text-ink active:bg-paper active:text-ink' : 'bg-ink text-paper'
        )}
      >
        Down
      </span>
    </button>
  );
}

function Connector({ d, active }: { d: string; active: boolean }) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        strokeWidth={2.5}
        strokeDasharray="5 7"
        className="stroke-faint transition-opacity duration-slow ease-out"
        style={{ opacity: active ? 0 : 1 }}
      />
      <path
        d={d}
        fill="none"
        strokeWidth={3.5}
        pathLength={1}
        strokeDasharray={1}
        className="stroke-peach transition-[stroke-dashoffset] duration-slow ease-out"
        style={{ strokeDashoffset: active ? 0 : 1 }}
      />
    </g>
  );
}

function MobileProvider({
  label,
  state,
  live,
  down,
}: {
  label: string;
  state: string;
  live: boolean;
  down?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex h-[65px] flex-col items-center justify-center gap-1 rounded-[20px] border-2 px-2 py-3 text-center transition-colors duration-slow ease-out',
        live ? 'border-ink bg-peach-soft text-ink' : 'border-ink bg-paper text-ink',
        down && 'border-dashed border-faint bg-cream text-faint'
      )}
    >
      <span className={cn('font-mono text-[13px] font-medium', down && 'line-through')}>
        {label}
      </span>
      <span className={cn('font-mono text-[12px]', down ? 'text-faint' : live ? 'text-ink' : 'text-faint')}>
        {state}
      </span>
    </div>
  );
}

export function ZRouterDemo() {
  const [up, setUp] = useState(false);
  const toggle = () => setUp((value) => !value);

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-card-mobile border-2 border-ink bg-paper p-[20px] xl:h-[360px] xl:max-w-none xl:rounded-card xl:border-0 xl:p-0 xl:shadow-[inset_0_0_0_2px_var(--color-ink)]">
      <span className="sr-only">
        {up
          ? 'Diagram: your agent reaches ZRouter, which routes to provider a while kenari.id is on standby.'
          : 'Diagram: your agent reaches ZRouter, which routes to kenari.id while provider a is down.'}
      </span>

      <div className="relative hidden h-full w-full xl:block">
        <svg aria-hidden="true" viewBox="0 0 1080 360" className="h-full w-full" fill="none">
          <rect
            x="88"
            y="153"
            width="200"
            height="64"
            rx="32"
            className="fill-white stroke-ink"
            strokeWidth={2}
          />
          <text
            x="188"
            y="185"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-ink font-mono text-[15px] font-medium"
          >
            your agent
          </text>

          <line x1="288" y1="184" x2="376" y2="184" strokeWidth={2.5} className="stroke-ink" />

          <rect
            x="376"
            y="153"
            width="200"
            height="64"
            rx="32"
            className="fill-ink stroke-ink"
            strokeWidth={2}
          />
          <text
            x="476"
            y="185"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-paper font-sans text-[17px] font-bold"
          >
            ZRouter
          </text>

          <Connector d="M576 185 C 626 185 626 105 676 105" active={up} />
          <Connector d="M576 185 C 626 185 626 265 676 265" active={!up} />

          <circle
            cx="627"
            cy="229"
            r="7"
            strokeWidth={2}
            className="fill-peach stroke-ink"
          />

          <rect
            x="676"
            y="73"
            width="220"
            height="64"
            rx="32"
            strokeWidth={2}
            strokeDasharray={up ? undefined : '5 5'}
            className={cn(
              'fill-cream stroke-faint transition-colors duration-slow ease-out',
              up ? 'fill-peach-soft stroke-ink' : ''
            )}
          />
          <text
            x="786"
            y="105"
            textAnchor="middle"
            dominantBaseline="central"
            className={cn(
              'font-mono text-[15px] font-medium',
              up ? 'fill-ink' : 'fill-faint'
            )}
          >
            provider a
          </text>
          <text
            x="916"
            y="105"
            dominantBaseline="central"
            className={cn('font-mono text-[14px]', up ? 'fill-ink' : 'fill-faint')}
          >
            {up ? 'answering' : 'taking a nap'}
          </text>

          <rect
            x="676"
            y="233"
            width="220"
            height="64"
            rx="32"
            strokeWidth={2}
            className={cn('stroke-ink transition-colors duration-slow ease-out', up ? 'fill-paper' : 'fill-peach-soft')}
          />
          <text
            x="786"
            y="265"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-ink font-mono text-[15px] font-medium"
          >
            kenari.id
          </text>
          <text
            x="916"
            y="254"
            dominantBaseline="central"
            className={cn('font-mono text-[14px]', up ? 'fill-faint' : 'fill-ink')}
          >
            {up ? (
              'on standby'
            ) : (
              <>
                <tspan x="916" dy="0">
                  local gateway,
                </tspan>
                <tspan x="916" dy="22">
                  next in line
                </tspan>
              </>
            )}
          </text>
        </svg>

        <Toggle up={up} onToggle={toggle} className="absolute left-[40px] top-[32px]" />

        <p
          aria-live="polite"
          className="absolute left-[40px] top-[322px] text-[14px] leading-[18px] text-muted"
        >
          {up ? NOTE_UP : NOTE_DOWN}
        </p>
      </div>

      <div className="flex flex-col items-center gap-[10px] xl:hidden">
        <Toggle up={up} onToggle={toggle} compact />
        <span aria-hidden className="h-2 w-0.5 bg-ink" />
        <div className="flex h-[46px] w-[132px] items-center justify-center rounded-pill border-2 border-ink bg-paper font-mono text-[14px] font-medium text-ink">
          your agent
        </div>
        <span aria-hidden className="h-[22px] w-[2.5px] bg-ink" />
        <div className="flex h-[45px] w-[114px] items-center justify-center rounded-pill bg-ink font-sans text-[16px] font-bold text-paper">
          ZRouter
        </div>
        <span aria-hidden className="h-[22px] w-[2.5px] bg-peach" />

        <div className="grid w-full max-w-[306px] grid-cols-2 gap-[10px]">
          <MobileProvider
            label="provider a"
            state={up ? 'answering' : 'taking a nap'}
            live={up}
            down={!up}
          />
          <MobileProvider
            label="kenari.id"
            state={up ? 'on standby' : 'still answering'}
            live={!up}
          />
        </div>

        <p aria-live="polite" className="max-w-[306px] text-center text-[13px] leading-[19px] text-muted">
          {up ? NOTE_UP_MOBILE : NOTE_DOWN_MOBILE}
        </p>
      </div>
    </div>
  );
}
