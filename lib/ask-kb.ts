/**
 * Everything the "Ask" box can say. Each entry is a fact already shown on this site;
 * nothing here is invented. Matching is plain keyword scoring, so the box only
 * ever answers from this list and says so when it has no answer.
 */
export type AskEntry = { keys: string[]; answer: string; section?: string; label?: string }

export const ASK_KB: AskEntry[] = [
  { keys: ["who", "about", "yourself", "introduce", "sanjeev", "tell"], answer: "Sanjeev Kumar is a third-year B.Tech student in Computer Science and Engineering at SRM University AP. He builds backend services and developer tools, contributes fixes to open-source projects, and does research on speech watermarking and audio intelligence.", section: "about", label: "About" },
  { keys: ["education", "college", "university", "degree", "study", "studying", "btech", "srm", "cgpa", "gpa", "grade", "graduate", "graduation", "year"], answer: "B.Tech in Computer Science and Engineering at SRM University AP, currently in third year. CGPA 8.61 / 10, expected graduation 2028.", section: "about", label: "About" },
  { keys: ["where", "location", "based", "live", "city", "country", "amaravati", "india"], answer: "Based in Amaravati, Andhra Pradesh, India (IST, UTC+5:30).", section: "contact", label: "Contact" },
  { keys: ["hire", "hiring", "available", "internship", "intern", "job", "role", "looking", "opportunity", "opportunities", "open"], answer: "Yes. He is open to software engineering internships, ideally backend or platform work with a strong team where he can learn from experienced engineers and contribute useful work.", section: "contact", label: "Contact" },
  { keys: ["contact", "email", "reach", "mail", "message", "talk", "linkedin", "github", "leetcode"], answer: "Email is the best way to reach him. His GitHub, LinkedIn, LeetCode and résumé are listed in the contact section.", section: "contact", label: "Contact" },
  { keys: ["resume", "résumé", "cv"], answer: "The résumé is a PDF you can open or download from the header or the contact section.", section: "contact", label: "Contact" },
  { keys: ["project", "projects", "built", "build", "made", "work", "portfolio"], answer: "Selected projects: Aevor, CommitHub, Wandera, NovaFest and ConvergenceGuard. Open the workbench to explore each one, its stack, and where to try or inspect the code.", section: "work", label: "Work" },
  { keys: ["aevor"], answer: "Aevor is a developer platform that turns a GitHub issue into a proposed, validated pull request, and every proposed change is reviewed by a person before publication. Stack: Go, Gin, GORM, PostgreSQL, React, FastAPI and Docker. It is still in development.", section: "work", label: "Work" },
  { keys: ["research", "paper", "sembind", "watermark", "watermarking", "speech", "audio", "publication", "published"], answer: "First-author manuscript, submitted and not yet published: SemBind, inspectable self-supervised and spectral placement for reference-based speech watermarking. It compares five placement rules across six target SNRs on 2,620 LibriSpeech test-clean utterances. He is also working on causal-temporal audio knowledge graphs.", section: "research", label: "Research" },
  { keys: ["open", "source", "contribution", "contributions", "pull", "pr", "prs", "merged", "upstream", "contribute"], answer: "He sends fixes, tests, plugins and documentation to projects beyond his own. Each entry on the site links to the original pull request. The live merged and open counts are in the open-source section, or type stats in the terminal.", section: "open-source", label: "Open source" },
  { keys: ["experience", "intern", "worked", "company", "ccc", "digital", "irhs", "outreach", "professional"], answer: "Software Intern at CCC Digital Pvt. Ltd., and Protocol & Digital Outreach Planning at IRHS, SRM University AP.", section: "experience", label: "Experience" },
  { keys: ["skill", "skills", "stack", "language", "languages", "tech", "technology", "technologies", "tools", "know", "use", "programming"], answer: "Languages: Go, Java, C++, C, Python, JavaScript, SQL, Bash (Rust is marked as learning). Also React, Node.js, MongoDB, PostgreSQL, Docker and Linux. Browse by category in the skills section.", section: "skills", label: "Skills" },
  { keys: ["certificate", "certificates", "certification", "certifications", "course", "courses", "credential", "credentials", "badge", "credly", "redhat", "aws", "google"], answer: "Credentials include Red Hat System Administration I (RH124), AWS Knowledge: Cloud Essentials, and several Google Cloud courses. The certificates section lets you filter by area and open each one.", section: "certificates", label: "Certificates" },
  { keys: ["backend", "platform", "interest", "interests", "focus", "passion", "like", "enjoy"], answer: "Backend and platform engineering: service boundaries, APIs, databases, testing, reliability, and code another engineer can maintain.", section: "about", label: "About" },
  { keys: ["how", "approach", "style", "philosophy", "principles", "habits"], answer: "Read the code before changing it, test the edges rather than stopping at a working demo, and report results with their limits.", section: "about", label: "About" },
]

const STOP = new Set(["a", "an", "the", "is", "are", "of", "to", "in", "on", "do", "does", "did", "he", "his", "him", "me", "my", "you", "your", "can", "what", "which", "about", "for", "and", "or", "with", "it", "this", "that", "i"])

const tokens = (s: string) => s.toLowerCase().replace(/[^a-zé0-9\s+#]/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t))

export function askKb(question: string): AskEntry | null {
  const q = tokens(question)
  if (!q.length) return null
  let best: AskEntry | null = null
  let top = 0
  for (const entry of ASK_KB) {
    let score = 0
    for (const t of q) {
      if (entry.keys.includes(t)) score += 2
      else if (entry.keys.some((k) => k.length > 3 && (k.startsWith(t) || t.startsWith(k)))) score += 1
    }
    if (score > top) { top = score; best = entry }
  }
  return top >= 2 ? best : null
}

export const ASK_SUGGESTIONS = ["Is he open to internships?", "What is Aevor?", "Tell me about the research", "What languages does he use?", "Where is he based?"]
