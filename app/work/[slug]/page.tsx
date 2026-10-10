import { notFound } from "next/navigation"
import { getContent } from "@/lib/content.server"

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const project = (getContent().projects ?? []).find(
    (item) => item.title && makeSlug(item.title) === slug,
  )

  if (!project?.title) notFound()

  return (
    <main className="route-shell">
      <h1 className="route-shell-title">{project.title}</h1>
    </main>
  )
}
