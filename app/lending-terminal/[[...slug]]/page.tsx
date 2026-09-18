import type { Metadata } from "next"
import LendingTerminalIframe from "./client"

const OG_IMAGE_URL =
  "https://lending-intelligence-terminal.vercel.app/og-lending-terminal.png"
const CANONICAL_URL = "https://www.datumlab.xyz/lending-terminal"

export const metadata: Metadata = {
  title: "Ethereum Lending Terminal — Datum Labs",
  description:
    "Multi-protocol lending analytics on Ethereum: Aave V3, SparkLend, Morpho, Fluid, Compound V3, Euler V2. Live readings, monthly research.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: "Datum Labs",
    title: "Ethereum Lending Terminal — Datum Labs",
    description:
      "Multi-protocol lending analytics on Ethereum: Aave V3, SparkLend, Morpho, Fluid, Compound V3, Euler V2.",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Ethereum Lending Terminal · Datum Labs Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethereum Lending Terminal — Datum Labs",
    description:
      "Multi-protocol lending analytics on Ethereum. Six protocols, one terminal.",
    images: [OG_IMAGE_URL],
  },
}

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

/**
 * Optional catch-all route for `/lending-terminal/*`. The dashboard itself
 * lives at https://lending-intelligence-terminal.vercel.app and is embedded
 * via iframe — but because the parent owns the URL bar, deep paths like
 * `/lending-terminal/protocols?p=spark` need a real route here, otherwise
 * Next.js returns 404 on reload.
 *
 * Server component: parses the URL slug and hands the inner path to the
 * client component, which mounts the iframe and keeps the parent URL in
 * sync as the user navigates inside.
 */
export default async function LendingTerminalPage({ params }: PageProps) {
  const { slug } = await params
  const innerPath = "/" + (slug?.join("/") ?? "")
  return <LendingTerminalIframe initialPath={innerPath} />
}
