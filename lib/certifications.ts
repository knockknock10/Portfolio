import "server-only"

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { isAbsolute, join, relative, resolve, sep } from "node:path"

export type CertificationField = string | "MISSING"
export type VerificationStatus = "verified" | "self-reported"

export interface Certification {
  title: string
  issuer: CertificationField
  issueDate: CertificationField
  expiryDate: CertificationField
  credentialId: CertificationField
  credentialUrl: CertificationField
  skillsCovered: string[] | "MISSING"
  badgeImage: string | "MISSING"
  certificateImage: string | "MISSING"
  verificationStatus: VerificationStatus
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null
  const cleaned = value.trim()
  return !cleaned || /^MISSING(?:\s|$|—)/i.test(cleaned) ? null : cleaned
}

function section(markdown: string): string {
  const lines = markdown.split("\n")
  const start = lines.findIndex((line) => line.trim() === "## SECTION 11 — CERTIFICATIONS")
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

function localImage(value: unknown): string | "MISSING" {
  const path = text(value)
  if (!path || /^https?:\/\//i.test(path)) return "MISSING"
  const root = resolve(process.cwd(), "public")
  const file = resolve(root, path.replace(/^\/+/, "").replace(/^public\//, ""))
  const rel = relative(root, file)
  if (!rel || rel === ".." || rel.startsWith(".." + sep) || isAbsolute(rel) ||
      !/\.(pdf|svg|png|jpe?g|webp|gif|avif)$/i.test(rel) || !existsSync(file)) return "MISSING"
  return "/" + rel.split(sep).join("/")
}

function validUrl(value: unknown): string | "MISSING" {
  const valueText = text(value)
  return valueText && /^https?:\/\//i.test(valueText) ? valueText : "MISSING"
}

function field(record: Record<string, unknown>, ...keys: string[]): string | "MISSING" {
  for (const key of keys) {
    const value = text(record[key])
    if (value) return value
  }
  return "MISSING"
}

function skillList(value: unknown): string[] | "MISSING" {
  if (Array.isArray(value)) {
    const values = value.map(text).filter((item): item is string => item !== null)
    return values.length ? values : "MISSING"
  }
  const raw = text(value)
  if (!raw) return "MISSING"
  const values = raw.split(/\s*[·,;]\s*/).map((item) => item.trim()).filter(Boolean)
  return values.length ? values : "MISSING"
}

function noExpiry(value: string | "MISSING"): boolean {
  return typeof value === "string" && value.toLowerCase() === "no expiry"
}

export function getCertificationsData(): Certification[] {
  try {
    const markdown = readFileSync(join(process.cwd(), "PORTFOLIO-DATA.md"), "utf8")
    const configured = records(section(markdown)).flatMap((raw): Certification[] => {
      if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return []
      const record = raw as Record<string, unknown>
      const title = text(record.title)
      if (!title) return []

      const credentialUrl = validUrl(record.credentialUrl ?? record["credential URL"])
      const expiryRaw = field(record, "expiryDate", "expiry date")
      const expiryDate = noExpiry(expiryRaw) ? "No expiry" : expiryRaw
      const claimedStatus = field(record, "verificationStatus", "verification status").toLowerCase()
      const verificationStatus: VerificationStatus =
        claimedStatus === "verified" && credentialUrl !== "MISSING"
          ? "verified"
          : "self-reported"

      return [{
        title,
        issuer: field(record, "issuer"),
        issueDate: field(record, "issueDate", "issue date"),
        expiryDate,
        credentialId: field(record, "credentialId", "credential ID"),
        credentialUrl,
        skillsCovered: skillList(record.skillsCovered ?? record["skills covered"]),
        badgeImage: localImage(record.badgeImage ?? record["badge image"]),
        certificateImage: localImage(record.certificateImage ?? record["certificate image"]),
        verificationStatus,
      }]
    })

    const certificateDirectory = join(process.cwd(), "public", "certificates")
    const configuredFiles = new Set(
      configured
        .map((item) => item.certificateImage)
        .filter((value): value is string => typeof value === "string" && value !== "MISSING")
        .map((value) => value.split("/").pop()?.toLowerCase() ?? ""),
    )
    const automatic: Certification[] = existsSync(certificateDirectory)
      ? readdirSync(certificateDirectory, { withFileTypes: true })
          .filter((entry) => entry.isFile() && /\.(pdf|png|jpe?g|webp|gif|avif|svg)$/i.test(entry.name))
          .filter((entry) => !configuredFiles.has(entry.name.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }))
          .map((entry): Certification => {
            const rawName = entry.name.replace(/\.(pdf|png|jpe?g|webp|gif|avif|svg)$/i, "")
            const title = rawName
              .replace(/[_-]+/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .replace(/^\w/, (first) => first.toUpperCase()) || "Certificate"
            const certificateImage = "/certificates/" + encodeURIComponent(entry.name)
            return {
              title,
              issuer: "MISSING",
              issueDate: "MISSING",
              expiryDate: "MISSING",
              credentialId: "MISSING",
              credentialUrl: "MISSING",
              skillsCovered: "MISSING",
              badgeImage: "MISSING",
              certificateImage,
              verificationStatus: "self-reported",
            }
          })
      : []

    return [...configured, ...automatic]
  } catch {
    return []
  }
}
