import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "MSP Workflow Autopilot | AdminOps",
  description:
    "Reusable automation across MSP clients: onboarding/offboarding, ticket routing, billing sync, and status reporting.",
  alternates: { canonical: "https://adminops.cloud/msp-workflow-autopilot" }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can this run across multiple clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AdminOps templates workflows so they can be reused across client accounts with minimal setup."
        }
      },
      {
        "@type": "Question",
        name: "What workflows are most common?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Client onboarding/offboarding, ticket routing, billing sync, and weekly status reporting."
        }
      },
      {
        "@type": "Question",
        name: "How fast can we launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most MSPs launch a core workflow in ~30 days and then expand across accounts."
        }
      }
    ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MSP Workflow Autopilot",
    description:
      "Reusable automation across MSP clients: onboarding/offboarding, ticket routing, billing sync, and status reporting.",
    mainEntityOfPage: "https://adminops.cloud/msp-workflow-autopilot"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="msp-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>

        <p className="badge">Target keyword: MSP workflow automation</p>
        <h1>MSP Workflow Autopilot</h1>
        <p>
          Reuse automation across MSP clients. AdminOps templates workflows so you can deploy onboarding, ticket routing,
          billing sync, and reporting without rebuilding each time.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: MSP workflow automation</div>
          <p className="image-caption">Suggested image: multi‑client automation pipelines.</p>
        </div>

        <h2>The short answer</h2>
        <ul>
          <li>Template workflows once, deploy across clients.</li>
          <li>Automate onboarding/offboarding, routing, and billing sync.</li>
          <li>Deliver weekly status summaries automatically.</li>
        </ul>

        <h2>What we automate</h2>
        <ul>
          <li>Client onboarding/offboarding checklists</li>
          <li>Ticket routing + priority tagging</li>
          <li>Billing sync + invoice checks</li>
          <li>Weekly account summaries</li>
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
                ["Onboarding", "Manual", "Automated"],
                ["Routing", "Manual", "Auto assign"],
                ["Billing sync", "Manual", "Automated"],
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
          <li>Week 1 — Map workflows + client touchpoints</li>
          <li>Week 2 — Build automation + templates</li>
          <li>Week 3 — Pilot on one client</li>
          <li>Week 4 — Roll out to 3–5 clients</li>
        </ol>

        <h2>Pricing</h2>
        <ul>
          <li><strong>Pilot setup:</strong> $7,500</li>
          <li><strong>Retainer:</strong> $4,000–$8,000/month</li>
        </ul>

        <h2>Related workflows</h2>
        <ul>
          <li><Link href="/lightweight-support-triage">Lightweight support triage</Link></li>
          <li><Link href="/accounts-receivable-automation">Accounts receivable automation</Link></li>
        </ul>

        <h2>FAQs</h2>
        <div className="grid-2">
          <article className="card">
            <h3>Can this run across multiple clients?</h3>
            <p>Yes. AdminOps templates workflows so they can be reused across client accounts.</p>
          </article>
          <article className="card">
            <h3>What workflows are most common?</h3>
            <p>Onboarding/offboarding, ticket routing, billing sync, and weekly status reporting.</p>
          </article>
          <article className="card">
            <h3>How fast can we launch?</h3>
            <p>Most MSPs launch a core workflow in ~30 days and then expand.</p>
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
