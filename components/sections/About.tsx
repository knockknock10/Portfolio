import { Glass, Squircle } from "@/components/primitives"

type AboutProps = {
  bio: string[]
  tools: string[] | null
  influences: string[] | null
  portraitInitials: string | null
  headingLevel?: "h1" | "h2"
  asMain?: boolean
}

export function About({ bio, tools, influences, portraitInitials, headingLevel = "h2", asMain = false }: AboutProps) {
  const Container = asMain ? "main" : "section"
  const Heading = headingLevel
  const availableTools = tools?.filter(Boolean) ?? []
  const availableInfluences = influences?.filter(Boolean) ?? []
  return (
    <Container className="about-section" aria-labelledby="about-heading">
      <div className="about-layout">
        {portraitInitials ? (
          <Squircle className="about-portrait" aria-label={portraitInitials}>
            <span aria-hidden="true">{portraitInitials}</span>
          </Squircle>
        ) : null}
        <div className="about-copy">
          <Heading id="about-heading" className="section-heading">About</Heading>
          {bio.length > 0 ? <div className="about-bio-list">{bio.map((paragraph, index) => <p className="about-bio" key={paragraph + index}>{paragraph}</p>)}</div> : null}
          {availableTools.length > 0 ? (
            <div className="about-list-block">
              <h3 className="about-list-heading">Tools</h3>
              <ul className="about-tools-list">
                {availableTools.map((tool) => <Glass as="li" className="about-tool-chip" key={tool}>{tool}</Glass>)}
              </ul>
            </div>
          ) : null}
          {availableInfluences.length > 0 ? (
            <div className="about-list-block">
              <h3 className="about-list-heading">Influences</h3>
              <ul className="about-influences-list">{availableInfluences.map((influence) => <li key={influence}>{influence}</li>)}</ul>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  )
}
