"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import Header from "@/components/Header"
import { Loader } from "lucide-react"

const publicAdminPaths = ["/admin/login", "/admin/register"]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const isPublic = publicAdminPaths.includes(pathname)

  useEffect(() => {
    if (loading) return
    if (!user || !user.isAdmin) {
      if (!isPublic) router.push("/admin/login")
    } else {
      if (isPublic) router.push("/admin")
    }
  }, [user, loading, isPublic, router])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-brand-600" />
    </div>
  )

  if (!user || !user.isAdmin) {
    if (isPublic) return <><Header />{children}</>
    return null
  }

  if (isPublic) return <><Header />{children}</>

  return (
    <>
      <Header />
      {children}
    </>
  )
}
