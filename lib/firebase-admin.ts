import "server-only"
import fs from "node:fs"
import crypto from "node:crypto"
import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app"
import { getAuth, type Auth } from "firebase-admin/auth"

let authInstance: Auth | null = null

function normalizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeValue)
  }
  if (value && typeof value === "object" && !(value instanceof Date)) {
    return Object.keys(value)
      .sort()
      .reduce((acc: Record<string, unknown>, key) => {
        acc[key] = normalizeValue((value as Record<string, unknown>)[key])
        return acc
      }, {})
  }
  return value
}

function loadServiceAccount(): ServiceAccount | null {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
  if (b64) {
    try {
      return JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as ServiceAccount
    } catch {
      return null
    }
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT
  if (raw) {
    try {
      return JSON.parse(raw) as ServiceAccount
    } catch {
      return null
    }
  }

  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (path) {
    try {
      return JSON.parse(fs.readFileSync(path, "utf8")) as ServiceAccount
    } catch {
      return null
    }
  }

  return null
}

export function getServiceAccountHash(): string | null {
  const account = loadServiceAccount()
  if (!account) return null
  const normalized = JSON.stringify(normalizeValue(account))
  return crypto.createHash("sha256").update(normalized).digest("hex")
}

export function isFirebaseAdminConfigured(): boolean {
  return !!loadServiceAccount()
}

export function getAdminAuth(): Auth {
  if (authInstance) return authInstance
  const account = loadServiceAccount()
  if (!account) {
    throw new Error(
      "Firebase Admin SDK not configured. Add FIREBASE_SERVICE_ACCOUNT_BASE64 (base64 of service account JSON) or GOOGLE_APPLICATION_CREDENTIALS to .env.local"
    )
  }
  if (getApps().length === 0) {
    initializeApp({ credential: cert(account) })
  }
  authInstance = getAuth()
  return authInstance
}
