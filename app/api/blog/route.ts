import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { verifyToken, getTokenFromCookies, isAdminEmail } from "@/lib/auth"

function isAdminRequest(): boolean {
  const tokenStr = getTokenFromCookies()
  if (!tokenStr) return false
  const payload = verifyToken(tokenStr)
  return payload ? isAdminEmail(payload.email) : false
}

export async function GET() {
  try {
    const db = await getDb()
    const posts = await db
      .collection("blog")
      .find({}, { projection: { content: 0 } })
      .sort({ createdAt: -1 })
      .toArray()

    const sanitized = posts.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }))
    return NextResponse.json({ posts: sanitized })
  } catch (e) {
    console.error("Blog fetch error:", e)
    return NextResponse.json({ posts: [] })
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { title, slug, excerpt, content, image, youtubeUrl, category, keywords, author, createdAt } = await req.json()
    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 })
    }

    const db = await getDb()
    const existing = await db.collection("blog").findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
    }

    await db.collection("blog").insertOne({
      title,
      slug,
      excerpt: excerpt || "",
      content,
      image: image || "",
      youtubeUrl: youtubeUrl || "",
      category: category || "",
      keywords: keywords || "",
      author: author || "",
      createdAt: createdAt || new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Blog create error:", e)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
