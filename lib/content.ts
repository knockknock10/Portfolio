export type NullableText = string | null

export interface IdentityContent {
  fullName: NullableText
  professionalName: NullableText
  pronouns: NullableText
  roleTitle: NullableText
  tagline: NullableText
  shortBio: NullableText
  longBio: NullableText
  availabilityStatus: NullableText
  availabilityStatement: NullableText
}

export interface CraftStep {
  title: string
  description: string
}

export interface ContactContent {
  email: NullableText
  phone: NullableText
  location: NullableText
}

export interface SocialLink {
  platform: string
  url: NullableText
}

export interface ProjectContent {
  title: NullableText
  category: NullableText
  status: NullableText
  description: NullableText
  year: NullableText
  client: NullableText
  medium: NullableText
  tags: string[] | null
  imagePaths: string[] | null
  role: NullableText
  tools: string[] | null
  overview: string[] | null
  processSteps: string[] | null
  resultImagePaths: string[] | null
}

export interface ImageAsset {
  path: string
  dimensions: NullableText
  description: NullableText
}

export interface BrandAssets {
  logo: NullableText
  favicon: NullableText
  colors: string[] | null
  fonts: string[] | null
}

export interface CollaboratorCredit {
  name: NullableText
  role: NullableText
  details: NullableText
}

export interface PortfolioContent {
  identity: IdentityContent
  contact: ContactContent
  socials: SocialLink[] | null
  projects: ProjectContent[] | null
  skills: string[] | null
  tools: string[] | null
  resumePath: NullableText
  resumeText: NullableText
  brandAssets: BrandAssets
  images: ImageAsset[] | null
  collaboratorCredits: CollaboratorCredit[] | null
  craftSteps: CraftStep[] | null
  influences: string[] | null
}

function isMissing(value: string): boolean {
  return /^\s*MISSING(?:\s|$|—)/i.test(value)
}

function cleanCell(value: string | undefined): NullableText {
  if (value === undefined) return null
  const cleaned = value.trim().replaceAll(String.fromCharCode(96), "").trim()
  return cleaned === "" || isMissing(cleaned) ? null : cleaned
}

function section(markdown: string, heading: string): string {
  const lines = markdown.split("\n")
  const start = lines.findIndex((line) => line.trim() === "## " + heading)
  if (start < 0) return ""
  const collected: string[] = []
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s/.test(lines[index])) break
    collected.push(lines[index])
  }
  return collected.join("\n")
}

function tableValue(markdown: string, labels: string[]): NullableText {
  for (const line of markdown.split("\n")) {
    if (!line.trim().startsWith("|")) continue
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim())
    if (cells.length < 2) continue
    const label = cleanCell(cells[0])
    if (label && labels.some((candidate) => label.toLowerCase() === candidate.toLowerCase())) {
      return cleanCell(cells[1])
    }
  }
  return null
}

function bulletValue(markdown: string, labels: string[]): NullableText {
  for (const line of markdown.split("\n")) {
    const match = line.match(/^\s*[-*]\s*\*\*([^*]+):?\*\*\s*(.*)$/)
    if (!match) continue
    const label = match[1].replace(/:\s*$/, "").trim().toLowerCase()
    if (labels.some((candidate) => candidate.toLowerCase() === label)) {
      return cleanCell(match[2].replace(/^\s*—\s*/, ""))
    }
  }
  return null
}

function listFromLine(value: NullableText): string[] | null {
  if (!value) return null
  const items = value
    .split(/,\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
  return items.length ? items : null
}

function nestedBulletValue(markdown: string, labels: string[]): string[] | null {
  const lines = markdown.split("\n")
  const accepted = labels.map((label) => label.toLowerCase())
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\s*-\s*\*\*([^*]+):?\*\*\s*(.*)$/)
    if (!match) continue
    const label = match[1].replace(/:\s*$/, "").trim().toLowerCase()
    if (!accepted.includes(label)) continue

    const values: string[] = []
    const inlineValue = cleanCell(match[2])
    if (inlineValue) values.push(inlineValue)

    for (let next = index + 1; next < lines.length; next += 1) {
      if (/^\s*-\s*\*\*/.test(lines[next])) break
      const nested = lines[next].match(/^\s{2,}-\s+(.+)\s*$/)
      if (!nested) {
        if (lines[next].trim()) break
        continue
      }
      const value = cleanCell(nested[1])
      if (value) values.push(value)
    }
    return values.length ? values : null
  }
  return null
}

