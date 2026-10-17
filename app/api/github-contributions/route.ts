import { NextResponse } from "next/server"

export const revalidate = 3600

const CONTRIBUTION_ENDPOINT = "https://github-contributions-api.jogruber.de/v4/knockknock10?y=all"

export async function GET() {
  try {
    const response = await fetch(CONTRIBUTION_ENDPOINT, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(7000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Public contribution history is temporarily unavailable." },
        { status: 503, headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
      )
    }

    const payload: unknown = await response.json()
    if (!payload || typeof payload !== "object" || !Array.isArray((payload as { contributions?: unknown }).contributions)) {
      return NextResponse.json({ error: "The contribution source returned an invalid response." }, { status: 502 })
    }

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    })
  } catch {
    return NextResponse.json(
      { error: "Public contribution history is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
    )
  }
}
