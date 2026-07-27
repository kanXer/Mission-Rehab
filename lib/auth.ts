import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production"
const TOKEN_NAME = "token"
const ADMIN_EMAIL = process.env.ADMIN_SECRET_EMAIL || ""

export interface JwtPayload {
  id: string
  email: string
  isAdmin: boolean
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

export function getTokenFromCookies(): string | undefined {
  return cookies().get(TOKEN_NAME)?.value
}

export function getAuth(): JwtPayload | null {
  const token = getTokenFromCookies()
  if (!token) return null
  return verifyToken(token)
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAIL.length > 0 && email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}
