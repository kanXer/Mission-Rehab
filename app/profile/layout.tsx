import type { Metadata } from "next"

const siteUrl = "https://gorakhpurmission.in"

export const metadata: Metadata = {
  title: "My Profile | Gorakhpur Mission Rehab",
  description:
    "View and manage your Gorakhpur Mission Rehab account profile.",
  openGraph: {
    title: "My Profile | Gorakhpur Mission Rehab",
    description: "View and manage your Gorakhpur Mission Rehab account profile.",
    type: "website",
    locale: "en_IN",
    siteName: "Gorakhpur Mission Rehab",
    url: `${siteUrl}/profile`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Gorakhpur Mission Rehab — My Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Profile | Gorakhpur Mission Rehab",
    description: "View and manage your Gorakhpur Mission Rehab account profile.",
    images: [`${siteUrl}/og-image.jpg`],
  },
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}
