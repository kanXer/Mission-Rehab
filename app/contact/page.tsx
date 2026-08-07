import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"

export const metadata: Metadata = {
  title: "Contact Us & General Enquiry — Gorakhpur Mission Rehab",
  description:
    "Contact Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur. Book a consultation or enquiry for neuro rehab & home visit physiotherapy.",
  keywords: [
    "neuro physiotherapist for home visit near me",
    "paralysis physio treatment at home",
    "contact neuro rehab center Gorakhpur",
    "best neuro physiotherapy clinic near me",
    "gorakhpur mission rehab clinic",
    "neuro physiotherapy clinic in raptinagar gorakhpur",
    "paralysis physio treatment bargadwa bypass gorakhpur",
  ],
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 md:pt-24">
        <Contact />
      </main>
      <Footer />
    </>
  )
}
