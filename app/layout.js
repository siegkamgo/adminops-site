import Script from "next/script";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";

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
  const baseUrl = "https://adminops.cloud";
  const callUrl = "https://www.cal.eu/sieg-kamgo/30min";
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: "AdminOps",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: "info@adminops.cloud",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@adminops.cloud",
        availableLanguage: ["English"]
      }
    ],
    sameAs: [
      callUrl,
      `${baseUrl}/insights`,
      `${baseUrl}/insights/rss.xml`,
      `${baseUrl}/llms.txt`
    ]
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    name: "AdminOps",
    url: baseUrl,
    inLanguage: "en-US",
    publisher: {
      "@id": `${baseUrl}#organization`
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: callUrl,
      name: "Book a free strategy call"
    },
    hasPart: [
      {
        "@type": "CollectionPage",
        name: "Insights",
        url: `${baseUrl}/insights`
      },
      {
        "@type": "DataFeed",
        name: "AdminOps Insights RSS",
        url: `${baseUrl}/insights/rss.xml`
      },
      {
        "@type": "WebPage",
        name: "LLMs Content Manifest",
        url: `${baseUrl}/llms.txt`
      }
    ]
  };
  const dataFeedSchema = {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    "@id": `${baseUrl}/insights/rss.xml#datafeed`,
    name: "AdminOps Insights RSS Feed",
    description: "Syndicated feed of published AdminOps insight articles.",
    url: `${baseUrl}/insights/rss.xml`,
    inLanguage: "en-US",
    creator: {
      "@id": `${baseUrl}#organization`
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
        <Script id="datafeed-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(dataFeedSchema)}
        </Script>

        <SiteHeader />
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-links">
            <div><strong>AdminOps</strong> · Automate 60–80% of routine admin work in 30 days</div>
            <div className="footer-nav">
              <a href="/accounts-payable-automation">AP Automation</a>
              <a href="/accounts-receivable-automation">AR Automation</a>
              <a href="/inventory-vendor-ops-automation">Inventory Ops</a>
              <a href="/blog/property-management-computer-use-agents">Blog</a>
              <a href="/insights">Insights</a>
              <a href="mailto:info@adminops.cloud">info@adminops.cloud</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
