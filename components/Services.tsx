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

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { if (data.services) setServices(data.services) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    items: services.filter((s) => s.category === cat),
  }))

  return (
    <section id="services" className="relative py-16 md:py-24 bg-slate-50 dark:bg-navy-900 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
              Specialized Neuro Rehab
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
              Comprehensive Neuro-Rehabilitation{" "}
              <span className="text-gradient">Services</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Every condition is unique — we design personalized therapy plans targeting
              the root cause of neurological and movement disorders. From stroke recovery
              and hemiplegia physiotherapy to pediatric neuro rehabilitation and
              Parkinson's care, our team works as your neuro rehabilitation specialist
              in Gorakhpur.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-12">
            {grouped.map((group) =>
              group.items.length > 0 ? (
                <div key={group.category}>
                  <ScrollReveal>
                    <h3 className="text-xl font-bold text-navy-800 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-gradient-to-b from-brand-500 to-accent-500 rounded-full" />
                      {group.label}
                    </h3>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {group.items.map((item) => {
                      const Icon = iconMap[item.title] || Stethoscope
                      return (
                        <ScrollReveal key={item.title}>
                          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-100/30 dark:bg-navy-800 dark:border-navy-700 dark:hover:border-brand-500 dark:hover:shadow-2xl dark:hover:shadow-black/10 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-100/40 to-transparent rounded-bl-full dark:from-brand-900/40" />
                            <div className="relative z-10">
                              <div className="w-12 h-12 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                              </div>
                              <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </ScrollReveal>
                      )
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </section>
  )
}
