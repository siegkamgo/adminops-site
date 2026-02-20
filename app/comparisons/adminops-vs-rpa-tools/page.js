import Link from "next/link";

export const metadata = {
  title: "AdminOps vs Generic RPA Tools",
  description: "See the difference between AdminOps AI agents and traditional RPA automation for modern SMB operations workflows."
};

export default function AdminOpsVsRpaPage() {
  return (
    <section className="section">
      <div className="container article">
        <h1>AdminOps vs Generic RPA Tools</h1>
        <p>
          Traditional RPA can be powerful for fixed UI tasks, but many SMB workflows now require flexible document handling,
          context-aware routing, and exception management. That is where AdminOps AI agent workflows are stronger.
        </p>

        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <div className="card">
            <h2>Generic RPA strengths</h2>
            <ul>
              <li>Rule-based screen automation in stable environments</li>
              <li>Deterministic task execution</li>
              <li>Good fit for legacy repetitive clicks</li>
            </ul>
          </div>
          <div className="card">
            <h2>AdminOps strengths</h2>
            <ul>
              <li>Unstructured input handling (emails, files, forms)</li>
              <li>Exception queues with business-priority ranking</li>
              <li>Human approval control with practical audit context</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: "1rem" }}>
          <h2>Which should you choose?</h2>
          <p>
            If your workflow changes frequently and includes mixed data sources, choose AI agent-led automation. If the workflow is purely
            static click automation in one tool, RPA may be sufficient. Many teams combine both, with AdminOps as the operations layer.
          </p>
        </div>

        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/property-management-ai-agents">View a segment use case</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer" data-track="book-call" data-cta-location="comparison-rpa">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
