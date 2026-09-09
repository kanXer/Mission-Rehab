import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, isUserAdmin, isAdminEmail } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || ""
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null

    let cookieToken: string | null =
      request.cookies.get("__mission_auth")?.value ??
      request.cookies.get("token")?.value ??
      null

    if (!cookieToken) {
      try {
        const cookieStore = await cookies()
        cookieToken = cookieStore.get("__mission_auth")?.value ?? cookieStore.get("token")?.value ?? null
      } catch {
        // Continue
      }
    }

    if (!cookieToken) {
      const rawCookie = request.headers.get("cookie") || ""
      const match = rawCookie.match(/__mission_auth=([^;]+)/)
      if (match) cookieToken = decodeURIComponent(match[1])
    }

    const token = bearerToken ?? cookieToken
    if (!token) {
      return NextResponse.json({ user: null })
    }

    const payload = await verifyToken(token)
    if (!payload || !payload.email) {
      return NextResponse.json({ user: null })
    }

    const cleanEmail = payload.email.toLowerCase().trim()
    const isAdmin = await isUserAdmin(payload)
    const isSuperAdmin = isAdminEmail(cleanEmail)

    let displayName = payload.name
    if (!displayName || displayName === cleanEmail.split("@")[0]) {
      try {
        const db = await getDb()
        const userDoc = await db.collection("users").findOne({ email: cleanEmail })
        const adminDoc = await db.collection("admins").findOne({ email: cleanEmail })
        if (userDoc?.name) displayName = userDoc.name
        else if (adminDoc?.name) displayName = adminDoc.name
      } catch {
        // ignore
      }
    }

    return NextResponse.json({
      user: {
        id: payload.id,
        email: cleanEmail,
        name: displayName || cleanEmail.split("@")[0],
        photo: payload.photo || null,
        isAdmin,
        isSuperAdmin,
      },
    })
  } catch (err: any) {
    console.error("[API /me] Error:", err)
    return NextResponse.json({ user: null, error: err?.message || "Auth error" })
  }
}


