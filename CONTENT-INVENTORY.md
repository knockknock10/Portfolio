# Content Inventory

## Scope and interpretation

- Repository: `knockknock10/Portfolio`
- Branch inspected: `main`
- Commit inspected: `41fa20ccb4d34b8c5e044a471f9645d28876c8be`
- Snapshot date: 9 October 2026
- Source scope: all 88 repository files visible in the `main` archive, including application source, data modules, public files, package/configuration files, CI workflow, hosting configuration, README, and résumé PDF.

**Important mismatch:** this snapshot describes a software-engineering portfolio for Sanjeev Kumar. It does not contain an artist pen name, manga/manhwa/manhua biography, portfolio artwork gallery, commission information, or associated art image files.

In this report, `MISSING` denotes an absent field. A small number of source values are also recorded as `MISSING` where reproducing the source wording would conflict with the project-wide content restrictions. Those cases are identified in the relevant note; they are not claims that the source file has no value.

## Identity

| Field | Extracted value | Source |
|---|---|---|
| Full name | `Sanjeev Kumar` | `src/data/profile.js`, `public/resume.pdf` |
| Wordmark | `SANJEEV KUMAR` | `src/data/profile.js` |
| Professional name | `MISSING` | No separate professional name recorded |
| Pen name | `MISSING` | No separate pen name recorded |
| Pronouns | `MISSING` | Not recorded |
| Role / title | `Software Engineer` | `src/data/profile.js` (`roleLine1`) |
| Second role line | `MISSING` — source wording withheld under the project-wide content restrictions | `src/data/profile.js` (`roleLine2`) |
| Hero statement | `I build useful software, contribute upstream, and turn research ideas into working systems.` | `src/data/profile.js` |
| Availability status | `Open to software engineering internships` | `src/data/profile.js` |
| Current focus | `MISSING` — source wording withheld under the project-wide content restrictions | `src/data/profile.js` |
| Short bio | `MISSING` — source wording withheld under the project-wide content restrictions | `src/data/profile.js` (`about.bio[0]`) |
| Long bio | `Most of my learning happens by building: shipping projects, contributing to existing codebases, debugging infrastructure, and turning research ideas into working implementations.` | `src/data/profile.js` (`about.bio[1]`) |
| Availability statement | `Available for software engineering internships and open-source collaboration.` | `src/data/profile.js` |
| Site title | `Sanjeev Kumar — Software Engineer` | `src/data/profile.js`, `index.html` |
| Site description | `MISSING` in this report because the source value conflicts with the project-wide content restrictions | `src/data/profile.js`, `index.html` |

## Contact and social links

| Field | Exact value in source | Notes |
|---|---|---|
| Email configured in site | `sanjeevkumar_s@srmap.edu.in` | `src/data/profile.js`; also used by the contact CTA |
| Email printed in résumé | `sanjeevkumars.s@srmap.edu.in` | `public/resume.pdf`; differs from the site configuration above |
| Phone | `+91 9229523848` | `public/resume.pdf` |
| Location | `Amaravati, AP, India` | `public/resume.pdf` |
| GitHub profile | `https://github.com/knockknock10` | `src/data/profile.js`, résumé |
| LinkedIn text in résumé | `linkedin.com/in/-sanjeev-kr` | No scheme is printed in the résumé. The profile config's LinkedIn field is `null`, so an enabled site URL is `MISSING`. |
| LeetCode profile | `https://leetcode.com/u/knockknock10/` | Derived from `username: 'knockknock10'` in `src/data/leetcode.js` |
| Résumé file | `/resume.pdf` | `src/data/profile.js`; file path is `public/resume.pdf` |
| Instagram | `MISSING` | Not configured |
| X / Twitter | `MISSING` | Not configured |
| ArtStation | `MISSING` | Not configured |
| Pixiv | `MISSING` | Not configured |
| Behance | `MISSING` | Not configured |
| Discord | `MISSING` | Not configured |
| Bluesky | `MISSING` | Not configured |
| Personal site URL | `MISSING` | No canonical personal-site URL is recorded in the inspected source |
| Other artist platforms | `MISSING` | No artist-platform links recorded |

### Navigation labels and hero controls

Extracted from `src/data/profile.js`:

- `Work` — `/#work`
- `Open Source` — `/open-source`
- `Research` — `/#research`
- `Problem Solving` — `/problem-solving`
- `About` — `/#about`
- Primary CTA: `View my work` — `/#work`
- Secondary CTA: `GitHub` — `https://github.com/knockknock10`
- Current activity: `Building developer tooling`; `Contributing to open source`; third activity value is `MISSING` in this report because its source wording conflicts with the project-wide content restrictions.

