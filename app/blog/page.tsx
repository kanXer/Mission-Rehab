import type { Metadata } from "next"
import BlogCards from "./BlogCards"

export const metadata: Metadata = {
  title: "Blog — Neuro Rehabilitation Tips & Insights",
  description:
    "Read expert articles on neuro rehabilitation, stroke recovery, physiotherapy tips, and patient care from Dr. Devejya Srivastava at Gorakhpur Mission Rehab.",
}

export default function BlogPage() {
  return <BlogCards />
}
