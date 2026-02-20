import Link from "next/link";

export const metadata = {
  title: "AdminOps vs Hiring Admin Staff",
  description: "Compare AdminOps AI agents vs hiring additional admin staff for speed, cost, control, and scalability."
};

export default function AdminOpsVsHiringPage() {
  return (
    <section className="section">
      <div className="container article">
        <h1>AdminOps vs Hiring More Admin Staff</h1>
        <p>
          If your team is overloaded, hiring feels like the default answer. But for repetitive admin workflows, AI agents often deliver faster
          capacity gains with stronger process consistency while keeping human approval.
        </p>

        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <div className="card">
            <h2>Where hiring wins</h2>
            <ul>
              <li>Complex judgment-heavy case handling</li>
              <li>Relationship-driven stakeholder communication</li>
              <li>Leadership pipeline and domain ownership</li>
            </ul>
          </div>
          <div className="card">
            <h2>Where AdminOps wins</h2>
            <ul>
              <li>High-volume repetitive processing</li>
              <li>Exception-first triage and audit trails</li>
              <li>Faster rollout without recruitment lag</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: "1rem" }}>
          <h2>Decision framework</h2>
          <ol>
            <li>If a task repeats with clear rules, automate first.</li>
            <li>If a task needs deep human judgment, hire or upskill.</li>
            <li>Use AI + human approval for the best of both models.</li>
          </ol>
          <p>
            Most SMB operations teams use AdminOps to remove repetitive admin pressure first, then make better targeted hires later.
          </p>
        </div>

        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/adminops-pilot">See the 30-day pilot</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer" data-track="book-call" data-cta-location="comparison-hiring">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
