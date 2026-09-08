'use client'

import { useState, useEffect, useRef } from "react"
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
  { label: "Contact", href: "/contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [headerH, setHeaderH] = useState(64)
  const headerRef = useRef<HTMLElement>(null)
  const { user } = useAuth()
  const pathname = usePathname()

  // Measure header height after every render so the mobile overlay sits correctly below it
  useEffect(() => {
    const update = () => {
      if (headerRef.current) setHeaderH(headerRef.current.offsetHeight)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 left-0 w-full z-[60] bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 shadow-sm"
      >
        <AdminHeader />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/GMRLogo.png"
                alt="Gorakhpur Mission Rehab Logo"
                width={44}
                height={44}
                quality={90}
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain flex-shrink-0"
                priority
              />
              <div>
                <p className="text-[13px] sm:text-sm lg:text-base font-extrabold text-navy-900 dark:text-white leading-tight">
                  Gorakhpur{" "}
                  <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                    Mission&nbsp;Rehab
                  </span>
                </p>
                <p className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                  Dr. Devejya Srivastava (PT) · Divyaman Hospital
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav (lg+) ── */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive(link.href)
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={user?.isAdmin ? "/admin" : user ? "/profile" : "/login"}
                className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive("/admin") || isActive("/login") || isActive("/profile")
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                }`}
              >
                {user?.isAdmin ? "Dashboard" : user ? "Profile" : "Login"}
              </Link>
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-full border border-slate-200 dark:border-navy-700 transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Enquiry
              </Link>
              <Link
                href="/book-appointment"
                className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Appointment
              </Link>

              {/* ── Hamburger (mobile / tablet only) ── */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu overlay — sits directly below sticky header ── */}
      {open && (
        <div
          className="fixed left-0 right-0 bottom-0 z-[59] bg-white dark:bg-navy-900 overflow-y-auto border-t border-slate-200 dark:border-navy-700"
          style={{ top: headerH }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-3 space-y-0.5 max-w-lg mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                  isActive(link.href)
                    ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-navy-800"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800"
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
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800"
              }`}
            >
              {user?.isAdmin ? "Dashboard" : user ? "Profile" : "Login"}
            </Link>

            {/* CTA buttons */}
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link
                href="/book-appointment"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-sm font-semibold py-3.5 rounded-2xl shadow-md"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
              <a
                href="tel:+919616962072"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold py-3.5 rounded-2xl shadow-md"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Bottom row */}
            <div className="pt-3 pb-8 flex items-center justify-between px-1">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
              >
                <HelpCircle className="w-4 h-4" />
                Enquiry
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
