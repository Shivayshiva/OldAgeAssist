import { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Volunteer - Sirsa Foundation",
  description: "Join volunteer opportunities and make an impact in your community",
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/10">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}