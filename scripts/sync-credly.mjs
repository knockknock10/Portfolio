// Pulls the public badge list from Credly into data/credly.json.
// Run by the scheduled deploy so new badges show up without editing the site.
// If Credly cannot be reached or the shape changes, the existing file is left alone.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const file = join(root, "data", "credly.json")
const handle = process.env.CREDLY_USER || "sanjeev-kumar.390a21e2"

const current = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { badges: [] }

function pick(badge) {
  const template = badge.badge_template ?? {}
  const issuer =
    template.issuer?.entities?.[0]?.entity?.name ?? template.issuer?.name ?? badge.issuer?.name ?? badge.issuer_name ?? null
  return {
    id: badge.id ?? null,
    name: template.name ?? badge.name ?? null,
    issuer,
    issuedAt: badge.issued_at_date ?? badge.issued_at ?? null,
    url: badge.id ? `https://www.credly.com/badges/${badge.id}` : `https://www.credly.com/users/${handle}`,
    image: template.image_url ?? template.image?.url ?? badge.image_url ?? null,
  }
}

try {
  const all = []
  for (let page = 1; page <= 5; page += 1) {
    const response = await fetch(`https://www.credly.com/users/${handle}/badges.json?page=${page}&sort=-state_updated_at`, {
      headers: { accept: "application/json", "user-agent": "portfolio-sync" },
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new Error(`Credly answered ${response.status}`)
    const body = await response.json()
    const rows = Array.isArray(body?.data) ? body.data : []
    all.push(...rows)
    const total = body?.metadata?.total_pages ?? 1
    if (page >= total || !rows.length) break
  }
  const badges = all.map(pick).filter((item) => item.name)
  if (!badges.length) throw new Error("No badges in response")
  writeFileSync(file, JSON.stringify({ syncedAt: new Date().toISOString(), profile: `https://www.credly.com/users/${handle}`, badges }, null, 2) + "\n")
  console.log(`Synced ${badges.length} badges from Credly.`)
} catch (error) {
  console.warn(`Credly sync skipped: ${error.message}. Keeping ${current.badges?.length ?? 0} saved badges.`)
}
