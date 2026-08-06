import { NextResponse } from "next/server"
import { getAuth, isAdminEmail } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  const payload = await getAuth()
  if (!payload) return NextResponse.json({ user: null })

  const db = await getDb()
  const user = await db.collection("users").findOne({ _id: new ObjectId(payload.id) })
  if (!user) return NextResponse.json({ user: null })

  const role = isAdminEmail(user.email) ? "admin" : "user"

  return NextResponse.json({ user: { id: user._id.toString(), email: user.email, name: user.name, isAdmin: role === "admin" } })
}
