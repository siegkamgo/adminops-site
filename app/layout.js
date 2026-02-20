import Script from "next/script";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://adminops.cloud"),
  title: {
    default: "AdminOps | AI Agents for Admin Workflows",
    template: "%s | AdminOps"
  },
  description: "Automate 60–80% of routine admin work in 30 days. AI agents handle repetitive workflows while your team keeps final approval.",
  alternates: {
    canonical: "https://adminops.cloud"
  },
  openGraph: {
    title: "AdminOps",
    description: "Automate 60–80% of routine admin work in 30 days.",
    url: "https://adminops.cloud",
    siteName: "AdminOps",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AdminOps",
    description: "Automate 60–80% of routine admin work in 30 days."
  }
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AdminOps",
    url: "https://adminops.cloud",
    logo: "https://adminops.cloud/logo.png",
    email: "info@adminops.cloud",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@adminops.cloud",
        availableLanguage: ["English"]
      }
    ],
    sameAs: ["https://www.cal.eu/sieg-kamgo/30min"]
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AdminOps",
    url: "https://adminops.cloud",
    potentialAction: {
      "@type": "ReserveAction",
      target: "https://www.cal.eu/sieg-kamgo/30min",
      name: "Book a free strategy call"
    }
  };

  return (
    <html lang="en">
      <body>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-base" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}

        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}

        <Script id="cta-tracking" strategy="afterInteractive">
          {`document.addEventListener('click', function(event) {
  const trigger = event.target.closest('[data-track="book-call"]');
  if (!trigger) return;
  const location = trigger.getAttribute('data-cta-location') || window.location.pathname;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'book_strategy_call_click', {
      cta_location: location,
      link_url: trigger.getAttribute('href') || ''
    });
  }
  if (typeof window.plausible === 'function') {
    window.plausible('Book Strategy Call Click', {
      props: { cta_location: location }
    });
  }
});`}
        </Script>

        <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(orgSchema)}
        </Script>
        <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>

        <SiteHeader />
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-links">
            <div><strong>AdminOps</strong> · Automate 60–80% of routine admin work in 30 days</div>
            <div className="footer-nav">
              <a href="/blog/property-management-computer-use-agents">Blog</a>
              <a href="/insights">Insights</a>
              <a href="mailto:info@adminops.cloud">info@adminops.cloud</a>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
