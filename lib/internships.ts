import "server-only"

import { existsSync, readFileSync } from "node:fs"
import { isAbsolute, join, relative, resolve, sep } from "node:path"

export type InternshipField = string | "MISSING"

export interface Internship {
  company: string
  role: InternshipField
  location: InternshipField
  startDate: InternshipField
  endDate: InternshipField
  duration: InternshipField
  summary: InternshipField
  responsibilities: string[] | "MISSING"
  stack: string[] | "MISSING"
  teamSize: InternshipField
  link: InternshipField
  logo: string | "MISSING"
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null
  const cleaned = value.trim()
  return !cleaned || /^MISSING(?:\s|$|—)/i.test(cleaned) ? null : cleaned
}

function section(markdown: string): string {
  const lines = markdown.split("\n")
  const start = lines.findIndex((line) => line.trim() === "## SECTION 10 — INTERNSHIPS")
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

function records(source: string): unknown[] {
  const match = source.match(/~~~json\s*([\s\S]*?)\s*~~~/)
  if (!match) return []
  try {
    const value: unknown = JSON.parse(match[1])
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function dateValue(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const parsed = new Date(value + "T00:00:00Z")
  return Number.isFinite(parsed.getTime()) ? parsed : null
}

function durationBetween(startValue: string, endValue: string): string {
  const start = dateValue(startValue)
  const now = new Date()
  const end = endValue.toLowerCase() === "present" ? now : dateValue(endValue)
  if (!start || !end || end.getTime() < start.getTime()) return "MISSING"

  let months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth())
  if (end.getUTCDate() < start.getUTCDate()) months -= 1
  if (months < 0) return "MISSING"

  if (months === 0) {
    const days = Math.floor((end.getTime() - start.getTime()) / 86400000)
    return days <= 0 ? "Less than 1 day" : days + (days === 1 ? " day" : " days")
  }
  const years = Math.floor(months / 12)
  const remainder = months % 12
  const parts = []
  if (years) parts.push(years + (years === 1 ? " year" : " years"))
  if (remainder) parts.push(remainder + (remainder === 1 ? " month" : " months"))
  return parts.join(", ")
}

function localImage(value: unknown): string | "MISSING" {
  const path = text(value)
  if (!path || /^https?:\/\//i.test(path)) return "MISSING"
  const root = resolve(process.cwd(), "public")
  const file = resolve(root, path.replace(/^\/+/, "").replace(/^public\//, ""))
  const rel = relative(root, file)
  if (!rel || rel === ".." || rel.startsWith(".." + sep) || isAbsolute(rel) ||
      !/\.(svg|png|jpe?g|webp|gif|avif)$/i.test(rel) || !existsSync(file)) return "MISSING"
  return "/" + rel.split(sep).join("/")
}

function validLink(value: unknown): string | "MISSING" {
  const valueText = text(value)
  return valueText && /^https?:\/\//i.test(valueText) ? valueText : "MISSING"
}

function stringField(record: Record<string, unknown>, key: string): string | "MISSING" {
  return text(record[key]) ?? "MISSING"
}

function stringArray(value: unknown): string[] | "MISSING" {
  if (Array.isArray(value)) {
    const result = value.map(text).filter((item): item is string => item !== null)
    return result.length ? result : "MISSING"
  }
  const single = text(value)
  if (!single) return "MISSING"
  const result = single.split(/\s*[·,;]\s*/).map((item) => item.trim()).filter(Boolean)
  return result.length ? result : "MISSING"
}

export function getInternshipsData(): Internship[] {
  try {
    const markdown = readFileSync(join(process.cwd(), "PORTFOLIO-DATA.md"), "utf8")
    return records(section(markdown)).flatMap((raw): Internship[] => {
      if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return []
      const record = raw as Record<string, unknown>
      const company = text(record.company)
      if (!company) return []
      const startDate = stringField(record, "start date")
      const normalizedStart = startDate === "MISSING" ? stringField(record, "startDate") : startDate
      const endDateRaw = stringField(record, "end date")
      const normalizedEnd = endDateRaw === "MISSING" ? stringField(record, "endDate") : endDateRaw
      const summary = stringField(record, "summary")
      return [{
        company,
        role: stringField(record, "role"),
        location: stringField(record, "location"),
        startDate: normalizedStart,
        endDate: normalizedEnd,
        duration: durationBetween(normalizedStart, normalizedEnd),
        summary,
        responsibilities: stringArray(record.responsibilities),
        stack: stringArray(record.stack ?? record.tools),
        teamSize: stringField(record, "team size") === "MISSING" ? stringField(record, "teamSize") : stringField(record, "team size"),
        link: validLink(record.link),
        logo: localImage(record.logo),
      }]
    })
  } catch {
    return []
  }
}
