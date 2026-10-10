# Portfolio Data Inventory

Snapshot date: 2026-10-10  
Repository: https://github.com/knockknock10/Portfolio  
Branch: fix/portfolio-route-content

Source-backed data contract and public API snapshot for the current portfolio. Data that cannot be verified is marked MISSING. Scripts use Node.js built-in APIs and add no dependencies.

## Refreshing data

Run from the repository root on Node.js 22 or newer:

~~~bash
node scripts/fetch-github.js
node scripts/fetch-leetcode.js
~~~

Optional environment variables: GITHUB_TOKEN, GITHUB_USERNAME, LEETCODE_USERNAME. Never commit secret tokens. Without GITHUB_TOKEN, public GitHub REST calls still run; GraphQL-only contribution fields remain MISSING if they cannot be queried.

## Source reconciliation

- CONTENT-INVENTORY.md and AUDIT.md are from an older main snapshot at commit 41fa20ccb4d34b8c5e044a471f9645d28876c8be, a Vite/React application. Current feature branch source is Next.js/TypeScript, so current source/config is authoritative for technical metadata.
- Current project data has Aevor, CommitHub, SemBind-Audio and FailureScope. The résumé also describes a Go-based VCS named CommitHub, which conflicts with the current collaboration-platform entry. These records are kept separate pending owner confirmation.
- public/favicon.svg is the only image-format asset. CSS gradients are not project screenshot or cover assets.
- Public API metrics can change and should be refreshed before displaying new numbers.

## 1. GitHub data

<!-- GITHUB-DATA:START -->
### Profile

| field | value |
| --- | --- |
| login | knockknock10 |
| name | Sanjeev Kumar |
| avatar_url | https://avatars.githubusercontent.com/u/116096166?v=4 |
| bio | Open Source  \| Backend & Systems |
| company | MISSING |
| blog | MISSING |
| location | India |
| email | MISSING |
| twitter_username | MISSING |
| hireable | MISSING |
| public_repos | 27 |
| public_gists | 0 |
| followers | 18 |
| following | 9 |
| created_at | 2022-10-18T15:01:22Z |

### Aggregate statistics

| metric | value |
| --- | --- |
| Public repositories | 27 |
| Total stars | 19 |
| Total forks | 4 |
| Total watchers | 19 |
| Open issues | 5 |
| Total commits | MISSING |
| Pull requests opened | MISSING |
| Pull requests merged | MISSING |
| Pull requests reviewed | MISSING |
| Issues opened | MISSING |
| Issues closed | MISSING |
| Contributions last 365 days | MISSING |

### Most-used primary languages

These percentages use repository counts, not source-code byte shares.

| language | repositories | percentage |
| --- | --- | --- |
| JavaScript | 8 | 53.33% |
| Python | 3 | 20.00% |
| Java | 2 | 13.33% |
| Go | 2 | 13.33% |
| MISSING | MISSING | MISSING |

### Featured repositories

| name | stars | lastPushed | url |
| --- | --- | --- | --- |
| DSA | 7 | 2026-10-09T15:44:27Z | https://github.com/knockknock10/DSA |
| CommitHub | 5 | 2026-09-18T16:08:02Z | https://github.com/knockknock10/CommitHub |
| Wandera | 4 | 2026-09-09T03:22:50Z | https://github.com/knockknock10/Wandera |
| Code4Her | 2 | 2026-03-13T11:45:58Z | https://github.com/knockknock10/Code4Her |
| failurescope | 1 | 2026-02-15T11:13:30Z | https://github.com/knockknock10/failurescope |

### Public repository detail — top 20 by stars then recent push

~~~json
[
  {
    "name": "DSA",
    "description": "Java solutions to data structures and algorithms problems, organized by pattern.",
    "html_url": "https://github.com/knockknock10/DSA",
    "homepage": "MISSING",
    "language": "Java",
    "stargazers_count": 7,
    "forks_count": 0,
    "watchers_count": 7,
    "open_issues_count": 1,
    "topics": [],
    "created_at": "2025-06-29T09:54:35Z",
    "updated_at": "2026-10-09T15:44:31Z",
    "pushed_at": "2026-10-09T15:44:27Z",
    "license": "MISSING",
    "size": 728,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "CommitHub",
    "description": "Git-inspired collaboration platform with repositories, pull requests, code reviews, and branch protection. JavaScript",
    "html_url": "https://github.com/knockknock10/CommitHub",
    "homepage": "https://knockknock10.github.io/CommitHub/",
    "language": "JavaScript",
    "stargazers_count": 5,
    "forks_count": 1,
    "watchers_count": 5,
    "open_issues_count": 1,
    "topics": [
      "cli-tools",
      "developer-tools",
      "distributed-systems",
      "git",
      "javascript",
      "node-js",
      "vcs",
      "version-control"
    ],
    "created_at": "2026-03-10T03:04:26Z",
    "updated_at": "2026-09-25T10:18:58Z",
    "pushed_at": "2026-09-18T16:08:02Z",
    "license": "MISSING",
    "size": 1312,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "Wandera",
    "description": "Travel platform for discovering destinations and sharing stays. React, Node.js, Express.",
    "html_url": "https://github.com/knockknock10/Wandera",
    "homepage": "MISSING",
    "language": "JavaScript",
    "stargazers_count": 4,
    "forks_count": 0,
    "watchers_count": 4,
    "open_issues_count": 1,
    "topics": [],
    "created_at": "2026-01-10T05:59:06Z",
    "updated_at": "2026-09-25T10:05:43Z",
    "pushed_at": "2026-09-09T03:22:50Z",
    "license": "MISSING",
    "size": 2834,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "Code4Her",
    "description": "MISSING",
    "html_url": "https://github.com/knockknock10/Code4Her",
    "homepage": "MISSING",
    "language": "JavaScript",
    "stargazers_count": 2,
    "forks_count": 2,
    "watchers_count": 2,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-03-13T03:50:41Z",
    "updated_at": "2026-03-13T11:47:30Z",
    "pushed_at": "2026-03-13T11:45:58Z",
    "license": "MISSING",
    "size": 463,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "failurescope",
    "description": "FailureScope is a DevOps-oriented platform that helps teams analyze system logs, detect failures, and improve reliability by turning raw log data into actionable insights for production environments.",
    "html_url": "https://github.com/knockknock10/failurescope",
    "homepage": "MISSING",
    "language": "MISSING",
    "stargazers_count": 1,
    "forks_count": 0,
    "watchers_count": 1,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-02-05T13:22:29Z",
    "updated_at": "2026-03-13T11:39:03Z",
    "pushed_at": "2026-02-15T11:13:30Z",
    "license": "MIT",
    "size": 3,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "Portfolio",
    "description": "MISSING",
    "html_url": "https://github.com/knockknock10/Portfolio",
    "homepage": "MISSING",
    "language": "JavaScript",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 1,
    "topics": [],
    "created_at": "2026-10-08T19:05:32Z",
    "updated_at": "2026-10-10T02:40:58Z",
    "pushed_at": "2026-10-10T05:20:40Z",
    "license": "Unlicense",
    "size": 436,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "Podiom",
    "description": "Local-first workspace for Claude Code and OpenAI Codex agents. Durable sessions, projects, scheduling, goals, and native MCP/tool/skill integration.",
    "html_url": "https://github.com/knockknock10/Podiom",
    "homepage": "https://github.com/Podiom/Podiom/tree/master/docs",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-10T04:56:35Z",
    "updated_at": "2026-10-10T04:56:35Z",
    "pushed_at": "2026-10-10T03:23:11Z",
    "license": "MIT",
    "size": 5462,
    "archived": false,
    "fork": true,
    "default_branch": "master"
  },
  {
    "name": "camel-k",
    "description": "Apache Camel K is a lightweight integration platform, born on Kubernetes, with serverless superpowers",
    "html_url": "https://github.com/knockknock10/camel-k",
    "homepage": "https://camel.apache.org/camel-k",
    "language": "Go",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-03T07:41:24Z",
    "updated_at": "2026-10-03T10:48:56Z",
    "pushed_at": "2026-10-09T17:47:30Z",
    "license": "Apache-2.0",
    "size": 107858,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "ansvisor",
    "description": "Open-source AI Search Intelligence Platform — track, analyze, and improve AI visibility, citations, prompts, competitors, and content opportunities across ChatGPT, Claude, Gemini, Google AI Overviews, Google AI Mode, Perplexity, Grok, and Microsoft Copilot.",
    "html_url": "https://github.com/knockknock10/ansvisor",
    "homepage": "https://ansvisor.com",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-04T07:16:57Z",
    "updated_at": "2026-10-04T07:16:57Z",
    "pushed_at": "2026-10-09T16:20:42Z",
    "license": "MIT",
    "size": 6861,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "wanaku-tests",
    "description": "Repository for the Wanaku integration test suite",
    "html_url": "https://github.com/knockknock10/wanaku-tests",
    "homepage": "MISSING",
    "language": "Java",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-03T07:41:12Z",
    "updated_at": "2026-10-03T10:49:56Z",
    "pushed_at": "2026-10-09T15:19:25Z",
    "license": "MISSING",
    "size": 668,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "plugin-databricks",
    "description": "MISSING",
    "html_url": "https://github.com/knockknock10/plugin-databricks",
    "homepage": "MISSING",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-03T05:08:00Z",
    "updated_at": "2026-10-03T05:08:01Z",
    "pushed_at": "2026-10-09T15:02:46Z",
    "license": "Apache-2.0",
    "size": 904,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "core",
    "description": "Reusable Go packages for building National Single Window systems — workflow engine, task manager, notification, upload, and forms. Importable libraries, not a deployable application.",
    "html_url": "https://github.com/knockknock10/core",
    "homepage": "MISSING",
    "language": "Go",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-03T07:40:59Z",
    "updated_at": "2026-10-03T08:09:40Z",
    "pushed_at": "2026-10-07T17:39:32Z",
    "license": "Apache-2.0",
    "size": 1415,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "terraform-provider-kestra",
    "description": "Plugin to use Terraform with Kestra",
    "html_url": "https://github.com/knockknock10/terraform-provider-kestra",
    "homepage": "https://kestra.io/docs/terraform/",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-02T04:00:19Z",
    "updated_at": "2026-10-02T04:00:19Z",
    "pushed_at": "2026-10-05T07:05:02Z",
    "license": "Apache-2.0",
    "size": 691,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "mintmaker-osv-database",
    "description": "MISSING",
    "html_url": "https://github.com/knockknock10/mintmaker-osv-database",
    "homepage": "MISSING",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-03T08:33:36Z",
    "updated_at": "2026-10-03T08:33:37Z",
    "pushed_at": "2026-10-03T07:41:55Z",
    "license": "MISSING",
    "size": 2047,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "friend-interview-coach-hf26",
    "description": "MISSING",
    "html_url": "https://github.com/knockknock10/friend-interview-coach-hf26",
    "homepage": "MISSING",
    "language": "JavaScript",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-02T05:56:21Z",
    "updated_at": "2026-10-02T07:00:24Z",
    "pushed_at": "2026-10-02T07:00:22Z",
    "license": "MIT",
    "size": 49,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "plugin-docker",
    "description": "Tasks that build, run, and manage Docker images through the Docker API.",
    "html_url": "https://github.com/knockknock10/plugin-docker",
    "homepage": "https://kestra.io/plugins/plugin-docker",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-01T03:25:28Z",
    "updated_at": "2026-10-01T03:25:28Z",
    "pushed_at": "2026-10-01T12:52:18Z",
    "license": "Apache-2.0",
    "size": 720,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "plugin-neo4j",
    "description": "Tasks that run Cypher queries against Neo4j.",
    "html_url": "https://github.com/knockknock10/plugin-neo4j",
    "homepage": "https://kestra.io/plugins/plugin-neo4j",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-10-01T00:31:23Z",
    "updated_at": "2026-10-01T00:31:24Z",
    "pushed_at": "2026-10-01T00:37:37Z",
    "license": "Apache-2.0",
    "size": 682,
    "archived": false,
    "fork": true,
    "default_branch": "main"
  },
  {
    "name": "ConvergenceGuard",
    "description": "Watches event-driven services for state divergence, traces the cause, and verifies recovery. Go, NATS JetStream, PostgreSQL.",
    "html_url": "https://github.com/knockknock10/ConvergenceGuard",
    "homepage": "MISSING",
    "language": "MISSING",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-09-23T05:17:58Z",
    "updated_at": "2026-09-25T10:06:05Z",
    "pushed_at": "2026-09-23T06:09:30Z",
    "license": "MISSING",
    "size": 0,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "SemBind_Audio",
    "description": "MISSING",
    "html_url": "https://github.com/knockknock10/SemBind_Audio",
    "homepage": "MISSING",
    "language": "Python",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-09-09T06:06:27Z",
    "updated_at": "2026-09-14T08:39:14Z",
    "pushed_at": "2026-09-14T08:39:09Z",
    "license": "NOASSERTION",
    "size": 6119,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  },
  {
    "name": "skills-introduction-to-codeql",
    "description": "Exercise: Introduction to CodeQL",
    "html_url": "https://github.com/knockknock10/skills-introduction-to-codeql",
    "homepage": "MISSING",
    "language": "Python",
    "stargazers_count": 0,
    "forks_count": 0,
    "watchers_count": 0,
    "open_issues_count": 0,
    "topics": [],
    "created_at": "2026-05-13T11:36:00Z",
    "updated_at": "2026-05-13T12:35:35Z",
    "pushed_at": "2026-05-13T12:35:30Z",
    "license": "MIT",
    "size": 2603,
    "archived": false,
    "fork": false,
    "default_branch": "main"
  }
]
~~~

