import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Accounts Payable Automation | AdminOps",
  description:
    "Cut AP processing time by 60–80% in 30 days. Automate invoice intake, approvals, and payment prep without changing your accounting system.",
  alternates: { canonical: "https://adminops.cloud/accounts-payable-automation" }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can we launch AP automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams launch a focused AP workflow in about 30 days, starting with a pilot and clear approval checkpoints."
        }
      },
      {
        "@type": "Question",
        name: "Do we need to replace our accounting system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AdminOps works alongside your existing accounting tools and automates the steps between systems."
        }
      },
      {
        "@type": "Question",
        name: "What results should we expect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Teams typically see 60–80% reduction in repetitive AP admin work and faster monthly close cycles."
        }
      }
    ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Accounts Payable Automation",
    description:
      "Cut AP processing time by 60–80% in 30 days. Automate invoice intake, approvals, and payment prep without changing your accounting system.",
    mainEntityOfPage: "https://adminops.cloud/accounts-payable-automation"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="ap-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>

        <p className="badge">Target keyword: accounts payable automation</p>
        <h1>Accounts Payable Automation</h1>
        <p>
          Cut AP processing time by 60–80% in 30 days. AdminOps automates invoice intake, approvals, and payment prep
          while your team keeps final control.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: AP automation workflow</div>
          <p className="image-caption">Suggested image: modern AP workflow with approvals + exception queue.</p>
        </div>

        <h2>The short answer</h2>
        <ul>
          <li>Automate invoice intake from email + portals.</li>
          <li>Route approvals with exception queues.</li>
          <li>Generate weekly payment batch summaries.</li>
        </ul>

        <h2>What we automate</h2>
        <ul>
          <li>Invoice intake (email + portal capture)</li>
          <li>Data extraction + coding</li>
          <li>Approval routing + escalation</li>
          <li>Exception queues + summaries</li>
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
                ["Invoice capture", "Manual", "Automated"],
                ["Matching", "Manual", "Auto match"],
                ["Exceptions", "Ad‑hoc", "Queue + summary"],
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
          <li>Week 1 — Map workflow + data sources</li>
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
          <li><Link href="/property-management-accounting-software">Property management accounting automation</Link></li>
          <li><Link href="/property-management-automation">Property management automation</Link></li>
          <li><Link href="/blog/vendor-invoice-processing-automation">Vendor invoice processing automation</Link></li>
        </ul>

        <h2>FAQs</h2>
        <div className="grid-2">
          <article className="card">
            <h3>How fast can we launch AP automation?</h3>
            <p>Most teams launch a focused AP workflow in about 30 days, starting with a pilot and approval checkpoints.</p>
          </article>
          <article className="card">
            <h3>Do we need to replace our accounting system?</h3>
            <p>No. AdminOps works alongside your existing accounting tools and automates the steps between systems.</p>
          </article>
          <article className="card">
            <h3>What results should we expect?</h3>
            <p>Teams typically see 60–80% reduction in repetitive AP admin work and faster monthly close cycles.</p>
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
