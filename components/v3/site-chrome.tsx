/* Datum Labs v3 chrome — nav + footer, markup ported 1:1 from the redesign
   handoff. Behaviors (dropdown, mobile drawer, theme swap, progress bar) come
   from the global scripts in app/layout.tsx, which re-run on every page load:
   all internal links are plain <a> so navigation is always a full page load.
   `navDark` mirrors the handoff's authored `nav is-dark` state for pages whose
   first band is dark (nav-theme.js treats the authored class as the truth at
   scrollY 0). */

import { CaretDown, XLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr"

export type NavActive = "services" | "dashboards" | "about" | "research" | "none"

const CAL = "https://calendly.com/datumlabss/30min"
export const LINKS = {
  onchainsuite: "https://onchainsuite.xyz",
  setnel: "https://setnel.datumlab.xyz",
  podcast: "https://creators.spotify.com/pod/profile/w3gm/",
  x: "https://x.com/Datumlabs_",
  linkedin: "https://www.linkedin.com/showcase/dat-umlab/",
  email: "mailto:hello@datumlab.xyz",
  calendly: CAL,
}

function Lockup({ className }: { className?: string }) {
  return (
    <span className={className ?? "nav-logo-lockup"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-color" src="/brand/logo-horizontal-color.svg" alt="Datum Labs" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-white" src="/brand/logo-horizontal-white.svg" alt="Datum Labs" />
    </span>
  )
}

export function NavV3({ active = "none", navDark = false }: { active?: NavActive; navDark?: boolean }) {
  const is = (k: NavActive) => (active === k ? " is-active" : "")
  const cur = (k: NavActive) => (active === k ? { "aria-current": "page" as const } : {})
  return (
    <>
      <nav className={navDark ? "nav is-dark" : "nav"}>
        <a href="/" className="brand" data-logo="lockup">
          <Lockup />
        </a>
        <div className="nav-links">
          <a className={`nav-link-top${is("services")}`} {...cur("services")} href="/services">Services</a>
          <div className="nav-drop">
            <button type="button" aria-expanded="false" aria-haspopup="true">
              Resources <CaretDown weight="fill" className="caret" aria-hidden="true" />
            </button>
            <div className="nav-menu">
              <div className="nav-menu-col">
                <p className="nav-menu-h">Research</p>
                <a href="/research"><span className="t">Datum Reports</span><span className="d">Monthly State of Lending and published analysis.</span></a>
                <a href="/resources/podcast"><span className="t">W3GM Podcast</span><span className="d">Conversations with builders across web3.</span></a>
              </div>
              <div className="nav-menu-col">
                <p className="nav-menu-h">Products</p>
                <a href={LINKS.onchainsuite} target="_blank" rel="noopener"><span className="t">OnchainSuite <span className="ext">↗</span></span><span className="d">Protocol analytics, owned and versioned.</span></a>
                <a href={LINKS.setnel} target="_blank" rel="noopener"><span className="t">Setnel <span className="ext">↗</span></span><span className="d">Onchain monitoring and alerting.</span></a>
                <a href="/platform"><span className="t">Atlas</span><span className="d">The pipeline behind every number we publish.</span></a>
              </div>
            </div>
          </div>
          <a className={`nav-link-top${is("dashboards")}`} {...cur("dashboards")} href="/live-dashboards">Dashboards</a>
          <a className={`nav-link-top${is("about")}`} {...cur("about")} href="/about">About</a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-primary" href="/contact">Contact us</a>
          <button className="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="navMobile">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className="nav-progress"></div>
      </nav>

      <div className="nav-mobile" id="navMobile" hidden>
        <div className="nav-mobile-group">
          <a href="/services">Services</a>
          <a href="/live-dashboards">Dashboards</a>
          <a href="/about">About</a>
          <p className="nav-mobile-h">Research</p>
          <a className="nav-mobile-sub" href="/research">Datum Reports</a>
          <a className="nav-mobile-sub" href="/resources/podcast">W3GM Podcast</a>
          <p className="nav-mobile-h">Products</p>
          <a className="nav-mobile-sub" href={LINKS.onchainsuite} target="_blank" rel="noopener">OnchainSuite ↗</a>
          <a className="nav-mobile-sub" href={LINKS.setnel} target="_blank" rel="noopener">Setnel ↗</a>
          <a className="nav-mobile-sub" href="/platform">Atlas</a>
        </div>
        <a className="btn btn-primary nav-mobile-cta" href="/contact">Contact us</a>
      </div>
    </>
  )
}

export function FooterV3() {
  return (
    <footer className="footer dark-band" data-nav-dark data-theme="dark">
      <div className="band-rules" aria-hidden="true"><i></i><i></i></div>
      <div className="wrap">
        <div className="footer-cols">
          <div className="footer-brand">
            <a href="/" className="brand footer-logo" aria-label="Datum Labs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="logo-color" src="/brand/logo-horizontal-color.svg" alt="Datum Labs" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="logo-white" src="/brand/logo-horizontal-white.svg" alt="Datum Labs" />
            </a>
            <p className="blurb" style={{ color: "var(--dim)" }}>
              Datum Labs is a financial data and reporting service for blockchain protocols. Numbers you can defend in public.
            </p>
            <div className="footer-socials">
              <a href={LINKS.x} target="_blank" rel="noopener" aria-label="X"><XLogo weight="duotone" aria-hidden="true" /><span>X</span></a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedinLogo weight="duotone" aria-hidden="true" /><span>LinkedIn</span></a>
              <a href={LINKS.email} aria-label="Email"><EnvelopeSimple weight="duotone" aria-hidden="true" /><span>Email</span></a>
            </div>
            <div className="footer-sub">
              <p>Protocol finance &amp; research, monthly</p>
              <form data-form data-endpoint="/api/subscribe" data-subject="Footer subscribe" data-done="You are on the list.">
                <input type="email" name="email" placeholder="Enter your email" aria-label="Email" required autoComplete="email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-col">
            <h3>WORK</h3>
            <ul>
              <li><a href="/research">Research, all published work</a></li>
              <li><a href="/platform">Atlas</a></li>
              <li><a href="/live-dashboards">Dashboards</a></li>
              <li><a href="/case-studies/moonwell-oev">Moonwell OEV</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>COMPANY</h3>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/resources/podcast">Podcast</a></li>
              <li><a href={LINKS.onchainsuite} target="_blank" rel="noopener">OnchainSuite ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DATUM LABS</span>
          <span>FINANCIAL DATA AND REPORTING FOR BLOCKCHAIN PROTOCOLS</span>
          <span>X @DATUMLABS_</span>
        </div>
      </div>
    </footer>
  )
}

/* The page-edge hairlines every handoff page opens with. */
export function PageRules() {
  return (
    <div className="page-rules" aria-hidden="true"><i></i><i></i></div>
  )
}