### Public gists

None returned by the public endpoint: 0 public gists.

### Public organizations

~~~json
[
  {
    "login": "Aevor",
    "avatar_url": "https://avatars.githubusercontent.com/u/291477028?v=4",
    "description": "MISSING",
    "url": "https://github.com/Aevor",
    "public_repos": "MISSING",
    "followers": "MISSING",
    "membership": "Listed by public organization membership endpoint"
  }
]
~~~

### Contribution calendar

MISSING — the GitHub GraphQL weeks/days data was not fetched in this snapshot. Run scripts/fetch-github.js with GITHUB_TOKEN.

### Git graph and activity

MISSING in this snapshot: commit counts by repository/month, most active repository/month, daily contribution totals, streaks, gaps, active days and UTC hour/weekday buckets.
<!-- GITHUB-DATA:END -->

## 2. GitHub organization contributions

Public organization membership endpoint lists Aevor. The refresh script attempts organization profile data, membership visibility, contributed repositories, per-user commits/last commit dates, authored PRs and merged_at, reviewed PRs and submitted_at, issues/comments, and a deduplicated repository list grouped by organization.

<!-- GITHUB-ORG-MISSING:START -->
- Per-organization public repository list and contributed repository list — MISSING in initial snapshot.
- Per-organization commit counts/last commit dates — MISSING; refresh script attempts author-filtered commit queries.
- PR title/state/created_at/merged_at and review title/state/submitted_at per organization — MISSING in initial snapshot; search results may not expose individual review timestamps.
- Issues opened, issue comments, per-repository roles and deduplicated repositories — MISSING in initial snapshot; refresh script attempts public endpoints.
- Private membership and SAML/SSO-anonymized contribution details — MISSING if unavailable; do not infer private identities.
<!-- GITHUB-ORG-MISSING:END -->

## 3. LeetCode data

Username: knockknock10

<!-- LEETCODE-DATA:START -->
### Profile

| field | value |
| --- | --- |
| username | knockknock10 |
| realName | Sanjeev Kr |
| aboutMe | MISSING |
| avatar | https://assets.leetcode.com/users/CYeY2FRKVf/avatar_1752296901.png |
| country | MISSING |
| company | MISSING |
| school | SRM University Ap |
| websites | https://kr-sanjeev.netlify.app/ |
| global ranking | 321082 |
| reputation | 20 |
| solutionCount | 29 |
| categoryDiscussCount | 1 |
| postViewCount | MISSING |

### Solved problems

| difficulty | solved | totalQuestions | acceptedSubmissions | allSubmissions |
| --- | --- | --- | --- | --- |
| All | 404 | 4073 | 450 | 517 |
| Easy | 128 | 969 | 146 | 165 |
| Medium | 206 | 2124 | 233 | 275 |
| Hard | 70 | 980 | 71 | 77 |

Acceptance rate: 87.04%.

Contribution points: MISSING.

### Contest stats

| metric | value |
| --- | --- |
| attendedContestsCount | 7 |
| rating | 1997.112533039593 |
| globalRanking | 23026 |
| totalParticipants | 887132 |
| topPercentage | 2.69% |
| badge | Knight |
| badge icon | https://leetcode.com/static/images/badges/knight.png |

### Last 10 attended contests

| contest | date | rank | ratingAfterContest |
| --- | --- | --- | --- |
| Weekly Contest 478 | 2025-11-30 | 10785 | 1491.597 |
| Biweekly Contest 171 | 2025-12-06 | 4554 | 1557.574 |
| Weekly Contest 479 | 2025-12-07 | 3045 | 1620 |
| Weekly Contest 493 | 2026-03-15 | 11454 | 1627.563 |
| Weekly Contest 520 | 2026-09-20 | 198 | 1763.467 |
| Biweekly Contest 192 | 2026-09-26 | 64 | 1898.052 |
| Weekly Contest 521 | 2026-09-27 | 132 | 1997.113 |

### Skill stats by category

Tags overlap. Percentage is solved count per tag divided by total solved count.

#### fundamental

| tag | slug | solved | percentOfTotalSolved |
| --- | --- | --- | --- |
| Array | array | 226 | 55.94 |
| Matrix | matrix | 36 | 8.91 |
| String | string | 86 | 21.29 |
| Simulation | simulation | 27 | 6.68 |
| Enumeration | enumeration | 21 | 5.2 |
| Sorting | sorting | 60 | 14.85 |
| Stack | stack | 26 | 6.44 |
| Queue | queue | 3 | 0.74 |
| Linked List | linked-list | 8 | 1.98 |
| Two Pointers | two-pointers | 28 | 6.93 |

#### intermediate

| tag | slug | solved | percentOfTotalSolved |
| --- | --- | --- | --- |
| Tree | tree | 21 | 5.2 |
| Binary Tree | binary-tree | 16 | 3.96 |
| Hash Table | hash-table | 77 | 19.06 |
| Ordered Set | ordered-set | 8 | 1.98 |
| Graph Theory | graph | 7 | 1.73 |
| Greedy | greedy | 50 | 12.38 |
| Binary Search | binary-search | 40 | 9.9 |
| Depth-First Search | depth-first-search | 31 | 7.67 |
| Breadth-First Search | breadth-first-search | 23 | 5.69 |
| Recursion | recursion | 12 | 2.97 |
| Sliding Window | sliding-window | 24 | 5.94 |
| Bit Manipulation | bit-manipulation | 33 | 8.17 |
| Math | math | 83 | 20.54 |
| Design | design | 7 | 1.73 |
| Brainteaser | brainteaser | 4 | 0.99 |
| Database | database | 23 | 5.69 |

