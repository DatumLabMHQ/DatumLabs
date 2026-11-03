import { Funnel_Display, Funnel_Sans } from "next/font/google"

/* One family for the whole one-pager world: Funnel Display for headlines,
   Funnel Sans for everything else. Pages add `opFonts` to their root class. */

const display = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-op-display",
  display: "swap",
})

const sans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-op-sans",
  display: "swap",
})

export const opFonts = `${display.variable} ${sans.variable}`
