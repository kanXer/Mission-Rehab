import { MapPin, ExternalLink } from "lucide-react"
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
    <section className="relative py-16 md:py-24 bg-white dark:bg-navy-800 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
              Our Location
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 dark:text-white mb-4">
              Find Us on{" "}
              <span className="text-gradient">Google Maps</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Divyaman Hospital, Bargadwa Bypass Road, Gorakhpur — the leading
              neuro physiotherapy clinic in Raptinagar, Gorakhpur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-700 shadow-lg h-[300px] md:h-[400px]">
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

            <div className="bg-slate-50 dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-700">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-navy-800 dark:text-white">Divyaman Hospital</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Gorakhpur Mission Rehab</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Bargadwa Bypass Road, Raptinagar Phase 1, Gorakhpur, Uttar Pradesh — 273001
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}