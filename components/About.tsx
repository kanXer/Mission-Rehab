'use client'

import Image from "next/image"
import Link from "next/link"
import {
  Award,
  Star,
  MapPin,
  Phone,
  BookOpen,
  Brain,
  UserCheck,
  Quote,
  GraduationCap,
  Heart,
  Shield,
  ChevronRight,
} from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import ScrollReveal from "./ScrollReveal"
import TypewriterText from "./TypewriterText"

const concepts = [
  {
    icon: Brain,
    title: "Neuroplasticity-Based Recovery",
    desc: "The brain can rewire itself after stroke, brain injury, or paralysis. Our therapy uses task-specific training and cognitive challenge to forge new neural pathways — not just passive exercises. This is the core of our brain retraining therapy in Gorakhpur.",
  },
  {
    icon: UserCheck,
    title: "Task-Specific Gait & Balance Training",
    desc: "Recovery isn't about static standing. We train real-world movements — walking, reaching, balancing — to rebuild functional independence. Our fall prevention therapy and gait correction program helps Parkinson's and elderly patients regain confidence.",
  },
  {
    icon: BookOpen,
    title: "Research-Backed Neuro Rehab Protocols",
    desc: "Every protocol is grounded in the latest neuro-rehabilitation research. We measure progress with objective gait analysis and mobility assessments. From post-stroke physiotherapy to spinal cord rehab — every plan is evidence-based and personalized.",
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 bg-slate-50 dark:bg-navy-900 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
      <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
              About Us
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-800 dark:text-white mb-4">
              <TypewriterText text="Meet " speed={70} delay={200} />
              <TypewriterText text="Dr. Devejya Srivastava" speed={55} delay={600} className="text-gradient" />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
              Consultant Neuro Rehab Physiotherapist dedicated to rebuilding lives through science-backed, compassionate care at Divyaman Hospital, Gorakhpur.
            </p>
          </div>
        </ScrollReveal>

        {/* Doctor Profile & Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
          <ScrollReveal>
            <div className="relative sticky top-24">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-brand-200/30 dark:from-brand-800/30 to-accent-200/20 dark:to-accent-800/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-200/20 dark:from-accent-800/20 to-brand-200/20 dark:to-brand-800/20 rounded-full blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-2xl dark:shadow-black/20 border-4 border-white dark:border-navy-800">
                <Image
                  src="/doctor.jpg"
                  alt="Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab Physiotherapist"
                  width={600}
                  height={700}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/90 dark:from-black/90 to-transparent p-6">
                  <p className="text-white text-lg font-bold">Dr. Devejya Srivastava (PT)</p>
                  <p className="text-brand-200 text-sm">Consultant Neuro Rehab Physiotherapist</p>
                  <div className="flex items-center gap-3 mt-3">
                    <a
                      href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 text-white text-[10px] font-bold"
                      aria-label="JustDial"
                    >
                      JD
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-200 dark:border-yellow-800">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 10+ Years Experience
                </span>
                <span className="inline-flex items-center gap-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-200 dark:border-brand-800">
                  <GraduationCap className="w-3 h-3" /> BPT, MPT (Neuro)
                </span>
                <span className="inline-flex items-center gap-1 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-accent-200 dark:border-accent-800">
                  <Heart className="w-3 h-3" /> 500+ Patients Treated
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-800 dark:text-white">
                A Purpose Beyond <span className="text-gradient">Profession</span>
              </h3>

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
                Yet our journey is far from over. We envision <strong>Gorakhpur Mission Rehab</strong> as a centre of excellence in Neuro Rehabilitation — where advanced therapy, patient education, clinical research and professional training converge to elevate neurological care across Eastern Uttar Pradesh and beyond. Today, we are proud to be counted among the <strong>top neurological physiotherapists in India</strong> — bringing world-class care closer to families across Gorakhpur and Purvanchal.
              </p>

              <div className="bg-gradient-to-r from-brand-600/10 via-accent-600/10 to-brand-600/10 rounded-2xl p-6 border border-brand-200 dark:border-brand-800 text-center">
                <h4 className="text-lg font-bold text-navy-800 dark:text-white mb-2">Our Mission</h4>
                <p className="text-2xl md:text-3xl font-extrabold text-gradient mb-2">From Disability to Ability</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
                  Because every movement regained is more than physical recovery — it is a step towards confidence, dignity and a better life.
                </p>
              </div>

              <div className="bg-white dark:bg-navy-800 rounded-2xl p-5 border border-slate-200 dark:border-navy-700 shadow-sm">
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

              <div className="flex flex-wrap gap-4 items-center pt-2">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-500 dark:to-accent-500 text-white font-semibold px-6 py-3 rounded-full shadow-xl dark:shadow-black/10 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm"
                >
                  Book Appointment <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+919616962072"
                  className="inline-flex items-center gap-2 bg-slate-200 dark:bg-navy-800 hover:bg-slate-300 dark:hover:bg-navy-700 text-navy-800 dark:text-white font-semibold text-sm px-6 py-3 rounded-full transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400" /> Consult Dr. Devejya
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Local SEO Summary Footer Block */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-navy-800">
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong className="text-navy-800 dark:text-white">Gorakhpur Mission Rehab</strong> — Directed by{" "}
              <strong className="text-navy-800 dark:text-white">Dr. Devejya Srivastava (PT)</strong>, we are one of the{" "}
              <strong className="text-navy-800 dark:text-white">best neuro rehabilitation centers in Uttar Pradesh</strong> — recognised among the <strong className="text-navy-800 dark:text-white">best neuro rehabilitation centers in India</strong>, located at{" "}
              <strong className="text-navy-800 dark:text-white">Divyaman Hospital, Bargadwa Bypass, Raptinagar Phase 1</strong> — a{" "}
              <strong className="text-navy-800 dark:text-white">neuro physiotherapy clinic in Raptinagar, Gorakhpur</strong> near Medical College Road. We serve patients from across{" "}
              <strong className="text-navy-800 dark:text-white">Gorakhpur, Deoria, Kushinagar, Maharajganj, and Basti</strong> in{" "}
              <strong className="text-navy-800 dark:text-white">Eastern Uttar Pradesh and Purvanchal</strong> seeking{" "}
              <strong className="text-navy-800 dark:text-white">affordable neuro rehabilitation</strong> for stroke recovery, paralysis treatment, spinal cord injury rehab, pediatric neuro care, gait training, and fall prevention — without travelling to Lucknow.{" "}
              <strong className="text-navy-800 dark:text-white">Home visit physiotherapy near me</strong> also available across Gorakhpur for patients with limited mobility.{" "}
              <strong className="text-navy-800 dark:text-white">Book an appointment</strong> with the{" "}
              <strong className="text-navy-800 dark:text-white">best physiotherapist near you</strong> in Gorakhpur today.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
