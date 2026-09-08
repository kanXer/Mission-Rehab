import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import ThemeProvider from "@/components/ThemeProvider"
import { AuthProvider } from "@/components/AuthProvider"
import LoadingBar from "@/components/LoadingBar"
import BackToTop from "@/components/BackToTop"
import ScrollToTop from "@/components/ScrollToTop"
import { ToastProvider } from "@/components/ToastProvider"
import StickyLeadDock from "@/components/StickyLeadDock"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const siteUrl = "https://gorakhpurmission.in"
const siteName = "Gorakhpur Mission Rehab"
const doctorName = "Dr. Devejya Srivastava (PT)"
const phone = "+919616962072"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Best Neuro Rehab Center in Gorakhpur | Gorakhpur Mission Rehab`,
    template: `%s | ${siteName}`,
  },
  description:
    `${doctorName} — Specialized Neuro Rehabilitation in Gorakhpur at Divyaman Hospital. Expert treatment for Stroke & Paralysis Recovery, Gait & Balance Training, Spinal Cord Injury, and Pediatric Neuro-Physiotherapy. Book appointment: ${phone}.`,
  keywords: [
    "neuro rehabilitation Gorakhpur",
    "best neuro physiotherapist in Gorakhpur",
    "stroke recovery treatment Gorakhpur",
    "paralysis rehab center near me",
    "Dr. Devejya Srivastava physiotherapist",
    "gait training Gorakhpur",
    "pediatric neuro physiotherapy Gorakhpur",
    "spinal cord injury rehab center",
    "Divyaman Hospital Gorakhpur physiotherapy",
    "physiotherapy in Gorakhpur",
  ],
  authors: [{ name: doctorName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "./" },
  openGraph: {
    title: `${siteName} | Neuro Rehabilitation Gorakhpur | ${doctorName}`,
    description:
      `From Disability to Ability — Specialized Neuro Rehabilitation in Gorakhpur by ${doctorName}. Stroke, Paralysis, Gait Training & Spinal Cord Rehab at Divyaman Hospital.`,
    type: "website",
    locale: "en_IN",
    siteName,
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} - ${doctorName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Neuro Rehabilitation Gorakhpur | ${doctorName}`,
    description:
      `From Disability to Ability — Specialized Neuro Rehabilitation in Gorakhpur by ${doctorName}. Stroke, Paralysis, Gait Training & Spinal Cord Rehab at Divyaman Hospital.`,
    images: [`${siteUrl}/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
}

const medicalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalBusiness", "Physiotherapy"],
      "@id": `${siteUrl}/#medicalbusiness`,
      name: siteName,
      description:
        `Specialized Neuro Rehabilitation Center directed by ${doctorName}. Expert physiotherapy for Stroke & Paralysis Recovery, Spinal Cord Injury Rehab, Gait & Balance Training, Pediatric Neuro-Physiotherapy, Plantar Fasciitis & Foot Biomechanics. Located at Divyaman Hospital, Gorakhpur.`,
      url: siteUrl,
      telephone: phone,
      email: "gorakhpurmissionrehab@gmail.com",
      foundingDate: "2020",
      founder: {
        "@type": "Person",
        name: "Dr. Devejya Srivastava",
        jobTitle: "Consultant Neuro Rehab Physiotherapist",
        description:
          "Experienced neuro rehabilitation specialist at Divyaman Hospital, Gorakhpur. Expertise in stroke recovery, gait correction, spinal cord rehab, pediatric neuro-physiotherapy, and plantar fasciitis treatment.",
        url: siteUrl,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Divyaman Hospital, Bargadwa Bypass Road, Raptinagar Phase 1",
        addressLocality: "Gorakhpur",
        addressRegion: "Uttar Pradesh",
        postalCode: "273001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.7606", // Gorakhpur local coordinates update kar sakte hain
        longitude: "83.3732",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        availableLanguage: ["Hindi", "English"],
      },
      medicalSpecialty: "PhysicalTherapy",
      areaServed: [
        { "@type": "City", name: "Gorakhpur" },
        { "@type": "City", name: "Deoria" },
        { "@type": "City", name: "Kushinagar" },
        { "@type": "City", name: "Maharajganj" },
        { "@type": "City", name: "Basti" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Neuro Rehabilitation Services",
        itemListElement: [
          { "@type": "Offer", name: "Stroke & Paralysis Recovery", url: `${siteUrl}/#services` },
          { "@type": "Offer", name: "Spinal Cord Injury Rehabilitation", url: `${siteUrl}/#services` },
          { "@type": "Offer", name: "Gait & Balance Training", url: `${siteUrl}/#services` },
          { "@type": "Offer", name: "Pediatric Neuro-Physiotherapy", url: `${siteUrl}/#services` },
          { "@type": "Offer", name: "Plantar Fasciitis & Foot Biomechanics", url: `${siteUrl}/#services` },
          { "@type": "Offer", name: "Spasticity Management & Joint Mobility", url: `${siteUrl}/#services` },
        ],
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "20:00",
        },
      ],
      image: `${siteUrl}/og-image.jpg`,
      sameAs: [
        "https://instagram.com/gorakhpur_missionrehab",
        "https://facebook.com/gorakhpurmissionrehab",
      ],
      priceRange: "₹₹",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description:
        `From Disability to Ability — ${doctorName}'s Specialized Neuro Rehabilitation Center in Gorakhpur. Expert physiotherapy for stroke, paralysis, gait disorders, and pediatric conditions.`,
      publisher: { "@type": "Person", name: "Dr. Devejya Srivastava" },
      inLanguage: "en-IN",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="overflow-x-clip" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          id="medical-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
        />
        {process.env.NODE_ENV === "production" && (
          <script
            id="theme-init"
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})()`,
            }}
          />
        )}
      </head>
      <body
        className={`${inter.className} antialiased bg-white dark:bg-navy-900 text-navy-800 dark:text-slate-100 transition-colors duration-300 overflow-x-clip min-h-screen w-full relative`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <LoadingBar />
        <BackToTop />
        <Analytics />
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
              <StickyLeadDock />
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
