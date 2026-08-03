import type { ReactNode } from 'react';

export function TerminalWindow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-ink bg-ink shadow-[6px_6px_0_0_theme(colors.signal)]">
      <div className="flex items-center gap-2 border-b-2 border-ink/60 bg-ink px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/40">
          {title}
        </span>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}
