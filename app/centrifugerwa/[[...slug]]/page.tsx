import CentrifugeIframe from "./client"

export const metadata = {
  title: "Centrifuge RWA Terminal — Datum Labs",
  description:
    "Real-time flow-of-funds analytics for Centrifuge V3 — TVL, pools, deposits, redemptions, deRWA composability.",
  alternates: { canonical: "/centrifugerwa" },
  openGraph: {
    title: "Centrifuge RWA Terminal — Datum Labs",
    url: "/centrifugerwa",
    type: "website",
  },
}

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

/**
 * Optional catch-all route for /centrifugerwa/*. The dashboard itself is
 * embedded as an iframe pointing at https://centrifuge-dashboard-datum.vercel.app (Datum Labs Vercel account)
 * — but because the parent owns the URL bar, deep paths like
 * /centrifugerwa/dashboard/methodology need a real route here, otherwise
 * Next.js returns 404 on reload.
 *
 * Server component: parses the URL slug and hands the inner path to the
 * client component, which mounts the iframe and keeps the URL in sync as
 * the user navigates inside.
 */
export default async function CentrifugeRwaPage({ params }: PageProps) {
  const { slug } = await params
  const innerPath = "/" + (slug?.join("/") ?? "")
  return <CentrifugeIframe initialPath={innerPath} />
}
