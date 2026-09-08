import { Phone, MapPin, Calendar, Clock, MessageSquare } from "lucide-react"
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa"
import Link from "next/link"
import JustdialIcon from "./JustdialIcon"

export default function TopBar() {
  return (
    <>
      {/* Desktop Medical Practice Top Bar */}
      <div className="hidden md:block bg-navy-900 border-b border-navy-800 text-white text-xs py-1.5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-7">
            {/* Left: Emergency & Clinic Info */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+919616962072"
                className="flex items-center gap-1.5 font-semibold text-rose-300 hover:text-white transition-colors"
                title="Immediate Doctor Assistance"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <Phone className="w-3 h-3 text-rose-400" />
                <span>Doctor Helpline: +91 9616962072</span>
              </a>

              <span className="text-navy-700">|</span>

              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3 h-3 text-brand-400" />
                <span>Divyaman Hospital, Bargadwa Bypass, Gorakhpur</span>
              </span>

              <span className="text-navy-700">|</span>

              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3 h-3 text-accent-400" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </span>
            </div>

            {/* Right: Quick Inquiries & Verified Profiles */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-[11px] border border-amber-500/30 animate-pulse">
                <span>⚡ Free Initial Assessment Available Today</span>
              </span>

              <span className="text-navy-700">|</span>

              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com/gorakhpur_missionrehab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-pink-400 transition-colors"
                  aria-label="Instagram"
                  title="Instagram Profile"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://facebook.com/gorakhpurmissionrehab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                  title="Facebook Profile"
                >
                  <FaFacebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                  aria-label="LinkedIn"
                  title="Dr. Devejya Srivastava LinkedIn"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform inline-flex items-center"
                  aria-label="JustDial Verified"
                  title="Verified on JustDial"
                >
                  <JustdialIcon className="w-4 h-4 rounded" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
