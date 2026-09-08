import type { Metadata } from "next"
import BlogCards from "./BlogCards"
import { getDb } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "Blog — Neuro Rehabilitation Tips & Insights",
  description:
    "Read expert articles on neuro rehabilitation, stroke recovery, physiotherapy tips, and patient care from Dr. Devejya Srivastava at Gorakhpur Mission Rehab.",
  openGraph: {
    title: "Blog — Neuro Rehabilitation Tips & Insights | Gorakhpur Mission Rehab",
    description:
      "Read expert articles on neuro rehabilitation, stroke recovery, physiotherapy tips, and patient care from Dr. Devejya Srivastava.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/blog`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gorakhpur Mission Rehab Blog — Neuro Rehabilitation Tips & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Neuro Rehabilitation Tips & Insights | Gorakhpur Mission Rehab",
    description:
      "Read expert articles on neuro rehabilitation, stroke recovery, physiotherapy tips, and patient care from Dr. Devejya Srivastava.",
    images: [`${siteUrl}/og-image.jpg`],
  },
}

export default async function BlogPage() {
  let initialPosts: any[] = []
  let initialCategories: string[] = []

  try {
    const db = await getDb()
    const posts = await db
      .collection("blog")
      .find({}, { projection: { content: 0 } })
      .sort({ createdAt: -1 })
      .toArray()

    initialPosts = posts.map(({ _id, ...rest }) => ({
      ...rest,
      _id: _id.toString(),
    }))

    const cats = await db.collection("categories").find({}).sort({ order: 1 }).toArray()
    initialCategories = cats.map((c: any) => c.name)
  } catch (e) {
    console.error("Failed to fetch initial blog posts on server:", e)
  }

  return <BlogCards initialPosts={initialPosts} initialCategories={initialCategories} />
}

