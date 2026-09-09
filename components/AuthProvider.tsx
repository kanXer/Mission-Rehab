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
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  sendOtp: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>
  loginWithOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>
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
    if (!token && typeof document !== "undefined") {
      const match = document.cookie.match(/__mission_auth=([^;]+)/)
      if (match) token = decodeURIComponent(match[1])
    }
    if (!token && auth?.currentUser) {
      try {
        token = await auth.currentUser.getIdToken(true)
      } catch (e) {
        console.warn("[AUTH] refresh: currentUser.getIdToken warning:", e)
      }
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
      const defaultAdmins = [
        "nexusdigital.gkp@gmail.com",
        "sahilsks001@gmail.com",
        "gorakhpurmissionrehab@gmail.com",
        "user.kanxer@gmail.com",
      ]
      const adminList = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
        .toLowerCase()
        .split(",")
        .map((e) => e.trim())
        .concat(defaultAdmins)

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
      const defaultAdmins = [
        "nexusdigital.gkp@gmail.com",
        "sahilsks001@gmail.com",
        "gorakhpurmissionrehab@gmail.com",
        "user.kanxer@gmail.com",
      ]
      const isSuper = defaultAdmins.includes(email)
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

    // Check if we have an existing JWT cookie
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

        // Also check if custom cookie session is already present
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
      return "Firebase is not configured in this environment. Kripya Admin Credentials se login karein."
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
      const currentHost = typeof window !== "undefined" ? window.location.hostname : "your domain"
      if (code === "auth/unauthorized-domain") {
        return `Firebase Unauthorized Domain: Please add '${currentHost}' to Firebase Console > Authentication > Settings > Authorized domains. Aap neeche 'Admin Password / OTP' tab se turant login kar sakte hain.`
      }
      if (code === "auth/popup-closed-by-user") return "Sign-in window band kar di gayi."
      if (code === "auth/popup-blocked") return "Browser ne popup block kar diya. Popups allow karein ya Admin Password se login karein."
      if (code === "auth/network-request-failed") return "Internet/Network error."
      if (code === "auth/account-exists-with-different-credential") return "Is email ka account pehle se bana hua hai. Kripya Email/Password login use karein."
      return (e as Error)?.message || "Google sign-in fail ho gaya. Kripya punah prayas karein ya Admin Password use karein."
    }
  }

  async function loginWithCredentials(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" }
      }
      if (data.token) {
        setTokenCookie(data.token)
        await refresh(setUser, data.token)
      }
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err?.message || "Server connection error" }
    }
  }

  async function sendOtp(email: string): Promise<{ success: boolean; error?: string; message?: string }> {
    try {
      const res = await fetch("/api/auth/email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", email }),
      })
      const data = await res.json()
      if (!res.ok) {
        return { success: false, error: data.error || "Failed to send OTP" }
      }
      return { success: true, message: data.message }
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to send OTP" }
    }
  }

  async function loginWithOtp(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch("/api/auth/email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", email, otp }),
      })
      const data = await res.json()
      if (!res.ok) {
        return { success: false, error: data.error || "Invalid OTP" }
      }
      if (data.token) {
        setTokenCookie(data.token)
        await refresh(setUser, data.token)
      }
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to verify OTP" }
    }
  }

  async function logout() {
    clearTokenCookie()
    await signOutUser()
    setUser(null)
  }

  async function getIdToken(): Promise<string | null> {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/__mission_auth=([^;]+)/)
      if (match) return decodeURIComponent(match[1])
    }
    if (auth?.currentUser) {
      try {
        return await auth.currentUser.getIdToken()
      } catch {
        return null
      }
    }
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle: googleSignIn,
        loginWithCredentials,
        sendOtp,
        loginWithOtp,
        logout,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
