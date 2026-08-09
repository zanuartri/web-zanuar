import type { EngineeringDecision } from '@/lib/projects';

export function EngineeringDecisions({ decisions }: { decisions: EngineeringDecision[] }) {
  return (
    <div className="space-y-4">
      {decisions.map((d) => (
        <div
          key={d.decision}
          className="rounded-xl border-2 border-ink border-l-4 border-l-signal bg-paper p-5 shadow-[4px_4px_0_0_theme(colors.ink)]"
        >
          <p className="font-display text-lg font-medium text-ink">{d.decision}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{d.reason}</p>
        </div>
      ))}
    </div>
  );
}
