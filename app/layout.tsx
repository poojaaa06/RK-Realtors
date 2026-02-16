import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900']
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'RK Realtors | Premium Real Estate Development Mumbai',
  description: 'Discover luxury residential projects in Mumbai, Mira Road & Malad. Premium apartments, modern architecture, and exceptional living spaces by RK Realtors.',
  generator: 'v0.app',
  openGraph: {
    title: 'RK Realtors | Premium Real Estate Development',
    description: 'Luxury residential projects in Mumbai',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
