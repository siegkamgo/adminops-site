import Link from "next/link";

export const metadata = {
  title: "AdminOps vs Virtual Assistants",
  description: "Compare AdminOps AI agent workflows and virtual assistant models for operational speed, reliability, and control."
};

export default function AdminOpsVsVaPage() {
  return (
    <section className="section">
      <div className="container article">
        <h1>AdminOps vs Virtual Assistants</h1>
        <p>
          Virtual assistants are flexible and useful for varied support tasks, but repetitive workflows usually need more standardization,
          throughput, and reporting consistency than people-only models can provide at scale.
        </p>

        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <div className="card">
            <h2>Virtual assistant strengths</h2>
            <ul>
              <li>Flexible task coverage for changing priorities</li>
              <li>Human communication and judgment</li>
              <li>Useful for founder and leadership support</li>
            </ul>
          </div>
          <div className="card">
            <h2>AdminOps strengths</h2>
            <ul>
              <li>Repeatable process execution with fewer variations</li>
              <li>Lower error rates in high-volume admin cycles</li>
              <li>Performance visibility through standardized metrics</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: "1rem" }}>
          <h2>Practical model for SMBs</h2>
          <p>
            Use AdminOps for repetitive workflows and reserve human VAs for customer-sensitive or judgment-intensive tasks. This hybrid model
            typically gives the best balance of speed, control, and quality.
          </p>
        </div>

        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-secondary" href="/adminops-pilot">Start with the pilot</Link>
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer" data-track="book-call" data-cta-location="comparison-va">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
