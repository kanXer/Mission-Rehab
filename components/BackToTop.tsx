'use client'

import { useEffect, useState, useCallback } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLaunching, setIsLaunching] = useState(false)

  // Track scroll position & calculate scroll percentage
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    if (totalHeight <= 0) return

    const currentProgress = (window.scrollY / totalHeight) * 100
    const clamped = Math.min(100, Math.max(0, Math.round(currentProgress)))
    setScrollProgress(clamped)

    // Show when scrolled down past 250px
    setVisible(window.scrollY > 250)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    setIsLaunching(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => {
      setIsLaunching(false)
    }, 700)
  }

  // SVG circular progress calculations (Radius = 18, circumference ≈ 113.1)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <div
      className={`fixed z-40 transition-all duration-500 pointer-events-auto ${
        // Mobile: right side above bottom dock (bottom-24 right-4)
        // Desktop: left side (bottom-8 left-6 lg:left-8) to avoid collision with doctor lead widget on bottom-right
        "bottom-24 right-4 md:bottom-8 md:right-auto md:left-6 lg:left-8"
      } ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="group relative flex items-center p-1 rounded-full bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-navy-700/90 shadow-xl hover:shadow-2xl shadow-brand-500/10 hover:shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label={`Back to top, ${scrollProgress}% scrolled`}
        title={`Back to top (${scrollProgress}% scrolled)`}
      >
        {/* Subtle Pulse ring when page is read to the end */}
        {scrollProgress >= 95 && (
          <span className="absolute -inset-1 rounded-full bg-brand-500/20 dark:bg-brand-400/20 animate-ping pointer-events-none" />
        )}

        {/* Circular Progress Meter */}
        <div className="relative w-11 h-11 flex items-center justify-center">
          <svg className="w-11 h-11 -rotate-90 transform" viewBox="0 0 44 44">
            <defs>
              <linearGradient id="back-to-top-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="stroke-slate-200/70 dark:stroke-navy-700/80 fill-none"
              strokeWidth="2.5"
            />

            {/* Dynamic Progress Stroke */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="url(#back-to-top-gradient)"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="fill-none transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          {/* Center Icon & Rocket Animation */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <ArrowUp
              className={`w-4 h-4 text-brand-600 dark:text-brand-400 group-hover:text-accent-500 transition-all duration-300 ${
                isLaunching
                  ? "-translate-y-8 opacity-0 scale-75 duration-500"
                  : "translate-y-0 opacity-100 group-hover:-translate-y-0.5"
              }`}
            />
          </div>
        </div>

        {/* Hover / Expand Pill (Desktop) showing percentage & 'Top' */}
        <div className="hidden md:flex max-w-0 group-hover:max-w-28 overflow-hidden items-center transition-all duration-300 ease-out">
          <div className="pr-3 pl-1 whitespace-nowrap flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-white">
            <span className="text-[11px] text-brand-600 dark:text-brand-400 font-extrabold font-mono">
              {scrollProgress}%
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-[10px]">•</span>
            <span className="text-[11px] tracking-tight">Top</span>
          </div>
        </div>
      </button>

      {/* Floating Micro-Badge on Mobile (Shows % directly above button on scroll) */}
      <div className="md:hidden absolute -top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-navy-900/90 dark:bg-white/90 text-white dark:text-navy-900 text-[9px] font-mono font-bold shadow-xs pointer-events-none">
        {scrollProgress}%
      </div>
    </div>
  )
}
