import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "Services — Neuro Rehabilitation | Stroke, Gait, Pediatric & More",
  description:
    "Specialized neuro rehabilitation services in Gorakhpur: Stroke & Paralysis Recovery, Spinal Cord Injury Rehab, Gait & Balance Training, Pediatric Neuro-Physiotherapy, Plantar Fasciitis & Foot Biomechanics by Dr. Devejya Srivastava (PT).",
  openGraph: {
    title: "Neuro Rehabilitation Services | Gorakhpur Mission Rehab",
    description: "From Stroke Recovery to Pediatric Care — comprehensive neuro-physiotherapy at Divyaman Hospital, Gorakhpur.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/services`,
    images: [
      {
        url: `${siteUrl}/stroke.jpeg`,
        width: 1200,
        height: 630,
        alt: "Stroke & Paralysis Recovery — Neuro Rehabilitation Services in Gorakhpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuro Rehabilitation Services | Gorakhpur Mission Rehab",
    description: "From Stroke Recovery to Pediatric Care — comprehensive neuro-physiotherapy at Divyaman Hospital, Gorakhpur.",
    images: [`${siteUrl}/stroke.jpeg`],
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
