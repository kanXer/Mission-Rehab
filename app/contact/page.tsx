import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "Contact Us & General Enquiry — Gorakhpur Mission Rehab",
  description:
    "Contact Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur. Book a consultation or send a general enquiry.",
  openGraph: {
    title: "Contact Us | Gorakhpur Mission Rehab",
    description:
      "Reach out to Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur. Book a consultation or send a general enquiry.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/contact`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Gorakhpur Mission Rehab — Neuro Rehabilitation Center in Gorakhpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Gorakhpur Mission Rehab",
    description:
      "Reach out to Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur. Book a consultation or send a general enquiry.",
    images: [`${siteUrl}/og-image.jpg`],
  },
}

import TopBar from "@/components/TopBar"

export default function ContactPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main id="main-content" className="pt-0">
        <Contact />
      </main>
      <Footer />
    </>
  )
}
