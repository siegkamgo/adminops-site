import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Customer Support Triage & Follow‑ups Automation | AdminOps",
  description:
    "Automate ticket triage, follow‑ups, and SLA escalations across email, WhatsApp, and Slack. Reduce backlog in 30 days.",
  alternates: { canonical: "https://adminops.cloud/customer-support-triage-automation" }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can we launch support triage automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams launch a focused triage + follow‑up workflow in ~30 days, starting with a pilot."
        }
      },
      {
        "@type": "Question",
        name: "Do we need to replace Zendesk/Freshdesk?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AdminOps works alongside your existing helpdesk or inboxes to automate the steps between channels."
        }
      },
      {
        "@type": "Question",
        name: "What results should we expect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typical results include fewer missed follow‑ups, lower backlog, and faster SLA compliance."
        }
      }
    ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Customer Support Triage & Follow‑ups Automation",
    description:
      "Automate ticket triage, follow‑ups, and SLA escalations across email, WhatsApp, and Slack. Reduce backlog in 30 days.",
    mainEntityOfPage: "https://adminops.cloud/customer-support-triage-automation"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="support-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>

        <p className="badge">Target keyword: customer support triage automation</p>
        <h1>Customer Support Triage & Follow‑ups Automation</h1>
        <p>
          Reduce backlog and missed follow‑ups in 30 days. AdminOps automates triage, routing, and SLA escalations
          across email, WhatsApp, Slack, and helpdesk tools.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: support triage workflow</div>
          <p className="image-caption">Suggested image: omnichannel support queue with SLA alerts.</p>
        </div>

        <h2>Real‑life scenarios we solve</h2>
        <ul>
          <li><strong>Multi‑channel chaos:</strong> requests arrive via email + WhatsApp + DMs; no single queue.</li>
          <li><strong>Helpdesk cost pressure:</strong> Zendesk/Freshdesk feels expensive for basic triage.</li>
          <li><strong>Field service delays:</strong> maintenance requests go unacknowledged for days.</li>
          <li><strong>Slack‑heavy support:</strong> requests live in threads and get lost.</li>
        </ul>

        <h2>The short answer</h2>
        <ul>
          <li>Unify intake and auto‑tag priority.</li>
          <li>Route to the right owner and set SLA timers.</li>
          <li>Escalate and follow‑up automatically.</li>
        </ul>

        <h2>What we automate</h2>
        <ul>
          <li>Inbox + helpdesk intake (email/WhatsApp/Slack)</li>
          <li>Auto‑classification + routing</li>
          <li>SLA reminders + escalation queues</li>
          <li>Weekly backlog summaries</li>
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
                ["Triage", "Manual", "Auto tag"],
                ["Routing", "Manual", "Auto assign"],
                ["Follow‑ups", "Manual", "Automated"],
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
          <li>Week 1 — Map channels + current SLAs</li>
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
          <li><Link href="/inventory-vendor-ops-automation">Inventory & vendor ops</Link></li>
          <li><Link href="/accounts-receivable-automation">Accounts receivable automation</Link></li>
          <li><Link href="/property-management-automation">Property management automation</Link></li>
        </ul>

        <h2>FAQs</h2>
        <div className="grid-2">
          <article className="card">
            <h3>How fast can we launch support triage automation?</h3>
            <p>Most teams launch a focused workflow in ~30 days, starting with a pilot.</p>
          </article>
          <article className="card">
            <h3>Do we need to replace Zendesk/Freshdesk?</h3>
            <p>No. AdminOps works alongside your helpdesk or inboxes to automate the steps between channels.</p>
          </article>
          <article className="card">
            <h3>What results should we expect?</h3>
            <p>Typical results include fewer missed follow‑ups, lower backlog, and faster SLA compliance.</p>
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
