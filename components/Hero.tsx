'use client'

import Link from "next/link"
import Image from "next/image"
import { Phone, MessageSquare, ShieldCheck, Brain, Activity, Users, Star, ChevronRight, TrendingUp, Search, HelpCircle, Calendar } from "lucide-react"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa"
import ScrollReveal from "./ScrollReveal"
import TypewriterText from "./TypewriterText"

const trustHighlights = [
  { icon: Brain, label: "Neuroplasticity Therapy" },
  { icon: Activity, label: "Advanced Gait Correction" },
  { icon: Users, label: "100% Personal Attention" },
]

const trendingKeywords = [
  { keyword: "Neuro Physiotherapy", volume: "Trending" },
  { keyword: "Best Neuro Physiotherapist Gorakhpur", volume: "Rising" },
  { keyword: "Stroke Recovery Treatment", volume: "Popular" },
  { keyword: "Dr. Devejya Srivastava", volume: "Popular" },
  { keyword: "Paralysis Physiotherapy Near Me", volume: "Trending" },
  { keyword: "Brain Retraining Therapy", volume: "Rising" },
  { keyword: "best neuro rehabilitation centre", volume: "Trending" },
]
const heroDescription = `
Best Neuro Physiotherapy Clinic in Gorakhpur — Dr. Devejya Srivastava (PT) is the top-rated neuro physiotherapist in Gorakhpur, specializing in brain retraining therapy after stroke, paralysis treatment, gait training, spinal cord injury rehab, and pediatric neuro care. From disability to ability — we rebuild lives through neuroplasticity-based recovery at Divyaman Hospital, Gorakhpur. Search "best neuro physiotherapy near me" — you'll find Gorakhpur Mission Rehab.
`;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] md:min-h-screen pt-20 pb-20 md:pt-28 md:pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-brand-950/30 dark:via-navy-900 dark:to-accent-950/30 -z-10" />
      <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-200/20 to-accent-200/10 rounded-full blur-3xl -z-10 animate-pulse-slow dark:from-brand-900/20 dark:to-accent-900/10" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent-200/10 to-brand-200/10 rounded-full blur-3xl -z-10 animate-pulse-slow dark:from-accent-900/10 dark:to-brand-900/10" />

      {/* Decorative dotted pattern */}
      <div className="absolute top-20 right-10 opacity-[0.03] -z-10 hidden md:block" aria-hidden="true">
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-navy-800 dark:bg-navy-400" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="mb-6 flex justify-center">
                <Image
                  src="/GMRLogo.png"
                  alt="Gorakhpur Mission Rehab Logo"
                  width={300}
                  height={300}
                  quality={100}
                  className="h-28 w-auto object-contain brightness-25"
                  priority
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-brand-200/50 shadow-sm dark:from-brand-900/40 dark:to-accent-900/40 dark:text-brand-200 dark:border-brand-800/50 dark:shadow-none">
                <ShieldCheck className="w-4 h-4" />
                Directed by Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab
              </div>
            </ScrollReveal>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-800 dark:text-white leading-[1.05] mb-2 tracking-tight whitespace-nowrap">
              {/* "Gorakhpur " = 10 chars × 60ms = 600ms → done at 200+600 = 800ms */}
              <TypewriterText text="Gorakhpur " speed={60} delay={200} showCursor={true} />
              {/* "Mission Rehab" starts at 900ms (after Gorakhpur done) */}
              <TypewriterText text="Mission Rehab" speed={70} delay={900} className="text-gradient" showCursor={true} />
            </h2>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-navy-800 dark:text-white leading-[1.05] mb-5 tracking-tight whitespace-nowrap">
              {/* "Mission Rehab" = 13 chars × 70ms = 910ms → done at 900+910 = 1810ms → h1 starts at 1900ms */}
              <TypewriterText text="From Disability to " speed={60} delay={1900} showCursor={true} />
              {/* "From Disability to " = 19 chars × 60ms = 1140ms → done at 1900+1140 = 3040ms */}
              <TypewriterText text="Ability" speed={80} delay={3100} className="text-gradient" showCursor={true} />
            </h1>

            <ScrollReveal>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-5 max-w-xl">
                <strong>Best Neuro Physiotherapy Clinic in Gorakhpur</strong> —
                <strong>Dr. Devejya Srivastava (PT)</strong> is the top-rated <strong>neuro physiotherapist </strong>
                in Gorakhpur, specializing in <strong>brain retraining therapy after stroke</strong>, paralysis treatment,
                gait training, spinal cord injury rehab, and pediatric neuro care. From disability to ability
                — we rebuild lives through <strong>neuroplasticity-based recovery</strong> at
                <strong> Divyaman Hospital, Gorakhpur</strong>. Search <strong>"best neuro physiotherapy near me"</strong>
                — you'll find Gorakhpur Mission Rehab.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-2xl p-4 mb-6 border border-orange-200 dark:border-orange-800/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 bg-white dark:bg-navy-800 px-3 py-1 rounded-full shadow-sm border border-orange-200 dark:border-orange-800">
                    <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">Trending on Google</span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">India — 2026</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingKeywords.map((t) => (
                    <div key={t.keyword} className="inline-flex items-center gap-1.5 bg-white dark:bg-navy-800 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-700 shadow-sm">
                      <Search className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-700 dark:text-slate-200">{t.keyword}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${t.volume === "Trending" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" :
                        t.volume === "Rising" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                          "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        }`}>{t.volume}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 mb-4">
                <Link
                  href="/book-appointment"
                  className="group inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-semibold text-sm px-5 py-3 rounded-full transition-all shadow-xl shadow-brand-600/25 hover:shadow-brand-600/40 dark:shadow-brand-900/30 dark:hover:shadow-brand-900/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Appointment
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-accent-600 to-brand-600 hover:from-accent-700 hover:to-brand-700 text-white font-semibold text-sm px-5 py-3 rounded-full transition-all shadow-lg shadow-accent-600/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <HelpCircle className="w-4 h-4" />
                  Send Enquiry
                </Link>
                <a
                  href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20need%20neuro%20rehabilitation%20help%20in%20Gorakhpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-5 py-3 rounded-full transition-all border border-slate-200 shadow-lg hover:shadow-xl dark:bg-navy-800 dark:hover:bg-navy-700 dark:text-slate-100 dark:border-navy-700 dark:shadow-lg dark:shadow-black/10 dark:hover:shadow-xl dark:hover:shadow-black/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                  WhatsApp Now
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                <div className="flex items-start gap-2 bg-brand-50/70 dark:bg-brand-900/20 rounded-xl px-3.5 py-2.5 border border-brand-200/50 dark:border-brand-800/30">
                  <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-800 dark:text-white">Book Appointment</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Pick date &amp; time for a clinic visit. Confirmation in 1 hr.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-accent-50/70 dark:bg-accent-900/20 rounded-xl px-3.5 py-2.5 border border-accent-200/50 dark:border-accent-800/30">
                  <div className="w-6 h-6 bg-accent-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <HelpCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-800 dark:text-white">Send Enquiry</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Ask about treatments, pricing, home visits &amp; more.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-emerald-50/70 dark:bg-emerald-900/20 rounded-xl px-3.5 py-2.5 border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-800 dark:text-white">WhatsApp / Call</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Urgent? Chat or call +91 9616962072 for instant help.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex items-center justify-start gap-4 mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Follow us</span>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-navy-700" />
              </div>
              <div className="flex items-center gap-2.5 mb-5">
                <a href="https://instagram.com/gorakhpur_missionrehab" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gradient-to-br from-pink-500 to-orange-400 rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-110 transition-all" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com/gorakhpurmissionrehab" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-110 transition-all" aria-label="Facebook">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-110 transition-all" aria-label="LinkedIn">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center text-white text-[10px] font-bold shadow-md hover:shadow-lg hover:scale-110 transition-all" aria-label="JustDial">
                  JD
                </a>
                <div className="h-8 w-px bg-slate-200 dark:bg-navy-700 mx-1" />
                <a href="tel:+919616962072" className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  +91 9616962072
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg border border-slate-200 dark:bg-navy-800/70 dark:shadow-lg dark:shadow-black/10 dark:border-navy-700">
                {trustHighlights.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-4 inline-flex items-center gap-2 bg-accent-50 text-accent-800 text-xs font-semibold px-4 py-2 rounded-full border border-accent-200 dark:bg-accent-900/40 dark:text-accent-200 dark:border-accent-800">
                <span className="w-1.5 h-1.5 bg-accent-500 dark:bg-accent-400 rounded-full animate-pulse" />
                Appointment confirmed within 1 hour
              </div>
            </ScrollReveal>
          </div>

          {/* Doctor Photo */}
          <div className="flex justify-center items-start relative pt-4 md:pt-4">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-brand-200/20 to-accent-200/20 rounded-full blur-2xl dark:from-brand-900/20 dark:to-accent-900/20" />
                <div className="relative w-48 h-56 sm:w-64 sm:h-72 md:w-72 md:h-[28rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 dark:border-navy-700 dark:shadow-2xl dark:shadow-black/20">
                  <Image
                    src="/doctor.jpg"
                    alt="Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab Physiotherapist at Gorakhpur Mission Rehab"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 192px, (max-width: 767px) 256px, 288px"
                    priority
                    fetchPriority="high"
                  />
                </div>
                {/* Experience badge */}
                <div className="absolute -bottom-3 -left-3 bg-white rounded-xl px-4 py-2.5 shadow-lg border border-slate-200 dark:bg-navy-800 dark:shadow-lg dark:shadow-black/10 dark:border-navy-700 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <div>
                    <p className="text-xs font-bold text-navy-800 dark:text-white">10+ Years</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Experience</p>
                  </div>
                </div>
                {/* Phone badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg dark:from-red-700 dark:to-red-600 dark:shadow-lg dark:shadow-black/20 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  +91 9616962072
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
