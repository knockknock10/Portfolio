import { content } from "@/lib/content"

function hasLocalWorkImage(paths: string[] | null) {
  return Boolean(paths?.some((path) => /^(public|assets|content|static)\//i.test(path)))
}

export default function WorkPage() {
  const heading = content.projects?.find((project) => project.title && hasLocalWorkImage(project.imagePaths))?.title

  if (!heading) return null

  return (
    <main className="route-shell">
      <h1 className="route-shell-title">{heading}</h1>
    </main>
  )
}
