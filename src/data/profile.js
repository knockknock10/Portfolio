/**
 * Single source of truth for identity, links, navigation and section config.
 * Edit this file to update copy sitewide. No component hard-codes this content.
 */

export const profile = {
  name: 'Sanjeev Kumar',
  wordmark: 'SANJEEV KUMAR',
  roleLine1: 'Software Engineer',
  roleLine2: 'Open Source · Applied AI',
  status: 'Third-year B.Tech Computer Science student at SRM University AP',

  links: {
    github: 'https://github.com/knockknock10',
    // Set a URL here to enable the LinkedIn link in the navbar/footer.
    linkedin: null,
    email: 'sanjeevkumar_s@srmap.edu.in',
    resume: '/resume.pdf',
  },
}

/** Site-level metadata — mirrors index.html; per-page SEO overrides it. */
export const siteMeta = {
  title: 'Sanjeev Kumar — Software Engineer',
  description:
    'Sanjeev Kumar — software engineer working on backend systems, open source, and applied AI. Third-year Computer Science student at SRM University AP.',
}

export const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'Open Source', href: '/open-source' },
  { label: 'Research', href: '/#research' },
  { label: 'About', href: '/#about' },
]

export const hero = {
  status: 'Open to software engineering internships',
  statement:
    'I build useful software, contribute upstream, and turn research ideas into working systems.',
  primaryCta: { label: 'View my work', href: '/#work' },
  secondaryCta: { label: 'GitHub', href: profile.links.github },
  currently: [
    'Building developer tooling',
    'Contributing to open source',
    'Working on applied AI research',
  ],
  focus: 'Backend · Systems · AI',
}

/**
 * Section registry — drives numbering, titles and intent copy.
 * Phases 2+ replace the placeholder bodies; this config stays stable.
 */
export const sections = [
  {
    id: 'work',
    index: '01',
    title: 'Selected Work',
    intent:
      'Systems I designed and built end to end — case studies covering the problem, architecture, and engineering decisions.',
    pending: null,
  },
  {
    id: 'proof',
    index: '02',
    title: 'Proof of Work',
    intent: 'Direct links to the evidence behind the work — repositories, code, and results.',
    pending: null,
  },
  {
    id: 'open-source',
    index: '03',
    title: 'Open Source',
    intent: 'Contributions to codebases that exist outside my laptop — with links to the exact PRs and issues.',
    pending: null,
  },
  {
    id: 'research',
    index: '04',
    title: 'Research',
    intent:
      'SemBind-Audio — a semantic-aware zero-trust audio watermarking framework: transformer-based representation with cryptographic binding.',
    pending: null,
  },
  {
    id: 'problem-solving',
    index: '05',
    title: 'Problem Solving',
    intent: 'Problem-solving practice and platform activity, presented as data rather than claims.',
    pending: 'phase 2 — verified problem-solving activity renders here',
  },
  {
    id: 'about',
    index: '06',
    title: 'About',
    intent: null,
  },
  {
    id: 'contact',
    index: '07',
    title: 'Contact',
    intent: null,
  },
]

export const contact = {
  body: 'The fastest way to reach me is email — I read everything. For code, the repositories below are the honest version of what I can do.',
  primaryCta: { label: 'Email me', href: 'mailto:sanjeevkumar_s@srmap.edu.in' },
}

export const about = {
  bio: [
    "I'm a third-year Computer Science student at SRM University AP focused on software engineering, backend systems, open source, and applied AI.",
    'Most of my learning happens by building: shipping projects, contributing to existing codebases, debugging infrastructure, and turning research ideas into working implementations.',
  ],
  groups: [
    { label: 'Languages', items: ['C', 'C++', 'Java', 'JavaScript', 'Go', 'Python'] },
    { label: 'Frontend', items: ['React', 'Vite', 'Tailwind'] },
    { label: 'Backend / Systems', items: ['Node.js', 'Express', 'Go', 'Docker', 'Kubernetes'] },
    { label: 'Data', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
    { label: 'AI / Research', items: ['Transformers', 'Hugging Face', 'Audio ML'] },
  ],
}

export const footer = {
  availability: 'Available for software engineering internships and open-source collaboration.',
  builtWith: 'React · Vite · Tailwind',
}
