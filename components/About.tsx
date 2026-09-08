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
  Stethoscope,
  Building2,
  CheckCircle2,
} from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import ScrollReveal from "./ScrollReveal"
import JustdialIcon from "./JustdialIcon"

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
    <section id="about" className="relative py-16 md:py-24 bg-white dark:bg-navy-950 overflow-hidden transition-colors">
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/50 to-transparent dark:via-brand-700/50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/15 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/15 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800/60 mb-3 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              Doctor Profile &amp; Clinical Background
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Meet <span className="text-gradient">Dr. Devejya Srivastava</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Consultant Neuro Rehab Physiotherapist dedicated to rebuilding lives through science-backed, compassionate care at Divyaman Hospital, Gorakhpur.
            </p>
          </div>
        </ScrollReveal>

        {/* Doctor Story & Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* Doctor Portrait Card (Left) */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="sticky top-28 space-y-5">
                <div className="bg-slate-50 dark:bg-navy-900 rounded-3xl p-3 border-2 border-slate-200 dark:border-navy-800 shadow-xl overflow-hidden relative">
                  <div className="relative w-full h-[26rem] sm:h-[30rem] rounded-2xl overflow-hidden bg-slate-200 dark:bg-navy-950">
                    <Image
                      src="/doctor.jpg"
                      alt="Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab Physiotherapist"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 1024px) 100vw, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xl font-bold tracking-tight">Dr. Devejya Srivastava (PT)</p>
                        <span className="text-xs bg-brand-500/80 px-2 py-0.5 rounded text-white font-semibold">Verified</span>
                      </div>
                      <p className="text-brand-200 text-xs sm:text-sm font-medium">Consultant Neuro Rehab Physiotherapist</p>
                      <p className="text-slate-300 text-xs mt-1">BPT (Physiotherapist)</p>

                      <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-white/15">
                        <a
                          href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/15 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-white"
                          aria-label="LinkedIn Profile"
                          title="LinkedIn Profile"
                        >
                          <FaLinkedin className="w-4 h-4" />
                        </a>
                        <a
                          href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-white/15 hover:bg-white/30 rounded-lg flex items-center gap-1.5 transition-all hover:scale-110 text-white text-[11px] font-bold"
                          aria-label="JustDial Verified"
                          title="JustDial Verified"
                        >
                          <JustdialIcon className="w-4 h-4 rounded" />
                          <span>Justdial Verified</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clinical Qualifications Card */}
                <div className="bg-slate-50 dark:bg-navy-900 rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    Qualifications &amp; Clinical Pedigree
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>BPT (Bachelor of Physiotherapy)</strong> — Specialized in Advanced Neurological Rehabilitation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Ex-Resident, <strong>Dr. Ram Manohar Lohia Hospital, Lucknow</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Ex-Physiotherapist, <strong>Yashoda Hospital, Nehru Nagar, Ghaziabad</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Director &amp; Lead Consultant, <strong>Gorakhpur Mission Rehab at Divyaman Hospital</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Doctor Story & Vision (Right) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/60">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> 10+ Years Clinical Experience
                </span>
                <span className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-200 dark:border-brand-800/60">
                  <GraduationCap className="w-3.5 h-3.5" /> BPT (Physiotherapist)
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                  <Heart className="w-3.5 h-3.5" /> 500+ Patients Treated
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white leading-tight">
                A Purpose Beyond <span className="text-gradient">Profession</span>
              </h3>
            </ScrollReveal>

            {/* Preserving exact doctor story paragraphs verbatim */}
            <ScrollReveal>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Some careers are built for success. Others are designed to change lives. For <strong>Dr. Devejya Srivastava</strong>, Neuro Rehabilitation is not merely a profession — it is a lifelong mission driven by purpose, compassion and an unwavering belief in human potential.
                </p>

                <p>
                  His journey began with rigorous clinical training at <strong>Dr. Ram Manohar Lohia Hospital, Lucknow</strong> — one of North India&apos;s premier medical institutions — followed by valuable experience at <strong>Yashoda Hospital, Nehru Nagar, Ghaziabad.</strong> During those years, he had aspirations beyond healthcare and even planned to pursue a creative career in Mumbai as an artist.
                </p>

                <p>
                  But life had a different calling. While working closely with neurological patients and their families, he witnessed a painful reality — people from Gorakhpur and nearby districts had no option but to travel to metropolitan cities for specialised Neuro Rehabilitation. Families spent enormous amounts of time, money and emotional energy because advanced rehabilitation services simply did not exist close to home.
                </p>

                <p>
                  That realisation changed everything. Instead of leaving his hometown to pursue a different path, he made a conscious decision to return to Gorakhpur with a single, powerful vision — to build a dedicated Neuro Rehabilitation centre where patients could receive evidence-based, compassionate and world-class care without leaving their city.
                </p>

                <p>
                  That vision became <strong className="text-navy-900 dark:text-white font-bold">Gorakhpur Mission Rehab</strong>. Today, it stands as a trusted destination for patients recovering from <strong>Stroke, Paralysis, Spinal Cord Injury, Brain Injury, Parkinson&apos;s Disease, Facial Palsy, Balance &amp; Gait Disorders, Vestibular Disorders</strong> and <strong>Pediatric Neurological Conditions</strong>.
                </p>

                <p>
                  Every rehabilitation programme is personalised — because no two patients recover in the same way. Our approach blends modern neuroscience, neuroplasticity principles, functional rehabilitation and compassionate care with one ultimate goal: to restore independence and improve quality of life. The trust of hundreds of patients and <strong>360+ Google Reviews</strong> continues to inspire us every single day.
                </p>

                <p>
                  Yet our journey is far from over. We envision <strong>Gorakhpur Mission Rehab</strong> as a centre of excellence in Neuro Rehabilitation — where advanced therapy, patient education, clinical research and professional training converge to elevate neurological care across Eastern Uttar Pradesh and beyond.
                </p>
              </div>
            </ScrollReveal>

            {/* Mission Statement Box */}
            <ScrollReveal>
              <div className="bg-gradient-to-r from-brand-600/10 via-accent-600/10 to-brand-600/10 rounded-2xl p-6 border border-brand-200 dark:border-brand-800 text-center">
                <h4 className="text-sm font-bold uppercase tracking-wider text-navy-800 dark:text-white mb-1">Our Core Clinical Philosophy</h4>
                <p className="text-2xl sm:text-3xl font-extrabold text-gradient mb-2">From Disability to Ability</p>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                  Because every movement regained is more than physical recovery — it is a step towards confidence, dignity and a better life.
                </p>
              </div>
            </ScrollReveal>

            {/* Practice Statistics */}
            <ScrollReveal>
              <div className="bg-slate-50 dark:bg-navy-900 rounded-2xl p-5 border border-slate-200 dark:border-navy-800 shadow-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-gradient">500+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Patients Treated</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-gradient">10+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-gradient">450+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Happy Families</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 items-center pt-2">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-600/20 hover:shadow-xl transition-all text-sm active:scale-95"
                >
                  <span>Book In-Clinic Appointment</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+919616962072"
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-navy-900 dark:text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all border border-slate-200 dark:border-navy-700"
                >
                  <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Direct Doctor Call</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scientific Neuro Concepts - Prominently Displayed */}
        <div className="pt-8 mb-20 border-t border-slate-200 dark:border-navy-800">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-2">
                Clinical Methodology
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mb-3">
                Why Science-Backed Neuro-Rehab <span className="text-gradient">Matters</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                True neurological recovery requires brain challenge, repetition, and evidence-based protocols — not just passive modalities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {concepts.map((item) => (
              <ScrollReveal key={item.title}>
                <div className="bg-slate-50 dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 hover:border-brand-300 dark:hover:border-brand-700 transition-all hover:shadow-lg flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/40 dark:to-accent-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 border border-brand-200/50 dark:border-brand-800/40">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-navy-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Doctor Inspirational Quote Card */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-8 sm:p-12 border border-navy-700 shadow-2xl relative overflow-hidden mb-16 text-center">
            <Quote className="w-10 h-10 text-brand-400/40 mx-auto mb-4" />
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium italic max-w-3xl mx-auto leading-relaxed text-slate-100">
              &ldquo;I chose to return to my hometown because I believe no family should have to leave their city in search of quality Neuro Rehabilitation. My mission is to ensure that every patient receives evidence-based, compassionate rehabilitation with dignity, hope and respect.&rdquo;
            </blockquote>
            <p className="text-brand-300 font-bold text-sm sm:text-base mt-4">— Dr. Devejya Srivastava (PT)</p>
            <p className="text-xs text-slate-400 mt-0.5">Consultant Neuro Rehab Physiotherapist, Gorakhpur</p>
          </div>
        </ScrollReveal>

        {/* Local SEO Summary Footer Block - 100% Preserved */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-navy-800">
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong className="text-navy-900 dark:text-white">Gorakhpur Mission Rehab</strong> — Directed by{" "}
              <strong className="text-navy-900 dark:text-white">Dr. Devejya Srivastava (PT)</strong>, we are a specialized{" "}
              <strong className="text-navy-900 dark:text-white">neuro rehabilitation center in Gorakhpur</strong> located at{" "}
              <strong className="text-navy-900 dark:text-white">Divyaman Hospital, Bargadwa Bypass, Raptinagar Phase 1</strong>. We serve patients from across{" "}
              <strong className="text-navy-900 dark:text-white">Gorakhpur, Deoria, Kushinagar, Maharajganj, and Basti</strong> seeking{" "}
              <strong className="text-navy-900 dark:text-white">affordable physiotherapy</strong> for stroke recovery, paralysis treatment, spinal cord injury rehab, pediatric neuro care, gait training, and fall prevention.{" "}
              <strong className="text-navy-900 dark:text-white">Home visit physiotherapy</strong> also available across Gorakhpur for patients with limited mobility.{" "}
              <strong className="text-navy-900 dark:text-white">Book an appointment</strong> with the{" "}
              <strong className="text-navy-900 dark:text-white">best physiotherapist near you</strong> in Gorakhpur today.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

