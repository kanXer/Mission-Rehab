import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"
import { getDb } from "@/lib/mongodb"

interface Props {
  params: Promise<{ slug: string }>
}

const siteUrl = "https://gorakhpurmission.in"

interface BlogPostDoc {
  title: string
  slug: string
  excerpt?: string
  content: string
  image?: string
  author?: string
  category?: string
  youtubeUrl?: string
  createdAt: string
  likes?: string[]
  comments?: any[]
}

async function getPostBySlug(slug: string) {
  try {
    const decodedSlug = decodeURIComponent(slug)
    const db = await getDb()
    const escaped = decodedSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const post = await db.collection<BlogPostDoc>("blog").findOne({
      $or: [
        { slug: decodedSlug },
        { slug },
        { slug: { $regex: new RegExp(`^${escaped}$`, "i") } }
      ]
    })
    if (!post) return null
    const { _id, ...rest } = post
    return { ...rest, _id: _id.toString() }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return { title: "Post Not Found" }

    const title = post.title
    const description = post.excerpt || "Read more at Gorakhpur Mission Rehab"
    const image = post.image || `${siteUrl}/og-image.jpg`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `${siteUrl}/blog/${slug}`,
        siteName: "Gorakhpur Mission Rehab",
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    }
  } catch {
    return { title: "Blog Post" }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const initialPost = await getPostBySlug(slug)
  return <BlogPostClient slug={decodedSlug} initialPost={initialPost as any} />
}
