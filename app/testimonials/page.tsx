import type { Metadata } from "next"
import TestimonialsPageClient from "./TestimonialsPageClient"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "Patient Testimonials — Real Recovery Stories | Gorakhpur Mission Rehab",
  description:
    "Read real success stories from patients who regained their independence through neuro-rehabilitation at Gorakhpur Mission Rehab. Stroke recovery, gait correction, pediatric therapy & more.",
  openGraph: {
    title: "Patient Success Stories | Gorakhpur Mission Rehab",
    description: "Real stories of recovery and hope from patients treated by Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/testimonials`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gorakhpur Mission Rehab — Patient Testimonials & Real Recovery Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patient Success Stories | Gorakhpur Mission Rehab",
    description: "Real stories of recovery and hope from patients treated by Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur.",
    images: [`${siteUrl}/og-image.jpg`],
  },
}

export default function TestimonialsPage() {
  return <TestimonialsPageClient />
}