#### advanced

| tag | slug | solved | percentOfTotalSolved |
| --- | --- | --- | --- |
| Data Stream | data-stream | 1 | 0.25 |
| Game Theory | game-theory | 3 | 0.74 |
| Rolling Hash | rolling-hash | 1 | 0.25 |
| Sweep Line | sweep-line | 1 | 0.25 |
| Backtracking | backtracking | 9 | 2.23 |
| Bitmask | bitmask | 2 | 0.5 |
| Quickselect | quickselect | 2 | 0.5 |
| Dynamic Programming | dynamic-programming | 76 | 18.81 |
| Divide and Conquer | divide-and-conquer | 10 | 2.48 |
| Trie | trie | 4 | 0.99 |
| Union-Find | union-find | 9 | 2.23 |
| Binary Indexed Tree | binary-indexed-tree | 1 | 0.25 |
| Segment Tree | segment-tree | 9 | 2.23 |
| Monotonic Stack | monotonic-stack | 5 | 1.24 |
| Monotonic Queue | monotonic-queue | 1 | 0.25 |
| Topological Sort | topological-sort | 2 | 0.5 |

### Programming languages

| language | problemsSolved |
| --- | --- |
| C++ | 30 |
| Java | 334 |
| Python | 1 |
| MySQL | 23 |
| JavaScript | 9 |
| Python3 | 7 |

### Activity

| metric | value |
| --- | --- |
| activeYears | 2025, 2026 |
| totalActiveDays | 205 |
| maxStreak | 34 |
| activeDaysLast365 | 204 |
| currentStreak | MISSING |

Daily submission calendar, all dates 2025-10-11 through 2026-10-10 UTC:

