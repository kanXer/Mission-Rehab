import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { verifyToken, getTokenFromCookies, isAdminEmail } from "@/lib/auth"

export async function GET() {
  const tokenStr = await getTokenFromCookies()
  const payload = tokenStr ? verifyToken(tokenStr) : null
  if (!payload || !isAdminEmail(payload.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const db = await getDb()
    const bookings = await db
      .collection("appointments")
      .find({})
      .sort({ timestamp: -1 })
      .toArray()

    const sanitized = bookings.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }))
    return NextResponse.json({ bookings: sanitized })
  } catch (e) {
    console.error("Bookings fetch error:", e)
    return NextResponse.json({ bookings: [] })
  }
}

export async function DELETE(req: NextRequest) {
  const tokenStr = await getTokenFromCookies()
  const payload = tokenStr ? verifyToken(tokenStr) : null
  if (!payload || !isAdminEmail(payload.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })

    const db = await getDb()
    await db.collection("appointments").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
