'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Phone,
  Calendar,
  Clock,
  MessageSquare,
  X,
  ChevronUp,
  Stethoscope,
  Navigation,
  MapPin,
} from "lucide-react"
import QuickLeadModal from "./QuickLeadModal"

const GOOGLE_MAPS_URL = "https://maps.google.com/?cid=6359659575143684042"

export default function StickyLeadDock() {
  const pathname = usePathname()
  const [modalOpen, setModalOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)

  // Do not render on admin or login pages
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null
  }

  const whatsappMessage = encodeURIComponent(
    "Hello Dr. Devejya Srivastava, I need a consultation for Neuro Physiotherapy / Rehabilitation in Gorakhpur."
  )

  return (
    <>
      {/* Quick Doctor Callback Modal */}
      <QuickLeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM CONVERSION DOCK (Optimized for Small Devices)        */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-navy-950/95 backdrop-blur-2xl border-t border-slate-200/90 dark:border-navy-800 shadow-[0_-8px_32px_rgba(0,0,0,0.18)] pb-safe transition-all">
        {/* Micro-urgency notification strip */}
        <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600 px-3 py-1 flex items-center justify-between text-[10.5px] text-white font-medium">
          <span className="flex items-center gap-1.5 truncate">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
            </span>
            <span className="truncate">Open Today • Dr. Devejya Available</span>
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="shrink-0 underline decoration-amber-300 text-amber-200 font-bold flex items-center gap-1 cursor-pointer pl-2"
          >
            <Clock className="w-3 h-3" />
            <span>15-Min Callback</span>
          </button>
        </div>

        {/* 4-Button Conversion Grid with Get Direction */}
        <div className="grid grid-cols-4 gap-1.5 p-1.5 sm:p-2">
          {/* 1. Direct Call */}
          <a
            href="tel:+919616962072"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-red-50/90 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/70 dark:border-red-900/50 active:scale-90 transition-transform shadow-xs"
            title="Call doctor directly"
          >
            <Phone className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] sm:text-xs font-bold leading-tight tracking-tight">Call</span>
          </a>

          {/* 2. WhatsApp Doctor */}
          <a
            href={`https://wa.me/919616962072?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-900/50 active:scale-90 transition-transform shadow-xs"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] sm:text-xs font-bold leading-tight tracking-tight">WhatsApp</span>
          </a>

          {/* 3. Google Maps Get Direction */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-900/50 active:scale-90 transition-transform shadow-xs"
            title="Get Directions on Google Maps"
          >
            <Navigation className="w-4 h-4 mb-0.5 text-blue-600 dark:text-blue-400 fill-blue-500/20" />
            <span className="text-[10px] sm:text-xs font-bold leading-tight tracking-tight">Direction</span>
          </a>

          {/* 4. Book Slot */}
          <Link
            href="/book-appointment"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-sm shadow-brand-600/30 active:scale-90 transition-transform"
            title="Book appointment"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] sm:text-xs font-bold leading-tight tracking-tight">Book</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP FLOATING HIGH-CONVERSION WIDGET (Visible md and above)             */}
      {/* ========================================================================= */}
      <aside aria-label="Quick Doctor Assistance" className="hidden md:block fixed bottom-6 right-6 z-40 animate-fade-in">
        {desktopCollapsed ? (
          <button
            onClick={() => setDesktopCollapsed(false)}
            className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600 text-white font-bold text-sm shadow-xl shadow-brand-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
            </span>
            <Stethoscope className="w-4 h-4" />
            <span>Consult Doctor Now</span>
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        ) : (
          <div className="relative w-84 bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-navy-700 shadow-2xl overflow-hidden transition-all duration-300">
            {/* Header with Doctor Status */}
            <div className="bg-gradient-to-r from-navy-900 via-brand-900 to-navy-900 text-white p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <div>
                  <p className="text-xs font-bold leading-tight">Dr. Devejya Srivastava (PT)</p>
                  <p className="text-[10.5px] text-emerald-400 font-medium">● Available for Consultation</p>
                </div>
              </div>
              <button
                onClick={() => setDesktopCollapsed(true)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Minimize widget"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Action Body */}
            <div className="p-4 space-y-2.5">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                Need urgent guidance for stroke recovery, paralysis, or pain? Get prompt medical assistance.
              </p>

              {/* Action Buttons: Call, WhatsApp, Get Direction */}
              <div className="grid grid-cols-3 gap-2 pt-0.5">
                <a
                  href="tel:+919616962072"
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-bold text-[11px] border border-red-200/60 dark:border-red-900/50 transition-colors"
                >
                  <Phone className="w-4 h-4 mb-1" />
                  <span>Call Doctor</span>
                </a>

                <a
                  href={`https://wa.me/919616962072?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-bold text-[11px] border border-emerald-200/60 dark:border-emerald-900/50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mb-1" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-bold text-[11px] border border-blue-200/60 dark:border-blue-900/50 transition-colors"
                  title="Google Maps Direction"
                >
                  <Navigation className="w-4 h-4 mb-1 fill-blue-500/20" />
                  <span>Direction</span>
                </a>
              </div>

              {/* Conversion Buttons: Callback & Book Online */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Request 15-Min Doctor Callback</span>
                </button>

                <Link
                  href="/book-appointment"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book In-Clinic Slot Online</span>
                </Link>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[10.5px] text-center text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors pt-0.5"
              >
                📍 Divyaman Hospital, Bargadwa Bypass, Gorakhpur (Click for Map)
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
