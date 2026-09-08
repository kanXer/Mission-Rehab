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
      className="relative min-h-[85vh] pt-6 pb-14 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-brand-50/40 via-white to-slate-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 transition-colors"
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-brand-200/25 via-accent-200/15 to-transparent rounded-full blur-3xl -z-10 pointer-events-none dark:from-brand-900/20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent-200/20 via-brand-200/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none dark:from-accent-900/20" />
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none -z-10"
        style={{ backgroundImage: `radial-gradient(#0284c7 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ═══════════════════════════════════════════
            Hero top — logo + brand block (Desktop lg+ only; on mobile doctor photo is at top)
            ═══════════════════════════════════════════ */}
        <div className="hidden lg:flex items-center justify-start text-left gap-5 mb-8 pt-2">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-400/25 to-accent-400/25 rounded-full blur-2xl" />
            <Image
              src="/GMRLogo.png"
              alt="Gorakhpur Mission Rehab Logo"
              width={88}
              height={88}
              quality={90}
              className="relative h-14 w-14 xl:h-16 xl:w-16 object-contain drop-shadow-xl"
              priority
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-2xl xl:text-3xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
              Gorakhpur{" "}
              <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                Mission Rehab
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Dr. Devejya Srivastava (PT) · Divyaman Hospital
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              Clinic Open: Mon – Sat · 10 AM – 8 PM
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════
            DESKTOP only — top notice bar
            ═════════════════════════════════ */}
        <ScrollReveal>
          <div className="hidden lg:flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/70 dark:border-navy-800/80">
            <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-brand-200/70 dark:border-brand-800/60">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Consultant Neuro Rehab Specialist • Divyaman Hospital, Gorakhpur</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Clinic Open: Mon – Sat (10:00 AM – 8:00 PM)
              </span>
              <span className="text-slate-300 dark:text-navy-700">|</span>
              <a href="tel:+919616962072" className="flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:underline font-bold">
                <Phone className="w-3.5 h-3.5" />
                Emergency: +91 9616962072
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ════════════════════════════
            Main content grid
            ════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left — Text (order-2 on mobile = below portrait) */}
          <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">

            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent-50 dark:bg-accent-950/60 text-accent-700 dark:text-accent-300 text-xs font-bold uppercase tracking-wider border border-accent-200/60 dark:border-accent-800/60">
                <Stethoscope className="w-3.5 h-3.5" />
                Specialized Neuro-Rehabilitation
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-[2.85rem] font-extrabold text-navy-900 dark:text-white leading-[1.14] tracking-tight">
                From Disability to <span className="text-gradient">Ability</span>
                <span className="block text-[13px] sm:text-base md:text-xl lg:text-3xl font-bold text-slate-700 dark:text-slate-200 mt-2 whitespace-nowrap max-w-full overflow-hidden">
                  Specialized in{" "}
                  <TypewriterText
                    words={[
                      "Stroke & Paralysis",
                      "Brain Retraining",
                      "Gait & Balance",
                      "Spinal Cord Rehab",
                      "Pediatric Neuro Care",
                    ]}
                    className="text-brand-600 dark:text-brand-400 font-extrabold"
                    cursorColor="text-brand-600 dark:text-brand-400"
                  />
                </span>
                <span className="block text-[13px] sm:text-xl font-bold text-slate-600 dark:text-slate-300 mt-2">
                  Dr. Devejya Srivastava{" "}
                  <span className="text-xs sm:text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/70 px-2.5 py-1 rounded-lg align-middle border border-brand-200/60 dark:border-brand-800/60">
                    BPT (Physiotherapy)
                  </span>
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal>
              <div className="bg-white/80 dark:bg-navy-900/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 dark:border-navy-800 shadow-sm">
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  <strong className="text-navy-900 dark:text-white font-bold">Best Neuro Physiotherapy Clinic in Gorakhpur</strong> —{" "}
                  <strong className="text-navy-900 dark:text-white font-bold">Dr. Devejya Srivastava (PT)</strong> is the top-rated{" "}
                  <strong className="text-brand-600 dark:text-brand-400 font-bold">neuro physiotherapist</strong> in Gorakhpur,
                  specializing in <strong className="text-navy-900 dark:text-white font-bold">brain retraining therapy after stroke</strong>,
                  paralysis treatment, gait training, spinal cord injury rehab, and pediatric neuro care — at{" "}
                  <strong className="text-navy-900 dark:text-white font-bold">Divyaman Hospital, Gorakhpur</strong>.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats — 4 col always */}
            <ScrollReveal>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {[
                  { val: "10+", sub: "Yrs Practice", color: "text-brand-600 dark:text-brand-400" },
                  { val: "500+", sub: "Recovered", color: "text-accent-600 dark:text-accent-400" },
                  { val: "5.0★", sub: "360+ Reviews", color: "text-amber-500" },
                  { val: "100%", sub: "Personal", color: "text-emerald-600 dark:text-emerald-400" },
                ].map(({ val, sub, color }) => (
                  <div key={sub} className="bg-white dark:bg-navy-800/90 rounded-xl p-2.5 sm:p-3 border border-slate-200 dark:border-navy-700 shadow-xs text-center">
                    <p className={`text-base sm:text-2xl font-black ${color} leading-tight`}>{val}</p>
                    <p className="text-[9px] sm:text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-tight mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA — stacked on mobile, row on sm+ */}
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/book-appointment"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold text-sm px-5 py-4 sm:py-3.5 rounded-xl shadow-lg shadow-brand-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  Book Appointment
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </Link>
                <a
                  href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20need%20neuro%20rehabilitation%20help%20in%20Gorakhpur"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-4 sm:py-3.5 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  WhatsApp Doctor
                </a>
                <a
                  href="tel:+919616962072"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-800 dark:text-white font-bold text-sm px-5 py-4 sm:py-3.5 rounded-xl border border-slate-300 dark:border-navy-700 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  Call +91 9616962072
                </a>
              </div>
            </ScrollReveal>

            {/* Specialization tags */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  Core Clinical Specializations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {clinicalFocusAreas.map((item) => (
                    <span key={item} className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Social proof */}
            <ScrollReveal>
              <div className="flex items-center gap-3 pt-1 border-t border-slate-200/80 dark:border-navy-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Doctor Profiles:</span>
                <a href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-navy-800 text-sky-600 dark:text-sky-400 flex items-center justify-center hover:scale-110 transition-transform" aria-label="LinkedIn">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1" target="_blank" rel="noopener noreferrer"
                  className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-navy-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs hover:scale-110 transition-transform" aria-label="JustDial">
                  JustDial ✓
                </a>
                <a href="https://instagram.com/gorakhpur_missionrehab" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-navy-800 text-pink-600 dark:text-pink-400 flex items-center justify-center hover:scale-110 transition-transform" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com/gorakhpurmissionrehab" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-navy-800 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 transition-transform" aria-label="Facebook">
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Doctor portrait (order-1 on mobile = above heading) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <ScrollReveal>
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-500/20 via-accent-500/20 to-brand-600/20 rounded-3xl blur-xl -z-10" />

                <div className="bg-white dark:bg-navy-800 rounded-3xl p-3 sm:p-4 border-2 border-slate-200/80 dark:border-navy-700 shadow-2xl overflow-hidden relative">
                  {/* Verified badge top-left */}
                  <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 shadow-md flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-white">
                    <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Verified Specialist</span>
                  </div>

                  {/* Clinic Open badge top-right on mobile */}
                  <div className="lg:hidden absolute top-5 right-5 z-10 bg-emerald-600/95 text-white backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 text-[10.5px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Clinic Open</span>
                  </div>

                  <div className="relative w-full h-64 sm:h-80 md:h-[26rem] rounded-2xl overflow-hidden bg-slate-100 dark:bg-navy-900">
                    <Image
                      src="/doctor.jpg"
                      alt="Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab Physiotherapist at Divyaman Hospital Gorakhpur"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      priority
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                      <p className="text-base sm:text-xl font-extrabold tracking-tight">Dr. Devejya Srivastava (PT)</p>
                      <p className="text-xs text-brand-200 font-medium">Consultant Neuro Rehabilitation Physiotherapist</p>
                      <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-accent-400 shrink-0" />
                        Divyaman Hospital, Bargadwa Bypass, Gorakhpur
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 bg-slate-50 dark:bg-navy-900/80 rounded-xl p-3 border border-slate-200/80 dark:border-navy-700/80">
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Clinical Training &amp; Experience:
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-200">
                      Ex-Resident <strong>Dr. Ram Manohar Lohia Hospital, Lucknow</strong> &bull; Ex-Physiotherapist <strong>Yashoda Hospital, Ghaziabad</strong>
                    </p>
                  </div>
                </div>

                {/* Value pillars — hidden on small mobile */}
                <div className="hidden sm:grid grid-cols-3 gap-2.5 mt-4">
                  {trustHighlights.map((item) => (
                    <div key={item.label} className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 dark:border-navy-700 shadow-xs flex flex-col">
                      <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400 mb-1" />
                      <p className="text-xs font-bold text-navy-900 dark:text-white leading-tight">{item.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
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