## Projects and work records

No project record contains a year, client, medium field, or local image-path field. No associated project image paths are supplied by the project data. Those fields are recorded as `MISSING` below rather than inferred.

### Aevor

- **Exact title:** `Aevor`
- **Source:** `src/data/projects/aevor.js`
- **Category:** `Developer Tooling`
- **Status:** `Active development`
- **Summary:** `MISSING` in this report; the source wording conflicts with the project-wide content restrictions.
- **Description / overview:** `MISSING` in this report; the source wording conflicts with the project-wide content restrictions.
- **Year:** `MISSING`
- **Client:** `MISSING`
- **Medium:** `MISSING`
- **Tags:** `Go`, `Gin`, `PostgreSQL`, `React`, `FastAPI`, `Docker`
- **Repository:** `https://github.com/Aevor/platform`
- **Organization:** `https://github.com/Aevor`
- **Additional repository links:** `https://github.com/Aevor/Frontend`; `https://github.com/Aevor/ai`
- **Demo:** `MISSING` (`demo` is `null`)
- **Associated image paths:** `MISSING`

### CommitHub

- **Exact title:** `CommitHub`
- **Source:** `src/data/projects/commithub.js`
- **Category:** `Full-Stack Engineering`
- **Status:** `Active development`
- **Summary:** `A GitHub-like collaboration platform: repositories, branches, pull requests, reviews, and merge conflicts — built to understand how a code host works under the hood.`
- **Overview, verbatim:**
  - `CommitHub is a full-stack, GitHub-like collaboration platform on the MERN stack. It implements real version-control workflows — repositories, branches, commits, pull requests, code reviews, merge conflict resolution, branch protection — with JWT auth, role-based authorization, and realtime collaboration over WebSockets.`
  - `It is a solo project built to answer a specific question: how does a code-hosting product actually work when you have to implement its semantics yourself?`
- **Year:** `MISSING`
- **Client:** `MISSING`
- **Medium:** `MISSING`
- **Tags:** `React`, `Node.js`, `Express`, `MongoDB`, `Docker`, `Socket.io`
- **Repository:** `https://github.com/knockknock10/CommitHub`
- **Live demo:** `https://knockknock10.github.io/CommitHub`
- **Associated image paths:** `MISSING`

The résumé uses the same title for a different description: `CommitHub — Custom Version Control System`. Its résumé details are preserved in the CV section below; the résumé and project data should not be silently merged into one description.

### SemBind-Audio

- **Exact title:** `SemBind-Audio`
- **Source:** `src/data/projects/sembind-audio.js`
- **Category:** `MISSING` in this report; the source value conflicts with the project-wide content restrictions.
- **Status:** `Research complete · manuscript in draft`
- **Summary / full title / detailed descriptions:** `MISSING` in this report; these source values conflict with the project-wide content restrictions.
- **Year:** `MISSING`
- **Client:** `MISSING`
- **Medium:** `MISSING`
- **Tags:** `PyTorch`, `HuBERT`, `STFT`, `SHA-256`, `Python`
- **Repository:** `https://github.com/knockknock10/SemBind_Audio`
- **Demo:** `MISSING` (`demo` is `null`)
- **Associated image paths:** `MISSING`

### Additional work items listed only in the résumé

The following entries exist in `public/resume.pdf` but do not have matching records in `src/data/projects/`.

#### CommitHub — Custom Version Control System

- **Description, verbatim:**
  - `Engineering a Git-inspired VCS from scratch in Go: implements init, add, commit, branch, checkout, merge, log, status, and revert`
  - `Designed a content-addressable object store using hashing and tree structures to detect and persist file changes across commits`
  - `Modelled commit history as a Directed Acyclic Graph (DAG) with branch-pointer references for divergence tracking and merge resolution`
  - `Built modular CLI commands with structured error handling and correct edge-case state transitions throughout`
- **Year:** `MISSING`
- **Client:** `MISSING`
- **Medium / technologies as printed:** `Go · CLI · File System · Hashing`
- **Tags:** `Go`, `CLI`, `File System`, `Hashing`
- **Associated image paths:** `MISSING`

#### Wandera — Travel Experience Platform

- **Description, verbatim:**
  - `Built a full-stack travel platform with modular component architecture; REST APIs handle auth, content management, and location-based search`
  - `Optimised frontend via lazy loading, code-splitting, and dynamic routing; responsive UI implemented with Tailwind CSS`
- **Year:** `MISSING`
- **Client:** `MISSING`
- **Medium / technologies as printed:** `React.js, Node.js, Express.js, MongoDB, REST APIs`
- **Tags:** `React.js`, `Node.js`, `Express.js`, `MongoDB`, `REST APIs`, `Tailwind CSS`
- **Associated image paths:** `MISSING`

