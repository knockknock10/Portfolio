import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { getContent } from "@/lib/content.server";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sanjeev Kumar about software engineering opportunities, open-source collaboration and applied AI.",
};

export default function ContactPage() {
  const content = getContent();
  return (
    <Contact
      email={content.contact.email}
      socials={content.socials}
      availabilityNote={content.identity.availabilityStatement}
      headingLevel="h1"
      asMain
    />
  );
}
