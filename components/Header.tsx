'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu, X, Calendar, Phone, HelpCircle,
  Home, Stethoscope, BookOpen, Image as ImageIcon,
  Info, Mail, LayoutDashboard, User, LogIn, LogOut,
  ChevronRight, ChevronDown, MessageSquare,
  Activity, HeartPulse, Sparkles, ArrowRight,
  ShieldCheck, Clock, MapPin
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useAuth } from "./AuthProvider"
import ThemeToggle from "./ThemeToggle"
import AdminHeader from "./AdminHeader"

const navLinks = [
  { label: "Home",     href: "/",         icon: Home },
  { label: "Services", href: "/services", icon: Stethoscope },
  { label: "Blog",     href: "/blog",     icon: BookOpen },
  { label: "Gallery",  href: "/gallery",  icon: ImageIcon },
  { label: "About",    href: "/about",    icon: Info },
  { label: "Contact",  href: "/contact",  icon: Mail },
]

const servicesSubMenu = [
  {
    label: "Stroke & Paralysis Recovery",
    desc: "Targeted neuroplasticity & motor retraining",
    href: "/services",
    icon: HeartPulse,
    bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    label: "Spinal Cord Injury Rehab",
    desc: "Post-traumatic functional therapy",
    href: "/services",
    icon: Activity,
    bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Gait & Balance Training",
    desc: "Fall prevention & gait correction",
    href: "/services",
    icon: Sparkles,
    bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    label: "Pediatric Neuro-Physiotherapy",
    desc: "Developmental delays & CP rehab",
    href: "/services",
    icon: HeartPulse,
    bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    label: "All Specialized Treatments",
    desc: "Explore full clinical rehabilitation",
    href: "/services",
    icon: Stethoscope,
    bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
]

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("")
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Auto-close the mobile drawer when resized up to desktop (960px)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 960) setOpen(false)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Compact elevated style on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      setServicesOpen(false)
      setUserMenuOpen(false)
    }
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close dropdowns on outside click
  useEffect(() => {
    if (!servicesOpen && !userMenuOpen) return
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (servicesOpen && !t.closest("[data-services-menu]")) setServicesOpen(false)
      if (userMenuOpen && !t.closest("[data-user-menu]")) setUserMenuOpen(false)
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [servicesOpen, userMenuOpen])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const authHref = user?.isAdmin ? "/admin" : user ? "/profile" : "/login"
  const authLabel = user?.isAdmin ? "Dashboard" : user ? "Profile" : "Login"

  return (
    <>
      <header
        ref={headerRef}
        suppressHydrationWarning
        className={`sticky top-0 left-0 w-full z-[70] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-navy-950/95 backdrop-blur-2xl shadow-lg shadow-navy-950/5 dark:shadow-black/30 border-b border-slate-200/80 dark:border-navy-800/80"
            : "bg-white/90 dark:bg-navy-950/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-navy-800/50 shadow-xs"
        }`}
      >
        {/* Sleek top 2px accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-brand-600 via-accent-500 to-brand-500 opacity-90" />

        <AdminHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-14 nav:h-[58px]" : "h-15 nav:h-[64px]"
            }`}
          >
            {/* ══════════════════════════════════════════
                1. LOGO & BRAND BLOCK (Desktop + Mobile)
                ══════════════════════════════════════════ */}
            <div className="flex items-center gap-3">
              {/* Desktop Logo (>= 960px) */}
              <Link
                href="/"
                aria-label="Gorakhpur Mission Rehab — Home"
                className="hidden nav:flex items-center gap-3 group"
              >
                <div className="relative p-1 rounded-xl bg-gradient-to-br from-brand-500/10 via-accent-500/5 to-transparent border border-brand-500/20 dark:border-brand-400/20 group-hover:border-brand-500/40 group-hover:shadow-sm group-hover:shadow-brand-500/10 transition-all duration-300">
                  <Image
                    src="/GMRLogo.png"
                    alt="Gorakhpur Mission Rehab Logo"
                    width={42}
                    height={42}
                    quality={90}
                    className="h-9 w-9 nav:h-10 nav:w-10 object-contain flex-shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-[14.5px] lg:text-[15.5px] font-bold tracking-tight text-navy-900 dark:text-white">
                      Gorakhpur{" "}
                      <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 bg-clip-text text-transparent">
                        Mission&nbsp;Rehab
                      </span>
                    </span>
                    <span className="hidden xl:inline-flex items-center gap-1 text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open
                    </span>
                  </div>
                  <span className="hidden sm:block text-[10px] lg:text-[10.5px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 tracking-tight">
                    Dr. Devejya Srivastava (PT) · Divyaman Hospital
                  </span>
                </div>
              </Link>

              {/* Mobile Logo (< 960px) */}
              <Link
                href="/"
                aria-label="Gorakhpur Mission Rehab — Home"
                className="nav:hidden flex items-center gap-2.5 group"
              >
                <div className="relative p-1 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent-500/5 border border-brand-500/20">
                  <Image
                    src="/GMRLogo.png"
                    alt="Gorakhpur Mission Rehab Logo"
                    width={40}
                    height={40}
                    className="h-9 w-9 object-contain"
                    priority
                  />
                </div>
                <div>
                  <span className="text-[15px] font-black text-navy-900 dark:text-white tracking-tight leading-tight block">
                    Gorakhpur{" "}
                    <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                      Mission Rehab
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Dr. Devejya Srivastava (PT)
                  </span>
                </div>
              </Link>
            </div>

            {/* ══════════════════════════════════════════
                2. DESKTOP SLEEK NAVIGATION BAR (>= 960px)
                ══════════════════════════════════════════ */}
            <nav className="hidden nav:flex items-center gap-0.5 bg-slate-100/70 dark:bg-navy-900/60 p-1 rounded-full border border-slate-200/60 dark:border-navy-800/60 backdrop-blur-md shadow-2xs">
              {navLinks.map((link) => {
                const active = isActive(link.href)

                // Services Dropdown Menu
                if (link.href === "/services") {
                  return (
                    <div key={link.href} className="relative" data-services-menu>
                      <button
                        onClick={() => setServicesOpen((v) => !v)}
                        className={`group flex items-center gap-1 px-3 py-1.5 rounded-full text-[12.5px] lg:text-[13px] tracking-tight transition-all duration-150 ${
                          active || servicesOpen
                            ? "bg-white dark:bg-navy-800 text-brand-600 dark:text-brand-400 font-semibold shadow-xs border border-slate-200/50 dark:border-navy-700/50"
                            : "text-slate-600 dark:text-slate-300 font-medium hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/60 dark:hover:bg-navy-800/50"
                        }`}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-3 h-3 opacity-60 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180 text-brand-600 dark:text-brand-400" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Floating Mega-Menu */}
                      <div
                        className={`absolute left-0 top-[calc(100%+10px)] w-80 origin-top-left rounded-2xl border border-slate-200/90 dark:border-navy-700/90 bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl shadow-xl shadow-navy-950/15 p-2 ring-1 ring-black/5 transition-all duration-200 z-50 ${
                          servicesOpen
                            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                        }`}
                      >
                        {/* Dropdown Title Header */}
                        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100 dark:border-navy-800 mb-1">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                            <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Clinical Treatments
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-brand-600 dark:text-brand-400">
                            Divyaman Hospital
                          </span>
                        </div>

                        {/* Dropdown List Items */}
                        <div className="space-y-0.5">
                          {servicesSubMenu.map((s) => (
                            <Link
                              key={s.label}
                              href={s.href}
                              onClick={() => setServicesOpen(false)}
                              className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-gradient-to-r hover:from-brand-50/80 hover:to-accent-50/60 dark:hover:from-brand-950/60 dark:hover:to-accent-950/60 transition-all duration-150"
                            >
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${s.bg} group-hover:scale-105 transition-transform`}
                              >
                                <s.icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-tight">
                                  {s.label}
                                </p>
                                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                  {s.desc}
                                </p>
                              </div>
                              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-navy-600 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                            </Link>
                          ))}
                        </div>

                        {/* Dropdown Bottom Quick CTA */}
                        <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-navy-800 px-1.5 pb-0.5">
                          <Link
                            href="/book-appointment"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950/40 dark:to-accent-950/40 text-brand-700 dark:text-brand-300 text-[11px] font-bold hover:shadow-xs transition-all"
                          >
                            <span>Need direct doctor advice?</span>
                            <span className="flex items-center gap-1 text-[10.5px] text-brand-600 dark:text-brand-400 underline">
                              Book Slot <ArrowRight className="w-3 h-3" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                }

                // Standard Nav Links
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-[12.5px] lg:text-[13px] tracking-tight transition-all duration-150 ${
                      active
                        ? "bg-white dark:bg-navy-800 text-brand-600 dark:text-brand-400 font-semibold shadow-xs border border-slate-200/50 dark:border-navy-700/50"
                        : "text-slate-600 dark:text-slate-300 font-medium hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/60 dark:hover:bg-navy-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* ══════════════════════════════════════════
                3. RIGHT ACTION BUTTONS & CTAS
                ══════════════════════════════════════════ */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Doctor Hotline Call Pill */}
              <a
                href="tel:+919616962072"
                className="hidden nav:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all shadow-2xs hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                title="Direct Clinic Helpline"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden lg:inline">+91 96169 62072</span>
                <span className="lg:hidden">Helpline</span>
              </a>

              {/* Book Appointment CTA Button */}
              <Link
                href="/book-appointment"
                className="hidden nav:inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 hover:from-brand-700 hover:via-brand-600 hover:to-accent-700 text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-full shadow-xs shadow-brand-600/20 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
              >
                {/* Subtle shine shimmer */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out" />
                <Calendar className="w-3 h-3 group-hover:rotate-6 transition-transform" />
                <span className="hidden lg:inline">Book Appointment</span>
                <span className="lg:hidden">Book</span>
              </Link>

              {/* Theme Toggle */}
              <div className="flex items-center">
                <ThemeToggle />
              </div>

              {/* Desktop Auth / User Profile */}
              {user ? (
                <div className="hidden nav:block relative" data-user-menu>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className={`relative flex items-center justify-center w-8.5 h-8.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer border ${
                      userMenuOpen || isActive("/profile") || isActive("/admin")
                        ? "border-brand-500 ring-2 ring-brand-500/25"
                        : "border-slate-200/90 dark:border-navy-700/90 hover:border-brand-400 dark:hover:border-brand-500"
                    }`}
                    aria-expanded={userMenuOpen}
                    aria-label="User Account Menu"
                    title={user.name || "Patient Profile"}
                  >
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-600 via-brand-500 to-accent-600 text-white text-[10.5px] font-black flex items-center justify-center shadow-xs">
                        {initials(user.name || user.email)}
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-navy-950 ${
                        user.isAdmin ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu Card */}
                  <div
                    className={`absolute right-0 top-[calc(100%+10px)] w-72 origin-top-right rounded-2xl border border-slate-200/90 dark:border-navy-700/90 bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl shadow-xl shadow-navy-950/15 p-2 ring-1 ring-black/5 transition-all duration-200 z-50 ${
                      userMenuOpen
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                    }`}
                  >
                    {/* Header info badge */}
                    <div className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-brand-50/40 dark:from-navy-950/80 dark:to-brand-950/20 border border-slate-100 dark:border-navy-800 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        {user.photo ? (
                          <img
                            src={user.photo}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-navy-800 shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm">
                            {initials(user.name || user.email)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-bold text-navy-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-navy-800/80 flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            user.isAdmin
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80"
                              : "bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/80"
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          {user.isSuperAdmin ? "Super Admin" : user.isAdmin ? "Clinical Admin" : "Verified Patient"}
                        </span>
                        <span className="text-[10px] text-slate-400">Divyaman Hospital</span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-brand-50/70 dark:hover:bg-navy-800/70 transition-colors group"
                      >
                        <User className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
                        <span className="flex-1">My Health Profile</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      <Link
                        href="/book-appointment"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-brand-50/70 dark:hover:bg-navy-800/70 transition-colors group"
                      >
                        <Calendar className="w-4 h-4 text-accent-500 group-hover:scale-110 transition-transform" />
                        <span className="flex-1">Book Consultation</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </Link>

                      {user.isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-50/70 dark:hover:bg-amber-950/40 transition-colors group"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                          <span className="flex-1">Admin Dashboard</span>
                          <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      )}
                    </div>

                    {/* Sign Out CTA */}
                    <div className="mt-1 pt-1 border-t border-slate-100 dark:border-navy-800">
                      <button
                        onClick={async () => {
                          setUserMenuOpen(false)
                          await logout()
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  aria-label="Patient Portal Login"
                  title="Patient Portal Login"
                  className={`hidden nav:flex items-center justify-center w-8.5 h-8.5 rounded-full transition-all duration-300 shadow-2xs hover:shadow-md relative group ${
                    isActive("/login")
                      ? "bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-brand-500/25 ring-2 ring-brand-500/20"
                      : "bg-slate-100/90 dark:bg-navy-900/80 hover:bg-white dark:hover:bg-navy-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200/80 dark:border-navy-700/80 hover:border-brand-400/60 dark:hover:border-brand-500/60"
                  }`}
                >
                  <User className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-navy-950 opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              )}

              {/* Mobile Quick Profile/Login Button (< 960px) */}
              <div className="nav:hidden flex items-center">
                {user ? (
                  <Link
                    href="/profile"
                    aria-label="My Profile"
                    title={user.name || "My Profile"}
                    className="relative flex items-center justify-center w-8 h-8 rounded-full border border-brand-500/40 bg-brand-50/60 dark:bg-navy-800 shadow-2xs"
                  >
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-white text-[10px] font-black flex items-center justify-center">
                        {initials(user.name || user.email)}
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-white dark:ring-navy-950 ${
                        user.isAdmin ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    aria-label="Patient Portal Login"
                    title="Patient Portal Login"
                    className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-100/90 dark:bg-navy-900/80 text-slate-600 dark:text-slate-300 hover:text-brand-600 border border-slate-200/80 dark:border-navy-700 shadow-2xs group transition-colors"
                  >
                    <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-navy-950" />
                  </Link>
                )}
              </div>

              {/* Mobile Hamburger Toggle (< 960px) */}
              <button
                onClick={() => setOpen((v) => !v)}
                className={`nav:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
                  open
                    ? "bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-md shadow-brand-600/30"
                    : "text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-navy-800/80 hover:bg-slate-200 dark:hover:bg-navy-700 border border-slate-200/80 dark:border-navy-700/80 shadow-xs"
                }`}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          4. ULTRA-PREMIUM MOBILE MENU DRAWER (< 960px)
          ══════════════════════════════════════════ */}
      <div
        className={`nav:hidden fixed inset-0 z-[80] transition-all duration-300 ${
          open ? "pointer-events-auto opacity-100 visible" : "pointer-events-none opacity-0 invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {/* Soft Glass Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-navy-950/60 backdrop-blur-md transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-white dark:bg-navy-900 shadow-2xl shadow-navy-950/50 overflow-y-auto transition-transform duration-300 ease-out transform flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* ── Drawer Hero Card with Doctor Info ── */}
          <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 p-5 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xs">
                  <Image
                    src="/GMRLogo.png"
                    alt="Mission Rehab Logo"
                    width={44}
                    height={44}
                    className="h-10 w-10 object-contain drop-shadow-sm"
                  />
                </div>
                <div>
                  <h3 className="font-black text-[15px] leading-tight text-white tracking-tight">
                    Gorakhpur Mission Rehab
                  </h3>
                  <p className="text-brand-100 text-[11px] font-medium leading-tight mt-0.5">
                    Dr. Devejya Srivastava (PT)
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 text-[9.5px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Clinic Open · Divyaman Hospital
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Emergency Direct Action Bar */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/15">
              <a
                href="tel:+919616962072"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-center"
              >
                <Phone className="w-4 h-4 text-emerald-300 mb-1" />
                <span className="text-[10.5px] font-bold leading-tight">Call Now</span>
              </a>
              <a
                href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20need%20neuro%20rehabilitation%20help%20in%20Gorakhpur"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-center"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-300 mb-1" />
                <span className="text-[10.5px] font-bold leading-tight">WhatsApp</span>
              </a>
              <Link
                href="/book-appointment"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-center"
              >
                <Calendar className="w-4 h-4 text-amber-300 mb-1" />
                <span className="text-[10.5px] font-bold leading-tight">Book Slot</span>
              </Link>
            </div>
          </div>

          {/* ── Main Navigation Links ── */}
          <div className="px-4 py-3 space-y-1.5 flex-1">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 py-1">
              Menu Navigation
            </p>

            {navLinks.map((link) => {
              const active = isActive(link.href)
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-brand-50 to-accent-50/80 dark:from-brand-950/60 dark:to-accent-950/60 border border-brand-200/60 dark:border-brand-800/60 shadow-xs"
                      : "hover:bg-slate-100 dark:hover:bg-navy-800/70 border border-transparent"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-all ${
                      active
                        ? "bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-md shadow-brand-600/30"
                        : "bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400 group-hover:bg-brand-600 group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 transition-colors" />
                  </span>

                  <span
                    className={`flex-1 font-bold text-[14.5px] transition-colors ${
                      active
                        ? "text-brand-700 dark:text-brand-300"
                        : "text-slate-700 dark:text-slate-200 group-hover:text-navy-900 dark:group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-all ${
                      active
                        ? "text-brand-600 dark:text-brand-400 translate-x-0.5"
                        : "text-slate-300 dark:text-navy-600 group-hover:text-brand-500 group-hover:translate-x-0.5"
                    }`}
                  />
                </Link>
              )
            })}

            {/* Auth / Account Card */}
            {user ? (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-brand-50/40 dark:from-navy-950/80 dark:to-brand-950/20 border border-brand-200/60 dark:border-brand-800/60 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-11 h-11 rounded-2xl object-cover border-2 border-white dark:border-navy-800 shadow-sm"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-600 text-white text-sm font-black flex items-center justify-center shadow-sm">
                      {initials(user.name || user.email)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-navy-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      {user.isAdmin && <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                    <span
                      className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1 rounded-full ${
                        user.isAdmin
                          ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80"
                          : "bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/80"
                      }`}
                    >
                      {user.isSuperAdmin ? "Super Admin" : user.isAdmin ? "Clinical Admin" : "Verified Patient"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-navy-800/80">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-navy-800 text-brand-700 dark:text-brand-300 font-bold text-xs border border-brand-200/80 dark:border-brand-800/80 shadow-2xs hover:shadow-xs"
                  >
                    <User className="w-3.5 h-3.5 text-brand-600" />
                    <span>My Health Profile</span>
                  </Link>

                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-800/80 shadow-2xs"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-amber-600" />
                      <span>Admin</span>
                    </Link>
                  )}

                  <button
                    onClick={async () => {
                      setOpen(false)
                      await logout()
                    }}
                    className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3.5 p-3 rounded-2xl bg-gradient-to-r from-brand-50 to-accent-50/80 dark:from-brand-950/60 dark:to-accent-950/60 border border-brand-200/60 dark:border-brand-800/60 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white flex items-center justify-center shadow-md shadow-brand-600/30 shrink-0 group-hover:scale-105 transition-transform">
                  <LogIn className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-brand-800 dark:text-brand-300 leading-tight">
                      Patient Portal Login
                    </p>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-600 text-white">
                      Sign In
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    Manage appointments &amp; saved health records
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>

          {/* ── Mobile Drawer Footer ── */}
          <div className="p-4 border-t border-slate-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/50 shrink-0 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-accent-500" />
                <span>Mon – Sat: 10 AM – 8 PM</span>
              </div>
              <ThemeToggle />
            </div>

            <Link
              href="/book-appointment"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 text-white text-sm font-bold py-3.5 rounded-2xl shadow-lg shadow-brand-600/30 active:scale-[0.98] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Priority Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
