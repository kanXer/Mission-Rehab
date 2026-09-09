"use client"

import Link from "next/link"
import { useAuth } from "./AuthProvider"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Shield, LayoutDashboard, FileText, Calendar, Image as ImageIcon, LogOut, Menu, X, Tags, MessageSquare, Upload, HelpCircle, Users } from "lucide-react"

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "FAQs", href: "/admin/faq", icon: HelpCircle },
  { label: "Admins", href: "/admin/admins", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Upload", href: "/admin/upload", icon: Upload },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
]

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user?.isAdmin) return null

  const visibleLinks = adminLinks.filter(
    (link) => link.href !== "/admin/admins" || user.isSuperAdmin === true
  )

  async function handleLogout() {
    await logout()
    router.push("/")
  }

  return (
    <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-b border-navy-700/50 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 h-12 sm:h-14 text-sm">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold shrink-0">
            <div className="w-7 h-7 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
            <span className="text-sm sm:text-base tracking-wide">Admin</span>
          </div>

          <nav className="hidden sm:flex items-center gap-1 ml-2">
            {visibleLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all shrink-0 text-sm ${
                    active
                      ? "bg-amber-500/15 text-amber-300 shadow-inner"
                      : "text-navy-300 hover:text-amber-300 hover:bg-amber-500/10"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto shrink-0 flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="text-xs text-navy-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-navy-700/60 hover:border-navy-600 transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2.5 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-1.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-700/50 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden pb-3 border-t border-navy-700/50 pt-2 space-y-1">
            {visibleLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm ${
                    active
                      ? "bg-amber-500/15 text-amber-300"
                      : "text-navy-300 hover:text-amber-300 hover:bg-amber-500/10"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
