import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import { verifyToken, isUserAdmin, isAdminEmail } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || ""
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

  const cookieToken = (await cookies()).get("__mission_auth")?.value ?? null

  const token = bearerToken ?? cookieToken
  console.log("[API /me] called, token source:", bearerToken ? "bearer" : cookieToken ? "cookie" : "none", "length:", token?.length ?? 0)
  if (!token) return NextResponse.json({ user: null })

  const payload = await verifyToken(token)
  console.log("[API /me] payload:", payload ? `email=${payload.email}` : "null")
  if (!payload) return NextResponse.json({ user: null })

  const isAdmin = await isUserAdmin(payload)
  const isSuperAdmin = isAdminEmail(payload.email)
  console.log("[API /me] isAdmin:", isAdmin, "isSuperAdmin:", isSuperAdmin)

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
}
