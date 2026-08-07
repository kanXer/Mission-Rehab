'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Calendar, Phone, HelpCircle, User, ShieldCheck } from "lucide-react"
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white dark:bg-navy-900 backdrop-blur-xl border-b border-brand-200 dark:border-brand-900 shadow-md transition-colors duration-300">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Gorakhpur Mission Rehab — Home">
            <Image
              src="/GMRLogo.png"
              alt="Gorakhpur Mission Rehab Logo"
              width={180}
              height={180}
              quality={80}
              className="hidden sm:block h-14 w-auto object-contain transition-transform group-hover:scale-105 brightness-75"
            />
            <div className="">
              <span className="text-base md:text-lg font-bold text-navy-800 dark:text-white tracking-tight block leading-tight">
                Gorakhpur <span className="text-gradient">Mission Rehab</span>
              </span>
              <span className="text-[10px] md:text-[11px] text-navy-500 dark:text-navy-300 font-medium -mt-0.5 block leading-tight">
                From Disability to Ability
              </span>
            </div>
          </Link>

          <nav className="hidden lgg:flex items-center gap-5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${isActive(link.href)
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-navy-600 dark:text-navy-200 hover:text-brand-600 dark:hover:text-brand-400"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-navy-50 hover:bg-navy-100 dark:bg-navy-800 dark:hover:bg-navy-700 text-navy-800 dark:text-white text-xs font-semibold px-3 py-2 rounded-full transition-all border border-navy-200 dark:border-navy-700"
            >
              <HelpCircle className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400" />
              <span>Enquiry</span>
            </Link>
            <Link
              href="/book-appointment"
              className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-lg shadow-brand-600/20 hover:scale-105 active:scale-95 dark:shadow-brand-600/10"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
            <Link
              href={user?.isAdmin ? "/admin" : "/admin/login"}
              className={`p-2 rounded-lg transition-colors ${isActive("/admin")
                ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-navy-800"
                : "text-navy-600 dark:text-navy-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-navy-50 dark:hover:bg-navy-800"
                }`}
              aria-label={user?.isAdmin ? "Admin Dashboard" : "Admin Login"}
              title={user?.isAdmin ? "Admin Dashboard" : "Admin Login"}
            >
              {user?.isAdmin ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </Link>
            <button
              className="lgg:hidden p-2 text-navy-600 dark:text-navy-300 hover:text-brand-600 dark:hover:text-brand-400"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lgg:hidden border-t border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-900 animate-fade-in" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive(link.href)
                  ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-navy-800"
                  : "text-navy-700 dark:text-navy-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-navy-50 dark:hover:bg-navy-800"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex gap-2">
              <Link
                href="/book-appointment"
                onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-sm font-semibold px-4 py-3 rounded-full transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
              <a
                href="tel:+919616962072"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold px-4 py-3 rounded-full transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
            <div className="pt-2 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
