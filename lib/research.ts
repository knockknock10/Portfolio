import "server-only"

import { existsSync, readFileSync } from "node:fs"
import { isAbsolute, join, relative, resolve, sep } from "node:path"

export type ResearchMissing = "MISSING"

export interface ResearchItem {
  title: string
  type: string | ResearchMissing
  venue: string | ResearchMissing
  year: string | ResearchMissing
  authors: string[] | ResearchMissing
  abstract: string | ResearchMissing
  link: string | ResearchMissing
  status: string | ResearchMissing
  image: string | ResearchMissing
  tags: string[]
}

function cleanText(value: unknown): string | null {
  if (typeof value !== "string") return null
  const text = value.trim()
  if (!text || /^MISSING(?:\s|$|—)/i.test(text)) return null
  return text
}

function readResearchSection(markdown: string): string {
  const lines = markdown.split("\n")
  const start = lines.findIndex((line) => line.trim() === "## SECTION 9 — RESEARCH")
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

function sectionRecords(source: string): unknown[] {
  const match = source.match(/~~~json\s*([\s\S]*?)\s*~~~/)
  if (!match) return []
  try {
    const parsed: unknown = JSON.parse(match[1])
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function publicImage(value: unknown): string | "MISSING" {
  const text = cleanText(value)
  if (!text || /^https?:\/\//i.test(text)) return "MISSING"
  const publicRoot = resolve(process.cwd(), "public")
  const relativeInput = text.replace(/^\/+/, "").replace(/^public\//, "")
  const absolutePath = resolve(publicRoot, relativeInput)
  const relativePath = relative(publicRoot, absolutePath)
  if (
    !relativePath ||
    relativePath === ".." ||
    relativePath.startsWith(".." + sep) ||
    isAbsolute(relativePath) ||
    !/\.(svg|png|jpe?g|webp|gif|avif)$/i.test(relativePath) ||
    !existsSync(absolutePath)
  ) {
    return "MISSING"
  }
  return "/" + relativePath.split(sep).join("/")
}

function validUrl(value: unknown): string | "MISSING" {
  const text = cleanText(value)
  return text && /^https?:\/\//i.test(text) ? text : "MISSING"
}

function textField(record: Record<string, unknown>, key: string): string | "MISSING" {
  return cleanText(record[key]) ?? "MISSING"
}

export function getResearchData(): ResearchItem[] {
  try {
    const markdown = readFileSync(join(process.cwd(), "PORTFOLIO-DATA.md"), "utf8")
    const source = readResearchSection(markdown)
    return sectionRecords(source).flatMap((raw): ResearchItem[] => {
      if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return []
      const record = raw as Record<string, unknown>
      const title = cleanText(record.title)
      if (!title) return []
      const authors = Array.isArray(record.authors)
        ? record.authors.map(cleanText).filter((value): value is string => value !== null)
        : []
      const tags = Array.isArray(record.tags)
        ? record.tags.map(cleanText).filter((value): value is string => value !== null)
        : []
      return [{
        title,
        type: textField(record, "type"),
        venue: textField(record, "venue"),
        year: textField(record, "year"),
        authors: authors.length ? authors : "MISSING",
        abstract: textField(record, "abstract"),
        link: validUrl(record.link),
        status: textField(record, "status"),
        image: publicImage(record.image),
        tags,
      }]
    })
  } catch {
    return []
  }
}
