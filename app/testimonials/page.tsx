import type { Metadata } from "next"
import TestimonialsPageClient from "./TestimonialsPageClient"

export const metadata: Metadata = {
  title: "Patient Testimonials — Real Recovery Stories | Gorakhpur Mission Rehab",
  description:
    "Real recovery stories from patients of Gorakhpur Mission Rehab — stroke recovery, gait correction & pediatric neuro-physiotherapy.",
  openGraph: {
    title: "Patient Success Stories | Gorakhpur Mission Rehab",
    description: "Real stories of recovery and hope from patients treated by Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur.",
  },
}

export default function TestimonialsPage() {
  return <TestimonialsPageClient />
}
