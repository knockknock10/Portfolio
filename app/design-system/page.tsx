// Redirect: the portfolio is now a single page, so this route sends visitors to the matching section.
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/")
}

// ---------------------------------------------------------------------------
// Previous page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import type { Metadata } from "next";
// import { DesignSystemPreview } from "@/components/DesignSystemPreview";
//
// export const metadata: Metadata = {
//   title: "Design System",
//   robots: {
//     index: false,
//     follow: false,
//     noarchive: true,
//   },
// };
//
// export default function DesignSystemPage() {
//   return <DesignSystemPreview />;
// }
