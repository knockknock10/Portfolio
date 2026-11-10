import "server-only"

import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

export type CredlyBadge = {
  id: string | null
  name: string
  issuer: string | null
  issuedAt: string | null
  url: string
  image: string | null
}

export type CredlyData = { syncedAt: string | null; profile: string; badges: CredlyBadge[] }

/** Badge list saved by scripts/sync-credly.mjs (refreshed on every scheduled deploy). */
export function getCredly(): CredlyData {
  const fallback: CredlyData = { syncedAt: null, profile: "https://www.credly.com", badges: [] }
  try {
    const file = join(process.cwd(), "data", "credly.json")
    if (!existsSync(file)) return fallback
    const raw = JSON.parse(readFileSync(file, "utf8")) as Partial<CredlyData>
    const badges = (raw.badges ?? []).filter((b): b is CredlyBadge => typeof b?.name === "string" && typeof b?.url === "string")
    return { syncedAt: raw.syncedAt ?? null, profile: raw.profile ?? fallback.profile, badges }
  } catch {
    return fallback
  }
}
