import Link from "next/link";

export const metadata = {
  title: "Property Management Automation Guide",
  description: "A practical guide to automating property management operations with AI agents and human approval controls."
};

export default function PropertyGuidePage() {
  return (
    <section className="section">
      <div className="container article">
        <h1>Property Management Automation Guide</h1>
        <p>
          This guide helps property operators prioritize the highest-ROI workflows for automation while protecting reporting quality and
          management control.
        </p>
        <h2>Best first workflows</h2>
        <ul>
          <li>Rent and supplier reconciliation</li>
          <li>Maintenance request triage and follow-up</li>
          <li>Arrears reminder workflows with escalation rules</li>
          <li>Owner report compilation and exception summaries</li>
        </ul>
        <h2>Success metrics to track</h2>
        <ul>
          <li>Monthly close cycle time</li>
          <li>Exception backlog and resolution speed</li>
          <li>Admin hours recovered per week</li>
          <li>Reporting error rate trend</li>
        </ul>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/property-management-ai-agents">See Property solution page</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer" data-track="book-call" data-cta-location="guide-property">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
