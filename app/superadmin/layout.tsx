import { Metadata } from "next"
import type React from "react"
import { SuperAdminLayout } from "@/components/super-admin-layout"

export const metadata: Metadata = {
  title: "Super Admin - Sirsa Foundation",
  description: "Super Admin Dashboard for managing the Sirsa Foundation platform",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: true,
  },
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

export default function SuperAdminRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/10">
      <main className="container max-w-full mx-auto ">
        <SuperAdminLayout>{children}</SuperAdminLayout>
      </main>
    </div>
  )
}