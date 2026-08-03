import { projects } from '@/lib/projects';
import { Hero } from '@/components/hero';
import { SectionReveal } from '@/components/section-reveal';
import { ProjectCard } from '@/components/project-card';

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <Hero />

      <section className="space-y-8">
        <SectionReveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
            // case studies
          </h2>
        </SectionReveal>
        <div className="space-y-6">
          {projects.map((project, i) => (
            <SectionReveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
