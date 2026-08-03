import type { Architecture } from '@/lib/projects';

function Node({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
}) {
  return (
    <div
      className={`inline-flex items-center rounded-lg border-2 border-ink px-5 py-3 font-mono text-sm font-medium shadow-[4px_4px_0_0_theme(colors.ink)] ${
        variant === 'accent' ? 'bg-lime text-ink' : 'bg-paper text-ink'
      }`}
    >
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="font-mono text-xl text-ink/30">
      &darr;
    </div>
  );
}

export function ArchitectureFlow({ architecture }: { architecture: Architecture }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-ink bg-paper p-8 shadow-[6px_6px_0_0_theme(colors.signal)] sm:p-12">
      <Node variant="accent">{architecture.entry}</Node>
      <Arrow />
      <Node>{architecture.router}</Node>
      <Arrow />

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {architecture.branches.map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center gap-2 rounded-lg border-2 border-ink bg-paper p-4 text-center shadow-[3px_3px_0_0_theme(colors.ink)]"
          >
            <span className="font-mono text-sm font-semibold text-signal">{b.label}</span>
            <span className="text-xs leading-relaxed text-ink/60">{b.detail}</span>
          </div>
        ))}
      </div>

      <Arrow />
      <Node variant="accent">{architecture.sink}</Node>
    </div>
  );
}
