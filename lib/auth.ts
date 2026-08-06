import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { getDb } from "./mongodb"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production"
const TOKEN_NAME = "token"
const ADMIN_EMAIL = process.env.ADMIN_SECRET_EMAIL || ""

export interface JwtPayload {
  id: string
  email: string
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

export async function getTokenFromCookies(): Promise<string | undefined> {
  return (await cookies()).get(TOKEN_NAME)?.value
}

export async function getAuth(): Promise<JwtPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  return verifyToken(token)
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAIL.length > 0 && email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}

export async function getUserRole(userId: string): Promise<"admin" | "user"> {
  try {
    const db = await getDb()
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })
    if (!user) return "user"
    return isAdminEmail(user.email) ? "admin" : "user"
  } catch {
    return "user"
  }
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  return (await getUserRole(userId)) === "admin"
}
