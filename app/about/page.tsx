import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Award, Star, MapPin, Phone, BookOpen, Brain, UserCheck, Quote, GraduationCap, Heart, Shield, ChevronRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "About Dr. Devejya Srivastava — Neuro Rehab Specialist Gorakhpur",
  description:
    "Meet Dr. Devejya Srivastava (PT), Consultant Neuro Rehab Physiotherapist at Divyaman Hospital, Gorakhpur. 10+ years of experience in stroke recovery, gait correction, spinal cord rehab, and pediatric neuro-physiotherapy.",
  openGraph: {
    title: "Dr. Devejya Srivastava (PT) — Neuro Rehabilitation Specialist | Gorakhpur Mission Rehab",
    description: "Learn about Dr. Devejya Srivastava's expertise, qualifications, and approach to neuro-rehabilitation at Divyaman Hospital, Gorakhpur.",
  },
}

const concepts = [
  {
    icon: Brain,
    title: "Neuroplasticity-Based Recovery",
    desc: "The brain can rewire itself. Our therapy uses task-specific training and cognitive challenge to forge new neural pathways — not just passive exercises.",
  },
  {
    icon: UserCheck,
    title: "Task-Specific Training",
    desc: "Recovery isn't about static standing. We train real-world movements — walking, reaching, balancing — to rebuild functional independence.",
  },
  {
    icon: BookOpen,
    title: "Research-Backed Protocols",
    desc: "Every protocol is grounded in the latest neuro-rehabilitation research. We measure progress with objective gait analysis and mobility assessments.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-0">
        <section className="pt-16 md:pt-28 pb-12 md:pb-20 bg-slate-50 dark:bg-navy-900 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">About Us</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-800 dark:text-white mb-4">
                  Meet{" "}
                  <span className="text-gradient">Dr. Devejya Srivastava</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
                  Consultant Neuro Rehab Physiotherapist dedicated to rebuilding lives through science-backed, compassionate care at Divyaman Hospital, Gorakhpur.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
              <ScrollReveal>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-brand-200/30 dark:from-brand-800/30 to-accent-200/20 dark:to-accent-800/20 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-200/20 dark:from-accent-800/20 to-brand-200/20 dark:to-brand-800/20 rounded-full blur-xl" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-2xl dark:shadow-black/20 border-4 border-white">
                    <Image
                      src="/doctor.jpg"
                      alt="Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab Physiotherapist"
                      width={600}
                      height={700}
                      className="w-full h-auto object-cover object-top"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 dark:from-black/80 to-transparent p-6">
                      <p className="text-white text-lg font-bold">Dr. Devejya Srivastava (PT)</p>
                      <p className="text-brand-200 text-sm">Consultant Neuro Rehab Physiotherapist</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-200 dark:border-yellow-800">
                      <Star className="w-3 h-3 fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300" /> 10+ Years Experience
                    </span>
                    <span className="inline-flex items-center gap-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-200 dark:border-brand-800">
                      <GraduationCap className="w-3 h-3" /> BPT, MPT (Neuro)
                    </span>
                    <span className="inline-flex items-center gap-1 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-accent-200 dark:border-accent-800">
                      <Heart className="w-3 h-3" /> 500+ Patients Treated
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-800 dark:text-white">
                    A Purpose Beyond{" "}
                    <span className="text-gradient">Profession</span>
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Some careers are built for success. Others are designed to change lives. For <strong>Dr. Devejya Srivastava</strong>, Neuro Rehabilitation is not merely a profession — it is a lifelong mission driven by purpose, compassion and an unwavering belief in human potential.
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    His journey began with rigorous clinical training at <strong>Dr. Ram Manohar Lohia Hospital, Lucknow</strong> — one of North India&apos;s premier medical institutions — followed by valuable experience at <strong>Yashoda Hospital, Nehru Nagar, Ghaziabad.</strong> During those years, he had aspirations beyond healthcare and even planned to pursue a creative career in Mumbai as an artist.
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    But life had a different calling. While working closely with neurological patients and their families, he witnessed a painful reality — people from Gorakhpur and nearby districts had no option but to travel to metropolitan cities for specialised Neuro Rehabilitation. Families spent enormous amounts of time, money and emotional energy because advanced rehabilitation services simply did not exist close to home.
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    That realisation changed everything. Instead of leaving his hometown to pursue a different path, he made a conscious decision to return to Gorakhpur with a single, powerful vision — to build a dedicated Neuro Rehabilitation centre where patients could receive evidence-based, compassionate and world-class care without leaving their city.
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    That vision became <strong className="dark:text-white">Gorakhpur Mission Rehab</strong>. Today, it stands as a trusted destination for patients recovering from <strong>Stroke, Paralysis, Spinal Cord Injury, Brain Injury, Parkinson&apos;s Disease, Facial Palsy, Balance &amp; Gait Disorders, Vestibular Disorders</strong> and <strong>Pediatric Neurological Conditions</strong>.
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Every rehabilitation programme is personalised — because no two patients recover in the same way. Our approach blends modern neuroscience, neuroplasticity principles, functional rehabilitation and compassionate care with one ultimate goal: to restore independence and improve quality of life. The trust of hundreds of patients and <strong>360+ Google Reviews</strong> continues to inspire us every single day.
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Yet our journey is far from over. We envision <strong>Gorakhpur Mission Rehab</strong> as a centre of excellence in Neuro Rehabilitation — where advanced therapy, patient education, clinical research and professional training converge to elevate neurological care across Eastern Uttar Pradesh and beyond.
                  </p>

                  <div className="bg-gradient-to-r from-brand-600/10 via-accent-600/10 to-brand-600/10 rounded-2xl p-6 border border-brand-200 dark:border-brand-800 text-center">
                    <h3 className="text-lg font-bold text-navy-800 dark:text-white mb-2">Our Mission</h3>
                    <p className="text-2xl md:text-3xl font-extrabold text-gradient mb-2">From Disability to Ability</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
                      Because every movement regained is more than physical recovery — it is a step towards confidence, dignity and a better life.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-navy-800 rounded-2xl p-5 border border-slate-200 dark:border-navy-700">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                      {[
                        { label: "Patients Treated", value: "500+" },
                        { label: "Years Experience", value: "10+" },
                        { label: "Happy Families", value: "450+" },
                      ].map((s) => (
                        <div key={s.label}>
                          <p className="text-2xl font-extrabold text-gradient">{s.value}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-500 dark:to-accent-500 text-white font-semibold px-6 py-3 rounded-full shadow-xl dark:shadow-xl dark:shadow-black/10 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-black/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Book Appointment <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="mb-20">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 mb-3">Our Approach</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 dark:text-white mb-4">
                    Why Science-Backed Rehab{" "}
                    <span className="text-gradient">Matters</span>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">True neuro-recovery requires brain challenge, repetition, and the right therapeutic approach — not just passive modalities.</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {concepts.map((item) => (
                  <ScrollReveal key={item.title}>
                    <div className="group relative text-center p-8 bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 hover:border-brand-200 dark:hover:border-brand-600 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all">
                      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 dark:from-brand-900/30 via-transparent to-accent-50/30 dark:to-accent-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                      <div className="w-14 h-14 bg-gradient-to-br from-accent-50 dark:from-accent-900/30 to-brand-50 dark:to-brand-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all">
                        <item.icon className="w-7 h-7 text-accent-600 dark:text-accent-400" />
                      </div>
                      <h3 className="text-lg font-bold text-navy-800 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal>
              <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-3xl p-8 md:p-12 shadow-2xl dark:shadow-2xl dark:shadow-black/10 text-center">
                <Quote className="w-10 h-10 text-brand-400/50 dark:text-brand-300/50 mx-auto mb-4" />
                <blockquote className="text-xl md:text-2xl text-white font-medium italic max-w-4xl mx-auto leading-relaxed">
                  &ldquo;I chose to return to my hometown because I believe no family should have to leave their city in search of quality Neuro Rehabilitation. My mission is to ensure that every patient receives evidence-based, compassionate rehabilitation with dignity, hope and respect.&rdquo;
                </blockquote>
                <p className="text-brand-300 dark:text-brand-200 mt-4 font-semibold">— Dr. Devejya Srivastava (PT)</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-white dark:bg-navy-900 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-300/40 to-transparent dark:via-accent-700/40" />
          <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-bl from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 dark:text-white mb-4">
                  Clinic <span className="text-gradient">Location</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Visit us at Divyaman Hospital for your consultation</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ScrollReveal>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: "Address", value: "Divyaman Hospital, Bargadwa Bypass Road, Raptinagar Phase 1, Gorakhpur, Uttar Pradesh — 273001" },
                    { icon: Phone, label: "Phone", value: "+91 9616962072", href: "tel:+919616962072" },
                    { icon: Shield, label: "Hours", value: "Mon – Sat: 10:00 AM – 8:00 PM | Sunday: Closed" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-navy-800 dark:text-white text-sm">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 text-sm">{item.value}</a>
                        ) : (
                          <p className="text-slate-600 dark:text-slate-300 text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="relative rounded-2xl h-64 md:h-72 lg:h-80 border border-slate-200 dark:border-navy-700 shadow-lg dark:shadow-lg dark:shadow-black/10 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113963.35917819124!2d83.23025733232495!3d26.796823625280354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145e5c7df2057%3A0x58420cb04cd9d7ca!2sDr%20Devejya%20Srivastava%20Physiotherapist!5e0!3m2!1sen!2sin!4v1784874699996!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Divyaman Hospital, Gorakhpur — Location"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
