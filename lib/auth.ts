import { cookies } from "next/headers"
import { getAdminAuth, isFirebaseAdminConfigured } from "./firebase-admin"

const TOKEN_NAME = "__mission_auth"

export interface AuthPayload {
  id: string
  email: string
  name?: string
  photo?: string
  isAdmin?: boolean
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const list = [
    ...(process.env.ADMIN_SECRET_EMAIL || "").split(","),
    process.env.OWNER_EMAIL || "",
  ]
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  return list.includes(email.trim().toLowerCase())
}

export function getRequestToken(req: { headers: Headers }): string | null {
  const authHeader = req.headers.get("authorization") || ""
  if (authHeader.startsWith("Bearer ")) {
    const b = authHeader.slice(7).trim()
    if (b) return b
  }
  const cookieHeader = req.headers.get("cookie") || ""
  for (const part of cookieHeader.split("; ")) {
    const [name, ...rest] = part.split("=")
    const val = rest.join("=")
    if ((name === TOKEN_NAME || name === "token") && val) {
      return decodeURIComponent(val)
    }
  }
  return null
}

export async function getAuthFromRequest(req: { headers: Headers }): Promise<AuthPayload | null> {
  const token = getRequestToken(req)
  if (token) {
    const payload = await verifyToken(token)
    if (payload) return payload
  }
  const cookieVal = await getTokenFromCookies()
  if (cookieVal) {
    return verifyToken(cookieVal)
  }
  return null
}

export async function verifyToken(idToken: string): Promise<AuthPayload | null> {
  if (!idToken) return null

  if (isFirebaseAdminConfigured()) {
    try {
      const decoded = await getAdminAuth().verifyIdToken(idToken)
      return {
        id: decoded.uid,
        email: decoded.email || "",
        name: decoded.name || "",
        photo: decoded.picture || "",
        isAdmin: decoded.admin === true,
      }
    } catch {
      // fall through to REST fallback
    }
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey) return null
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        cache: "no-store",
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const u = data.users?.[0]
    if (!u) return null
    let isAdmin = false
    if (u.customAttributes) {
      try {
        isAdmin = JSON.parse(u.customAttributes)?.admin === true
      } catch {
        // ignore malformed claims
      }
    }
    return {
      id: u.localId || u.uid,
      email: u.email || "",
      name: u.displayName || "",
      photo: u.photoUrl || "",
      isAdmin,
    }
  } catch {
    return null
  }
}

export async function getTokenFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(TOKEN_NAME)?.value || cookieStore.get("token")?.value
}

export async function getAuth(): Promise<AuthPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  return verifyToken(token)
}

export async function isUserAdmin(payload: AuthPayload | null): Promise<boolean> {
  if (!payload?.email) return false
  return payload.isAdmin === true || isAdminEmail(payload.email)
}

export async function getUserRole(payload: AuthPayload): Promise<"admin" | "user"> {
  return (await isUserAdmin(payload)) ? "admin" : "user"
}
