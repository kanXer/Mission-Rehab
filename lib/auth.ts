import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { getAdminAuth, isFirebaseAdminConfigured } from "./firebase-admin"
import { getDb } from "./mongodb"

export const TOKEN_NAME = "__mission_auth"
const JWT_SECRET = process.env.JWT_SECRET || "mission-rehab-secret-key-2026"


export interface AuthPayload {
  id: string
  email: string
  name?: string
  photo?: string
  isAdmin?: boolean
}

export function getSuperAdminEmails(): string[] {
  const envAdmins = [
    ...(process.env.ADMIN_SECRET_EMAIL || "").split(","),
    ...(process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").split(","),
  ]
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  return Array.from(new Set(envAdmins))
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const cleanEmail = email.trim().toLowerCase()
  const list = getSuperAdminEmails()
  return list.includes(cleanEmail)
}

export function createAdminSessionToken(payload: {
  id?: string
  email: string
  name?: string
  isAdmin?: boolean
}): string {
  const isSuper = isAdminEmail(payload.email)
  return jwt.sign(
    {
      id: payload.id || `admin_${Date.now()}`,
      email: payload.email.toLowerCase().trim(),
      name: payload.name || payload.email.split("@")[0],
      isAdmin: payload.isAdmin ?? true,
      isSuperAdmin: isSuper,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  )
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

  // 1. First check if it's our own signed JWT (e.g. from Admin Direct Login or OTP Login)
  try {
    const decoded = jwt.verify(idToken, JWT_SECRET) as any
    if (decoded && (decoded.email || decoded.id)) {
      const email = (decoded.email || "").toLowerCase()
      const isSuper = isAdminEmail(email)
      return {
        id: decoded.id || decoded.sub || "admin",
        email,
        name: decoded.name || email.split("@")[0],
        photo: decoded.photo || "",
        isAdmin: decoded.isAdmin === true || isSuper,
      }
    }
  } catch {
    // Not a custom JWT, continue to Firebase verification
  }

  // 2. Google Identitytoolkit REST verification (fast, standalone, zero ESM bundle issues)
  const apiKey =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyB_aR4Of_BEaGJ4xnheVNa_wVdPlb80p7s"
  if (apiKey) {
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
      if (res.ok) {
        const data = await res.json()
        const u = data.users?.[0]
        if (u) {
          const email = (u.email || "").toLowerCase()
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
            email,
            name: u.displayName || email.split("@")[0] || "",
            photo: u.photoUrl || "",
            isAdmin: isAdmin || isAdminEmail(email),
          }
        }
      }
    } catch {
      // Fall through to Firebase Admin SDK or JWT decode
    }
  }

  // 3. Firebase Admin SDK verification (if configured)
  if (isFirebaseAdminConfigured()) {
    try {
      const adminAuth = await getAdminAuth()
      const decoded = await adminAuth.verifyIdToken(idToken)
      const email = (decoded.email || "").toLowerCase()
      return {
        id: decoded.uid,
        email,
        name: decoded.name || email.split("@")[0] || "",
        photo: decoded.picture || "",
        isAdmin: decoded.admin === true || isAdminEmail(email),
      }
    } catch {
      // Verification failed
    }
  }

  // If token signature cannot be cryptographically verified by our JWT secret,
  // Google's Identitytoolkit API, or Firebase Admin SDK, reject it immediately.
  return null
}

export async function getTokenFromCookies(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get(TOKEN_NAME)?.value || cookieStore.get("token")?.value
  } catch {
    return undefined
  }
}

export async function getAuth(): Promise<AuthPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  return verifyToken(token)
}

export async function isUserAdmin(payload: AuthPayload | null): Promise<boolean> {
  if (!payload?.email) return false
  const email = payload.email.trim().toLowerCase()

  if (payload.isAdmin === true) return true
  if (isAdminEmail(email)) return true

  // Check MongoDB persistent admins collection & users collection
  try {
    const db = await getDb()
    const adminDoc = await db.collection("admins").findOne({ email })
    if (adminDoc) return true

    const userDoc = await db.collection("users").findOne({ email, role: "admin" })
    if (userDoc) return true
  } catch (err) {
    console.error("[AUTH] isUserAdmin MongoDB check failed:", err)
  }

  return false
}

export async function getUserRole(payload: AuthPayload): Promise<"admin" | "user"> {
  return (await isUserAdmin(payload)) ? "admin" : "user"
}
