import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import { projects } from "@/data/projects";
import { getProjectImages } from "@/lib/project-images";
import { ProjectGallery } from "@/components/site/project-gallery";
import { ProjectsBackLink } from "@/components/site/projects-back-link";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Projekti" };
  return {
    title: `${project.title} — Projekt`,
    description: `Instalim elektrik nga Ntsh Beli — ${project.title}.`,
    openGraph: { title: project.title, images: [project.image] },
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const images = getProjectImages(slug);
  const gallery = images.length > 0 ? images : [project.image];
  const finished = project.status === "perfunduar";

  return (
    <section className="container-page py-10 md:py-14">
      <ProjectsBackLink className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="size-4" />
        Të gjitha projektet
      </ProjectsBackLink>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              finished
                ? "bg-emerald-500/15 text-emerald-700"
                : "bg-amber-400/20 text-amber-700"
            }`}
          >
            <span className="size-1.5 rounded-full bg-current" />
            {finished ? "Përfunduar" : "Në vazhdim"}
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-slate-600">
              <Zap className="size-4 text-brand" />
              {project.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <ProjectGallery images={gallery} title={project.title} />
      </div>
    </section>
  );
}
