'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu, X, Calendar, Phone, HelpCircle,
  Home, Stethoscope, BookOpen, Image as ImageIcon,
  Info, Mail, LayoutDashboard, User, LogIn,
  ChevronRight, MessageSquare,
} from "lucide-react"
import { useAuth } from "./AuthProvider"
import ThemeToggle from "./ThemeToggle"
import AdminHeader from "./AdminHeader"

const navLinks = [
  { label: "Home",    href: "/",               icon: Home },
  { label: "Services",href: "/services",       icon: Stethoscope },
  { label: "Blog",    href: "/blog",            icon: BookOpen },
  { label: "Gallery", href: "/gallery",         icon: ImageIcon },
  { label: "About",   href: "/about",           icon: Info },
  { label: "Contact", href: "/contact",         icon: Mail },
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

            {/* ── Logo — hidden on mobile, shown on lg+ ── */}
            <Link href="/" className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Image
                src="/GMRLogo.png"
                alt="Gorakhpur Mission Rehab Logo"
                width={44}
                height={44}
                quality={90}
                className="h-11 w-11 object-contain flex-shrink-0"
                priority
              />
              <div>
                <p className="text-base font-extrabold text-navy-900 dark:text-white leading-tight">
                  Gorakhpur{" "}
                  <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                    Mission&nbsp;Rehab
                  </span>
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                  Dr. Devejya Srivastava (PT) · Divyaman Hospital
                </p>
              </div>
            </Link>

            {/* ── Mobile: site name only (no logo image) ── */}
            <Link href="/" className="lg:hidden flex items-center flex-shrink-0">
              <p className="text-sm font-extrabold text-navy-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                  Mission Rehab
                </span>
              </p>
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

      {/* ══════════════════════════════════════════
          MODERN MOBILE MENU
          ══════════════════════════════════════════ */}
      {open && (
        <div
          className="fixed left-0 right-0 bottom-0 z-[59] overflow-y-auto"
          style={{ top: headerH }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-white/95 dark:bg-navy-950/97 backdrop-blur-2xl" />

          <div className="relative flex flex-col min-h-full">

            {/* ── Gradient header with logo & clinic info ── */}
            <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm" />
                  <Image
                    src="/GMRLogo.png"
                    alt="Mission Rehab Logo"
                    width={48}
                    height={48}
                    className="relative h-12 w-12 object-contain drop-shadow-md"
                  />
                </div>
                <div>
                  <p className="text-white font-extrabold text-base leading-tight">
                    Gorakhpur Mission Rehab
                  </p>
                  <p className="text-brand-100 text-[11px] font-medium leading-tight mt-0.5">
                    Dr. Devejya Srivastava (PT)
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="text-emerald-300 text-[10px] font-semibold">Clinic Open · Mon–Sat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Nav links ── */}
            <div className="flex-1 px-4 pt-4 pb-2 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950/60 dark:to-accent-950/60 shadow-sm border border-brand-200/60 dark:border-brand-800/50"
                        : "hover:bg-slate-100 dark:hover:bg-navy-800/70 border border-transparent"
                    }`}
                  >
                    {/* Icon box */}
                    <span className={`flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all ${
                      active
                        ? "bg-gradient-to-br from-brand-600 to-accent-600 shadow-md shadow-brand-600/30"
                        : "bg-slate-100 dark:bg-navy-800 group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-accent-600 group-hover:shadow-md group-hover:shadow-brand-600/30"
                    }`}>
                      <Icon className={`w-4 h-4 transition-colors ${
                        active ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-white"
                      }`} />
                    </span>

                    <span className={`flex-1 font-semibold text-[15px] transition-colors ${
                      active
                        ? "text-brand-700 dark:text-brand-300"
                        : "text-slate-700 dark:text-slate-200"
                    }`}>
                      {link.label}
                    </span>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all ${
                      active
                        ? "text-brand-500 dark:text-brand-400"
                        : "text-slate-300 dark:text-navy-600 group-hover:text-brand-400 group-hover:translate-x-0.5"
                    }`} />
                  </Link>
                )
              })}

              {/* Login / Dashboard / Profile */}
              {(() => {
                const href = user?.isAdmin ? "/admin" : user ? "/profile" : "/login"
                const label = user?.isAdmin ? "Dashboard" : user ? "My Profile" : "Login"
                const Icon = user?.isAdmin ? LayoutDashboard : user ? User : LogIn
                const active = isActive("/admin") || isActive("/login") || isActive("/profile")
                return (
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950/60 dark:to-accent-950/60 shadow-sm border border-brand-200/60 dark:border-brand-800/50"
                        : "hover:bg-slate-100 dark:hover:bg-navy-800/70 border border-transparent"
                    }`}
                  >
                    <span className={`flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all ${
                      active ? "bg-gradient-to-br from-brand-600 to-accent-600 shadow-md" : "bg-slate-100 dark:bg-navy-800 group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-accent-600"
                    }`}>
                      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-white"}`} />
                    </span>
                    <span className={`flex-1 font-semibold text-[15px] ${active ? "text-brand-700 dark:text-brand-300" : "text-slate-700 dark:text-slate-200"}`}>
                      {label}
                    </span>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${active ? "text-brand-500" : "text-slate-300 dark:text-navy-600 group-hover:text-brand-400"}`} />
                  </Link>
                )
              })()}
            </div>

            {/* ── CTA Buttons ── */}
            <div className="px-4 pt-2 grid grid-cols-2 gap-3">
              <Link
                href="/book-appointment"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-sm font-bold py-4 rounded-2xl shadow-lg shadow-brand-600/30 active:scale-[0.97] transition-all"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                Book Now
              </Link>
              <a
                href="tel:+919616962072"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold py-4 rounded-2xl shadow-lg shadow-red-500/30 active:scale-[0.97] transition-all"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                Call Now
              </a>
            </div>

            {/* ── WhatsApp full row ── */}
            <div className="px-4 pt-2">
              <a
                href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20need%20neuro%20rehabilitation%20help%20in%20Gorakhpur"
                target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3.5 rounded-2xl shadow-md shadow-emerald-600/25 active:scale-[0.97] transition-all"
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                WhatsApp Doctor
              </a>
            </div>

            {/* ── Footer row ── */}
            <div className="px-5 pt-4 pb-8 flex items-center justify-between border-t border-slate-100 dark:border-navy-800 mt-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Send Enquiry
              </Link>
              <ThemeToggle />
            </div>

          </div>
        </div>
      )}
    </>
  )
}
