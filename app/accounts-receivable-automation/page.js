import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Accounts Receivable & Collections Automation | AdminOps",
  description:
    "Automate AR reminders, dispute routing, and payment reconciliation. Reduce DSO and improve cashflow in 30 days.",
  alternates: { canonical: "https://adminops.cloud/accounts-receivable-automation" }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can we launch AR automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams launch an AR workflow in ~30 days, starting with a pilot and approval checkpoints."
        }
      },
      {
        "@type": "Question",
        name: "Will this replace our billing system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AdminOps works alongside your billing/accounting tools and automates the steps between them."
        }
      },
      {
        "@type": "Question",
        name: "What results should we expect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typical results include lower DSO, fewer overdue invoices, and less manual follow‑up effort."
        }
      }
    ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Accounts Receivable & Collections Automation",
    description:
      "Automate AR reminders, dispute routing, and payment reconciliation. Reduce DSO and improve cashflow in 30 days.",
    mainEntityOfPage: "https://adminops.cloud/accounts-receivable-automation"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="ar-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>

        <p className="badge">Target keyword: accounts receivable automation</p>
        <h1>Accounts Receivable & Collections Automation</h1>
        <p>
          Reduce DSO and improve cashflow in 30 days. AdminOps automates AR reminders, dispute routing, and payment
          reconciliation while your team keeps approval control.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: AR automation workflow</div>
          <p className="image-caption">Suggested image: AR pipeline with reminders + dispute routing.</p>
        </div>

        <h2>The short answer</h2>
        <ul>
          <li>Automate reminders and escalation sequences.</li>
          <li>Route disputes and collect missing info.</li>
          <li>Reconcile payments and update records.</li>
        </ul>

        <h2>What we automate</h2>
        <ul>
          <li>Invoice reminder sequences</li>
          <li>Dispute routing + info requests</li>
          <li>Payment reconciliation + status updates</li>
          <li>Weekly AR aging summaries</li>
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
                ["Reminders", "Manual", "Automated"],
                ["Disputes", "Manual", "Routed"],
                ["Reconciliation", "Manual", "Auto match"],
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
          <li>Week 1 — Map AR workflow + data sources</li>
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
          <li><Link href="/property-management-accounting">Property management accounting</Link></li>
          <li><Link href="/blog/vendor-invoice-processing-automation">Vendor invoice processing automation</Link></li>
        </ul>

        <h2>FAQs</h2>
        <div className="grid-2">
          <article className="card">
            <h3>How fast can we launch AR automation?</h3>
            <p>Most teams launch a focused AR workflow in ~30 days, starting with a pilot and approval checkpoints.</p>
          </article>
          <article className="card">
            <h3>Will this replace our billing system?</h3>
            <p>No. AdminOps works alongside your billing/accounting tools and automates the steps between them.</p>
          </article>
          <article className="card">
            <h3>What results should we expect?</h3>
            <p>Typical results include lower DSO, fewer overdue invoices, and less manual follow‑up effort.</p>
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
