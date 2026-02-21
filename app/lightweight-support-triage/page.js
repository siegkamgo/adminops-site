import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "Lightweight Support Triage Layer (Zendesk‑free) | AdminOps",
  description:
    "Automate triage and follow‑ups without Zendesk/Freshdesk overhead. Keep support fast and affordable.",
  alternates: { canonical: "https://adminops.cloud/lightweight-support-triage" }
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can we avoid a full helpdesk migration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AdminOps adds a lightweight triage layer on top of your existing inboxes and tools."
        }
      },
      {
        "@type": "Question",
        name: "What channels can you handle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email, WhatsApp, Slack, and basic helpdesk inputs. We unify them into one queue."
        }
      },
      {
        "@type": "Question",
        name: "How fast can we launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams launch in ~30 days with a focused pilot and clear SLAs."
        }
      }
    ]
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Lightweight Support Triage Layer (Zendesk‑free)",
    description:
      "Automate triage and follow‑ups without Zendesk/Freshdesk overhead. Keep support fast and affordable.",
    mainEntityOfPage: "https://adminops.cloud/lightweight-support-triage"
  };

  return (
    <section className="section">
      <article className="container article">
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="light-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>

        <p className="badge">Target keyword: lightweight support triage</p>
        <h1>Lightweight Support Triage Layer (Zendesk‑free)</h1>
        <p>
          Keep support fast without expensive helpdesk overhead. AdminOps adds a lightweight triage layer that unifies
          email, WhatsApp, and Slack into a single queue with follow‑ups and SLAs.
        </p>

        <div className="card" style={{ marginTop: "1rem" }}>
          <div className="image-placeholder">Featured image: lightweight triage queue</div>
          <p className="image-caption">Suggested image: unified inbox + triage tags.</p>
        </div>

        <h2>The short answer</h2>
        <ul>
          <li>Unify channels into a single queue.</li>
          <li>Auto‑tag and assign owners.</li>
          <li>Automate follow‑ups and escalation.</li>
        </ul>

        <h2>What we automate</h2>
        <ul>
          <li>Channel intake (email/WhatsApp/Slack)</li>
          <li>Auto‑classification + routing</li>
          <li>SLA reminders + escalation</li>
          <li>Weekly backlog summaries</li>
        </ul>

        <h2>Comparison table</h2>
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Step</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Heavy helpdesk</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>AdminOps</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Setup", "Weeks", "Days"],
                ["Cost", "High", "Lean"],
                ["Triage", "Manual", "Automated"],
                ["Follow‑ups", "Manual", "Automated"]
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
          <li>Week 1 — Map channels + triage rules</li>
          <li>Week 2 — Build routing + SLAs</li>
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
          <li><Link href="/work-order-triage-automation">Work‑order triage</Link></li>
        </ul>

        <h2>FAQs</h2>
        <div className="grid-2">
          <article className="card">
            <h3>Can we avoid a full helpdesk migration?</h3>
            <p>Yes. AdminOps adds a lightweight triage layer on top of your existing inboxes and tools.</p>
          </article>
          <article className="card">
            <h3>What channels can you handle?</h3>
            <p>Email, WhatsApp, Slack, and basic helpdesk inputs. We unify them into one queue.</p>
          </article>
          <article className="card">
            <h3>How fast can we launch?</h3>
            <p>Most teams launch in ~30 days with a focused pilot and clear SLAs.</p>
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
