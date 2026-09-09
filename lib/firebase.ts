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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB_aR4Of_BEaGJ4xnheVNa_wVdPlb80p7s",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "missionrehab-81613.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "missionrehab-81613",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "missionrehab-81613.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "2207802468",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:2207802468:web:88823d9312b3140aa32b71",
}

export const firebaseConfigured: boolean =
  !!firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.includes("DEMO") &&
  !firebaseConfig.projectId.includes("your-project")

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
