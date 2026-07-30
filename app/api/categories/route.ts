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
    const cats = await db.collection("categories").find({}).sort({ order: 1, name: 1 }).toArray()
    const items = cats.map(({ _id, ...r }) => ({ ...r, _id: _id.toString() }))
    return NextResponse.json({ categories: items })
  } catch {
    return NextResponse.json({ categories: [] })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const name = body?.name?.trim()
    if (!name) return NextResponse.json({ error: "Category name is required" }, { status: 400 })

    const db = await getDb()
    const count = await db.collection("categories").countDocuments()
    const result = await db.collection("categories").insertOne({ name, order: count })
    return NextResponse.json({ category: { _id: result.insertedId.toString(), name, order: count } })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const { _id, name } = body
    if (!_id || !name?.trim()) return NextResponse.json({ error: "id and name are required" }, { status: 400 })

    const db = await getDb()
    await db.collection("categories").updateOne({ _id: new ObjectId(_id) }, { $set: { name: name.trim() } })
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
    await db.collection("categories").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
