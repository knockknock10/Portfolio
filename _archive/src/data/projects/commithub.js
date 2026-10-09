export const commithub = {
  id: 'commithub',
  number: '02',
  title: 'CommitHub',
  category: 'Full-Stack Engineering',
  summary:
    'A GitHub-like collaboration platform: repositories, branches, pull requests, reviews, and merge conflicts — built to understand how a code host works under the hood.',
  status: 'Active development',
  github: 'https://github.com/knockknock10/CommitHub',
  demo: 'https://knockknock10.github.io/CommitHub',
  seo: {
    title: 'Sanjeev Kumar — CommitHub',
    description:
      'CommitHub: a full-stack GitHub-like collaboration platform — Express API, React SPA, MongoDB, JWT auth, Socket.io realtime, and authorization on every mutation.',
  },
  card: {
    problem:
      'Most CRUD demos never touch what makes a code host hard: branch state, reviews, conflicts, and authorization on every mutation.',
    built:
      'An Express 5 + MongoDB API and React SPA implementing branches, commits, pull requests with reviews, conflict resolution, branch protection, orgs/teams, and realtime events.',
  },
  stack: [
    { label: 'Frontend', items: ['React', 'Vite', 'React Router'] },
    { label: 'Backend', items: ['Node.js', 'Express 5', 'Socket.io'] },
    { label: 'Data', items: ['MongoDB', 'Mongoose'] },
    { label: 'Auth', items: ['JWT', 'bcrypt'] },
    { label: 'Infra', items: ['Docker', 'Render', 'GitHub Pages'] },
  ],
  tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Socket.io'],
  overview: [
    'CommitHub is a full-stack, GitHub-like collaboration platform on the MERN stack. It implements real version-control workflows — repositories, branches, commits, pull requests, code reviews, merge conflict resolution, branch protection — with JWT auth, role-based authorization, and realtime collaboration over WebSockets.',
    'It is a solo project built to answer a specific question: how does a code-hosting product actually work when you have to implement its semantics yourself?',
  ],
  problem: [
    'A “GitHub clone” that only stores files misses the parts that make GitHub hard: branch-aware reads and writes, commits that capture change sets, PRs that track reviewed commits, merges that enforce protection rules, and permissions that must hold on every endpoint — including forking, search, and profiles.',
    'The problem is less about any single feature and more about keeping authorization, realtime state, and data consistency coherent across 113 route definitions in 14 route files and a 17-page frontend.',
  ],
  approach: [
    'The backend is an Express 5 API organized as controllers, routes, Mongoose models, and services. Repository content is persisted behind a storage boundary (REPO_STORAGE_ROOT) so trees, branches, file history, and diffs can be served branch-aware without coupling controllers to a particular storage.',
    'Authorization runs as middleware on every business route, with per-endpoint visibility rules for private repositories. A Socket.io server attaches to the same HTTP server; clients join per-repository and per-PR rooms, and the server checks access before allowing a join.',
    'The React frontend uses a single Axios instance (token injection, 401 handling, offline detection) and 12 API modules, with a declarative hook for realtime subscriptions.',
  ],
  architecture: {
    intro:
      'One API process serving REST and WebSocket traffic from the same HTTP server, with the frontend as a separate static deployment.',
    diagram: {
      rows: [
        {
          title: 'Request path',
          nodes: [
            { title: 'React SPA', sub: 'Vite · Axios · Router' },
            { title: 'Express 5 API', sub: 'JWT · rate limit · CORS' },
            { title: 'MongoDB', sub: 'Mongoose · 17 models' },
          ],
        },
        {
          title: 'Realtime path',
          nodes: [
            { title: 'Domain events', sub: '21 event types' },
            { title: 'Socket.io server', sub: 'room access checks' },
            { title: 'Clients', sub: 'repo · PR rooms' },
          ],
        },
        {
          title: 'Repository content',
          nodes: [
            { title: 'Branch-aware API', sub: 'tree · blob · history' },
            { title: 'Storage layer', sub: 'REPO_STORAGE_ROOT' },
          ],
        },
      ],
    },
  },
  implementation: [
    'Backend: 24 controllers and 14 route files covering auth, repositories (tree/file/branch/commit endpoints), pull requests with reviews and conflict resolution, issues, comments, notifications, organizations, teams, search, activity, and health/readiness.',
    'Models: 17 Mongoose models including partial unique indexes (open PR numbers) and compound indexes for owner/organization lookups. Notification types (15), activity types (20), and collaborator roles (5) are explicit enums.',
    'Realtime: rooms user:{id}, repo:{id}, pr:{id} with server-side access checks before join, and domain events wired to room emissions.',
    'Frontend: 17 pages including a repository browser (tree, code, commits), pull-request details with a conflict resolver, branch protection, review comment panels, and org/team pages.',
    'Testing: 22 backend test suites on node:test with per-file isolated databases and temp storage roots, including contract and performance-regression suites.',
    'Deployment: render.yaml for the API, a Node 22 Alpine Dockerfile, docker-compose for MongoDB, and the frontend published to GitHub Pages.',
  ],
  decisions: [
    {
      decision: 'Stateless JWT auth with bcrypt hashing',
      why: 'No server sessions to store; the same token authenticates REST calls and the Socket.io handshake.',
      tradeoff: 'Any request can be verified locally without a session lookup.',
      cost: 'Revocation before expiry needs extra state — accepted for a single-instance deployment.',
    },
    {
      decision: 'Repository content behind a storage boundary',
      why: 'Trees, blobs, file history, and diffs are served through a storage util keyed by REPO_STORAGE_ROOT rather than controllers touching disk directly.',
      tradeoff: 'Local development is trivial and storage can be swapped behind one interface.',
      cost: 'Multiple API instances would need shared storage — a real constraint, not a solved one.',
    },
    {
      decision: 'Authorization on every endpoint, not per page',
      why: 'Private-repository isolation, IDOR/BOLA prevention, and role checks live server-side on each route; the frontend hiding a link is never the control.',
      tradeoff: 'A user cannot see data the UI would happily render.',
      cost: 'Every new route carries an authorization decision — the audit fixes below were exactly this work.',
    },
    {
      decision: 'In-memory rate limiting on auth routes only',
      why: '100 req/min/IP on authentication endpoints stops credential stuffing without infrastructure dependencies.',
      tradeoff: 'No Redis to run or configure.',
      cost: 'Limits are per-instance; horizontal scaling would need a shared store.',
    },
  ],
  challenges: [
    {
      title: 'Authorization holes found by auditing my own code',
      body: 'A self-audit turned up real IDOR issues: team and organization endpoints without permission checks (any authenticated user could manipulate teams), and profile endpoints leaking private repositories and private stars. Fixed by introducing org access helpers and visibility/role pruning on profile responses.',
    },
    {
      title: 'Owners disappearing from their own private data',
      body: 'Role resolution returned null for repository owners because no Collaborator record exists for them — so owners’ own private repositories were filtered out of search and profiles. Fixed by returning the owner role explicitly.',
    },
    {
      title: 'Contract drift between tests, API, and frontend',
      body: 'The search controller wrapped results in a results object while tests and the frontend expected a flat shape, breaking search end to end; minimum query length differed between code and tests. Caught through the bug-hunt pass and aligned deliberately.',
    },
    {
      title: 'Database limits colliding with test isolation',
      body: 'MongoDB Atlas free tier caps collections at 500, and the test strategy uses per-file isolated databases — enough suites to hit the cap. Documented as an infrastructure constraint with failing contract tests attributed to it rather than papered over.',
    },
    {
      title: 'Rewriting the frontend design system in place',
      body: 'The UI had drifted into hardcoded colors and inconsistent components. Migrating every CSS file onto a token system in index.css, replacing emoji icons with a real icon set, and fixing dialog accessibility — while keeping 17 pages working.',
    },
  ],
  outcome: [
    'A working full-stack collaboration platform: branch-aware repository browsing, commits, pull requests with reviews, conflict detection and resolution, branch protection, organizations/teams with per-repo permissions, notifications, search, and realtime updates.',
    'A backend with explicit authorization middleware on business routes, structured request logging with correlation IDs, health/readiness endpoints, and graceful shutdown.',
    'A documented bug-hunt record (IDOR fixes, contract mismatches) and a design-system migration — with known limitations written down instead of hidden (no CI engine, no external webhook receiver, no shared rate-limit store).',
  ],
  lessons: [
    'Authorization is where clones actually fail. Three of the five documented bugs were “endpoint trusted the authenticated user too much”.',
    'Tests written against a contract will find drift faster than any code review — the search bug existed only because controller and client disagreed silently.',
    'Write down the limitations. The README’s known-limitations section is more credible than any feature bullet.',
  ],
  links: [
    { label: 'Repository', href: 'https://github.com/knockknock10/CommitHub' },
    { label: 'Live frontend', href: 'https://knockknock10.github.io/CommitHub' },
  ],
}
