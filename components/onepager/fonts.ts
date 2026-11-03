import localFont from "next/font/local"

/* One family for the whole one-pager world: Funnel Display for headlines,
   Funnel Sans for everything else. Pages add `opFonts` to their root class.
   Self-hosted (latin, variable 300–800, SIL OFL) because next/font/google
   failed to parse Google's response for these families on Vercel builds. */

const display = localFont({
  src: "./type/funnel-display.woff2",
  weight: "300 800",
  variable: "--font-op-display",
  display: "swap",
})

const sans = localFont({
  src: "./type/funnel-sans.woff2",
  weight: "300 800",
  variable: "--font-op-sans",
  display: "swap",
})

export const opFonts = `${display.variable} ${sans.variable}`

/* Beyond the Protocol's own voice: a heavy condensed grotesk for the show's
   wordmark and episode titles (Anton, SIL OFL, latin). Podcast page only. */
const anton = localFont({
  src: "./type/anton.woff2",
  weight: "400",
  variable: "--font-pod-display",
  display: "swap",
})

export const podFont = anton.variable
