import "server-only"

import { existsSync, readFileSync } from "node:fs"
import { isAbsolute, join, relative, resolve, sep } from "node:path"

export type CraftStep = {
  number: number
  title: string
  description: string
  image?: string
}

type ProjectRecord = Record<string, unknown>

function isRecord(value: unknown): value is ProjectRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function cleanText(value: unknown): string | null {
  if (typeof value !== "string") return null
  const cleaned = value.trim().replaceAll("`", "").trim()
  if (!cleaned || /^MISSING(?:\s|$|—)/i.test(cleaned)) return null
  return cleaned
}

function projectDataSection(markdown: string): string {
  const lines = markdown.split("\n")
  const start = lines.findIndex((line) => line.trim() === "## 5. Project data")
  if (start < 0) return ""

  let end = lines.length
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s/.test(lines[index])) {
      end = index
      break
    }
  }
  return lines.slice(start + 1, end).join("\n")
}

function localImagePath(value: unknown): string | undefined {
  const image = cleanText(value)
  if (!image || /^https?:\/\//i.test(image)) return undefined

  const publicRoot = resolve(process.cwd(), "public")
  const relativeInput = image.replace(/^\/+/, "").replace(/^public\//, "")
  const absolutePath = resolve(publicRoot, relativeInput)
  const relativePath = relative(publicRoot, absolutePath)

  if (
    !relativePath ||
    relativePath === ".." ||
    relativePath.startsWith(".." + sep) ||
    isAbsolute(relativePath) ||
    !existsSync(absolutePath)
  ) {
    return undefined
  }

  return "/" + relativePath.split(sep).join("/")
}

export function getCraftData(): CraftStep[] {
  try {
    const root = process.cwd()
    const portfolioData = readFileSync(join(root, "PORTFOLIO-DATA.md"), "utf8")
    const contentInventory = readFileSync(join(root, "CONTENT-INVENTORY.md"), "utf8")

    // Require both inventory sources to identify the selected project before using its process.
    if (!/^### CommitHub\s*$/m.test(contentInventory)) return []

    const jsonBlock = projectDataSection(portfolioData).match(/~~~json\s*([\s\S]*?)\s*~~~/)
    if (!jsonBlock) return []

    const parsed: unknown = JSON.parse(jsonBlock[1])
    if (!Array.isArray(parsed)) return []

    const commitHub = parsed.find(
      (project): project is ProjectRecord =>
        isRecord(project) && cleanText(project.title) === "CommitHub",
    )
    if (!commitHub || !Array.isArray(commitHub.process)) return []

    return commitHub.process.slice(0, 4).flatMap((rawStep, index): CraftStep[] => {
      if (!isRecord(rawStep)) return []

      const title = cleanText(rawStep.title)
      const description = cleanText(rawStep.description)
      if (!title || !description) return []

      const image = localImagePath(rawStep.image)
      const step: CraftStep = { number: index + 1, title, description }
      if (image) step.image = image
      return [step]
    })
  } catch {
    return []
  }
}
