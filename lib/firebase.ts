"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getAuth,
  signInWithCustomToken,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  type Auth,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const firebaseConfigured: boolean =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.authDomain &&
  !!firebaseConfig.projectId &&
  !firebaseConfig.projectId.includes("your-project") &&
  !firebaseConfig.apiKey.includes("DEMO")

export const auth: Auth | null = firebaseConfigured
  ? getAuth(getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null

export async function signInWithGoogle() {
  if (!auth) throw new Error("Firebase is not configured")
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: "select_account" })
  try {
    const res = await signInWithPopup(auth, provider)
    return res
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code
    if (code === "auth/popup-blocked" || code === "auth/cancelled-popup-request") {
      return await signInWithRedirect(auth, provider)
    }
    throw err
  }
}

export function getRedirectResultFirebase() {
  if (!auth) return Promise.resolve(null)
  return getRedirectResult(auth)
}

export function signInWithCustomTokenFirebase(customToken: string) {
  if (!auth) return Promise.reject(new Error("Firebase is not configured"))
  return signInWithCustomToken(auth, customToken)
}

export function signOutUser() {
  return auth ? signOut(auth) : Promise.resolve()
}
