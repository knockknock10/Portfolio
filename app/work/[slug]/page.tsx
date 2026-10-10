import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Squircle } from "@/components/primitives"
import styles from "@/components/work/WorkExperience.module.css"
import { getWorkData, isAvailable, type WorkItem } from "@/lib/work"

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getWorkData().items.map((item) => ({ slug: item.slug }))
}

export const dynamicParams = false

function findItem(slug: string): WorkItem | undefined {
  return getWorkData().items.find((item) => item.slug === slug)
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = findItem(slug)
  if (!item) return {}

  return {
    title: item.title,
    ...(item.description ? { description: item.description } : {}),
    openGraph: {
      title: item.title,
      ...(item.description ? { description: item.description } : {}),
      ...(item.coverSrc ? { images: [{ url: item.coverSrc, alt: `${item.title} cover` }] } : {}),
    },
  }
}

function displayDate(value: string): string {
  return value.slice(0, 10)
}

function metaRows(item: WorkItem): Array<{ label: string; value: string }> {
  if (item.type === "repo") {
    const rows: Array<{ label: string; value: string }> = []
    const fields: Array<[string, string | number | boolean]> = [
      ["Language", item.repo.language as string],
      ["Stars", item.repo.stargazers_count as number],
      ["Forks", item.repo.forks_count as number],
      ["Watchers", item.repo.watchers_count as number],
      ["Open issues", item.repo.open_issues_count as number],
      ["License", item.repo.license as string],
      ["Created", item.repo.created_at as string],
      ["Last pushed", item.repo.pushed_at as string],
    ]
    for (const [label, value] of fields) {
      if (!isAvailable(value as string | number | boolean | "MISSING")) continue
      rows.push({
        label,
        value:
          typeof value === "string" && (label === "Created" || label === "Last pushed")
            ? displayDate(value)
            : String(value),
      })
    }
    return rows
  }

  const rows: Array<{ label: string; value: string }> = []
  const fields: Array<[string, string | number]> = [
    ["Year", item.project.year as string],
    ["Role", item.project.role as string],
    ["Client", item.project.client as string],
    ["Medium / stack", item.project.medium as string],
  ]
  for (const [label, value] of fields) {
    if (!isAvailable(value as string | number | "MISSING")) continue
    rows.push({ label, value: String(value) })
  }
  return rows
}

function externalLinks(item: WorkItem): Array<{ label: string; url: string }> {
  if (item.type === "repo") {
    const links = [{ label: "Repository", url: item.repo.html_url }]
    if (isAvailable(item.repo.homepage) && /^https?:\/\//i.test(item.repo.homepage)) {
      links.push({ label: "Homepage", url: item.repo.homepage })
    }
    return links
  }

  const links: Array<{ label: string; url: string }> = []
  if (isAvailable(item.project.repoUrl) && /^https?:\/\//i.test(item.project.repoUrl)) {
    links.push({ label: "Repository", url: item.project.repoUrl })
  }
  if (isAvailable(item.project.liveUrl) && /^https?:\/\//i.test(item.project.liveUrl)) {
    links.push({ label: "Live project", url: item.project.liveUrl })
  }
  return links
}

