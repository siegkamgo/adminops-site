export const metadata = {
  title: "Traffic Monitoring Setup",
  description: "Set up GA4, Google Search Console, and optional privacy-first analytics for AdminOps."
};

export default function AnalyticsSetupPage() {
  return (
    <section className="section">
      <div className="container article">
        <h1>Traffic Monitoring Setup for AdminOps</h1>
        <p>
          This page outlines a practical setup for Google Analytics 4, Google Search Console, and optional privacy-first analytics
          (Plausible or Fathom) in a Next.js App Router project hosted on Vercel.
        </p>

        <h2>1) Google Analytics 4 (GA4)</h2>
        <ol>
          <li>Create a GA4 property for <strong>adminops.cloud</strong> in your Google Analytics account.</li>
          <li>Create a Web data stream and copy the Measurement ID (format: G-XXXXXXXXXX).</li>
          <li>In Vercel project settings, add environment variable <strong>NEXT_PUBLIC_GA_MEASUREMENT_ID</strong>.</li>
          <li>Redeploy the project so the variable is available in production.</li>
          <li>Verify traffic in GA4 Realtime after visiting your live site.</li>
        </ol>
        <p>
          The GA4 script is loaded in <strong>app/layout.js</strong> when NEXT_PUBLIC_GA_MEASUREMENT_ID is present.
        </p>

        <h2>2) Google Search Console (GSC)</h2>
        <ol>
          <li>Open Search Console and add a Domain property for <strong>adminops.cloud</strong>.</li>
          <li>Verify ownership using DNS TXT record via your DNS provider.</li>
          <li>Submit your XML sitemap once available (for example, /sitemap.xml).</li>
          <li>Monitor indexing coverage, Core Web Vitals, and query impressions weekly.</li>
        </ol>

        <h2>3) Optional privacy-friendly analytics</h2>
        <h3>Plausible</h3>
        <ol>
          <li>Create a Plausible site entry for adminops.cloud.</li>
          <li>Add Vercel environment variable <strong>NEXT_PUBLIC_PLAUSIBLE_DOMAIN</strong> with value adminops.cloud.</li>
          <li>Redeploy and verify events in Plausible dashboard.</li>
        </ol>

        <h3>Fathom</h3>
        <ol>
          <li>Create a Fathom site and copy your Site ID.</li>
          <li>Add Script tag in app/layout.js using next/script and your Site ID env variable.</li>
          <li>Deploy and confirm pageviews in Fathom live view.</li>
        </ol>

        <h2>Where tracking scripts belong in Next.js</h2>
        <p>
          Place analytics scripts in <strong>app/layout.js</strong> so they load for every route. Use environment variables to control
          script injection by environment and keep production IDs out of source control.
        </p>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h3>Recommended env variables</h3>
          <ul>
            <li>NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX</li>
            <li>NEXT_PUBLIC_PLAUSIBLE_DOMAIN=adminops.cloud</li>
            <li>NEXT_PUBLIC_FATHOM_SITE_ID=YOUR_FATHOM_SITE_ID</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
