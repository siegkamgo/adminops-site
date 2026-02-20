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
  openGraph: {
    title: "AdminOps",
    description: "Automate 60–80% of routine admin work in 30 days.",
    url: "https://adminops.cloud",
    siteName: "AdminOps",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

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

        <SiteHeader />
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <strong>AdminOps</strong> · Automate 60–80% of routine admin work in 30 days · info@adminops.cloud
          </div>
        </footer>
      </body>
    </html>
  );
}
