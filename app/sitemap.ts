import type { MetadataRoute } from "next"
// import { getWorkData } from "@/lib/work"

export const dynamic = "force-static"

const siteRoot = "https://knockknock10.github.io/Portfolio"

export default function sitemap(): MetadataRoute.Sitemap {
  // The site is a single page now; the other routes redirect to sections of it.
  const fixedRoutes = [""]
  /* Previous routes:
  const previousRoutes = [
    "",
    "/about",
    "/certifications",
    "/contact",
    "/internships",
    "/open-source",
    "/problem-solving",
    "/research",
    "/signals",
    "/work",
  ]
  const workRoutes = getWorkData().items.map((item) => "/work/" + encodeURIComponent(item.slug))
  */
  return [...new Set(fixedRoutes)].map((route) => ({
    url: siteRoot + route + (route === "" || route === "/" ? "/" : "/"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.65,
  }))
}
