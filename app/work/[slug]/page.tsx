import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Squircle } from "@/components/primitives"
import { getWorkProjects } from "@/lib/work"
import { CaseLightbox } from "@/components/work/CaseLightbox"
import { CaseImageTrigger } from "@/components/work/CaseImageTrigger"

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getWorkProjects().map((project) => ({ slug: project.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getWorkProjects().find((item) => item.slug === slug)
  if (!project) return {}

  const description = project.description ?? project.overview?.[0] ?? undefined
  const preview = project.galleryImages[0] ?? project.resultImages[0]

  return {
    title: project.title ?? undefined,
    ...(description ? { description } : {}),
    openGraph: {
      title: project.title ?? undefined,
      ...(description ? { description } : {}),
      ...(preview ? { images: [{ url: preview.src, alt: preview.alt }] } : {}),
    },
  }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const projects = getWorkProjects()
  const projectIndex = projects.findIndex((item) => item.slug === slug)
  const project = projects[projectIndex]

  if (!project) notFound()

  const nextProject = projects[(projectIndex + 1) % projects.length]
  const lightboxImages = [...project.galleryImages, ...project.resultImages]
  const resultImages = [...project.galleryImages.slice(1), ...project.resultImages]
  const metaItems = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Medium / stack", value: project.medium },
    { label: "Tools", value: project.tools?.join(", ") ?? null },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value))

  const cover = project.galleryImages[0]

  return (
    <main className={project.overview?.length ? "case-page case-page-long" : "case-page case-page-minimal"}>
      <header className="case-header">
        <Link href="/work" className="case-back-link">Work</Link>
        <h1 className="case-title">{project.title}</h1>
        {project.description ? <p className="case-summary">{project.description}</p> : null}
        <div className="case-resource-links">
          {project.repositoryUrl ? (
            <Link href={project.repositoryUrl} target="_blank" rel="noreferrer">
              Source repository <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
          {project.demoUrl ? (
            <Link href={project.demoUrl} target="_blank" rel="noreferrer">
              Live demo <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
      </header>

      <Squircle className="case-cover">
        {cover ? (
          <CaseImageTrigger
            index={0}
            className="case-cover-image-button"
            label={"Open image for " + project.title}
          >
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: "contain" }}
            />
          </CaseImageTrigger>
        ) : (
          <div className={"case-cover-placeholder case-cover-art case-cover-art-" + project.slug} aria-hidden="true">
            <span className="case-cover-art-label">{project.category ?? "Selected work"}</span>
            <span className="case-cover-art-mark">{(project.title ?? "P").slice(0, 1)}</span>
            <span className="case-cover-art-caption">{project.medium ?? project.title}</span>
          </div>
        )}
      </Squircle>

      {metaItems.length ? (
        <dl className="case-meta">
          {metaItems.map((item) => (
            <div className="case-meta-item" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {project.overview?.length || project.description ? (
        <section className="case-overview" aria-labelledby="case-overview-title">
          <h2 id="case-overview-title">Overview</h2>
          {project.overview?.length ? (
            project.overview.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : project.description ? (
            <p>{project.description}</p>
          ) : null}
        </section>
      ) : null}

      {project.processSteps?.length ? (
        <section className="case-process" aria-labelledby="case-process-title">
          <h2 id="case-process-title">Process</h2>
          <div className="case-process-strip">
            {project.processSteps.map((step, index) => (
              <article className="case-process-step" key={index}>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {resultImages.length ? (
        <section className="case-results" aria-labelledby="case-results-title">
          <h2 id="case-results-title">Final result</h2>
          <div className="case-results-list">
            {resultImages.map((image, index) => (
              <CaseImageTrigger
                className="case-result-image"
                key={image.src}
                index={index + 1}
                label={"Open result image " + (index + 1) + " for " + project.title}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 80rem) 80vw, 100vw"
                  style={{ objectFit: "contain" }}
                />
              </CaseImageTrigger>
            ))}
          </div>
        </section>
      ) : null}

      <nav className="case-next" aria-label="Project navigation">
        <span className="case-next-label">Next project</span>
        <Link href={"/work/" + nextProject.slug} className="case-next-link">
          <span>{nextProject.title}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </nav>

      <CaseLightbox images={lightboxImages} />
    </main>
  )
}
