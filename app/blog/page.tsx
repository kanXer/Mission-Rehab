import type { Metadata } from "next"
import BlogCards from "./BlogCards"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "Blog — Neuro Rehabilitation Tips & Insights",
  description:
    "Read expert articles on neuro rehabilitation, stroke recovery, physiotherapy tips, and patient care from Dr. Devejya Srivastava at Gorakhpur Mission Rehab.",
  openGraph: {
    title: "Blog — Neuro Rehabilitation Tips & Insights | Gorakhpur Mission Rehab",
    description:
      "Read expert articles on neuro rehabilitation, stroke recovery, physiotherapy tips, and patient care from Dr. Devejya Srivastava.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/blog`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gorakhpur Mission Rehab Blog — Neuro Rehabilitation Tips & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Neuro Rehabilitation Tips & Insights | Gorakhpur Mission Rehab",
    description:
      "Read expert articles on neuro rehabilitation, stroke recovery, physiotherapy tips, and patient care from Dr. Devejya Srivastava.",
    images: [`${siteUrl}/og-image.jpg`],
  },
}

export default function BlogPage() {
  return <BlogCards />
}
