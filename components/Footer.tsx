import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Mail, Heart } from "lucide-react"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa"

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
      {/* Top Border & Decorative Blur Effects */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-brand-500/5 to-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-accent-500/5 to-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1 flex flex-col items-center sm:items-start">
            <div className="flex justify-center sm:justify-start mb-4 w-full">
              <Image
                src="/GMRLogo.png"
                alt="Gorakhpur Mission Rehab Logo"
                width={200}
                height={200}
                quality={100}
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 dark:text-slate-500 max-w-sm sm:max-w-none">
              Specialized Neuro Rehabilitation Center under the direction of Dr. Devejya
              Srivastava (PT). From Disability to Ability — rebuilding lives through
              science-backed neuroplasticity therapy.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-5 w-full">
              <a
                href="https://instagram.com/gorakhpur_missionrehab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800/50 dark:bg-slate-900/50 text-slate-400 hover:text-pink-400 hover:bg-slate-800 transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/gorakhpurmissionrehab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800/50 dark:bg-slate-900/50 text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800/50 dark:bg-slate-900/50 text-slate-400 hover:text-blue-500 hover:bg-slate-800 transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-full bg-slate-800/50 dark:bg-slate-900/50 text-slate-400 hover:text-green-400 hover:bg-slate-800 transition-all transform hover:scale-110 text-xs font-semibold"
                aria-label="JustDial"
              >
                JD
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-brand-500/30 pb-1 inline-block sm:border-none">
              Quick Links
            </h4>
            <ul className="space-y-2.5 w-full">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-200 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specializations */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-brand-500/30 pb-1 inline-block sm:border-none">
              Specializations
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500 w-full">
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Stroke &amp; Paralysis Recovery</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Spinal Cord Injury Rehab</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Gait &amp; Balance Training</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Pediatric Neuro-Physiotherapy</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Plantar Fasciitis &amp; Foot Biomechanics</li>
              <li className="hover:text-slate-200 dark:hover:text-slate-300 transition-colors">Spasticity &amp; Mobility Management</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-brand-500/30 pb-1 inline-block sm:border-none">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 dark:text-slate-500 w-full flex flex-col items-center sm:items-start">
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 max-w-xs sm:max-w-none">
                <MapPin className="w-4 h-4 text-brand-400 dark:text-brand-300 shrink-0 mt-0.5" />
                <span className="text-center sm:text-left">
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
                  className="flex items-center gap-2 hover:text-white dark:hover:text-slate-200 transition-colors group justify-center sm:justify-start"
                >
                  <Phone className="w-4 h-4 text-brand-400 dark:text-brand-300 shrink-0 group-hover:scale-110 transition-transform" />
                  +91 9616962072
                </a>
              </li>
              <li>
                <a
                  href="mailto:gorakhpurmissionrehab@gmail.com"
                  className="flex items-center gap-2 hover:text-white dark:hover:text-slate-200 transition-colors break-all group justify-center sm:justify-start"
                >
                  <Mail className="w-4 h-4 text-brand-400 dark:text-brand-300 shrink-0 group-hover:scale-110 transition-transform" />
                  gorakhpurmissionrehab@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-navy-700 dark:border-navy-600 mt-12 pt-8 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Gorakhpur Mission Rehab. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Created with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20 inline-block" aria-hidden="true" />
            <span>by</span>
            <a
              href="https://nexusdigitalmarketingcompany.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 dark:text-brand-400 dark:hover:text-brand-300 transition-colors font-semibold underline underline-offset-2 decoration-brand-600/30"
            >
              Nexus Digital Marketing Company
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
