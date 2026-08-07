import type { Metadata } from "next"
import BlogCards from "./BlogCards"

export const metadata: Metadata = {
  title: "Blog — Neuro Rehabilitation Tips & Insights",
  description:
    "Expert articles on neuro rehabilitation, stroke recovery, physio exercises & neuroplasticity therapy by Dr. Devejya Srivastava (Gorakhpur Mission Rehab).",
  keywords: [
    "stroke recovery physiotherapy",
    "post stroke physio exercises",
    "neuroplasticity therapy",
    "gait and balance training",
    "exercise for stroke recovery at home",
    "parkinson's disease physiotherapy",
    "plantar fasciitis treatment",
  ],
}

export default function BlogPage() {
  return <BlogCards />
}
