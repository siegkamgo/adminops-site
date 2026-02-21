import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Work‑Order Triage & Vendor SLA Automation | AdminOps",
  description:
    "Auto‑acknowledge work orders, route vendors, and enforce SLA follow‑ups. Reduce delays in 30 days.",
  alternates: { canonical: "https://adminops.cloud/work-order-triage-automation" }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can we launch work‑order automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams launch a focused triage workflow in ~30 days, starting with a pilot and clear SLAs."
        }
      },
      {
        "@type": "Question",
        name: "Do we need new field service software?",
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
          text: "Typical results include fewer missed SLAs, faster vendor response, and clearer status reporting."
        }
      }
    ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Work‑Order Triage & Vendor SLA Automation",
    description:
      "Auto‑acknowledge work orders, route vendors, and enforce SLA follow‑ups. Reduce delays in 30 days.",
    mainEntityOfPage: "https://adminops.cloud/work-order-triage-automation"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="wo-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>

        <p className="badge">Target keyword: work order triage automation</p>
        <h1>Work‑Order Triage & Vendor SLA Automation</h1>
        <p>
          Reduce delays in 30 days. AdminOps auto‑acknowledges work orders, routes vendors, and enforces SLA follow‑ups
          while your team keeps approval control.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: work‑order triage workflow</div>
          <p className="image-caption">Suggested image: work orders, SLA alerts, vendor follow‑ups.</p>
        </div>

        <h2>Real‑life scenarios</h2>
        <ul>
          <li><strong>Maintenance requests sit unacknowledged</strong> → auto‑confirm receipt + assign owner.</li>
          <li><strong>Vendor misses SLA</strong> → automated escalation + status updates.</li>
          <li><strong>Field teams lack visibility</strong> → weekly summaries + exception queue.</li>
        </ul>

        <h2>The short answer</h2>
        <ul>
          <li>Auto‑acknowledge and prioritize work orders.</li>
          <li>Route vendors and enforce SLA follow‑ups.</li>
          <li>Summarize backlog and exceptions weekly.</li>
        </ul>

        <h2>What we automate</h2>
        <ul>
          <li>Work‑order intake + classification</li>
          <li>Vendor assignment + follow‑ups</li>
          <li>SLA timers + escalation queues</li>
          <li>Status summaries for managers</li>
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
                ["Acknowledgement", "Manual", "Automated"],
                ["Routing", "Manual", "Auto assign"],
                ["SLA follow‑ups", "Manual", "Automated"],
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
          <li>Week 1 — Map work‑order flow + SLAs</li>
          <li>Week 2 — Build routing + follow‑ups</li>
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
          <li><Link href="/customer-support-triage-automation">Support triage automation</Link></li>
          <li><Link href="/inventory-vendor-ops-automation">Inventory & vendor ops</Link></li>
          <li><Link href="/accounts-payable-automation">Accounts payable automation</Link></li>
        </ul>

        <h2>FAQs</h2>
        <div className="grid-2">
          <article className="card">
            <h3>How fast can we launch work‑order automation?</h3>
            <p>Most teams launch a focused workflow in ~30 days, starting with a pilot and clear SLAs.</p>
          </article>
          <article className="card">
            <h3>Do we need new field service software?</h3>
            <p>No. AdminOps works alongside your existing tools and automates the steps between them.</p>
          </article>
          <article className="card">
            <h3>What results should we expect?</h3>
            <p>Typical results include fewer missed SLAs, faster vendor response, and clearer status reporting.</p>
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
