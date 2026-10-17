import type { NextConfig } from "next"

const isGitHubPages = process.env.GITHUB_PAGES === "true"
const basePath = isGitHubPages ? "/Portfolio" : ""

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    // GitHub Pages is static hosting and cannot run Next's image optimization API.
    unoptimized: isGitHubPages,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
