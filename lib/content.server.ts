import "server-only"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { parseContentInventory } from "@/lib/content"
import type { PortfolioContent } from "@/lib/content"

export function getContent(): PortfolioContent {
  const inventoryPath = join(process.cwd(), "CONTENT-INVENTORY.md")
  const inventoryMarkdown = readFileSync(inventoryPath, "utf8")
  return parseContentInventory(inventoryMarkdown)
}