function itemTags(item: WorkItem): string[] {
  if (item.type === "repo") return item.repo.topics.filter((topic) => topic && topic !== "MISSING")
  return isAvailable(item.project.tags)
    ? item.project.tags.filter((tag) => tag && tag !== "MISSING")
    : []
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const data = getWorkData()
  const index = data.items.findIndex((item) => item.slug === slug)
  const item = data.items[index]
  if (!item) notFound()

  const nextItem =
    data.items.slice(index + 1).find((candidate) => candidate.type === item.type) ??
    data.items.slice(0, index).find((candidate) => candidate.type === item.type)
  const tags = itemTags(item)
  const metaItems = metaRows(item)
  const links = externalLinks(item)
  const isProject = item.type === "project"
  const project = isProject ? item.project : null
  const longDescription =
    project && isAvailable(project.longDescription)
      ? project.longDescription.filter((paragraph) => paragraph && paragraph !== "MISSING")
      : []
  const processSteps =
    project && isAvailable(project.process)
      ? project.process.filter((step) => step.title !== "MISSING" || step.description !== "MISSING")
      : []
  const outcomes = project ? project.outcomes : "MISSING"
  const availableOutcomes = isAvailable(outcomes)
    ? Array.isArray(outcomes)
      ? outcomes.filter((outcome) => outcome && outcome !== "MISSING")
      : [outcomes]
    : []

  return (
    <main
      className={`case-page ${isProject && longDescription.length ? "case-page-long" : "case-page-minimal"}`}
    >
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

      <Squircle className={`case-cover ${styles.detailCover}`}>
        {item.coverSrc ? (
          <Image
            src={item.coverSrc}
            alt={`${item.title} cover`}
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover" }}
          />
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
          {metaItems.map((meta) => (
            <div className="case-meta-item" key={meta.label}>
              <dt>{meta.label}</dt>
              <dd>{meta.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {item.description ? (
        <section className="case-overview" aria-labelledby="case-overview-title">
          <h2 id="case-overview-title">Brief</h2>
          <p>{item.description}</p>
          {longDescription.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </section>
      ) : longDescription.length ? (
        <section className="case-overview" aria-labelledby="case-overview-title">
          <h2 id="case-overview-title">Brief</h2>
          {longDescription.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </section>
      ) : null}

      {tags.length ? (
        <ul
          className={styles.caseTopics}
          aria-label={item.type === "repo" ? "Repository topics" : "Project tags"}
        >
          {tags.map((tag) => (
            <li className="work-tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {links.length ? (
        <nav className={styles.caseLinks} aria-label="Related links">
          {links.map((link) => (
            <a
              className={styles.caseExternalLink}
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      ) : null}

      {processSteps.length ? (
        <section className="case-process" aria-labelledby="case-process-title">
          <h2 id="case-process-title">Process</h2>
          <div className="case-process-strip">
            {processSteps.map((step, stepIndex) => (
              <article className="case-process-step" key={`${step.title}-${stepIndex}`}>
                {step.title !== "MISSING" ? <h3>{step.title}</h3> : null}
                {step.description !== "MISSING" ? <p>{step.description}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {availableOutcomes.length ? (
        <section className="case-results" aria-labelledby="case-results-title">
          <h2 id="case-results-title">Final result</h2>
          <ul className="case-results-list">
            {availableOutcomes.map((outcome, outcomeIndex) => (
              <li key={outcomeIndex}>{outcome}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.type === "repo" && item.recentCommits?.length ? (
        <section className="case-overview" aria-labelledby="recent-commits-title">
          <h2 id="recent-commits-title">Recent commits</h2>
          <ul className={styles.commitList}>
            {item.recentCommits.slice(0, 5).map((commit) => (
              <li key={commit.sha}>
                <span>{commit.message.slice(0, 80)}</span>
                <time dateTime={commit.date}>{displayDate(commit.date)}</time>
                <a
                  href={commit.url}
                  className={styles.caseExternalLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`View commit ${commit.sha.slice(0, 7)}`}
                >
                  <code>{commit.sha.slice(0, 7)}</code>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.type === "repo" && item.organization ? (
        <section className={styles.caseOrganization} aria-labelledby="org-contributions-title">
          {isAvailable(item.organization.avatar_url) ? (
            <Image
              className={styles.orgAvatar}
              src={item.organization.avatar_url}
              alt={`${item.organization.login} logo`}
              width={48}
              height={48}
              unoptimized
            />
          ) : null}
          <div className={styles.orgContent}>
            <h2 id="org-contributions-title" className={styles.orgTitle}>
              Contributions to{" "}
              <a href={item.organization.url} className={styles.caseExternalLink}>
                {item.organization.login}
              </a>
            </h2>
            {isAvailable(item.organization.description) ? (
              <p className={styles.orgDescription}>{item.organization.description}</p>
            ) : null}
            <div className={styles.orgStats}>
              {isAvailable(item.organization.membership) ? (
                <span>{item.organization.membership}</span>
              ) : null}
              {isAvailable(item.organization.public_repos) ? (
                <span>{item.organization.public_repos} public repositories</span>
              ) : null}
              {isAvailable(item.organization.followers) ? (
                <span>{item.organization.followers} followers</span>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {nextItem ? (
        <nav className="case-next" aria-label="Work item navigation">
          <span className="case-next-label">
            Next {item.type === "repo" ? "repository" : "project"}
          </span>
          <Link href={`/work/${nextItem.slug}`} className="case-next-link">
            <span>{nextItem.title}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      ) : null}
    </main>
  )
}
