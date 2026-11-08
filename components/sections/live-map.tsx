import { cn } from '@/lib/utils';

type Tone = 'live' | 'idle' | 'last' | 'failing';

type MapNode = {
  initials: string;
  name: string;
  status: string;
  tone: Tone;
};

const AGENTS: readonly MapNode[] = [
  { initials: 'oc', name: 'opencode', status: '2 sending', tone: 'live' },
  { initials: 'cc', name: 'Claude Code', status: '1 sending', tone: 'live' },
  { initials: 'cx', name: 'Codex', status: 'idle · 4 min', tone: 'idle' },
];

const PROVIDERS: readonly MapNode[] = [
  { initials: 'c', name: 'Claude', status: 'claude-sonnet', tone: 'live' },
  { initials: 'k', name: 'Kenari.id', status: 'claude-sonnet', tone: 'live' },
  { initials: 'og', name: 'OpenCode Go', status: 'coding', tone: 'last' },
  {
    initials: 'cc',
    name: 'Command Code Go',
    status: 'rate limited · 12 min',
    tone: 'failing',
  },
];

const LEGEND = [
  { label: 'sending now', className: 'bg-peach' },
  { label: 'last used', className: 'bg-ink' },
  { label: 'failing', className: 'border-t-2 border-dashed border-peach' },
] as const;

function CompactRow({ node }: { node: MapNode }) {
  return (
    <div
      className={cn(
        'flex h-[46px] items-center gap-3 rounded-pill border-2 py-1 pl-3 pr-4',
        node.tone === 'idle' && 'border-dashed border-faint bg-paper',
        node.tone === 'failing' && 'border-peach bg-paper',
        (node.tone === 'live' || node.tone === 'last') && 'border-ink bg-paper'
      )}
    >
      <span
        className={cn(
          'flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-pill font-mono text-[11px] font-medium uppercase',
          node.tone === 'idle' ? 'bg-cream text-faint' : 'bg-peach-soft text-ink'
        )}
      >
        {node.initials}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            'block text-[14px] font-medium leading-[18px]',
            node.tone === 'idle' ? 'text-muted' : 'text-ink'
          )}
        >
          {node.name}
        </span>
        <span
          className={cn(
            'block font-mono text-[12px] leading-[16px]',
            node.tone === 'idle' || node.tone === 'failing'
              ? 'text-muted'
              : 'text-ink-soft'
          )}
        >
          {node.status}
        </span>
      </span>
    </div>
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-6 gap-y-2', className)}>
      {LEGEND.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span aria-hidden className={cn('h-[2.5px] w-[26px]', item.className)} />
          <span className="font-mono text-[13px] text-muted">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function MapTitle({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="fill-muted font-sans text-[14px]">
      {children}
    </text>
  );
}

function DesktopRow({
  node,
  y,
  x,
  width,
}: {
  node: MapNode;
  y: number;
  x: number;
  width: number;
}) {
  const tx = x + 56;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={40}
        rx={20}
        strokeWidth={2}
        strokeDasharray={node.tone === 'idle' ? '5 5' : undefined}
        className={cn(
          'fill-paper',
          node.tone === 'idle'
            ? 'stroke-faint'
            : node.tone === 'failing'
              ? 'stroke-peach'
              : 'stroke-ink'
        )}
      />
      <circle
        cx={x + 28}
        cy={y + 20}
        r={15}
        className={node.tone === 'idle' ? 'fill-cream' : 'fill-peach-soft'}
      />
      <text
        x={x + 28}
        y={y + 20}
        textAnchor="middle"
        dominantBaseline="central"
        className={cn(
          'font-mono text-[10px] font-medium uppercase',
          node.tone === 'idle' ? 'fill-faint' : 'fill-ink'
        )}
      >
        {node.initials}
      </text>
      <text
        x={tx}
        y={y + 15}
        dominantBaseline="central"
        className={cn(
          'font-sans text-[14px] font-medium',
          node.tone === 'idle' ? 'fill-muted' : 'fill-ink'
        )}
      >
        {node.name}
      </text>
      <text
        x={tx}
        y={y + 28}
        dominantBaseline="central"
        className={cn(
          'font-mono text-[12px]',
          node.tone === 'idle' || node.tone === 'failing'
            ? 'fill-muted'
            : 'fill-ink-soft'
        )}
      >
        {node.status}
      </text>
    </g>
  );
}

