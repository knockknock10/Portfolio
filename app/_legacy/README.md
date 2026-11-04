# Original route snapshots

This folder preserves the original active route and layout source from
`/Users/kr/portfolio` before the Claude `portfolio 2` single-page design was
activated on 2026-11-04.

The new homepage is `app/page.tsx` and its supporting implementation is in
`components/site/`. The original source remains here unchanged so it can be
reviewed or restored deliberately; no legacy components, styles, or routes
were deleted.

- `page.original.js` is a byte-for-byte snapshot of the former homepage.
- `page.original.active.js` is the same source moved out of the special
  `app/page.js` route name so it cannot conflict with the active `app/page.tsx`.
- `layout.original.tsx`, `not-found.original.tsx`, and `routes/` contain the
  original route implementations before their active paths became redirects to
  sections of the unified homepage.
- Existing legacy components and styles outside this folder remain in their
  original locations and are intentionally not removed.
