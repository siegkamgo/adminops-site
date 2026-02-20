import Script from "next/script";

export const metadata = {
  title: "Property Management AI Agents",
  description: "Reduce reconciliation and admin workload across leasing, maintenance, and rent operations with AdminOps AI agents."
};

export default function PropertyManagementPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.adminops.cloud/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Property Management AI Agents",
        item: "https://www.adminops.cloud/property-management-ai-agents"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How quickly can we automate property admin workflows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams can launch one focused workflow in 30 days using a pilot model with clear KPIs and weekly optimization."
        }
      },
      {
        "@type": "Question",
        name: "Will AI replace manager approval in reconciliation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. AdminOps keeps managers in final approval control while AI handles repetitive processing, matching, and exception detection."
        }
      },
      {
        "@type": "Question",
        name: "What results are realistic for property management teams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typical outcomes include faster monthly close, lower repetitive admin load, and cleaner owner reporting with fewer manual errors."
        }
      }
    ]
  };

  return (
    <section className="section">
      <div className="container">
        <Script id="property-faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
        <Script id="property-breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(breadcrumbSchema)}
        </Script>
        <h1>AI Agents for Property Management Operations</h1>
        <p>
          Property managers lose hours each week to reconciliations, tenant follow-ups, maintenance coordination, and report assembly.
          AdminOps automates these repetitive workflows while keeping managers in control of final approvals.
        </p>

        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Common Pain Points</h3>
            <ul>
              <li>Delayed monthly close due to manual reconciliation</li>
              <li>Missed maintenance updates and tenant complaint loops</li>
              <li>Inconsistent arrears tracking across properties</li>
              <li>Fragmented data across PMS, accounting, and spreadsheets</li>
            </ul>
          </article>

          <article className="card">
            <h3>Workflows Automated</h3>
            <ul>
              <li>Rent and invoice reconciliation with exception flags</li>
              <li>Maintenance ticket triage and vendor follow-up summaries</li>
              <li>Arrears reminders with escalation logic</li>
              <li>Owner and portfolio reporting packets</li>
            </ul>
          </article>

          <article className="card">
            <h3>Typical ROI Outcomes</h3>
            <ul>
              <li>60–80% reduction in repetitive admin effort</li>
              <li>Up to 70% faster reconciliation cycle times</li>
              <li>Fewer missed tasks and fewer avoidable disputes</li>
              <li>Cleaner reporting for owners and asset managers</li>
            </ul>
          </article>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Move from Firefighting to Controlled Operations</h2>
          <p>
            Start with one high-friction workflow in our 30-day pilot and expand once the numbers are proven.
          </p>
          <a
            className="btn btn-primary"
            href="https://www.cal.eu/sieg-kamgo/30min"
            target="_blank"
            rel="noreferrer"
            data-track="book-call"
            data-cta-location="property-money-page"
          >
            Book a free strategy call
          </a>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>FAQs</h2>
          <h3>How quickly can we automate property admin workflows?</h3>
          <p>Most teams can launch one focused workflow in 30 days with KPI tracking from week one.</p>
          <h3>Will AI replace manager approval in reconciliation?</h3>
          <p>No. Human approval remains at final decision points while AI handles repetitive preparation and checks.</p>
          <h3>What results are realistic for property management teams?</h3>
          <p>Teams usually see faster close cycles, lower admin overhead, and more reliable owner reporting.</p>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Quick Answers for AI Overviews</h2>
          <p>
            <strong>What does property management automation improve first?</strong> Reconciliation, arrears follow-ups, and owner reporting
            usually improve first because they are repetitive and rules-based. Teams often reduce admin load while keeping manager approval at
            final control points.
          </p>
          <p>
            <strong>How long until results are measurable?</strong> Most teams can measure impact within 30 days when they launch one workflow,
            track time saved weekly, and compare cycle time before and after automation.
          </p>
        </div>

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h2>Related Resources</h2>
          <ul>
            <li><a href="/adminops-pilot">See the 30-day pilot structure</a></li>
            <li><a href="/guides/property-management-automation-guide">Read the property management automation guide</a></li>
            <li><a href="/comparisons/adminops-vs-hiring-admin-staff">Compare AdminOps vs hiring admin staff</a></li>
            <li><a href="/insights">Browse data-backed insights</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
