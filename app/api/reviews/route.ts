import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { verifyToken, isUserAdmin } from "@/lib/auth"

function getToken(req: NextRequest): string | undefined {
  const cookie = req.headers.get("cookie") || ""
  for (const part of cookie.split("; ")) {
    const [name, ...rest] = part.split("=")
    const val = rest.join("=")
    if (name === "token" && val) return decodeURIComponent(val)
  }
  return undefined
}

async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const tokenStr = getToken(req)
  if (!tokenStr) return false
  const payload = verifyToken(tokenStr)
  return payload ? await isUserAdmin(payload.id) : false
}

export async function GET() {
  try {
    const db = await getDb()
    const docs = await db.collection("reviews").find({}).sort({ order: 1 }).toArray()
    const reviews = docs.map(({ _id, ...r }) => ({ ...r, _id: _id.toString() }))
    return NextResponse.json({ reviews })
  } catch {
    return NextResponse.json({ reviews: [] })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const name = body?.name?.trim()
    const content = body?.content?.trim()
    if (!name || !content) return NextResponse.json({ error: "Name and review text are required" }, { status: 400 })

    const rating = Number(body?.rating) || 5
    const db = await getDb()
    const order = await db.collection("reviews").countDocuments()
    const result = await db.collection("reviews").insertOne({ name, content, rating, order })
    return NextResponse.json({ review: { _id: result.insertedId.toString(), name, content, rating, order } })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const { _id, name, content } = body
    if (!_id || !name?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "id, name and review text are required" }, { status: 400 })
    }

    const rating = Number(body?.rating) || 5
    const db = await getDb()
    await db.collection("reviews").updateOne({ _id: new ObjectId(_id) }, { $set: { name: name.trim(), content: content.trim(), rating } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })

    const db = await getDb()
    await db.collection("reviews").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
