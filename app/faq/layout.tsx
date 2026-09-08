import type { Metadata } from "next"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | Gorakhpur Mission Rehab",
  description:
    "Answers to common questions about neuro rehabilitation, stroke recovery, gait & balance training, pediatric therapy, clinic location, and appointment booking at Gorakhpur Mission Rehab.",
  openGraph: {
    title: "FAQ — Frequently Asked Questions | Gorakhpur Mission Rehab",
    description:
      "Answers to common questions about neuro rehabilitation, stroke recovery, gait & balance training, and appointment booking in Gorakhpur.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/faq`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gorakhpur Mission Rehab — Frequently Asked Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Frequently Asked Questions | Gorakhpur Mission Rehab",
    description:
      "Answers to common questions about neuro rehabilitation, stroke recovery, gait & balance training, and appointment booking in Gorakhpur.",
    images: [`${siteUrl}/og-image.jpg`],
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
