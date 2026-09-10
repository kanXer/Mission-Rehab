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
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `__mission_auth=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${secure}`
  document.cookie = `token=; Path=/; Max-Age=0`
}

function clearTokenCookie() {
  document.cookie = "__mission_auth=; path=/; max-age=0"
  document.cookie = "token=; path=/; max-age=0"
}

async function refresh(setUser: (u: User | null) => void, idToken?: string) {
  try {
    let token = idToken
    if (!token && auth?.currentUser) {
      try {
        token = await auth.currentUser.getIdToken(false)
        if (token) setTokenCookie(token)
      } catch (e) {
        console.warn("[AUTH] refresh: currentUser.getIdToken warning:", e)
      }
    }
    if (!token && typeof document !== "undefined") {
      const match = document.cookie.match(/__mission_auth=([^;]+)/)
      if (match) token = decodeURIComponent(match[1])
    }
    const headers: Record<string, string> = {}
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    const res = await fetch("/api/auth/me", { credentials: "same-origin", headers })
    const contentType = res.headers.get("content-type") || ""

    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json()
      if (data.user) {
        setUser(data.user)
        return
      }
    }

    // Client-side fallback if Firebase client is already authenticated
    if (auth?.currentUser) {
      const fbUser = auth.currentUser
      const email = fbUser.email?.toLowerCase() || ""
      const adminList = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
        .toLowerCase()
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)

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
    clearTokenCookie()
  } catch (e) {
    console.error("[AUTH] /me error:", e)
    if (auth?.currentUser) {
      const fbUser = auth.currentUser
      const email = fbUser.email?.toLowerCase() || ""
      const adminList = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
        .toLowerCase()
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)

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

  useEffect(() => {
    let isMounted = true
    let unsubToken: (() => void) | null = null

    const hasCookie = typeof document !== "undefined" && document.cookie.includes("__mission_auth")

    if (!auth) {
      if (hasCookie) {
        refresh(setUser).finally(() => {
          if (isMounted) setLoading(false)
        })
      } else {
        setLoading(false)
      }
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
            console.warn("[AUTH] Redirect result token error:", String(e))
          }
        }
      })
      .catch((e: unknown) => {
        console.warn("[AUTH] getRedirectResult error:", String(e))
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
              console.warn("[AUTH] getIdToken error:", String(e))
            }
          }
          await refresh(setUser, idToken)
          if (isMounted) setLoading(false)
        })

        if (hasCookie) {
          refresh(setUser).finally(() => {
            if (isMounted) setLoading(false)
          })
        }
      })

    return () => {
      isMounted = false
      unsubToken?.()
    }
  }, [])

  async function googleSignIn(): Promise<string | null> {
    if (!auth) {
      return "Firebase client is not initialized. Kripya environment settings check karein."
    }
    try {
      const result = await signInWithGoogle()
      if (result && "user" in result) {
        try {
          const token = await result.user.getIdToken(true)
          setTokenCookie(token)
          await refresh(setUser, token)
        } catch (e) {
          console.warn("[AUTH] token fetch error:", e)
        }
      }
      return null
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code || ""
      const currentHost = typeof window !== "undefined" ? window.location.hostname : "gorakhpurmissionrehab.com"
      if (code === "auth/unauthorized-domain") {
        return `Firebase Domain Error: '${currentHost}' authorized nahi hai. Firebase Console > Authentication > Settings > Authorized domains mein '${currentHost}' ko add karein.`
      }
      if (code === "auth/popup-closed-by-user") return "Sign-in window band kar di gayi."
      if (code === "auth/popup-blocked") return "Popup window browser dwara block kar di gayi. Popups allow karein."
      if (code === "auth/network-request-failed") return "Internet/Network error."
      return (e as Error)?.message || "Google sign-in fail ho gaya. Kripya punah prayas karein."
    }
  }

  async function logout() {
    clearTokenCookie()
    await signOutUser()
    setUser(null)
  }

  async function getIdToken(): Promise<string | null> {
    if (auth?.currentUser) {
      try {
        const freshToken = await auth.currentUser.getIdToken(false)
        if (freshToken) {
          setTokenCookie(freshToken)
          return freshToken
        }
      } catch (e) {
        console.warn("[AUTH] getIdToken fresh token error:", e)
      }
    }
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/__mission_auth=([^;]+)/)
      if (match) return decodeURIComponent(match[1])
    }
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle: googleSignIn,
        logout,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
