"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { onIdTokenChanged } from "firebase/auth"
import {
  auth,
  signInWithGoogle,
  signOutUser,
  getRedirectResultFirebase,
  firebaseConfigured,
} from "@/lib/firebase"

interface User {
  id: string
  email: string
  name: string
  photo?: string
  isAdmin: boolean
  isSuperAdmin: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<string | null>
  logout: () => Promise<void>
  getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType>(null!)

function setTokenCookie(token: string) {
  console.log("[AUTH] setTokenCookie called, length:", token.length, "first50:", token.substring(0, 50))
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `__mission_auth=${token}; Path=/; Max-Age=3600; SameSite=Lax${secure}`
  document.cookie = `token=; Path=/; Max-Age=0`
  console.log("[AUTH] Cookie after set:", document.cookie)
}

function clearTokenCookie() {
  document.cookie = "__mission_auth=; path=/; max-age=0"
  console.log("[AUTH] Cookie CLEARED")
}

async function refresh(setUser: (u: User | null) => void, idToken?: string) {
  try {
    let token = idToken
    if (!token && auth?.currentUser) {
      try {
        token = await auth.currentUser.getIdToken(true)
      } catch (e) {
        console.log("[AUTH] refresh: currentUser.getIdToken FAILED:", e)
      }
    }
    const headers: Record<string, string> = {}
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    console.log("[AUTH] refresh() calling /api/auth/me, hasToken:", !!token, "tokenLen:", token?.length ?? 0, "currentUser:", auth?.currentUser?.email ?? "null")
    const res = await fetch("/api/auth/me", { credentials: "same-origin", headers })
    const contentType = res.headers.get("content-type") || ""

    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json()
      console.log("[AUTH] /me response:", data.user ? `user=${data.user.email} admin=${data.user.isAdmin}` : "NULL")
      if (data.user) {
        setUser(data.user)
        return
      }
    } else {
      console.warn("[AUTH] /me returned non-JSON or status", res.status)
    }

    // Client-side fallback if Firebase client is already authenticated
    if (auth?.currentUser) {
      const fbUser = auth.currentUser
      const email = fbUser.email?.toLowerCase() || ""
      const adminList = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "nexusdigital.gkp@gmail.com,sahilsks001@gmail.com,user.kanxer@gmail.com")
        .toLowerCase()
        .split(",")
        .map((e) => e.trim())
      const isSuper = adminList.includes(email)
      console.log("[AUTH] Fallback to Firebase client user:", email, "isAdmin:", isSuper)
      setUser({
        id: fbUser.uid,
        email: fbUser.email || "",
        name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
        photo: fbUser.photoURL || undefined,
        isAdmin: isSuper,
        isSuperAdmin: isSuper,
      })
      return
    }

    setUser(null)
    clearTokenCookie()
  } catch (e) {
    console.log("[AUTH] /me FAILED:", e)
    if (auth?.currentUser) {
      const fbUser = auth.currentUser
      const email = fbUser.email?.toLowerCase() || ""
      const adminList = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "nexusdigital.gkp@gmail.com,sahilsks001@gmail.com,user.kanxer@gmail.com")
        .toLowerCase()
        .split(",")
        .map((e) => e.trim())
      const isSuper = adminList.includes(email)
      setUser({
        id: fbUser.uid,
        email: fbUser.email || "",
        name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
        photo: fbUser.photoURL || undefined,
        isAdmin: isSuper,
        isSuperAdmin: isSuper,
      })
      return
    }
    setUser(null)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  console.log("[AUTH] AuthProvider render, user:", user?.email || "null", "loading:", loading)

  useEffect(() => {
    let isMounted = true
    let unsubToken: (() => void) | null = null

    if (!auth) {
      setLoading(false)
      return
    }
    const currentAuth = auth

    // Step 1: consume pending redirect result
    getRedirectResultFirebase()
      .then(async (result) => {
        if (!isMounted) return
        if (result) {
          try {
            const token = await result.user.getIdToken(true)
            setTokenCookie(token)
          } catch (e: unknown) {
            console.log("[AUTH] Redirect result token FAILED:", String(e))
          }
        }
      })
      .catch((e: unknown) => {
        console.log("[AUTH] getRedirectResult ERROR:", String(e))
      })
      .finally(() => {
        if (!isMounted) return
        // Step 2: subscribe to token changes
        unsubToken = onIdTokenChanged(currentAuth, async (fbUser) => {
          if (!isMounted) return
          let idToken: string | undefined
          if (fbUser) {
            try {
              const token = await fbUser.getIdToken(true)
              setTokenCookie(token)
              idToken = token
            } catch (e: unknown) {
              console.log("[AUTH] getIdToken FAILED:", String(e))
            }
          }
          await refresh(setUser, idToken)
          if (isMounted) setLoading(false)
        })
      })

    return () => {
      isMounted = false
      unsubToken?.()
    }
  }, [])

  async function googleSignIn(): Promise<string | null> {
    console.log("[AUTH] googleSignIn CLICKED")
    if (!auth) {
      console.log("[AUTH] auth is NULL, returning error")
      return "Firebase is not configured."
    }
    try {
      console.log("[AUTH] signInWithGoogle() calling...")
      const result = await signInWithGoogle()
      if (result && "user" in result) {
        try {
          const token = await result.user.getIdToken(true)
          setTokenCookie(token)
          await refresh(setUser, token)
        } catch (e) {
          console.log("[AUTH] token fetch error:", e)
        }
      }
      return null
    } catch (e: unknown) {
      console.log("[AUTH] signInWithGoogle ERROR:", String(e))
      const code = (e as { code?: string })?.code || ""
      if (code === "auth/popup-closed-by-user") return "Sign-in window band kar di gayi."
      if (code === "auth/network-request-failed") return "Internet/Network error."
      return "Google sign-in fail ho gaya. Kripya punah prayas karein."
    }
  }

  async function logout() {
    console.log("[AUTH] logout called")
    clearTokenCookie()
    await signOutUser()
    setUser(null)
  }

  async function getIdToken(): Promise<string | null> {
    if (auth?.currentUser) {
      try {
        return await auth.currentUser.getIdToken()
      } catch {
        return null
      }
    }
    const match = document.cookie.match(/__mission_auth=([^;]+)/)
    return match ? match[1] : null
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle: googleSignIn, logout, getIdToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