~~~json
[
  {
    "date": "2025-10-11",
    "submissions": 1
  },
  {
    "date": "2025-10-12",
    "submissions": 1
  },
  {
    "date": "2025-10-13",
    "submissions": 1
  },
  {
    "date": "2025-10-14",
    "submissions": 1
  },
  {
    "date": "2025-10-15",
    "submissions": 1
  },
  {
    "date": "2025-10-16",
    "submissions": 1
  },
  {
    "date": "2025-10-17",
    "submissions": 1
  },
  {
    "date": "2025-10-18",
    "submissions": 1
  },
  {
    "date": "2025-10-19",
    "submissions": 1
  },
  {
    "date": "2025-10-20",
    "submissions": 1
  },
  {
    "date": "2025-10-21",
    "submissions": 1
  },
  {
    "date": "2025-10-22",
    "submissions": 2
  },
  {
    "date": "2025-10-23",
    "submissions": 1
  },
  {
    "date": "2025-10-24",
    "submissions": 0
  },
  {
    "date": "2025-10-25",
    "submissions": 0
  },
  {
    "date": "2025-10-26",
    "submissions": 0
  },
  {
    "date": "2025-10-27",
    "submissions": 0
  },
  {
    "date": "2025-10-28",
    "submissions": 0
  },
  {
    "date": "2025-10-29",
    "submissions": 0
  },
  {
    "date": "2025-10-30",
    "submissions": 0
  },
  {
    "date": "2025-10-31",
    "submissions": 0
  },
  {
    "date": "2025-11-01",
    "submissions": 0
  },
  {
    "date": "2025-11-02",
    "submissions": 0
  },
  {
    "date": "2025-11-03",
    "submissions": 0
  },
  {
    "date": "2025-11-04",
    "submissions": 0
  },
  {
    "date": "2025-11-05",
    "submissions": 1
  },
  {
    "date": "2025-11-06",
    "submissions": 1
  },
  {
    "date": "2025-11-07",
    "submissions": 1
  },
  {
    "date": "2025-11-08",
    "submissions": 1
  },
  {
    "date": "2025-11-09",
    "submissions": 1
  },
  {
    "date": "2025-11-10",
    "submissions": 0
  },
  {
    "date": "2025-11-11",
    "submissions": 2
  },
  {
    "date": "2025-11-12",
    "submissions": 1
  },
  {
    "date": "2025-11-13",
    "submissions": 1
  },
  {
    "date": "2025-11-14",
    "submissions": 1
  },
  {
    "date": "2025-11-15",
    "submissions": 1
  },
  {
    "date": "2025-11-16",
    "submissions": 1
  },
  {
    "date": "2025-11-17",
    "submissions": 0
  },
  {
    "date": "2025-11-18",
    "submissions": 2
  },
  {
    "date": "2025-11-19",
    "submissions": 0
  },
  {
    "date": "2025-11-20",
    "submissions": 1
  },
  {
    "date": "2025-11-21",
    "submissions": 1
  },
  {
    "date": "2025-11-22",
    "submissions": 3
  },
  {
    "date": "2025-11-23",
    "submissions": 0
  },
  {
    "date": "2025-11-24",
    "submissions": 1
  },
  {
    "date": "2025-11-25",
    "submissions": 1
  },
  {
    "date": "2025-11-26",
    "submissions": 1
  },
  {
    "date": "2025-11-27",
    "submissions": 1
  },
  {
    "date": "2025-11-28",
    "submissions": 0
  },
  {
    "date": "2025-11-29",
    "submissions": 0
  },
  {
    "date": "2025-11-30",
    "submissions": 8
  },
  {
    "date": "2025-12-01",
    "submissions": 2
  },
  {
    "date": "2025-12-02",
    "submissions": 1
  },
  {
    "date": "2025-12-03",
    "submissions": 1
  },
  {
    "date": "2025-12-04",
    "submissions": 2
  },
  {
    "date": "2025-12-05",
    "submissions": 1
  },
  {
    "date": "2025-12-06",
    "submissions": 5
  },
  {
    "date": "2025-12-07",
    "submissions": 8
  },
  {
    "date": "2025-12-08",
    "submissions": 1
  },
  {
    "date": "2025-12-09",
    "submissions": 1
  },
  {
    "date": "2025-12-10",
    "submissions": 1
  },
  {
    "date": "2025-12-11",
    "submissions": 2
  },
  {
    "date": "2025-12-12",
    "submissions": 1
  },
  {
    "date": "2025-12-13",
    "submissions": 1
  },
  {
    "date": "2025-12-14",
    "submissions": 1
  },
  {
    "date": "2025-12-15",
    "submissions": 2
  },
  {
    "date": "2025-12-16",
    "submissions": 1
  },
  {
    "date": "2025-12-17",
    "submissions": 1
  },
  {
    "date": "2025-12-18",
    "submissions": 1
  },
  {
    "date": "2025-12-19",
    "submissions": 1
  },
  {
    "date": "2025-12-20",
    "submissions": 1
  },
  {
    "date": "2025-12-21",
    "submissions": 1
  },
  {
    "date": "2025-12-22",
    "submissions": 0
  },
  {
    "date": "2025-12-23",
    "submissions": 0
  },
  {
    "date": "2025-12-24",
    "submissions": 0
  },
  {
    "date": "2025-12-25",
    "submissions": 0
  },
  {
    "date": "2025-12-26",
    "submissions": 1
  },
  {
    "date": "2025-12-27",
    "submissions": 1
  },
  {
    "date": "2025-12-28",
    "submissions": 1
  },
  {
    "date": "2025-12-29",
    "submissions": 1
  },
  {
    "date": "2025-12-30",
    "submissions": 0
  },
  {
    "date": "2025-12-31",
    "submissions": 1
  },
  {
    "date": "2026-01-01",
    "submissions": 1
  },
  {
    "date": "2026-01-02",
    "submissions": 1
  },
  {
    "date": "2026-01-03",
    "submissions": 1
  },
  {
    "date": "2026-01-04",
    "submissions": 1
  },
  {
    "date": "2026-01-05",
    "submissions": 2
  },
  {
    "date": "2026-01-06",
    "submissions": 0
  },
  {
    "date": "2026-01-07",
    "submissions": 2
  },
  {
    "date": "2026-01-08",
    "submissions": 1
  },
  {
    "date": "2026-01-09",
    "submissions": 1
  },
  {
    "date": "2026-01-10",
    "submissions": 1
  },
  {
    "date": "2026-01-11",
    "submissions": 1
  },
  {
    "date": "2026-01-12",
    "submissions": 0
  },
  {
    "date": "2026-01-13",
    "submissions": 1
  },
  {
    "date": "2026-01-14",
    "submissions": 1
  },
  {
    "date": "2026-01-15",
    "submissions": 1
  },
  {
    "date": "2026-01-16",
    "submissions": 1
  },
  {
    "date": "2026-01-17",
    "submissions": 0
  },
  {
    "date": "2026-01-18",
    "submissions": 1
  },
  {
    "date": "2026-01-19",
    "submissions": 1
  },
  {
    "date": "2026-01-20",
    "submissions": 1
  },
  {
    "date": "2026-01-21",
    "submissions": 0
  },
  {
    "date": "2026-01-22",
    "submissions": 0
  },
  {
    "date": "2026-01-23",
    "submissions": 1
  },
  {
    "date": "2026-01-24",
    "submissions": 1
  },
  {
    "date": "2026-01-25",
    "submissions": 1
  },
  {
    "date": "2026-01-26",
    "submissions": 0
  },
  {
    "date": "2026-01-27",
    "submissions": 0
  },
  {
    "date": "2026-01-28",
    "submissions": 0
  },
  {
    "date": "2026-01-29",
    "submissions": 0
  },
  {
    "date": "2026-01-30",
    "submissions": 0
  },
  {
    "date": "2026-01-31",
    "submissions": 0
  },
  {
    "date": "2026-02-01",
    "submissions": 1
  },
  {
    "date": "2026-02-02",
    "submissions": 1
  },
  {
    "date": "2026-02-03",
    "submissions": 1
  },
  {
    "date": "2026-02-04",
    "submissions": 1
  },
  {
    "date": "2026-02-05",
    "submissions": 1
  },
  {
    "date": "2026-02-06",
    "submissions": 1
  },
  {
    "date": "2026-02-07",
    "submissions": 0
  },
  {
    "date": "2026-02-08",
    "submissions": 1
  },
  {
    "date": "2026-02-09",
    "submissions": 1
  },
  {
    "date": "2026-02-10",
    "submissions": 2
  },
  {
    "date": "2026-02-11",
    "submissions": 0
  },
  {
    "date": "2026-02-12",
    "submissions": 1
  },
  {
    "date": "2026-02-13",
    "submissions": 2
  },
  {
    "date": "2026-02-14",
    "submissions": 1
  },
  {
    "date": "2026-02-15",
    "submissions": 0
  },
  {
    "date": "2026-02-16",
    "submissions": 1
  },
  {
    "date": "2026-02-17",
    "submissions": 1
  },
  {
    "date": "2026-02-18",
    "submissions": 1
  },
  {
    "date": "2026-02-19",
    "submissions": 1
  },
  {
    "date": "2026-02-20",
    "submissions": 1
  },
  {
    "date": "2026-02-21",
    "submissions": 1
  },
  {
    "date": "2026-02-22",
    "submissions": 1
  },
  {
    "date": "2026-02-23",
    "submissions": 1
  },
  {
    "date": "2026-02-24",
    "submissions": 1
  },
  {
    "date": "2026-02-25",
    "submissions": 1
  },
  {
    "date": "2026-02-26",
    "submissions": 1
  },
  {
    "date": "2026-02-27",
    "submissions": 1
  },
  {
    "date": "2026-02-28",
    "submissions": 1
  },
  {
    "date": "2026-03-01",
    "submissions": 0
  },
  {
    "date": "2026-03-02",
    "submissions": 0
  },
  {
    "date": "2026-03-03",
    "submissions": 1
  },
  {
    "date": "2026-03-04",
    "submissions": 1
  },
  {
    "date": "2026-03-05",
    "submissions": 1
  },
  {
    "date": "2026-03-06",
    "submissions": 0
  },
  {
    "date": "2026-03-07",
    "submissions": 1
  },
  {
    "date": "2026-03-08",
    "submissions": 0
  },
  {
    "date": "2026-03-09",
    "submissions": 1
  },
  {
    "date": "2026-03-10",
    "submissions": 0
  },
  {
    "date": "2026-03-11",
    "submissions": 1
  },
  {
    "date": "2026-03-12",
    "submissions": 2
  },
  {
    "date": "2026-03-13",
    "submissions": 2
  },
  {
    "date": "2026-03-14",
    "submissions": 0
  },
  {
    "date": "2026-03-15",
    "submissions": 5
  },
  {
    "date": "2026-03-16",
    "submissions": 1
  },
  {
    "date": "2026-03-17",
    "submissions": 0
  },
  {
    "date": "2026-03-18",
    "submissions": 1
  },
  {
    "date": "2026-03-19",
    "submissions": 0
  },
  {
    "date": "2026-03-20",
    "submissions": 0
  },
  {
    "date": "2026-03-21",
    "submissions": 0
  },
  {
    "date": "2026-03-22",
    "submissions": 2
  },
  {
    "date": "2026-03-23",
    "submissions": 2
  },
  {
    "date": "2026-03-24",
    "submissions": 0
  },
  {
    "date": "2026-03-25",
    "submissions": 0
  },
  {
    "date": "2026-03-26",
    "submissions": 0
  },
  {
    "date": "2026-03-27",
    "submissions": 0
  },
  {
    "date": "2026-03-28",
    "submissions": 1
  },
  {
    "date": "2026-03-29",
    "submissions": 0
  },
  {
    "date": "2026-03-30",
    "submissions": 0
  },
  {
    "date": "2026-03-31",
    "submissions": 1
  },
  {
    "date": "2026-04-01",
    "submissions": 0
  },
  {
    "date": "2026-04-02",
    "submissions": 0
  },
  {
    "date": "2026-04-03",
    "submissions": 0
  },
  {
    "date": "2026-04-04",
    "submissions": 0
  },
  {
    "date": "2026-04-05",
    "submissions": 0
  },
  {
    "date": "2026-04-06",
    "submissions": 0
  },
  {
    "date": "2026-04-07",
    "submissions": 0
  },
  {
    "date": "2026-04-08",
    "submissions": 0
  },
  {
    "date": "2026-04-09",
    "submissions": 1
  },
  {
    "date": "2026-04-10",
    "submissions": 4
  },
  {
    "date": "2026-04-11",
    "submissions": 1
  },
  {
    "date": "2026-04-12",
    "submissions": 0
  },
  {
    "date": "2026-04-13",
    "submissions": 0
  },
  {
    "date": "2026-04-14",
    "submissions": 6
  },
  {
    "date": "2026-04-15",
    "submissions": 1
  },
  {
    "date": "2026-04-16",
    "submissions": 2
  },
  {
    "date": "2026-04-17",
    "submissions": 8
  },
  {
    "date": "2026-04-18",
    "submissions": 0
  },
  {
    "date": "2026-04-19",
    "submissions": 2
  },
  {
    "date": "2026-04-20",
    "submissions": 1
  },
  {
    "date": "2026-04-21",
    "submissions": 2
  },
  {
    "date": "2026-04-22",
    "submissions": 3
  },
  {
    "date": "2026-04-23",
    "submissions": 2
  },
  {
    "date": "2026-04-24",
    "submissions": 4
  },
  {
    "date": "2026-04-25",
    "submissions": 1
  },
  {
    "date": "2026-04-26",
    "submissions": 0
  },
  {
    "date": "2026-04-27",
    "submissions": 0
  },
  {
    "date": "2026-04-28",
    "submissions": 0
  },
  {
    "date": "2026-04-29",
    "submissions": 1
  },
  {
    "date": "2026-04-30",
    "submissions": 0
  },
  {
    "date": "2026-05-01",
    "submissions": 0
  },
  {
    "date": "2026-05-02",
    "submissions": 4
  },
  {
    "date": "2026-05-03",
    "submissions": 0
  },
  {
    "date": "2026-05-04",
    "submissions": 0
  },
  {
    "date": "2026-05-05",
    "submissions": 0
  },
  {
    "date": "2026-05-06",
    "submissions": 0
  },
  {
    "date": "2026-05-07",
    "submissions": 0
  },
  {
    "date": "2026-05-08",
    "submissions": 0
  },
  {
    "date": "2026-05-09",
    "submissions": 0
  },
  {
    "date": "2026-05-10",
    "submissions": 0
  },
  {
    "date": "2026-05-11",
    "submissions": 0
  },
  {
    "date": "2026-05-12",
    "submissions": 0
  },
  {
    "date": "2026-05-13",
    "submissions": 0
  },
  {
    "date": "2026-05-14",
    "submissions": 0
  },
  {
    "date": "2026-05-15",
    "submissions": 1
  },
  {
    "date": "2026-05-16",
    "submissions": 0
  },
  {
    "date": "2026-05-17",
    "submissions": 0
  },
  {
    "date": "2026-05-18",
    "submissions": 1
  },
  {
    "date": "2026-05-19",
    "submissions": 4
  },
  {
    "date": "2026-05-20",
    "submissions": 2
  },
  {
    "date": "2026-05-21",
    "submissions": 3
  },
  {
    "date": "2026-05-22",
    "submissions": 4
  },
  {
    "date": "2026-05-23",
    "submissions": 9
  },
  {
    "date": "2026-05-24",
    "submissions": 0
  },
  {
    "date": "2026-05-25",
    "submissions": 0
  },
  {
    "date": "2026-05-26",
    "submissions": 2
  },
  {
    "date": "2026-05-27",
    "submissions": 0
  },
  {
    "date": "2026-05-28",
    "submissions": 0
  },
  {
    "date": "2026-05-29",
    "submissions": 0
  },
  {
    "date": "2026-05-30",
    "submissions": 0
  },
  {
    "date": "2026-05-31",
    "submissions": 2
  },
  {
    "date": "2026-06-01",
    "submissions": 0
  },
  {
    "date": "2026-06-02",
    "submissions": 2
  },
  {
    "date": "2026-06-03",
    "submissions": 0
  },
  {
    "date": "2026-06-04",
    "submissions": 0
  },
  {
    "date": "2026-06-05",
    "submissions": 0
  },
  {
    "date": "2026-06-06",
    "submissions": 0
  },
  {
    "date": "2026-06-07",
    "submissions": 0
  },
  {
    "date": "2026-06-08",
    "submissions": 0
  },
  {
    "date": "2026-06-09",
    "submissions": 0
  },
  {
    "date": "2026-06-10",
    "submissions": 0
  },
  {
    "date": "2026-06-11",
    "submissions": 0
  },
  {
    "date": "2026-06-12",
    "submissions": 0
  },
  {
    "date": "2026-06-13",
    "submissions": 0
  },
  {
    "date": "2026-06-14",
    "submissions": 0
  },
  {
    "date": "2026-06-15",
    "submissions": 0
  },
  {
    "date": "2026-06-16",
    "submissions": 1
  },
  {
    "date": "2026-06-17",
    "submissions": 1
  },
  {
    "date": "2026-06-18",
    "submissions": 4
  },
  {
    "date": "2026-06-19",
    "submissions": 0
  },
  {
    "date": "2026-06-20",
    "submissions": 3
  },
  {
    "date": "2026-06-21",
    "submissions": 4
  },
  {
    "date": "2026-06-22",
    "submissions": 0
  },
  {
    "date": "2026-06-23",
    "submissions": 0
  },
  {
    "date": "2026-06-24",
    "submissions": 0
  },
  {
    "date": "2026-06-25",
    "submissions": 3
  },
  {
    "date": "2026-06-26",
    "submissions": 0
  },
  {
    "date": "2026-06-27",
    "submissions": 0
  },
  {
    "date": "2026-06-28",
    "submissions": 0
  },
  {
    "date": "2026-06-29",
    "submissions": 0
  },
  {
    "date": "2026-06-30",
    "submissions": 1
  },
  {
    "date": "2026-07-01",
    "submissions": 1
  },
  {
    "date": "2026-07-02",
    "submissions": 0
  },
  {
    "date": "2026-07-03",
    "submissions": 0
  },
  {
    "date": "2026-07-04",
    "submissions": 0
  },
  {
    "date": "2026-07-05",
    "submissions": 0
  },
  {
    "date": "2026-07-06",
    "submissions": 0
  },
  {
    "date": "2026-07-07",
    "submissions": 0
  },
  {
    "date": "2026-07-08",
    "submissions": 0
  },
  {
    "date": "2026-07-09",
    "submissions": 0
  },
  {
    "date": "2026-07-10",
    "submissions": 0
  },
  {
    "date": "2026-07-11",
    "submissions": 0
  },
  {
    "date": "2026-07-12",
    "submissions": 0
  },
  {
    "date": "2026-07-13",
    "submissions": 0
  },
  {
    "date": "2026-07-14",
    "submissions": 0
  },
  {
    "date": "2026-07-15",
    "submissions": 0
  },
  {
    "date": "2026-07-16",
    "submissions": 0
  },
  {
    "date": "2026-07-17",
    "submissions": 0
  },
  {
    "date": "2026-07-18",
    "submissions": 0
  },
  {
    "date": "2026-07-19",
    "submissions": 0
  },
  {
    "date": "2026-07-20",
    "submissions": 0
  },
  {
    "date": "2026-07-21",
    "submissions": 0
  },
  {
    "date": "2026-07-22",
    "submissions": 0
  },
  {
    "date": "2026-07-23",
    "submissions": 0
  },
  {
    "date": "2026-07-24",
    "submissions": 0
  },
  {
    "date": "2026-07-25",
    "submissions": 0
  },
  {
    "date": "2026-07-26",
    "submissions": 0
  },
  {
    "date": "2026-07-27",
    "submissions": 0
  },
  {
    "date": "2026-07-28",
    "submissions": 0
  },
  {
    "date": "2026-07-29",
    "submissions": 0
  },
  {
    "date": "2026-07-30",
    "submissions": 0
  },
  {
    "date": "2026-07-31",
    "submissions": 0
  },
  {
    "date": "2026-08-01",
    "submissions": 0
  },
  {
    "date": "2026-08-02",
    "submissions": 1
  },
  {
    "date": "2026-08-03",
    "submissions": 0
  },
  {
    "date": "2026-08-04",
    "submissions": 8
  },
  {
    "date": "2026-08-05",
    "submissions": 0
  },
  {
    "date": "2026-08-06",
    "submissions": 0
  },
  {
    "date": "2026-08-07",
    "submissions": 0
  },
  {
    "date": "2026-08-08",
    "submissions": 1
  },
  {
    "date": "2026-08-09",
    "submissions": 0
  },
  {
    "date": "2026-08-10",
    "submissions": 0
  },
  {
    "date": "2026-08-11",
    "submissions": 0
  },
  {
    "date": "2026-08-12",
    "submissions": 0
  },
  {
    "date": "2026-08-13",
    "submissions": 0
  },
  {
    "date": "2026-08-14",
    "submissions": 0
  },
  {
    "date": "2026-08-15",
    "submissions": 1
  },
  {
    "date": "2026-08-16",
    "submissions": 1
  },
  {
    "date": "2026-08-17",
    "submissions": 0
  },
  {
    "date": "2026-08-18",
    "submissions": 0
  },
  {
    "date": "2026-08-19",
    "submissions": 2
  },
  {
    "date": "2026-08-20",
    "submissions": 1
  },
  {
    "date": "2026-08-21",
    "submissions": 2
  },
  {
    "date": "2026-08-22",
    "submissions": 1
  },
  {
    "date": "2026-08-23",
    "submissions": 4
  },
  {
    "date": "2026-08-24",
    "submissions": 1
  },
  {
    "date": "2026-08-25",
    "submissions": 1
  },
  {
    "date": "2026-08-26",
    "submissions": 1
  },
  {
    "date": "2026-08-27",
    "submissions": 0
  },
  {
    "date": "2026-08-28",
    "submissions": 0
  },
  {
    "date": "2026-08-29",
    "submissions": 0
  },
  {
    "date": "2026-08-30",
    "submissions": 0
  },
  {
    "date": "2026-08-31",
    "submissions": 0
  },
  {
    "date": "2026-09-01",
    "submissions": 3
  },
  {
    "date": "2026-09-02",
    "submissions": 2
  },
  {
    "date": "2026-09-03",
    "submissions": 2
  },
  {
    "date": "2026-09-04",
    "submissions": 1
  },
  {
    "date": "2026-09-05",
    "submissions": 0
  },
  {
    "date": "2026-09-06",
    "submissions": 1
  },
  {
    "date": "2026-09-07",
    "submissions": 1
  },
  {
    "date": "2026-09-08",
    "submissions": 2
  },
  {
    "date": "2026-09-09",
    "submissions": 3
  },
  {
    "date": "2026-09-10",
    "submissions": 1
  },
  {
    "date": "2026-09-11",
    "submissions": 1
  },
  {
    "date": "2026-09-12",
    "submissions": 1
  },
  {
    "date": "2026-09-13",
    "submissions": 3
  },
  {
    "date": "2026-09-14",
    "submissions": 1
  },
  {
    "date": "2026-09-15",
    "submissions": 1
  },
  {
    "date": "2026-09-16",
    "submissions": 7
  },
  {
    "date": "2026-09-17",
    "submissions": 8
  },
  {
    "date": "2026-09-18",
    "submissions": 3
  },
  {
    "date": "2026-09-19",
    "submissions": 7
  },
  {
    "date": "2026-09-20",
    "submissions": 6
  },
  {
    "date": "2026-09-21",
    "submissions": 1
  },
  {
    "date": "2026-09-22",
    "submissions": 3
  },
  {
    "date": "2026-09-23",
    "submissions": 1
  },
  {
    "date": "2026-09-24",
    "submissions": 6
  },
  {
    "date": "2026-09-25",
    "submissions": 3
  },
  {
    "date": "2026-09-26",
    "submissions": 10
  },
  {
    "date": "2026-09-27",
    "submissions": 7
  },
  {
    "date": "2026-09-28",
    "submissions": 1
  },
  {
    "date": "2026-09-29",
    "submissions": 2
  },
  {
    "date": "2026-09-30",
    "submissions": 3
  },
  {
    "date": "2026-10-01",
    "submissions": 1
  },
  {
    "date": "2026-10-02",
    "submissions": 1
  },
  {
    "date": "2026-10-03",
    "submissions": 1
  },
  {
    "date": "2026-10-04",
    "submissions": 1
  },
  {
    "date": "2026-10-05",
    "submissions": 1
  },
  {
    "date": "2026-10-06",
    "submissions": 1
  },
  {
    "date": "2026-10-07",
    "submissions": 1
  },
  {
    "date": "2026-10-08",
    "submissions": 1
  },
  {
    "date": "2026-10-09",
    "submissions": 1
  },
  {
    "date": "2026-10-10",
    "submissions": 0
  }
]
~~~

