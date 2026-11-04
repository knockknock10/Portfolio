import type { Metadata } from "next";
import { DesignSystemPreview } from "@/components/DesignSystemPreview";

export const metadata: Metadata = {
  title: "Design System",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function DesignSystemPage() {
  return <DesignSystemPreview />;
}