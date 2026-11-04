// Redirect: the portfolio is now a single page, so this route sends visitors to the matching section.
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/#research")
}

// ---------------------------------------------------------------------------
// Previous page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import type { Metadata } from "next"
// import ResearchShowcase from "@/components/sections/ResearchShowcase"
// import { getResearchData } from "@/lib/research"
//
// export const metadata: Metadata = {
//   title: "Research",
//   description: "Research projects and experience by Sanjeev Kumar.",
// }
//
// export default function ResearchPage() {
//   const items = getResearchData()
//   if (!items.length) {
//     return (
//       <main className="editorial-page empty-editorial-page">
//         <h1>Research</h1>
//         <p>Research is coming.</p>
//       </main>
//     )
//   }
//   return (
//     <main className="research-route">
//       <ResearchShowcase items={items} standalone />
//     </main>
//   )
// }