### Recent accepted submissions (up to 20 requested)

~~~json
[
  {
    "id": "2167417151",
    "title": "Minimum Insertions to Balance a Parentheses String",
    "url": "https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-09T15:33:19.000Z",
    "runtime": "10 ms",
    "memory": "47.8 MB"
  },
  {
    "id": "2166330724",
    "title": "Remove Outermost Parentheses",
    "url": "https://leetcode.com/problems/remove-outermost-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-08T13:03:56.000Z",
    "runtime": "7 ms",
    "memory": "43.4 MB"
  },
  {
    "id": "2165304741",
    "title": "Remove Invalid Parentheses",
    "url": "https://leetcode.com/problems/remove-invalid-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-07T13:14:36.000Z",
    "runtime": "1 ms",
    "memory": "43.8 MB"
  },
  {
    "id": "2164296232",
    "title": "Minimum Add to Make Parentheses Valid",
    "url": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-06T13:59:05.000Z",
    "runtime": "0 ms",
    "memory": "42.7 MB"
  },
  {
    "id": "2163171850",
    "title": "Score of Parentheses",
    "url": "https://leetcode.com/problems/score-of-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-05T13:45:20.000Z",
    "runtime": "1 ms",
    "memory": "42.9 MB"
  },
  {
    "id": "2162109705",
    "title": "Valid Parenthesis String",
    "url": "https://leetcode.com/problems/valid-parenthesis-string/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-04T13:00:58.000Z",
    "runtime": "0 ms",
    "memory": "42.5 MB"
  },
  {
    "id": "2160790639",
    "title": "Longest Valid Parentheses",
    "url": "https://leetcode.com/problems/longest-valid-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-03T06:26:30.000Z",
    "runtime": "5 ms",
    "memory": "46.6 MB"
  },
  {
    "id": "2159736366",
    "title": "Generate Parentheses",
    "url": "https://leetcode.com/problems/generate-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-02T03:30:30.000Z",
    "runtime": "2 ms",
    "memory": "45 MB"
  },
  {
    "id": "2158774213",
    "title": "Valid Parentheses",
    "url": "https://leetcode.com/problems/valid-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-10-01T04:17:53.000Z",
    "runtime": "3 ms",
    "memory": "43.4 MB"
  },
  {
    "id": "2158641810",
    "title": "Climbing Stairs",
    "url": "https://leetcode.com/problems/climbing-stairs/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-30T23:26:14.000Z",
    "runtime": "0 ms",
    "memory": "42.4 MB"
  },
  {
    "id": "2158638165",
    "title": "Greatest Common Divisor of Strings",
    "url": "https://leetcode.com/problems/greatest-common-divisor-of-strings/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-30T23:11:05.000Z",
    "runtime": "0 ms",
    "memory": "43.4 MB"
  },
  {
    "id": "2158327843",
    "title": "Maximum Nesting Depth of Two Valid Parentheses Strings",
    "url": "https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-30T15:54:21.000Z",
    "runtime": "1 ms",
    "memory": "45.2 MB"
  },
  {
    "id": "2157388908",
    "title": "Sum in a Matrix",
    "url": "https://leetcode.com/problems/sum-in-a-matrix/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-29T17:22:27.000Z",
    "runtime": "19 ms",
    "memory": "78.3 MB"
  },
  {
    "id": "2156531081",
    "title": "Check if There Is a Valid Parentheses String Path",
    "url": "https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-29T01:11:39.000Z",
    "runtime": "81 ms",
    "memory": "50.2 MB"
  },
  {
    "id": "2156098260",
    "title": "Maximum Nesting Depth of the Parentheses",
    "url": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-28T14:58:12.000Z",
    "runtime": "0 ms",
    "memory": "43 MB"
  },
  {
    "id": "2155102044",
    "title": "Search in Rotated Sorted Array",
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-27T15:33:54.000Z",
    "runtime": "0 ms",
    "memory": "43.9 MB"
  },
  {
    "id": "2154515184",
    "title": "Reverse Substrings Between Each Pair of Parentheses",
    "url": "https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-27T03:11:26.000Z",
    "runtime": "1 ms",
    "memory": "42.8 MB"
  },
  {
    "id": "2154487875",
    "title": "Longest Subarray With Restricted Pair Sums",
    "url": "https://leetcode.com/problems/longest-subarray-with-restricted-pair-sums/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-27T02:52:50.000Z",
    "runtime": "45 ms",
    "memory": "46.6 MB"
  },
  {
    "id": "2154486601",
    "title": "Maximize Meeting Earnings with Idle Gaps",
    "url": "https://leetcode.com/problems/maximize-meeting-earnings-with-idle-gaps/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-27T02:52:03.000Z",
    "runtime": "77 ms",
    "memory": "217.7 MB"
  },
  {
    "id": "2154461517",
    "title": "Maximum Equal Adjacent Pairs After at Most One Replacement",
    "url": "https://leetcode.com/problems/maximum-equal-adjacent-pairs-after-at-most-one-replacement/",
    "language": "java",
    "status": "Accepted",
    "timestamp": "2026-09-27T02:34:29.000Z",
    "runtime": "226 ms",
    "memory": "139.1 MB"
  }
]
~~~

