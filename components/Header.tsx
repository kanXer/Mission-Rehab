'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu, X, Calendar, Phone, HelpCircle,
  Home, Stethoscope, BookOpen, Image as ImageIcon,
  Info, Mail, LayoutDashboard, User, LogIn,
  ChevronRight, ChevronDown, MessageSquare,
  Activity, HeartPulse, Sparkles,
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

const servicesSubMenu = [
  { label: "Stroke & Paralysis Recovery", href: "/services", icon: HeartPulse },
  { label: "Spinal Cord Injury Rehab",    href: "/services", icon: Activity },
  { label: "Gait & Balance Training",     href: "/services", icon: Sparkles },
  { label: "Pediatric Neuro-Physiotherapy", href: "/services", icon: HeartPulse },
  { label: "All Treatments",              href: "/services", icon: Stethoscope },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [headerH, setHeaderH] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const { user } = useAuth()
  const pathname = usePathname()

  // Measure header height + auto-close the mobile drawer when resized up to desktop
  useEffect(() => {
    const update = () => {
      if (headerRef.current) setHeaderH(headerRef.current.offsetHeight)
      if (window.innerWidth >= 768) setOpen(false)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Add a compact, elevated style once the user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close all menus on route change
  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
  }, [pathname])

  // Lock body scroll + close dropdown when mobile menu is open
  useEffect(() => {
    if (open) setServicesOpen(false)
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Close services dropdown when clicking outside
  useEffect(() => {
    if (!servicesOpen) return
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest("[data-services-menu]")) setServicesOpen(false)
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [servicesOpen])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const authHref = user?.isAdmin ? "/admin" : user ? "/profile" : "/login"
  const authLabel = user?.isAdmin ? "Dashboard" : user ? "Profile" : "Login"

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 left-0 w-full z-[70] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl shadow-lg shadow-navy-900/5 border-b border-slate-200/70 dark:border-navy-800/60"
            : "bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 shadow-sm"
        }`}
      >
        <AdminHeader />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14 md:h-16" : "h-16 md:h-[72px]"}`}>

            {/* ── Logo — hidden on smaller screens, shown on md+ ── */}
            <Link href="/" className="hidden md:flex items-center gap-3 flex-shrink-0 group">
              <span className="relative">
                <span className="absolute -inset-1.5 bg-gradient-to-br from-brand-500/30 to-accent-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src="/GMRLogo.png"
                  alt="Gorakhpur Mission Rehab Logo"
                  width={48}
                  height={48}
                  quality={90}
                  className="relative h-11 w-11 md:h-12 md:w-12 object-contain flex-shrink-0 drop-shadow-sm"
                  priority
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[15px] md:text-base font-extrabold text-navy-900 dark:text-white">
                  Gorakhpur{" "}
                  <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                    Mission&nbsp;Rehab
                  </span>
                </span>
                <span className="hidden lg:block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 tracking-wide">
                  Dr. Devejya Srivastava (PT) · Divyaman Hospital
                </span>
              </span>
            </Link>

            {/* ── Mobile: site name only (no logo image) ── */}
            <Link href="/" className="md:hidden flex items-center gap-2 flex-shrink-0">
              <Image
                src="/GMRLogo.png"
                alt="Gorakhpur Mission Rehab Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="text-base font-extrabold text-navy-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                  Mission Rehab
                </span>
              </span>
            </Link>

            {/* ── Desktop Nav (md+) ── */}
            <nav className="hidden md:flex items-center xl:gap-1 gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                const Icon = link.icon

                // Services gets an advanced dropdown on lg+
                if (link.href === "/services") {
                  return (
                    <div key={link.href} className="relative" data-services-menu>
                      <button
                        onClick={() => setServicesOpen((v) => !v)}
                        className={`group flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                          active
                            ? "text-brand-600 dark:text-brand-400"
                            : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                        }`}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                      >
                        <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>

                      <div
                        className={`absolute left-0 top-[calc(100%+10px)] w-72 origin-top-left rounded-2xl border border-slate-100 dark:border-navy-700 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl shadow-xl shadow-navy-900/10 p-2 transition-all duration-200 ${
                          servicesOpen
                            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                        }`}
                      >
                        <div className="px-3 pt-2 pb-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Neuro Rehabilitation
                          </p>
                          <div className="h-px bg-slate-100 dark:bg-navy-700 mt-1.5" />
                        </div>
                        {servicesSubMenu.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-brand-50 hover:to-accent-50 dark:hover:from-brand-950/60 dark:hover:to-accent-950/60 hover:text-brand-700 dark:hover:text-brand-300 transition-all"
                          >
                            <s.icon className="w-4 h-4 mt-0.5 text-brand-500 dark:text-brand-400 flex-shrink-0" />
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all relative ${
                      active
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                    <span
                      className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 transition-all duration-300 ${
                        active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden md:flex items-center gap-1">
                <ThemeToggle />
                <Link
                  href={authHref}
                  className={`hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive("/login") || isActive("/profile") || isActive("/admin")
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-500 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                  }`}
                >
                  {user?.isAdmin ? <LayoutDashboard className="w-4 h-4" /> : user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {authLabel}
                </Link>
              </div>

              <a
                href="tel:+919616962072"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">+91 96169 62072</span>
                <span className="lg:hidden">Call</span>
              </a>

              <Link
                href="/book-appointment"
                className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-600/25 transition-all hover:shadow-lg hover:shadow-brand-600/30 hover:scale-[1.03] active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Book Appointment</span>
                <span className="lg:hidden">Book</span>
              </Link>

              {/* ── Hamburger (below md only) ── */}
              <button
                onClick={() => setOpen((v) => !v)}
                className={`md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                  open
                    ? "bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-md shadow-brand-600/30"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700"
                }`}
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
          PREMIUM MOBILE MENU — full-screen drawer, always on top
          ══════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[80] transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy-950/50 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-white dark:bg-navy-900 shadow-2xl shadow-navy-950/40 overflow-y-auto transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* ── Gradient header with logo & clinic info ── */}
          <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 px-5 py-5">
            <div className="flex items-center justify-between">
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
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl text-white/90 hover:bg-white/15 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── Nav links ── */}
          <div className="px-4 pt-4 pb-2 space-y-1">
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
    </>
  )
}
