"use client"

import { useState, useEffect } from "react"
import {
  Brain, Bone, Footprints, Heart, Accessibility, Activity,
  Stethoscope, Baby, User,
} from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const iconMap: Record<string, any> = {
  "Stroke & Paralysis Rehabilitation": Brain,
  "Gait & Balance Rehabilitation": Activity,
  "Pediatric Neuro Rehabilitation": Baby,
  "Foot & Ankle Rehabilitation": Footprints,
  "Parkinson's Disease & Movement Disorders": Activity,
  "Knee, Hip & Joint Pain": Bone,
  "Spinal Cord Injury Rehabilitation": Bone,
  "Brain Injury (TBI) Rehabilitation": Brain,
  "Facial Palsy / Bell's Palsy": User,
  "Cerebral Palsy (CP)": Baby,
  "Multiple Sclerosis (MS)": Activity,
  "Guillain-Barré Syndrome (GBS)": Activity,
  "Vestibular Rehabilitation (Vertigo / Dizziness)": Accessibility,
  "Frozen Shoulder": Bone,
  "Shoulder Pain & Rotator Cuff Injury": Bone,
  "Osteoarthritis Rehabilitation": Bone,
  "ACL / Sports Rehabilitation": Activity,
  "Post-Fracture Rehabilitation": Accessibility,
}

interface Service {
  title: string
  category: string
}

const categoryOrder = ["Neurological", "Pediatric", "Orthopaedic"]
const categoryLabels: Record<string, string> = {
  Neurological: "Neurological Rehabilitation",
  Pediatric: "Pediatric Neuro-Physiotherapy",
  Orthopaedic: "Orthopaedic & Pain Management",
}

import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"

import TypewriterText from "./TypewriterText"

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [activeTab, setActiveTab] = useState<string>("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (data.services) setServices(data.services)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredServices =
    activeTab === "All"
      ? services
      : services.filter((s) => s.category === activeTab)

  return (
    <section id="services" className="relative py-16 md:py-24 bg-white dark:bg-navy-900 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800/60 mb-3 shadow-xs">
              <Stethoscope className="w-3.5 h-3.5" />
              Clinical Departments &amp; Specializations
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Comprehensive Neuro-Rehabilitation{" "}
              <TypewriterText
                words={["Services", "Protocols", "Treatments", "Programs"]}
                className="text-gradient"
                cursorColor="text-brand-500"
              />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Every neurological condition is unique — we design personalized, physician-directed therapy plans targeting
              the root cause of mobility and functional disorders.
            </p>
          </div>
        </ScrollReveal>

        {/* Clinical Department Filter Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTab("All")}
              className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                activeTab === "All"
                  ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                  : "bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-700"
              }`}
            >
              All Conditions ({services.length})
            </button>
            {categoryOrder.map((cat) => {
              const count = services.filter((s) => s.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                    activeTab === cat
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                      : "bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-700"
                  }`}
                >
                  {categoryLabels[cat]} {count > 0 ? `(${count})` : ""}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 animate-pulse h-44"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((item) => {
              const Icon = iconMap[item.title] || Stethoscope
              return (
                <ScrollReveal key={item.title}>
                  <div className="group bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200/90 dark:border-navy-700 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-100/30 to-transparent rounded-bl-full dark:from-brand-900/20 pointer-events-none" />
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/40 dark:to-accent-900/40 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-700">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-navy-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-100 dark:border-navy-700/60 flex items-center justify-between">
                      <Link
                        href="/book-appointment"
                        className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                      >
                        <span>Book Consultation</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href="tel:+919616962072"
                        className="text-xs text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                        title="Call Doctor regarding this condition"
                      >
                        Call Doctor
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-brand-600 hover:text-white dark:bg-navy-800 dark:hover:bg-brand-600 text-navy-900 dark:text-white text-sm font-bold transition-all shadow-sm hover:shadow-md"
          >
            <span>View Detailed Clinical Protocols for All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
