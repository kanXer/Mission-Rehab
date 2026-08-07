"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import Header from "@/components/Header"
import { Loader } from "lucide-react"

const publicAdminPaths = ["/admin/login", "/admin/register"]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, adminVerified, adminVerifying, verifyAdmin } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [verified, setVerified] = useState(false)

  const isPublic = publicAdminPaths.includes(pathname)

  // Lazy admin proof verification — only triggers on admin pages
  useEffect(() => {
    if (loading || isPublic) return
    if (!user || !user.isAdmin) {
      router.push("/admin/login")
      return
    }
    // Verify admin proof server-side (one-time, cached)
    verifyAdmin().then((ok) => {
      if (!ok) {
        router.push("/admin/login")
      } else {
        setVerified(true)
      }
    })
  }, [user, loading, isPublic, router, verifyAdmin])

  // Redirect logged-in admin away from public auth pages
  useEffect(() => {
    if (loading) return
    if (user?.isAdmin && isPublic && adminVerified) {
      router.push("/admin")
    }
  }, [user, loading, isPublic, router, adminVerified])

  if (loading || adminVerifying) return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-brand-600" />
    </div>
  )

  if (isPublic) return <><Header />{children}</>

  if (!user || !user.isAdmin || !verified) return null

  return (
    <>
      <Header />
      {children}
    </>
  )
}