function headings(markdown: string): Array<{ title: string; body: string }> {
  const found: Array<{ title: string; start: number; bodyStart: number }> = []
  const pattern = /^#{3,4}\s+(.+)\s*$/gm
  let match: RegExpExecArray | null
  while ((match = pattern.exec(markdown))) {
    found.push({ title: match[1].trim(), start: match.index, bodyStart: pattern.lastIndex })
  }
  return found.map((item, index) => ({
    title: item.title,
    body: markdown.slice(item.bodyStart, found[index + 1]?.start ?? markdown.length),
  }))
}

function parseProjects(markdown: string): ProjectContent[] | null {
  const projectsSection = section(markdown, "Projects and work records")
  const blocks = headings(projectsSection).filter(
    ({ title }) => !title.toLowerCase().includes("additional work items"),
  )
  const projects = blocks.map(({ title, body }) => ({
    title: cleanCell(title),
    category: bulletValue(body, ["category"]),
    status: bulletValue(body, ["status"]),
    description:
      bulletValue(body, ["summary", "description", "overview"]) ??
      nestedBulletValue(body, ["description, verbatim"])?.[0] ??
      null,
    year: bulletValue(body, ["year"]),
    client: bulletValue(body, ["client"]),
    medium: bulletValue(body, ["medium", "medium / technologies as printed"]),
    tags: listFromLine(bulletValue(body, ["tags"])),
    imagePaths: listFromLine(bulletValue(body, ["associated image paths", "image paths"])),
    role: bulletValue(body, ["role", "project role"]),
    tools: listFromLine(bulletValue(body, ["tools"])),
    overview: nestedBulletValue(body, ["overview, verbatim", "overview"]),
    processSteps: nestedBulletValue(body, ["process steps", "process"]),
    resultImagePaths: listFromLine(bulletValue(body, ["result image paths", "screenshots", "final result images"])),
  }))
  return projects.length ? projects : null
}

function parseImages(markdown: string): ImageAsset[] | null {
  const imageSection = section(markdown, "Complete image asset list")
  const rows: ImageAsset[] = []
  for (const line of imageSection.split("\n")) {
    if (!line.trim().startsWith("|")) continue
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim())
    if (cells.length < 3 || /^-+$/.test(cells[0])) continue
    const path = cleanCell(cells[0])
    if (!path || path.toLowerCase() === "path") continue
    rows.push({ path, dimensions: cleanCell(cells[1]), description: cleanCell(cells[2]) })
  }
  return rows.length ? rows : null
}

function parseColors(markdown: string): string[] | null {
  const matches = section(markdown, "Existing brand assets and design tokens").match(
    /#[0-9a-fA-F]{3,8}\b/g,
  )
  return matches?.length ? [...new Set(matches)] : null
}

function skillItems(markdown: string): string[] {
  const values: string[] = []
  for (const line of markdown.split("\n")) {
    const group = line.match(/^\s*[-*]\s+\*\*[^*]+:\*\*:?\s*(.*)$/)
    if (!group) continue
    for (const part of group[1].split(/,\s*/)) {
      const value = cleanCell(part.replaceAll("**", ""))
      if (value && !isMissing(value)) values.push(value)
    }
  }
  return [...new Set(values)]
}

function parseSkills(markdown: string, heading: string): string[] | null {
  const values = skillItems(section(markdown, heading))
  return values.length ? values : null
}

function parseTools(markdown: string): string[] | null {
  const text = section(markdown, "Skills, tools, software, and technical terms")
  const resumeSkills = section(text, "Résumé skills")
  const source = resumeSkills || text
  const found: string[] = []
  for (const line of source.split("\n")) {
    const match = line.match(/^\s*[-*]\s+\*\*Tools:\*\*\s*(.*)$/)
    if (!match) continue
    for (const item of match[1].split(/,\s*/)) {
      const value = cleanCell(item.replaceAll("**", ""))
      if (value && !isMissing(value)) found.push(value)
    }
  }
  return found.length ? [...new Set(found)] : null
}


function parseCraftSteps(markdown: string): CraftStep[] | null {
  const candidates = ["Craft", "How I work", "Process", "Workflow", "Methodology", "Development process", "Engineering process"]
  let source = ""
  for (const candidate of candidates) {
    const candidateSection = section(markdown, candidate)
    if (candidateSection.trim()) {
      source = candidateSection
      break
    }
  }
  if (!source.trim() || source.trim().startsWith("MISSING")) return null

  const fromHeadings = headings(source).flatMap(({ title, body }) => {
    const normalizedTitle = title.replace(/^step\s*\d+[:.)\s-]*/i, "").trim()
    const paragraph = body.split("\n").map((line) => line.trim()).find(
      (line) => line && !line.startsWith("#") && !line.startsWith("|") && !line.startsWith("-"),
    )
    if (!normalizedTitle || !paragraph) return []
    const description = cleanCell(paragraph.replace(/^\*\*(.+?)\*\*\s*[—–:-]\s*/, "$1"))
    return description ? [{ title: normalizedTitle, description }] : []
  })
  if (fromHeadings.length) return fromHeadings.slice(0, 4)

  const fromLines = source.split("\n").flatMap((line) => {
    const match = line.match(/^\s*(?:[-*]\s+|\d+[.)]\s+)\*\*([^*]+)\*\*\s*(?:[—–:]\s*|[-]\s+)(.+?)\s*$/)
    if (!match) return []
    const title = cleanCell(match[1])
    const description = cleanCell(match[2])
    return title && description ? [{ title, description }] : []
  })
  return fromLines.length ? fromLines.slice(0, 4) : null
}

