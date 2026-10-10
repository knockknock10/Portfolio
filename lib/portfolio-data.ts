import type { PortfolioContent } from "@/lib/content"

/**
 * Curated, typed portfolio content.
 *
 * Keep public-facing facts here instead of deriving site data from an audit
 * document. Add measurements only after verifying them from the source.
 */
export const portfolioContent: PortfolioContent = {
  identity: {
    fullName: "Sanjeev Kumar",
    professionalName: "Sanjeev Kumar",
    pronouns: null,
    roleTitle: "Software Engineering · Open Source · Applied AI",
    tagline:
      "I build developer tools, contribute to open source, and turn research ideas into working systems.",
    shortBio:
      "Third-year B.Tech Computer Science and Engineering student at SRM University AP.",
    longBio:
      "Most of my learning happens by building: shipping projects, contributing to existing codebases, debugging infrastructure, and turning research ideas into working implementations.",
  },
  contact: {
    email: "sanjeevkumar_s@srmap.edu.in",
    phone: null,
    location: "Amaravati, Andhra Pradesh, India",
  },
  socials: [
    { platform: "GitHub profile", url: "https://github.com/knockknock10" },
    { platform: "LeetCode profile", url: "https://leetcode.com/u/knockknock10/" },
    { platform: "LinkedIn", url: null },
  ],
  projects: [
    {
      title: "Aevor",
      category: "Developer tooling",
      status: "In development",
      description:
        "A review-first developer platform that turns a GitHub issue into a proposed, validated pull request while keeping a human in control of publication.",
      year: null,
      client: null,
      medium: "Go · React · PostgreSQL · FastAPI",
      tags: ["Go", "Gin", "PostgreSQL", "React", "FastAPI", "Docker"],
      imagePaths: null,
      role: "Platform architecture and engineering",
      tools: ["Go", "Gin", "GORM", "PostgreSQL", "React", "FastAPI", "Docker"],
      overview: [
        "Aevor is a multi-repository developer-tooling platform built around one goal: turn a GitHub issue into a reviewed, validated pull request without giving an AI model permission to publish changes on its own.",
        "The pipeline assembles bounded repository context, proposes a change, generates a reviewable diff, validates it with the project's own toolchain, and leaves publication behind a human review gate.",
      ],
      processSteps: [
        "Understand the issue and retrieve bounded repository context",
        "Generate a concrete diff for human review",
        "Apply and validate the approved change",
        "Publish only after explicit review",
      ],
      resultImagePaths: null,
      repositoryUrl: "https://github.com/Aevor/platform",
      demoUrl: null,
    },
    {
      title: "CommitHub",
      category: "Full-stack engineering",
      status: "In development",
      description:
        "A GitHub-like collaboration platform exploring the real semantics behind repositories, branches, commits, pull requests, code reviews, merge conflicts, and access control.",
      year: null,
      client: null,
      medium: "React · Node.js · Express · MongoDB",
      tags: ["React", "Node.js", "Express", "MongoDB", "Docker", "Socket.io"],
      imagePaths: null,
      role: "Full-stack engineering",
      tools: ["React", "Vite", "Node.js", "Express", "MongoDB", "Socket.io", "Docker"],
      overview: [
        "CommitHub is a full-stack collaboration platform built to understand how a code-hosting product works beneath the interface: branch-aware repository operations, pull-request reviews, merge conflict resolution, branch protection, and real-time collaboration.",
        "The implementation combines a React frontend with an Express API, MongoDB persistence, JWT authentication, role-aware authorization, and WebSocket events.",
      ],
      processSteps: [
        "Model repositories, branches, commits, and pull requests",
        "Enforce permissions at business-operation boundaries",
        "Keep repository and review activity synchronized in real time",
      ],
      resultImagePaths: null,
      repositoryUrl: "https://github.com/knockknock10/CommitHub",
      demoUrl: "https://knockknock10.github.io/CommitHub",
    },
    {
      title: "SemBind-Audio",
      category: "Applied AI research",
      status: "Research and evaluation",
      description:
        "A semantic-aware audio watermarking research framework combining transformer-based audio representations with cryptographic metadata binding.",
      year: null,
      client: null,
      medium: "Python · PyTorch · HuBERT · STFT · SHA-256",
      tags: ["Python", "PyTorch", "HuBERT", "STFT", "Audio ML", "SHA-256"],
      imagePaths: null,
      role: "Research implementation and evaluation",
      tools: ["Python", "PyTorch", "HuBERT", "Transformers", "LibriSpeech", "SHA-256"],
      overview: [
        "SemBind-Audio explores semantic-guided watermark placement using audio representations and time-frequency suitability, then binds ownership metadata with a SHA-256 digest.",
        "The evaluation distinguishes clean-channel recovery from attack robustness. Clean-channel recovery was successful in the tested setup, while the tested attacks exposed a major robustness limitation that remains an explicit research problem rather than a claimed solved result.",
      ],
      processSteps: [
        "Extract semantic representations and spectrogram features",
        "Rank candidate time-frequency regions for embedding",
        "Bind metadata with a SHA-256 payload",
        "Evaluate recovery, integrity, and robustness under controlled tests",
      ],
      resultImagePaths: null,
      repositoryUrl: "https://github.com/knockknock10/SemBind_Audio",
      demoUrl: null,
    },
    {
      title: "FailureScope",
      category: "Reliability engineering",
      status: "Exploration",
      description:
        "A log-ingestion and failure-detection concept focused on correlating event sequences with failure signatures and surfacing actionable reliability signals.",
      year: null,
      client: null,
      medium: "Node.js · JavaScript · Observability",
      tags: ["Node.js", "JavaScript", "Reliability", "Observability"],
      imagePaths: null,
      role: "Product and engineering",
      tools: ["Node.js", "JavaScript", "Event processing"],
      overview: [
        "FailureScope is an exploration of how application event streams can be organized into useful failure signals.",
        "The focus is on temporal patterns and correlating event sequences with known failure signatures, rather than treating each log line as an isolated alert.",
      ],
      processSteps: null,
      resultImagePaths: null,
      repositoryUrl: "https://github.com/knockknock10/failurescope",
      demoUrl: null,
    },
  ],
  skills: [
    "C",
    "C++",
    "Java",
    "JavaScript",
    "Go",
    "Python",
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub Actions",
    "REST APIs",
    "Transformers",
    "PyTorch",
    "Audio ML",
  ],
  tools: ["Git", "Docker", "Kubernetes", "AWS", "GitHub Actions", "Vite", "PostgreSQL"],
  resumePath: null,
  resumeText: null,
  brandAssets: {
    logo: null,
    favicon: "public/favicon.svg",
    colors: ["#0A0A0B", "#F5F5F7", "#E6A23C", "#252529"],
    fonts: ["Inter Tight"],
  },
  images: [
    {
      path: "public/favicon.svg",
      dimensions: "64 x 64",
      description: "Dark portfolio monogram favicon",
    },
  ],
  collaboratorCredits: null,
}
