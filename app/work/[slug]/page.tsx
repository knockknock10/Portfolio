import { content } from "@/lib/content"

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

function hasLocalWorkImage(paths: string[] | null) {
  return Boolean(paths?.some((path) => /^(public|assets|content|static)\//i.test(path)))
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const project = content.projects?.find(
    (item) => item.title && makeSlug(item.title) === slug && hasLocalWorkImage(item.imagePaths),
  )
  const heading = project?.title

  if (!heading) return null

  return (
    <main className="route-shell">
      <h1 className="route-shell-title">{heading}</h1>
    </main>
  )
}
