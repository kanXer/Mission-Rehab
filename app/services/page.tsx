import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Services — Neuro Rehabilitation | Stroke, Gait, Pediatric & More",
  description:
    "Specialized neuro rehabilitation services in Gorakhpur: Stroke & Paralysis Recovery, Spinal Cord Injury Rehab, Gait & Balance Training, Pediatric Neuro-Physiotherapy, Plantar Fasciitis & Foot Biomechanics by Dr. Devejya Srivastava (PT).",
  openGraph: {
    title: "Neuro Rehabilitation Services | Gorakhpur Mission Rehab",
    description: "From Stroke Recovery to Pediatric Care — comprehensive neuro-physiotherapy at Divyaman Hospital, Gorakhpur.",
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