#### FailureScope (ongoing)

- **Description, verbatim:**
  - `Building a log ingestion and failure detection platform that processes application event streams to identify failure patterns in real time`
  - `Applies temporal pattern recognition to correlate event sequences with failure signatures and surface actionable reliability metrics`
- **Year:** `MISSING`
- **Client:** `MISSING`
- **Medium / technologies as printed:** `Node.js · JavaScript · DevOps`
- **Tags:** `Node.js`, `JavaScript`, `DevOps`
- **Associated image paths:** `MISSING`

#### Nanosensor Network Communication Simulator

- **Description, verbatim:**
  - `Simulated multi-hop communication architectures for nano-scale sensor networks, modeling node topology, routing, and packet propagation`
  - `Evaluated end-to-end delay, link efficiency, and transmission reliability across variable network densities and hop configurations`
  - `Identified communication bottlenecks under constrained energy budgets — directly applicable to body-area sensor networks (BANs) for wearable monitoring`
- **Year:** `MISSING`
- **Client:** `MISSING`
- **Medium / tool as printed:** `MATLAB`
- **Tags:** `MATLAB`, `nano-scale sensor networks`, `routing`, `packet propagation`
- **Associated image paths:** `MISSING`

## Skills, tools, software, and technical terms

### Profile skills (`src/data/profile.js`)

- **Languages:** `C`, `C++`, `Java`, `JavaScript`, `Go`, `Python`
- **Frontend:** `React`, `Vite`, `Tailwind`
- **Backend / Systems:** `Node.js`, `Express`, `Go`, `Docker`, `Kubernetes`
- **Data:** `MongoDB`, `PostgreSQL`, `MySQL`
- **Research-related tools and topics:** `Transformers`, `Hugging Face`, `Audio ML`

### Résumé skills (`public/resume.pdf`)

- **Languages:** `Go (Golang)`, `C`, `Java`, `JavaScript (ES6+)`, `SQL`, `Bash`
- **Frontend:** `React.js`, `HTML5`, `CSS3`, `Tailwind CSS`, `Vite`, `Webpack`
- **Backend:** `Node.js`, `Express.js`, `REST APIs`, `Microservices Architecture`
- **Databases:** `MongoDB`, `SQL`
- **DevOps & Cloud:** `Docker`, `Kubernetes`, `GitHub Actions`, `CI/CD`, `Linux`
- **Tools:** `Git`, `Postman`, `Vercel`, `Netlify`, `VS Code`, `Vim`

### Technologies named in project records

`Go`, `Gin`, `GORM`, `PostgreSQL`, `React`, `Vite`, `Python`, `FastAPI`, `Docker`, `Node.js`, `Express`, `MongoDB`, `Socket.io`, `JWT`, `WebSockets`, `CLI`, `File System`, `Hashing`, `PyTorch`, `HuBERT`, `STFT`, `ISTFT`, `SHA-256`, `LibriSpeech test-clean`, `Transformers`, `Hugging Face`, `Audio ML`, `MATLAB`.

## Résumé / CV content

**File:** `public/resume.pdf`  
**Format:** one-page PDF, US Letter page box (612 × 792 pt). Text is extractable.

The following is the résumé text, preserving the original wording and values; line wrapping has been normalized for readability.

### Header

`SANJEEV KUMAR`

`+91 9229523848 · sanjeevkumars.s@srmap.edu.in · github.com/knockknock10 · linkedin.com/in/-sanjeev-kr · Amaravati, AP, India`

### EDUCATION

- `Bachelor of Technology — Computer Science and Engineering — SRM University AP, Andhra Pradesh`
- `CGPA: 8.7 / 10 · Expected 2028`
- `Class XI – XII, CBSE Board — DAV School, Kathmandu, Nepal`
- `Percentage: 84.32%`
- `Class X — Paribodh Boarding High School, Kathmandu, Nepal`
- `CGPA: 3.20 / 4.00`

### TECHNICAL SKILLS

- `Languages — Go (Golang), C, Java, JavaScript (ES6+), SQL, Bash`
- `Frontend — React.js, HTML5, CSS3, Tailwind CSS, Vite, Webpack`
- `Backend — Node.js, Express.js, REST APIs, Microservices Architecture`
- `Databases — MongoDB, SQL`
- `DevOps & Cloud — Docker, Kubernetes, GitHub Actions, CI/CD, Linux`
- `Tools — Git, Postman, Vercel, Netlify, VS Code, Vim`

### PROJECTS

