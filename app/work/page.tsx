// Redirect: the portfolio is now a single page, so this route sends visitors to the matching section.
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/#work")
}

// ---------------------------------------------------------------------------
// Previous page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import type { Metadata } from "next";
// import FeaturedWork from "@/components/portfolio/FeaturedWork";
//
// export const metadata: Metadata = {
//   title: "Selected Work",
//   description: "Projects and source-linked engineering work by Sanjeev Kumar.",
// };
//
// export default function WorkPage() {
//   return (
//     <main className="portfolio-standalone-showcase work-standalone">
//       <FeaturedWork />
//     </main>
//   );
// }