The public endpoint returned 20 accepted submissions; it does not represent all attempts.

### Raw contest payload

~~~json
{
  "ranking": {
    "attendedContestsCount": 7,
    "rating": 1997.112533039593,
    "globalRanking": 23026,
    "totalParticipants": 887132,
    "topPercentage": 2.69,
    "badge": {
      "name": "Knight",
      "icon": "/static/images/badges/knight.png"
    }
  },
  "history": [
    {
      "attended": true,
      "contest": {
        "title": "Weekly Contest 478",
        "startTime": 1764469800
      },
      "rating": 1491.597,
      "ranking": 10785
    },
    {
      "attended": true,
      "contest": {
        "title": "Biweekly Contest 171",
        "startTime": 1765031400
      },
      "rating": 1557.574,
      "ranking": 4554
    },
    {
      "attended": true,
      "contest": {
        "title": "Weekly Contest 479",
        "startTime": 1765074600
      },
      "rating": 1620,
      "ranking": 3045
    },
    {
      "attended": true,
      "contest": {
        "title": "Weekly Contest 493",
        "startTime": 1773541800
      },
      "rating": 1627.563,
      "ranking": 11454
    },
    {
      "attended": true,
      "contest": {
        "title": "Weekly Contest 520",
        "startTime": 1789871400
      },
      "rating": 1763.467,
      "ranking": 198
    },
    {
      "attended": true,
      "contest": {
        "title": "Biweekly Contest 192",
        "startTime": 1790433000
      },
      "rating": 1898.052,
      "ranking": 64
    },
    {
      "attended": true,
      "contest": {
        "title": "Weekly Contest 521",
        "startTime": 1790476200
      },
      "rating": 1997.113,
      "ranking": 132
    }
  ]
}
~~~
<!-- LEETCODE-DATA:END -->

## 4. Git graph and contribution details

- GitHub commits last 365 days by repository and last commit date — MISSING in the initial snapshot; fetch-github.js attempts author-filtered commit history.
- Monthly commit counts, most active repository/month, daily commit totals, UTC hour buckets and weekday buckets — MISSING in initial snapshot; script computes these from timestamps.
- Daily GitHub contributions by commit/PR/issue/review — MISSING where GraphQL is unavailable. GitHub calendar only reports total daily contribution count, not a full breakdown by type.
- Longest/current GitHub streak, longest gap and active days — MISSING until the contribution calendar is retrieved.
- LeetCode daily submission counts for 2025-10-11 through 2026-10-10 UTC are recorded in section 3 when the public calendar query succeeds.

## 5. Project data

Project fields are based on lib/portfolio-data.ts. Unavailable values are MISSING. order is current array order; featured is MISSING because the typed objects do not define an independent featured flag.