**CommitHub — Custom Version Control System**  
`Go · CLI · File System · Hashing`

- `Engineering a Git-inspired VCS from scratch in Go: implements init, add, commit, branch, checkout, merge, log, status, and revert`
- `Designed a content-addressable object store using hashing and tree structures to detect and persist file changes across commits`
- `Modelled commit history as a Directed Acyclic Graph (DAG) with branch-pointer references for divergence tracking and merge resolution`
- `Built modular CLI commands with structured error handling and correct edge-case state transitions throughout`

**Wandera — Travel Experience Platform**  
`React.js, Node.js, Express.js, MongoDB, REST APIs`

- `Built a full-stack travel platform with modular component architecture; REST APIs handle auth, content management, and location-based search`
- `Optimised frontend via lazy loading, code-splitting, and dynamic routing; responsive UI implemented with Tailwind CSS`

**FailureScope (ongoing)**  
`Node.js · JavaScript · DevOps`

- `Building a log ingestion and failure detection platform that processes application event streams to identify failure patterns in real time`
- `Applies temporal pattern recognition to correlate event sequences with failure signatures and surface actionable reliability metrics`

### RESEARCH EXPERIENCE

**Nanosensor Network Communication Simulator**  
`MATLAB`

- `Simulated multi-hop communication architectures for nano-scale sensor networks, modeling node topology, routing, and packet propagation`
- `Evaluated end-to-end delay, link efficiency, and transmission reliability across variable network densities and hop configurations`
- `Identified communication bottlenecks under constrained energy budgets — directly applicable to body-area sensor networks (BANs) for wearable monitoring`

## Existing brand assets and design tokens

- **Logo file:** `MISSING` — no separate logo image/file found.
- **Favicon:** `public/favicon.svg` — dark rounded square with `SK` lettering in amber and a dark border.
- **Favicon SVG viewBox:** `0 0 64 64` (64 × 64 coordinate units).
- **Theme color in `index.html`:** `#0a0a0b`.
- **CSS colors in `src/styles/index.css`:**
  - `--color-bg: #101114`
  - `--color-bg-deep: #0c0d0f`
  - `--color-panel: #141519`
  - `--color-panel-raised: #1a1b20`
  - `--color-panel-glass: #17181c`
  - `--color-line: #303036`
  - `--color-line-hover: #494950`
  - `--color-specular: #60616a`
  - `--color-fg: #f3f4f6`
  - `--color-muted: #a1a1aa`
  - `--color-dim: #71717a`
  - `--color-cobalt: #5365b8`
  - `--color-violet: #8175c9`
  - `--color-cyan: #7aa2c7`
  - `--color-accent: #8175c9`
  - `--color-accent-hover: #968bd8`
  - `--color-accent-cyan: #7aa2c7`
  - `--color-contrib-0: #1a1b20`
  - `--color-contrib-1: #173b2b`
  - `--color-contrib-2: #1f6542`
  - `--color-contrib-3: #2d8a57`
  - `--color-contrib-4: #45a968`
- **Font families:** `Inter Variable`, `Inter`, `JetBrains Mono Variable`, plus CSS system-font fallbacks. Font packages are `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono`.
- **Open Graph preview image:** `MISSING` — no `og:image` asset is configured.
- **Collaborator credits:** `MISSING` — no explicit collaborator-credit entries were found.

## Complete image asset list

Only one repository file has an image extension (`.svg`, `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.avif`).

| Path | Dimensions | Description | Assigned to a project? |
|---|---|---|---|
| `public/favicon.svg` | SVG viewBox 64 × 64 | Dark rounded-square favicon showing `SK` lettering in amber, with a thin dark outline | No |

Other public files are `public/resume.pdf` (document, not an image) and `public/robots.txt` (text). No image files were found under root-level `/assets`, `/static`, or `/content` directories; those directories are absent in this snapshot. No project data object supplies an image, thumbnail, cover, or hero image field. All project image paths are therefore `MISSING`.

## Artist-specific fields

| Field | Value |
|---|---|
| Artist name / pen name | `MISSING` |
| Artist pronouns | `MISSING` |
| Manga/manhwa/manhua bio | `MISSING` |
| Art portfolio works / chapters / illustrations | `MISSING` |
| Art client / publisher records | `MISSING` |
| Art medium and genre records | `MISSING` |
| Commission details | `MISSING` |
| Artist social profiles | `MISSING` except the developer profiles already listed above |
| Local artwork assets | `MISSING` |

## Collaborator credits

`MISSING` — the inspected source does not list explicit collaborator-credit names or roles. Repository organizations and project links are not treated as collaborator credits.
