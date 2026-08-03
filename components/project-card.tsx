import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <Card className="group p-8 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_theme(colors.ink)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-medium text-ink">{project.title}</h3>
            {project.status && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/40">
                {project.status}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink bg-lime animate-blink"
          />
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/60">
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-signal opacity-0 transition-opacity group-hover:opacity-100">
          Read case study
          <span aria-hidden>&rarr;</span>
        </div>
      </Card>
    </Link>
  );
}
