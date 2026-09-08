'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Calendar, Phone, HelpCircle } from "lucide-react"
import { useAuth } from "./AuthProvider"
import ThemeToggle from "./ThemeToggle"
import AdminHeader from "./AdminHeader"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 left-0 w-full z-[60] bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-navy-800 shadow-sm transition-colors duration-300">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0" aria-label="Gorakhpur Mission Rehab — Home">
            <Image
              src="/GMRLogo.png"
              alt="Gorakhpur Mission Rehab Logo"
              width={180}
              height={180}
              quality={90}
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
            <div className="min-w-0">
              <span className="text-sm sm:text-base lg:text-lg font-extrabold text-navy-900 dark:text-white tracking-tight block leading-tight truncate">
                Gorakhpur <span className="text-gradient">Mission Rehab</span>
              </span>
              <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] sm:text-[11px] text-brand-700 dark:text-brand-300 font-semibold leading-tight">
                  Dr. Devejya Srivastava (PT)
                </span>
                <span className="text-slate-300 dark:text-navy-700 text-[10px]">•</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                  Divyaman Hospital
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-all relative py-1 whitespace-nowrap ${
                  isActive(link.href)
                    ? "text-brand-600 dark:text-brand-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-600 dark:after:bg-brand-400 after:rounded-full"
                    : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user?.isAdmin ? "/admin" : user ? "/profile" : "/login"}
              className={`text-sm font-semibold transition-all relative py-1 whitespace-nowrap ${
                isActive("/admin") || isActive("/login") || isActive("/profile")
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
              }`}
            >
              {user?.isAdmin ? "Dashboard" : user ? "Profile" : "Login"}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-full transition-all border border-slate-200 dark:border-navy-700"
            >
              <HelpCircle className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400" />
              <span>Enquiry</span>
            </Link>
            <Link
              href="/book-appointment"
              className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-md shadow-brand-600/20 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
            {/* Hamburger — only mobile/tablet */}
            <button
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 top-[calc(var(--header-h,64px))] z-50 bg-white dark:bg-navy-900 overflow-y-auto border-t border-slate-200 dark:border-navy-700"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-5 space-y-1 max-w-md mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                  isActive(link.href)
                    ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-navy-800"
                    : "text-navy-700 dark:text-navy-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-navy-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user?.isAdmin ? "/admin" : user ? "/profile" : "/login"}
              onClick={() => setOpen(false)}
              className={`flex items-center text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                isActive("/admin") || isActive("/login") || isActive("/profile")
                  ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-navy-800"
                  : "text-navy-700 dark:text-navy-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-navy-800"
              }`}
            >
              {user?.isAdmin ? "Dashboard" : user ? "Profile" : "Login"}
            </Link>

            {/* CTA Buttons */}
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link
                href="/book-appointment"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-sm font-semibold px-4 py-3.5 rounded-2xl transition-all shadow-md"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                Book Now
              </Link>
              <a
                href="tel:+919616962072"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold px-4 py-3.5 rounded-2xl transition-all shadow-md"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                Call Now
              </a>
            </div>

            {/* Enquiry + Theme row */}
            <div className="pt-2 flex items-center justify-between px-1">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 font-medium"
              >
                <HelpCircle className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                Enquiry
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
