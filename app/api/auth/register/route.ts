import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { hashPassword, signToken, isAdminEmail } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const db = await getDb()
    const existing = await db.collection("users").findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const hashed = await hashPassword(password)
    const result = await db.collection("users").insertOne({
      name: name || email.split("@")[0],
      email: email.toLowerCase(),
      password: hashed,
      createdAt: new Date().toISOString(),
    })

    const payload = { id: result.insertedId.toString(), email: email.toLowerCase(), isAdmin: isAdminEmail(email) }
    const token = signToken(payload)

    const res = NextResponse.json({ user: { id: payload.id, email: payload.email, name: name || email.split("@")[0], isAdmin: payload.isAdmin } })
    res.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 7 * 86400 })
    return res
  } catch (e) {
    console.error("Register error:", e)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
