import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"
import { getDb } from "@/lib/mongodb"

const BASE_URL = "https://gorakhpurmission.in"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 1. Await params for compatibility with modern Next.js
  const { slug } = await params

  try {
    // 2. Fetch directly from DB instead of fetching internal HTTP API
    const db = await getDb()
    const post = await db.collection("blog").findOne({ slug })

    if (!post) {
      return {
        title: "Post Not Found | Gorakhpur Mission Rehab",
      }
    }

    const title = post.title
    const description = post.excerpt || post.summary || ""
    const imageUrl = post.image ? post.image : `${BASE_URL}/og-default.jpg`

    return {
      metadataBase: new URL(BASE_URL),
      title: `${title} | Gorakhpur Mission Rehab`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${BASE_URL}/blog/${slug}`,
        siteName: "Gorakhpur Mission Rehab",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [imageUrl],
      },
    }
  } catch (error) {
    console.error("Error generating blog metadata:", error)
    return {
      title: "Blog Post | Gorakhpur Mission Rehab",
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  return <BlogPostClient slug={slug} />
}
