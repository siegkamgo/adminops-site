import Script from "next/script";

export const metadata = {
  title: "Clinic Operations AI Agents",
  description: "Automate repetitive clinic administration while preserving compliance and human oversight."
};

export default function ClinicOpsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can clinic workflows be automated without losing compliance controls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Workflows can include approval gates, audit logs, and escalation paths while still reducing repetitive admin effort."
        }
      },
      {
        "@type": "Question",
        name: "What clinic admin workflows are best to automate first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Referral intake, claims pre-checks, document follow-ups, and recurring operational reporting are common high-impact starting points."
        }
      },
      {
        "@type": "Question",
        name: "How long does a clinic automation pilot take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A focused pilot typically runs for 30 days with measurable outcomes tracked weekly."
        }
      }
    ]
  };

  return (
    <section className="section">
      <div className="container">
        <Script id="clinic-faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <h1>AI Agents for Clinic Operations</h1>
        <p>
          Clinics need speed and precision across patient administration, referral handling, and billing workflows.
          AdminOps agents reduce manual burden while clinical leaders keep final control and accountability.
        </p>

        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Segment Pain Points</h3>
            <ul>
              <li>Staff time consumed by repetitive admin requests</li>
              <li>Inconsistent referral and claims processing</li>
              <li>High pressure on front desk and ops teams</li>
              <li>Delayed reports for management and compliance reviews</li>
            </ul>
          </article>

          <article className="card">
            <h3>Workflows Automated</h3>
            <ul>
              <li>Referral intake and categorization</li>
              <li>Claims and billing pre-check validation</li>
              <li>Document follow-up and reminder sequences</li>
              <li>Weekly ops and performance reporting</li>
            </ul>
          </article>

          <article className="card">
            <h3>ROI Outcomes</h3>
            <ul>
              <li>Lower admin queue times</li>
              <li>Fewer manual errors before submission</li>
              <li>More capacity without adding admin staff</li>
              <li>Better visibility for operational decisions</li>
            </ul>
          </article>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Design for Safety, Control, and Speed</h2>
          <p>
            Every workflow includes approval gates, escalation logic, and clear audit trails.
          </p>
          <a
            className="btn btn-primary"
            href="https://www.cal.eu/sieg-kamgo/30min"
            target="_blank"
            rel="noreferrer"
            data-track="book-call"
            data-cta-location="clinic-money-page"
          >
            Book a free strategy call
          </a>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>FAQs</h2>
          <h3>Can clinic workflows be automated without losing compliance controls?</h3>
          <p>Yes. Each workflow can enforce approvals, logging, and escalation so control is maintained.</p>
          <h3>What clinic admin workflows are best to automate first?</h3>
          <p>Referral intake, claims validation, follow-up reminders, and recurring reporting are strong starting points.</p>
          <h3>How long does a clinic automation pilot take?</h3>
          <p>A focused pilot is typically completed in 30 days with weekly KPI reviews.</p>
        </div>
      </div>
    </section>
  );
}
