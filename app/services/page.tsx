import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Services — Neuro Rehabilitation | Stroke, Gait, Pediatric & More",
  description:
    "Neuro rehab services in Gorakhpur — Stroke & Paralysis Recovery, Gait Training, Pediatric Neuro-Physiotherapy by Dr. Devejya Srivastava (PT).",
  keywords: [
    "neuro rehabilitation center in India",
    "neuro physiotherapist in Gorakhpur",
    "paralysis treatment center in Purvanchal",
    "hemiplegia physiotherapy recovery",
    "cerebral palsy physiotherapy",
    "foot biomechanics & gait corrections",
    "pediatric neuro rehabilitation center",
    "pediatric neuro physiotherapy clinic in up",
    "movement disorders rehab",
    "spinal cord injury rehab center up",
    "advanced brain injury rehabilitation center in uttar pradesh",
    "robotic neuro rehab center in india",
    "sciatica and nerve compression physio",
    "brachial plexus injury rehabilitation",
    "quadriplegia rehab therapy",
    "paraplegia physiotherapy center",
    "ataxia balance therapy",
    "neuropathy physiotherapy treatment",
    "multiple sclerosis physiotherapy",
    "ALS physical therapy rehabilitation",
    "plantar fasciitis physiotherapy treatment",
  ],
  openGraph: {
    title: "Neuro Rehabilitation Services | Gorakhpur Mission Rehab",
    description: "From Stroke Recovery to Pediatric Care — comprehensive neuro-physiotherapy at Divyaman Hospital, Gorakhpur.",
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
