import { MapPin, ExternalLink, Navigation, Clock, ShieldCheck, Phone } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const GOOGLE_CID = "6359659575143684042"
const GOOGLE_MAPS_URL = `https://maps.google.com/?cid=${GOOGLE_CID}`

// Fixed: Free iframe embed URL format using CID
const LAT = "26.7968246"
const LNG = "83.3826921"

// Direct Coordinates Embed
const GOOGLE_EMBED_URL = `https://maps.google.com/maps?q=${LAT},${LNG}&z=15&output=embed`

export default function GoogleProfile() {
  return (
    <section className="relative py-16 md:py-24 bg-slate-50 dark:bg-navy-900/50 overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800/60 mb-3 shadow-xs">
              <MapPin className="w-3.5 h-3.5" />
              In-Clinic Location &amp; Directions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Visit Us at <span className="text-gradient">Divyaman Hospital</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Easily accessible on Bargadwa Bypass Road, Gorakhpur with dedicated patient drop-off and parking facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 dark:border-navy-800 shadow-xl h-[320px] md:h-[420px] relative">
              <iframe
                src={GOOGLE_EMBED_URL}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gorakhpur Mission Rehab — Location"
              />
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-xl space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center shrink-0 border border-brand-200 dark:border-brand-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900 dark:text-white">Divyaman Hospital</h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">Gorakhpur Mission Rehab Clinic</p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Bargadwa Bypass Road, Raptinagar Phase 1, Gorakhpur, Uttar Pradesh — 273001
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Visiting Guide:</p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <span><strong>15 Mins</strong> from Gorakhpur Junction Railway Station</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <span>Wheelchair-accessible ramp &amp; elevators available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <span>Ample ambulance &amp; private vehicle parking</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex-1"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Live Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="tel:+919616962072"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-800 dark:text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-all border border-slate-200 dark:border-navy-700"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call Hospital</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}