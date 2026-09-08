import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, isUserAdmin, isAdminEmail } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || ""
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null

    let cookieToken: string | null = null
    try {
      const cookieStore = await cookies()
      cookieToken = cookieStore.get("__mission_auth")?.value ?? cookieStore.get("token")?.value ?? null
    } catch {
      // Cookies not accessible or error, continue with bearerToken
    }

    const token = bearerToken ?? cookieToken
    if (!token) {
      return NextResponse.json({ user: null })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ user: null })
    }

    const isAdmin = await isUserAdmin(payload)
    const isSuperAdmin = isAdminEmail(payload.email)

    return NextResponse.json({
      user: {
        id: payload.id,
        email: payload.email,
        name: payload.name || payload.email.split("@")[0],
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

