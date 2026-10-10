import { getContent } from "@/lib/content.server"

export default function WorkPage() {
  const projects = getContent().projects ?? []
  const firstTitle = projects.find((project) => project.title)?.title

  if (!firstTitle) return null

  return (
    <main className="route-shell">
      <h1 className="route-shell-title">{firstTitle}</h1>
    </main>
  )
}
