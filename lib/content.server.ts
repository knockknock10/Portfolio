import "server-only"
import { portfolioContent } from "@/lib/portfolio-data"
import type { PortfolioContent } from "@/lib/content"

/**
 * Return the curated portfolio content without parsing documentation at runtime.
 * Keep this server-only so future private configuration never enters the client bundle.
 */
export function getContent(): PortfolioContent {
  return portfolioContent
}
