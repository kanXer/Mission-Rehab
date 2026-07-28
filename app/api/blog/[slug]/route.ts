import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { verifyToken, getTokenFromCookies, isAdminEmail } from "@/lib/auth"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function getCloudinaryPublicIds(urls: string[]): string[] {
  return urls.reduce<string[]>((ids, url) => {
    try {
      const m = url.match(/\/upload\/(?:v\d+\/)?(.+)/)
      if (m) ids.push(m[1].replace(/\.[^.]+$/, ""))
    } catch {}
    return ids
  }, [])
}

function extractImageUrls(content: string, coverImage: string): string[] {
  const urls: string[] = []
  if (coverImage) urls.push(coverImage)
  const regex = /<img[^>]+src=["']([^"']+)["']/g
  let match
  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1])
  }
  return urls.filter(u => u.includes("cloudinary"))
}

async function isAdminRequest(): Promise<boolean> {
  const tokenStr = await getTokenFromCookies()
  if (!tokenStr) return false
  const payload = verifyToken(tokenStr)
  return payload ? isAdminEmail(payload.email) : false
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)
    const db = await getDb()
    const post = await db.collection("blog").findOne({
      $or: [{ slug: decodedSlug }, { slug }]
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const { _id, ...rest } = post
    return NextResponse.json({ post: { ...rest, _id: _id.toString() } })
  } catch (e) {
    console.error("Blog single fetch error:", e)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { slug: urlSlug } = await params
    const db = await getDb()
    const existing = await db.collection("blog").findOne({ slug: urlSlug })
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const { title, slug, excerpt, content, image, youtubeUrl, category, keywords, author } = await req.json()
    const updateData: Record<string, string> = {}
    if (title !== undefined) updateData.title = title
    if (slug !== undefined) updateData.slug = slug
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (content !== undefined) updateData.content = content
    if (image !== undefined) updateData.image = image

    if (image && image !== existing.image && existing.image?.includes("cloudinary")) {
      const ids = getCloudinaryPublicIds([existing.image])
      await Promise.allSettled(ids.map(id => cloudinary.uploader.destroy(id)))
    }
    if (youtubeUrl !== undefined) updateData.youtubeUrl = youtubeUrl
    if (category !== undefined) updateData.category = category
    if (keywords !== undefined) updateData.keywords = keywords
    if (author !== undefined) updateData.author = author

    const result = await db.collection("blog").findOneAndUpdate(
      { slug: urlSlug },
      { $set: updateData },
      { returnDocument: "after" }
    )

    if (!result) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const { _id, ...rest } = result
    return NextResponse.json({ post: { ...rest, _id: _id.toString() } })
  } catch (e) {
    console.error("Blog update error:", e)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { slug } = await params
    const db = await getDb()
    const post = await db.collection("blog").findOne({ slug })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const coverImage = post.image || ""
    const content = post.content || ""
    const urls = extractImageUrls(content, coverImage)
    const publicIds = getCloudinaryPublicIds(urls)

    const results = await Promise.allSettled(
      publicIds.map(id => cloudinary.uploader.destroy(id))
    )

    const failed = results.filter(r => r.status === "rejected").length
    if (failed > 0) console.warn(`${failed} Cloudinary image(s) failed to delete`)

    await db.collection("blog").deleteOne({ slug })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Blog delete error:", e)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
