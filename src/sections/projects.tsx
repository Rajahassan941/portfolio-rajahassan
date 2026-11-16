import { projects } from "@/data/projects";
import { SECTION_IDS } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id={SECTION_IDS.projects} aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-1/4 size-[600px] rounded-full bg-[radial-gradient(circle,rgb(79_124_255/0.1),transparent_65%)] blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 size-[600px] rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="container-x">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured Work"
          title="Projects Built for the Real World."
          description="From regulated banking workflows to real-time medical imaging — a selection of work showing how I approach complex problems end to end."
        />

        <div className="mt-16 flex flex-col gap-8 sm:mt-20 sm:gap-12">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
