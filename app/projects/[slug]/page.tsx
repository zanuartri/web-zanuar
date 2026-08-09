import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SectionReveal } from '@/components/section-reveal';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { ArchitectureFlow } from '@/components/architecture-flow';
import { EngineeringDecisions } from '@/components/engineering-decisions';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections: string[] = [];
  if (project.problem) sections.push('Problem');
  if (project.approach) sections.push('Approach');
  if (project.decisions?.length) sections.push('Engineering decisions');
  if (project.architecture || project.architectureImage) sections.push('Architecture');
  if (project.metrics?.length) sections.push('Metrics');
  const sectionNumber = (label: string) =>
    String(sections.indexOf(label) + 1).padStart(2, '0');

  return (
    <article className="space-y-14 sm:space-y-20">
      <SectionReveal className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="inline-flex items-center border-2 border-ink bg-lime px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-ink">
            // case study
          </p>
          {project.status && (
            <p className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
              {project.status}
            </p>
          )}
        </div>
        <h1 className="font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
          {project.title}
        </h1>
        <p className="max-w-4xl text-lg leading-relaxed text-ink/85">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </SectionReveal>

      {project.screenshotUrl && (
        <SectionReveal>
          <div className="overflow-hidden rounded-xl border-2 border-ink shadow-[6px_6px_0_0_theme(colors.ink)]">
            <Image
              src={project.screenshotUrl}
              alt={project.screenshotAlt ?? `${project.title} screenshot`}
              width={1600}
              height={900}
              className="w-full"
              priority
            />
          </div>
        </SectionReveal>
      )}

      {project.problem && (
        <SectionReveal className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
            {sectionNumber('Problem')} / Problem
          </h2>
          <p className="max-w-4xl text-ink/85 leading-relaxed">{project.problem}</p>
        </SectionReveal>
      )}

      {project.approach && (
        <SectionReveal className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
            {sectionNumber('Approach')} / Approach
          </h2>
          <p className="max-w-4xl text-ink/85 leading-relaxed">{project.approach}</p>
        </SectionReveal>
      )}

      {project.decisions && project.decisions.length > 0 && (
        <SectionReveal className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
            {sectionNumber('Engineering decisions')} / Engineering decisions
          </h2>
          <EngineeringDecisions decisions={project.decisions} />
        </SectionReveal>
      )}

      {(project.architecture || (project.architectureImage && project.architectureAlt)) && (
        <SectionReveal className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
            {sectionNumber('Architecture')} / Architecture
          </h2>
          {project.architecture ? (
            <ArchitectureFlow architecture={project.architecture} />
          ) : (
            project.architectureImage &&
            project.architectureAlt && (
              <ArchitectureDiagram
                src={project.architectureImage}
                alt={project.architectureAlt}
              />
            )
          )}
        </SectionReveal>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <SectionReveal className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
            {sectionNumber('Metrics')} / Metrics
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <Card key={metric.label} className="p-6 text-center">
                <dd className="font-display text-3xl font-medium text-signal">
                  {metric.value}
                </dd>
                <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/50">
                  {metric.label}
                </dt>
              </Card>
            ))}
          </div>
        </SectionReveal>
      )}

      <SectionReveal className="flex flex-wrap gap-4 border-t-2 border-ink pt-10">
        {project.demoUrl ? (
          <a href={project.demoUrl} className={cn(buttonVariants({ variant: 'signal' }))}>
            Live demo
          </a>
        ) : (
          <Button variant="muted" disabled>
            Live demo (coming soon)
          </Button>
        )}
        {project.githubUrl ? (
          <a href={project.githubUrl} className={cn(buttonVariants({ variant: 'ghost' }))}>
            GitHub
          </a>
        ) : (
          <Button variant="muted" disabled>
            GitHub (coming soon)
          </Button>
        )}
      </SectionReveal>
    </article>
  );
}
