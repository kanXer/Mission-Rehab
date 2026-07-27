import Link from "next/link"
import { Instagram, Activity, Phone, MapPin, Facebook, Linkedin, Mail, Heart } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Dr. Devejya", href: "/about" },
  { label: "Neuro Rehab", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="bg-navy-800 dark:bg-navy-950 text-slate-300 dark:text-slate-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-brand-500/5 to-accent-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-accent-500/5 to-brand-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-accent-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-600/20 dark:shadow-brand-900/40">
                <Activity className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="text-lg font-bold text-white">Gorakhpur Mission Rehab</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 dark:text-slate-500 max-w-xs lg:max-w-none">
              Specialized Neuro Rehabilitation Center under the direction of Dr. Devejya
              Srivastava (PT). From Disability to Ability — rebuilding lives through
              science-backed neuroplasticity therapy.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com/gorakhpur_missionrehab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-pink-400 transition-colors hover:scale-110 inline-block"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/gorakhpurmissionrehab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-blue-400 transition-colors hover:scale-110 inline-block"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-blue-500 transition-colors hover:scale-110 inline-block"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-green-400 transition-colors hover:scale-110 inline-block text-xs font-medium"
                aria-label="JustDial"
              >
                JD
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-200 transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Specializations
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Stroke &amp; Paralysis Recovery</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Spinal Cord Injury Rehab</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Gait &amp; Balance Training</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Pediatric Neuro-Physiotherapy</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Plantar Fasciitis &amp; Foot Biomechanics</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Spasticity &amp; Mobility Management</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 dark:text-slate-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-3 h-4 text-brand-400 dark:text-brand-300 shrink-0 mt-0.5" />
                <span>
                  Divyaman Hospital
                  <br />
                  Bargadwa Bypass, Raptinagar Phase 1
                  <br />
                  Gorakhpur, UP — 273001
                </span>
              </li>
              <li>
                <a
                  href="tel:+919616962072"
                  className="flex items-center gap-2 hover:text-white dark:hover:text-slate-200 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-brand-400 dark:text-brand-300 shrink-0 group-hover:scale-110 transition-transform" />
                  +91 9616962072
                </a>
              </li>
              <li>
                <a
                  href="mailto:gorakhpurmissionrehab@gmail.com"
                  className="flex items-center gap-2 hover:text-white dark:hover:text-slate-200 transition-colors break-all group"
                >
                  <Mail className="w-4 h-4 text-brand-400 dark:text-brand-300 shrink-0 group-hover:scale-110 transition-transform" />
                  gorakhpurmissionrehab@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 dark:border-navy-600 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            &copy; {new Date().getFullYear()} Gorakhpur Mission Rehab. All rights reserved.
            <Heart className="w-3 h-3 text-red-400/50 ml-1" aria-hidden="true" />
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Created by{" "}
            <a href="https://nexusdigitalmarketingcompany.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-white dark:hover:text-slate-200 transition-colors font-medium">
              Nexus Digital Marketing Company
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
