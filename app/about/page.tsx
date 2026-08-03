import type { Metadata } from 'next';
import { SectionReveal } from '@/components/section-reveal';
import { TerminalWindow } from '@/components/terminal-window';

export const metadata: Metadata = {
  title: 'About',
  description: 'Background on my transition from QA engineering to AI agent engineering.',
};

const stats = [
  { label: 'role', value: 'AI Agent Engineer' },
  { label: 'background', value: 'QA Automation' },
  { label: 'experience', value: '6+ years', accent: true },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <SectionReveal>
        <p className="inline-flex items-center border-2 border-ink bg-lime px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-ink">
          // about
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium text-ink sm:text-5xl">
          From breaking software to building it.
        </h1>
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <TerminalWindow title="whoami">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-paper/40">
                  {s.label}
                </dt>
                <dd className={`mt-1 ${s.accent ? 'text-lime' : 'text-paper'}`}>{s.value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-[11px] uppercase tracking-[0.1em] text-paper/40">status</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-paper">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
                building
              </dd>
            </div>
          </dl>
        </TerminalWindow>
      </SectionReveal>

      <SectionReveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-ink/65">
        <p>
          I spent <span className="text-ink">6+ years</span> as a QA
          Engineer, where my job was to find the ways systems break before
          users did, writing test plans, automating regression suites, and
          pushing back on releases that didn&apos;t meet the bar. That
          instinct, assume it&apos;s broken until proven otherwise, is
          exactly what&apos;s missing from a lot of AI agent projects shipped
          today.
        </p>
        <p>
          I&apos;m now focused on agent engineering: building systems with
          LangGraph and LangChain, wiring tools together with MCP, and
          grounding outputs with RAG. What sets my work apart is that I
          evaluate agents the way I evaluated software: with metrics, not
          vibes. Bug and error detection rates, false positive rates, and
          consistency across runs.
        </p>
        <p>
          Right now I&apos;m building this at my current company. Always up
          for trading notes with people working on agentic systems,
          especially where evaluation is treated as a first-class concern.
        </p>
      </SectionReveal>
    </div>
  );
}