~~~json
[
  {
    "title": "Aevor",
    "slug": "aevor",
    "description": "A review-first developer platform that turns a GitHub issue into a proposed, validated pull request while keeping a human in control of publication.",
    "longDescription": [
      "Aevor assembles bounded repository context, proposes a change, generates a reviewable diff, validates it with the project's toolchain, and leaves publication behind a human review gate."
    ],
    "year": "MISSING",
    "role": "Platform architecture and engineering",
    "client": "MISSING",
    "medium": "Go · React · PostgreSQL · FastAPI",
    "tools": [
      "Go",
      "Gin",
      "GORM",
      "PostgreSQL",
      "React",
      "FastAPI",
      "Docker"
    ],
    "tags": [
      "Go",
      "Gin",
      "PostgreSQL",
      "React",
      "FastAPI",
      "Docker"
    ],
    "repoUrl": "https://github.com/Aevor/platform",
    "liveUrl": "MISSING",
    "images": "MISSING",
    "coverImage": "MISSING",
    "process": [
      {
        "title": "Understand the issue",
        "description": "Retrieve bounded repository context.",
        "image": "MISSING"
      },
      {
        "title": "Generate a change",
        "description": "Produce a reviewable diff.",
        "image": "MISSING"
      },
      {
        "title": "Validate",
        "description": "Validate the proposed change.",
        "image": "MISSING"
      },
      {
        "title": "Human review",
        "description": "Publication stays behind review.",
        "image": "MISSING"
      }
    ],
    "outcomes": "MISSING",
    "featured": "MISSING",
    "order": 1
  },
  {
    "title": "CommitHub",
    "slug": "commithub",
    "description": "A GitHub-like collaboration platform exploring repositories, branches, commits, pull requests, reviews, merge conflicts and access control.",
    "longDescription": [
      "CommitHub models code-hosting workflows including branch-aware repository operations, pull-request reviews, merge-conflict resolution, branch protection and realtime collaboration.",
      "Implementation uses React, Express, MongoDB, JWT authentication, role-aware authorization and WebSocket events."
    ],
    "year": "MISSING",
    "role": "Full-stack engineering",
    "client": "MISSING",
    "medium": "React · Node.js · Express · MongoDB",
    "tools": [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Docker"
    ],
    "tags": [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
      "Socket.io"
    ],
    "repoUrl": "https://github.com/knockknock10/CommitHub",
    "liveUrl": "https://knockknock10.github.io/CommitHub",
    "images": "MISSING",
    "coverImage": "MISSING",
    "process": [
      {
        "title": "Model operations",
        "description": "Model repository and pull-request workflows.",
        "image": "MISSING"
      },
      {
        "title": "Enforce permissions",
        "description": "Enforce authorization boundaries.",
        "image": "MISSING"
      },
      {
        "title": "Synchronize activity",
        "description": "Keep repository and review activity synchronized.",
        "image": "MISSING"
      }
    ],
    "outcomes": "MISSING",
    "featured": "MISSING",
    "order": 2
  },
  {
    "title": "SemBind-Audio",
    "slug": "sembind-audio",
    "description": "A semantic-aware audio watermarking research framework using transformer-based audio representations and cryptographic metadata binding.",
    "longDescription": [
      "SemBind-Audio explores semantic-guided watermark placement using audio representations and time-frequency suitability, then binds metadata with SHA-256.",
      "Clean-channel recovery succeeded in the tested setup; tested attacks exposed a robustness limitation that remains an explicit research problem."
    ],
    "year": "MISSING",
    "role": "Research implementation and evaluation",
    "client": "MISSING",
    "medium": "Python · PyTorch · HuBERT · STFT · SHA-256",
    "tools": [
      "Python",
      "PyTorch",
      "HuBERT",
      "Transformers",
      "LibriSpeech",
      "SHA-256"
    ],
    "tags": [
      "Python",
      "PyTorch",
      "HuBERT",
      "STFT",
      "Audio ML",
      "SHA-256"
    ],
    "repoUrl": "https://github.com/knockknock10/SemBind_Audio",
    "liveUrl": "MISSING",
    "images": "MISSING",
    "coverImage": "MISSING",
    "process": [
      {
        "title": "Extract representations",
        "description": "Extract semantic and spectrogram features.",
        "image": "MISSING"
      },
      {
        "title": "Rank regions",
        "description": "Rank candidate time-frequency regions.",
        "image": "MISSING"
      },
      {
        "title": "Bind metadata",
        "description": "Bind metadata with SHA-256.",
        "image": "MISSING"
      },
      {
        "title": "Evaluate robustness",
        "description": "Evaluate recovery and integrity.",
        "image": "MISSING"
      }
    ],
    "outcomes": [
      "Clean-channel recovery succeeded in the tested setup.",
      "Tested attacks exposed a robustness limitation."
    ],
    "featured": "MISSING",
    "order": 3
  },
  {
    "title": "FailureScope",
    "slug": "failurescope",
    "description": "A log-ingestion and failure-detection concept focused on correlating event sequences with failure signatures and surfacing actionable reliability signals.",
    "longDescription": [
      "FailureScope explores how application event streams can be organized into useful failure signals.",
      "The focus is on temporal patterns and correlated failure signatures rather than treating every log line as an isolated alert."
    ],
    "year": "MISSING",
    "role": "Product and engineering",
    "client": "MISSING",
    "medium": "Node.js · JavaScript · Observability",
    "tools": [
      "Node.js",
      "JavaScript",
      "Event processing"
    ],
    "tags": [
      "Node.js",
      "JavaScript",
      "Reliability",
      "Observability"
    ],
    "repoUrl": "https://github.com/knockknock10/failurescope",
    "liveUrl": "MISSING",
    "images": "MISSING",
    "coverImage": "MISSING",
    "process": "MISSING",
    "outcomes": "MISSING",
    "featured": "MISSING",
    "order": 4
  }
]
~~~

### Additional résumé-only / conflicting project records

#### CommitHub — Custom Version Control System
- Technologies: Go, CLI, file system, hashing.
- Résumé describes init/add/commit/branch/checkout/merge/log/status/revert, a content-addressable store, and a commit-history DAG.
- Relationship to the current collaboration-platform entry: MISSING — owner confirmation needed.

#### Wandera — Travel Experience Platform
- Source describes authentication, content management, location-based search, lazy loading, code-splitting, dynamic routing and responsive UI.
- Technologies: React.js, Node.js, Express.js, MongoDB, REST APIs, Tailwind CSS.
- Repository: https://github.com/knockknock10/Wandera
- Year/client/images/verified numeric outcomes: MISSING.

#### FailureScope — résumé record
- Technologies: Node.js, JavaScript and DevOps.
- Source describes event-stream ingestion, temporal failure-pattern correlation and reliability metrics.
- Year/client/images/verified numeric outcomes: MISSING.

#### Nanosensor Network Communication Simulator
- Tool: MATLAB.
- Source describes multi-hop sensor communication simulation, delay/link-efficiency/reliability analysis and routing bottleneck analysis.
- Repository/year/client/images/numeric outcomes: MISSING.

## 6. Profile and social data

### Profile

| field | value | source |
| --- | --- | --- |
| Full name | Sanjeev Kumar | Current portfolio data |
| Professional name | Sanjeev Kumar | Current portfolio data |
| Pronouns | MISSING | Not present |
| Role/title | Software Engineering · Open Source · Applied AI | Current portfolio data |
| Tagline | I build developer tools, contribute to open source, and turn research ideas into working systems. | Verbatim current content |
| Short bio | Third-year B.Tech Computer Science and Engineering student at SRM University AP. | Verbatim current content |
| Long bio | Most of my learning happens by building: shipping projects, contributing to existing codebases, debugging infrastructure, and turning research ideas into working implementations. | Verbatim current content |
| Location | Amaravati, Andhra Pradesh, India | Current portfolio data |
| Availability status | MISSING | No explicit field |
| Site email | sanjeevkumar_s@srmap.edu.in | Current portfolio data; résumé address differs |
| Phone | MISSING | contact.phone is null |
| Résumé path | /resume.pdf | public/resume.pdf exists |

### Social links found

| platform | url | source |
| --- | --- | --- |
| GitHub | https://github.com/knockknock10 | Public profile/current portfolio data |
| LeetCode | https://leetcode.com/u/knockknock10/ | Public profile/current portfolio data |
| Personal site | https://kr-sanjeev.netlify.app/ | Public LeetCode website field |
| LinkedIn | https://linkedin.com/in/-sanjeev-kr | Public résumé/profile; current social URL is null, verify before enabling |

Social platforms not present in checked sources were omitted rather than guessed. LinkedIn has public-source evidence but the current portfolio URL field is null; confirm before enabling. Site and résumé contact email values differ.

## 7. Technical metadata

### Current branch stack

| field | value |
| --- | --- |
| Framework | Next.js ^15.5.0 |
| React | React ^19.0.0 |
| Styling | Tailwind CSS ^4.1.0 plus app/globals.css |
| Language | TypeScript / TSX |
| Package manager | npm / package-lock.json |
| Node version | Node.js 22 in CI |
| Dev command | npm run dev → next dev |
| Build command | npm run build → next build |
| Lint command | eslint app components lib next.config.ts --ext .js,.jsx,.ts,.tsx |
| Test command | MISSING — no test script declared |
| Deploy target | Netlify PR preview; production origin observed at https://kr-sanjeev.netlify.app |

### Environment variables

| name | purpose |
| --- | --- |
| GITHUB_TOKEN | Optional GitHub auth; required for contribution GraphQL where access requires authentication |
| GITHUB_USERNAME | Optional override for scripts/fetch-github.js |
| LEETCODE_USERNAME | Optional override for scripts/fetch-leetcode.js |

### Design tokens from app/globals.css

Every unique CSS custom-property name found in app/globals.css is listed. When scoped values differ, distinct values are joined with a vertical bar.