export function LiveMap() {
  return (
    <>
      <div className="relative hidden overflow-hidden rounded-card border-2 border-ink bg-paper xl:block">
        <svg
          viewBox="0 0 1184 315"
          role="img"
          aria-label="Live map concept: opencode, Claude Code and Codex send through ZRouter. Three requests go to Claude and Kenari.id, while Command Code Go is rate limited."
          className="block h-auto w-full"
        >
          <text x={40} y={22} className="fill-muted font-mono text-[13px] tracking-[0.08em]">
            LIVE
          </text>

          <MapTitle x={40} y={68}>
            Agents
          </MapTitle>
          <MapTitle x={934} y={44}>
            Providers
          </MapTitle>

          <circle cx={590} cy={158} r={84} className="fill-peach-soft" />
          <circle cx={590} cy={158} r={66} className="fill-ink" />

          <path
            d="M224 104 C 340 104 400 158 524 158"
            fill="none"
            strokeWidth={2.5}
            className="stroke-peach"
          />
          <path
            d="M224 158 L 524 158"
            fill="none"
            strokeWidth={2.5}
            className="stroke-peach"
          />
          <path
            d="M224 212 C 340 212 400 158 524 158"
            fill="none"
            strokeWidth={2.5}
            strokeDasharray="5 7"
            className="stroke-faint"
          />

          <path
            d="M672 158 C 780 158 810 80 934 80"
            fill="none"
            strokeWidth={2.5}
            className="stroke-peach"
          />
          <path
            d="M672 158 C 780 158 810 141 934 141"
            fill="none"
            strokeWidth={2.5}
            className="stroke-peach"
          />
          <path
            d="M672 158 C 780 158 810 202 934 202"
            fill="none"
            strokeWidth={2.5}
            className="stroke-ink"
          />
          <path
            d="M672 158 C 780 158 810 263 934 263"
            fill="none"
            strokeWidth={2.5}
            strokeDasharray="6 7"
            className="stroke-peach"
          />

          <text
            x={590}
            y={151}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-paper font-display text-[24px] font-semibold"
          >
            ZRouter
          </text>
          <text
            x={590}
            y={179}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-faint font-mono text-[12px]"
          >
            3 sending
          </text>

          {AGENTS.map((node, index) => (
            <DesktopRow
              key={node.name}
              node={node}
              x={40}
              width={184}
              y={84 + index * 54}
            />
          ))}

          {PROVIDERS.map((node, index) => (
            <DesktopRow
              key={node.name}
              node={node}
              x={934}
              width={220}
              y={60 + index * 61}
            />
          ))}

          <g aria-hidden>
            <line x1={40} y1={292} x2={66} y2={292} strokeWidth={2.5} className="stroke-peach" />
            <text x={78} y={292} dominantBaseline="central" className="fill-muted font-mono text-[13px]">
              sending now
            </text>
            <line x1={196} y1={292} x2={222} y2={292} strokeWidth={2.5} className="stroke-ink" />
            <text x={234} y={292} dominantBaseline="central" className="fill-muted font-mono text-[13px]">
              last used
            </text>
            <line
              x1={330}
              y1={292}
              x2={356}
              y2={292}
              strokeWidth={2.5}
              strokeDasharray="6 7"
              className="stroke-peach"
            />
            <text x={368} y={292} dominantBaseline="central" className="fill-muted font-mono text-[13px]">
              failing
            </text>
          </g>
        </svg>
      </div>

      <div className="rounded-card-mobile border-2 border-ink bg-paper p-5 md:rounded-card md:p-7 xl:hidden">
        <p className="font-mono text-[13px] tracking-[0.08em] text-muted">LIVE</p>

        <div className="mt-4 flex flex-col items-center">
          <div className="w-full max-w-[420px]">
            <p className="mb-2 text-[13px] text-muted">Agents</p>
            <ul className="flex flex-col gap-2">
              {AGENTS.map((node) => (
                <li key={node.name}>
                  <CompactRow node={node} />
                </li>
              ))}
            </ul>
          </div>

          <span aria-hidden className="my-3 h-4 w-0.5 bg-ink" />
          <div className="flex h-[132px] w-[132px] flex-col items-center justify-center rounded-pill bg-ink ring-8 ring-peach-soft">
            <span className="font-display text-[24px] font-semibold text-paper">ZRouter</span>
            <span className="font-mono text-[12px] text-faint">3 sending</span>
          </div>
          <span aria-hidden className="my-3 h-4 w-0.5 bg-peach" />

          <div className="w-full max-w-[420px]">
            <p className="mb-2 text-[13px] text-muted">Providers</p>
            <ul className="flex flex-col gap-2">
              {PROVIDERS.map((node) => (
                <li key={node.name}>
                  <CompactRow node={node} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Legend className="mt-5" />
      </div>
    </>
  );
}
