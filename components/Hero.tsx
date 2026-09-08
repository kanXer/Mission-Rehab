'use client'

import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Brain,
  Activity,
  Users,
  Star,
  ChevronRight,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Stethoscope,
  Award,
} from "lucide-react"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa"
import ScrollReveal from "./ScrollReveal"
import TypewriterText from "./TypewriterText"

const trustHighlights = [
  { icon: Brain, label: "Neuroplasticity Therapy", desc: "Brain rewiring protocols for motor & cognitive recovery" },
  { icon: Activity, label: "Advanced Gait Correction", desc: "Computerized & task-specific balance training" },
  { icon: Users, label: "100% Personal Attention", desc: "One-on-one tailored neuro-rehab sessions" },
]

const clinicalFocusAreas = [
  "Stroke Recovery Treatment",
  "Paralysis Physiotherapy",
  "Brain Retraining Therapy",
  "Spinal Cord Injury Rehab",
  "Pediatric Neuro Care",
  "Gait & Balance Training",
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-brand-50/40 via-white to-slate-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 transition-colors"
    >
      {/* Background Ambience & Clinical Gradients */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-brand-200/25 via-accent-200/15 to-transparent rounded-full blur-3xl -z-10 pointer-events-none dark:from-brand-900/20 dark:via-accent-900/15" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent-200/20 via-brand-200/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none dark:from-accent-900/20 dark:via-brand-900/10" />

      {/* Subtle Medical Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#0284c7 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Emergency & Doctor Notice Pill */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/70 dark:border-navy-800/80">
            <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-brand-200/70 dark:border-brand-800/60 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Consultant Neuro Rehab Specialist • Divyaman Hospital, Gorakhpur</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Clinic Open: Mon – Sat (10:00 AM – 8:00 PM)
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-navy-700">|</span>
              <a
                href="tel:+919616962072"
                className="hidden sm:flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:underline font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                Emergency: +91 9616962072
              </a>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Doctor Introduction & Practice Details */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent-50 dark:bg-accent-950/60 text-accent-700 dark:text-accent-300 text-xs font-bold uppercase tracking-wider border border-accent-200/60 dark:border-accent-800/60">
                <Stethoscope className="w-3.5 h-3.5" />
                Specialized Neuro-Rehabilitation
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-extrabold text-navy-900 dark:text-white leading-[1.14] tracking-tight">
                From Disability to <span className="text-gradient">Ability</span>
                <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700 dark:text-slate-200 mt-2">
                  Specialized in{" "}
                  <TypewriterText
                    words={[
                      "Stroke & Paralysis Recovery",
                      "Brain Retraining Therapy",
                      "Gait & Balance Correction",
                      "Spinal Cord Injury Rehab",
                      "Pediatric Neuro Physiotherapy",
                    ]}
                    className="text-brand-600 dark:text-brand-400 font-extrabold"
                    cursorColor="text-brand-600 dark:text-brand-400"
                  />
                </span>
                <span className="block text-lg sm:text-2xl font-bold text-slate-600 dark:text-slate-300 mt-2">
                  Dr. Devejya Srivastava{" "}
                  <span className="text-xs sm:text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/70 px-2.5 py-1 rounded-lg align-middle border border-brand-200/60 dark:border-brand-800/60 shadow-xs">
                    BPT (Physiotherapy)
                  </span>
                </span>
              </h1>
            </ScrollReveal>

            {/* Preserving exact hero clinical description */}
            <ScrollReveal>
              <div className="bg-white/80 dark:bg-navy-900/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200 dark:border-navy-800 shadow-sm">
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                  <strong className="text-navy-900 dark:text-white font-bold">Best Neuro Physiotherapy Clinic in Gorakhpur</strong> —{" "}
                  <strong className="text-navy-900 dark:text-white font-bold">Dr. Devejya Srivastava (PT)</strong> is the top-rated{" "}
                  <strong className="text-brand-600 dark:text-brand-400 font-bold">neuro physiotherapist</strong> in Gorakhpur,
                  specializing in <strong className="text-navy-900 dark:text-white font-bold">brain retraining therapy after stroke</strong>, paralysis treatment,
                  gait training, spinal cord injury rehab, and pediatric neuro care. From disability to ability
                  — we rebuild lives through <strong className="text-navy-900 dark:text-white font-bold">neuroplasticity-based recovery</strong> at{" "}
                  <strong className="text-navy-900 dark:text-white font-bold">Divyaman Hospital, Gorakhpur</strong>.
                  Search <em>&ldquo;best neuro physiotherapy near me&rdquo;</em> — you&apos;ll find Gorakhpur Mission Rehab.
                </p>
              </div>
            </ScrollReveal>

            {/* Clinical Trust Metrics Grid */}
            <ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-navy-800/90 rounded-xl p-3 border border-slate-200 dark:border-navy-700 shadow-xs text-center">
                  <p className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400">10+ Yrs</p>
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Clinical Practice</p>
                </div>
                <div className="bg-white dark:bg-navy-800/90 rounded-xl p-3 border border-slate-200 dark:border-navy-700 shadow-xs text-center">
                  <p className="text-xl sm:text-2xl font-black text-accent-600 dark:text-accent-400">500+</p>
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Patients Recovered</p>
                </div>
                <div className="bg-white dark:bg-navy-800/90 rounded-xl p-3 border border-slate-200 dark:border-navy-700 shadow-xs text-center">
                  <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-black text-amber-500">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">360+ Google Reviews</p>
                </div>
                <div className="bg-white dark:bg-navy-800/90 rounded-xl p-3 border border-slate-200 dark:border-navy-700 shadow-xs text-center">
                  <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</p>
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Personal Attention</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Doctor CTA Action Hub */}
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-brand-600/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book In-Clinic Appointment</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20need%20neuro%20rehabilitation%20help%20in%20Gorakhpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Doctor</span>
                </a>

                <a
                  href="tel:+919616962072"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-800 dark:text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-slate-300 dark:border-navy-700 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span>Call +91 9616962072</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Verified Clinical Focus Tags */}
            <ScrollReveal>
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  Core Clinical Specializations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {clinicalFocusAreas.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Social Proof & Profiles */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-1 border-t border-slate-200/80 dark:border-navy-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Doctor Profiles:</span>
                <a
                  href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-navy-800 text-sky-600 dark:text-sky-400 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="LinkedIn"
                  title="Dr. Devejya Srivastava LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-navy-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs hover:scale-110 transition-transform"
                  aria-label="JustDial"
                  title="Verified on JustDial"
                >
                  JustDial Verified
                </a>
                <a
                  href="https://instagram.com/gorakhpur_missionrehab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-navy-800 text-pink-600 dark:text-pink-400 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/gorakhpurmissionrehab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-navy-800 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Doctor Portrait & Credibility Showcase */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="relative mx-auto max-w-md">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-500/20 via-accent-500/20 to-brand-600/20 rounded-3xl blur-xl -z-10" />

                {/* Doctor Portrait Card */}
                <div className="bg-white dark:bg-navy-800 rounded-3xl p-3 sm:p-4 border-2 border-slate-200/80 dark:border-navy-700 shadow-2xl overflow-hidden relative">
                  {/* Verified Top Badge */}
                  <div className="absolute top-6 left-6 z-10 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 shadow-md flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-white">
                    <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Verified Specialist</span>
                  </div>

                  <div className="relative w-full h-80 sm:h-96 md:h-[26rem] rounded-2xl overflow-hidden bg-slate-100 dark:bg-navy-900">
                    <Image
                      src="/doctor.jpg"
                      alt="Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab Physiotherapist at Divyaman Hospital Gorakhpur"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      priority
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                    {/* Text overlay on photo bottom */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-lg sm:text-xl font-extrabold tracking-tight">
                        Dr. Devejya Srivastava (PT)
                      </p>
                      <p className="text-xs text-brand-200 font-medium">
                        Consultant Neuro Rehabilitation Physiotherapist
                      </p>
                      <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-accent-400 shrink-0" />
                        Divyaman Hospital, Bargadwa Bypass, Gorakhpur
                      </p>
                    </div>
                  </div>

                  {/* Doctor Pedigree & Former Hospitals Banner */}
                  <div className="mt-3 bg-slate-50 dark:bg-navy-900/80 rounded-xl p-3 border border-slate-200/80 dark:border-navy-700/80">
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Clinical Training &amp; Experience:
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-200">
                      Ex-Resident <strong>Dr. Ram Manohar Lohia Hospital, Lucknow</strong> &bull; Ex-Physiotherapist <strong>Yashoda Hospital, Ghaziabad</strong>
                    </p>
                  </div>
                </div>

                {/* 3 Value Pillars Underneath */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                  {trustHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 dark:border-navy-700 shadow-xs flex flex-col justify-between"
                    >
                      <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400 mb-1" />
                      <div>
                        <p className="text-xs font-bold text-navy-900 dark:text-white leading-tight">{item.label}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

