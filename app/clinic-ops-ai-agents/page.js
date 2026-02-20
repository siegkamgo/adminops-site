export const metadata = {
  title: "Clinic Operations AI Agents",
  description: "Automate repetitive clinic administration while preserving compliance and human oversight."
};

export default function ClinicOpsPage() {
  return (
    <section className="section">
      <div className="container">
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
          <a className="btn btn-primary" href="https://www.cal.eu/sieg-kamgo/30min" target="_blank" rel="noreferrer">
            Book a free strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
