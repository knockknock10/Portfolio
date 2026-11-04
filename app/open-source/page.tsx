// Redirect: the portfolio is now a single page, so this route sends visitors to the matching section.
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/#open-source")
}

// ---------------------------------------------------------------------------
// Previous page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import type { Metadata } from "next";
// import OpenSourceShowcase from "@/components/portfolio/OpenSourceShowcase";
//
// export const metadata: Metadata = {
//   title: "Open Source",
//   description: "Source-linked upstream contributions and open-source work by Sanjeev Kumar.",
// };
//
// export default function OpenSourcePage() {
//   return (
//     <main className="portfolio-standalone-showcase open-source-standalone">
//       <OpenSourceShowcase />
//     </main>
//   );
// }
