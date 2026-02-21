import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Inventory & Vendor Ops Automation | AdminOps",
  description:
    "Automate PO matching, restock alerts, and vendor SLAs. Reduce stockouts and delays in 30 days.",
  alternates: { canonical: "https://adminops.cloud/inventory-vendor-ops-automation" }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can we launch inventory automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams launch a focused inventory + vendor ops workflow in ~30 days, starting with a pilot."
        }
      },
      {
        "@type": "Question",
        name: "Do we need to change our systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AdminOps works alongside your existing tools and automates the steps between them."
        }
      },
      {
        "@type": "Question",
        name: "What results should we expect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typical results include fewer stockouts, faster vendor response times, and cleaner approval trails."
        }
      }
    ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Inventory & Vendor Ops Automation",
    description:
      "Automate PO matching, restock alerts, and vendor SLAs. Reduce stockouts and delays in 30 days.",
    mainEntityOfPage: "https://adminops.cloud/inventory-vendor-ops-automation"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="inv-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>

        <p className="badge">Target keyword: inventory automation</p>
        <h1>Inventory & Vendor Ops Automation</h1>
        <p>
          Reduce stockouts, missed SLAs, and vendor delays in 30 days. AdminOps automates PO matching, restock alerts,
          and vendor follow‑ups while your team keeps approval control.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: inventory + vendor ops workflow</div>
          <p className="image-caption">Suggested image: inventory flow with PO matching and SLA alerts.</p>
        </div>

        <h2>The short answer</h2>
        <ul>
          <li>Automate PO matching and restock alerts.</li>
          <li>Track vendor SLAs and late shipments.</li>
          <li>Generate weekly inventory + vendor summaries.</li>
        </ul>

        <h2>What we automate</h2>
        <ul>
          <li>PO matching + exceptions</li>
          <li>Restock thresholds + alerts</li>
          <li>Vendor SLA tracking + escalation</li>
          <li>Weekly inventory summaries</li>
        </ul>

        <h2>Comparison table</h2>
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Step</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Manual</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>AdminOps</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["PO matching", "Manual", "Automated"],
                ["Restock alerts", "Ad‑hoc", "Automated"],
                ["Vendor follow‑ups", "Manual", "Escalated"],
                ["Reporting", "Manual", "Auto draft"]
              ].map((row) => (
                <tr key={row[0]}>
                  <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{row[0]}</td>
                  <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{row[1]}</td>
                  <td style={{ padding: "0.5rem", borderTop: "1px solid #d0d5dd" }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>30‑day pilot</h2>
        <ol>
          <li>Week 1 — Map inventory + vendor workflows</li>
          <li>Week 2 — Build automation + approvals</li>
          <li>Week 3 — Parallel run + tuning</li>
          <li>Week 4 — Go live + ROI report</li>
        </ol>

        <h2>Pricing</h2>
        <ul>
          <li><strong>Pilot setup:</strong> $7,500</li>
          <li><strong>Retainer:</strong> $4,000–$8,000/month</li>
        </ul>

        <h2>Related workflows</h2>
        <ul>
          <li><Link href="/accounts-payable-automation">Accounts payable automation</Link></li>
          <li><Link href="/accounts-receivable-automation">Accounts receivable automation</Link></li>
          <li><Link href="/blog/vendor-invoice-processing-automation">Vendor invoice processing automation</Link></li>
        </ul>

        <h2>FAQs</h2>
        <div className="grid-2">
          <article className="card">
            <h3>How fast can we launch inventory automation?</h3>
            <p>Most teams launch a focused workflow in ~30 days, starting with a pilot.</p>
          </article>
          <article className="card">
            <h3>Do we need to change our systems?</h3>
            <p>No. AdminOps works alongside existing tools and automates the steps between them.</p>
          </article>
          <article className="card">
            <h3>What results should we expect?</h3>
            <p>Typical results include fewer stockouts, faster vendor response times, and cleaner approval trails.</p>
          </article>
        </div>

        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/adminops-pilot">30‑day pilot</Link>
          <Link className="btn btn-secondary" href="/property-management-ai-agents">AI agents for ops</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">
            Book a free strategy call
          </a>
        </div>
      </article>
    </section>
  );
}
