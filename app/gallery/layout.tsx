import type { Metadata } from "next"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "Gallery — Recovery Photos & Videos | Gorakhpur Mission Rehab",
  description:
    "Browse photos and videos of real recovery journeys at Gorakhpur Mission Rehab — neuro rehabilitation, gait training, and pediatric physiotherapy in Gorakhpur.",
  openGraph: {
    title: "Gallery — Recovery Photos & Videos | Gorakhpur Mission Rehab",
    description:
      "Browse photos and videos of real recovery journeys at Gorakhpur Mission Rehab — neuro rehabilitation, gait training, and pediatric physiotherapy.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/gallery`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gorakhpur Mission Rehab — Recovery Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery — Recovery Photos & Videos | Gorakhpur Mission Rehab",
    description:
      "Browse photos and videos of real recovery journeys at Gorakhpur Mission Rehab — neuro rehabilitation, gait training, and pediatric physiotherapy.",
    images: [`${siteUrl}/og-image.jpg`],
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
