const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** Prefix a public-folder path for project-site hosting while leaving absolute URLs untouched. */
export function publicUrl(path: string | null | undefined): string {
  if (!path) return ""
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path) || path.startsWith("#")) return path

  const normalized = "/" + path.replace(/^\/+/, "")
  if (!BASE_PATH || normalized === BASE_PATH || normalized.startsWith(BASE_PATH + "/")) return normalized
  return BASE_PATH + normalized
}
