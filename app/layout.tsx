import type { Metadata } from "next"
import { Inter, Space_Grotesk } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: "orenva | Unified Healthcare AI Platform",
  description:
    "orenva is a premium healthcare AI platform unifying consultation, pharmacy, therapy, fitness, insurance, and wellness commerce in one intelligent ecosystem.",
  keywords:
    "orenva, healthcare AI, AI doctor, digital health, pharmacy, therapy, insurance, wellness",
  openGraph: {
    title: "orenva | One place. Every solution",
    description: "Step inside the future of healthcare with orenva's immersive AI-powered ecosystem.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} page-home`}>{children}</body>
    </html>
  )
}
