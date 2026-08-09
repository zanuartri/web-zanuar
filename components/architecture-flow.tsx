import type { Architecture } from '@/lib/projects';
import { TerminalWindow } from '@/components/terminal-window';

export function ArchitectureFlow({ architecture }: { architecture: Architecture }) {
  const lastIndex = architecture.branches.length - 1;

  return (
    <TerminalWindow title="graph.log">
      <div className="space-y-0.5 text-paper">
        <p>
          <span className="text-signal">$</span> {architecture.entry.toLowerCase().replace(/\s+/g, '_')}
        </p>
        <p className="text-paper/50">{'  '}&darr;</p>
        <p>
          <span className="text-lime">{architecture.router.toLowerCase().replace(/\s+/g, '_')}</span>
        </p>
        {architecture.branches.map((b, i) => (
          <div key={b.label} className="pl-2">
            <p>
              <span className="text-paper/40">{i === lastIndex ? '  └─' : '  ├─'}</span>{' '}
              <span className="text-signal">{b.label}</span>
            </p>
            <p className="pl-6 text-xs text-paper/60">{b.detail}</p>
          </div>
        ))}
        <p className="text-paper/50">{'  '}&darr;</p>
        <p className="text-lime">{architecture.sink}</p>
      </div>
    </TerminalWindow>
  );
}
