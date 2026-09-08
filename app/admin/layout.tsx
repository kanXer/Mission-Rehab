"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import Header from "@/components/Header"
import { Loader } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user || !user.isAdmin) router.push("/login")
  }, [user, loading, router])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-brand-600" />
    </div>
  )

  if (!user || !user.isAdmin) return null

  return (
    <>
      <Header />
      {children}
    </>
  )
}
