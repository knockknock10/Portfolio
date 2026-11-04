// Redirect: the portfolio is now a single page, so this route sends visitors to the matching section.
import { redirect } from "next/navigation"

export default function Page() {
  redirect("/#skills")
}

// ---------------------------------------------------------------------------
// Previous page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import { redirect } from "next/navigation";
//
// export default function SignalsPage() {
//   redirect("/#coding");
// }
