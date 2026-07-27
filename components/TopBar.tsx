import { Phone, MapPin, Calendar, Linkedin } from "lucide-react"
import Link from "next/link"

export default function TopBar() {
  return (
    <>
      <div className="hidden md:block bg-navy-800 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-4">
              <a
                href="tel:+919616962072"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Emergency: +91 9616962072</span>
              </a>
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Divyaman Hospital, Bargadwa Bypass, Gorakhpur</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/gorakhpur_missionrehab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
              >
                Instagram
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://facebook.com/gorakhpurmissionrehab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Facebook
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 inline" />
                <span className="ml-1">LinkedIn</span>
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-400 transition-colors"
              >
                JustDial
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl">
        <div className="flex items-center gap-2 px-3 py-2">
          <a
            href="tel:+919616962072"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold py-3 rounded-xl shadow-md active:scale-[0.97] transition-transform"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <Link
            href="/book-appointment"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-sm font-semibold py-3 rounded-xl shadow-md active:scale-[0.97] transition-transform"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </Link>
        </div>
      </div>
    </>
  )
}