function parseInfluences(markdown: string): string[] | null {
  const source = section(markdown, "Influences") || section(markdown, "Creative influences")
  if (!source.trim() || source.trim().startsWith("MISSING")) return null
  const values = source.split("\n").flatMap((line) => {
    const match = line.match(/^\s*(?:[-*]\s+|\d+[.)]\s+)(.+?)\s*$/)
    if (!match) return []
    const value = cleanCell(match[1].replace(/^\*\*(.+?)\*\*$/, "$1"))
    return value ? [value] : []
  })
  return values.length ? [...new Set(values)] : null
}

function parseCollaborators(markdown: string): CollaboratorCredit[] | null {
  const text = section(markdown, "Collaborator credits")
  if (!text.trim() || /^\s*MISSING/.test(text.trim())) return null
  const entries = headings(text).map(({ title, body }) => ({
    name: cleanCell(title),
    role: bulletValue(body, ["role", "title"]),
    details: cleanCell(body.trim()),
  }))
  return entries.length ? entries : null
}

export function parseContentInventory(markdown: string): PortfolioContent {
  const identity = section(markdown, "Identity")
  const contacts = section(markdown, "Contact and social links")
  const brand = section(markdown, "Existing brand assets and design tokens")
  const shortBio = tableValue(identity, ["Short bio"])
  const longBio = tableValue(identity, ["Long bio"])
  const resumeText = section(markdown, "Résumé / CV content").trim() || null
  const imageRows = parseImages(markdown)
  const faviconRow = imageRows?.find((item) => item.path.endsWith("favicon.svg"))
  const socialFields = [
    ["GitHub profile", "GitHub profile"],
    ["LinkedIn", "LinkedIn text in résumé"],
    ["Instagram", "Instagram"],
    ["X / Twitter", "X / Twitter"],
    ["ArtStation", "ArtStation"],
    ["Pixiv", "Pixiv"],
    ["Behance", "Behance"],
    ["Discord", "Discord"],
    ["Bluesky", "Bluesky"],
    ["Personal site URL", "Personal site URL"],
    ["LeetCode profile", "LeetCode profile"],
  ] as const
  const socials = socialFields.map(([platform, label]) => ({
    platform,
    url: tableValue(contacts, [label]),
  }))
  return {
    identity: {
      fullName: tableValue(identity, ["Full name"]),
      professionalName: tableValue(identity, ["Professional name", "Pen name"]),
      pronouns: tableValue(identity, ["Pronouns"]),
      roleTitle: tableValue(identity, ["Role / title", "Role / title / tagline"]),
      tagline: tableValue(identity, ["Hero statement", "Tagline"]),
      shortBio,
      longBio,
      availabilityStatus: tableValue(identity, ["Availability status"]),
      availabilityStatement: tableValue(identity, ["Availability statement"]),
    },
    contact: {
      email: tableValue(contacts, ["Email configured in site", "Email"]),
      phone: tableValue(contacts, ["Phone"]),
      location: tableValue(contacts, ["Location"]),
    },
    socials,
    projects: parseProjects(markdown),
    skills: parseSkills(markdown, "Skills, tools, software, and technical terms"),
    tools: parseTools(markdown),
    resumePath: tableValue(contacts, ["Résumé file"]) ?? (resumeText ? "public/resume.pdf" : null),
    resumeText,
    brandAssets: {
      logo: tableValue(brand, ["Logo file"]),
      favicon: faviconRow?.path ?? null,
      colors: parseColors(markdown),
      fonts: (() => {
        const line = brand.split("\n").find((item) => item.includes("**Font families:**"))
        const values = line?.match(/`[^`]+`/g)?.map((value) => value.slice(1, -1)) ?? []
        const families = values.filter((value) => !value.startsWith("@fontsource-"))
        return families.length ? families : null
      })(),
    },
    images: imageRows,
    collaboratorCredits: parseCollaborators(markdown),
    craftSteps: parseCraftSteps(markdown),
    influences: parseInfluences(markdown),
  }
}

