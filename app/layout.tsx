import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google"
import Script from "next/script"
import { ConditionalAnalytics } from "@/components/conditional-analytics"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Datum Labs — Financial Data & Reporting for Blockchain Protocols",
  description:
    "Datum Labs is a financial data and reporting service for blockchain protocols. What your protocol earned, paid out, spent and kept last month — every figure traceable to the run behind it.",
  keywords: [
    "protocol financial reporting",
    "DeFi protocol P&L",
    "blockchain financial data",
    "protocol management accounts",
    "DeFi FP&A",
    "collateral risk file",
    "protocol revenue attribution",
    "DeFi analytics",
    "onchain data",
    "lending protocol analytics",
  ],
  authors: [{ name: "Datum Labs" }],
  creator: "Datum Labs",
  publisher: "Datum Labs",
  metadataBase: new URL("https://www.datumlab.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.datumlab.xyz",
    siteName: "Datum Labs",
    title: "Datum Labs — Financial Data & Reporting for Blockchain Protocols",
    description:
      "What your protocol earned, paid out, spent and kept last month — every figure traceable to the run behind it. Numbers you can defend in public.",
    images: [
      {
        url: "/brand/og-card.png",
        width: 1200,
        height: 630,
        alt: "Datum Labs — financial data and reporting for blockchain protocols",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Datum Labs — Financial Data & Reporting for Blockchain Protocols",
    description: "What your protocol earned, paid out, spent and kept last month. Numbers you can defend in public.",
    images: ["/brand/og-card.png"],
    creator: "@Datumlabs_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Note: no maximumScale/userScalable lock — it harms accessibility and, via
  // Next's viewport merging, would leak into /studio and make the embedded
  // Sanity Studio flicker.
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="light" className={`${geist.variable} ${geistMono.variable} ${sourceSerif.variable}`}>
      <head>
        {/* Google tag (gtag.js) — GA4, loaded on every page via the root layout. */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C79WV09XPD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C79WV09XPD');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased dl">
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        {/* v3 behaviors, ported verbatim from the redesign handoff. Every
            internal link is a plain <a> (full page load), so these re-run on
            each page exactly like the static build they were written for.
            Each script no-ops when its hooks are absent from the page. */}
        <Script src="/v3/site.js" strategy="afterInteractive" />
        <Script src="/v3/parallax.js" strategy="afterInteractive" />
        <Script src="/v3/nav-drop.js" strategy="afterInteractive" />
        <Script src="/v3/nav-theme.js" strategy="afterInteractive" />
        <Script src="/v3/dither.js" strategy="afterInteractive" />
        <Script src="/v3/faq.js" strategy="afterInteractive" />
        <Script src="/v3/forms.js" strategy="afterInteractive" />
        <ConditionalAnalytics />
      </body>
    </html>
  )
}
