import Script from "next/script";

export const metadata = {
  title: "Restaurant Operations AI Agents",
  description: "Use AdminOps AI agents to automate restaurant back-office admin, reduce errors, and speed up reporting."
};

export default function RestaurantOpsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can AI agents help multi-site restaurant reporting consistency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI agents normalize data across locations and generate consistent daily and weekly reporting formats."
        }
      },
      {
        "@type": "Question",
        name: "What restaurant workflows are best to automate first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Invoice checks, shift admin summaries, and inventory-related reporting are common first workflows for measurable impact."
        }
      },
      {
        "@type": "Question",
        name: "Do managers keep control of critical approvals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AdminOps is built with human-in-the-loop approvals so final operational decisions remain with managers."
        }
      }
    ]
  };

  return (
    <section className="section">
      <div className="container">
        <Script id="restaurant-faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <h1>AI Agents for Restaurant Operations</h1>
        <p>
          Restaurant teams should focus on service, not repetitive back-office admin.
          AdminOps automates invoice processing, rota admin, and reporting workflows so operators can scale with less friction.
        </p>

        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Segment Pain Points</h3>
            <ul>
              <li>Manual supplier invoice checks and reconciliation delays</li>
              <li>Constant rota and shift-change admin overhead</li>
              <li>Stock and cost reporting inconsistencies</li>
              <li>Fragmented multi-site reporting visibility</li>
            </ul>
          </article>

          <article className="card">
            <h3>Workflows Automated</h3>
            <ul>
              <li>Invoice data capture and exception matching</li>
              <li>Shift admin summaries and reminder workflows</li>
              <li>Inventory and wastage data normalization</li>
              <li>Daily and weekly ops reporting packs</li>
            </ul>
          </article>

          <article className="card">
            <h3>ROI Outcomes</h3>
            <ul>
              <li>Lower admin hours per location</li>
              <li>Faster decision cycles for managers</li>
              <li>Reduced avoidable reporting errors</li>
              <li>Improved consistency across sites</li>
            </ul>
          </article>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Keep Teams Focused on Guest Experience</h2>
          <p>
            Launch a focused pilot and identify the fastest path to measurable operational gains.
          </p>
          <a
            className="btn btn-primary"
            href="https://www.cal.eu/sieg-kamgo/30min"
            target="_blank"
            rel="noreferrer"
            data-track="book-call"
            data-cta-location="restaurant-money-page"
          >
            Book a free strategy call
          </a>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>FAQs</h2>
          <h3>Can AI agents help multi-site restaurant reporting consistency?</h3>
          <p>Yes. They standardize inputs and produce consistent outputs across locations and shifts.</p>
          <h3>What restaurant workflows are best to automate first?</h3>
          <p>Start with invoice checks, shift admin summaries, and recurring stock/performance reporting.</p>
          <h3>Do managers keep control of critical approvals?</h3>
          <p>Yes. Final approvals stay with managers while AI handles repetitive processing and flagging.</p>
        </div>
      </div>
    </section>
  );
}
