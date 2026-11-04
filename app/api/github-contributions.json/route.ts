export const dynamic = "force-static"

const CONTRIBUTION_ENDPOINT = "https://github-contributions-api.jogruber.de/v4/knockknock10?y=all"

/**
 * With output: export, Next.js evaluates this GET handler during the build and
 * emits /api/github-contributions.json as a static file for GitHub Pages.
 */
export async function GET() {
  try {
    const response = await fetch(CONTRIBUTION_ENDPOINT, {
      headers: { Accept: "application/json" },
      cache: "force-cache",
      signal: AbortSignal.timeout(7000),
    })

    if (!response.ok) {
      return Response.json({ error: "Public contribution history is temporarily unavailable." })
    }

    const payload: unknown = await response.json()
    if (!payload || typeof payload !== "object" || !Array.isArray((payload as { contributions?: unknown }).contributions)) {
      return Response.json({ error: "The contribution source returned an invalid response." })
    }

    return Response.json(payload)
  } catch {
    // Keep the static site buildable even if the upstream statistics service is down.
    // The client checks for the missing contributions array and shows its unavailable state.
    return Response.json({ error: "Public contribution history is temporarily unavailable." })
  }
}
