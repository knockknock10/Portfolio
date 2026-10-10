import { getContent } from "@/lib/content.server"

export default function ContactPage() {
  const content = getContent()
  const heading = content.identity.professionalName

  if (!content.contact.email || !heading) return null

  return (
    <main className="route-shell">
      <h1 className="route-shell-title">{heading}</h1>
    </main>
  )
}
