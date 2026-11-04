// Redirect: the portfolio is now a single page, so this route sends visitors to the matching section.
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/#about")
}

// ---------------------------------------------------------------------------
// Previous page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import type { Metadata } from "next";
// import AboutShowcase from "@/components/portfolio/AboutShowcase";
// import { getContent } from "@/lib/content.server";
//
// export const metadata: Metadata = {
//   title: "About",
//   description: "About Sanjeev Kumar and the way he approaches software engineering, research and open source.",
// };
//
// export default function AboutPage() {
//   return (
//     <main className="editorial-page about-page">
//       <AboutShowcase content={getContent()} />
//     </main>
//   );
// }
