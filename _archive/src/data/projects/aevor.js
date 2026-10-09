export const aevor = {
  id: 'aevor',
  number: '01',
  title: 'Aevor',
  category: 'Developer Tooling',
  summary:
    'Turns a GitHub issue into a reviewed, validated pull request — without letting an AI model push anything on its own.',
  status: 'Active development',
  github: 'https://github.com/Aevor/platform',
  githubOrg: 'https://github.com/Aevor',
  demo: null,
  seo: {
    title: 'Sanjeev Kumar — Aevor',
    description:
      'Aevor: a developer-tooling pipeline that turns a GitHub issue into a reviewed, validated pull request. Go/Gin API, React frontend, FastAPI AI service.',
  },
  card: {
    problem:
      'AI coding agents that push on their own are hard to trust — issue to merged PR needs repo understanding, a reviewable diff, validation, and an audit trail.',
    built:
      'A seven-stage gated pipeline across a Go API, React frontend, and a bounded AI microservice — every step before publication requires a human to review the diff.',
  },
  stack: [
    { label: 'Backend', items: ['Go', 'Gin', 'GORM'] },
    { label: 'Frontend', items: ['React', 'Vite'] },
    { label: 'Data', items: ['PostgreSQL'] },
    { label: 'AI', items: ['Python', 'FastAPI'] },
    { label: 'Infra', items: ['Docker'] },
  ],
  tags: ['Go', 'Gin', 'PostgreSQL', 'React', 'FastAPI', 'Docker'],
  overview: [
    'Aevor is a multi-repository platform (github.com/Aevor) built around one goal: turn a GitHub issue into a reviewed, validated pull request — without letting an AI model push anything on its own.',
    'It reads a real repository, analyses a specific issue against that code, proposes a solution, generates a concrete diff, runs the project’s own toolchain against it, and only then offers to open a pull request. Every step is inspectable and recorded in an audit trail.',
  ],
  problem: [
    'An agent that opens PRs autonomously is only useful if a human can trust what it did. Trust requires four things that glue-and-prompt demos skip: the model must see relevant code (not a whole repo dumped into a prompt), the diff must be reviewable before anything is written, validation must use the project’s own toolchain, and there must be a record of what happened.',
    'The engineering problem is therefore not “call an LLM”. It is designing gates, boundaries, and durable state around a fallible model.',
  ],
  approach: [
    'The pipeline is a sequence of gated stages: analyze → propose → generate → human review of the diff → apply to a local clone → validate (gofmt, build, vet, test) → publish (branch → commit → push → PR). The human gate sits between generation and anything that touches a repository.',
    'Repository context sent to the model is assembled server-side as bounded, traceable context chunks. The AI service receives an HTTP contract, not filesystem or GitHub access.',
    'GitHub webhooks enter through an unauthenticated endpoint that performs HMAC/content/header validation, persists only bounded metadata as delivery + target rows, and hands work to a leased dispatcher that creates durable jobs consumed by the existing issue/PR/commit sync services.',
  ],
  architecture: {
    intro:
      'Four deployable pieces with one-way dependencies. The platform API owns data and GitHub; the AI service only ever sees an HTTP contract with bounded context.',
    diagram: {
      rows: [
        {
          title: 'Request path',
          nodes: [
            { title: 'Web', sub: 'React · Vite' },
            { title: 'API', sub: 'Go · Gin' },
            { title: 'PostgreSQL', sub: 'GORM' },
          ],
        },
        {
          title: 'GitHub event path',
          nodes: [
            { title: 'GitHub webhook', sub: 'HMAC validated' },
            { title: 'Durable jobs', sub: 'leased dispatcher' },
            { title: 'Sync services', sub: 'issues · PRs · commits' },
          ],
        },
        {
          title: 'AI path',
          nodes: [
            { title: 'API', sub: 'bounded context chunks' },
            { title: 'AI service', sub: 'FastAPI · HTTP only' },
            { title: 'Analyze result', sub: 'traceable response' },
          ],
        },
      ],
    },
  },
  implementation: [
    'The Go service is a modular codebase of internal packages — auth, github, ai, extraction, chunking, indexing, filtering, discovery, representation, repositories, users, workspace — with webhook and job machinery inside the repositories package (webhook_handler, webhook_dispatcher, jobs_defs) and request authentication in internal/auth/middleware.go.',
    'Routes are explicit in the server entrypoint: GitHub OAuth login/callback, /users/me, /skills, /recommendations, repository selection, and per-repository sync endpoints for issues, pull requests, and commits — each behind auth.RequireAuth(jwtManager).',
    'The frontend is a React 19 + Vite app with routed pages for Dashboard, Repositories, RepositoryWorkspace, IssueDetails, Skills, Recommendations, Profile, and Landing, tested with Vitest + Testing Library.',
    'Tests span the stack: 58 Go test files in the platform repo, 4 Vitest test files in the frontend, and a pytest suite (tests/) for the AI service.',
  ],
  decisions: [
    {
      decision: 'A human gate between generation and publication',
      why: 'The model proposes; a person reviews the diff before anything is applied or pushed. This is the product thesis, not an afterthought.',
      tradeoff: 'Slower than agents that auto-merge — every run waits on review.',
      cost: 'More UI states to design: pending, reviewable, applied, validated, published, failed.',
    },
    {
      decision: 'AI as a separate bounded HTTP service',
      why: 'The platform talks to AI only through a defined API; the service never touches the filesystem or GitHub, and receives bounded, traceable context chunks.',
      tradeoff: 'Independent deployment and language choice (Python/FastAPI next to a Go platform).',
      cost: 'A contract to maintain on both sides, and one more service to run.',
    },
    {
      decision: 'Webhooks as an untrusted, metadata-only, durable boundary',
      why: 'Payloads are treated as untrusted data: validate, persist bounded metadata, fan out through durable jobs. Webhooks never modify source, bypass ownership, or expose raw payloads.',
      tradeoff: 'Events become replayable and auditable instead of being handled inline.',
      cost: 'An extra layer of job state — deliveries, leases, dispatch — to build and monitor.',
    },
    {
      decision: 'One modular Go service, not microservices',
      why: 'Boundaries live as internal packages (ai, webhook, jobs, extraction…) inside a single API binary.',
      tradeoff: 'Simple to run, test, and refactor across boundaries.',
      cost: 'Scaling or replacing one area later means extracting a real service.',
    },
  ],
  challenges: [
    {
      title: 'Untrusted webhooks at the edge',
      body: 'The webhook endpoint is unauthenticated by design, so trust has to be established per delivery: HMAC signature verification, content and header validation, bounded metadata only — with raw payloads and errors never surfaced to clients.',
    },
    {
      title: 'Durable fan-out instead of inline processing',
      body: 'GitHub deliveries arrive faster than work can be done, and can be retried. A leased dispatcher turns validated deliveries into durable repository.sync jobs that the existing sync services consume, so a restart loses no work.',
    },
    {
      title: 'Keeping model context bounded and traceable',
      body: 'Repository context is chunked, filtered, and indexed server-side before it leaves the platform. The AI service receives only the contract payload — which keeps prompts auditable and prevents the model from having ambient access to the repo.',
    },
    {
      title: 'Representation persistence',
      body: 'Repository structure extracted for analysis has to be persisted in a form the pipeline can reuse across runs; it lives in its own internal package and is treated as a source of truth for downstream stages.',
    },
  ],
  outcome: [
    'A working issue → pull request pipeline with a human review gate, local application, toolchain validation, and an audit trail of runs and events.',
    'A Go/Gin API with GitHub OAuth + JWT auth, webhook validation with durable job dispatch, and recommendation/skill endpoints; a React frontend covering the full run lifecycle; a separate FastAPI AI service behind a strict HTTP contract.',
    'Architecture and decision documentation in the org docs repository, with test suites covering the Go platform, React frontend, and Python AI service.',
  ],
  lessons: [
    'Trust boundaries are the design. HMAC at the edge, contract-only AI access, and a human gate did more for credibility than model choice did.',
    'Durable jobs beat inline handlers the moment an external system can retry — webhooks made that unavoidable.',
    'Decide the boundary first: treating webhook payloads as untrusted, metadata-only records kept later code from drifting back toward trusting them.',
  ],
  links: [
    { label: 'Platform repository', href: 'https://github.com/Aevor/platform' },
    { label: 'Frontend repository', href: 'https://github.com/Aevor/Frontend' },
    { label: 'AI service repository', href: 'https://github.com/Aevor/ai' },
    { label: 'Organization', href: 'https://github.com/Aevor' },
  ],
}
