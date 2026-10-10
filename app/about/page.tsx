import { About } from "@/components/sections/About"
import { getContent } from "@/lib/content.server"

export default function AboutPage() {
  const content = getContent()
  const bio = [content.identity.shortBio, content.identity.longBio].filter((paragraph): paragraph is string => Boolean(paragraph))
  return <About asMain headingLevel="h1" bio={bio} tools={content.tools} influences={content.influences} />
}
