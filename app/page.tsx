import { Header, type NavLink } from "@/components/site/Header"
import { Hero, type Fact } from "@/components/site/Hero"
import { Work } from "@/components/site/Work"
import { Research } from "@/components/site/Research"
// import { OpenSource } from "@/components/site/OpenSource"
import { OpenSourceGlass } from "@/components/site/OpenSourceGlass"
import { LiquidField } from "@/components/site/LiquidField"
import { Interactions } from "@/components/site/Interactions"
import { Premium } from "@/components/site/Premium"
// import { CursorLens } from "@/components/site/CursorLens" // Preserved, intentionally inactive: no pointer-following cursor effect.
import { Certificates, type CertificateView } from "@/components/site/Certificates"
import { SkillsGlass } from "@/components/site/SkillsGlass"
import { getCertificationsData } from "@/lib/certifications"
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
  const certificates: CertificateView[] = getCertificationsData().map((item) => {
    const value = (field: string | "MISSING") => (field === "MISSING" ? null : field)
    const file = value(item.certificateImage)
    return {
      title: item.title,
      issuer: value(item.issuer),
      date: value(item.issueDate),
      credentialId: value(item.credentialId),
      credentialUrl: value(item.credentialUrl),
      skills: Array.isArray(item.skillsCovered) ? item.skillsCovered : [],
      verificationStatus: item.verificationStatus,
      file,
      isPdf: file ? /\.pdf$/i.test(file) : false,
    }
  })

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
  const facts: Fact[] = [
    upstream.available ? { value: String(upstream.mergedCount), label: "pull requests merged upstream" } : null,
    upstream.available ? { value: String(upstream.projectCount), label: "upstream projects contributed to" } : null,
  ].filter((fact): fact is Fact => fact !== null)

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
      {/* <CursorLens /> Preserved but disabled: no pointer-following lens. */}
      <Premium sections={navLinks} email={email} resumeHref={resumeHref} github={github} linkedin={linkedin} />
      <Header name={name} links={navLinks} resumeHref={resumeHref} email={email} />
      <main id="main-content" tabIndex={-1}>
        <Hero email={email} resumeHref={resumeHref} github={github} linkedin={linkedin} leetcode={leetcode} facts={facts} />
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
        <Certificates items={certificates} />
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
