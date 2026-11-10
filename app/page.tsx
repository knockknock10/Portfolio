import { Header, type NavLink } from "@/components/site/Header"
import { Hero, type Fact } from "@/components/site/Hero"
import { Work } from "@/components/site/Work"
import { Research } from "@/components/site/Research"
// import { OpenSource } from "@/components/site/OpenSource"
import { OpenSourceGlass } from "@/components/site/OpenSourceGlass"
import { LiquidField } from "@/components/site/LiquidField"
import { Interactions } from "@/components/site/Interactions"
import { Premium } from "@/components/site/Premium"
import { Marquee } from "@/components/site/Marquee"
import { Kinetic } from "@/components/site/Kinetic"
import { SideRail } from "@/components/site/SideRail"
import { LetterField } from "@/components/site/LetterField"
import { PortraitDepth } from "@/components/site/PortraitDepth"
// import { CursorLens } from "@/components/site/CursorLens" // Preserved, intentionally inactive: no pointer-following cursor effect.
import { Certificates, type CertificateView } from "@/components/site/Certificates"
import { SkillsGlass } from "@/components/site/SkillsGlass"
import { getCertificationsData } from "@/lib/certifications"
import { getCredly } from "@/lib/credly.server"
import { Experience } from "@/components/site/Experience"
// import { Skills } from "@/components/site/Skills"
import { Practice } from "@/components/site/Practice"
import { About } from "@/components/site/About"
import { Contact, type ContactLink } from "@/components/site/Contact"
import { SiteFooter } from "@/components/site/Footer"
import { getContent } from "@/lib/content.server"
import { getSignalsData } from "@/lib/signals"
import { getResearchData } from "@/lib/research"
import { getInternshipsData } from "@/lib/internships"
import { getUpstream } from "@/lib/upstream.server"
import { publicUrl } from "@/lib/public-url"

const links: NavLink[] = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "open-source", label: "Open source" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

function socialUrl(socials: { platform: string; url: string | null }[] | null, match: RegExp) {
  return socials?.find((item) => match.test(item.platform) && item.url)?.url ?? null
}

export default async function HomePage() {
  const content = getContent()
  const signals = getSignalsData()
  const research = getResearchData()
  const internships = getInternshipsData()
  const upstream = await getUpstream()
  const credly = getCredly()
  const norm = (text: string) =>
    text.toLowerCase().replace(/\b(skill|training) badge\b/g, "").replace(/[^a-z0-9]+/g, " ").trim()
  const monthYear = (iso: string | null) => {
    if (!iso) return null
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
  }
  const used = new Set<string>()
  const fromRecords: CertificateView[] = getCertificationsData().map((item) => {
    const value = (field: string | "MISSING") => (field === "MISSING" ? null : field)
    const file = value(item.certificateImage)
    const key = norm(item.title)
    const badge = credly.badges.find((b) => {
      const n = norm(b.name)
      return n.includes(key) || key.includes(n)
    })
    if (badge) used.add(badge.name)
    return {
      title: item.title,
      issuer: value(item.issuer) ?? badge?.issuer ?? null,
      date: value(item.issueDate) ?? monthYear(badge?.issuedAt ?? null),
      sortDate: badge?.issuedAt ?? null,
      credentialId: value(item.credentialId),
      credentialUrl: value(item.credentialUrl) ?? badge?.url ?? null,
      skills: Array.isArray(item.skillsCovered) ? item.skillsCovered : [],
      verificationStatus: badge ? "verified" : item.verificationStatus,
      badge: badge?.image ?? null,
      file,
      isPdf: file ? /\.pdf$/i.test(file) : false,
    }
  })
  // Anything newly earned on Credly appears here without editing the site.
  const fromCredly: CertificateView[] = credly.badges
    .filter((b) => !used.has(b.name))
    .map((b) => ({
      title: b.name,
      issuer: b.issuer,
      date: monthYear(b.issuedAt),
      sortDate: b.issuedAt,
      credentialId: null,
      credentialUrl: b.url,
      skills: [],
      verificationStatus: "verified" as const,
      badge: b.image,
      file: null,
      isPdf: false,
    }))
  const certificates: CertificateView[] = [...fromRecords, ...fromCredly].sort(
    (a, b) => (b.sortDate ?? "").localeCompare(a.sortDate ?? ""),
  )

  // Do not show navigation for a section that has no certificate entries.
  const navLinks = links.filter((link) => link.id !== "certificates" || certificates.length > 0)

  const name = content.identity.professionalName ?? content.identity.fullName ?? "Sanjeev Kumar"
  const email = content.contact.email
  const resumeHref = publicUrl(content.resumePath ?? "/resume.pdf")
  const github = socialUrl(content.socials, /github/i)
  const linkedin = socialUrl(content.socials, /linkedin/i)
  const leetcode = socialUrl(content.socials, /leetcode/i)

  // LeetCode figures stay in the practice section with their source snapshot date.
  // The hero only carries contribution metrics built from the upstream PR index.
  const factList: (Fact | null)[] = [
    upstream.available ? { value: String(upstream.mergedCount), label: "pull requests merged upstream", live: "merged" as const } : null,
    upstream.available ? { value: String(upstream.projectCount), label: "upstream projects contributed to", live: "projects" as const } : null,
  ]
  const facts = factList.filter((fact): fact is Fact => fact !== null)

  const paper = research.find((item) => /sembind/i.test(item.title)) ?? research[0] ?? null
  const otherResearch = research.filter((item) => item !== paper)

  const contactLinks: ContactLink[] = [
    github ? { label: "GitHub", detail: "knockknock10", href: github } : null,
    linkedin ? { label: "LinkedIn", detail: "Sanjeev Kumar", href: linkedin } : null,
    leetcode ? { label: "LeetCode", detail: "knockknock10", href: leetcode } : null,
    { label: "Résumé", detail: "PDF", href: resumeHref },
  ].filter((item): item is ContactLink => item !== null)

  return (
    <>
      <LiquidField />
      <Interactions />
      <Kinetic />
      <SideRail sections={links} />
      <LetterField />
      <PortraitDepth />
      {/* <CursorLens /> Preserved but disabled: no pointer-following lens. */}
      <Header name={name} links={navLinks} resumeHref={resumeHref} email={email} />
      <Premium
        sections={navLinks.map(({ id, label }) => ({ id, label }))}
        email={email}
        resumeHref={resumeHref}
        github={github}
        linkedin={linkedin}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero email={email} resumeHref={resumeHref} github={github} linkedin={linkedin} leetcode={leetcode} facts={facts} />
        <Marquee
          projects={upstream.available ? upstream.projects.map((project) => project.name) : []}
          stack={["Go", "Java", "C++", "Python", "React", "Node.js", "MongoDB", "PostgreSQL", "Docker", "Linux"]}
        />
        <Work repoCount={typeof signals.github.totalRepos === "number" ? signals.github.totalRepos : null} />
        <Research paper={paper} other={otherResearch} />
        {/*
          Previous OpenSource section retained for reference, not rendered:
          <OpenSource data={upstream} profileUrl={github ?? "https://github.com/knockknock10"} />
        */}
        <OpenSourceGlass data={upstream} profileUrl={github ?? "https://github.com/knockknock10"} />
        <Experience internships={internships} />
        {/*
          Previous Skills wrapper retained for reference, not rendered:
          <Skills>
            <Practice stats={signals.leetcode} snapshotDate={signals.snapshotDate} />
          </Skills>
        */}
        <SkillsGlass>
          <Practice stats={signals.leetcode} snapshotDate={signals.snapshotDate} />
        </SkillsGlass>
        <Certificates items={certificates} profileUrl={credly.profile} syncedAt={credly.syncedAt} />
        <About location={content.contact.location} />
        <Contact email={email} location={content.contact.location} links={contactLinks} />
      </main>
      <SiteFooter name={name} />
    </>
  )
}

