import { Contact } from "@/components/sections/Contact"
import { getContent } from "@/lib/content.server"

export default function ContactPage() {
  const content = getContent()
  return <Contact asMain headingLevel="h1" email={content.contact.email} socials={content.socials} availabilityNote={content.identity.availabilityStatement} />
}
