import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/ui/navigation"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Culturele INTROWEEK MBO 2026 | Amsterdam",
  description:
    "Meer dan 60 culturele instellingen openen hun deuren voor alle mbo-studenten in Amsterdam. 31 augustus - 4 september 2026.",
  keywords: ["MBO", "Amsterdam", "Cultuur", "Introweek", "Onderwijs", "Culturele instellingen"],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
