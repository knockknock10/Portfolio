import "server-only"
import { getContent } from "@/lib/content.server"
import type { ImageAsset, PortfolioContent, ProjectContent } from "@/lib/content"

export type WorkImage = {
  src: string
  alt: string
  projectTitle: string
  width?: number
  height?: number
}

export type WorkProject = ProjectContent & {
  slug: string
  galleryImages: WorkImage[]
  resultImages: WorkImage[]
}

export function slugForProject(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function parseDimensions(value: string | null): { width?: number; height?: number } {
  if (!value) return {}
  const match = value.match(/(\d+)\s*[x×]\s*(\d+)/i)
  if (!match) return {}
  const width = Number(match[1])
  const height = Number(match[2])
  return width > 0 && height > 0 ? { width, height } : {}
}

function getKnownLocalImages(
  paths: string[] | null,
  projectTitle: string,
  portfolio: PortfolioContent,
): WorkImage[] {
  if (!paths?.length) return []
  const knownAssets = new Map<string, ImageAsset>(
    (portfolio.images ?? []).map((asset) => [asset.path, asset]),
  )

  return paths.flatMap((path) => {
    const asset = knownAssets.get(path)
    if (!asset || !asset.path.startsWith("public/")) return []
    const src = "/" + asset.path.slice("public/".length)
    if (!/^\/[a-zA-Z0-9/_ .-]+\.(?:svg|png|jpe?g|webp|gif|avif)$/i.test(src)) return []
    return [{
      src,
      alt: asset.description ?? "",
      projectTitle,
      ...parseDimensions(asset.dimensions),
    }]
  })
}

export function getWorkProjects(): WorkProject[] {
  const portfolio = getContent()
  return (portfolio.projects ?? []).flatMap((project) => {
    if (!project.title) return []
    return [{
      ...project,
      slug: slugForProject(project.title),
      galleryImages: getKnownLocalImages(project.imagePaths, project.title, portfolio),
      resultImages: getKnownLocalImages(project.resultImagePaths, project.title, portfolio),
    }]
  })
}
