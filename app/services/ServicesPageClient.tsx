"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Brain, Bone, Footprints, Heart, Accessibility, Activity,
  Baby, User, CheckCircle, ArrowRight, Phone, MessageSquare,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"

const serviceDetails: Record<string, { icon: any; desc: string; highlights: string[]; image: string }> = {
  "Stroke & Paralysis Rehabilitation": {
    icon: Brain,
    desc: "Neuroplasticity-based brain retraining to rebuild movement, speech, and independence after stroke, paralysis, or brain injury.",
    highlights: ["Task-specific motor training", "Cognitive & speech co-therapy", "Spasticity management", "Functional electrical stimulation"],
    image: "/stroke.jpeg",
  },
  "Gait & Balance Rehabilitation": {
    icon: Activity,
    desc: "Advanced gait analysis and balance training to improve walking patterns, prevent falls, and restore confident mobility.",
    highlights: ["Gait retraining", "Balance & coordination drills", "Fall prevention therapy", "Assistive device training"],
    image: "/balGet.jpeg",
  },
  "Pediatric Neuro Rehabilitation": {
    icon: Baby,
    desc: "Early intervention therapy for children with developmental delays, cerebral palsy, and neurological conditions to improve motor milestones.",
    highlights: ["Play-based therapy", "Gross motor skill training", "Parent education program", "Sensory integration"],
    image: "/Pediatric-rehab.jpeg",
  },
  "Foot & Ankle Rehabilitation": {
    icon: Footprints,
    desc: "Biomechanical assessment and targeted therapy for plantar fasciitis, heel spurs, ankle sprains, and foot disorders.",
    highlights: ["Gait retraining", "Custom orthotics advice", "Stretching & mobilization", "Shockwave therapy"],
    image: "/ankles.jpeg",
  },
  "Parkinson's Disease & Movement Disorders": {
    icon: Activity,
    desc: "Specialized therapy for Parkinson's disease focusing on gait improvement, balance training, and maintaining functional independence.",
    highlights: ["LSVT BIG therapy", "Balance & fall prevention", "Freezing of gait management", "Daily living retraining"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
  },
  "Knee, Hip & Joint Pain": {
    icon: Bone,
    desc: "Non-surgical management of knee, hip, and joint pain through targeted exercises, mobilization, and pain relief modalities.",
    highlights: ["Joint mobilization", "Muscle strengthening", "Pain management", "Activity modification"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  "Spinal Cord Injury Rehabilitation": {
    icon: Bone,
    desc: "Comprehensive rehabilitation for spinal cord injuries focusing on mobility restoration, strength rebuilding, and adaptive independence.",
    highlights: ["Bed mobility & transfers", "Wheelchair skills training", "Bladder/bowel management", "Upper body strengthening"],
    image: "/Spinal-cord-Injury-rehab.jpeg",
  },
  "Brain Injury (TBI) Rehabilitation": {
    icon: Brain,
    desc: "Targeted neuro-rehabilitation for traumatic and acquired brain injuries to restore cognitive and physical function.",
    highlights: ["Cognitive retraining", "Vision & vestibular therapy", "Balance & coordination", "Community reintegration"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  "Facial Palsy / Bell's Palsy": {
    icon: User,
    desc: "Specialized neuromuscular re-education for facial paralysis including Bell's palsy to restore symmetry and expression.",
    highlights: ["Facial muscle retraining", "Neuromuscular stimulation", "Mirror therapy", "Oral motor exercises"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
  },
  "Cerebral Palsy (CP)": {
    icon: Baby,
    desc: "Early intervention and ongoing therapy for children with cerebral palsy to maximize motor function, mobility, and independence.",
    highlights: ["Gross motor skill training", "Contracture prevention", "Gait training", "Adaptive equipment"],
    image: "https://images.unsplash.com/photo-1685362158423-abf004b858d2?w=600&q=80",
  },
  "Multiple Sclerosis (MS)": {
    icon: Activity,
    desc: "Comprehensive rehabilitation for multiple sclerosis patients to manage symptoms, improve mobility, and maintain quality of life.",
    highlights: ["Fatigue management", "Balance & gait training", "Strength & flexibility", "Energy conservation"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
  },
  "Guillain-Barré Syndrome (GBS)": {
    icon: Activity,
    desc: "Structured neuro-rehabilitation for GBS recovery focusing on muscle strengthening, functional retraining, and gradual return to daily activities.",
    highlights: ["Progressive strengthening", "Sensory retraining", "Functional mobility", "Respiratory muscle training"],
    image: "/GB.jpeg",
  },
  "Vestibular Rehabilitation (Vertigo / Dizziness)": {
    icon: Accessibility,
    desc: "Specialized vestibular therapy to reduce vertigo, improve balance, and eliminate dizziness through canal repositioning and habituation exercises.",
    highlights: ["Canalith repositioning", "Vestibular habituation", "Balance retraining", "Gaze stabilization"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
  },
  "Frozen Shoulder": {
    icon: Bone,
    desc: "Targeted physiotherapy for frozen shoulder (adhesive capsulitis) to restore range of motion, reduce pain, and speed recovery.",
    highlights: ["Joint mobilization", "Stretching exercises", "Pain relief modalities", "Home exercise program"],
    image: "/Shoulder-rehab.jpeg",
  },
  "Shoulder Pain & Rotator Cuff Injury": {
    icon: Bone,
    desc: "Comprehensive shoulder rehabilitation for rotator cuff injuries, impingement, and shoulder pain through conservative management.",
    highlights: ["Rotator cuff strengthening", "Scapular stabilization", "Postural correction", "Activity modification"],
    image: "/Shoulder-rehab.jpeg",
  },
  "Osteoarthritis Rehabilitation": {
    icon: Bone,
    desc: "Evidence-based management of osteoarthritis through exercise therapy, joint protection, and pain management strategies.",
    highlights: ["Low-impact exercises", "Joint protection education", "Pain management", "Functional training"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  "ACL / Sports Rehabilitation": {
    icon: Activity,
    desc: "Rapid recovery and return-to-sport programs for ACL injuries and sports-related conditions using advanced rehabilitation techniques.",
    highlights: ["Sport-specific rehab", "Strength & conditioning", "Injury prevention", "Return-to-play testing"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  "Post-Fracture Rehabilitation": {
    icon: Accessibility,
    desc: "Structured post-fracture rehabilitation programs to restore function, rebuild strength, and prevent complications after fracture healing.",
    highlights: ["Range of motion restoration", "Strength rebuilding", "Gait retraining", "Functional return"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
  },
}

interface Service {
  title: string
  category: string
}

const categoryOrder = ["Neurological", "Pediatric", "Orthopaedic"]

export default function ServicesPageClient() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { if (data.services) setServices(data.services) })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

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
              <div className="text-center mb-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">Specialized Care</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-800 dark:text-white mb-4">
                  Comprehensive Neuro-Rehabilitation{" "}
                  <span className="text-gradient">Services</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
                  Every condition is unique — we design personalized therapy plans targeting the root cause of neurological and movement disorders. All services are directed by Dr. Devejya Srivastava (PT), one of the top neurological physiotherapists in India.
                </p>
              </div>
            </ScrollReveal>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-20 mt-16">
                {services.map((item, i) => {
                  const details = serviceDetails[item.title]
                  if (!details) return null
                  const Icon = details.icon
                  return (
                    <ScrollReveal key={item.title}>
                      <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 lg:gap-12 items-center`}>
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            <Icon className="w-3.5 h-3.5" />
                            {item.category}
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-navy-800 dark:text-white mb-3">{item.title}</h2>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{details.desc}</p>
                          <ul className="space-y-2 mb-6">
                            {details.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                                <CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/book-appointment"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all hover:scale-105 active:scale-95"
                          >
                            Book Appointment <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                        <div className="flex-1 w-full lg:max-w-lg">
                          <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-brand-400/20 dark:from-brand-600/20 to-accent-400/20 dark:to-accent-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative rounded-xl overflow-hidden shadow-xl dark:shadow-xl dark:shadow-black/10">
                              <Image
                                src={details.image}
                                alt={item.title}
                                width={600}
                                height={400}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            )}

            <ScrollReveal>
              <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-navy-800 rounded-3xl p-8 border border-slate-200 dark:border-navy-700 shadow-xl">
                  <h2 className="text-2xl font-bold text-navy-800 dark:text-white mb-2">Conditions We Treat</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
                    Beyond the services above, our neuro rehabilitation specialists routinely manage:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Paralysis physiotherapy treatment</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Stroke recovery physiotherapy &amp; post-stroke physio exercises</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Paraplegia physiotherapy center care</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Quadriplegia rehab therapy</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Ataxia balance therapy</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Neuropathy physiotherapy treatment</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Multiple sclerosis physiotherapy</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />ALS physical therapy rehabilitation</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Sciatica &amp; nerve compression physio</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Brachial plexus injury rehabilitation</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Parkinson&apos;s rehab center programs</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Muscle spasticity therapy &amp; mobility management</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Developmental delay physio for children</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Plantar fasciitis physiotherapy treatment</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-navy-800 dark:to-navy-800 rounded-3xl p-8 border border-brand-100 dark:border-navy-700 shadow-xl">
                  <h2 className="text-2xl font-bold text-navy-800 dark:text-white mb-2">Advanced Therapy Techniques</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
                    Science-backed methods used by our senior neuro physiotherapists:
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Neurodevelopmental therapy (NDT) &amp; Bobath neuro physiotherapy</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Constraint induced movement therapy (CIMT)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Proprioceptive neuromuscular facilitation (PNF)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Functional electrical stimulation (FES) for paralysis</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Robotic gait training rehabilitation &amp; balance and coordination rehab</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />Science-backed neuroplasticity rehabilitation</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="text-center mt-16 bg-gradient-to-r from-navy-800 to-navy-700 rounded-3xl p-10 shadow-2xl dark:shadow-2xl dark:shadow-black/10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Not Sure Which Service You Need?</h2>
                <p className="text-slate-300 dark:text-slate-400 mb-6 max-w-xl mx-auto">Call Dr. Devejya directly. We&apos;ll help you find the right treatment path.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:+919616962072" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all hover:scale-105">
                    <Phone className="w-4 h-4" /> Call +91 9616962072
                  </a>
                  <a href="https://wa.me/919616962072" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-navy-800 text-navy-800 dark:text-white font-semibold px-6 py-3 rounded-full shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all hover:scale-105">
                    <MessageSquare className="w-4 h-4 text-accent-600 dark:text-accent-400" /> WhatsApp Now
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
