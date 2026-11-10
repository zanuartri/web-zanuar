'use client';

import { useEffect, useRef, useState, type Ref } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const NOTE_DOWN = 'Try it: switch provider A back up. Illustrative, not live data.';
const NOTE_UP = 'Try it: take provider A down.';
const NOTE_DOWN_MOBILE = 'Tap Up to bring provider A back. Illustrative, not live data.';
const NOTE_UP_MOBILE = 'Tap Down to take provider A down. Illustrative, not live data.';

const CYCLE_MS = 4000;
const TRAVEL_MS = 1200;
const HOLD_MS = CYCLE_MS / 2 - TRAVEL_MS;
const PAUSE_MS = 10_000;
const STATIC_PACKET = { x: 627, y: 229 };
const PATH_TO_A = 'M576 185 C 626 185 626 105 676 105';
const PATH_TO_KENARI = 'M576 185 C 626 185 626 265 676 265';

// 4s cycle: down while the packet takes the live path to kenari.id (1.2s),
// hold, then up while it returns along that same path. The second half is the
// mirror of the first, so the state flips whenever elapsed crosses half.
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function packetProgress(elapsed: number) {
  if (elapsed < TRAVEL_MS) return easeInOut(elapsed / TRAVEL_MS);
  if (elapsed < CYCLE_MS / 2) return 1;
  if (elapsed < CYCLE_MS / 2 + TRAVEL_MS) {
    return 1 - easeInOut((elapsed - CYCLE_MS / 2) / TRAVEL_MS);
  }
  return 0;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

function useDocumentVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible');
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  return visible;
}

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

function Connector({
  d,
  active,
  pathRef,
}: {
  d: string;
  active: boolean;
  pathRef?: Ref<SVGPathElement>;
}) {
  return (
    <g>
      <path
        ref={pathRef}
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
  const [labelIn, setLabelIn] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const packetRef = useRef<SVGGElement>(null);
  const livePathRef = useRef<SVGPathElement>(null);
  const elapsedRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const startedRef = useRef(false);
  const upRef = useRef(false);
  const labelRef = useRef(true);

  const reduce = useReducedMotion();
  const inView = useInView(cardRef);
  const desktop = useMediaQuery('(min-width: 1280px)');
  const visible = useDocumentVisible();
  const autoplay = desktop && inView && visible && !reduce;

  useEffect(() => {
    if (!reduce) return;
    upRef.current = false;
    labelRef.current = true;
    setUp(false);
    setLabelIn(true);
    pauseUntilRef.current = 0;
    elapsedRef.current = TRAVEL_MS;
    const packet = packetRef.current;
    if (!packet) return;
    packet.setAttribute('transform', `translate(${STATIC_PACKET.x} ${STATIC_PACKET.y})`);
    packet.style.opacity = '1';
  }, [reduce]);

  useEffect(() => {
    if (!autoplay) return;
    const path = livePathRef.current;
    const packet = packetRef.current;
    if (!path || !packet) return;

    // The first run starts in the Down hold instead of at 0: the static state
    // already shows A down, so a down travel here would only snap the packet
    // from its resting position. Later cycles start at 0 and do the full loop.
    if (!startedRef.current) {
      startedRef.current = true;
      if (elapsedRef.current === 0) elapsedRef.current = TRAVEL_MS;
    }

    const length = path.getTotalLength();
    let lastTime: number | null = null;
    let lastUp = upRef.current;
    let lastLabel = labelRef.current;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      if (now < pauseUntilRef.current) {
        lastTime = null;
        return;
      }

      if (lastTime === null) lastTime = now;
      const delta = Math.min(now - lastTime, 100);
      lastTime = now;
      elapsedRef.current = (elapsedRef.current + delta) % CYCLE_MS;

      const elapsed = elapsedRef.current;
      const nextUp = elapsed >= CYCLE_MS / 2;
      if (nextUp !== lastUp) {
        lastUp = nextUp;
        upRef.current = nextUp;
        setUp(nextUp);
      }

      const nextLabel = elapsed >= TRAVEL_MS && elapsed < CYCLE_MS / 2;
      if (nextLabel !== lastLabel) {
        lastLabel = nextLabel;
        labelRef.current = nextLabel;
        setLabelIn(nextLabel);
      }

      const point = path.getPointAtLength(packetProgress(elapsed) * length);
      packet.setAttribute('transform', `translate(${point.x} ${point.y})`);
      packet.style.opacity = elapsed >= CYCLE_MS / 2 + TRAVEL_MS ? '0' : '1';
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [autoplay]);

  const toggle = () => {
    const nextUp = !upRef.current;
    const nextLabel = !nextUp;
    upRef.current = nextUp;
    labelRef.current = nextLabel;
    setUp(nextUp);
    setLabelIn(nextLabel);

    pauseUntilRef.current = performance.now() + PAUSE_MS;
    elapsedRef.current = nextUp ? CYCLE_MS - HOLD_MS : TRAVEL_MS;

    const packet = packetRef.current;
    if (reduce) {
      if (packet) {
        packet.setAttribute('transform', `translate(${STATIC_PACKET.x} ${STATIC_PACKET.y})`);
        packet.style.opacity = '1';
      }
      return;
    }

    if (!desktop) return;
    const path = livePathRef.current;
    if (!path || !packet) return;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(nextUp ? 0 : length);
    packet.setAttribute('transform', `translate(${point.x} ${point.y})`);
    packet.style.opacity = nextUp ? '0' : '1';
  };

  return (
    <div
      ref={cardRef}
      className="mx-auto w-full max-w-[350px] rounded-card-mobile border-2 border-ink bg-paper p-[20px] xl:h-[360px] xl:max-w-none xl:rounded-card xl:border-0 xl:p-0 xl:shadow-[inset_0_0_0_2px_var(--color-ink)]"
    >
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

          <Connector d={PATH_TO_A} active={up} />
          <Connector d={PATH_TO_KENARI} active={!up} pathRef={livePathRef} />

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
            className={cn(
              'font-mono text-[14px] fill-faint transition-opacity duration-slow ease-out',
              up ? 'opacity-100' : 'opacity-0'
            )}
          >
            on standby
          </text>
          <g
            className={cn(
              'transition-opacity duration-slow ease-out',
              labelIn ? 'opacity-100' : 'opacity-0'
            )}
          >
            <text x="916" y="254" dominantBaseline="central" className="fill-ink font-mono text-[14px]">
              <tspan x="916" dy="0">
                local gateway,
              </tspan>
              <tspan x="916" dy="22">
                next in line
              </tspan>
            </text>
          </g>

          <g
            ref={packetRef}
            transform={`translate(${STATIC_PACKET.x} ${STATIC_PACKET.y})`}
            className="transition-opacity duration-slow ease-out"
          >
            <circle r="7" strokeWidth={2} className="fill-peach stroke-ink" />
          </g>
        </svg>

        <Toggle up={up} onToggle={toggle} className="absolute left-[40px] top-[32px]" />

        <p
          aria-live={autoplay ? 'off' : 'polite'}
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
