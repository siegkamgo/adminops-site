import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Accounting for Property Management (Automation Guide)",
  description: "A practical guide to automating property management accounting with human approval controls.",
  alternates: { canonical: "https://adminops.cloud/property-management-accounting" }
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Accounting for Property Management (Automation Guide)",
    description: "A practical guide to automating property management accounting with human approval controls.",
    mainEntityOfPage: "https://adminops.cloud/property-management-accounting"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="pm-accounting-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>
        <p className="badge">Target keyword: accounting for property management</p>
        <h1>Accounting for Property Management: Automation Guide</h1>
        <p>
          This guide shows how property teams automate accounting workflows without replacing core software. AdminOps agents
          handle repetitive steps, while managers keep final approval.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: property management accounting guide</div>
        </div>

        <h2>Workflow checklist</h2>
        <ul>
          <li>Define invoice intake sources</li>
          <li>Set matching rules</li>
          <li>Create exception thresholds</li>
          <li>Approve summaries weekly</li>
        </ul>

        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/property-management-accounting-software">Accounting software automation</Link>
          <Link className="btn btn-secondary" href="/adminops-pilot">30‑day pilot</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">Book a free strategy call</a>
        </div>
      </article>
    </section>
  );
}
