import type { Metadata } from "next"
import TestimonialsPageClient from "./TestimonialsPageClient"

export const metadata: Metadata = {
  title: "Patient Testimonials — Real Recovery Stories | Gorakhpur Mission Rehab",
  description:
    "Read real success stories from patients who regained their independence through neuro-rehabilitation at Gorakhpur Mission Rehab. Stroke recovery, gait correction, pediatric therapy & more.",
  openGraph: {
    title: "Patient Success Stories | Gorakhpur Mission Rehab",
    description: "Real stories of recovery and hope from patients treated by Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur.",
  },
}

export default function TestimonialsPage() {
  return <TestimonialsPageClient />
}
