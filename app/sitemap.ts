import type { MetadataRoute } from "next"
import { getWorkData } from "@/lib/work"

export const dynamic = "force-static"

const siteRoot = "https://knockknock10.github.io/Portfolio"

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedRoutes = [
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
  return [...new Set([...fixedRoutes, ...workRoutes])].map((route) => ({
    url: siteRoot + route + (route === "" || route === "/" ? "/" : "/"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.65,
  }))
}