| token | value |
| --- | --- |
| --color-ink | #F6F7FC |
| --color-paper | #24263A |
| --color-neutral-800 | #E9EBF7 |
| --color-neutral-500 | #646A80 |
| --color-neutral-300 | #4D5369 |
| --color-accent | #6558F5 |
| --color-accent-soft | rgba(101, 88, 245, 0.12) |
| --color-glass-light | rgba(255, 255, 255, 0.72) |
| --color-glass-dark | rgba(255, 255, 255, 0.76) |
| --color-glass-accent | rgba(119, 111, 255, 0.17) |
| --color-edge-top | rgba(255, 255, 255, 0.92) |
| --color-edge-bottom | rgba(76, 84, 126, 0.17) |
| --color-inner-highlight | rgba(255, 255, 255, 0.88) |
| --color-shadow | rgba(56, 62, 110, 0.13) |
| --color-shadow-soft | rgba(68, 75, 120, 0.08) |
| --text-12 | 0.75rem |
| --text-12--line-height | 1.45 |
| --text-14 | 0.875rem |
| --text-14--line-height | 1.45 |
| --text-16 | 1rem |
| --text-16--line-height | 1.5 |
| --text-18 | 1.125rem |
| --text-18--line-height | 1.5 |
| --text-20 | 1.25rem |
| --text-20--line-height | 1.4 |
| --text-24 | 1.5rem |
| --text-24--line-height | 1.35 |
| --text-32 | 2rem |
| --text-32--line-height | 1.2 |
| --text-44 | 2.75rem |
| --text-44--line-height | 1.12 |
| --text-44--letter-spacing | -0.025em |
| --text-64 | 4rem |
| --text-64--line-height | 1.05 |
| --text-64--letter-spacing | -0.035em |
| --text-88 | 5.5rem |
| --text-88--line-height | 0.98 |
| --text-88--letter-spacing | -0.045em |
| --text-120 | 7.5rem |
| --text-120--line-height | 0.92 |
| --text-120--letter-spacing | -0.055em |
| --tracking-heading | -0.025em |
| --tracking-display | -0.04em |
| --spacing-1 | 4px |
| --spacing-2 | 8px |
| --spacing-3 | 12px |
| --spacing-4 | 16px |
| --spacing-6 | 24px |
| --spacing-8 | 32px |
| --spacing-12 | 48px |
| --spacing-16 | 64px |
| --spacing-24 | 96px |
| --spacing-32 | 128px |
| --radius-sm | 8px |
| --radius-md | 16px |
| --radius-lg | 24px |
| --radius-xl | 32px |
| --radius-squircle | 40px |
| --spring-gentle-stiffness | 170 |
| --spring-gentle-damping | 23 |
| --spring-gentle-mass | 1 |
| --spring-snappy-stiffness | 320 |
| --spring-snappy-damping | 28 |
| --spring-snappy-mass | 0.7 |
| --spring-heavy-stiffness | 220 |
| --spring-heavy-damping | 24 |
| --spring-heavy-mass | 1.5 |
| --duration-fast | 180ms |
| --duration-base | 280ms |
| --duration-slow | 480ms |
| --duration-none | 0ms |
| --duration-liquid-loop | 26000ms |
| --ease-overshoot | cubic-bezier(0.34, 1.56, 0.64, 1) |
| --elevation-1-blur | 12px \| 14px |
| --elevation-2-blur | 24px \| 22px |
| --elevation-3-blur | 36px \| 28px |
| --elevation-1-shadow | 0 3px 12px var(--color-shadow-soft), inset 0 1px 0 var(--color-inner-highlight) \| 0 6px 18px rgba(78,83,139,.08), inset 0 1px 0 rgba(255,255,255,.88) |
| --elevation-2-shadow | 0 8px 24px var(--color-shadow), inset 0 1px 0 var(--color-inner-highlight) \| 0 16px 38px rgba(78,83,139,.14), inset 0 1px 0 rgba(255,255,255,.92) |
| --elevation-3-shadow | 0 16px 40px var(--color-shadow), inset 0 1px 0 var(--color-inner-highlight) \| 0 24px 60px rgba(78,83,139,.18), inset 0 1px 0 rgba(255,255,255,.95) |
| --glass-noise-opacity | 0.03 \| .035 |
| --glass-max-active-layers | 1 |
| --tracking-eyebrow | 0.08em |
| --magnetic-max-offset | 6px |
| --press-scale | 0.97 |
| --scale-rest | 1 |
| --reveal-offset-y | 18px |
| --reveal-scale-start | 0.96 |
| --reveal-blur | 12px |
| --reveal-blur-clear | 0px |
| --motion-hidden-opacity | 0 |
| --layout-content-max | 1440px |
| --layout-stage-min-height | 220px |
| --layout-card-min | 220px |
| --duration-nav-hide | 300ms |
| --duration-menu-stagger | 60ms |
| --duration-route | 280ms |
| --route-shift | 8px |
| --nav-height-desktop | 64px |
| --nav-height-mobile | 56px |
| --nav-max-width | 960px |
| --nav-icon-size | 44px |
| --nav-hidden-offset | 120% |
| --menu-item-offset | 8px |
| --z-nav | 110 |
| --z-menu | 100 |
| --z-noise | 0 |
| --focus-outline-width | 2px |
| --focus-outline-offset | 4px |
| --border-thin | 1px |
| --footer-min-height | 112px |
| --route-shell-min-height | 1px |
| --duration-hero-stagger | 70ms |
| --duration-hero-line-stagger | 55ms |
| --hero-backdrop-opacity | 1 |
| --hero-reveal-offset | 16px |
| --hero-scroll-threshold | 1px |
| --hero-scroll-cue-offset | 8px |
| --hero-title-size | clamp(var(--text-44), 11vw, var(--text-120)) |
| --hero-copy-width | 100% |
| --hero-heading-max-width | 12ch |
| --hero-subhead-max-width | 68ch |
| --hero-scroll-line-height | 48px |
| --work-grid-gap | var(--spacing-6) |
| --work-card-padding | var(--spacing-3) |
| --work-card-hover-scale | 1.025 |
| --work-card-detail-shift | -4px |
| --work-card-enter-shift | 16px |
| --work-card-exit-shift | 8px |
| --work-media-aspect-ratio | 1.48 |
| --case-cover-aspect-ratio | 1.9 |
| --case-cover-min-height | 220px |
| --case-content-max | 960px |
| --work-heading-size | clamp(var(--text-64), 8vw, var(--text-88)) |
| --case-heading-size | clamp(var(--text-44), 7vw, var(--text-88)) |
| --work-chip-background | var(--color-neutral-800) \| rgba(105,104,150,.075) |
| --work-chip-border | color-mix(in srgb, var(--color-paper) 14%, transparent) \| rgba(86,93,143,.16) |
| --work-edge-hover | color-mix(in srgb, var(--color-accent) 60%, transparent) |
| --work-lightbox-z | 1200 |
| --work-lightbox-width | 1440px |
| --work-lightbox-height | 84dvh |
| --work-control-size | 48px |
| --font-ui | "Inter Tight", Inter, system-ui, sans-serif \| "Inter Tight", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif |
| --glass-tint-light | var(--color-glass-light) \| rgba(255,255,255,.7) |
| --glass-tint-dark | var(--color-glass-dark) \| rgba(255,255,255,.76) |
| --glass-tint-accent | var(--color-glass-accent) \| rgba(132,119,255,.18) |

### Primitives under components/primitives/

| path | type |
| --- | --- |
| components/primitives/Glass.tsx | component |
| components/primitives/LiquidBackdrop.tsx | component |
| components/primitives/MagneticButton.tsx | component |
| components/primitives/Noise.tsx | component |
| components/primitives/Reveal.tsx | component |
| components/primitives/Squircle.tsx | component |
| components/primitives/glassRegistry.ts | supporting module |
| components/primitives/index.ts | supporting module |
| components/primitives/motionTokens.ts | supporting module |

### Routes under app/

| file | route |
| --- | --- |
| app/page.tsx | / |
| app/about/page.tsx | /about |
| app/contact/page.tsx | /contact |
| app/design-system/page.tsx | /design-system |
| app/open-source/page.tsx | /open-source |
| app/problem-solving/page.tsx | /problem-solving |
| app/work/[slug]/page.tsx | /work/[slug] |
| app/not-found.tsx | 404 |

### Local image assets

| path | exists | usage |
| --- | --- | --- |
| public/favicon.svg | yes | favicon only |

Other public files are public/resume.pdf and public/robots.txt. No real project screenshots/covers were found.

### Build and CI notes

- CI workflow: .github/workflows/ci.yml; Node.js 22.
- Current package.json defines development, build, lint and formatting commands, but no test script.
- Latest known PR CI before this data-only commit passed lint, production build and TypeScript check. A new workflow should run after the commit.
- The Vite stack in the older AUDIT.md does not describe this feature branch.

## 8. MISSING DATA

### GitHub fields

<!-- GITHUB-MISSING:START -->
- PRs opened, merged/reviewed and issues opened/closed — MISSING in the initial snapshot; the refresh script queries GitHub Search API.
- Total commits and total contributions last 365 days — MISSING in the initial snapshot; refresh script attempts GraphQL and per-repository commit history.
- Full GitHub contribution calendar weeks/days/colors — MISSING in the initial snapshot; GraphQL requires GITHUB_TOKEN.
- Daily contribution types, longest/current streak, longest gap and active days — MISSING until calendar data is returned.
- Monthly commits, most active repository/month, daily commits, UTC hour buckets and weekday buckets — MISSING in the initial snapshot; the script computes them from commit timestamps.
- Organization-level commits, PR merged_at, review submitted_at, issues/comments, roles and deduplicated repository list — MISSING in detail; the script attempts public endpoints.
- GitHub primary-language byte percentages — MISSING; current language percentages count repositories by primary language.
<!-- GITHUB-MISSING:END -->

### LeetCode fields

<!-- LEETCODE-MISSING:START -->
- solutionCount and categoryDiscussCount — MISSING in the queried GraphQL schema; public page displayed 29 and 1 respectively but those are not API-returned fields.
- Exact postViewCount — MISSING; public UI showed only a rounded ~2.5K views.
- contributionPoints — MISSING; LeetCode response exposes reputation instead.
- Current streak — MISSING; public response exposes max streak only.
- Full recent attempts including non-accepted submissions — MISSING; recentAcSubmissionList returns accepted submissions only.
<!-- LEETCODE-MISSING:END -->

### Project/profile fields needing owner input or unavailable from sources

- Project year and client for Aevor, CommitHub, SemBind-Audio and FailureScope — MISSING; provide verified values if available.
- Local images and coverImage for all four projects — MISSING; no real project screenshots/covers exist under public/ or assets/.
- Independent featured boolean for each project — MISSING; not present in current typed data.
- Outcome metrics for Aevor, CommitHub and FailureScope — MISSING; supply only verified measurements.
- FailureScope process array — MISSING; processSteps absent from the current project object.
- Profile pronouns, explicit availability status and current-focus field — MISSING; absent from current typed profile.
- Public GitHub email — MISSING; GitHub reports null.
- LinkedIn URL — MISSING in active site configuration; public profile/resume has a URL, but current typed socials entry is null.
- Canonical email — MISSING as a resolved choice; current site and résumé addresses differ.
- CommitHub identity/content relationship — MISSING as a resolved owner decision; résumé and site describe different project types.
- Other social platforms not present in checked sources were omitted.
- Project screenshots, process images, covers and Open Graph image — MISSING; no real images found. Do not substitute stock or generated imagery.
- GitHub byte-share language percentages — MISSING; only repository-count primary-language percentages were available.
- Local script execution record — MISSING: this connector can edit the GitHub branch but cannot run inside the user's local clone or inspect local environment variables. Run both scripts locally to refresh the report and data.
