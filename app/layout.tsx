import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const  viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: true,
  },

export const metadata: Metadata = {
  title: {
    default: "Sirsa Foundation - Empowering Elderly Lives",
    template: "%s | Sirsa Foundation"
  },
  description: "Sirsa Foundation is dedicated to supporting and empowering the elderly through various initiatives and programs.",
  keywords: [
    "Sirsa Foundation",
    "elderly care",
    "NGO",
    "charity",
    "donation",
    "old age home",
    "India",
    "support elders",
    "community service",
    "nonprofit"
  ],
  authors: [{ name: "Sirsa Foundation", url: "https://old-age-assist.vercel.app" }],
  creator: "Sirsa Foundation",
  publisher: "Sirsa Foundation",
  icons: {
    icon: [
      { url: "/Favicon32.png", media: "(prefers-color-scheme: light)" },
      { url: "/Favicon32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Sirsa Foundation - Empowering Elderly Lives",
    description: "Sirsa Foundation is dedicated to supporting and empowering the elderly through various initiatives and programs.",
    url: "https://old-age-assist.vercel.app",
    siteName: "Sirsa Foundation",
    images: [
      {
        url: "/Thumbnail512.png",
        width: 1200,
        height: 630,
        alt: "Sirsa Foundation - Empowering Elderly Lives"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sirsa Foundation - Empowering Elderly Lives",
    description: "Sirsa Foundation is dedicated to supporting and empowering the elderly through various initiatives and programs.",
    site: "@SirsaFoundation",
    creator: "@SirsaFoundation",
    images: [
      {
        url: "/Thumbnail512.png",
        alt: "Sirsa Foundation - Empowering Elderly Lives"
      }
    ]
  },
  metadataBase: new URL("https://old-age-assist.vercel.app"),
  category: "nonprofit",
  applicationName: "Sirsa Foundation",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
         <Providers>
        {children}
          
        <Analytics />
        </Providers>
      </body>
    </html>
  )
}