// ---------------------------------------------------------------------------
// Previous home page (kept for reference, not in use)
// ---------------------------------------------------------------------------
// import ResearchShowcase from "@/components/sections/ResearchShowcase";
// import AchievementsShowcase from "@/components/portfolio/AchievementsShowcase";
// import AboutShowcase from "@/components/portfolio/AboutShowcase";
// import CodingShowcase from "@/components/portfolio/CodingShowcase";
// import ContactShowcase from "@/components/portfolio/ContactShowcase";
// import ExperienceShowcase from "@/components/portfolio/ExperienceShowcase";
// import SkillsShowcase from "@/components/portfolio/SkillsShowcase";
// import OpenSourceShowcase from "@/components/portfolio/OpenSourceShowcase";
// import { HomeHero } from "@/components/portfolio/HomeHero";
// import FeaturedWork from "@/components/portfolio/FeaturedWork";
// import { getContent } from "@/lib/content.server";
// import { getSignalsData } from "@/lib/signals";
// import { getResearchData } from "@/lib/research";
// import { getInternshipsData } from "@/lib/internships";
// import { getCertificationsData } from "@/lib/certifications";
//
// export default async function HomePage() {
//   const content = getContent();
//   const signalsData = getSignalsData();
//   const researchItems = getResearchData();
//   const internships = getInternshipsData();
//   const certifications = getCertificationsData();
//   const fullName =
//     content.identity.professionalName ||
//     content.identity.fullName ||
//     "Sanjeev Kumar";
//
//   return (
//     <main className="home-page portfolio-home-page">
//       <HomeHero fullName={fullName} socials={content.socials} email={content.contact.email} resumePath={content.resumePath || "/resume.pdf"} data={signalsData} />
//
//       <FeaturedWork />
//
//       <section id="research" className="portfolio-anchor" tabIndex={-1}>
//         <ResearchShowcase items={researchItems} />
//       </section>
//
//       <OpenSourceShowcase />
//
//       <ExperienceShowcase internships={internships} />
//
//       <SkillsShowcase />
//
//       <CodingShowcase data={signalsData} />
//
//       <AchievementsShowcase items={certifications} />
//
//       <AboutShowcase content={content} />
//
//       <ContactShowcase content={content} />
//     </main>
//   );
// }
